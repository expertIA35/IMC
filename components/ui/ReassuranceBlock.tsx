import React from "react";
import { Award, ShieldAlert, GitCommit, Scale } from "lucide-react";

export const ReassuranceBlock: React.FC = () => {
  const piliers = [
    {
      titre: "Compétence Certifiée",
      sousTitre: "Contrôle des diplômes",
      description:
        "Chaque expert référencé justifie d'un diplôme d'État ou universitaire spécialisé, rigoureusement vérifié en commission par le Conseil d'administration de l'ICRCMP.",
      icon: Award,
    },
    {
      titre: "Rigueur Procédurale",
      sousTitre: "Respect des délais légaux",
      description:
        "Sécurisation méthodique des actes de recours gracieux ou hiérarchiques (RAPO) afin de préserver intégralement vos droits et forclusions contentieuses.",
      icon: Scale,
    },
    {
      titre: "Médiation Indépendante",
      sousTitre: "Confidentialité absolue",
      description:
        "Application stricte de la charte déontologique : neutralité, impartialité, absence de conflit d'intérêts et secret procédural garanti.",
      icon: GitCommit,
    },
  ];

  return (
    <section className="py-12 bg-[#FAF9F6] border-b border-[#E2E2DC]" aria-label="Engagements et garanties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {piliers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-sm border border-neutral-200/80 shadow-xs flex flex-col"
              >
                <div className="w-10 h-10 rounded-sm bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 flex items-center justify-center text-[#0B1F3A] mb-4">
                  <Icon className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-1">
                  {item.titre}
                </h3>
                <span className="text-xs uppercase font-medium tracking-wider text-neutral-500 mb-3">
                  {item.sousTitre}
                </span>
                <p className="text-sm text-neutral-600 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

