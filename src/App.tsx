import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { AppLayout } from "@/components/layout/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Conversations from "./pages/Conversations";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import AgentManagement from "./pages/AgentManagement";
import ApisAndTools from "./pages/ApisAndTools";
import Membership from "./pages/Membership";
import UsersAndRoles from "./pages/UsersAndRoles";
import BoeIntegrationDetail from "./pages/BoeIntegrationDetail";
import ToolSetConfiguration from "./pages/ToolSetConfiguration";
import AgentConfiguration from "./pages/AgentConfiguration";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <AppLayout>{children}</AppLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/tenants" element={
              <ProtectedRoute>
                <Tenants />
              </ProtectedRoute>
            } />
            <Route path="/conversations" element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            } />
            <Route path="/templates" element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            } />
            <Route path="/agent-management" element={
              <ProtectedRoute>
                <AgentManagement />
              </ProtectedRoute>
            } />
            <Route path="/apis-and-tools" element={
              <ProtectedRoute>
                <ApisAndTools />
              </ProtectedRoute>
            } />
            <Route path="/apis-and-tools/api/:integrationName" element={
              <ProtectedRoute>
                <BoeIntegrationDetail />
              </ProtectedRoute>
            } />
            <Route path="/tools/:toolSetName" element={
              <ProtectedRoute>
                <ToolSetConfiguration />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UsersAndRoles />
              </ProtectedRoute>
            } />
            <Route path="/agent/:agentName/configure" element={
              <ProtectedRoute>
                <AgentConfiguration />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/membership" element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
