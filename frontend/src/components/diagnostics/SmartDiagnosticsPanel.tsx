import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, CheckCircle2, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { useGetAllDiagnosticEvents } from '@/hooks/useQueries';
import type { DeviceQuality } from '@/backend';

export default function SmartDiagnosticsPanel() {
  const { data: diagnosticEvents, isLoading, error } = useGetAllDiagnosticEvents();

  const getQualityBadge = (quality: DeviceQuality) => {
    switch (quality) {
      case 'good':
        return <Badge className="bg-green-600">Good</Badge>;
      case 'bad':
        return <Badge variant="destructive">Bad</Badge>;
      case 'uncertain':
        return <Badge variant="secondary">Uncertain</Badge>;
    }
  };

  const getQualityIcon = (quality: DeviceQuality) => {
    switch (quality) {
      case 'good':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'bad':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'uncertain':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
          EcoPowerHub AI Smart Diagnostics
        </h2>
        <p className="text-xl text-muted-foreground">
          Automatic device health monitoring and intelligent troubleshooting
        </p>
      </div>

      {/* Recent Diagnostic Results */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Results</CardTitle>
          <CardDescription>
            Automated diagnostic sequences and troubleshooting results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Error Loading Diagnostics</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to load diagnostic data'}
              </AlertDescription>
            </Alert>
          ) : !diagnosticEvents || diagnosticEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <p>No diagnostics run yet. All systems appear healthy!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {diagnosticEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getQualityIcon(event.quality)}
                      <div>
                        <h4 className="font-semibold">Device: {event.deviceId}</h4>
                        <p className="text-sm text-muted-foreground">Tag: {event.tagId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getQualityBadge(event.quality)}
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{event.diagnosis}</p>

                  {event.errorCode && (
                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                      <span className="text-sm font-medium text-red-900 dark:text-red-100">
                        Error Code: {event.errorCode}
                      </span>
                    </div>
                  )}

                  {event.suggestedActions.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium mb-2">Suggested Actions:</h5>
                      <ul className="space-y-1">
                        {event.suggestedActions.map((action, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.checks.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium mb-2">Diagnostic Checks:</h5>
                      <div className="space-y-1">
                        {event.checks.map((check, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            {check.status === 'passed' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="font-medium">{check.checkType}:</span>
                            <span className="text-muted-foreground">{check.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.manufacturerReferralUrl && (
                    <div className="mt-3">
                      <a
                        href={event.manufacturerReferralUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        → Contact manufacturer support for this issue
                      </a>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress: {Number(event.progressPercent)}%</span>
                    <span>
                      {new Date(Number(event.timestamp) / 1000000).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            How EcoPowerHub AI Smart Diagnostics Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
          <p>
            <strong>Automatic Monitoring:</strong> The system continuously monitors all connected devices and tags for quality issues or stale data.
          </p>
          <p>
            <strong>Sequential Checks:</strong> When an issue is detected, diagnostics run automatically: connectivity → protocol sessions → tag reads → system status.
          </p>
          <p>
            <strong>Intelligent Analysis:</strong> Error codes are matched against our database of 50+ manufacturer-specific codes with plain-English explanations.
          </p>
          <p>
            <strong>Direct Support Links:</strong> Get pre-filled manufacturer support URLs with your specific error code for faster resolution.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
