
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import Signup from "./pages/Signup";
import Leads from "./pages/Leads";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard/Index";
import DashboardLeads from "./pages/Dashboard/Leads";
import DashboardIntegrations from "./pages/Dashboard/Integrations";
import DashboardPlans from "./pages/Dashboard/Plans";
import DashboardSettings from "./pages/Dashboard/Settings";
import Login from "./pages/Dashboard/Login";
import Register from "./pages/Dashboard/Register";
import ForgotPassword from "./pages/Dashboard/ForgotPassword";
import Marketplace from "./pages/Dashboard/Marketplace";
import Architects from "./pages/Dashboard/Architects";
import MarketPrices from "./pages/Dashboard/MarketPrices";
import Consulting from "./pages/Dashboard/Consulting";
import LeadsFunnel from "./pages/Dashboard/LeadsFunnel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="axiestone-theme">
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leads" element={<Leads />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<DashboardLeads />} />
              <Route path="funnel" element={<LeadsFunnel />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="architects" element={<Architects />} />
              <Route path="market-prices" element={<MarketPrices />} />
              <Route path="consulting" element={<Consulting />} />
              <Route path="integrations" element={<DashboardIntegrations />} />
              <Route path="plans" element={<DashboardPlans />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            
            {/* Authentication routes */}
            <Route path="/dashboard/login" element={<Login />} />
            <Route path="/dashboard/register" element={<Register />} />
            <Route path="/dashboard/forgot-password" element={<ForgotPassword />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
