import React from "react";
import { Metadata } from "next";
import expertsData from "@/content/data/experts.json";
import { AnnuaireClient } from "@/components/annuaire/AnnuaireClient";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import Link from "next/link";
import { Expert } from "@/lib/types/expert";
import { UserPlus, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Annuaire des Experts Certifiés | Médiation & Recours",
  description:
    "Consultez l'annuaire officiel des experts certifiés par l'ICRCMP en médiation civile, commerciale et recours administratifs préalables obligatoires.",
};

export default function AnnuairePage() {
  const experts = expertsData as Expert[];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: "Annuaire des experts certifiés", url: "/annuaire" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
            Registre Officiel
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
            Annuaire des Experts Certifiés ICRCMP
          </h1>
          <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
            Trouvez un médiateur, conciliateur ou spécialiste des recours administratifs dont les titres et diplômes ont été formellement vérifiés par le Conseil d'administration de l'Institut.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6 md:mt-0 flex-shrink-0">
          <Link
            href="/annuaire/candidater"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B1F3A] hover:bg-[#143054] text-white rounded-sm transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#C9A227]" />
            Candidater à l'annuaire
          </Link>
          <Link
            href="/annuaire/charte"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-sm transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Charte de publication
          </Link>
        </div>
      </div>

      {/* Rappel déontologique sur l'indépendance de l'annuaire */}
      <LegalNotice
        customText="Avertissement déontologique : L'ICRCMP est une association loi 1901 de labellisation et de recensement technique. L'ICRCMP ne garantit pas les prestations individuelles fournies par les experts inscrits, n'est pas partie aux conventions d'honoraires et rappelle que ses membres ne se substituent pas à un avocat."
        className="mb-8"
      />

      {/* Composant dynamique avec Fuse.js et filtres */}
      <AnnuaireClient initialExperts={experts} />
    </div>
  );
}

