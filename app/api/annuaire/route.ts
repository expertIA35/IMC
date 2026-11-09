import { NextResponse } from "next/server";
import { expertCandidatureSchema } from "@/lib/schemas/expert-candidature.schema";
import fs from "fs";
import path from "path";

// Rate limiting local par IP
const ipRequests = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequests.get(ip);
  if (!record || now - record.timestamp > 60000) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }
  record.count += 1;
  return record.count > 5; // Max 5 candidatures par minute par IP
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // 1. Rate Limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de renouveler votre candidature." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Validation de schéma Zod
    const result = expertCandidatureSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation échouée", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Détection Honeypot Anti-Spam
    if (data.honeypot && data.honeypot.length > 0) {
      // Réponse silencieuse sans action
      return NextResponse.json({ success: true, message: "Candidature enregistrée." }, { status: 200 });
    }

    // 4. Enregistrement dans content/data/experts-pending.json
    const pendingFilePath = path.join(process.cwd(), "content", "data", "experts-pending.json");
    let pendingList: any[] = [];

    if (fs.existsSync(pendingFilePath)) {
      try {
        const fileRaw = fs.readFileSync(pendingFilePath, "utf-8");
        pendingList = JSON.parse(fileRaw);
      } catch (e) {
        pendingList = [];
      }
    }

    const newPendingCandidate = {
      id: `pend-${Date.now()}`,
      dateDepot: new Date().toISOString(),
      statutInstruction: "en_attente_audit_diplome",
      candidat: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        ville: data.ville,
        departement: data.departement,
        region: data.region,
        diplome: {
          intitule: data.intituleDiplome,
          organisme: data.organismeDiplome,
          annee: parseInt(data.anneeDiplome, 10),
        },
        domaines: data.domaines,
        aDistance: data.aDistance,
        bioCourte: data.bioCourte,
      },
      audit: {
        charteAcceptee: data.acceptationCharte,
        clauseRetraitAcceptee: data.consentementRetrait,
        consentementRgpd: data.consentementRgpd,
      },
    };

    pendingList.push(newPendingCandidate);
    fs.writeFileSync(pendingFilePath, JSON.stringify(pendingList, null, 2), "utf-8");

    // 5. Envoi email de confirmation via Resend (si configuré)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey.startsWith("re_")) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "Institut ICRCMP <noreply@icrcmp.fr>",
            to: [data.email],
            subject: "ICRCMP — Confirmation de dépôt de candidature à l'Annuaire",
            html: `
              <div style="font-family: Arial, sans-serif; color: #1A2332; line-height: 1.6; max-width: 600px; margin: auto;">
                <div style="background-color: #0B1F3A; padding: 20px; color: #FFFFFF; text-align: center;">
                  <h1 style="color: #C9A227; margin: 0; font-size: 20px;">ICRCMP</h1>
                  <p style="margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase;">Institut Certifié de Recours Contentieux et de Médiation Procédurale</p>
                </div>
                <div style="padding: 24px; border: 1px solid #E2E2DC; background-color: #FFFFFF;">
                  <p>Bonjour ${data.prenom} ${data.nom},</p>
                  <p>Nous vous confirmons la bonne réception de votre dossier de candidature en vue de votre référencement sur l'annuaire public des experts certifiés de l'ICRCMP.</p>
                  <p><strong>Prochaines étapes de l'instruction :</strong></p>
                  <ul>
                    <li>Audit de conformité auprès de votre organisme certificateur (<em>${data.organismeDiplome}</em>).</li>
                    <li>Examen de la recevabilité par le Secrétariat Général.</li>
                    <li>Validation finale lors de la prochaine session du Conseil d'Administration.</li>
                  </ul>
                  <p style="font-size: 12px; color: #5C6675; border-top: 1px solid #E2E2DC; padding-top: 12px;">
                    Rappel : L'ICRCMP est une association loi 1901. L'inscription à l'annuaire ne confère pas le statut d'avocat.
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (mailError) {
        console.warn("Échec d'envoi d'email de confirmation via Resend :", mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Dossier de candidature transmis avec succès pour instruction en commission.",
      dossierId: newPendingCandidate.id,
    });
  } catch (error) {
    console.error("[API Annuaire Candidature]", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de l'enregistrement." },
      { status: 500 }
    );
  }
}

