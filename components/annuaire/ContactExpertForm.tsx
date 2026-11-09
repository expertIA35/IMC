"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactExpertSchema } from "@/lib/schemas/forms.schema";
import { z } from "zod";
import { Send, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

type FormData = z.infer<typeof contactExpertSchema>;

export const ContactExpertForm: React.FC<{ expertNom: string; expertSlug: string }> = ({
  expertNom,
  expertSlug,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactExpertSchema),
    defaultValues: {
      expertSlug,
      honeypot: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erreur de transmission du message. Veuillez réessayer.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF9F6] border border-green-200 p-6 rounded-sm text-center">
        <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto mb-3" />
        <h4 className="font-serif font-bold text-base text-[#0B1F3A] mb-2">
          Demande de contact transmise avec succès
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
          Votre message a été acheminé de manière sécurisée et confidentielle à {expertNom}. Vous recevrez une réponse sous 48 heures ouvrées.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-xs text-[#0B1F3A] underline font-semibold hover:text-[#C9A227]"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="hidden" {...register("expertSlug")} />
      
      {/* Honeypot anti-spam masqué */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        <label htmlFor="nomDemandeur" className="block text-xs font-semibold text-neutral-700 mb-1">
          Votre nom complet <span className="text-red-600">*</span>
        </label>
        <input
          id="nomDemandeur"
          type="text"
          {...register("nomDemandeur")}
          className={`w-full p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] ${
            errors.nomDemandeur ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white"
          }`}
          placeholder="Ex: Jean Dupont"
          aria-invalid={errors.nomDemandeur ? "true" : "false"}
          aria-describedby={errors.nomDemandeur ? "nom-error" : undefined}
        />
        {errors.nomDemandeur && (
          <p id="nom-error" className="text-[11px] text-red-600 mt-1">
            {errors.nomDemandeur.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="emailDemandeur" className="block text-xs font-semibold text-neutral-700 mb-1">
            Adresse email <span className="text-red-600">*</span>
          </label>
          <input
            id="emailDemandeur"
            type="email"
            {...register("emailDemandeur")}
            className={`w-full p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] ${
              errors.emailDemandeur ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white"
            }`}
            placeholder="votre.email@domaine.fr"
            aria-invalid={errors.emailDemandeur ? "true" : "false"}
            aria-describedby={errors.emailDemandeur ? "email-error" : undefined}
          />
          {errors.emailDemandeur && (
            <p id="email-error" className="text-[11px] text-red-600 mt-1">
              {errors.emailDemandeur.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="telephoneDemandeur" className="block text-xs font-semibold text-neutral-700 mb-1">
            Téléphone <span className="text-red-600">*</span>
          </label>
          <input
            id="telephoneDemandeur"
            type="tel"
            {...register("telephoneDemandeur")}
            className={`w-full p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] ${
              errors.telephoneDemandeur ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white"
            }`}
            placeholder="06 12 34 56 78"
            aria-invalid={errors.telephoneDemandeur ? "true" : "false"}
            aria-describedby={errors.telephoneDemandeur ? "tel-error" : undefined}
          />
          {errors.telephoneDemandeur && (
            <p id="tel-error" className="text-[11px] text-red-600 mt-1">
              {errors.telephoneDemandeur.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 mb-1">
          Objet et nature sommaire du différend <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className={`w-full p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] ${
            errors.message ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white"
          }`}
          placeholder="Décrivez succinctement le cadre de votre demande (matière administrative, litige civil, besoin de médiation...)"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-[11px] text-red-600 mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Prise d'acte déontologique obligatoire */}
      <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-sm space-y-2 text-xs">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("consentementNonAvocat")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span className="text-neutral-700 leading-tight">
            Je reconnais expressément que l'expert certifié ICRCMP n'intervient pas en qualité d'avocat et ne dispense aucun conseil juridique relevant du monopole légal (loi n° 71-1130). <span className="text-red-600">*</span>
          </span>
        </label>
        {errors.consentementNonAvocat && (
          <p className="text-[11px] text-red-600">{errors.consentementNonAvocat.message}</p>
        )}

        <label className="flex items-start gap-2 cursor-pointer pt-1">
          <input
            type="checkbox"
            {...register("consentementRgpd")}
            className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
          />
          <span className="text-neutral-700 leading-tight">
            J'accepte que mes coordonnées soient transmises à l'expert à des fins exclusives de mise en relation déontologique, conformément à la{" "}
            <Link href="/legal/politique-confidentialite" className="underline hover:text-[#0B1F3A]">
              politique de confidentialité
            </Link>. <span className="text-red-600">*</span>
          </span>
        </label>
        {errors.consentementRgpd && (
          <p className="text-[11px] text-red-600">{errors.consentementRgpd.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5 text-[#C9A227]" />
        {isSubmitting ? "Transmission en cours..." : "Transmettre la demande de contact"}
      </button>

      <p className="text-[10px] text-neutral-500 text-center">
        Formulaire sécurisé. Aucune adresse email n'est divulguée en clair afin de prévenir le démarchage et le spam.
      </p>
    </form>
  );
};

