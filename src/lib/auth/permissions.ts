import { UserRole } from './roles';

export interface PermissionSet {
  // Module Caisse
  canAccessPOS: boolean;
  canManagePOS: boolean;
  canViewReports: boolean;
  
  // Module Emploi
  canPublishJobs: boolean;
  canViewCVdatabase: boolean;
  canApplyToJobs: boolean;
  
  // Gestion entreprise
  canManageCompany: boolean;
  canManageUsers: boolean;
  canManageSubscription: boolean;
  
  // Limites
  maxUsers?: number;
  maxCashRegisters?: number;
  maxJobPosts?: number;
  maxApplications?: number;
}

export const ROLE_PERMISSIONS: Record<UserRole, PermissionSet> = {
  SUPER_ADMIN: {
    canAccessPOS: true,
    canManagePOS: true,
    canViewReports: true,
    canPublishJobs: true,
    canViewCVdatabase: true,
    canApplyToJobs: true,
    canManageCompany: true,
    canManageUsers: true,
    canManageSubscription: true,
    maxUsers: 999,
    maxCashRegisters: 999,
    maxJobPosts: 999,
  },
  COMPANY_ADMIN: {
    canAccessPOS: true,
    canManagePOS: true,
    canViewReports: true,
    canPublishJobs: true,
    canViewCVdatabase: true,
    canApplyToJobs: false,
    canManageCompany: true,
    canManageUsers: true,
    canManageSubscription: true,
    maxUsers: 50,
    maxCashRegisters: 10,
    maxJobPosts: 100,
  },
  COMPANY_MANAGER: {
    canAccessPOS: true,
    canManagePOS: false,
    canViewReports: true,
    canPublishJobs: true,
    canViewCVdatabase: true,
    canApplyToJobs: false,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: false,
    maxUsers: 0,
    maxCashRegisters: 0,
    maxJobPosts: 20,
  },
  COMPANY_CASHIER: {
    canAccessPOS: true,
    canManagePOS: false,
    canViewReports: false,
    canPublishJobs: false,
    canViewCVdatabase: false,
    canApplyToJobs: false,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: false,
    maxUsers: 0,
    maxCashRegisters: 0,
    maxJobPosts: 0,
  },
  RECRUITER: {
    canAccessPOS: false,
    canManagePOS: false,
    canViewReports: false,
    canPublishJobs: true,
    canViewCVdatabase: true,
    canApplyToJobs: false,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: true,
    maxUsers: 5,
    maxCashRegisters: 0,
    maxJobPosts: 50,
  },
  CANDIDATE_PREMIUM: {
    canAccessPOS: false,
    canManagePOS: false,
    canViewReports: false,
    canPublishJobs: false,
    canViewCVdatabase: false,
    canApplyToJobs: true,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: false,
    maxApplications: 999,
  },
  CANDIDATE: {
    canAccessPOS: false,
    canManagePOS: false,
    canViewReports: false,
    canPublishJobs: false,
    canViewCVdatabase: false,
    canApplyToJobs: true,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: false,
    maxApplications: 5,
  },
  FREELANCER: {
    canAccessPOS: true,
    canManagePOS: true,
    canViewReports: true,
    canPublishJobs: false,
    canViewCVdatabase: false,
    canApplyToJobs: false,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: true,
    maxUsers: 1,
    maxCashRegisters: 1,
    maxJobPosts: 0,
  },
  INDIVIDUAL: {
    canAccessPOS: false,
    canManagePOS: false,
    canViewReports: false,
    canPublishJobs: false,
    canViewCVdatabase: false,
    canApplyToJobs: false,
    canManageCompany: false,
    canManageUsers: false,
    canManageSubscription: false,
  },
};