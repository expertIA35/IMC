import React from "react";
import { AlertCircle, Scale } from "lucide-react";

interface LegalNoticeProps {
  type?: "non-avocat" | "label-prive" | "rgpd";
  customText?: string;
  className?: string;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({
  type = "non-avocat",
  customText,
  className = "",
}) => {
  let content = customText;

  if (!content) {
    if (type === "non-avocat") {
      content =
        "Rappel légal déontologique : L'Institut Certifié de Recours Contentieux et de Médiation Procédurale (ICRCMP) est une association loi 1901. L'ICRCMP et ses intervenants ne se substituent en aucun cas à un avocat et ne dispensent aucune consultation juridique relevant du monopole légal institué par la loi n° 71-1130 du 31 décembre 1971.";
    } else if (type === "label-prive") {
      content =
        "Mention obligatoire : Label privé associatif d'excellence technique et déontologique délivré unilatéralement par l'ICRCMP, association loi 1901. Ce label n'est ni agréé ni reconnu par l'État et ne confère aucune prérogative de puissance publique.";
    } else if (type === "rgpd") {
      content =
        "Conformité RGPD : Les données collectées font l'objet d'un traitement déontologique strict sous la responsabilité du délégué à la protection des données de l'ICRCMP. Droit d'accès, de rectification et d'opposition immédiat sur simple requête écrite.";
    }
  }

  return (
    <aside
      className={`flex items-start gap-3 p-4 bg-[#F2F2EC] border border-[#DDDDCF] text-xs text-[#3E4A5B] leading-relaxed rounded-sm ${className}`}
      role="note"
      aria-label="Avertissement déontologique et légal"
    >
      <Scale className="w-4 h-4 text-icrcmp-blue flex-shrink-0 mt-0.5" />
      <div>{content}</div>
    </aside>
  );
};

