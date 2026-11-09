import { test, expect } from "@playwright/test";

test.describe("Parcours Utilisateur Institutionnel ICRCMP", () => {
  test("Accueil : vérification de la charte visuelle et des avertissements légaux", async ({
    page,
  }) => {
    await page.goto("/");

    // Vérification présence du nom complet et du sigle
    await expect(page.locator("h1")).toContainText("Institut Certifié de Recours Contentieux");
    await expect(page.locator("text=ICRCMP")).toBeVisible();

    // Vérification présence de l'avertissement solennel loi 1971 dans le footer
    const footerDisclaimer = page.locator("footer");
    await expect(footerDisclaimer).toContainText("AVERTISSEMENT DÉONTOLOGIQUE MAJEUR");
    await expect(footerDisclaimer).toContainText("ne se substitue pas à un avocat");
  });

  test("Annuaire : recherche full-text dynamique et consultation d'une fiche certifiée", async ({
    page,
  }) => {
    await page.goto("/annuaire");

    // Vérification du champ de recherche
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Recherche "Claire"
    await searchInput.fill("Claire");
    await expect(page.locator("text=Claire De La Tour")).toBeVisible();

    // Clic sur la fiche certifiée
    await page.click('text=Fiche certifiée');
    await expect(page).toHaveURL(/\/annuaire\/claire-de-la-tour/);

    // Contrôle de présence du badge et de la mention d'indépendance
    await expect(page.locator("text=Diplôme Universitaire de Médiation")).toBeVisible();
    await expect(page.locator("text=Mention légale obligatoire d'indépendance procédurale")).toBeVisible();
  });

  test("Adhésion : parcours multi-étapes et blocage en cas de charte non cochée", async ({
    page,
  }) => {
    await page.goto("/adhesion/formulaire");

    // Remplissage Étape 1
    await page.fill('input[name="nom"]', "Lefebvre");
    await page.fill('input[name="prenom"]', "Camille");
    await page.fill('input[name="email"]', "camille.lefebvre@domaine.fr");
    await page.fill('input[name="telephone"]', "0612345678");
    await page.fill('input[name="adresse"]', "24 rue Royale");
    await page.fill('input[name="codePostal"]', "75008");
    await page.fill('input[name="ville"]', "Paris");

    // Passage à l'étape 2
    await page.click('button:has-text("Étape suivante")');

    // Étape 2 : Statut adhérent
    await expect(page.locator("text=Membre Adhérent")).toBeVisible();
    await page.click('button:has-text("Étape suivante")');

    // Étape 3 : Soumission sans cocher les consentements obligatoires
    await page.click('button:has-text("Soumettre mon dossier")');
    await expect(page.locator("text=Vous devez accepter formellement la charte")).toBeVisible();
  });
});

