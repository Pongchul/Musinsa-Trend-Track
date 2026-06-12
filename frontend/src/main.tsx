import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,  // 5분 캐시
            retry: 1,                   // 실패 시 1번만 재시도
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <HashRouter basename="/">
                <App />
            </HashRouter>
        </StrictMode>
    </QueryClientProvider>
)
