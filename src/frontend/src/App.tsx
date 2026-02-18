import { lazy, Suspense } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, createHashHistory } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';
import RootRoute from './routes/RootRoute';
import RouteErrorFallback from './components/RouteErrorFallback';
import AppErrorBoundary from './components/AppErrorBoundary';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

// Eager-loaded components (initial routes)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Lazy-loaded components (non-initial routes)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage'));
const TechSpecsPage = lazy(() => import('./pages/TechSpecsPage'));
const BestPracticesPage = lazy(() => import('./pages/BestPracticesPage'));
const PartnerMarketplacePage = lazy(() => import('./pages/PartnerMarketplacePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const SupportIntegrationsPage = lazy(() => import('./pages/SupportIntegrationsPage'));
const DomainPortfolioPage = lazy(() => import('./pages/DomainPortfolioPage'));
const ComplianceSecurityPage = lazy(() => import('./pages/ComplianceSecurityPage'));
const DeviceIntegrationGuidesPage = lazy(() => import('./pages/DeviceIntegrationGuidesPage'));
const MarketingCampaignAssetsPage = lazy(() => import('./pages/MarketingCampaignAssetsPage'));
const EmailAutomationPage = lazy(() => import('./pages/EmailAutomationPage'));
const DeploymentStatusPage = lazy(() => import('./pages/DeploymentStatusPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-lg font-medium text-foreground">Loading page...</p>
      </div>
    </div>
  );
}

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

const rootRoute = createRootRoute({
  component: RootRoute,
  errorComponent: RouteErrorFallback,
});

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
    <Suspense fallback={<RouteLoadingFallback />}>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </Suspense>
  ),
});

const diagnosticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diagnostics',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <DiagnosticsPage />
    </Suspense>
  ),
});

const techSpecsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tech-specs',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <TechSpecsPage />
    </Suspense>
  ),
});

const bestPracticesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/best-practices',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BestPracticesPage />
    </Suspense>
  ),
});

const partnerMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-marketplace',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PartnerMarketplacePage />
    </Suspense>
  ),
});

const partnerIntegrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-integration',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PartnerMarketplacePage />
    </Suspense>
  ),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PrivacyPolicyPage />
    </Suspense>
  ),
});

const supportIntegrationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support-integrations',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <SupportIntegrationsPage />
    </Suspense>
  ),
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <SupportIntegrationsPage />
    </Suspense>
  ),
});

const domainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/domains',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AppLayout>
        <DomainPortfolioPage />
      </AppLayout>
    </Suspense>
  ),
});

const complianceSecurityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compliance-security',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ComplianceSecurityPage />
    </Suspense>
  ),
});

const deviceIntegrationGuidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/integration-guides',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <DeviceIntegrationGuidesPage />
    </Suspense>
  ),
});

const marketingCampaignAssetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketing-campaign-assets',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <MarketingCampaignAssetsPage />
    </Suspense>
  ),
});

const emailAutomationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/email-automation',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AppLayout>
        <EmailAutomationPage />
      </AppLayout>
    </Suspense>
  ),
});

const deploymentStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deployment-status',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AppLayout>
        <DeploymentStatusPage />
      </AppLayout>
    </Suspense>
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
  partnerIntegrationRoute,
  privacyPolicyRoute,
  supportIntegrationsRoute,
  supportRoute,
  domainsRoute,
  complianceSecurityRoute,
  deviceIntegrationGuidesRoute,
  marketingCampaignAssetsRoute,
  emailAutomationRoute,
  deploymentStatusRoute,
]);

// Create hash history for ICP static asset hosting compatibility
const hashHistory = createHashHistory();

const router = createRouter({ 
  routeTree,
  history: hashHistory,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
