import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '../components/dashboard/OverviewTab';
import SystemsTab from '../components/dashboard/SystemsTab';
import RecommendationsTab from '../components/dashboard/RecommendationsTab';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import AlarmsTab from '../components/dashboard/AlarmsTab';
import MaintenanceTab from '../components/dashboard/MaintenanceTab';
import { LayoutDashboard, Settings, Lightbulb, TrendingUp, AlarmClock, Globe, Wrench, Mail, Activity } from 'lucide-react';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const navigate = useNavigate();

  return (
    <div className="container py-4 sm:py-8 px-4">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {userProfile ? `${userProfile.name}'s Energy Dashboard` : 'Your Energy Dashboard'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome back! I'm EnergyOptim AI, Your Friendly Personal Energy Coach, and I'm here to help you understand your energy usage and find new ways to save. 
              Let's see how you're doing today! 🌟
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: '/domains' })}
                className="shrink-0"
              >
                <Globe className="h-4 w-4 mr-2" />
                Domains
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: '/email-automation' })}
                className="shrink-0"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: '/deployment-status' })}
                className="shrink-0"
              >
                <Activity className="h-4 w-4 mr-2" />
                Status
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} h-auto`}>
          <TabsTrigger value="overview" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="systems" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
            <Settings className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Systems</span>
          </TabsTrigger>
          <TabsTrigger value="alarms" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
            <AlarmClock className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Alarms</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Analytics</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="maintenance" className="gap-1 sm:gap-2 flex-col sm:flex-row py-2 sm:py-2.5">
              <Wrench className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Maintenance</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="systems" className="space-y-4 sm:space-y-6">
          <SystemsTab />
        </TabsContent>

        <TabsContent value="alarms" className="space-y-4 sm:space-y-6">
          <AlarmsTab />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 sm:space-y-6">
          <RecommendationsTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
          <AnalyticsTab />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="maintenance" className="space-y-4 sm:space-y-6">
            <MaintenanceTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
