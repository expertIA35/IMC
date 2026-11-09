import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import Link from "next/link";
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité (RGPD) | ICRCMP",
  description:
    "Engagement et conformité RGPD de l'ICRCMP : protection des données à caractère personnel, DPO, finalités des traitements et conservation des justificatifs.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "Informations légales", url: "/legal/mentions-legales" },
          { name: "Politique de Confidentialité", url: "/legal/politique-confidentialite" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Protection des Données Personnelles
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Politique de Confidentialité & Traitement RGPD
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl leading-relaxed">
          Conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés.
        </p>
      </div>

      <LegalNotice type="rgpd" className="mb-10" />

      <div className="bg-white p-8 border border-neutral-200 rounded-sm space-y-8 max-w-4xl text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            1. Responsable du Traitement & Délégué à la Protection des Données
          </h2>
          <p>
            Le responsable du traitement des données est l'association <strong>ICRCMP</strong>, ayant son siège au 12 rue de la Paix, 75002 Paris.<br />
            Pour toute question relative à l'exercice de vos droits ou à la gestion de vos données personnelles, vous pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse électronique dédiée : <code>dpo@icrcmp.fr</code>.
          </p>
        </section>

        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            2. Données Collectées & Finalités du Traitement
          </h2>
          <p>
            Les données collectées via nos formulaires en ligne font l'objet d'un traitement loyal et transparent :
          </p>
          <ul className="space-y-2 pl-4 list-disc text-neutral-600">
            <li><strong>Formulaire d'adhésion :</strong> traitement de la candidature, vérification des diplômes d'État, inscription au registre associatif.</li>
            <li><strong>Formulaire de demande de recours :</strong> qualification préalable de recevabilité du litige et orientation procédurale vers un médiateur ou instructeur certifié.</li>
            <li><strong>Mise en relation annuaire :</strong> transmission confidentielle de votre message à l'expert certifié sollicité, sans divulgation publique de vos adresses.</li>
            <li><strong>Demande de labellisation :</strong> instruction contradictoire des pièces justificatives (police d'assurance RC Pro, attestations de formation).</li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            3. Sécurité & Conservation des Diplômes et Justificatifs
          </h2>
          <p>
            Les copies des diplômes, polices d'assurance et documents de procédure transmis sont hébergées sur un <strong>stockage chiffré sécurisé à accès restreint</strong>. Elles ne sont jamais publiées sur l'annuaire public ni cédées à des tiers à des fins commerciales.
          </p>
          <p>
            Les données relatives aux dossiers de médiation non aboutis sont conservées pendant un délai maximum de 12 mois avant purge définitive. Les justificatifs des membres adhérents sont conservés pendant toute la durée de l'adhésion et pendant 3 ans à compter de la fin du mandat.
          </p>
        </section>

        <section className="space-y-2 border-t border-neutral-100 pt-6">
          <h2 className="font-serif text-lg font-bold text-[#0B1F3A]">
            4. Vos Droits Informatique et Libertés
          </h2>
          <p>
            Vous disposez d'un droit permanent d'accès, de rectification, d'effacement ("droit à l'oubli"), de limitation du traitement, de portabilité et d'opposition au traitement de vos données.
          </p>
          <p>
            Pour exercer l'un de ces droits, adressez votre demande accompagnée d'un justificatif d'identité par courrier au siège de l'ICRCMP ou par email à <code>dpo@icrcmp.fr</code>. Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL - www.cnil.fr).
          </p>
        </section>
      </div>
    </div>
  );
}

