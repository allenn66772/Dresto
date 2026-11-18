

// import { error } from "console";
import { API } from "../../lib/api";
import type {
    LoginPayload,
    CustomerRegisterPayload,
    OwnerRegisterPayload,
    Customer,
    HotelOwner,
    Admin,
    LoginResponse,
    CustomerRegisterResponse,
    OwnerRegisterResponse,
} from "./auth.types";

export const authApi = {
    // CUSTOMER
    customerRegister: async (payload: CustomerRegisterPayload) => {
        const response = await API.post<CustomerRegisterResponse>(
            "/register-user",
            payload
        );

        return response.data;
    },

    customerLogin: async (payload: LoginPayload) => {
        const response = await API.post<LoginResponse<Customer>>(
            "/login-user",
            payload
        );

        return response.data;
    },

    // RESTAURANT OWNER
    ownerRegister: async (
        payload: OwnerRegisterPayload
    ) => {
        const response = await API.post<OwnerRegisterResponse>(
            "/register-owner",
            payload
        );

        return response.data;
    },

    ownerLogin: async (payload: LoginPayload) => {
        const response = await API.post<LoginResponse<HotelOwner>>(
            "/login-owner",
            payload
        );

        return response.data;
    },

    // ADMIN
    adminLogin: async (payload: LoginPayload) => {
        const response = await API.post<LoginResponse<Admin>>(
            "/admin/login",
            payload
        );

        return response.data;
    },
};
