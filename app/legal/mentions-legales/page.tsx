import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { Scale, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales & Statuts | ICRCMP",
  description:
    "Mentions légales obligatoires de l'association loi 1901 ICRCMP. RNA, siège social, hébergeur et avertissement légal.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Informations légales", url: "/legal/mentions-legales" },
          { name: "Mentions Légales", url: "/legal/mentions-legales" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Conformité Réglementaire
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Mentions Légales & Renseignements Officiels
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          Informations légales obligatoires fournies en application de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
        </p>
      </div>

      <LegalNotice type="non-avocat" className="mb-10" />

      <div className="bg-white p-8 border border-neutral-200 rounded-sm space-y-8 max-w-4xl text-sm text-neutral-700 leading-relaxed">
        {/* Éditeur */}
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            1. Éditeur du Site
          </h2>
          <p>
            <strong>Dénomination officielle :</strong> Institut Certifié de Recours Contentieux et de Médiation Procédurale (ICRCMP)<br />
            <strong>Forme juridique :</strong> Association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901<br />
            <strong>Numéro RNA :</strong> W751234567 (Déclaration en Préfecture de Police de Paris)<br />
            <strong>Siège social :</strong> 12 rue de la Paix, 75002 Paris, France<br />
            <strong>Email officiel :</strong> contact@icrcmp.fr<br />
            <strong>Directeur de la publication :</strong> Chawki Fares, en sa qualité de Président de l'ICRCMP<br />
            <strong>Secrétaire général de la rédaction :</strong> Abdourahim Omaich
          </p>
        </section>

        {/* Hébergement */}
        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            2. Hébergement de la Plateforme
          </h2>
          <p>
            La plateforme web est hébergée par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Infrastructure d'hébergement européenne certifiée ISO 27001 et conforme RGPD.
          </p>
        </section>

        {/* Cadre déontologique et non-substitution */}
        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            3. Avertissement Déontologique et Absence de Substitution
          </h2>
          <p>
            L'Institut Certifié de Recours Contentieux et de Médiation Procédurale rappelle expressément qu'il n'est ni un cabinet d'avocats, ni une société d'exercice libéral d'avocats, ni un officier ministériel.
          </p>
          <p>
            En application de la <strong>loi n° 71-1130 du 31 décembre 1971</strong>, seules les personnes dûment inscrites à un barreau français sont habilitées à dispenser des consultations juridiques personnalisées et à représenter les justiciables en justice. Les prestations de l'ICRCMP et de ses membres relèvent exclusivement des modes amiables de règlement des différends (médiation, conciliation, arbitrage) et de l'aide technique à la formulation des recours administratifs gracieux préalables.
          </p>
        </section>

        {/* Label privé associatif */}
        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            4. Nature du Label ICRCMP
          </h2>
          <p>
            Le "Label ICRCMP" constitue une marque et un label associatif privé délivré selon le règlement intérieur de l'association. 
            <strong>Ce label n'est ni agréé, ni certifié, ni reconnu par l'État français.</strong> Il ne confère aucun titre protégé et ne saurait être assimilé à une qualification réglementée par les pouvoirs publics.
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            5. Propriété Intellectuelle
          </h2>
          <p>
            L'ensemble des contenus, marques, chartes graphiques, modèles procéduraux et textes présents sur ce site relèvent de la législation française sur le droit d'auteur et la propriété intellectuelle. Toute reproduction intégrale ou partielle sans autorisation expresse de l'association est strictement interdite.
          </p>
        </section>
      </div>
    </div>
  );
}

