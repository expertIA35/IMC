import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import expertsData from "@/content/data/experts.json";
import { Expert } from "@/lib/types/expert";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LabelBadge, CertificationBadge, LegalDisclaimerExpert } from "@/components/ui/LabelBadge";
import { ContactExpertForm } from "@/components/annuaire/ContactExpertForm";
import { formatDomaine } from "@/lib/utils";
import { getExpertJsonLd } from "@/lib/seo/jsonld";
import { MapPin, Globe, Calendar, ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return expertsData.map((expert) => ({
    slug: expert.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const expert = expertsData.find((e) => e.slug === params.slug) as Expert | undefined;
  if (!expert) return { title: "Expert non trouvé" };

  return {
    title: `${expert.prenom} ${expert.nom} — Expert Certifié ICRCMP`,
    description: `Fiche certifiée de ${expert.prenom} ${expert.nom}, spécialiste en ${expert.domaines.map(formatDomaine).join(", ")}. Titulaire du diplôme vérifié : ${expert.diplome.intitule}.`,
  };
}

export default function ExpertProfilePage({ params }: Props) {
  const expert = expertsData.find((e) => e.slug === params.slug) as Expert | undefined;

  if (!expert) {
    notFound();
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Données structurées JSON-LD Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getExpertJsonLd(expert)),
        }}
      />

      <Breadcrumb
        items={[
          { name: "Annuaire des experts", url: "/annuaire" },
          { name: `${expert.prenom} ${expert.nom}`, url: `/annuaire/${expert.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
        {/* Colonne Gauche & Centrale : Fiche d'identité certifiée */}
        <div className="lg:col-span-2 space-y-8">
          {/* Entête du profil */}
          <div className="bg-white p-8 border border-neutral-200/90 rounded-sm shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1F3A]">
                    {expert.prenom} {expert.nom}
                  </h1>
                  {expert.labellise && <LabelBadge />}
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Identifiant de certification ICRCMP : #{expert.id} • Statut :{" "}
                  <span className="text-green-700 font-semibold uppercase">Actif & Vérifié</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8EE] border border-[#C9A227]/40 text-[#7A6010] text-xs rounded-sm font-semibold self-start">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                Diplôme certifié conforme
              </div>
            </div>

            {/* Diplôme officiel vérifié */}
            <div className="py-6 border-b border-neutral-100 space-y-2">
              <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Diplôme & Titre vérifié en commission
              </h2>
              <div className="text-base font-serif font-bold text-[#0B1F3A]">
                {expert.diplome.intitule}
              </div>
              <div className="text-xs text-neutral-600 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#0B1F3A]" />
                <span>Délivré par {expert.diplome.organisme} en {expert.diplome.annee}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-500 italic">Justificatif audité en interne par le secrétariat</span>
              </div>
            </div>

            {/* Présentation / Biographie */}
            <div className="py-6 border-b border-neutral-100 space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Présentation synthétique & Pratique
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {expert.bioCourte}
              </p>
            </div>

            {/* Domaines d'intervention */}
            <div className="py-6 border-b border-neutral-100 space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Domaines d'intervention certifiés
              </h2>
              <div className="flex flex-wrap gap-2">
                {expert.domaines.map((domaine) => (
                  <span
                    key={domaine}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F6] border border-neutral-200 text-xs text-[#0B1F3A] font-medium rounded-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                    {formatDomaine(domaine)}
                  </span>
                ))}
              </div>
            </div>

            {/* Zone géographique & langues */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
              <div className="space-y-1">
                <span className="block font-semibold text-neutral-700">Périmètre géographique :</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>{expert.zone.ville} ({expert.zone.departement}) — Région {expert.zone.region}</span>
                </div>
                {expert.zone.aDistance && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-50 text-green-800 border border-green-200 rounded text-[11px] font-medium">
                    Procédures et séances en visioconférence acceptées
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <span className="block font-semibold text-neutral-700">Langues de travail :</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <Globe className="w-4 h-4 text-neutral-400" />
                  <span>{expert.langues.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Membre certifié depuis le {new Date(expert.dateAdhesion).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mention légale d'indépendance obligatoire */}
          <LegalDisclaimerExpert />
        </div>

        {/* Colonne Droite : Formulaire sécurisé de prise de contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 border border-neutral-200/90 rounded-sm shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-1">
              Contacter cet expert certifié
            </h3>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Formulaire de mise en relation déontologique directe avec {expert.prenom} {expert.nom}.
            </p>

            <ContactExpertForm
              expertNom={`${expert.prenom} ${expert.nom}`}
              expertSlug={expert.slug}
            />
          </div>

          {/* Encadré Déontologique */}
          <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm text-xs text-neutral-600 space-y-2">
            <div className="font-serif font-bold text-[#0B1F3A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              Garanties Déontologiques
            </div>
            <p className="text-[11px] leading-relaxed">
              L'expert s'engage au respect du secret des affaires, de la neutralité procédurale et des obligations de formation continue sous l'égide de l'Institut.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

