declare interface JobOffer {
    id: number;
    recruiter: number;
    recruiter_name: string | null;
    company_name: string;
    title: string;
    description: string;
    contract_type: "CDI"|"CDD"|"STAGE"|"FREELANCE"|"INTERIM";
    location: string;
    salary_range: string;
    num_of_place: number;
    is_active: boolean;
    created_at: string;
}

declare interface JobOfferCreate {
    title: string;
    description: string;
    contract_type:"CDI"|"CDD"|"STAGE"|"FREELANCE"|"INTERIM";
    location: string;
    salary_range: string;
    company_name: string;
    num_of_place: number;
    is_active: boolean;
}

declare interface JobApplication {
    id: number;
    job_offer: number;
    job_title: string;
    candidate: number;
    candidate_name: string;
    cv_file:string;
    cover_letter: string;
    status: "PENDING"|"REVIEWING"|"ACCEPTED"|"REJECTED";
    applied_at: string;
}

declare interface JobApplicationCreate {
    job_offer: number;
    cv_file:File;
    cover_letter: File;
}
