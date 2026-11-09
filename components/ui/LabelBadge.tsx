import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";

interface LabelBadgeProps {
  className?: string;
  showTooltip?: boolean;
}

export const LabelBadge: React.FC<LabelBadgeProps> = ({ className = "", showTooltip = true }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#FAF8EE] border border-[#C9A227]/60 text-[#7A6010] text-xs font-semibold tracking-wide uppercase ${className}`}
      title={
        showTooltip
          ? "Le label ICRCMP est une distinction privée interne à l'Institut. Il n'est pas une marque déposée à l'INPI. Il n'est pas reconnu par l'État."
          : undefined
      }
      aria-label="Membre titulaire du label privé associatif ICRCMP"
    >
      <Award className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
      <span>Labellisé ICRCMP</span>
    </div>
  );
};

export const LabelCertificatePreview: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`bg-white p-4 border border-[#DDDDCF] rounded-sm shadow-md ${className}`}>
      <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-neutral-200">
        <Image
          src="/certificat-label-associatif.jpg"
          alt="Spécimen officiel du Certificat de Label Associatif délivré par l'ICRCMP"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className="text-[11px] text-neutral-500 text-center mt-2 italic">
        Spécimen officiel du certificat délivré aux membres titulaires du label privé associatif.
      </p>
    </div>
  );
};

export const CertificationBadge: React.FC<{ intitule: string; organisme: string }> = ({
  intitule,
  organisme,
}) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FAF9F6] border border-neutral-300 text-neutral-800 text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3A]" />
      <span className="font-medium text-neutral-800">{intitule}</span>
      <span className="text-neutral-500 font-normal">({organisme})</span>
    </div>
  );
};

export const LegalDisclaimerExpert: React.FC = () => {
  return (
    <div className="p-3 bg-neutral-100 border-l-2 border-neutral-400 text-xs text-neutral-600 space-y-1">
      <p className="font-medium text-neutral-700">
        Mention légale obligatoire d'indépendance procédurale :
      </p>
      <p>
        Membre expert certifié ICRCMP — l'ICRCMP ne garantit pas les prestations individuelles de ses membres.
        L'ICRCMP ne se substitue pas à un avocat là où sa présence est obligatoire.
        L'ICRCMP ne garantit aucun résultat quant à l'issue des recours engagés.
      </p>
    </div>
  );
};
