import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Statuts officiels de l'association loi 1901 | ICRCMP",
  description:
    "Consultez et téléchargez les statuts officiels de l'ICRCMP, association déclarée régie par la loi du 1er juillet 1901. Transparence institutionnelle.",
};

export default function StatutsPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { name: "L'Institut", url: "/institut/qui-sommes-nous" },
          { name: "Statuts officiels", url: "/institut/statuts" },
        ]}
      />

      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Transparence Institutionnelle
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-3">
          Statuts officiels de l'Institut
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Les statuts de l'ICRCMP définissent son objet social, ses règles d'administration ainsi que les conditions d'adhésion de ses membres.
        </p>
      </div>

      <div className="bg-white p-8 border border-neutral-200 rounded-sm space-y-6 text-sm text-neutral-700 leading-relaxed shadow-xs">
        <p>
          Conformément aux dispositions de la loi du 1er juillet 1901 et du décret du 16 août 1901, l'ICRCMP met ses statuts à la libre disposition du public. Ce document fixe les attributions du Conseil d'administration, les modalités de tenue de l'Assemblée générale et le fonctionnement des commissions d'instruction.
        </p>
        <p>
          Toute adhésion, en qualité de membre adhérent ou d'expert certifié, emporte acceptation sans réserve de ces dispositions statutaires.
        </p>

        <div className="p-6 bg-[#FAF9F6] border border-neutral-200 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-[#0B1F3A] block">Statuts de l'ICRCMP</span>
              <span className="text-xs text-neutral-500">Document public officiel • Format PDF</span>
            </div>
          </div>
          <a
            href="/statuts-icrcmp.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#143054] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C9A227]" />
            Télécharger les statuts (PDF)
          </a>
        </div>

        <p className="text-xs text-neutral-500 italic text-center">
          Les statuts sont publics et consultables conformément à la loi 1901.
        </p>
      </div>

      <div className="mt-8">
        <LegalNotice type="non-avocat" />
      </div>
    </div>
  );
}
