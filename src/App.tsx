import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { VisitorGuardProvider } from "@/components/VisitorGuard";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaPrivacidad = lazy(
  () => import("./components/page/politica-privacidad")
);
const ProyectosEnMente = lazy(() => import("@/pages/ProyectosEnMente"));

const queryClient = new QueryClient();

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VisitorGuardProvider strictMode={false}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/proyectos-en-mente"
                element={<ProyectosEnMente />}
              />
              <Route
                path="/politica-privacidad"
                element={<PoliticaPrivacidad />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        {/* Panel de Analytics (protegido con autenticación) */}
        <AnalyticsPanel />
      </VisitorGuardProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
