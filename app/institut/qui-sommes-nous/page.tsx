import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? Présentation de l'Institut | ICRCMP",
  description:
    "Découvrez l'ICRCMP, association loi 1901 dédiée à la régulation procédurale, à la médiation conventionnelle et à la qualification des recours préalables.",
};

export default function QuiSommesNousPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "L'Institut", url: "/institut/qui-sommes-nous" },
          { name: "Qui sommes-nous", url: "/institut/qui-sommes-nous" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Présentation Institutionnelle
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          L'Institut Certifié de Recours Contentieux et de Médiation Procédurale
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          L'ICRCMP est une association régie par la loi du 1er juillet 1901, fondée pour promouvoir la sécurité procédurale et le recours aux modes amiables de résolution des différends.
        </p>
      </div>

      <div className="bg-white p-8 border border-neutral-200 rounded-sm space-y-8 text-sm text-neutral-700 leading-relaxed shadow-xs">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">Notre histoire</h2>
          <p>
            L'Institut est né du constat partagé par des praticiens du droit et de la médiation : la complexité croissante des règles de procédure administrative et civile expose les justiciables à des risques fréquents de forclusion. Face à la multiplication des recours administratifs préalables obligatoires et au développement des modes alternatifs de règlement des litiges, la création d'un cadre technique de référence s'est imposée.
          </p>
          <p>
            Depuis sa constitution, l'ICRCMP s'attache à fédérer des experts qualifiés autour de protocoles rigoureux. L'association œuvre à la clarification des démarches préalables au contentieux, dans un esprit constant de neutralité, d'écoute et de conformité aux textes législatifs.
          </p>
        </section>

        <section className="space-y-3 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">Notre mission</h2>
          <p>
            L'ICRCMP a pour mission d'informer, d'orienter et d'accompagner les personnes physiques et morales confrontées à un différend procédural. L'Institut veille au respect strict des règles de forme et des calendriers légaux, tout en encourageant la résolution négociée des litiges chaque fois qu'elle est envisageable. Toute intervention fait l'objet d'un examen d'éligibilité préalable.
          </p>
        </section>

        <section className="space-y-3 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">Nos valeurs fondamentales</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
              <span><strong>Rigueur procédurale :</strong> chaque dossier est instruit dans le respect scrupuleux des dispositions du Code de justice administrative et du Code de procédure civile.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
              <span><strong>Indépendance et probité :</strong> l'Institut agit en toute neutralité, à l'écart de tout conflit d'intérêts direct ou indirect.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
              <span><strong>Secret procédural :</strong> l'ensemble des pièces communiquées et des entretiens conduits est couvert par une obligation stricte de confidentialité.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">Gouvernance associative</h2>
          <p>
            L'Institut est administré par un Conseil d'administration bénévole garant de l'intérêt associatif et du respect des statuts. Il supervise l'instruction des candidatures d'experts, l'attribution du label privé et la régularité des activités menées sous l'égide de l'Institut.
          </p>
        </section>

        <section className="space-y-3 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-[#0B1F3A]">Engagement déontologique</h2>
          <p>
            Les membres de l'ICRCMP souscrivent formellement à une charte déontologique stricte. Cette charte proscrit toute promesse de résultat et encadre rigoureusement le champ des interventions pour garantir la sécurité juridique des usagers.
          </p>
          <div className="pt-2">
            <Link
              href="/institut/deontologie"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#0B1F3A] hover:text-[#C9A227] transition-colors"
            >
              Consulter notre charte déontologique <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <LegalNotice type="non-avocat" />
      </div>
    </div>
  );
}
