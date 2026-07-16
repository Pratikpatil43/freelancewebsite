import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import LandingPage from './pages/public/LandingPage.jsx';
import ServicesPage from './pages/public/ServicesPage.jsx';
import PortfolioPage from './pages/public/PortfolioPage.jsx';
import PricingPage from './pages/public/PricingPage.jsx';
import HowItWorksPage from './pages/public/HowItWorksPage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';
import AdminLoginPage from './pages/auth/AdminLoginPage.jsx';
import UserDashboardPage from './pages/user/UserDashboardPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import PreBookProjectPage from './pages/user/PreBookProjectPage.jsx';
import UserSectionPage from './pages/user/UserSectionPage.jsx';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-slate-600">Loading workspace...</div>;
  }

  if (!user) {
    return <Navigate to={adminOnly ? '/admin/login' : '/auth'} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const PublicApp = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Route>

    <Route path="/admin/login" element={<AdminLoginPage />} />

    <Route
      path="/user/*"
      element={
        <ProtectedRoute>
          <DashboardLayout role="student" />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<UserDashboardPage />} />
      <Route path="pre-book" element={<PreBookProjectPage />} />
      <Route path="projects" element={<UserSectionPage section="projects" />} />
      <Route path="messages" element={<UserSectionPage section="messages" />} />
      <Route path="payments" element={<UserSectionPage section="payments" />} />
      <Route path="notifications" element={<UserSectionPage section="notifications" />} />
      <Route path="profile" element={<UserSectionPage section="profile" />} />
    </Route>

    <Route
      path="/admin/*"
      element={
        <ProtectedRoute adminOnly>
          <DashboardLayout role="admin" />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="requests" element={<AdminDashboardPage view="requests" />} />
      <Route path="projects" element={<AdminDashboardPage view="projects" />} />
      <Route path="payments" element={<AdminDashboardPage view="payments" />} />
      <Route path="notifications" element={<AdminDashboardPage view="notifications" />} />
      <Route path="clients" element={<AdminDashboardPage view="clients" />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <PublicApp />
  </AuthProvider>
);

export default App;
