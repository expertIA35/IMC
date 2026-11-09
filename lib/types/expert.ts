export type DomaineExpertise =
  | 'mediation'
  | 'conciliation'
  | 'arbitrage'
  | 'recours'
  | 'formation';

export interface DiplomeVerification {
  intitule: string;
  organisme: string;
  annee: number;
  justificatifUrl: string; // Document interne sécurisé non exposé publiquement
}

export interface ZoneIntervention {
  ville: string;
  departement: string;
  region: string;
  aDistance: boolean;
}

export interface Expert {
  id: string;
  slug: string;
  nom: string;
  prenom: string;
  photo?: string;
  diplome: DiplomeVerification;
  domaines: DomaineExpertise[];
  zone: ZoneIntervention;
  langues: string[];
  dateAdhesion: string;
  statut: 'actif' | 'suspendu';
  bioCourte: string; // 150 caractères maximum
  labellise: boolean;
}

export interface ArticleRessource {
  slug: string;
  titre: string;
  date: string;
  auteur: string;
  resume: string;
  tempsLecture: string;
  categorie: string;
  contenu: string;
}

export interface MembreGouvernance {
  nom: string;
  prenom: string;
  role: string;
  titre: string;
  description: string;
  photo?: string;
}

