"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Traçabilité interne de l'incident sans fuite de stack trace publique
    console.error("[ICRCMP Error Boundary]", error);
  }, [error]);

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center max-w-2xl mx-auto px-4 sm:px-6 py-16"
      role="alert"
      aria-labelledby="error-title"
    >
      <div className="bg-white border border-[#DDDDCF] p-8 sm:p-12 rounded-sm shadow-xs text-center w-full">
        <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#C9A227]/40 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-[#0B1F3A]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold block mb-2">
          Incident Technique
        </span>

        <h1
          id="error-title"
          className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1F3A] mb-4"
        >
          Une anomalie de chargement est survenue
        </h1>

        <p className="text-sm text-neutral-600 leading-relaxed mb-8 max-w-lg mx-auto">
          Nos services de contrôle de conformité ont intercepté une interruption
          technique. Vos données et démarches demeurent sécurisées.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors focus:ring-2 focus:ring-[#C9A227]"
          >
            <RotateCcw className="w-4 h-4 text-[#C9A227]" />
            Réessayer l'affichage
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors border border-neutral-300 focus:ring-2 focus:ring-[#0B1F3A]"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

