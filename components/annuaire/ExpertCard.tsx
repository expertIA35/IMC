import React from "react";
import Link from "next/link";
import { Expert } from "@/lib/types/expert";
import { LabelBadge, CertificationBadge } from "@/components/ui/LabelBadge";
import { formatDomaine } from "@/lib/utils";
import { MapPin, Globe, CheckCircle, ArrowRight, UserCheck } from "lucide-react";

interface ExpertCardProps {
  expert: Expert;
  viewMode?: "grid" | "list";
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white border border-neutral-200/90 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#0B1F3A]/40 transition-all">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A]">
              {expert.prenom} {expert.nom}
            </h3>
            {expert.labellise && <LabelBadge />}
          </div>
          <p className="text-xs text-neutral-500 font-medium">
            {expert.diplome.intitule} • {expert.diplome.organisme} ({expert.diplome.annee})
          </p>
          <p className="text-sm text-neutral-600 line-clamp-2 max-w-2xl">
            {expert.bioCourte}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {expert.zone.ville} ({expert.zone.departement}) — {expert.zone.region}
            </span>
            {expert.zone.aDistance && (
              <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                Distanciel disponible
              </span>
            )}
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              {expert.langues.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2 w-full md:w-auto flex-shrink-0">
          <Link
            href={`/annuaire/${expert.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors text-center"
          >
            Consulter le profil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/90 rounded-sm p-6 flex flex-col justify-between hover:border-[#0B1F3A]/40 transition-all h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A]">
              {expert.prenom} {expert.nom}
            </h3>
            <span className="text-xs text-neutral-500 block mt-0.5">
              Certifié ICRCMP #{expert.id}
            </span>
          </div>
          {expert.labellise && <LabelBadge />}
        </div>

        <div className="mb-4">
          <CertificationBadge
            intitule={expert.diplome.intitule}
            organisme={expert.diplome.organisme}
          />
        </div>

        <p className="text-sm text-neutral-600 line-clamp-3 mb-6 leading-relaxed">
          {expert.bioCourte}
        </p>

        {/* Domaines */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {expert.domaines.map((domaine) => (
            <span
              key={domaine}
              className="text-[11px] px-2 py-0.5 bg-[#FAF9F6] border border-neutral-200 rounded text-neutral-700"
            >
              {formatDomaine(domaine)}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            {expert.zone.ville} ({expert.zone.departement})
          </span>
          {expert.zone.aDistance && (
            <span className="text-[11px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
              Visio acceptée
            </span>
          )}
        </div>

        <Link
          href={`/annuaire/${expert.slug}`}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors gap-2"
        >
          Fiche certifiée
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

