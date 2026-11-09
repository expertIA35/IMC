import { NextResponse } from "next/server";
import { recoursSchema } from "@/lib/schemas/forms.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = recoursSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation échouée", details: parsed.error.format() },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log(`[Recours] Nouveau dossier instruit : ${parsed.data.typeLitige} - ${parsed.data.objet}`);

    return NextResponse.json({
      success: true,
      message: "Dossier de recours enregistré",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}

