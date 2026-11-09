import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RecoursForm } from "@/components/forms/RecoursForm";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Demande de Recours & Accompagnement Procédural | ICRCMP",
  description:
    "Déposez votre demande de recours administratif préalable (RAPO), gracieux ou de médiation. Analyse de recevabilité et des délais de forclusion.",
};

export default function RecoursDemandePage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Recours & Accompagnement", url: "/recours/demande" },
          { name: "Dépôt de dossier", url: "/recours/demande" },
        ]}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Assistance Procédurale
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Demande d'Accompagnement Procédural
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Formulez votre demande d'intervention pour un recours administratif gracieux ou une démarche de médiation. Veuillez renseigner précisément les dates de notification pour le calcul des délais.
        </p>
      </div>

      <LegalNotice type="non-avocat" className="max-w-3xl mx-auto mb-8" />

      <RecoursForm />
    </div>
  );
}

