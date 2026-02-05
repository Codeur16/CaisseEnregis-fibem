declare type UserRole = "PARTICULIER" | "PROFESSIONNEL" | "CANDIDAT" | "RECRUTEUR" | "ADMIN"

declare interface Register {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone: string;
}

declare interface LoginCredentials {
    email: string;
    password: string;
}

declare interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: "Bearer";
    scope: "read write";
    refresh_token: string;
}

declare interface Profile {
    id: number;
    user: number | string;
    address: string;
    city: string;
    avatar: string | null;
}

declare interface CandidateProfile {
    id: number;
    user: number | string;
    title: string;
    bio: string;
    skills: any[];
    experience: any[];
    education: any[];
    resume: string | null;
}

declare interface CompanyProfile {
    id: number;
    user: number | string;
    company_name: string;
    siret: string;
    website: string;
    description: string;
    logo: string | null;
}

declare interface User {
    id: string | number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone: string;
    profile?: Profile;
    candidate_profile?: CandidateProfile;
    company_profile?: CompanyProfile;
}