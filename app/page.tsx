import React from "react";
import { HeroSection } from "@/components/ui/HeroSection";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { ExpertiseCard } from "@/components/ui/ExpertiseCard";
import { StepProcess } from "@/components/ui/StepProcess";
import { StatBlock } from "@/components/ui/StatBlock";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { LegalNotice } from "@/components/ui/LegalNotice";
import Link from "next/link";
import { Award, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Réassurance (Certifié, Procédural, Médiation) */}
      <ReassuranceBlock />

      {/* 3. Domaines d'expertise */}
      <ExpertiseCard />

      {/* 4. Méthode en 4 étapes */}
      <StepProcess />

      {/* 5. Chiffres clés */}
      <StatBlock />

      {/* 6. Section Institutionnelle & Label privé */}
      <section className="py-20 bg-white border-b border-[#E2E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8EE] border border-[#C9A227]/40 text-[#7A6010] text-xs font-semibold uppercase tracking-wider mb-4">
                <Award className="w-4 h-4 text-[#C9A227]" />
                Label Privé Associatif ICRCMP
              </div>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
                Une Distinction Déontologique & Technique Rigoureuse
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Le Label délivré par l’ICRCMP atteste de la conformité des experts à un ensemble de critères exigeants : vérification du diplôme auprès de l’organisme émetteur, souscription d'une assurance Responsabilité Civile Professionnelle spécifique, et formation continue obligatoire.
              </p>
              
              <ul className="space-y-3 text-sm text-neutral-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Contrôle rigoureux des qualifications académiques et professionnelles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Engagement formel sur la charte déontologique de neutralité</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span>Obligation de 20 heures de formation continue procédurale par biennat</span>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <Link
                  href="/label"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054] transition-colors"
                >
                  Découvrir le Label & ses critères
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-neutral-200 rounded-sm">
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-3">
                Transparence & Cadre d'Exercice
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                L’ICRCMP est une association loi 1901 à vocation d'intérêt procédural et ne poursuit aucune finalité lucrative de démarchage juridique.
              </p>
              <LegalNotice type="label-prive" className="mb-4" />
              <LegalNotice type="non-avocat" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Témoignages sobres et institutionnels */}
      <section className="py-16 bg-[#F5F5F0] border-b border-[#E2E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
              Retours d'Expérience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2">
              Pratique Procédurale & Déontologique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-neutral-200 rounded-sm">
              <p className="text-sm italic text-neutral-700 leading-relaxed mb-4">
                « L'intervention d'un médiateur certifié ICRCMP a permis de désamorcer un conflit commercial bloqué depuis plus de dix-huit mois, en seulement trois séances confidentielles. La rédaction d'un protocole d'accord clair a sécurisé nos engagements mutuels. »
              </p>
              <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold text-[#0B1F3A]">Direction Juridique PME — Secteur Logistique</span>
                <span>Médiation conventionnelle</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-neutral-200 rounded-sm">
              <p className="text-sm italic text-neutral-700 leading-relaxed mb-4">
                « Dans le cadre d'un recours administratif préalable obligatoire (RAPO), la rigueur de qualification et le respect scrupuleux des délais ont permis d'obtenir la révision gracieuse de la décision sans engager de contentieux juridictionnel coûteux. »
              </p>
              <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold text-[#0B1F3A]">Administration & Usager — Contentieux de l'Urbanisme</span>
                <span>Recours gracieux</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bannière CTA finale */}
      <CtaBanner />
    </>
  );
}

