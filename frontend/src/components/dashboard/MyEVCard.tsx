import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Battery, Zap, TrendingUp } from 'lucide-react';
import { EVProvider, type EVTelemetry } from '../../backend';

interface MyEVCardProps {
  provider: EVProvider;
  telemetry: EVTelemetry | null;
  onDisconnect: () => void;
}

export default function MyEVCard({ provider, telemetry, onDisconnect }: MyEVCardProps) {
  const [isCharging, setIsCharging] = useState(false);

  const providerName = provider === EVProvider.ford ? 'Ford' : 'Rivian';

  const handleChargeWithSolar = () => {
    setIsCharging(true);
    // Mock implementation - in production, this would trigger Modbus/OCPP integration
    console.log('Initiating solar charging for', providerName);
    setTimeout(() => setIsCharging(false), 2000);
  };

  if (!telemetry) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{providerName} EV</CardTitle>
          <CardDescription>No telemetry data available</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={onDisconnect}>
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{providerName} EV</CardTitle>
            <CardDescription>Vehicle ID: {telemetry.vehicleId}</CardDescription>
          </div>
          <Battery className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Battery Level</span>
            <span className="font-medium">{telemetry.batteryPercent.toFixed(1)}%</span>
          </div>
          <Progress value={telemetry.batteryPercent} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Range</p>
            <p className="text-2xl font-bold">{telemetry.rangeKm.toFixed(0)} km</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-2xl font-bold capitalize">{telemetry.chargingStatus}</p>
          </div>
        </div>

        <div className="h-24 bg-muted rounded-md flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Live update simulation</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleChargeWithSolar}
            disabled={isCharging}
          >
            <Zap className="mr-2 h-4 w-4" />
            {isCharging ? 'Initiating...' : 'Charge with Excess Solar'}
          </Button>
          <Button variant="outline" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
