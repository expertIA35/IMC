import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Charte déontologique et engagements professionnels | ICRCMP",
  description:
    "Découvrez les 6 engagements déontologiques de l'ICRCMP : indépendance, secret procédural, neutralité et respect strict du monopole légal des avocats.",
};

export default function DeontologiePage() {
  const engagements = [
    {
      num: "1",
      titre: "Indépendance et prévention des conflits d'intérêts",
      desc: "L'intervenant exerce sa mission en toute indépendance d'esprit et de jugement. Il s'engage à refuser ou à interrompre immédiatement toute intervention dès lors qu'apparaît un lien de subordination, un intérêt direct ou indirect, ou une circonstance de nature à altérer son impartialité.",
    },
    {
      num: "2",
      titre: "Neutralité et équidistance",
      desc: "Dans le cadre des modes amiables, l'expert certifié ne prend parti pour aucune des parties en présence. Il ne lui appartient pas d'imposer une solution, mais de favoriser les conditions d'un échange loyal, respectueux du principe du contradictoire et propice à l'émergence d'un accord mutuel.",
    },
    {
      num: "3",
      titre: "Secret procédural et stricte confidentialité",
      desc: "Toutes les informations, pièces justificatives, déclarations et correspondances échangées dans le cadre des démarches de l'Institut sont couvertes par une confidentialité absolue. Elles ne peuvent faire l'objet d'aucune divulgation à des tiers, sauf accord formel des parties ou obligation légale expresse.",
    },
    {
      num: "4",
      titre: "Respect du monopole légal des professions réglementées",
      desc: "L'Institut et ses intervenants veillent au respect scrupuleux des compétences réservées aux avocats et officiers ministériels par la loi n° 71-1130 du 31 décembre 1971. L'accompagnement proposé se concentre sur l'instruction procédurale, la médiation et la forme des actes, sans jamais dispenser de consultation juridique réservée.",
    },
    {
      num: "5",
      titre: "Obligation de qualification et d'information juridique continue",
      desc: "L'expert certifié intervient exclusivement dans le champ technique correspondant aux titres et compétences validés par l'Institut. Il s'engage à maintenir et actualiser son niveau de qualification par un suivi régulier de sessions d'information juridique procédurale.",
    },
    {
      num: "6",
      titre: "Devoir de probité et prohibition des promesses de résultat",
      desc: "L'intervenant informe loyalement le demandeur des délais légaux, de la portée des démarches et des aléas propres à chaque procédure. Il s'interdit formellement toute garantie ou promesse de résultat quant à l'issue d'une démarche gracieuse, hiérarchique ou amiable.",
    },
  ];

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "L'Institut", url: "/institut/qui-sommes-nous" },
          { name: "Charte déontologique", url: "/institut/deontologie" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Engagements Éthiques & Juridiques
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Charte déontologique de l'Institut
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          La présente charte énonce les principes déontologiques obligatoires que l'ICRCMP et l'ensemble de ses membres certifiés s'engagent à respecter.
        </p>
      </div>

      <div className="space-y-6 mb-10">
        {engagements.map((eng) => (
          <div key={eng.num} className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B1F3A] text-[#C9A227] text-xs font-bold flex items-center justify-center">
                {eng.num}
              </span>
              <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
                {eng.titre}
              </h2>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed pl-8">
              {eng.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm mb-8 flex items-center justify-between">
        <span className="text-xs text-neutral-600">
          Besoin d'un accompagnement conforme à notre déontologie ?
        </span>
        <Link
          href="/recours/demande"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#0B1F3A] hover:text-[#C9A227] transition-colors"
        >
          Déposer une demande d'accompagnement <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <LegalNotice type="non-avocat" />
    </div>
  );
}
