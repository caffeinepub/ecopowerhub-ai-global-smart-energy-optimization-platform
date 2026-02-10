import { useState, useEffect } from 'react';
import { useAddSystemConfig, useGetSupportedDevices } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { DEVICE_BRANDS, SYSTEM_TYPES, SUPPORTED_REGIONS, REGION_LABELS } from '../../lib/i18n';

interface AddSystemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddSystemDialog({ open, onOpenChange }: AddSystemDialogProps) {
  const [systemId, setSystemId] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [systemType, setSystemType] = useState('HVAC');
  const [authToken, setAuthToken] = useState('');
  const [brand, setBrand] = useState('Sense');
  const [region, setRegion] = useState('US');
  const addSystem = useAddSystemConfig();
  const { identity } = useInternetIdentity();
  const { data: supportedDevices = [] } = useGetSupportedDevices(region);

  // Filter system types based on supported devices for selected region
  const availableSystemTypes = supportedDevices.length > 0
    ? Array.from(new Set(supportedDevices.map(d => d.systemType)))
    : SYSTEM_TYPES.map(t => t.value);

  // Auto-detect region from browser
  useEffect(() => {
    const browserLang = navigator.language;
    if (browserLang.includes('US')) setRegion('US');
    else if (browserLang.includes('CA')) setRegion('Canada');
    else if (browserLang.includes('GB')) setRegion('UK');
    else if (browserLang.includes('DE')) setRegion('Germany');
    else if (browserLang.includes('FR')) setRegion('France');
    else if (browserLang.includes('ES')) setRegion('Spain');
    else if (browserLang.includes('CN') || browserLang.includes('ZH')) setRegion('China');
    else if (browserLang.includes('JP')) setRegion('Japan');
    else if (browserLang.includes('AU')) setRegion('Australia');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!systemId.trim() || !apiEndpoint.trim() || !authToken.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!identity) {
      toast.error('Authentication required');
      return;
    }

    try {
      await addSystem.mutateAsync({
        systemId: systemId.trim(),
        apiEndpoint: apiEndpoint.trim(),
        systemType,
        authToken: authToken.trim(),
        brand,
        region,
        owner: identity.getPrincipal(),
      });
      toast.success('System added successfully!');
      onOpenChange(false);
      // Reset form
      setSystemId('');
      setApiEndpoint('');
      setSystemType('HVAC');
      setAuthToken('');
      setBrand('Sense');
    } catch (error) {
      toast.error('Failed to add system');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New System</DialogTitle>
          <DialogDescription>
            Configure a new energy system to monitor and control.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_REGIONS).map(([regionGroup, countries]) => (
                  <div key={regionGroup}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {regionGroup}
                    </div>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {REGION_LABELS[country] || country}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Device Brand</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger id="brand">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEVICE_BRANDS.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemType">System Type</Label>
            <Select value={systemType} onValueChange={setSystemType}>
              <SelectTrigger id="systemType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SYSTEM_TYPES.filter(t => availableSystemTypes.includes(t.value)).map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {supportedDevices.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Available for {region}: {availableSystemTypes.join(', ')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemId">System ID</Label>
            <Input
              id="systemId"
              placeholder="e.g., HVAC-Floor-1"
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiEndpoint">API Endpoint</Label>
            <Input
              id="apiEndpoint"
              placeholder="https://api.example.com/system"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authToken">Authentication Token</Label>
            <Input
              id="authToken"
              type="password"
              placeholder="Enter API token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addSystem.isPending}>
              {addSystem.isPending ? 'Adding...' : 'Add System'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

