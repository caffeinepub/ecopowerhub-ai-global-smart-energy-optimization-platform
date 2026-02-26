import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TrackingIdCopyProps {
  trackingId: string;
}

export function TrackingIdCopy({ trackingId }: TrackingIdCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      toast.success('Tracking ID copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy tracking ID');
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground mb-1">Your Tracking ID</p>
        <code className="text-sm font-mono break-all">{trackingId}</code>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="shrink-0"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
