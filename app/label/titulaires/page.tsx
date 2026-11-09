import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import expertsData from "@/content/data/experts.json";
import { LabelBadge } from "@/components/ui/LabelBadge";
import Link from "next/link";
import { Award, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Expert } from "@/lib/types/expert";
import { formatDomaine } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Registre des Titulaires du Label | ICRCMP",
  description:
    "Liste officielle et publique des experts certifiés titulaires du Label privé associatif ICRCMP. Contrôle des diplômes et de l'assurance RC Pro.",
};

export default function LabelTitulairesPage() {
  const titulaires = (expertsData as Expert[]).filter((e) => e.labellise);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Le Label", url: "/label" },
          { name: "Registre des titulaires", url: "/label/titulaires" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <LabelBadge />
          <span className="text-xs uppercase tracking-widest text-[#0B1F3A] font-semibold">
            Registre Public Vérifié
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
          Membres Titulaires du Label Privé ICRCMP
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          Ce registre recense nominativement les experts certifiés ayant satisfait à l'audit contradictoire de labellisation (diplôme audité, police d'assurance RC Pro valide et 20h de formation continue biennale).
        </p>
      </div>

      <LegalNotice type="label-prive" className="mb-10" />

      {/* Liste des titulaires sous forme de fiches sobres et prestigieuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {titulaires.map((expert) => (
          <div
            key={expert.id}
            className="bg-white border border-[#DDDDCF] rounded-sm p-6 shadow-xs flex flex-col justify-between hover:border-[#C9A227] transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">
                    {expert.prenom} {expert.nom}
                  </h2>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    Titulaire Label ICRCMP #{expert.id}
                  </span>
                </div>
                <LabelBadge />
              </div>

              <div className="mb-4 p-3 bg-[#FAF9F6] border border-neutral-200 rounded-sm text-xs text-neutral-700">
                <span className="font-semibold block text-[#0B1F3A] mb-1">Titre & Qualification vérifiée :</span>
                {expert.diplome.intitule} ({expert.diplome.organisme})
              </div>

              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                {expert.bioCourte}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {expert.domaines.map((dom) => (
                  <span key={dom} className="text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded">
                    {formatDomaine(dom)}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {expert.zone.ville} ({expert.zone.departement})
              </span>
              <Link
                href={`/annuaire/${expert.slug}`}
                className="font-semibold text-[#0B1F3A] hover:text-[#C9A227] flex items-center gap-1"
              >
                Fiche complète <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

