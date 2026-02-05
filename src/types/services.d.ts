declare interface ServiceCategory {
    id: number;
    name: string;
    description?: string;
    icon?: string;
}

declare interface ServiceCategoryCreate extends Omit<ServiceCategory, 'id'> {}

declare interface Service {
    id: number;
    category: number;
    category_name: string;
    name: string;
    description: string;
    base_price: number;
    image: string;
    is_active: boolean;
}

declare interface ServiceCreate {
    name:string;
    description:string;
    base_price:number;
    category:number;
    image:File | null;
}

declare interface ServiceRequest {
    id: number;
    service: number;
    service_name: string;
    user: number;
    description: string;
    user_email: string;
    details: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    created_at: string;
    updated_at: string;
}

declare interface ServiceRequestCreate {
    description: string;
    service: number;
}


declare interface ServiceRequestStatusUpdate{
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}