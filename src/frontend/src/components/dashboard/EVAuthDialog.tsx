import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useAddEVOAuthConfig } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { EVProvider, type EVOAuthConfig } from '../../backend';

interface EVAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: EVProvider;
}

export default function EVAuthDialog({ open, onOpenChange, provider }: EVAuthDialogProps) {
  const { identity } = useInternetIdentity();
  const [vehicleId, setVehicleId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const addEVOAuthMutation = useAddEVOAuthConfig();

  const providerName = provider === EVProvider.ford ? 'Ford' : 'Rivian';

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity) {
      console.error('User not authenticated');
      return;
    }

    setIsConnecting(true);

    try {
      // Mock OAuth flow - in production, this would redirect to provider's OAuth page
      const mockConfig: EVOAuthConfig = {
        userId: identity.getPrincipal(),
        provider,
        accessToken: `mock_access_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
        expiresAt: BigInt((Date.now() + 3600000) * 1000000), // 1 hour from now
        createdAt: BigInt(Date.now() * 1000000),
        updatedAt: BigInt(Date.now() * 1000000),
      };

      await addEVOAuthMutation.mutateAsync(mockConfig);
      onOpenChange(false);
      setVehicleId('');
    } catch (error) {
      console.error('Failed to connect EV:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect {providerName} Vehicle</DialogTitle>
          <DialogDescription>
            Authorize EcoPowerHub AI to access your {providerName} vehicle data
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConnect}>
          <div className="grid gap-4 py-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                You'll be redirected to {providerName}'s secure login page to authorize access.
                We only request read-only access to battery level, range, and charging status.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-2">
              <Label htmlFor="vehicleId">Vehicle ID (VIN or ID)</Label>
              <Input
                id="vehicleId"
                placeholder={`Enter your ${providerName} vehicle ID`}
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                You can find this in your {providerName} mobile app
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">What we'll access:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Battery state of charge (SoC)</li>
                <li>Estimated range</li>
                <li>Charging status</li>
                <li>Vehicle location (for solar optimization)</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isConnecting || !vehicleId}>
              {isConnecting ? 'Connecting...' : `Connect ${providerName}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
