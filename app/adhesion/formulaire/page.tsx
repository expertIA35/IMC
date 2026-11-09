import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdhesionForm } from "@/components/forms/AdhesionForm";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Adhésion à l'Institut | Formulaire Officiel",
  description: "Formulaire d'adhésion pour devenir membre adhérent ou expert certifié référencé à l'ICRCMP.",
};

export default function AdhesionFormPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Adhésion", url: "/adhesion/comment-adherer" },
          { name: "Formulaire d'adhésion", url: "/adhesion/formulaire" },
        ]}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Rejoindre l'Institut
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Demande d'Adhésion à l'ICRCMP
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Renseignez le formulaire multi-étapes ci-dessous. Les dossiers sont instruits par le secrétariat général préalablement à leur soumission au Conseil d'administration.
        </p>
      </div>

      <LegalNotice type="non-avocat" className="max-w-3xl mx-auto mb-8" />

      <AdhesionForm />
    </div>
  );
}

