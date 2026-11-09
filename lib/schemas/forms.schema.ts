import { z } from "zod";

export const adhesionSchema = z.object({
  civilite: z.enum(["M.", "Mme", "Autre"], {
    required_error: "Veuillez sélectionner votre civilité.",
  }),
  nom: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  prenom: z.string().min(2, "Le prénom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français valide requis."),
  adresse: z.string().min(5, "Adresse postale complète requise."),
  codePostal: z.string().length(5, "Code postal à 5 chiffres."),
  ville: z.string().min(2, "Ville obligatoire."),
  statutDemande: z.enum(["adherent", "expert_certifie"], {
    required_error: "Sélectionnez le statut sollicité.",
  }),
  // Champs requis si expert_certifie
  intituleDiplome: z.string().optional(),
  organismeDiplome: z.string().optional(),
  anneeObtention: z.string().optional(),
  
  // Conformités obligatoires
  acceptationCharte: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter formellement la charte déontologique de l'ICRCMP." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Votre consentement au traitement de vos données est indispensable." }),
  }),
  honeypot: z.string().max(0, "Tentative de soumission automatisée détectée."),
});

export const recoursSchema = z.object({
  typeLitige: z.enum(["administratif", "civil", "commercial"], {
    required_error: "Veuillez préciser la nature du litige.",
  }),
  administrationConcernee: z.string().min(2, "Indiquez l'administration ou la partie adverse."),
  objet: z.string().min(5, "L'objet du différend doit être explicité."),
  description: z.string().min(30, "Veuillez fournir un exposé chronologique d'au moins 30 caractères."),
  delaiRestant: z.string().min(1, "Veuillez préciser le délai de recours restant ou la date de notification."),
  nom: z.string().min(2, "Nom obligatoire."),
  email: z.string().email("Email valide requis."),
  telephone: z.string().min(10, "Numéro de téléphone requis."),
  consentementNonAvocat: z.literal(true, {
    errorMap: () => ({ message: "Vous devez reconnaître que l'ICRCMP ne se substitue pas à un avocat." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Le consentement RGPD est obligatoire." }),
  }),
  honeypot: z.string().max(0, "Détection anti-bot."),
});

export const contactExpertSchema = z.object({
  expertSlug: z.string(),
  nomDemandeur: z.string().min(2, "Nom obligatoire."),
  emailDemandeur: z.string().email("Email invalide."),
  telephoneDemandeur: z.string().min(10, "Téléphone requis."),
  message: z.string().min(20, "Veuillez détailler votre demande (20 caractères minimum)."),
  consentementNonAvocat: z.literal(true, {
    errorMap: () => ({ message: "Prise d'acte obligatoire : l'expert n'agit pas en qualité d'avocat." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Consentement RGPD requis." }),
  }),
  honeypot: z.string().max(0, "Champ de sécurité invalide."),
});

export const labelDemandeSchema = z.object({
  nom: z.string().min(2, "Nom obligatoire."),
  prenom: z.string().min(2, "Prénom obligatoire."),
  email: z.string().email("Email invalide."),
  numeroAdherent: z.string().min(3, "Numéro d'adhérent ICRCMP requis."),
  rcProCompagnie: z.string().min(2, "Nom de la compagnie d'assurance RC Pro requis."),
  rcProPolice: z.string().min(4, "Numéro de police d'assurance requis."),
  engagementFormation: z.literal(true, {
    errorMap: () => ({ message: "Vous devez vous engager à suivre les 20h de formation continue biennale." }),
  }),
  acceptationAudit: z.literal(true, {
    errorMap: () => ({ message: "L'acceptation des audits contradictoires de conformité est obligatoire." }),
  }),
  reconnaissanceLabelPrive: z.literal(true, {
    errorMap: () => ({ message: "Vous devez acter qu'il s'agit d'un label privé associatif non reconnu par l'État." }),
  }),
  consentementRgpd: z.literal(true, {
    errorMap: () => ({ message: "Consentement RGPD requis." }),
  }),
  honeypot: z.string().max(0, "Champ de contrôle."),
});

