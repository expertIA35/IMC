"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Users } from "lucide-react";

export default function AnnuaireError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="py-16 max-w-xl mx-auto px-4 text-center"
      role="alert"
      aria-labelledby="annuaire-error-title"
    >
      <div className="bg-white border border-neutral-200 p-8 rounded-sm shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#C9A227]/40 flex items-center justify-center mx-auto text-[#0B1F3A]">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h1
          id="annuaire-error-title"
          className="font-serif text-xl font-bold text-[#0B1F3A]"
        >
          Impossible d'afficher le registre des experts
        </h1>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Le registre sécurisé des experts certifiés n'a pu être chargé
          momentanément. Aucun préjudice n'est causé à vos consultations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C9A227]" />
            Actualiser l'annuaire
          </button>

          <Link
            href="/annuaire"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-sm border border-neutral-300 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            Répertoire racine
          </Link>
        </div>
      </div>
    </div>
  );
}

