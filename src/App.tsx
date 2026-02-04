import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import SalonDetail from "./pages/SalonDetail";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MainAdminLogin from "./pages/MainAdminLogin";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Payments from "./pages/Payments";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Install from "./pages/Install";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          {/* Global Glass Background */}
          <div className="fixed inset-0 -z-10">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-blue-100/30 to-violet-100/40" />
            
            {/* Floating Glass Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-[100px] animate-float" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent/15 to-transparent rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-violet-300/15 to-transparent rounded-full blur-[90px] animate-float" style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-blue-300/12 to-transparent rounded-full blur-[70px] animate-float" style={{ animationDelay: '3s' }} />
            
            {/* Subtle noise/grid texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          </div>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/salon/:id" element={<SalonDetail />} />
            <Route path="/vendor" element={<ProtectedRoute requiredRole="vendor"><VendorDashboard /></ProtectedRoute>} />
            <Route path="/vendor/*" element={<ProtectedRoute requiredRole="vendor"><VendorDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/main-admin" element={<MainAdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/salons" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/wallets" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/support" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/payouts" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/financials" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/notifications" element={<Notifications />} />
            <Route path="/profile/payments" element={<Payments />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/install" element={<Install />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
