import React from "react";

export default function Loading() {
  return (
    <div
      className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse"
      role="status"
      aria-live="polite"
      aria-label="Chargement du contenu institutionnel en cours"
    >
      {/* Skeleton Hero / En-tête */}
      <div className="space-y-4 max-w-3xl mb-12">
        <div className="h-4 w-36 bg-[#E2E2DC] rounded-sm" />
        <div className="h-10 w-full sm:w-3/4 bg-[#D5D5CD] rounded-sm" />
        <div className="h-4 w-1/2 bg-[#E2E2DC] rounded-sm" />
      </div>

      {/* Skeleton Grille 3 blocs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-8 bg-white border border-[#E2E2DC] rounded-sm space-y-4"
          >
            <div className="w-10 h-10 bg-[#0B1F3A]/10 rounded-sm" />
            <div className="h-6 w-3/4 bg-[#D5D5CD] rounded-sm" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-[#E2E2DC] rounded-sm" />
              <div className="h-3 w-5/6 bg-[#E2E2DC] rounded-sm" />
              <div className="h-3 w-2/3 bg-[#E2E2DC] rounded-sm" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Chargement de la page en cours...</span>
    </div>
  );
}

