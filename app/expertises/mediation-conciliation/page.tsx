import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { Handshake, Scale, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Médiation & Conciliation Amiable | Expertises ICRCMP",
  description:
    "Cadre d'intervention en médiation conventionnelle et conciliation. Respect strict de la loi n° 71-1130 et de l'article 1528 du CPC.",
};

export default function MediationExpertisePage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Expertises", url: "/expertises/mediation-conciliation" },
          { name: "Médiation & Conciliation", url: "/expertises/mediation-conciliation" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Modes Amiables de Règlement des Différends (MARD)
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Médiation & Conciliation Procédurale
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          Rétablissement du dialogue contractuel ou institutionnel par un processus structuré, confidentiel et volontaire, mené par un tiers neutre et certifié.
        </p>
      </div>

      {/* Mention légale obligatoire */}
      <LegalNotice type="non-avocat" className="mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Définition */}
          <section className="bg-white p-8 border border-neutral-200/90 rounded-sm shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">
              1. Définition & Finalité du Processus
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              La médiation est un mode alternatif et confidentiel de règlement des litiges dans lequel les parties en conflit tentent de parvenir à une solution mutuellement acceptable avec l'aide d'un tiers indépendant, impartial et qualifié : le médiateur certifié.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Elle intervient aussi bien à titre conventionnel (préalablement à toute saisine d'un tribunal) qu'à titre judiciaire (ordonnée par un magistrat avec l'accord des justiciables).
            </p>
          </section>

          {/* Cadre légal */}
          <section className="bg-white p-8 border border-neutral-200/90 rounded-sm shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">
              2. Cadre Légal & Réglementaire
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              L'intervention des membres experts de l'ICRCMP s'inscrit rigoureusement dans le cadre défini par :
            </p>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <span>Les articles 1528 et suivants du <strong>Code de procédure civile</strong> régissant la médiation et la conciliation conventionnelles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <span>La directive européenne 2008/52/CE sur certains aspects de la médiation en matière civile et commerciale.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                <span>Les dispositions d'ordre public de la <strong>loi n° 71-1130 du 31 décembre 1971</strong>.</span>
              </li>
            </ul>
          </section>

          {/* Limites explicites : Ne se substitue pas à un avocat */}
          <section className="bg-[#FAF9F6] p-8 border border-neutral-200 rounded-sm space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#C9A227]" />
              3. Limites Déontologiques Strictes
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Le médiateur n'est ni juge ni arbitre : il ne tranche pas le litige et n'impose aucune sentence. Il s'abstient de prodiguer tout conseil juridique personnalisé aux parties. Chaque partie conserve l'entière liberté de se faire assister par son avocat tout au long des séances et lors de la formalisation du protocole transactionnel.
            </p>
          </section>
        </div>

        {/* Sidebar : Publics & FAQ */}
        <div className="space-y-6">
          <div className="bg-white p-6 border border-neutral-200 rounded-sm">
            <h3 className="font-serif font-bold text-base text-[#0B1F3A] mb-3">
              Publics Concernés
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>• Entreprises (litiges contractuels, inexécution, baux)</li>
              <li>• Particuliers (troubles de voisinage, différends civils)</li>
              <li>• Collectivités et usagers du service public</li>
              <li>• Dirigeants et associés (conflits intra-entreprises)</li>
            </ul>
          </div>

          <div className="bg-[#0B1F3A] text-white p-6 rounded-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-white">
              Besoin d'un Médiateur Certifié ?
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Consultez l'annuaire des membres certifiés ayant validé un cursus d'État ou universitaire en médiation.
            </p>
            <Link
              href="/annuaire"
              className="inline-block w-full text-center py-2.5 bg-[#C9A227] hover:bg-[#DFC05C] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors"
            >
              Consulter l'Annuaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

