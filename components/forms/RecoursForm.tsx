"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoursSchema } from "@/lib/schemas/forms.schema";
import { z } from "zod";
import { CheckCircle2, Send, AlertCircle, FileText, Upload } from "lucide-react";
import Link from "next/link";

type FormData = z.infer<typeof recoursSchema>;

export const RecoursForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(recoursSchema),
    defaultValues: {
      typeLitige: "administratif",
      honeypot: "",
    },
  });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names: string[] = [];
      Array.from(e.target.files).forEach((file) => {
        if (file.size <= 8 * 1024 * 1024) {
          names.push(file.name);
        }
      });
      setUploadedFiles(names);
    }
  };

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/recours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erreur de transmission du dossier. Veuillez vérifier votre saisie.");
      }

      setIsSuccess(true);
      reset();
      setUploadedFiles([]);
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-sm text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-4 border border-green-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-3">
          Demande d'Accompagnement Enregistrée
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          Votre dossier a été transmis à la cellule d'instruction de l'Institut. Un accusé de réception vous a été envoyé par email. Une première qualification de recevabilité et des délais vous sera communiquée sous 48 à 72 heures.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054]"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-neutral-200/90 rounded-sm shadow-xs p-6 sm:p-8 space-y-6 max-w-3xl mx-auto" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Type de litige */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Nature juridique du litige *
        </label>
        <select
          {...register("typeLitige")}
          className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
        >
          <option value="administratif">Litige administratif (RAPO, recours gracieux / hiérarchique)</option>
          <option value="civil">Litige civil (voisinage, bail, exécution de contrat civil)</option>
          <option value="commercial">Litige commercial (conflit interentreprises, sous-traitance)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Administration ou partie adverse concernée *
          </label>
          <input
            type="text"
            {...register("administrationConcernee")}
            placeholder="Ex: Préfecture, CAF, Bailleur, Société X"
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
          />
          {errors.administrationConcernee && (
            <p className="text-[11px] text-red-600 mt-1">{errors.administrationConcernee.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Délai restant / Date de notification *
          </label>
          <input
            type="text"
            {...register("delaiRestant")}
            placeholder="Ex: Notification reçue le 15/10/2024 (délai 2 mois)"
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
          />
          {errors.delaiRestant && (
            <p className="text-[11px] text-red-600 mt-1">{errors.delaiRestant.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Objet succinct de la contestation *
        </label>
        <input
          type="text"
          {...register("objet")}
          placeholder="Ex: Recours gracieux contre un refus de permis d'aménager"
          className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
        />
        {errors.objet && <p className="text-[11px] text-red-600 mt-1">{errors.objet.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Exposé chronologique des faits et motifs de contestation *
        </label>
        <textarea
          rows={5}
          {...register("description")}
          placeholder="Détaillez chronologiquement la décision querellée, les démarches déjà entreprises et les points de désaccord..."
          className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
        />
        {errors.description && (
          <p className="text-[11px] text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Multi-upload pièces jointes */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Pièces justificatives (Décision contestée, courriers échangés - PDF/JPG max 8 Mo)
        </label>
        <div className="border-2 border-dashed border-neutral-300 rounded-sm p-4 text-center bg-[#FAF9F6]">
          <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            id="recours-files"
            className="hidden"
            onChange={handleFiles}
          />
          <label
            htmlFor="recours-files"
            className="cursor-pointer text-xs font-semibold text-[#0B1F3A] underline hover:text-[#C9A227]"
          >
            Sélectionner les documents
          </label>
          {uploadedFiles.length > 0 && (
            <div className="mt-2 text-xs text-neutral-700">
              {uploadedFiles.length} fichier(s) prêt(s) : {uploadedFiles.join(", ")}
            </div>
          )}
          <p className="text-[10px] text-neutral-400 mt-1">
            Les documents sont transmis de manière strictement confidentielle pour instruction préalable.
          </p>
        </div>
      </div>

      {/* Coordonnées du déclarant */}
      <div className="border-t border-neutral-100 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Nom complet *</label>
          <input
            type="text"
            {...register("nom")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="Jean Dupont"
          />
          {errors.nom && <p className="text-[11px] text-red-600 mt-1">{errors.nom.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Email *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="jean.dupont@email.com"
          />
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Téléphone *</label>
          <input
            type="tel"
            {...register("telephone")}
            className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm"
            placeholder="06 12 34 56 78"
          />
          {errors.telephone && (
            <p className="text-[11px] text-red-600 mt-1">{errors.telephone.message}</p>
          )}
        </div>
      </div>

      {/* Consentements solennels */}
      <div className="p-4 bg-neutral-100 border border-neutral-200 rounded-sm space-y-2 text-xs">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("consentementNonAvocat")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span className="text-neutral-700 leading-tight">
            <strong>Reconnaissance de non-substitution :</strong> Je prends acte que l'ICRCMP est une association loi 1901 et qu'elle ne se substitue en aucun cas à un avocat. L'accompagnement proposé relève exclusivement de la médiation et de l'aide technique à la formulation des recours administratifs gracieux préalables. *
          </span>
        </label>
        {errors.consentementNonAvocat && (
          <p className="text-[11px] text-red-600">{errors.consentementNonAvocat.message}</p>
        )}

        <label className="flex items-start gap-2.5 cursor-pointer pt-2">
          <input
            type="checkbox"
            {...register("consentementRgpd")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span className="text-neutral-700 leading-tight">
            J'autorise l'instruction de mon dossier conformément aux dispositions du RGPD et à la{" "}
            <Link href="/legal/politique-confidentialite" className="underline hover:text-[#0B1F3A]">
              politique de confidentialité
            </Link>. *
          </span>
        </label>
        {errors.consentementRgpd && (
          <p className="text-[11px] text-red-600">{errors.consentementRgpd.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5 text-[#C9A227]" />
        {isSubmitting ? "Transmission du dossier..." : "Transmettre la demande d'accompagnement"}
      </button>
    </form>
  );
};

