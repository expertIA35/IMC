"use client";

import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Expert } from "@/lib/types/expert";
import { ExpertCard } from "@/components/annuaire/ExpertCard";
import { Search, SlidersHorizontal, LayoutGrid, List, RotateCcw } from "lucide-react";

interface AnnuaireClientProps {
  initialExperts: Expert[];
}

export const AnnuaireClient: React.FC<AnnuaireClientProps> = ({ initialExperts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [onlyLabellise, setOnlyLabellise] = useState(false);
  const [onlyDistance, setOnlyDistance] = useState(false);
  const [sortBy, setSortBy] = useState<"pertinence" | "nom" | "anciennete">("pertinence");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Configuration Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(initialExperts, {
      keys: ["nom", "prenom", "zone.ville", "zone.region", "domaines", "diplome.intitule", "bioCourte"],
      threshold: 0.35,
    });
  }, [initialExperts]);

  // Filtrage combiné
  const filteredExperts = useMemo(() => {
    let list = initialExperts;

    // Recherche texte
    if (searchQuery.trim().length > 0) {
      list = fuse.search(searchQuery).map((res) => res.item);
    }

    // Filtre Domaine
    if (selectedDomaine !== "all") {
      list = list.filter((exp) => exp.domaines.includes(selectedDomaine as any));
    }

    // Filtre Région
    if (selectedRegion !== "all") {
      list = list.filter((exp) => exp.zone.region === selectedRegion);
    }

    // Filtre Label
    if (onlyLabellise) {
      list = list.filter((exp) => exp.labellise);
    }

    // Filtre Distanciel
    if (onlyDistance) {
      list = list.filter((exp) => exp.zone.aDistance);
    }

    // Tri
    if (sortBy === "nom") {
      list = [...list].sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortBy === "anciennete") {
      list = [...list].sort((a, b) => new Date(a.dateAdhesion).getTime() - new Date(b.dateAdhesion).getTime());
    }

    return list;
  }, [initialExperts, fuse, searchQuery, selectedDomaine, selectedRegion, onlyLabellise, onlyDistance, sortBy]);

  // Régions uniques
  const uniqueRegions = useMemo(() => {
    return Array.from(new Set(initialExperts.map((exp) => exp.zone.region))).sort();
  }, [initialExperts]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDomaine("all");
    setSelectedRegion("all");
    setOnlyLabellise(false);
    setOnlyDistance(false);
    setSortBy("pertinence");
  };

  return (
    <div className="space-y-8">
      {/* Barre de recherche & contrôles */}
      <div className="bg-white p-6 border border-neutral-200/90 rounded-sm shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, ville, spécialité, diplôme..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] focus:border-[#0B1F3A]"
            aria-label="Rechercher un expert"
          />
        </div>

        {/* Filtres interactifs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label htmlFor="filter-domaine" className="block text-xs font-semibold text-neutral-600 mb-1">
              Spécialité
            </label>
            <select
              id="filter-domaine"
              value={selectedDomaine}
              onChange={(e) => setSelectedDomaine(e.target.value)}
              className="w-full p-2 text-xs border border-neutral-300 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
            >
              <option value="all">Toutes les spécialités</option>
              <option value="mediation">Médiation & Conciliation</option>
              <option value="conciliation">Conciliation amiable</option>
              <option value="arbitrage">Arbitrage conventionnel</option>
              <option value="recours">Recours administratif (RAPO)</option>
              <option value="formation">Formation procédurale</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter-region" className="block text-xs font-semibold text-neutral-600 mb-1">
              Région
            </label>
            <select
              id="filter-region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 text-xs border border-neutral-300 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
            >
              <option value="all">Toutes les régions</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-sort" className="block text-xs font-semibold text-neutral-600 mb-1">
              Tri
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 text-xs border border-neutral-300 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
            >
              <option value="pertinence">Pertinence</option>
              <option value="nom">Nom alphabétique</option>
              <option value="anciennete">Ancienneté d'adhésion</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-1.5 p-2 text-xs text-neutral-600 hover:text-[#0B1F3A] border border-neutral-300 hover:bg-neutral-50 rounded-sm transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        {/* Checkbox filtres rapides */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-neutral-100 text-xs text-neutral-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyLabellise}
              onChange={(e) => setOnlyLabellise(e.target.checked)}
              className="rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
            />
            <span>Uniquement titulaires du <strong>Label ICRCMP</strong></span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyDistance}
              onChange={(e) => setOnlyDistance(e.target.checked)}
              className="rounded border-neutral-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
            />
            <span>Intervention à distance (visio) acceptée</span>
          </label>
        </div>
      </div>

      {/* Barre de résultats et sélecteur de vue */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <div aria-live="polite">
          <strong>{filteredExperts.length}</strong> expert{filteredExperts.length > 1 ? "s" : ""} certifié{filteredExperts.length > 1 ? "s" : ""} trouvé{filteredExperts.length > 1 ? "s" : ""}
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-2">Affichage :</span>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-sm border ${
              viewMode === "grid"
                ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50"
            }`}
            aria-label="Affichage en grille"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-sm border ${
              viewMode === "list"
                ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50"
            }`}
            aria-label="Affichage en liste"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Liste des résultats */}
      {filteredExperts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-neutral-200/90 rounded-sm">
          <p className="text-base font-serif font-bold text-[#0B1F3A] mb-2">
            Aucun expert certifié ne correspond à ces critères
          </p>
          <p className="text-xs text-neutral-500 mb-6 max-w-md mx-auto">
            Veuillez élargir votre périmètre géographique ou réinitialiser vos critères de recherche.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
};

