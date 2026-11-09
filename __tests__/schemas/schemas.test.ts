import { describe, it, expect } from "vitest";
import { adhesionSchema, recoursSchema, contactExpertSchema } from "@/lib/schemas/forms.schema";
import { expertCandidatureSchema } from "@/lib/schemas/expert-candidature.schema";

describe("Validation des Schémas Déontologiques Zod - ICRCMP", () => {
  it("doit valider une demande d'adhésion complète et refuser si la charte n'est pas acceptée", () => {
    const validData = {
      civilite: "M.",
      nom: "Dupont",
      prenom: "Alexandre",
      email: "alexandre.dupont@test.fr",
      telephone: "0612345678",
      adresse: "15 rue du Palais",
      codePostal: "75001",
      ville: "Paris",
      statutDemande: "adherent",
      acceptationCharte: true,
      consentementRgpd: true,
      honeypot: "",
    };

    const result = adhesionSchema.safeParse(validData);
    expect(result.success).toBe(true);

    const invalidCharte = { ...validData, acceptationCharte: false };
    const invalidResult = adhesionSchema.safeParse(invalidCharte);
    expect(invalidResult.success).toBe(false);
  });

  it("doit refuser un dossier de recours si l'avertissement de non-substitution à un avocat n'est pas coché", () => {
    const recoursData = {
      typeLitige: "administratif",
      administrationConcernee: "Direction Départementale des Territoires",
      objet: "Recours gracieux refus d'alignement",
      description: "Exposé chronologique de plus de 30 caractères pour satisfaire les exigences procédurales.",
      delaiRestant: "Forclusion dans 25 jours ouvrés",
      nom: "Martin",
      email: "martin@domaine.fr",
      telephone: "0140000000",
      consentementNonAvocat: false, // Invalide !
      consentementRgpd: true,
      honeypot: "",
    };

    const res = recoursSchema.safeParse(recoursData);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.format().consentementNonAvocat?._errors[0]).toContain(
        "Vous devez reconnaître que l'ICRCMP ne se substitue pas à un avocat"
      );
    }
  });

  it("doit détecter et bloquer toute soumission automatisée contenant un honeypot rempli", () => {
    const botSubmission = {
      expertSlug: "claire-de-la-tour",
      nomDemandeur: "Bot Spam",
      emailDemandeur: "spam@bot.ru",
      telephoneDemandeur: "0600000000",
      message: "Proposition publicitaire non sollicitée...",
      consentementNonAvocat: true,
      consentementRgpd: true,
      honeypot: "http://spam-link.com", // Détection du piège
    };

    const result = contactExpertSchema.safeParse(botSubmission);
    expect(result.success).toBe(false);
  });

  it("doit exiger la clause de retrait discrétionnaire sur la candidature à l'annuaire", () => {
    const candidatureData = {
      nom: "Valin",
      prenom: "Marc",
      email: "m.valin@cabinet.fr",
      telephone: "0612345678",
      ville: "Lyon",
      departement: "69",
      region: "Auvergne-Rhône-Alpes",
      intituleDiplome: "Master 2 Droit Public",
      organismeDiplome: "Université Lyon 3",
      anneeDiplome: "2018",
      bioCourte: "Expertise pointue en matière de recours préalables et forclusion.",
      domaines: ["recours"],
      aDistance: true,
      acceptationCharte: true,
      consentementRetrait: true,
      consentementRgpd: true,
      honeypot: "",
    };

    const res = expertCandidatureSchema.safeParse(candidatureData);
    expect(res.success).toBe(true);
  });
});

