import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const StepProcess: React.FC = () => {
  const steps = [
    {
      numero: "01",
      titre: "Qualification du Différend",
      description:
        "Examen minutieux des faits, des décisions contestées, des pièces justificatives et contrôle des délais de forclusion légale.",
    },
    {
      numero: "02",
      titre: "Sélection de la Voie Procédurale",
      description:
        "Orientation stratégique : médiation conventionnelle, recours gracieux/hiérarchique préalable, ou clause d'arbitrage selon l'intérêt des parties.",
    },
    {
      numero: "03",
      titre: "Intervention de l'Expert Certifié",
      description:
        "Mise en œuvre du protocole contradictoire, conduite des réunions d'écoute ou rédaction rigoureuse du mémoire de recours amiable.",
    },
    {
      numero: "04",
      titre: "Protocole d'Accord ou Décision",
      description:
        "Formalisation de l'accord transactionnel susceptible d'homologation judiciaire, ou clôture du recours préalable ouvrant la voie contentieuse.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E2E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
            Protocole Méthodologique
          </span>
          <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
            Notre Méthode d'Accompagnement en 4 Étapes
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Un processus normé, transparent et déontologique destiné à préserver vos intérêts dans le respect strict des textes applicables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.numero}
              className="relative p-6 bg-[#FAF9F6] border border-neutral-200/90 rounded-sm flex flex-col"
            >
              <div className="text-3xl font-serif font-bold text-[#C9A227] mb-3">
                {step.numero}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-3">
                {step.titre}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

