import { NextResponse } from "next/server";
import { contactExpertSchema } from "@/lib/schemas/forms.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation de schéma serveur
    const parsed = contactExpertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation échouée", details: parsed.error.format() },
        { status: 400 }
      );
    }

    // 2. Vérification Honeypot anti-bot
    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 }); // Échec silencieux
    }

    // 3. Log sécurisé serveur (sans exposer de données en clair dans des logs publics)
    console.log(`[Contact Expert] Message reçu pour l'expert ${parsed.data.expertSlug}`);

    // Simulation de transmission sécurisée
    return NextResponse.json({
      success: true,
      message: "Demande transmise avec succès",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

