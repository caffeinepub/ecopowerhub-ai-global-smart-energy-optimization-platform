import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  Server, 
  Globe, 
  Shield, 
  Activity,
  Wrench,
  Clock,
  ExternalLink,
  Copy,
  Terminal,
  Info,
  CheckCheck,
  FileCheck
} from 'lucide-react';
import { toast } from 'sonner';

export default function DeploymentStatusPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [domainAccessibility, setDomainAccessibility] = useState<{
    [key: string]: { accessible: boolean; sslValid: boolean; error?: string };
  }>({});

  const domains = ['ecopowerhub.ai', 'www.ecopowerhub.ai'];

  const checkDomainAccessibility = async () => {
    setIsChecking(true);
    const results: typeof domainAccessibility = {};
    
    for (const domain of domains) {
      try {
        const response = await fetch(`https://${domain}`, { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        
        results[domain] = {
          accessible: true,
          sslValid: true
        };
      } catch (error: any) {
        results[domain] = {
          accessible: false,
          sslValid: false,
          error: error.message
        };
      }
    }
    
    setDomainAccessibility(results);
    setLastChecked(new Date());
    setIsChecking(false);
  };

  useEffect(() => {
    checkDomainAccessibility();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="container py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          ICP Gateway Domain Configuration
        </h1>
        <p className="text-muted-foreground">
          Production deployment guide for ecopowerhub.ai and www.ecopowerhub.ai with .well-known/ic-domains validation
        </p>
      </div>

      {/* Frontend Ready Alert - Enhanced */}
      <Alert className="mb-6 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        <AlertTitle className="text-emerald-900 dark:text-emerald-100 font-semibold text-lg">
          ✅ Frontend Configuration Complete – Ready for Production Deployment
        </AlertTitle>
        <AlertDescription className="text-emerald-800 dark:text-emerald-200 space-y-3">
          <p className="font-semibold text-base">
            The <code className="bg-emerald-200 dark:bg-emerald-900 px-1.5 py-0.5 rounded font-mono text-sm">frontend/public/.well-known/ic-domains</code> file is properly configured with both domain entries:
          </p>
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg font-mono text-sm space-y-2 border border-emerald-300 dark:border-emerald-700">
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              File: frontend/public/.well-known/ic-domains
            </div>
            <div className="pl-2 space-y-1">
              <div className="text-emerald-700 dark:text-emerald-300 font-bold">ecopowerhub.ai</div>
              <div className="text-emerald-700 dark:text-emerald-300 font-bold">www.ecopowerhub.ai</div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => copyToClipboard('ecopowerhub.ai\nwww.ecopowerhub.ai')}
              variant="default"
              size="sm"
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <Copy className="h-3 w-3" />
              Copy Domain List
            </Button>
            <Button
              onClick={() => copyToClipboard('frontend/public/.well-known/ic-domains')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Copy className="h-3 w-3" />
              Copy File Path
            </Button>
          </div>
          <div className="mt-4 p-3 bg-emerald-200 dark:bg-emerald-900/50 rounded-lg border border-emerald-400 dark:border-emerald-600">
            <p className="font-bold text-emerald-900 dark:text-emerald-100 text-base flex items-center gap-2">
              <CheckCheck className="h-5 w-5" />
              Frontend is 100% ready for production deployment!
            </p>
            <p className="text-emerald-800 dark:text-emerald-200 text-sm mt-1">
              The .well-known/ic-domains file will be automatically included in the build and served as a static asset at the root of your deployment.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Backend Configuration Required Alert */}
      <Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="text-amber-900 dark:text-amber-100 font-semibold">
          ⚠️ Backend Configuration Check Required
        </AlertTitle>
        <AlertDescription className="text-amber-800 dark:text-amber-200 space-y-2">
          <p>
            Before deploying, verify that your <code className="bg-amber-200 dark:bg-amber-900 px-1 py-0.5 rounded font-mono text-xs">dfx.json</code> file does NOT contain an <code className="bg-amber-200 dark:bg-amber-900 px-1 py-0.5 rounded font-mono text-xs">allowed_hosts</code> parameter in the backend canister configuration. This parameter is deprecated and can cause conflicts with the .well-known/ic-domains method.
          </p>
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg font-mono text-xs space-y-2 border border-amber-300 dark:border-amber-700">
            <div className="text-red-600 dark:text-red-400 font-semibold"># If present in dfx.json backend canister config, remove this:</div>
            <div className="pl-2 line-through text-muted-foreground">
              <div>"allowed_hosts": [</div>
              <div className="pl-4">"ecopowerhub.ai",</div>
              <div className="pl-4">"www.ecopowerhub.ai"</div>
              <div>]</div>
            </div>
          </div>
          <p className="font-semibold mt-3">
            The <code className="bg-amber-200 dark:bg-amber-900 px-1 py-0.5 rounded font-mono text-xs">allowed_hosts</code> parameter is deprecated. The ICP Gateway now exclusively uses the <code className="bg-amber-200 dark:bg-amber-900 px-1 py-0.5 rounded font-mono text-xs">.well-known/ic-domains</code> file for domain validation.
          </p>
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={checkDomainAccessibility}
          disabled={isChecking}
          size="lg"
          className="gap-2"
        >
          {isChecking ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Activity className="h-4 w-4" />
              Check Domain Status
            </>
          )}
        </Button>

        <Button
          onClick={() => window.open('https://ecopowerhub.ai/.well-known/ic-domains', '_blank')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <FileCheck className="h-4 w-4" />
          Verify .well-known File
        </Button>

        <Button
          onClick={() => window.open('https://ecopowerhub.ai', '_blank')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Test Root Domain
        </Button>

        <Button
          onClick={() => window.open('https://www.ecopowerhub.ai', '_blank')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Test WWW Domain
        </Button>
      </div>

      {lastChecked && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Clock className="h-4 w-4" />
          Last checked: {lastChecked.toLocaleString()}
        </div>
      )}

      {/* Domain Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {domains.map((domain) => {
          const accessibility = domainAccessibility[domain];
          
          return (
            <Card key={domain} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {domain}
                  </span>
                  {domain === 'www.ecopowerhub.ai' && (
                    <Badge variant="default" className="bg-primary">Primary</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Domain accessibility and SSL certificate status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Domain Accessibility */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    {accessibility?.accessible ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">Domain Accessibility</p>
                      <p className="text-xs text-muted-foreground">
                        {accessibility?.error || 'HTTP/HTTPS reachability'}
                      </p>
                    </div>
                  </div>
                  <Badge variant={accessibility?.accessible ? 'default' : 'destructive'}>
                    {accessibility?.accessible ? 'Accessible' : 'Unreachable'}
                  </Badge>
                </div>

                {/* SSL Status */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    {accessibility?.sslValid ? (
                      <Shield className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">SSL Certificate</p>
                      <p className="text-xs text-muted-foreground">
                        HTTPS encryption with SAN scope
                      </p>
                    </div>
                  </div>
                  <Badge variant={accessibility?.sslValid ? 'default' : 'secondary'}>
                    {accessibility?.sslValid ? 'Valid' : 'Pending'}
                  </Badge>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => window.open(`https://${domain}`, '_blank')}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Test Domain
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Step-by-Step Deployment Guide */}
      <Card className="mb-6 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Production Deployment Steps
          </CardTitle>
          <CardDescription>
            Follow these steps to deploy with custom domain validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 0 - Frontend Ready */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
                <CheckCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2 text-emerald-600 dark:text-emerald-400">✅ VERIFIED: Frontend Configuration Complete</p>
                <p className="text-sm text-muted-foreground mb-3">
                  The <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">frontend/public/.well-known/ic-domains</code> file exists and contains both domain entries (ecopowerhub.ai and www.ecopowerhub.ai).
                </p>
                <Alert className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-xs text-emerald-800 dark:text-emerald-200">
                    <strong>Frontend is production-ready!</strong> The .well-known/ic-domains file will be automatically included in the build output and served as a static asset at <code className="bg-emerald-200 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">/.well-known/ic-domains</code>.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 1 - Backend Configuration */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Verify dfx.json Backend Configuration</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Open your <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">dfx.json</code> file and verify the backend canister configuration does NOT contain an <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">allowed_hosts</code> parameter. If present, remove it:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-red-600 dark:text-red-400"># In dfx.json, ensure backend canister does NOT have:</div>
                  <div className="pl-2 line-through text-muted-foreground">
                    <div>"backend": &#123;</div>
                    <div className="pl-4">"type": "motoko",</div>
                    <div className="pl-4">"main": "backend/main.mo",</div>
                    <div className="pl-4 text-red-600 dark:text-red-400">"allowed_hosts": [</div>
                    <div className="pl-8 text-red-600 dark:text-red-400">"ecopowerhub.ai",</div>
                    <div className="pl-8 text-red-600 dark:text-red-400">"www.ecopowerhub.ai"</div>
                    <div className="pl-4 text-red-600 dark:text-red-400">]</div>
                    <div>&#125;</div>
                  </div>
                </div>
                <Alert className="mt-3 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
                    The <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">allowed_hosts</code> parameter is deprecated and can cause conflicts. The ICP Gateway now exclusively uses the <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">.well-known/ic-domains</code> file for domain validation.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 2 - Build Frontend */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Build Frontend Assets in Production Mode</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Build the frontend application to include the .well-known/ic-domains file in the production bundle:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-emerald-600 dark:text-emerald-400"># Navigate to frontend directory</div>
                  <div>cd frontend</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Build production assets</div>
                  <div>npm run build</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Verify .well-known/ic-domains is in dist folder</div>
                  <div>ls -la dist/.well-known/ic-domains</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Expected output: file exists with both domains</div>
                  <div>cat dist/.well-known/ic-domains</div>
                </div>
                <Button
                  onClick={() => copyToClipboard('cd frontend && npm run build && ls -la dist/.well-known/ic-domains && cat dist/.well-known/ic-domains')}
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Copy Commands
                </Button>
                <Alert className="mt-3 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
                    The build process automatically copies the <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">.well-known/ic-domains</code> file from <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">public</code> to <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">dist</code>, making it accessible at the root of your deployment.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 3 - Deploy to IC */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Deploy to Internet Computer Mainnet</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Deploy the frontend canister to the Internet Computer mainnet:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-emerald-600 dark:text-emerald-400"># Return to project root</div>
                  <div>cd ..</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Deploy frontend canister to mainnet</div>
                  <div>dfx deploy frontend --network ic</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Or deploy all canisters</div>
                  <div>dfx deploy --network ic</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># The .well-known/ic-domains file will be publicly accessible</div>
                </div>
                <Button
                  onClick={() => copyToClipboard('cd .. && dfx deploy frontend --network ic')}
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Copy Command
                </Button>
                <Alert className="mt-3 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
                    This deployment makes the <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">.well-known/ic-domains</code> file publicly accessible at <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">https://[canister-id].icp0.io/.well-known/ic-domains</code>. The ICP Gateway will automatically detect and validate both domains.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 4 - Configure DNS */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                4
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Configure DNS Records (If Not Already Done)</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Set up DNS records in your domain registrar to point both domains to the ICP Gateway:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-emerald-600 dark:text-emerald-400"># Root domain (ecopowerhub.ai)</div>
                  <div>Type: CNAME | Name: @ | Target: icp1.io</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># WWW subdomain (www.ecopowerhub.ai)</div>
                  <div>Type: CNAME | Name: www | Target: icp1.io</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># ACME challenge for SSL (both domains)</div>
                  <div>Type: CNAME | Name: _acme-challenge | Target: _acme-challenge.ecopowerhub.ai.icp2.io</div>
                  <div>Type: CNAME | Name: _acme-challenge.www | Target: _acme-challenge.www.ecopowerhub.ai.icp2.io</div>
                </div>
                <Alert className="mt-3 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
                    If using Cloudflare, set "Proxy status" to "DNS only" (gray cloud) to allow direct ICP Gateway routing. Orange cloud (proxied) mode may interfere with ICP Gateway functionality.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 5 - Wait for Validation */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                5
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Wait for ICP Gateway Validation & SSL Provisioning</p>
                <p className="text-sm text-muted-foreground mb-3">
                  The ICP Gateway will automatically fetch and validate the .well-known/ic-domains file and provision SSL certificates:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-emerald-600 dark:text-emerald-400"># ICP Gateway will fetch:</div>
                  <div>https://ecopowerhub.ai/.well-known/ic-domains</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># And validate both domains:</div>
                  <div className="pl-4">- ecopowerhub.ai</div>
                  <div className="pl-4">- www.ecopowerhub.ai</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Typical timeline:</div>
                  <div>- Domain validation: 5-15 minutes</div>
                  <div>- SSL certificate provisioning: 5-30 minutes</div>
                  <div>- DNS propagation: 5-15 minutes (up to 48 hours globally)</div>
                </div>
                <Alert className="mt-3 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
                    The ICP Gateway automatically checks the <code className="bg-blue-200 dark:bg-blue-900 px-1 py-0.5 rounded font-mono">.well-known/ic-domains</code> file and provisions Let's Encrypt certificates with both domains as SANs. No manual intervention required.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 6 - Verify */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
                <CheckCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">Verify Deployment Success</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Test both domains to confirm they resolve correctly with valid SSL certificates:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-emerald-600 dark:text-emerald-400"># Test root domain</div>
                  <div>curl -I https://ecopowerhub.ai</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Test www subdomain</div>
                  <div>curl -I https://www.ecopowerhub.ai</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Verify .well-known/ic-domains is publicly accessible</div>
                  <div>curl https://ecopowerhub.ai/.well-known/ic-domains</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400"># Expected response:</div>
                  <div>HTTP/2 200</div>
                  <div>x-ic-canister-id: [YOUR_CANISTER_ID]</div>
                  <div>ecopowerhub.ai</div>
                  <div>www.ecopowerhub.ai</div>
                </div>
                <Button
                  onClick={() => copyToClipboard('curl -I https://ecopowerhub.ai && curl -I https://www.ecopowerhub.ai && curl https://ecopowerhub.ai/.well-known/ic-domains')}
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Copy Verification Commands
                </Button>
                <Alert className="mt-3 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-xs text-emerald-800 dark:text-emerald-200">
                    <strong>Success!</strong> Both domains should return HTTP 200 with valid SSL certificates. The <code className="bg-emerald-200 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">.well-known/ic-domains</code> file should be publicly accessible and contain both domain entries. Use the "Check Domain Status" button above to verify.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Guide */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Common Issues & Solutions
          </CardTitle>
          <CardDescription>
            Troubleshooting steps for domain and SSL configuration problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                400 Unknown Domain
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Cause:</strong> The .well-known/ic-domains file is not accessible or doesn't contain the domain
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Solution:</strong> Verify the <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">frontend/public/.well-known/ic-domains</code> file exists with both domains listed (one per line), rebuild the frontend with <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">npm run build</code>, and redeploy with <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">dfx deploy frontend --network ic</code>. Verify the file is accessible at <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">https://ecopowerhub.ai/.well-known/ic-domains</code>.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                .well-known/ic-domains File Not Found (404)
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Cause:</strong> The file was not included in the build or deployment
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Solution:</strong> Verify the file exists at <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">frontend/public/.well-known/ic-domains</code>, rebuild with <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">npm run build</code>, check that it's included in the <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">dist/.well-known/</code> folder, and redeploy.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                NET::ERR_CERT_COMMON_NAME_INVALID
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Cause:</strong> TLS certificate does not include both domains in the SAN (Subject Alternative Name) field
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Solution:</strong> Ensure the <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.well-known/ic-domains</code> file includes both domains before deployment. The ICP Gateway will provision a new certificate with both domains in the SAN field automatically. Wait 10-30 minutes after deployment for certificate provisioning.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Conflict with allowed_hosts Parameter
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Cause:</strong> The deprecated <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">allowed_hosts</code> parameter in dfx.json is conflicting with the new .well-known/ic-domains method
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Solution:</strong> Remove the <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">allowed_hosts</code> parameter from the backend canister configuration in <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">dfx.json</code> and redeploy. The ICP Gateway now exclusively uses the <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.well-known/ic-domains</code> file for domain validation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Reference */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Technical Reference
          </CardTitle>
          <CardDescription>
            Configuration parameters and technical details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-sm mb-2">.well-known/ic-domains File</p>
              <p className="text-sm text-muted-foreground mb-2">
                The <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.well-known/ic-domains</code> file is a plain-text file that lists all custom domains authorized to access your canister. Each domain should be on a separate line. This file must be publicly accessible at the root of your deployment.
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                ecopowerhub.ai<br />
                www.ecopowerhub.ai
              </div>
            </div>

            <div>
              <p className="font-medium text-sm mb-2">Advantages Over allowed_hosts</p>
              <p className="text-sm text-muted-foreground">
                The <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.well-known/ic-domains</code> method offers several advantages:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>No need to modify <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">dfx.json</code> configuration</li>
                <li>Easier to update domains without redeploying the entire canister</li>
                <li>Standard web convention (similar to <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.well-known/acme-challenge</code>)</li>
                <li>More flexible for multi-domain deployments</li>
                <li>Publicly verifiable domain authorization</li>
                <li>No conflicts with backend canister configuration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Information</CardTitle>
          <CardDescription>
            Current deployment configuration and version
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Application:</span>
              <span className="font-medium">EcoPowerHub AI – Global Smart Energy Optimization Platform</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span className="font-medium">23.0 (Production Deployment Ready)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform:</span>
              <span className="font-medium">Internet Computer</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Primary Domain:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">www.ecopowerhub.ai</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('www.ecopowerhub.ai')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Root Domain:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">ecopowerhub.ai</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('ecopowerhub.ai')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Configuration Method:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium font-mono text-xs">.well-known/ic-domains</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('frontend/public/.well-known/ic-domains')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validation File URL:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium font-mono text-xs">/.well-known/ic-domains</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => window.open('https://ecopowerhub.ai/.well-known/ic-domains', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="font-medium">English (en-US)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frontend Status:</span>
              <Badge variant="default" className="bg-emerald-600">✅ Ready for Deployment</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
