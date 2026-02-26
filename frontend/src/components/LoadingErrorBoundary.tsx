import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface LoadingErrorBoundaryProps {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onRetry: () => void;
  loadingMessage?: string;
  errorMessage?: string;
  timeout?: number;
  children: React.ReactNode;
}

export default function LoadingErrorBoundary({
  isLoading,
  isError,
  error,
  onRetry,
  loadingMessage = 'Loading your data...',
  errorMessage = 'Still waking up… please try again',
  timeout = 15000,
  children,
}: LoadingErrorBoundaryProps) {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setHasTimedOut(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasTimedOut(true);
      console.warn(`Loading timeout: ${loadingMessage} exceeded ${timeout}ms`);
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, timeout, loadingMessage]);

  useEffect(() => {
    if (isError && error) {
      console.error('LoadingErrorBoundary caught error:', error);
    }
  }, [isError, error]);

  if (isError || hasTimedOut) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert variant="destructive" className="border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">
              {!isOnline ? 'No Internet Connection' : errorMessage}
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              {!isOnline ? (
                <div className="flex items-center gap-2 text-sm">
                  <WifiOff className="h-4 w-4" />
                  <span>Please check your internet connection and try again.</span>
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    {hasTimedOut
                      ? "The system is taking longer than expected to respond. This might be due to slow network or the backend waking up."
                      : "We're having trouble loading your data right now."}
                  </p>
                  {error && (
                    <details className="text-xs opacity-75">
                      <summary className="cursor-pointer hover:opacity-100">Technical details</summary>
                      <pre className="mt-2 overflow-auto rounded bg-black/10 p-2">
                        {error.message || String(error)}
                      </pre>
                    </details>
                  )}
                </>
              )}
            </AlertDescription>
          </Alert>

          <Button
            onClick={() => {
              console.log('Retrying data fetch...');
              setHasTimedOut(false);
              onRetry();
            }}
            className="w-full"
            size="lg"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>If the problem persists, the backend might be initializing.</p>
            <p className="mt-1">Please wait a moment and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <Wifi className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">{loadingMessage}</p>
            <p className="text-sm text-muted-foreground">This should only take a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
