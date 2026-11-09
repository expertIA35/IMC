import { z } from "zod";

export const expertCandidatureSchema = z.object({
  nom: z.string().min(2, "Le nom patronymique doit comporter au moins 2 caractères."),
  prenom: z.string().min(2, "Le prénom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email professionnelle invalide."),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français valide requis."),
  ville: z.string().min(2, "Ville requise."),
  departement: z.string().length(2, "Le numéro de département doit comporter 2 chiffres (ex: 75)."),
  region: z.string().min(2, "Région obligatoire."),
  intituleDiplome: z.string().min(5, "Intitulé complet du diplôme requis."),
  organismeDiplome: z.string().min(3, "Université ou organisme certificateur requis."),
  anneeDiplome: z.string().length(4, "Année sur 4 chiffres (ex: 2021)."),
  bioCourte: z
    .string()
    .min(30, "La synthèse professionnelle doit comporter au moins 30 caractères.")
    .max(150, "La synthèse professionnelle ne doit pas excéder 150 caractères."),
  domaines: z.array(z.enum(["mediation", "conciliation", "arbitrage", "recours", "formation"])).min(1, "Sélectionnez au moins un domaine."),
  aDistance: z.boolean().default(false),
  acceptationCharte: z.literal(true, {
    errorMap: () => ({ message: "Vous devez formellement accepter la charte de publication de l'annuaire." }),
  }),
  consentementRetrait: z.literal(true, {
    errorMap: () => ({ message: "Prise d'acte obligatoire de la clause de retrait discrétionnaire par le Conseil." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Le consentement au traitement des données personnelles est obligatoire." }),
  }),
  honeypot: z.string().max(0, "Tentative de soumission automatisée bloquée."),
});

export type ExpertCandidatureInput = z.infer<typeof expertCandidatureSchema>;

