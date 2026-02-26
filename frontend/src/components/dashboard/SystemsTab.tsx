import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Plus, Car, RefreshCw, Clock, CheckCircle2, AlertTriangle, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetAllSystemConfigsFull,
  useGetAllEnergyData,
  useGetEVOAuthConfig,
  useDeleteEVOAuthConfig,
  useGetAllEVTelemetry,
  useForceRefresh,
} from '../../hooks/useQueries';
import AddSystemDialog from './AddSystemDialog';
import SystemStatusCards from './SystemStatusCards';
import MyEVCard from './MyEVCard';
import EVAuthDialog from './EVAuthDialog';
import { EVProvider } from '../../backend';
import type { EnergyData } from '../../backend';

const LAST_REFRESH_KEY = 'ecopowerhub_last_refresh';
const POLLING_STALE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

/** Returns the most recent timestamp (in ms) across all energy data entries, or null if none. */
function getMostRecentDataTimestamp(data: EnergyData[]): number | null {
  if (!data || data.length === 0) return null;
  let max = 0;
  for (const entry of data) {
    // ICP timestamps are in nanoseconds (bigint); convert to ms
    const ms = Number(entry.timestamp) / 1_000_000;
    if (ms > max) max = ms;
  }
  return max > 0 ? max : null;
}

function formatRelativeTime(ms: number): string {
  const diffMs = Date.now() - ms;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}

function formatTimestamp(ms: number): string {
  return new Date(ms).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// ─── Polling Status Banner ────────────────────────────────────────────────────
interface PollingStatusBannerProps {
  energyData: EnergyData[];
  isLoading: boolean;
}

function PollingStatusBanner({ energyData, isLoading }: PollingStatusBannerProps) {
  const [now, setNow] = useState(Date.now());

  // Tick every 30 seconds so the "X ago" label stays fresh
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Checking polling agent status…
      </div>
    );
  }

  const lastTs = getMostRecentDataTimestamp(energyData);

  if (lastTs === null) {
    return (
      <Alert variant="destructive" className="border-destructive/50">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>No data received</AlertTitle>
        <AlertDescription>
          No energy data has been recorded yet. Make sure the polling agent is running and the
          devices are reachable. See{' '}
          <code className="text-xs font-mono bg-destructive/10 px-1 rounded">
            frontend/scripts/POLLING_SETUP.md
          </code>{' '}
          for setup instructions.
        </AlertDescription>
      </Alert>
    );
  }

  const ageMs = now - lastTs;
  const isStale = ageMs > POLLING_STALE_THRESHOLD_MS;

  if (isStale) {
    return (
      <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">
          Warning: Polling agent may be offline
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          No data received in the last {Math.floor(ageMs / 60_000)} minutes. Last polled:{' '}
          <span className="font-medium">{formatTimestamp(lastTs)}</span> ({formatRelativeTime(lastTs)}).
          Check that the polling script is running and the DFX identity is configured correctly.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200">
      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      <AlertTitle className="text-emerald-800 dark:text-emerald-300">
        Polling agent is active
      </AlertTitle>
      <AlertDescription className="text-emerald-700 dark:text-emerald-400">
        Last polled:{' '}
        <span className="font-medium">{formatTimestamp(lastTs)}</span> ({formatRelativeTime(lastTs)}).
      </AlertDescription>
    </Alert>
  );
}

// ─── Main SystemsTab ──────────────────────────────────────────────────────────
export default function SystemsTab() {
  const [addSystemDialogOpen, setAddSystemDialogOpen] = useState(false);
  const [evAuthDialogOpen, setEVAuthDialogOpen] = useState(false);
  const [selectedEVProvider, setSelectedEVProvider] = useState<EVProvider>(EVProvider.ford);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(() => {
    const stored = localStorage.getItem(LAST_REFRESH_KEY);
    return stored ? new Date(stored) : null;
  });

  const { data: systems = [] } = useGetAllSystemConfigsFull();
  const { data: energyData = [], isLoading: energyDataLoading } = useGetAllEnergyData();
  const { data: fordConfig } = useGetEVOAuthConfig(EVProvider.ford);
  const { data: rivianConfig } = useGetEVOAuthConfig(EVProvider.rivian);
  const { data: allTelemetry = [] } = useGetAllEVTelemetry();
  const deleteEVOAuthMutation = useDeleteEVOAuthConfig();
  const forceRefreshMutation = useForceRefresh();

  // Derive per-provider telemetry (most recent entry wins)
  const fordTelemetry = allTelemetry.find((t) => t.provider === EVProvider.ford) ?? null;
  const rivianTelemetry = allTelemetry.find((t) => t.provider === EVProvider.rivian) ?? null;

  // Keep lastRefreshed in sync with localStorage
  useEffect(() => {
    if (lastRefreshed) {
      localStorage.setItem(LAST_REFRESH_KEY, lastRefreshed.toISOString());
    }
  }, [lastRefreshed]);

  const handleConnectEV = (provider: EVProvider) => {
    setSelectedEVProvider(provider);
    setEVAuthDialogOpen(true);
  };

  const handleDisconnectEV = (provider: EVProvider) => {
    if (confirm(`Are you sure you want to disconnect your ${provider === EVProvider.ford ? 'Ford' : 'Rivian'} vehicle?`)) {
      deleteEVOAuthMutation.mutate(provider);
    }
  };

  const handleForceRefresh = async () => {
    try {
      const result = await forceRefreshMutation.mutateAsync();
      const now = new Date();
      setLastRefreshed(now);
      toast.success(result || 'Devices refreshed successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to refresh devices';
      toast.error(message);
    }
  };

  const formatLastRefreshed = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const hasFordConnected = !!fordConfig;
  const hasRivianConnected = !!rivianConfig;

  return (
    <div className="space-y-6">
      {/* Polling Agent Status Banner */}
      <PollingStatusBanner energyData={energyData} isLoading={energyDataLoading} />

      {/* Header with Refresh All button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Connected Systems</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your energy systems and devices
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {lastRefreshed && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Last refreshed: {formatLastRefreshed(lastRefreshed)}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleForceRefresh}
            disabled={forceRefreshMutation.isPending}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${forceRefreshMutation.isPending ? 'animate-spin' : ''}`}
            />
            {forceRefreshMutation.isPending ? 'Refreshing...' : 'Refresh All Devices'}
          </Button>
        </div>
      </div>

      {/* System Status Cards */}
      <SystemStatusCards systems={systems} energyData={energyData} />

      {/* Add System Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setAddSystemDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add System
        </Button>
      </div>

      {/* My EV Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            My EV
          </CardTitle>
          <CardDescription>
            Connect your electric vehicle for solar charging optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ford */}
            {hasFordConnected ? (
              <MyEVCard
                provider={EVProvider.ford}
                telemetry={fordTelemetry}
                onDisconnect={() => handleDisconnectEV(EVProvider.ford)}
              />
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Car className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Ford</p>
                    <p className="text-xs text-muted-foreground">F-150 Lightning, Mustang Mach-E</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectEV(EVProvider.ford)}
                  >
                    Connect Ford
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Rivian */}
            {hasRivianConnected ? (
              <MyEVCard
                provider={EVProvider.rivian}
                telemetry={rivianTelemetry}
                onDisconnect={() => handleDisconnectEV(EVProvider.rivian)}
              />
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Car className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Rivian</p>
                    <p className="text-xs text-muted-foreground">R1T, R1S</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectEV(EVProvider.rivian)}
                  >
                    Connect Rivian
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddSystemDialog
        open={addSystemDialogOpen}
        onOpenChange={setAddSystemDialogOpen}
      />
      <EVAuthDialog
        open={evAuthDialogOpen}
        onOpenChange={setEVAuthDialogOpen}
        provider={selectedEVProvider}
      />
    </div>
  );
}
