import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getSettings, applyTheme } from "@/lib/settings";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import LLMPage from "./pages/LLMPage";
import MeetPage from "./pages/MeetPage";
import VoicePage from "./pages/VoicePage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import PricingPage from "./pages/PricingPage";
import CareersPage from "./pages/CareersPage";
import CommunityPage from "./pages/CommunityPage";
import APIPage from "./pages/solutions/APIPage";
import OnlineMeetingsPage from "./pages/solutions/OnlineMeetingsPage";
import PhysicalMeetingsPage from "./pages/solutions/PhysicalMeetingsPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const settings = getSettings();
    applyTheme(settings.theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/llm" element={<LLMPage />} />
            <Route path="/dashboard/meet" element={<MeetPage />} />
            <Route path="/dashboard/voice" element={<VoicePage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/account" element={<AccountPage />} />

            {/* Solutions routes */}
            <Route path="/solutions/api" element={<APIPage />} />
            <Route path="/solutions/online-meetings" element={<OnlineMeetingsPage />} />
            <Route path="/solutions/physical-meetings" element={<PhysicalMeetingsPage />} />
            
            {/* Other pages */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/cookies" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/partnership" element={<NotFound />} />
            <Route path="/docs" element={<NotFound />} />
            <Route path="/blog" element={<NotFound />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
