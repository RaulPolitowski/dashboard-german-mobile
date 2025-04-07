import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CardStyleProvider } from "./contexts/CardStyleContext";
import { ThemeProvider } from "./hooks/use-theme";
import { FinancialProvider } from "./contexts/FinancialContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create QueryClient
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CardStyleProvider>
        <FinancialProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FinancialProvider>
      </CardStyleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
