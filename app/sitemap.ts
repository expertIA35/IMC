import { MetadataRoute } from "next";
import expertsData from "@/content/data/experts.json";
import articlesData from "@/content/data/articles.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://icrcmp.fr";

  const staticRoutes = [
    "",
    "/institut/qui-sommes-nous",
    "/institut/statuts",
    "/institut/equipe",
    "/institut/deontologie",
    "/expertises/mediation-conciliation",
    "/expertises/recours-contentieux",
    "/expertises/arbitrage",
    "/expertises/formation",
    "/annuaire",
    "/annuaire/candidater",
    "/annuaire/charte",
    "/label",
    "/label/criteres",
    "/label/demande",
    "/label/reglement",
    "/label/titulaires",
    "/adhesion/comment-adherer",
    "/adhesion/formulaire",
    "/adhesion/tarifs",
    "/recours/demande",
    "/recours/modeles",
    "/recours/faq",
    "/ressources/articles",
    "/ressources/guides",
    "/ressources/glossaire",
    "/contact",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/cookies",
    "/legal/accessibilite",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/annuaire") || route.startsWith("/label") ? 0.8 : 0.6,
  }));

  const expertRoutes = expertsData.map((expert) => ({
    url: `${baseUrl}/annuaire/${expert.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articlesData.map((article) => ({
    url: `${baseUrl}/ressources/articles/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...expertRoutes, ...articleRoutes];
}

