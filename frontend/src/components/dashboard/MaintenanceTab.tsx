import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Zap, TrendingUp, Settings, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetMaintenanceDashboard } from '@/hooks/useQueries';
import type { ServiceStatus } from '@/backend';

export default function MaintenanceTab() {
  const { data: dashboard, isLoading, error, refetch } = useGetMaintenanceDashboard();

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'unhealthy':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleManualRefresh = async () => {
    await refetch();
    toast.success('Dashboard refreshed', {
      description: 'Latest maintenance data loaded',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error Loading Maintenance Dashboard</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load maintenance data'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!dashboard) {
    return (
      <Alert>
        <Activity className="h-5 w-5" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>Maintenance dashboard data is not available.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Health Status
              </CardTitle>
              <CardDescription>Real-time monitoring of all system services</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleManualRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border ${getStatusColor(dashboard.systemHealth.overallStatus)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(dashboard.systemHealth.overallStatus)}
                <div>
                  <h3 className="font-semibold">Overall System Status</h3>
                  <p className="text-sm opacity-80">{dashboard.systemHealth.performanceMetrics}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg font-bold">
                {dashboard.systemHealth.uptime.toFixed(2)}% Uptime
              </Badge>
            </div>
          </div>

          {/* Individual Service Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg border ${getStatusColor(dashboard.systemHealth.networkStatus)}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(dashboard.systemHealth.networkStatus)}
                <span className="font-medium">Network Connections</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg border ${getStatusColor(dashboard.systemHealth.deviceIntegrationStatus)}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(dashboard.systemHealth.deviceIntegrationStatus)}
                <span className="font-medium">Device Integration</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg border ${getStatusColor(dashboard.systemHealth.dataSyncStatus)}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(dashboard.systemHealth.dataSyncStatus)}
                <span className="font-medium">Data Synchronization</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg border ${getStatusColor(dashboard.systemHealth.backendStatus)}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(dashboard.systemHealth.backendStatus)}
                <span className="font-medium">Backend Services</span>
              </div>
            </div>
          </div>

          {/* Active Processes */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Active Processes</h4>
            <div className="flex flex-wrap gap-2">
              {dashboard.systemHealth.activeProcesses.map((process, index) => (
                <Badge key={index} variant="secondary">
                  {process}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Self-Healing Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recent Self-Healing Events
          </CardTitle>
          <CardDescription>Automatic issue detection and resolution history</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboard.recentEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <p>No recent events. All systems running smoothly!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboard.recentEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{event.service}</h4>
                      <p className="text-sm text-muted-foreground">{event.issueType}</p>
                    </div>
                    <Badge variant={event.status === 'resolved' ? 'default' : 'destructive'}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{event.resolution}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Root Cause: {event.rootCause}</span>
                    <span>Time to Resolution: {Number(event.timeToResolution)}s</span>
                    <span>Retries: {Number(event.retryCount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Learning Updates
          </CardTitle>
          <CardDescription>System intelligence improvements and pattern recognition</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboard.learningUpdates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No learning updates yet. System is gathering data...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboard.learningUpdates.map((update) => (
                <div key={update.id} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Pattern Detected: {update.issuePattern}</h4>
                  <p className="text-sm mb-2">{update.optimizationSuggestion}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Device Correlation: {update.deviceCorrelation}</span>
                    <span>Impact: {update.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Suggestions</CardTitle>
          <CardDescription>Recommended actions to improve system performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dashboard.optimizationSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Maintenance Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Maintenance Configuration
          </CardTitle>
          <CardDescription>Self-healing system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Auto-Repair Threshold</div>
              <div className="text-2xl font-bold">{Number(dashboard.config.autoRepairThreshold)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Max Retries</div>
              <div className="text-2xl font-bold">{Number(dashboard.config.maxRetries)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Alert Escalation Threshold</div>
              <div className="text-2xl font-bold">{Number(dashboard.config.alertEscalationThreshold)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">System Status</div>
              <div className="text-2xl font-bold">
                {dashboard.config.isActive ? (
                  <Badge variant="default">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
