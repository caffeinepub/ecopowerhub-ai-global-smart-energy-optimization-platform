import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ExternalLink, TrendingUp, Globe, DollarSign, Info } from 'lucide-react';

// Local type definitions for domain portfolio features (backend implementation pending)
type DomainVariant = {
  domain: string;
  isAvailable: boolean;
  priceUsd: number;
  registrar: string;
  lastChecked: bigint;
};

type DomainPortfolio = {
  variants: DomainVariant[];
  strategy: string;
  recommendations: string;
  lastUpdated: bigint;
};

export default function DomainPortfolioPage() {
  // Mock data for demonstration (backend implementation pending)
  const mockPortfolio: DomainPortfolio = {
    variants: [
      {
        domain: 'ecopowerhub.com',
        isAvailable: true,
        priceUsd: 12.99,
        registrar: 'GoDaddy',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'ecopowerhub.net',
        isAvailable: true,
        priceUsd: 12.99,
        registrar: 'GoDaddy',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'ecopowerhub.org',
        isAvailable: true,
        priceUsd: 12.99,
        registrar: 'Namecheap',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'ecopowerhub.ai',
        isAvailable: false,
        priceUsd: 0,
        registrar: 'Cloudflare',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'www.ecopowerhub.ai',
        isAvailable: false,
        priceUsd: 0,
        registrar: 'Cloudflare',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'ecopowerhub.io',
        isAvailable: true,
        priceUsd: 39.99,
        registrar: 'Namecheap',
        lastChecked: BigInt(Date.now() * 1000000),
      },
      {
        domain: 'ecopowerhub.co',
        isAvailable: true,
        priceUsd: 24.99,
        registrar: 'GoDaddy',
        lastChecked: BigInt(Date.now() * 1000000),
      },
    ],
    strategy: 'Secure primary TLDs (.com, .net, .org) for brand protection and global recognition. The .ai domain is already registered and operational. Consider .io for tech-focused branding and .co as an alternative.',
    recommendations: 'Priority 1: Register .com, .net, .org immediately for comprehensive brand protection. Priority 2: Consider .io for developer community engagement. Set up redirects from all domains to the primary .ai domain.',
    lastUpdated: BigInt(Date.now() * 1000000),
  };

  const portfolio = mockPortfolio;

  const availableDomains = portfolio.variants.filter(v => v.isAvailable);
  const unavailableDomains = portfolio.variants.filter(v => !v.isAvailable);
  const totalCost = availableDomains.reduce((sum, v) => sum + v.priceUsd, 0);

  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Domain Portfolio Strategy</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Strategic domain variants for EcoPowerHub AI brand protection and global reach expansion.
          </p>
        </div>

        {/* Backend Implementation Notice */}
        <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">
            Domain Portfolio (Preview)
          </AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            This page displays mock data. Backend implementation for domain portfolio management is pending.
          </AlertDescription>
        </Alert>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{portfolio.variants.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {availableDomains.length} available, {unavailableDomains.length} registered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{availableDomains.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for registration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">For all available domains</p>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Portfolio Strategy</CardTitle>
            </div>
            <CardDescription>Recommended approach for domain acquisition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{portfolio.strategy}</p>
            </div>
            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription className="ml-2">
                <strong>Recommendations:</strong> {portfolio.recommendations}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Domain Variants Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Domain Variants</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.variants.map((variant) => (
              <Card key={variant.domain} className={variant.isAvailable ? 'border-emerald-200 dark:border-emerald-900' : 'border-muted'}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold break-all">
                      {variant.domain}
                    </CardTitle>
                    {variant.isAvailable ? (
                      <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="shrink-0">
                        <XCircle className="h-3 w-3 mr-1" />
                        Registered
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price (USD)</span>
                      <span className="text-lg font-bold text-primary">
                        {variant.isAvailable ? `$${variant.priceUsd.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Registrar</span>
                      <span className="text-sm font-medium">{variant.registrar}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Checked</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(Number(variant.lastChecked) / 1000000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {variant.isAvailable && (
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={() => {
                        const registrarUrls: Record<string, string> = {
                          'GoDaddy': `https://www.godaddy.com/domainsearch/find?domainToCheck=${variant.domain}`,
                          'Namecheap': `https://www.namecheap.com/domains/registration/results/?domain=${variant.domain}`,
                        };
                        window.open(registrarUrls[variant.registrar] || `https://www.${variant.registrar.toLowerCase()}.com`, '_blank');
                      }}
                    >
                      Register at {variant.registrar}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Priority Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Recommendations</CardTitle>
            <CardDescription>Domains to register first for maximum brand protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableDomains
                .filter(v => ['.com', '.net', '.org'].some(ext => v.domain.endsWith(ext)))
                .map((variant, index) => (
                  <div key={variant.domain} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        #{index + 1}
                      </Badge>
                      <div>
                        <p className="font-semibold">{variant.domain}</p>
                        <p className="text-sm text-muted-foreground">
                          Essential for global brand recognition
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${variant.priceUsd.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{variant.registrar}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-muted-foreground">
          Last updated: {new Date(Number(portfolio.lastUpdated) / 1000000).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
