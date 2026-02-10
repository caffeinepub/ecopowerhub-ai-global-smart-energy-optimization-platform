import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, CheckCircle2, Info } from 'lucide-react';

// Local type definitions for diagnostics features (backend implementation pending)
type DeviceQuality = 'good' | 'bad' | 'uncertain';

type DiagnosticEvent = {
  id: string;
  deviceId: string;
  tagId: string;
  timestamp: bigint;
  quality: DeviceQuality;
  diagnosis: string;
  suggestedActions: string[];
  status: string;
  progressPercent: number;
};

export default function SmartDiagnosticsPanel() {
  // Mock data for demonstration (backend implementation pending)
  const diagnosticEvents: DiagnosticEvent[] = [];

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

      {/* Backend Implementation Notice */}
      <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">
          Smart Diagnostics (Preview)
        </AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          This panel displays mock data. Backend implementation for smart diagnostics engine is pending.
        </AlertDescription>
      </Alert>

      {/* Recent Diagnostic Results */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Results</CardTitle>
          <CardDescription>
            Automated diagnostic sequences and troubleshooting results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <p>No diagnostics run yet. All systems appear healthy!</p>
          </div>
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
