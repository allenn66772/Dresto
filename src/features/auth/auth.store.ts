import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authApi } from "./auth.api";
import { setAccessToken } from "../../lib/api";

import type {
    AuthType,
    AuthStatus,
    Customer,
    HotelOwner,
    Admin,
    CustomerRegisterPayload,
    OwnerRegisterPayload,
    LoginPayload,
} from "./auth.types";

type AuthUser = Customer | HotelOwner | Admin;

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    authType: AuthType | null;
    status: AuthStatus;
    error: string | null;
    isHydrated: boolean;

    customerRegister: (payload: CustomerRegisterPayload) => Promise<void>;
    customerLogin: (payload: LoginPayload) => Promise<void>;
    ownerRegister: (payload: OwnerRegisterPayload) => Promise<void>;
    ownerLogin: (payload: LoginPayload) => Promise<void>;
    adminLogin: (payload: LoginPayload) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setHydrated: (value: boolean) => void;
}

const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (
            error as { response?: { data?: { message?: string } } }
        ).response;
        return response?.data?.message || "Something went wrong.";
    }
    return "Unable to connect to the server.";
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            authType: null,
            status: "unauthenticated",
            error: null,
            isHydrated: false,

            setHydrated: (value) => set({ isHydrated: value }),

            // CUSTOMER REGISTRATION
            customerRegister: async (payload) => {
                set({ status: "loading", error: null });
                try {
                    await authApi.customerRegister(payload);
                    set({
                        user: null,
                        token: null,
                        authType: null,
                        status: "unauthenticated",
                        error: null,
                    });
                } catch (error) {
                    set({
                        status: "unauthenticated",
                        error: getErrorMessage(error),
                    });
                    throw error;
                }
            },

            // CUSTOMER LOGIN
            customerLogin: async (payload) => {
                set({ status: "loading", error: null });
                try {
                    const response = await authApi.customerLogin(payload);
                    if (!response.token || !response.user) {
                        throw new Error("Invalid customer login response.");
                    }

                    setAccessToken(response.token);

                    set({
                        user: response.user,
                        token: response.token,
                        authType: "customer",
                        status: "authenticated",
                        error: null,
                    });
                } catch (error) {
                    setAccessToken(null);
                    set({
                        user: null,
                        token: null,
                        authType: null,
                        status: "unauthenticated",
                        error: getErrorMessage(error),
                    });
                    throw error;
                }
            },

            // OWNER REGISTRATION
            ownerRegister: async (payload) => {
                set({ status: "loading", error: null });
                try {
                    await authApi.ownerRegister(payload);
                    set({
                        user: null,
                        token: null,
                        authType: null,
                        status: "unauthenticated",
                        error: null,
                    });
                } catch (error) {
                    set({
                        status: "unauthenticated",
                        error: getErrorMessage(error),
                    });
                    throw error;
                }
            },

            // OWNER LOGIN
            ownerLogin: async (payload) => {
                set({ status: "loading", error: null });
                try {
                    const response = await authApi.ownerLogin(payload);
                    if (!response.token || !response.owner) {
                        throw new Error("Invalid owner login response.");
                    }

                    setAccessToken(response.token);

                    set({
                        user: response.owner,
                        token: response.token,
                        authType: "owner",
                        status: "authenticated",
                        error: null,
                    });
                } catch (error) {
                    setAccessToken(null);
                    set({
                        user: null,
                        token: null,
                        authType: null,
                        status: "unauthenticated",
                        error: getErrorMessage(error),
                    });
                    throw error;
                }
            },

            // ADMIN LOGIN
            adminLogin: async (payload) => {
                set({ status: "loading", error: null });
                try {
                    const response = await authApi.adminLogin(payload);
                    if (!response.token || !response.admin) {
                        throw new Error("Invalid admin login response.");
                    }

                    setAccessToken(response.token);

                    set({
                        user: response.admin,
                        token: response.token,
                        authType: "admin",
                        status: "authenticated",
                        error: null,
                    });
                } catch (error) {
                    setAccessToken(null);
                    set({
                        user: null,
                        token: null,
                        authType: null,
                        status: "unauthenticated",
                        error: getErrorMessage(error),
                    });
                    throw error;
                }
            },

            // LOGOUT
            logout: () => {
                setAccessToken(null);
                set({
                    user: null,
                    token: null,
                    authType: null,
                    status: "unauthenticated",
                    error: null,
                });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: "craveos-auth",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                authType: state.authType,
                status: state.status,
            }),
            onRehydrateStorage: () => (state) => {
                // Re-attach the saved token to Axios on page reload
                if (state?.token) {
                    setAccessToken(state.token);
                }
                state?.setHydrated(true);
            },
        }
    )
);