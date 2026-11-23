import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./features/auth/auth.store";
import type { AuthType } from "./features/auth/auth.types";

interface ProtectedRouteProps {
    allowedRoles: AuthType[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const location = useLocation();

    const user = useAuthStore((s) => s.user);
    const token = useAuthStore((s) => s.token);
    const authType = useAuthStore((s) => s.authType);
    const status = useAuthStore((s) => s.status);
    const isHydrated = useAuthStore((s) => s.isHydrated);

    // Wait until persisted state finishes loading on page refresh
    if (!isHydrated || status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const isOwnerRoute =
        allowedRoles.includes("owner") && !allowedRoles.includes("customer");
    const loginPath = isOwnerRoute ? "/owner/login" : "/login";

    if (status !== "authenticated" || !token || !user || !authType) {
        return <Navigate to={loginPath} replace state={{ from: location }} />;
    }

    if (!allowedRoles.includes(authType)) {
        const fallbackPath =
            authType === "owner"
                ? "/owner/dashboard"
                : authType === "admin"
                    ? "/admin/dashboard"
                    : "/dashboard";

        return <Navigate to={fallbackPath} replace />;
    }

    return <Outlet />;
}