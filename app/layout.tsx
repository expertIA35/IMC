import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getOrganizationJsonLd } from "@/lib/seo/jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icrcmp.fr"),
  title: {
    default: "ICRCMP | Institut Certifié de Recours Contentieux et de Médiation Procédurale",
    template: "%s | ICRCMP",
  },
  description:
    "Organisme associatif de référence régissant l'expertise certifiée en médiation, conciliation, arbitrage conventionnel et recours contentieux administratifs en France.",
  keywords: [
    "ICRCMP",
    "médiation",
    "conciliation",
    "recours contentieux",
    "recours gracieux",
    "RAPO",
    "arbitrage",
    "expert certifié",
    "association loi 1901",
  ],
  authors: [{ name: "ICRCMP" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://icrcmp.fr",
    siteName: "ICRCMP",
    title: "ICRCMP — Rigueur Procédurale & Médiation Certifiée",
    description: "Fédération et certification d'experts indépendants en médiation et régulation des recours administratifs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F5F0] text-[#1A2332] selection:bg-[#C9A227]/30 selection:text-[#0B1F3A]">
        <a href="#contenu-principal" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu-principal" className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

