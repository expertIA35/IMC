import React from "react";
import Link from "next/link";
import { ArrowRight, Users, Scale } from "lucide-react";

interface CtaBannerProps {
  titre?: string;
  description?: string;
  lienPrincipal?: string;
  textePrincipal?: string;
  lienSecondaire?: string;
  texteSecondaire?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  titre = "Besoin d'une orientation procédurale ou d'un expert indépendant ?",
  description = "Nos membres certifiés et notre secrétariat vous assistent dans la qualification rigoureuse de vos recours et litiges.",
  lienPrincipal = "/annuaire",
  textePrincipal = "Consulter l'Annuaire des Experts",
  lienSecondaire = "/recours/demande",
  texteSecondaire = "Déposer un dossier de recours",
}) => {
  return (
    <section className="py-16 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] border border-[#DDDDCF] p-8 sm:p-12 rounded-sm shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-3">
              {titre}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <Link
              href={lienPrincipal}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#0B1F3A] hover:bg-[#143054] text-white text-sm font-semibold rounded-sm transition-colors gap-2"
            >
              {textePrincipal}
              <ArrowRight className="w-4 h-4 text-[#C9A227]" />
            </Link>
            <Link
              href={lienSecondaire}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-neutral-100 text-[#0B1F3A] border border-neutral-300 text-sm font-medium rounded-sm transition-colors"
            >
              {texteSecondaire}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

