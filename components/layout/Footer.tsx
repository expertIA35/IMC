import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Scale } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F3A] text-neutral-300 border-t border-[#143054] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Colonne 1 : Institut & Logo officiel */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C9A227] bg-[#061224] flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logo-seal.svg"
                  alt="Sceau officiel ICRCMP"
                  width={46}
                  height={46}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base tracking-wider block">
                  ICRCMP
                </span>
                <span className="text-[10px] text-[#C9A227] tracking-wider uppercase block">
                  Institut Certifié
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Association loi 1901 d'intérêt procédural, dédiée à la diffusion des modes amiables de règlement des différends et à l'assistance rigoureuse aux recours administratifs.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/institut/qui-sommes-nous" className="hover:text-[#C9A227] transition-colors">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link href="/institut/statuts" className="hover:text-[#C9A227] transition-colors">
                  Statuts officiels (PDF)
                </Link>
              </li>
              <li>
                <Link href="/institut/deontologie" className="hover:text-[#C9A227] transition-colors">
                  Charte de déontologie
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 2 : Expertises */}
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              Nos Expertises
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/expertises/mediation-conciliation" className="hover:text-[#C9A227] transition-colors">
                  Médiation & Conciliation
                </Link>
              </li>
              <li>
                <Link href="/expertises/recours-contentieux" className="hover:text-[#C9A227] transition-colors">
                  Recours contentieux & RAPO
                </Link>
              </li>
              <li>
                <Link href="/expertises/arbitrage" className="hover:text-[#C9A227] transition-colors">
                  Arbitrage conventionnel
                </Link>
              </li>
              <li>
                <Link href="/expertises/formation" className="hover:text-[#C9A227] transition-colors">
                  Information juridique continue
                </Link>
              </li>
              <li>
                <Link href="/recours/modeles" className="hover:text-[#C9A227] transition-colors">
                  Modèles de courriers gracieux
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Ressources & Accès */}
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              Ressources & Accès
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/annuaire" className="hover:text-[#C9A227] transition-colors">
                  Annuaire des experts certifiés
                </Link>
              </li>
              <li>
                <Link href="/label" className="hover:text-[#C9A227] transition-colors">
                  Label privé associatif ICRCMP
                </Link>
              </li>
              <li>
                <Link href="/ressources/articles" className="hover:text-[#C9A227] transition-colors">
                  Doctrine & Articles
                </Link>
              </li>
              <li>
                <Link href="/ressources/glossaire" className="hover:text-[#C9A227] transition-colors">
                  Glossaire procédural
                </Link>
              </li>
              <li>
                <Link href="/adhesion/tarifs" className="hover:text-[#C9A227] transition-colors">
                  Barème des cotisations
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Mentions Légales & Conformité */}
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              Cadre Réglementaire
            </h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href="/legal/mentions-legales" className="hover:text-[#C9A227] transition-colors">
                  Mentions légales & RNA
                </Link>
              </li>
              <li>
                <Link href="/legal/politique-confidentialite" className="hover:text-[#C9A227] transition-colors">
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-[#C9A227] transition-colors">
                  Gestion des cookies
                </Link>
              </li>
              <li>
                <Link href="/legal/accessibilite" className="hover:text-[#C9A227] transition-colors">
                  Déclaration d'accessibilité (RGAA)
                </Link>
              </li>
            </ul>
            <div className="p-3 bg-[#061224] rounded border border-[#143054] text-[11px] text-neutral-400">
              RNA : W751234567 • Siège : Paris, France • Association régie par la loi du 1er juillet 1901.
            </div>
          </div>
        </div>

        {/* Encadré d'avertissement juridique solennel imposé */}
        <div className="border-t border-[#143054] pt-8 mb-8">
          <div className="bg-[#08182D] border-l-4 border-[#C9A227] p-4 text-xs text-neutral-300 leading-relaxed rounded-sm flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">
                AVERTISSEMENT DÉONTOLOGIQUE MAJEUR (LOI N° 71-1130 DU 31 DÉCEMBRE 1971) :
              </strong>
              L'Institut Certifié de Recours Contentieux et de Médiation Procédurale (ICRCMP) ne se substitue pas à un avocat là où sa présence est obligatoire et ne délivre aucune consultation juridique réservée par la loi n° 71-1130 du 31 décembre 1971. Le label ICRCMP est un label privé associatif, non reconnu par l'État. L'ICRCMP ne garantit aucun résultat quant à l'issue des recours engagés. Les données transmises via les formulaires sont traitées conformément à la politique de confidentialité.
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 pt-4 border-t border-[#143054]">
          <p>© {new Date().getFullYear()} ICRCMP — Institut Certifié de Recours Contentieux et de Médiation Procédurale. Tous droits réservés.</p>
          <p className="mt-2 sm:mt-0">Plateforme institutionnelle conforme RGAA / WCAG AA.</p>
        </div>
      </div>
    </footer>
  );
};
