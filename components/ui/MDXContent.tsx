import React from "react";

interface MDXContentProps {
  content: string;
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  // Parser markdown sobre et sécurisé pour le rendu des articles de doctrine
  const parseMarkdown = (raw: string) => {
    // Retirer le frontmatter initial s'il est présent
    let cleaned = raw;
    if (cleaned.startsWith("---")) {
      const parts = cleaned.split("---");
      if (parts.length >= 3) {
        cleaned = parts.slice(2).join("---").trim();
      }
    }

    const lines = cleaned.split("\n");
    const elements: React.ReactNode[] = [];
    let currentKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={currentKey++}
            className="font-serif text-2xl font-bold text-[#0B1F3A] mt-10 mb-4 pb-2 border-b border-neutral-200"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={currentKey++}
            className="font-serif text-xl font-bold text-[#0B1F3A] mt-8 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={currentKey++}
            className="my-6 p-4 bg-[#FAF9F6] border-l-4 border-[#C9A227] text-xs text-[#0B1F3A] font-medium leading-relaxed rounded-r-sm"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={currentKey++}
            className="ml-6 list-disc text-sm text-neutral-700 mb-2 leading-relaxed"
          >
            {line.replace("- ", "")}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li
            key={currentKey++}
            className="ml-6 list-decimal text-sm text-neutral-700 mb-2 leading-relaxed"
          >
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else if (line.trim() === "---") {
        elements.push(
          <hr key={currentKey++} className="my-8 border-neutral-200" />
        );
      } else if (line.trim().length > 0) {
        // Traitement simple de bold **text**
        const parts = line.split(/(\*\*.*?\*\*)/g);
        elements.push(
          <p
            key={currentKey++}
            className="text-sm text-neutral-700 leading-relaxed mb-4"
          >
            {parts.map((p, idx) => {
              if (p.startsWith("**") && p.endsWith("**")) {
                return (
                  <strong key={idx} className="font-semibold text-[#0B1F3A]">
                    {p.slice(2, -2)}
                  </strong>
                );
              }
              return p;
            })}
          </p>
        );
      }
    }

    return elements;
  };

  return <div className="article-body font-sans">{parseMarkdown(content)}</div>;
};

