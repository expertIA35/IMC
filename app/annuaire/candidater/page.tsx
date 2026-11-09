"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { CheckCircle2, AlertCircle, Upload, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";

const candidatureAnnuaireSchema = z.object({
  nom: z.string().min(2, "Nom obligatoire."),
  prenom: z.string().min(2, "Prénom obligatoire."),
  email: z.string().email("Email invalide."),
  telephone: z.string().min(10, "Téléphone requis."),
  ville: z.string().min(2, "Ville requise."),
  departement: z.string().length(2, "Département (ex: 75)."),
  region: z.string().min(2, "Région requise."),
  intituleDiplome: z.string().min(5, "Intitulé du diplôme obligatoire."),
  organismeDiplome: z.string().min(3, "Université ou organisme certificateur requis."),
  anneeDiplome: z.string().length(4, "Année sur 4 chiffres."),
  bioCourte: z.string().min(30, "Présentation de 30 caractères minimum.").max(150, "150 caractères maximum."),
  acceptationDistance: z.boolean().default(false),
  acceptationCharte: z.literal(true, {
    errorMap: () => ({ message: "Acceptation de la charte de publication obligatoire." }),
  }),
  consentementRetrait: z.literal(true, {
    errorMap: () => ({ message: "Prise d'acte de la clause de retrait à tout moment obligatoire." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Consentement RGPD requis." }),
  }),
  honeypot: z.string().max(0, "Anti-spam."),
});

type FormData = z.infer<typeof candidatureAnnuaireSchema>;

export default function CandidaterAnnuairePage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(candidatureAnnuaireSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: FormData) => {
    // Simulation d'envoi API
    await new Promise((r) => setTimeout(r, 800));
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Annuaire des experts", url: "/annuaire" },
          { name: "Candidater au référencement", url: "/annuaire/candidater" },
        ]}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Procédure de Référencement
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Candidater à l'Annuaire des Experts Certifiés
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Toute publication sur l'annuaire de l'ICRCMP est conditionnée par l'audit formel de votre diplôme et la délibération du Conseil d'administration.
        </p>
      </div>

      <LegalNotice type="non-avocat" className="max-w-3xl mx-auto mb-8" />

      {isSuccess ? (
        <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-sm text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-4 border border-green-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-3">
            Dossier de Candidature Transmis
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            Votre dossier a été enregistré pour audit unitaire. Le secrétariat prendra contact avec vous après vérification de votre titre auprès de votre organisme certificateur.
          </p>
          <Link
            href="/annuaire"
            className="inline-flex items-center px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054]"
          >
            Retourner à l'annuaire
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-neutral-200/90 rounded-sm shadow-xs p-6 sm:p-8 space-y-6 max-w-3xl mx-auto" noValidate>
          <div className="hidden" aria-hidden="true">
            <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Nom *</label>
              <input type="text" {...register("nom")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="Dupont" />
              {errors.nom && <p className="text-[11px] text-red-600 mt-1">{errors.nom.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Prénom *</label>
              <input type="text" {...register("prenom")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="Claire" />
              {errors.prenom && <p className="text-[11px] text-red-600 mt-1">{errors.prenom.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Email pro *</label>
              <input type="email" {...register("email")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="claire.dupont@cabinet.fr" />
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Téléphone *</label>
              <input type="tel" {...register("telephone")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="06 00 00 00 00" />
              {errors.telephone && <p className="text-[11px] text-red-600 mt-1">{errors.telephone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Ville d'exercice *</label>
              <input type="text" {...register("ville")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="Lyon" />
              {errors.ville && <p className="text-[11px] text-red-600 mt-1">{errors.ville.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Département *</label>
              <input type="text" maxLength={2} {...register("departement")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="69" />
              {errors.departement && <p className="text-[11px] text-red-600 mt-1">{errors.departement.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Région *</label>
              <input type="text" {...register("region")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="Auvergne-Rhône-Alpes" />
              {errors.region && <p className="text-[11px] text-red-600 mt-1">{errors.region.message}</p>}
            </div>
          </div>

          {/* Diplôme */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
              Titre & Justificatif
            </span>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Intitulé officiel du diplôme *</label>
              <input type="text" {...register("intituleDiplome")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white" placeholder="Ex: DU Médiation" />
              {errors.intituleDiplome && <p className="text-[11px] text-red-600 mt-1">{errors.intituleDiplome.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Organisme délivreur *</label>
                <input type="text" {...register("organismeDiplome")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white" placeholder="Université Lyon 3" />
                {errors.organismeDiplome && <p className="text-[11px] text-red-600 mt-1">{errors.organismeDiplome.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Année *</label>
                <input type="text" maxLength={4} {...register("anneeDiplome")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white" placeholder="2019" />
                {errors.anneeDiplome && <p className="text-[11px] text-red-600 mt-1">{errors.anneeDiplome.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Bio courte de présentation (max 150 caractères) *
            </label>
            <textarea rows={2} maxLength={150} {...register("bioCourte")} className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm" placeholder="Spécialiste des baux commerciaux et de la médiation amiable..." />
            {errors.bioCourte && <p className="text-[11px] text-red-600 mt-1">{errors.bioCourte.message}</p>}
          </div>

          {/* Engagements & Clause de retrait */}
          <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm space-y-3 text-xs text-neutral-700">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" {...register("acceptationCharte")} className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A]" />
              <span>J'ai lu et j'accepte les règles stipulées dans la <Link href="/annuaire/charte" className="underline font-bold text-[#0B1F3A]" target="_blank">Charte de publication de l'annuaire</Link>. *</span>
            </label>
            {errors.acceptationCharte && <p className="text-[11px] text-red-600">{errors.acceptationCharte.message}</p>}

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" {...register("consentementRetrait")} className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A]" />
              <span><strong>Clause de retrait :</strong> Je reconnais que le Conseil d'administration de l'ICRCMP dispose de la faculté de retirer ou suspendre ma fiche à tout moment en cas de manquement déontologique ou à ma demande expresse. *</span>
            </label>
            {errors.consentementRetrait && <p className="text-[11px] text-red-600">{errors.consentementRetrait.message}</p>}

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" {...register("consentementRgpd")} className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A]" />
              <span>Consentement RGPD pour l'instruction et la publication de mon profil. *</span>
            </label>
            {errors.consentementRgpd && <p className="text-[11px] text-red-600">{errors.consentementRgpd.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#C9A227]" />
            {isSubmitting ? "Transmission en cours..." : "Soumettre mon dossier de référencement"}
          </button>
        </form>
      )}
    </div>
  );
}

