
export type AuthType = "customer" | "owner" | "admin";

export type AuthStatus =
    | "idle"
    | "loading"
    | "authenticated"
    | "unauthenticated";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface CustomerRegisterPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export interface OwnerRegisterPayload {
    owner_name: string;
    email: string;
    password: string;
    phone: string;
    hotel_name: string;
    registration_number: string;
    gst_number: string;
    location?: string;
    city?: string;
    state?: string;
    pincode?: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: "user";
}

export interface HotelOwner {
    id: string;
    owner_name: string;
    email: string;
    phone: string;
    hotel_name: string;
    role?: "owner";
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    role: "admin";
}

export interface LoginResponse<T> {
    message: string;
    token: string;
    user?: T;
    owner?: T;
    admin?: T;
}

export interface CustomerRegisterResponse {
    message: string;
    user: Customer;
}

export interface OwnerRegisterResponse {
    message: string;
    owner: {
        id: string;
        owner_name: string;
        email: string;
        phone: string;
        hotel_name: string;
        is_approved: boolean;
        created_at: string;
    };
}

export interface ApiErrorResponse {
    message: string;
    code?: string;
}
