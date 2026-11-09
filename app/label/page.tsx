import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { LabelBadge, LabelCertificatePreview } from "@/components/ui/LabelBadge";
import Link from "next/link";
import { Award, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Le Label Privé Associatif de l'Institut | ICRCMP",
  description:
    "Présentation du label privé associatif ICRCMP : distinction facultative attestant de titres vérifiés et d'un engagement déontologique. Non reconnu par l'État.",
};

export default function LabelPresentationPage() {
  const steps = [
    { num: "01", titre: "Dépôt de Candidature", desc: "Transmission des attestations, de la police d'assurance RC Pro et souscription aux engagements." },
    { num: "02", titre: "Instruction par le Secrétariat", desc: "Contrôle des pièces et, le cas échéant, vérifications complémentaires." },
    { num: "03", titre: "Procédure Contradictoire", desc: "Examen des pièces dans le respect des droits de la défense et des règles statutaires." },
    { num: "04", titre: "Décision d'Attribution", desc: "Délibération souveraine du Conseil d'administration pour une durée de 2 ans." },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: "Le Label ICRCMP", url: "/label" }]} />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <LabelBadge />
          <span className="text-xs uppercase tracking-widest text-[#0B1F3A] font-semibold">
            Distinction Privée Interne
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
          Le Label privé associatif ICRCMP
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          Le label ICRCMP est une distinction facultative délivrée par l'Institut à ses membres justifiant d'un contrôle de qualification et d'une pratique déontologique continue.
        </p>
      </div>

      {/* Mention 2 obligatoire mot pour mot */}
      <div className="p-4 bg-[#FAF9F6] border-l-4 border-[#C9A227] text-xs text-[#0B1F3A] font-medium leading-relaxed mb-8">
        Le label ICRCMP est une distinction privée interne à l'Institut. Il n'est pas une marque déposée à l'INPI. Il n'est pas reconnu par l'État. Le label atteste du respect de la charte déontologique et de la vérification des titres. Il ne garantit pas le résultat des prestations et ne confère aucun droit d'exercer une activité réservée par la loi à une profession réglementée.
      </div>

      {/* Présentation du Spécimen Officiel du Certificat de Label */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#0B1F3A]">
            Délivrance du Certificat de Label Associatif
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Chaque membre admis au label reçoit un certificat nominatif officiel numéroté, signé conjointement par le Président Chawki Fares et le Secrétaire général Abdourahim Omaich.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Ce certificat porte le sceau officiel de l'Institut, atteste de la validité biennale de la distinction et rappelle expressément les limites juridiques d'exercice.
          </p>
          <div className="pt-2">
            <Link
              href="/label/demande"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Solliciter l'attribution du label
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <LabelCertificatePreview />
        </div>
      </div>

      {/* Grille : Ce que le label garantit vs ce qu'il ne garantit pas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Ce que garantit le Label */}
        <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-green-800 font-serif font-bold text-lg">
            <CheckCircle2 className="w-5 h-5 text-green-700" />
            Ce que garantit le Label ICRCMP
          </div>
          <p className="text-xs text-neutral-500">
            Un engagement institutionnel formel contrôlé par le Conseil d'administration de l'Institut :
          </p>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />
              <span><strong>Charte déontologique signée :</strong> engagement sur la neutralité, l'indépendance et le secret procédural.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />
              <span><strong>Contrôle des pièces :</strong> contrôle des diplômes, certifications ou attestations de formation.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />
              <span><strong>Assurance RC Professionnelle :</strong> détention d'une police d'assurance valide couvrant les activités déclarées.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />
              <span><strong>Sessions d'information juridique :</strong> engagement de participation à 20 heures sur le cycle biennal.</span>
            </li>
          </ul>
        </div>

        {/* Ce que le label ne garantit pas */}
        <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#9E7E17] font-serif font-bold text-lg">
            <AlertTriangle className="w-5 h-5 text-[#C9A227]" />
            Ce que le Label ne garantit pas
          </div>
          <p className="text-xs text-neutral-500">
            Limites strictes découlant de la nature privée et du cadre légal français :
          </p>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span><strong>Aucune promesse de résultat :</strong> l'ICRCMP ne garantit aucun résultat quant à l'issue des recours engagés.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span><strong>Aucune reconnaissance par l'État :</strong> le label est une distinction privée interne, non reconnue par l'État.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span><strong>Non-substitution :</strong> l'ICRCMP ne se substitue pas à un avocat là où sa présence est obligatoire.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span><strong>Prestations individuelles :</strong> l'ICRCMP ne garantit pas les prestations individuelles de ses membres.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Procédure d'obtention en 4 étapes */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
            Instruction des Candidatures
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2">
            Procédure d'Attribution en 4 Étapes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="bg-[#FAF9F6] p-6 border border-neutral-200 rounded-sm">
              <span className="font-serif text-2xl font-bold text-[#C9A227] block mb-2">{st.num}</span>
              <h3 className="font-serif font-bold text-[#0B1F3A] text-base mb-2">{st.titre}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Durée, retrait et procédure contradictoire */}
      <div className="bg-white p-8 border border-neutral-200 rounded-sm mb-16 space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#0B1F3A]">
          Durée de validité, retrait & procédure contradictoire
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Le label est accordé pour une période de <strong>2 ans</strong>. Un contrôle annuel du maintien des conditions (cotisation, assurance, participation aux sessions d'information juridique) est effectué par le secrétariat. En cas de défaut, le label est suspendu jusqu'à régularisation.
        </p>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Toute mesure de suspension temporaire ou de radiation du label est précédée d'une notification formelle des griefs. Le titulaire dispose d'un délai de <strong>15 jours calendaires</strong> pour formuler ses observations écrites ou demander à être entendu par le Conseil d'administration.
        </p>
      </div>

      {/* Liens vers sous-rubriques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Link
          href="/label/criteres"
          className="p-6 bg-white border border-neutral-200 rounded-sm hover:border-[#0B1F3A] transition-all group"
        >
          <h4 className="font-serif font-bold text-base text-[#0B1F3A] group-hover:text-[#C9A227] mb-2">
            Critères d'Éligibilité
          </h4>
          <p className="text-xs text-neutral-500 mb-4">
            Consultez les conditions requises pour solliciter le label privé associatif.
          </p>
          <span className="text-xs font-semibold uppercase text-[#0B1F3A] flex items-center gap-1">
            Voir les critères <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/label/demande"
          className="p-6 bg-white border border-neutral-200 rounded-sm hover:border-[#0B1F3A] transition-all group"
        >
          <h4 className="font-serif font-bold text-base text-[#0B1F3A] group-hover:text-[#C9A227] mb-2">
            Demande de Labellisation
          </h4>
          <p className="text-xs text-neutral-500 mb-4">
            Formulaire officiel réservé aux membres à jour de cotisation.
          </p>
          <span className="text-xs font-semibold uppercase text-[#0B1F3A] flex items-center gap-1">
            Déposer une demande <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/label/titulaires"
          className="p-6 bg-white border border-neutral-200 rounded-sm hover:border-[#0B1F3A] transition-all group"
        >
          <h4 className="font-serif font-bold text-base text-[#0B1F3A] group-hover:text-[#C9A227] mb-2">
            Registre des Titulaires
          </h4>
          <p className="text-xs text-neutral-500 mb-4">
            Consultez le registre des membres titulaires du label avec leur consentement.
          </p>
          <span className="text-xs font-semibold uppercase text-[#0B1F3A] flex items-center gap-1">
            Consulter le registre <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Avertissement légal complet obligatoire */}
      <div className="p-4 bg-[#F2F2EC] border border-[#DDDDCF] text-xs text-[#3E4A5B] leading-relaxed rounded-sm">
        <strong>AVERTISSEMENT LÉGAL :</strong> L'Institut Certifié de Recours Contentieux et de Médiation Procédurale (ICRCMP) est une association loi 1901. Il ne se substitue pas à un avocat là où sa présence est obligatoire et ne délivre aucune consultation juridique réservée par la loi n° 71-1130 du 31 décembre 1971. Le label ICRCMP est un label privé associatif, non reconnu par l'État. L'ICRCMP ne garantit aucun résultat quant à l'issue des recours engagés. Les données transmises via les formulaires sont traitées conformément à la politique de confidentialité.
      </div>
    </div>
  );
}
