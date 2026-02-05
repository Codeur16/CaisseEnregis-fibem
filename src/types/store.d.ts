declare interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    is_active: boolean;
}

declare interface SubscriptionPlan {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_days: number;
    features: any;
}

declare interface UserSubscription {
    id: number;
    user: number;
    plan: number;
    plan_name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

declare interface CartItem {
    id: number;
    product?: number;
    product_name?: string;
    product_price?: number;
    subscription_plan?: number;
    plan_name?: string;
    plan_price?: number;
    quantity: number;
}

declare interface Cart {
    id: number;
    items: CartItem[];
    total_price: number;
}

declare interface OrderItem {
    product?: number;
    product_name?: string;
    subscription_plan?: number;
    plan_name?: string;
    quantity: number;
    unit_price: number;
}

declare interface Order {
    id: number;
    user: number;
    reference: string;
    items: OrderItem[];
    total_amount: number;
    commission_amount: number;
    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    created_at: string;
}
