import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Car } from 'lucide-react';
import { useGetAllSystemConfigsFull, useGetEVOAuthConfig, useDeleteEVOAuthConfig } from '../../hooks/useQueries';
import AddSystemDialog from './AddSystemDialog';
import SystemStatusCards from './SystemStatusCards';
import MyEVCard from './MyEVCard';
import EVAuthDialog from './EVAuthDialog';
import { EVProvider } from '../../backend';

export default function SystemsTab() {
  const [addSystemDialogOpen, setAddSystemDialogOpen] = useState(false);
  const [evAuthDialogOpen, setEVAuthDialogOpen] = useState(false);
  const [selectedEVProvider, setSelectedEVProvider] = useState<EVProvider>(EVProvider.ford);

  const { data: systems = [] } = useGetAllSystemConfigsFull();
  const { data: fordConfig } = useGetEVOAuthConfig(EVProvider.ford);
  const { data: rivianConfig } = useGetEVOAuthConfig(EVProvider.rivian);
  const deleteEVOAuthMutation = useDeleteEVOAuthConfig();

  const handleConnectEV = (provider: EVProvider) => {
    setSelectedEVProvider(provider);
    setEVAuthDialogOpen(true);
  };

  const handleDisconnectEV = async (provider: EVProvider) => {
    if (confirm(`Are you sure you want to disconnect your ${provider === EVProvider.ford ? 'Ford' : 'Rivian'} vehicle?`)) {
      try {
        await deleteEVOAuthMutation.mutateAsync(provider);
      } catch (error) {
        console.error('Failed to disconnect EV:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Connected Systems</h2>
          <p className="text-muted-foreground">
            Manage your energy systems and EV integrations
          </p>
        </div>
        <Button onClick={() => setAddSystemDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add System
        </Button>
      </div>

      <SystemStatusCards systems={systems} energyData={[]} />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          <h3 className="text-xl font-semibold">My EV</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {fordConfig ? (
            <MyEVCard
              provider={EVProvider.ford}
              telemetry={null}
              onDisconnect={() => handleDisconnectEV(EVProvider.ford)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Ford EV</CardTitle>
                <CardDescription>Connect your Ford electric vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleConnectEV(EVProvider.ford)}>
                  Connect Ford
                </Button>
              </CardContent>
            </Card>
          )}

          {rivianConfig ? (
            <MyEVCard
              provider={EVProvider.rivian}
              telemetry={null}
              onDisconnect={() => handleDisconnectEV(EVProvider.rivian)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Rivian EV</CardTitle>
                <CardDescription>Connect your Rivian electric vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleConnectEV(EVProvider.rivian)}>
                  Connect Rivian
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AddSystemDialog open={addSystemDialogOpen} onOpenChange={setAddSystemDialogOpen} />
      <EVAuthDialog
        open={evAuthDialogOpen}
        onOpenChange={setEVAuthDialogOpen}
        provider={selectedEVProvider}
      />
    </div>
  );
}
