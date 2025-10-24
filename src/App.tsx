import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
import PublicFormView from "./pages/PublicFormView";
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Branding = lazy(() => import("./pages/Branding"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Team = lazy(() => import("./pages/Team"));
const HackHazards = lazy(() => import("./pages/HackHazards"));
const LightRays = lazy(() => import("@/components/LightRays"));
const Events = lazy(() => import("./pages/Events"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminEvents = lazy(() => import("./pages/AdminEvents"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const EventRegistrations = lazy(() => import("./pages/EventRegistrations"));
const EventReferrals = lazy(() => import("./pages/EventReferrals"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const AdminPendingApprovals = lazy(() => import("./pages/AdminPendingApprovals"));
const FormsList = lazy(() => import("./pages/FormsList"));
const FormBuilder = lazy(() => import("./pages/FormBuilder"));
const FormSubmissions = lazy(() => import("./pages/FormSubmissions"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background relative">
                  {/* <Suspense fallback={<div />}>
                    <LightRays
                      raysOrigin="top-center"
                      raysSpeed={1.5}
                      lightSpread={0.8}
                      rayLength={1.2}
                      followMouse={true}
                      mouseInfluence={0.1}
                      noiseAmount={0.1}
                      distortion={0.05}
                      className="fixed inset-0"
                    />
                  </Suspense> */}
                  <div className="relative z-10">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/events" element={<Layout><Events /></Layout>} />
                        <Route path="/events/:eventId" element={<Layout><EventDetail /></Layout>} />
                        <Route path="/auth" element={<Layout showFooter={false}><Auth /></Layout>} />
                        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/events" element={<AdminEvents />} />
                        <Route path="/admin/events/create" element={<CreateEvent />} />
                        <Route path="/admin/events/:eventId/edit" element={<CreateEvent />} />
                        <Route path="/admin/events/:eventId/registrations" element={<EventRegistrations />} />
                        <Route path="/admin/events/:eventId/referrals" element={<EventReferrals />} />
                        <Route path="/admin/pending-approvals" element={<AdminPendingApprovals />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/forms" element={<FormsList />} />
                        <Route path="/admin/forms/create" element={<FormBuilder />} />
                        <Route path="/admin/forms/:formId/edit" element={<FormBuilder />} />
                        <Route path="/admin/forms/:formId/submissions" element={<FormSubmissions />} />
                        <Route path="/forms/:formId" element={<Layout><PublicFormView /></Layout>} />
                        <Route path="/maintenance" element={<Maintenance />} />
                        <Route path="/branding" element={<Layout><Branding /></Layout>} />
                        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                        <Route path="/terms-of-use" element={<Layout><TermsOfUse /></Layout>} />
                        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
                        <Route path="/team" element={<Layout><Team /></Layout>} />
                        <Route path="/hackhazards" element={<HackHazards />} />
                        <Route path="*" element={<Layout><NotFound /></Layout>} />

                      </Routes>
                    </Suspense>
                  </div>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
