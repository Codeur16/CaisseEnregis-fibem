export type UserRole =
  | 'SUPER_ADMIN'        // Votre équipe interne
  | 'COMPANY_ADMIN'      // Administrateur entreprise (abonné)
  | 'COMPANY_MANAGER'    // Manager entreprise
  | 'COMPANY_CASHIER'    // Caissier entreprise
  | 'RECRUITER'          // Entreprise recrutement seulement
  | 'CANDIDATE'          // Chercheur d'emploi
  | 'CANDIDATE_PREMIUM'  // Chercheur d'emploi premium
  | 'FREELANCER'         // Particulier pro / Artisan
  | 'INDIVIDUAL';        // Particulier standard

export const ROLE_HIERARCHY = {
  SUPER_ADMIN: 100,
  COMPANY_ADMIN: 90,
  COMPANY_MANAGER: 80,
  RECRUITER: 70,
  FREELANCER: 60,
  CANDIDATE_PREMIUM: 50,
  CANDIDATE: 40,
  COMPANY_CASHIER: 30,
  INDIVIDUAL: 20,
} as const;

export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Administrateur',
  COMPANY_ADMIN: 'Administrateur Entreprise',
  COMPANY_MANAGER: 'Manager Entreprise',
  COMPANY_CASHIER: 'Caissier',
  RECRUITER: 'Recruteur',
  CANDIDATE: 'Candidat Gratuit',
  CANDIDATE_PREMIUM: 'Candidat Premium',
  FREELANCER: 'Professionnel Indépendant',
  INDIVIDUAL: 'Particulier',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Accès complet à la plateforme FIBEM',
  COMPANY_ADMIN: 'Gérez votre entreprise complète : caisse, recrutement, équipe',
  COMPANY_MANAGER: 'Supervisez les ventes et gérez les produits de votre entreprise',
  COMPANY_CASHIER: 'Encaissement des ventes et gestion du panier',
  RECRUITER: 'Publiez des offres et gérez les candidatures',
  CANDIDATE: 'Recherchez des emplois et postulez gratuitement',
  CANDIDATE_PREMIUM: 'CV visible, alertes personnalisées, candidatures illimitées',
  FREELANCER: 'Gérez votre activité et vos factures',
  INDIVIDUAL: 'Consultez les annonces et services',
};