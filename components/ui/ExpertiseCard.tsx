import React from "react";
import Link from "next/link";
import { Handshake, FileSearch, Gavel, GraduationCap, ArrowRight } from "lucide-react";

export const ExpertiseCard: React.FC = () => {
  const expertises = [
    {
      titre: "Médiation & Conciliation",
      description:
        "Résolution amiable et confidentielle des différends civils et commerciaux. Rétablissement du dialogue sous l'égide d'un tiers neutre et indépendant.",
      lien: "/expertises/mediation-conciliation",
      icon: Handshake,
    },
    {
      titre: "Recours Contentieux & RAPO",
      description:
        "Accompagnement rigoureux dans la formulation des recours administratifs préalables obligatoires et recours gracieux auprès des administrations publiques.",
      lien: "/expertises/recours-contentieux",
      icon: FileSearch,
    },
    {
      titre: "Arbitrage Conventionnel",
      description:
        "Règlement privé des contentieux contractuels par des arbitres certifiés. Respect rigoureux du contradictoire et des clauses compromissoires.",
      lien: "/expertises/arbitrage",
      icon: Gavel,
    },
    {
      titre: "Formation Procédurale",
      description:
        "Sessions spécialisées pour les professionnels du droit, dirigeants et délégués : pratique de la médiation, gestion des litiges administratifs et déontologie.",
      lien: "/expertises/formation",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20 bg-[#F5F5F0] border-b border-[#E2E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
              Champs d'Action
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2">
              Nos Domaines d'Expertise Procédurale
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
            Interventions fondées sur une stricte maîtrise des règles de forme et de procédure, dans le respect de la législation en vigueur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 border border-neutral-200/90 rounded-sm hover:border-[#0B1F3A]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-3 group-hover:text-[#C9A227] transition-colors">
                    {item.titre}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.lien}
                  className="inline-flex items-center text-xs font-semibold text-[#0B1F3A] hover:text-[#C9A227] tracking-wider uppercase gap-1.5 transition-colors"
                >
                  Découvrir le cadre légal
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

