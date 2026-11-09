import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDomaine(domaine: string): string {
  const map: Record<string, string> = {
    mediation: "Médiation conventionnelle & judiciaire",
    conciliation: "Conciliation amiable",
    arbitrage: "Arbitrage & sentences",
    recours: "Recours administratif & contentieux",
    formation: "Formation aux procédures",
  };
  return map[domaine] || domaine;
}

