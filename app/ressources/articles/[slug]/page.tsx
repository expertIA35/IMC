import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { MDXContent } from "@/components/ui/MDXContent";
import articlesData from "@/content/data/articles.json";
import { Calendar, User, Clock, Bookmark, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

function parseMdxFile(slug: string) {
  const filePath = path.join(process.cwd(), "content", "mdx", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    // Si pas de fichier mdx dédié, regarder dans articles.json
    const article = articlesData.find((a) => a.slug === slug);
    if (!article) return null;
    return {
      title: article.titre,
      date: article.date,
      author: article.auteur,
      category: article.categorie,
      summary: article.resume,
      readingTime: article.tempsLecture,
      content: article.contenu,
    };
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  let title = "Article de Doctrine";
  let date = "Date non précisée";
  let author = "Commission ICRCMP";
  let category = "Doctrine Procédurale";
  let summary = "";
  let readingTime = "5 min";

  let insideFrontmatter = false;
  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "---") {
      if (!insideFrontmatter) {
        insideFrontmatter = true;
      } else {
        bodyStartIndex = i + 1;
        break;
      }
      continue;
    }

    if (insideFrontmatter) {
      if (line.startsWith("title:")) title = line.replace("title:", "").replace(/["']/g, "").trim();
      if (line.startsWith("date:")) date = line.replace("date:", "").replace(/["']/g, "").trim();
      if (line.startsWith("author:")) author = line.replace("author:", "").replace(/["']/g, "").trim();
      if (line.startsWith("category:")) category = line.replace("category:", "").replace(/["']/g, "").trim();
      if (line.startsWith("summary:")) summary = line.replace("summary:", "").replace(/["']/g, "").trim();
      if (line.startsWith("readingTime:")) readingTime = line.replace("readingTime:", "").replace(/["']/g, "").trim();
    }
  }

  const content = lines.slice(bodyStartIndex).join("\n");
  return { title, date, author, category, summary, readingTime, content };
}

export async function generateStaticParams() {
  const mdxDir = path.join(process.cwd(), "content", "mdx");
  let slugs: string[] = [];
  if (fs.existsSync(mdxDir)) {
    slugs = fs
      .readdirSync(mdxDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(".mdx", ""));
  }
  const jsonSlugs = articlesData.map((a) => a.slug);
  const all = Array.from(new Set([...slugs, ...jsonSlugs]));

  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = parseMdxFile(params.slug);
  if (!article) return { title: "Article introuvable" };

  return {
    title: `${article.title} | Doctrine ICRCMP`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = parseMdxFile(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Institut Certifié de Recours Contentieux et de Médiation Procédurale",
      logo: "https://icrcmp.fr/logo.svg",
    },
    datePublished: article.date,
    mainEntityOfPage: `https://icrcmp.fr/ressources/articles/${params.slug}`,
  };

  return (
    <article className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { name: "Doctrine & Articles", url: "/ressources/articles" },
          { name: article.title, url: `/ressources/articles/${params.slug}` },
        ]}
      />

      {/* En-tête de l'article */}
      <header className="border-b border-neutral-200 pb-8 my-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded bg-[#FAF8EE] border border-[#C9A227]/40 text-[#7A6010] text-xs font-semibold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-neutral-400">•</span>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            Lecture : {article.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1F3A] leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span className="flex items-center gap-1.5 font-medium text-neutral-700">
            <User className="w-4 h-4 text-[#C9A227]" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-neutral-400" />
            Publié le {article.date}
          </span>
        </div>
      </header>

      {/* Mention légale de non-substitution */}
      <LegalNotice type="non-avocat" className="mb-10" />

      {/* Corps du contenu rendu par MDXContent */}
      <div className="bg-white p-8 sm:p-12 border border-neutral-200/90 rounded-sm shadow-xs mb-12">
        <MDXContent content={article.content} />
      </div>

      {/* Pied d'article et retour */}
      <footer className="pt-6 border-t border-neutral-200 flex items-center justify-between">
        <Link
          href="/ressources/articles"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B1F3A] hover:text-[#C9A227] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux publications de doctrine
        </Link>
        <Link
          href="/annuaire"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#143054] transition-colors"
        >
          Trouver un expert certifié
        </Link>
      </footer>
    </article>
  );
}

