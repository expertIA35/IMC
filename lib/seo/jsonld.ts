export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://icrcmp.fr";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentPermit", // ou LegalService / NGO
    "@id": `${SITE_URL}/#organization`,
    name: "Institut Certifié de Recours Contentieux et de Médiation Procédurale",
    alternateName: "ICRCMP",
    description: "Association loi 1901 d'intérêt procédural, fédérant des experts certifiés en médiation, conciliation, arbitrage et recours administratifs préalables.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icrcmp.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 rue de la Paix",
      addressLocality: "Paris",
      postalCode: "75002",
      addressCountry: "FR",
    },
    founder: [
      {
        "@type": "Person",
        name: "Chawki Fares",
        jobTitle: "Président",
      },
      {
        "@type": "Person",
        name: "Abdourahim Omaich",
        jobTitle: "Secrétaire général",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Secrétariat procédural",
      email: "contact@icrcmp.fr",
      telephone: "+33100000000",
    },
  };
}

export function getExpertJsonLd(expert: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${expert.prenom} ${expert.nom}`,
    jobTitle: `Expert certifié ICRCMP - ${expert.diplome.intitule}`,
    description: expert.bioCourte,
    worksFor: {
      "@type": "Organization",
      name: "Institut Certifié de Recours Contentieux et de Médiation Procédurale",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: expert.zone.ville,
      addressRegion: expert.zone.region,
      addressCountry: "FR",
    },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

