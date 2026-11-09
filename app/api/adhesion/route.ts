import { NextResponse } from "next/server";
import { adhesionSchema } from "@/lib/schemas/forms.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = adhesionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation échouée", details: parsed.error.format() },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log(`[Adhésion] Nouvelle candidature enregistrée : ${parsed.data.nom} (${parsed.data.statutDemande})`);

    return NextResponse.json({
      success: true,
      message: "Candidature enregistrée avec succès",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}

