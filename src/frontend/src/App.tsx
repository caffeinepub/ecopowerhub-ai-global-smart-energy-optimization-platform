import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import TechSpecsPage from './pages/TechSpecsPage';
import BestPracticesPage from './pages/BestPracticesPage';
import PartnerMarketplacePage from './pages/PartnerMarketplacePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SupportIntegrationsPage from './pages/SupportIntegrationsPage';
import DomainPortfolioPage from './pages/DomainPortfolioPage';
import ComplianceSecurityPage from './pages/ComplianceSecurityPage';
import DeviceIntegrationGuidesPage from './pages/DeviceIntegrationGuidesPage';
import MarketingCampaignAssetsPage from './pages/MarketingCampaignAssetsPage';
import EmailAutomationPage from './pages/EmailAutomationPage';
import DeploymentStatusPage from './pages/DeploymentStatusPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

// Layout component for authenticated pages
function AppLayout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleProfileComplete = () => {
    // Profile setup completed, the query will automatically refetch
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {showProfileSetup && <ProfileSetupModal onComplete={handleProfileComplete} />}
    </div>
  );
}

const rootRoute = createRootRoute();

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  ),
});

const diagnosticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diagnostics',
  component: DiagnosticsPage,
});

const techSpecsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tech-specs',
  component: TechSpecsPage,
});

const bestPracticesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/best-practices',
  component: BestPracticesPage,
});

const partnerMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-marketplace',
  component: PartnerMarketplacePage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const supportIntegrationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support-integrations',
  component: SupportIntegrationsPage,
});

const domainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/domains',
  component: () => (
    <AppLayout>
      <DomainPortfolioPage />
    </AppLayout>
  ),
});

const complianceSecurityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compliance-security',
  component: ComplianceSecurityPage,
});

const deviceIntegrationGuidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/integration-guides',
  component: DeviceIntegrationGuidesPage,
});

const marketingCampaignAssetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketing-campaign-assets',
  component: MarketingCampaignAssetsPage,
});

const emailAutomationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/email-automation',
  component: () => (
    <AppLayout>
      <EmailAutomationPage />
    </AppLayout>
  ),
});

const deploymentStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deployment-status',
  component: () => (
    <AppLayout>
      <DeploymentStatusPage />
    </AppLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  dashboardRoute,
  diagnosticsRoute,
  techSpecsRoute,
  bestPracticesRoute,
  partnerMarketplaceRoute,
  privacyPolicyRoute,
  supportIntegrationsRoute,
  domainsRoute,
  complianceSecurityRoute,
  deviceIntegrationGuidesRoute,
  marketingCampaignAssetsRoute,
  emailAutomationRoute,
  deploymentStatusRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
