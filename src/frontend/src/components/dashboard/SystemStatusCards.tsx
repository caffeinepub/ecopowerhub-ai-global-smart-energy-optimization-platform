import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Thermometer, Zap } from 'lucide-react';
import type { SystemConfigPublic, EnergyData } from '../../types';

interface SystemStatusCardsProps {
  systems: SystemConfigPublic[];
  energyData: EnergyData[];
}

export default function SystemStatusCards({ systems, energyData }: SystemStatusCardsProps) {
  const getLatestEnergyData = (systemId: string): EnergyData | undefined => {
    return energyData
      .filter((data) => data.systemId === systemId)
      .sort((a, b) => Number(b.timestamp - a.timestamp))[0];
  };

  if (systems.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Activity className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No systems connected yet. Add your first energy system to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {systems.map((system) => {
        const latestData = getLatestEnergyData(system.systemId);
        return (
          <Card key={system.systemId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{system.brand}</CardTitle>
                <Badge variant="outline">{system.region}</Badge>
              </div>
              <CardDescription>{system.systemType}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {latestData ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Energy</span>
                    </div>
                    <span className="font-medium">
                      {latestData.energyConsumption.toFixed(2)} kWh
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <span className="font-medium">
                      {latestData.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last updated:{' '}
                    {new Date(Number(latestData.timestamp) / 1000000).toLocaleString('en-US', {
                      timeZone: latestData.timeZone,
                    })}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
