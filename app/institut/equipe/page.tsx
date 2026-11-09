import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import teamData from "@/content/data/team.json";
import Link from "next/link";
import { ShieldCheck, Scale, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gouvernance & Équipe | ICRCMP",
  description:
    "Conseil d'administration et gouvernance de l'ICRCMP : Président Chawki Fares, Secrétaire général Abdourahim Omaich, et experts certifiés.",
};

export default function EquipePage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "L'Institut", url: "/institut/qui-sommes-nous" },
          { name: "Gouvernance & Équipe", url: "/institut/equipe" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Gouvernance Associative
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Le Conseil d'Administration & la Gouvernance
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          L'ICRCMP est dirigé par un Conseil d'administration garant de l'indépendance de l'Institut, de la rigueur déontologique des instructions et du contrôle strict des titres universitaires.
        </p>
      </div>

      <LegalNotice type="non-avocat" className="mb-10" />

      {/* Dirigeants principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {teamData.map((membre) => (
          <div key={membre.nom} className="bg-white p-8 border border-neutral-200/90 rounded-sm shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold text-[#C9A227] tracking-wider">
                  {membre.role}
                </span>
                <span className="text-xs px-2 py-0.5 bg-[#FAF8EE] border border-[#C9A227]/40 text-[#7A6010] rounded font-semibold">
                  Conseil d'Administration
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-1">
                {membre.prenom} {membre.nom}
              </h2>
              <p className="text-xs text-neutral-500 font-medium mb-4">
                {membre.titre}
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {membre.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Mandat associatif actif</span>
              <span className="text-[#0B1F3A] font-semibold">ICRCMP Paris</span>
            </div>
          </div>
        ))}
      </div>

      {/* Section Membres Experts Certifiés */}
      <div className="bg-[#FAF9F6] border border-neutral-200 p-8 sm:p-10 rounded-sm mb-12">
        <div className="max-w-2xl">
          <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-2">
            Membres Experts Certifiés & Commission Déontologique
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            Au-delà du bureau exécutif, l'Institut s'appuie sur une communauté d'experts diplômés inscrits à l'annuaire après examen unitaire de conformité.
          </p>
          <Link
            href="/annuaire"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            Consulter la liste complète des experts certifiés
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

