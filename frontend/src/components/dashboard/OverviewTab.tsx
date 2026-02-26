import { useGetAllSystemConfigs, useGetAllEnergyData, useGetCallerUserProfile } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Thermometer, TrendingDown, Activity } from 'lucide-react';
import EnergyChart from './EnergyChart';
import TemperatureGauge from './TemperatureGauge';
import SystemStatusCards from './SystemStatusCards';
import { formatTemperature } from '../../lib/i18n';

export default function OverviewTab() {
  const { data: systems = [], isLoading: systemsLoading } = useGetAllSystemConfigs();
  const { data: energyData = [], isLoading: energyLoading } = useGetAllEnergyData();
  const { data: userProfile } = useGetCallerUserProfile();

  // Determine region from first system or default to US
  const userRegion = systems[0]?.region || 'US';

  // Calculate statistics
  const totalConsumption = energyData.reduce((sum, d) => sum + d.energyConsumption, 0);
  const avgTemperature = energyData.length > 0
    ? energyData.reduce((sum, d) => sum + d.temperature, 0) / energyData.length
    : 0;
  const activeSystems = systems.length;

  // Get latest data point for each system
  const latestDataBySystem = systems.map(system => {
    const systemData = energyData
      .filter(d => d.systemId === system.systemId)
      .sort((a, b) => Number(b.timestamp - a.timestamp));
    return systemData[0];
  }).filter(Boolean);

  const isLoading = systemsLoading || energyLoading;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Friendly intro message */}
      {systems.length === 0 && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <p className="text-center text-base font-medium">
              👋 Ready to start your energy journey? Let's connect your first system together! 
              Head over to the <span className="font-bold">Systems</span> tab to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy Used</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsumption.toFixed(2)} kWh</div>
            <p className="text-xs text-muted-foreground">
              {totalConsumption < 50 ? "Great job keeping it low! 🎉" : "Let's find ways to reduce this together"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTemperature(avgTemperature, userRegion)}</div>
            <p className="text-xs text-muted-foreground">
              {avgTemperature > 0 ? "Comfortable and efficient" : "Monitoring your comfort"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Systems</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSystems}</div>
            <p className="text-xs text-muted-foreground">
              {activeSystems > 0 ? "All systems working for you!" : "Ready to connect your first system"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">You're doing amazing! +5% from last week 🌟</p>
          </CardContent>
        </Card>
      </div>

      {/* System Status Cards */}
      {systems.length > 0 && (
        <SystemStatusCards systems={systems} energyData={energyData} />
      )}

      {/* Charts */}
      {energyData.length > 0 && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <EnergyChart data={energyData} />
          <TemperatureGauge data={latestDataBySystem} useCelsius={userRegion !== 'US'} />
        </div>
      )}
    </div>
  );
}
