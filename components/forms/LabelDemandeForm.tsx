"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelDemandeSchema } from "@/lib/schemas/forms.schema";
import { z } from "zod";
import { Award, CheckCircle2, AlertCircle, ShieldCheck, Upload } from "lucide-react";
import Link from "next/link";

type FormData = z.infer<typeof labelDemandeSchema>;

export const LabelDemandeForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(labelDemandeSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement de la demande de labellisation.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-sm text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#FAF8EE] text-[#C9A227] flex items-center justify-center mx-auto mb-4 border border-[#C9A227]/40">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-3">
          Candidature au Label ICRCMP Enregistrée
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          Votre demande de labellisation a bien été transmise à la commission d'audit. L'instruction formelle de vos pièces (attestation RC Pro et registre de formation) sera réalisée sous 15 jours ouvrés.
        </p>
        <Link
          href="/label"
          className="inline-flex items-center px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054]"
        >
          Retour à la section Label
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-neutral-200/90 rounded-sm shadow-xs p-6 sm:p-8 space-y-6 max-w-3xl mx-auto" noValidate>
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Nom *</label>
          <input
            type="text"
            {...register("nom")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="Dupont"
          />
          {errors.nom && <p className="text-[11px] text-red-600 mt-1">{errors.nom.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Prénom *</label>
          <input
            type="text"
            {...register("prenom")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="Jean"
          />
          {errors.prenom && <p className="text-[11px] text-red-600 mt-1">{errors.prenom.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">N° d'adhérent ICRCMP *</label>
          <input
            type="text"
            {...register("numeroAdherent")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="Ex: EXP-2024-042"
          />
          {errors.numeroAdherent && <p className="text-[11px] text-red-600 mt-1">{errors.numeroAdherent.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">Email professionnel *</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
          placeholder="contact@expert-juridique.fr"
        />
        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      {/* Assurance RC Pro */}
      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-4">
        <h4 className="font-serif font-bold text-xs text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
          Couverture Responsabilité Civile Professionnelle
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Compagnie d'assurance *</label>
            <input
              type="text"
              {...register("rcProCompagnie")}
              className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white"
              placeholder="Ex: AXA, MMA, Allianz..."
            />
            {errors.rcProCompagnie && <p className="text-[11px] text-red-600 mt-1">{errors.rcProCompagnie.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Numéro de police / contrat *</label>
            <input
              type="text"
              {...register("rcProPolice")}
              className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white"
              placeholder="Ex: POL-992817462"
            />
            {errors.rcProPolice && <p className="text-[11px] text-red-600 mt-1">{errors.rcProPolice.message}</p>}
          </div>
        </div>
      </div>

      {/* Engagements statutaires */}
      <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm space-y-3 text-xs text-neutral-700">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("engagementFormation")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span>
            Je m'engage formellement à justifier d'au moins <strong>20 heures de formation continue</strong> en procédure ou médiation tous les deux ans. *
          </span>
        </label>
        {errors.engagementFormation && <p className="text-[11px] text-red-600">{errors.engagementFormation.message}</p>}

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("acceptationAudit")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span>
            J'accepte le principe des contrôles aléatoires et de la <strong>procédure contradictoire</strong> prévus par le règlement intérieur du Label. *
          </span>
        </label>
        {errors.acceptationAudit && <p className="text-[11px] text-red-600">{errors.acceptationAudit.message}</p>}

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("reconnaissanceLabelPrive")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span>
            <strong>Mention obligatoire :</strong> Je reconnais expressément qu'il s'agit d'un <em>label privé associatif délivré par l'ICRCMP, association loi 1901, non reconnu par l'État</em>. *
          </span>
        </label>
        {errors.reconnaissanceLabelPrive && <p className="text-[11px] text-red-600">{errors.reconnaissanceLabelPrive.message}</p>}

        <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-neutral-200">
          <input
            type="checkbox"
            {...register("consentementRgpd")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span>
            Consentement au traitement sécurisé des pièces d'audit conformément à la politique de confidentialité. *
          </span>
        </label>
        {errors.consentementRgpd && <p className="text-[11px] text-red-600">{errors.consentementRgpd.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
      >
        <Award className="w-4 h-4 text-[#C9A227]" />
        {isSubmitting ? "Transmission en cours..." : "Soumettre la candidature à la labellisation"}
      </button>
    </form>
  );
};

