import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbJsonLd } from "@/lib/seo/jsonld";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const allItems = [{ name: "Accueil", url: "/" }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(allItems)),
        }}
      />
      <nav aria-label="Fil d'Ariane" className="py-4">
        <ol className="flex items-center space-x-2 text-xs text-neutral-500">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={item.url} className="flex items-center">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-400" />}
                {isLast ? (
                  <span className="font-medium text-[#0B1F3A]" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="hover:text-[#0B1F3A] hover:underline transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

