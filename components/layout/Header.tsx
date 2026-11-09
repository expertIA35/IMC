"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1F3A] text-white shadow-md py-2.5 border-b border-[#143054]"
          : "bg-[#0B1F3A]/95 text-white backdrop-blur-sm py-3 border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Officiel Complet à gauche */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#C9A227] rounded-sm py-1"
            aria-label="Accueil ICRCMP"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-full overflow-hidden bg-white/5 border border-[#C9A227] shadow-sm flex items-center justify-center">
              <Image
                src="/logo-seal.svg"
                alt="Sceau officiel ICRCMP - Institut Certifié Médiation & Recours"
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="hidden sm:block h-8 w-[1.5px] bg-[#C9A227]/70" />

            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-white group-hover:text-[#C9A227] transition-colors leading-none">
                ICRCMP
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-sans tracking-wide text-neutral-300 uppercase mt-1 leading-tight line-clamp-1 max-w-[220px] sm:max-w-xs">
                Institut Certifié de Recours Contentieux & Médiation
              </span>
            </div>
          </Link>

          {/* Navigation principale Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" aria-label="Menu principal">
            {/* L'Institut */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]">
                L'Institut
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-[#0B1F3A] border border-[#143054] shadow-xl py-2 hidden group-hover:block rounded-sm">
                <Link href="/institut/qui-sommes-nous" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Qui sommes-nous
                </Link>
                <Link href="/institut/statuts" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Statuts de l'Association
                </Link>
                <Link href="/institut/deontologie" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Charte Déontologique
                </Link>
              </div>
            </div>

            {/* Nos Expertises */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]">
                Nos Expertises
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-72 bg-[#0B1F3A] border border-[#143054] shadow-xl py-2 hidden group-hover:block rounded-sm">
                <Link href="/expertises/mediation-conciliation" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Médiation & Conciliation
                </Link>
                <Link href="/expertises/recours-contentieux" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Recours Contentieux & RAPO
                </Link>
                <Link href="/expertises/arbitrage" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Arbitrage Conventionnel
                </Link>
                <Link href="/expertises/formation" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Information Juridique Continue
                </Link>
              </div>
            </div>

            {/* Annuaire */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]">
                Annuaire
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0B1F3A] border border-[#143054] shadow-xl py-2 hidden group-hover:block rounded-sm">
                <Link href="/annuaire" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Trouver un Expert Certifié
                </Link>
                <Link href="/annuaire/candidater" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Candidater à l'Annuaire
                </Link>
                <Link href="/annuaire/charte" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Charte de Publication
                </Link>
              </div>
            </div>

            {/* Label */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]">
                Label
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0B1F3A] border border-[#143054] shadow-xl py-2 hidden group-hover:block rounded-sm">
                <Link href="/label" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Présentation du Label
                </Link>
                <Link href="/label/criteres" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Critères d'Attribution
                </Link>
                <Link href="/label/demande" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Demande de Labellisation
                </Link>
                <Link href="/label/titulaires" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Registre des Titulaires
                </Link>
                <Link href="/label/reglement" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Règlement Intérieur
                </Link>
              </div>
            </div>

            {/* Recours */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]">
                Recours
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0B1F3A] border border-[#143054] shadow-xl py-2 hidden group-hover:block rounded-sm">
                <Link href="/recours/demande" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Demande d'Accompagnement
                </Link>
                <Link href="/recours/modeles" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Modèles de Recours
                </Link>
                <Link href="/recours/faq" className="block px-4 py-2 hover:bg-[#143054] hover:text-[#C9A227]">
                  Foire Aux Questions
                </Link>
              </div>
            </div>

            {/* Doctrine */}
            <Link href="/ressources/articles" className="hover:text-[#C9A227] transition-colors">
              Doctrine & Articles
            </Link>

            <Link href="/contact" className="hover:text-[#C9A227] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Bouton CTA Adhérer */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/adhesion/formulaire"
              className="inline-flex items-center justify-center px-4 py-2 rounded-sm bg-[#C9A227] hover:bg-[#DFC05C] text-[#0B1F3A] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
            >
              Adhérer à l'Institut
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-2 border-t border-[#143054] space-y-3">
            <Link href="/institut/qui-sommes-nous" className="block py-1 hover:text-[#C9A227]">L'Institut</Link>
            <Link href="/expertises/mediation-conciliation" className="block py-1 hover:text-[#C9A227]">Expertises</Link>
            <Link href="/annuaire" className="block py-1 hover:text-[#C9A227]">Annuaire des experts certifiés</Link>
            <Link href="/label" className="block py-1 hover:text-[#C9A227]">Label associatif</Link>
            <Link href="/recours/demande" className="block py-1 hover:text-[#C9A227]">Recours & Accompagnement</Link>
            <Link href="/ressources/articles" className="block py-1 hover:text-[#C9A227]">Doctrine & Articles</Link>
            <Link href="/contact" className="block py-1 hover:text-[#C9A227]">Contact</Link>
            <Link
              href="/adhesion/formulaire"
              className="block text-center mt-4 py-2.5 bg-[#C9A227] text-[#0B1F3A] font-semibold rounded-sm"
            >
              Adhérer à l'Institut
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
