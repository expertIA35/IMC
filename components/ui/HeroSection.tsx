import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, CheckCircle, ArrowRight, FileCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B1F3A] text-white overflow-hidden py-16 lg:py-24 border-b border-[#143054]">
      {/* Texture géométrique sobre de fond */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche : Texte & Accroche */}
          <div className="lg:col-span-8">
            {/* Badge institutionnel */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-neutral-300 text-xs uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              Association Loi 1901 — Régulation Procédurale
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Institut Certifié de Recours Contentieux et de Médiation Procédurale
            </h1>

            <p className="font-serif italic text-xl lg:text-2xl text-[#C9A227] mb-6">
              « L'expertise certifiée au service de vos recours »
            </p>

            <p className="text-base sm:text-lg text-neutral-300 mb-10 leading-relaxed font-light max-w-2xl">
              Fédération d’experts indépendants qualifiés en médiation conventionnelle, arbitrage et instruction des recours administratifs préalables obligatoires. Un cadre déontologique éprouvé pour sécuriser vos démarches et favoriser la résolution amiable des différends.
            </p>

            {/* Actions CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/annuaire"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-[#C9A227] hover:bg-[#DFC05C] text-[#0B1F3A] font-semibold text-sm transition-colors shadow-sm gap-2"
              >
                Trouver un expert certifié
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/recours/demande"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                Demande d'accompagnement procédural
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Blason / Sceau Institutionnel Officiel */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative p-6 sm:p-8 rounded-sm bg-gradient-to-b from-[#143054]/40 to-[#0B1F3A]/80 border border-[#C9A227]/50 shadow-2xl backdrop-blur-sm max-w-xs text-center flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-[#061224] border-2 border-[#C9A227] shadow-inner mb-4 flex items-center justify-center">
                <Image
                  src="/logo-seal.svg"
                  alt="Sceau officiel ICRCMP - Médiation & Recours"
                  width={200}
                  height={200}
                  priority
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <span className="font-serif font-bold text-white text-base tracking-wide block">
                Sceau d'Authenticité
              </span>
              <span className="text-[11px] text-[#C9A227] tracking-wider uppercase mt-1">
                Garantie Déontologique & Titres Vérifiés
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
