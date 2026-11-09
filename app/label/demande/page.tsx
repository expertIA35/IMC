import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LabelDemandeForm } from "@/components/forms/LabelDemandeForm";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Candidature au Label ICRCMP | Formulaire de Demande",
  description:
    "Formulaire de demande de labellisation réservé aux membres de l'ICRCMP. Vérification RC Pro et engagement de formation.",
};

export default function LabelDemandePage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Label ICRCMP", url: "/label" },
          { name: "Demande de labellisation", url: "/label/demande" },
        ]}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Procédure d'Attribution
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Demande d'Attribution du Label ICRCMP
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Réservé aux membres experts déjà adhérents de l'Institut. L'attribution du Label emporte le droit de faire figurer le badge officiel sur votre fiche et vos supports professionnels.
        </p>
      </div>

      <LegalNotice type="label-prive" className="max-w-3xl mx-auto mb-8" />

      <LabelDemandeForm />
    </div>
  );
}

