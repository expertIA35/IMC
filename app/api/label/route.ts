import { NextResponse } from "next/server";
import { labelDemandeSchema } from "@/lib/schemas/forms.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = labelDemandeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation échouée", details: parsed.error.format() },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log(`[Label] Demande de labellisation reçue pour le membre ${parsed.data.numeroAdherent}`);

    return NextResponse.json({
      success: true,
      message: "Demande de labellisation enregistrée pour instruction",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}

