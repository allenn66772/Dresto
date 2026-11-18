import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface ProviderProps {
    children: ReactNode
}

export function Providers({ children }: ProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        retry: 1,
                        refetchOnWindowFocus: true
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}