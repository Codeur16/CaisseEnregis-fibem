declare interface Quote {
    id: number;
    user: number;
    reference: string;
    details: string;
    amount: number;
    status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
    created_at: string;
}

declare interface Invoice {
    id: number;
    quote: number;
    quote_reference: string;
    reference: string;
    amount: number;
    status: "UNPAID" | "PAID" | "OVERDUE" | "CANCELLED";
    issued_date: string;
    due_date: string;
}

declare interface CreditNote {
    id: number;
    invoice: number;
    reference: string;
    amount: number;
    reason: string;
    created_at: string;
}
