import React from "react";

export default function AnnuaireLoading() {
  return (
    <div
      className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse"
      role="status"
      aria-label="Chargement de l'annuaire des experts certifiés"
    >
      {/* Header skeleton */}
      <div className="border-b border-neutral-200 pb-8 mb-8 space-y-3">
        <div className="h-4 w-32 bg-[#E2E2DC] rounded-sm" />
        <div className="h-9 w-2/3 max-w-xl bg-[#D5D5CD] rounded-sm" />
        <div className="h-4 w-1/2 max-w-lg bg-[#E2E2DC] rounded-sm" />
      </div>

      {/* Barre de recherche skeleton */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm mb-8 space-y-4">
        <div className="h-10 bg-[#FAF9F6] border border-[#E2E2DC] rounded-sm w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="h-8 bg-[#E2E2DC] rounded-sm" />
          <div className="h-8 bg-[#E2E2DC] rounded-sm" />
          <div className="h-8 bg-[#E2E2DC] rounded-sm" />
          <div className="h-8 bg-[#E2E2DC] rounded-sm" />
        </div>
      </div>

      {/* Grille de cartes experts skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-neutral-200 rounded-sm p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-5 w-40 bg-[#D5D5CD] rounded-sm" />
                <div className="h-3 w-28 bg-[#E2E2DC] rounded-sm" />
              </div>
              <div className="h-5 w-24 bg-[#C9A227]/20 rounded-sm" />
            </div>

            <div className="h-6 w-full bg-[#FAF9F6] border border-[#E2E2DC] rounded-sm" />

            <div className="space-y-2">
              <div className="h-3 w-full bg-[#E2E2DC] rounded-sm" />
              <div className="h-3 w-4/5 bg-[#E2E2DC] rounded-sm" />
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-between">
              <div className="h-4 w-24 bg-[#E2E2DC] rounded-sm" />
              <div className="h-8 w-28 bg-[#0B1F3A]/20 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Chargement de l'annuaire...</span>
    </div>
  );
}

