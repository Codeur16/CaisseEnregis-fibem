import { UserRole } from '@/lib/auth/roles';

export type BillingPeriod = 'monthly' | 'yearly';
export type PlanType = 'FREE_TRIAL' | 'BASIC' | 'PRO' | 'ENTERPRISE';

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: number;
  tooltip?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: PlanType;
  role: UserRole;
  description: string;
  
  // Prix
  price_monthly: number;
  price_yearly: number;
  currency: string;
  
  // Période d'essai
  trial_days: number;
  
  // Features
  features: PlanFeature[];
  
  // Avantages
  isPopular: boolean;
  isBestValue: boolean;
  
  // Limites
  max_users?: number;
  max_cash_registers?: number;
  max_job_posts?: number;
  max_applications?: number;
  cv_database_access: boolean;
  priority_support: boolean;
}

export const PLANS: Record<UserRole, SubscriptionPlan[]> = {
  COMPANY_ADMIN: [
    {
      id: 'business_starter',
      name: 'Business Starter',
      type: 'BASIC',
      role: 'COMPANY_ADMIN',
      description: 'Parfait pour les petites entreprises',
      price_monthly: 49,
      price_yearly: 529, // ~49*12 - 10%
      currency: 'EUR',
      trial_days: 14,
      isPopular: false,
      isBestValue: false,
      max_users: 3,
      max_cash_registers: 1,
      max_job_posts: 10,
      cv_database_access: true,
      priority_support: false,
      features: [
        { name: 'Caisse complète', included: true },
        { name: 'Gestion stock', included: true },
        { name: '3 utilisateurs', included: true },
        { name: '1 point de vente', included: true },
        { name: '10 offres d\'emploi', included: true },
        { name: 'Accès CVthèque', included: true },
        { name: 'Support email', included: true },
        { name: 'Rapports basiques', included: true },
      ],
    },
    {
      id: 'business_pro',
      name: 'Business Pro',
      type: 'PRO',
      role: 'COMPANY_ADMIN',
      description: 'Pour les entreprises en croissance',
      price_monthly: 99,
      price_yearly: 1069, // ~99*12 - 10%
      currency: 'EUR',
      trial_days: 14,
      isPopular: true,
      isBestValue: true,
      max_users: 10,
      max_cash_registers: 3,
      max_job_posts: 50,
      cv_database_access: true,
      priority_support: true,
      features: [
        { name: 'Caisse complète', included: true },
        { name: 'Gestion stock avancée', included: true },
        { name: '10 utilisateurs', included: true },
        { name: '3 points de vente', included: true },
        { name: '50 offres d\'emploi', included: true },
        { name: 'Accès CVthèque', included: true },
        { name: 'Support prioritaire', included: true },
        { name: 'Rapports avancés', included: true },
        { name: 'Formation équipe', included: true },
      ],
    },
    {
      id: 'business_enterprise',
      name: 'Business Enterprise',
      type: 'ENTERPRISE',
      role: 'COMPANY_ADMIN',
      description: 'Solution sur mesure pour grandes entreprises',
      price_monthly: 199,
      price_yearly: 2149, // ~199*12 - 10%
      currency: 'EUR',
      trial_days: 14,
      isPopular: false,
      isBestValue: false,
      max_users: 50,
      max_cash_registers: 10,
      max_job_posts: 200,
      cv_database_access: true,
      priority_support: true,
      features: [
        { name: 'Caisse complète', included: true },
        { name: 'Gestion stock multi-site', included: true },
        { name: '50 utilisateurs', included: true },
        { name: '10 points de vente', included: true },
        { name: '200 offres d\'emploi', included: true },
        { name: 'Accès CVthèque illimité', included: true },
        { name: 'Support dédié 24/7', included: true },
        { name: 'Rapports personnalisés', included: true },
        { name: 'Formation complète', included: true },
        { name: 'API intégration', included: true },
      ],
    },
  ],
  RECRUITER: [
    {
      id: 'recruiter_basic',
      name: 'Recruteur Basic',
      type: 'BASIC',
      role: 'RECRUITER',
      description: 'Pour les petites annonces occasionnelles',
      price_monthly: 29,
      price_yearly: 313, // ~29*12 - 10%
      currency: 'EUR',
      trial_days: 7,
      isPopular: false,
      isBestValue: false,
      max_users: 2,
      max_job_posts: 5,
      cv_database_access: true,
      priority_support: false,
      features: [
        { name: '5 offres d\'emploi', included: true },
        { name: 'Accès CVthèque', included: true },
        { name: '2 utilisateurs', included: true },
        { name: 'Gestion candidatures', included: true },
        { name: 'Support email', included: true },
      ],
    },
    {
      id: 'recruiter_pro',
      name: 'Recruteur Pro',
      type: 'PRO',
      role: 'RECRUITER',
      description: 'Solution complète pour recrutement actif',
      price_monthly: 59,
      price_yearly: 637, // ~59*12 - 10%
      currency: 'EUR',
      trial_days: 7,
      isPopular: true,
      isBestValue: true,
      max_users: 5,
      max_job_posts: 25,
      cv_database_access: true,
      priority_support: true,
      features: [
        { name: '25 offres d\'emploi', included: true },
        { name: 'Accès CVthèque', included: true },
        { name: '5 utilisateurs', included: true },
        { name: 'Gestion candidatures avancée', included: true },
        { name: 'Support prioritaire', included: true },
        { name: 'Alertes candidats', included: true },
        { name: 'Statistiques détaillées', included: true },
      ],
    },
  ],
  FREELANCER: [
    {
      id: 'freelancer',
      name: 'Professionnel Indépendant',
      type: 'PRO',
      role: 'FREELANCER',
      description: 'Tout pour gérer votre activité indépendante',
      price_monthly: 19,
      price_yearly: 205, // ~19*12 - 10%
      currency: 'EUR',
      trial_days: 7,
      isPopular: true,
      isBestValue: true,
      max_users: 1,
      max_cash_registers: 1,
      cv_database_access: false,
      priority_support: false,
      features: [
        { name: 'Caisse personnelle', included: true },
        { name: 'Gestion factures', included: true },
        { name: '1 utilisateur', included: true },
        { name: '1 point de vente', included: true },
        { name: 'Rapports financiers', included: true },
        { name: 'Support email', included: true },
      ],
    },
  ],
  CANDIDATE_PREMIUM: [
    {
      id: 'candidate_premium',
      name: 'Candidat Premium',
      type: 'BASIC',
      role: 'CANDIDATE_PREMIUM',
      description: 'Boostez vos chances de trouver un emploi',
      price_monthly: 9,
      price_yearly: 97, // ~9*12 - 10%
      currency: 'EUR',
      trial_days: 3,
      isPopular: true,
      isBestValue: true,
      max_applications: 999,
      cv_database_access: false,
      priority_support: false,
      features: [
        { name: 'CV mis en avant', included: true },
        { name: 'Candidatures illimitées', included: true },
        { name: 'Alertes emploi personnalisées', included: true },
        { name: 'Statistiques de visibilité', included: true },
        { name: 'Accès aux salaires moyens', included: true },
        { name: 'Conseils carrière', included: true },
      ],
    },
  ],
  CANDIDATE: [
    {
      id: 'candidate_free',
      name: 'Candidat Gratuit',
      type: 'FREE_TRIAL',
      role: 'CANDIDATE',
      description: 'Commencez votre recherche d\'emploi',
      price_monthly: 0,
      price_yearly: 0,
      currency: 'EUR',
      trial_days: 0,
      isPopular: true,
      isBestValue: true,
      max_applications: 5,
      cv_database_access: false,
      priority_support: false,
      features: [
        { name: '5 candidatures par mois', included: true },
        { name: 'Recherche d\'emploi', included: true },
        { name: 'Création de CV', included: true },
        { name: 'Alertes emploi basiques', included: true },
      ],
    },
  ],
  // Plans par défaut pour autres rôles
  COMPANY_MANAGER: [],
  COMPANY_CASHIER: [],
  INDIVIDUAL: [
    {
      id: 'individual_free',
      name: 'Particulier Gratuit',
      type: 'FREE_TRIAL',
      role: 'INDIVIDUAL',
      description: 'Accès aux annonces et services',
      price_monthly: 0,
      price_yearly: 0,
      currency: 'EUR',
      trial_days: 0,
      isPopular: true,
      isBestValue: true,
      cv_database_access: false,
      priority_support: false,
      features: [
        { name: 'Consulter les annonces', included: true },
        { name: 'Recherche de services', included: true },
        { name: 'Messagerie basique', included: true },
      ],
    },
  ],
  SUPER_ADMIN: [],
};