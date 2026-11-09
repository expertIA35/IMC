"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adhesionSchema } from "@/lib/schemas/forms.schema";
import { z } from "zod";
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

type FormData = z.infer<typeof adhesionSchema>;

export const AdhesionForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(adhesionSchema),
    mode: "onBlur",
    defaultValues: {
      civilite: "M.",
      statutDemande: "adherent",
      honeypot: "",
    },
  });

  const selectedStatut = watch("statutDemande");

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["civilite", "nom", "prenom", "email", "telephone", "adresse", "codePostal", "ville"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["statutDemande"];
      if (selectedStatut === "expert_certifie") {
        fieldsToValidate.push("intituleDiplome", "organismeDiplome", "anneeObtention");
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Seuls les fichiers PDF sont acceptés pour la vérification des titres.");
        e.target.value = "";
        setFileName(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier ne doit pas excéder 5 Mo.");
        e.target.value = "";
        setFileName(null);
        return;
      }
      setFileName(file.name);
    }
  };

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/adhesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la soumission du dossier. Veuillez vérifier vos informations.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur inattendue est survenue.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-sm text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-4 border border-green-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-3">
          Demande d'Adhésion Enregistrée
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          Votre dossier a été transmis au secrétariat général de l'ICRCMP. Une confirmation vous a été adressée par email.
          L'instruction de votre demande interviendra lors de la prochaine session du Conseil d'administration.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/90 rounded-sm shadow-xs max-w-3xl mx-auto overflow-hidden">
      {/* Barre de progression multi-étapes */}
      <div className="bg-[#FAF9F6] border-b border-neutral-200 p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[
            { step: 1, label: "Identité" },
            { step: 2, label: "Statut & Qualification" },
            { step: 3, label: "Déontologie & Validation" },
          ].map((item, idx) => (
            <div key={item.step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep === item.step
                      ? "bg-[#0B1F3A] text-white ring-2 ring-[#C9A227]"
                      : currentStep > item.step
                      ? "bg-green-700 text-white"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {currentStep > item.step ? "✓" : item.step}
                </div>
                <span className="text-[11px] font-medium text-neutral-600 mt-1 hidden sm:block">
                  {item.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors ${
                    currentStep > item.step ? "bg-green-700" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6" noValidate>
        {/* Champ Honeypot masqué */}
        <div className="hidden" aria-hidden="true">
          <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ÉTAPE 1 : Identité & Coordonnées */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-neutral-100 pb-2">
              Étape 1 : Identité et coordonnées du candidat
            </h3>

            <div className="w-48">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Civilité *</label>
              <select
                {...register("civilite")}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
              >
                <option value="M.">Monsieur (M.)</option>
                <option value="Mme">Madame (Mme)</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Nom *</label>
                <input
                  type="text"
                  {...register("nom")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="Ex: Dupuis"
                />
                {errors.nom && <p className="text-[11px] text-red-600 mt-1">{errors.nom.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  {...register("prenom")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="Ex: Alexandre"
                />
                {errors.prenom && <p className="text-[11px] text-red-600 mt-1">{errors.prenom.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Email personnel ou pro *</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="alexandre.dupuis@exemple.fr"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Téléphone de contact *</label>
                <input
                  type="tel"
                  {...register("telephone")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="06 12 34 56 78"
                />
                {errors.telephone && <p className="text-[11px] text-red-600 mt-1">{errors.telephone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Adresse postale complète *</label>
              <input
                type="text"
                {...register("adresse")}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                placeholder="Numéro et nom de voie"
              />
              {errors.adresse && <p className="text-[11px] text-red-600 mt-1">{errors.adresse.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Code Postal *</label>
                <input
                  type="text"
                  maxLength={5}
                  {...register("codePostal")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="75008"
                />
                {errors.codePostal && <p className="text-[11px] text-red-600 mt-1">{errors.codePostal.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Ville *</label>
                <input
                  type="text"
                  {...register("ville")}
                  className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
                  placeholder="Paris"
                />
                {errors.ville && <p className="text-[11px] text-red-600 mt-1">{errors.ville.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Statut & Justificatifs */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-neutral-100 pb-2">
              Étape 2 : Statut associatif & Qualifications
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">Statut d'adhésion sollicité *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  selectedStatut === "adherent" ? "border-[#0B1F3A] bg-[#FAF9F6] ring-1 ring-[#0B1F3A]" : "border-neutral-200 hover:bg-neutral-50"
                }`}>
                  <input
                    type="radio"
                    value="adherent"
                    {...register("statutDemande")}
                    className="sr-only"
                  />
                  <span className="font-serif font-bold text-sm text-[#0B1F3A] block mb-1">Membre Adhérent</span>
                  <span className="text-xs text-neutral-500 block">
                    Participe à la vie associative, aux assemblées générales et aux groupes de travail doctrinaux.
                  </span>
                </label>

                <label className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  selectedStatut === "expert_certifie" ? "border-[#0B1F3A] bg-[#FAF9F6] ring-1 ring-[#0B1F3A]" : "border-neutral-200 hover:bg-neutral-50"
                }`}>
                  <input
                    type="radio"
                    value="expert_certifie"
                    {...register("statutDemande")}
                    className="sr-only"
                  />
                  <span className="font-serif font-bold text-sm text-[#0B1F3A] block mb-1">Expert Certifié (Annuaire)</span>
                  <span className="text-xs text-neutral-500 block">
                    Référencement public à l'annuaire après audit unitaire du diplôme d'État ou universitaire.
                  </span>
                </label>
              </div>
            </div>

            {selectedStatut === "expert_certifie" && (
              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F3A]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  Informations sur le diplôme ouvrant droit à certification
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Intitulé exact du diplôme *</label>
                  <input
                    type="text"
                    {...register("intituleDiplome")}
                    placeholder="Ex: Diplôme Universitaire de Médiation"
                    className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Organisme / Université *</label>
                    <input
                      type="text"
                      {...register("organismeDiplome")}
                      placeholder="Ex: Université Paris-Panthéon-Assas"
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Année d'obtention *</label>
                    <input
                      type="text"
                      maxLength={4}
                      {...register("anneeObtention")}
                      placeholder="Ex: 2020"
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Justificatif du diplôme (PDF uniquement, max 5 Mo)
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-sm p-4 text-center bg-white">
                    <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf"
                      id="upload-diplome"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="upload-diplome"
                      className="cursor-pointer text-xs font-semibold text-[#0B1F3A] underline hover:text-[#C9A227]"
                    >
                      {fileName ? `Fichier sélectionné : ${fileName}` : "Sélectionner le fichier PDF"}
                    </label>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Stockage interne chiffré et strictement confidentiel. Jamais publié en clair.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ÉTAPE 3 : Déontologie & Consentements légaux */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-neutral-100 pb-2">
              Étape 3 : Déontologie et engagements légaux
            </h3>

            <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm text-xs text-neutral-700 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("acceptationCharte")}
                  className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                />
                <span className="leading-relaxed">
                  Je certifie sur l'honneur l'exactitude des informations renseignées et j'adhère sans réserve à la{" "}
                  <Link href="/institut/deontologie" className="font-bold underline text-[#0B1F3A]" target="_blank">
                    Charte Déontologique de l'ICRCMP
                  </Link>{" "}
                  (indépendance, secret procédural, probité et respect strict du monopole d'avocat instauré par la loi n° 71-1130). *
                </span>
              </label>
              {errors.acceptationCharte && (
                <p className="text-[11px] text-red-600">{errors.acceptationCharte.message}</p>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-neutral-200">
                <input
                  type="checkbox"
                  {...register("consentementRgpd")}
                  className="mt-0.5 rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                />
                <span className="leading-relaxed">
                  J'autorise l'ICRCMP à traiter mes données à caractère personnel dans le cadre exclusif de la gestion des candidatures et du fonctionnement associatif, conformément à la{" "}
                  <Link href="/legal/politique-confidentialite" className="font-bold underline text-[#0B1F3A]" target="_blank">
                    politique de confidentialité RGPD
                  </Link>. *
                </span>
              </label>
              {errors.consentementRgpd && (
                <p className="text-[11px] text-red-600">{errors.consentementRgpd.message}</p>
              )}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 rounded-sm">
              <strong>Rappel de procédure :</strong> Toute candidature fait l'objet d'un examen par la commission d'instruction avant décision définitive du Conseil d'administration. La cotisation annuelle ne sera exigible qu'après acceptation officielle de votre adhésion.
            </div>
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 text-xs font-semibold text-neutral-700 rounded-sm hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Étape précédente
            </button>
          ) : <div />}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Étape suivante
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A227]" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Envoi du dossier..." : "Soumettre mon dossier d'adhésion"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

