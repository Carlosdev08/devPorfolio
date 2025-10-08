import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PoliticaPrivacidad from "./components/page/politica-privacidad";
import ProyectosEnMente from "@/pages/ProyectosEnMente";
import { VisitorGuardProvider } from "@/components/VisitorGuard";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VisitorGuardProvider strictMode={false}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/proyectos-en-mente" element={<ProyectosEnMente />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Panel de Analytics (protegido con autenticación) */}
        <AnalyticsPanel />
      </VisitorGuardProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
