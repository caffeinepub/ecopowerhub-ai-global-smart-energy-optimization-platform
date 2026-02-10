import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Wrench, Cpu, ArrowRight } from 'lucide-react';
import { useGetAllManufacturerSupport, useGetAllSupportBoundaries } from '@/hooks/useQueries';
import LoadingErrorBoundary from '@/components/LoadingErrorBoundary';

export default function SupportIntegrationsPage() {
  const { 
    data: manufacturers = [], 
    isLoading: manufacturersLoading,
    isError: manufacturersError,
    error: manufacturersErrorDetails,
    refetch: refetchManufacturers
  } = useGetAllManufacturerSupport();

  const { 
    data: boundaries = [], 
    isLoading: boundariesLoading,
    isError: boundariesError,
    error: boundariesErrorDetails,
    refetch: refetchBoundaries
  } = useGetAllSupportBoundaries();

  const isLoading = manufacturersLoading || boundariesLoading;
  const isError = manufacturersError || boundariesError;
  const error = manufacturersErrorDetails || boundariesErrorDetails;

  const handleRetry = () => {
    refetchManufacturers();
    refetchBoundaries();
  };

  const activeBoundary = boundaries.find(b => b.isActive);
  const activeManufacturers = manufacturers.filter(m => m.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007BFF]/10 text-[#007BFF] text-sm font-medium mb-4">
            <Wrench className="h-4 w-4" />
            Support & Integrations
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Support & Integrations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the help you need for your energy monitoring devices and explore enterprise-grade integration options.
          </p>
        </div>
      </section>

      <LoadingErrorBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={handleRetry}
        loadingMessage="Loading support information..."
        errorMessage="Unable to load support information"
        timeout={15000}
      >
        <div className="container max-w-6xl mx-auto px-4 pb-16 space-y-16">
          {/* Support Boundary Section */}
          {activeBoundary && (
            <section className="space-y-6">
              <Card className="border-2 border-[#007BFF]/20 bg-gradient-to-br from-[#007BFF]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Wrench className="h-6 w-6 text-[#007BFF]" />
                    Our Support Boundary
                  </CardTitle>
                  <CardDescription className="text-base">
                    Understanding what we support and where to get help
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    {activeBoundary.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                        ✓ We Support
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Software integration & setup</li>
                        <li>• Energy analytics & monitoring</li>
                        <li>• Dashboard & reporting features</li>
                        <li>• Protocol integration (Modbus, DNP3, IEC 61850)</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                        → Manufacturer Support
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Hardware troubleshooting</li>
                        <li>• Device warranty claims</li>
                        <li>• Physical installation issues</li>
                        <li>• Firmware updates & repairs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Manufacturer Support Directory */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Manufacturer Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For hardware-related issues, please contact the manufacturer directly using the links below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeManufacturers.map((manufacturer) => (
                <Card key={manufacturer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <img 
                        src={`/assets/generated/${manufacturer.id}-logo-transparent.dim_150x150.png`}
                        alt={`${manufacturer.name} logo`}
                        className="h-12 w-auto object-contain"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <CardTitle className="text-xl">{manufacturer.name}</CardTitle>
                    <CardDescription>{manufacturer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      asChild 
                      className="w-full bg-[#007BFF] hover:bg-[#0056b3]"
                    >
                      <a 
                        href={manufacturer.supportUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Visit Support Page
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Industrial Integration Section */}
          <section className="space-y-6">
            <Card className="border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-emerald-600" />
                  Need Help Integrating Devices?
                </CardTitle>
                <CardDescription className="text-base">
                  Enterprise-grade protocol support for industrial applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">
                  EcoPowerHub AI supports advanced industrial protocols for seamless integration with your existing energy management systems.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h4 className="font-semibold mb-2 text-emerald-600">Modbus RTU/TCP</h4>
                    <p className="text-sm text-muted-foreground">
                      Industry-standard protocol for SCADA and industrial monitoring
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h4 className="font-semibold mb-2 text-emerald-600">DNP3</h4>
                    <p className="text-sm text-muted-foreground">
                      Distributed Network Protocol for utility and grid applications
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h4 className="font-semibold mb-2 text-emerald-600">IEC 61850</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced protocol for substation automation and grid-scale operations
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                  >
                    <a href="/#pricing" className="flex items-center justify-center gap-2">
                      Explore Industrial Tiers
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <a href="/tech-specs" className="flex items-center justify-center gap-2">
                      View Technical Specs
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Compatible with:</strong> Siemens S7, GE Fanuc (Emerson), ABB systems, and more. 
                    Our Industrial Pro and Unlimited tiers provide comprehensive SCADA integration support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Additional Resources */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Additional Resources</h2>
              <p className="text-muted-foreground">
                Explore more documentation and guides
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Diagnostics & Help</CardTitle>
                  <CardDescription>
                    Comprehensive troubleshooting guides and installation documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/diagnostics">View Diagnostics</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                  <CardDescription>
                    Learn optimal setup and maintenance procedures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/best-practices">View Best Practices</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Partner Marketplace</CardTitle>
                  <CardDescription>
                    Discover affiliate programs and partner opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/marketplace">View Marketplace</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </LoadingErrorBoundary>
    </div>
  );
}
