import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Zap, Battery, Sun, TrendingUp } from 'lucide-react';
import { StableImage } from '../StableImage';
import { TrackingIdCopy } from './TrackingIdCopy';
import { GENERATED_ASSETS } from '@/lib/generatedAssetPaths';

interface GeneratorBrand {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  capacity: string;
  output: string;
  solar: string;
  commission: string;
  benefits: string[];
  trackingId: string;
  ctaLabel: string;
  ctaUrl: string;
  productImagePath: string;
  appImagePath: string;
  appFeatures: string[];
  ecopowerhubIntegration: string;
}

const SOLAR_GENERATORS: GeneratorBrand[] = [
  {
    id: 'ecoflow',
    name: 'EcoFlow Delta 2 / Delta 3 Series',
    emoji: '⚡',
    tagline: 'Fast-charging leader with expandable options — ideal for home backup or off-grid use. Powers fridges, tools, and more for days.',
    capacity: '1000-4000Wh+',
    output: '1800-3600W+',
    solar: 'Ultra-fast input',
    commission: '5-10%',
    benefits: [
      'Best overall in 2026 tests for speed, versatility, and app depth',
      'Expandable batteries for whole-home needs',
      'EcoFlow App: Real-time energy flow dashboard (solar input, grid/battery usage, appliance consumption); historical trends (daily/weekly/monthly solar harvest, energy independence rate, money saved estimates); scheduling/automation for cost optimization; multi-device management',
      'High conversions for users seeking smart, data-rich backup'
    ],
    trackingId: 'ECOPOWERHUB_ECOFLOW_001',
    ctaLabel: 'Promote EcoFlow Delta Series',
    ctaUrl: 'https://www.ecoflow.com/pages/affiliate',
    productImagePath: GENERATED_ASSETS.solarGeneratorEcoflowProduct,
    appImagePath: GENERATED_ASSETS.solarGeneratorEcoflowApp,
    appFeatures: ['Real-time energy flow dashboard', 'Historical trends & solar harvest', 'Scheduling/automation'],
    ecopowerhubIntegration: 'Upload app export data or screenshots for AI-driven predictions (e.g., "Based on your solar patterns, prioritize EV charging at 2 PM for max savings"); generative AI coaching on load shifting or hybrid grid/solar strategies'
  },
  {
    id: 'bluetti',
    name: 'Bluetti Elite 200 V2',
    emoji: '🔋',
    tagline: 'Mid-size powerhouse with excellent balance of portability, output, and features. Great for camping, tailgating, or home essentials.',
    capacity: '~2000Wh range (expandable)',
    output: 'High continuous/surge',
    solar: 'Fast & efficient',
    commission: '5-10%',
    benefits: [
      'Top-rated overall in 2026 reviews for real-world performance and quiet operation',
      'Long-life LiFePO4 battery with AI-BMS monitoring',
      'BLUETTI App: Real-time tracking of energy usage, solar generation, storage levels; detailed reports on patterns over time; remote control and scheduling; firmware updates',
      'Strong brand loyalty and repeat purchases'
    ],
    trackingId: 'ECOPOWERHUB_BLUETTI_001',
    ctaLabel: 'Promote Bluetti Elite 200 V2',
    ctaUrl: 'https://www.bluettipower.com/pages/affiliate-program',
    productImagePath: GENERATED_ASSETS.solarGeneratorBluettiProduct,
    appImagePath: GENERATED_ASSETS.solarGeneratorBluettiApp,
    appFeatures: ['Real-time usage tracking', 'Solar generation reports', 'Remote control & scheduling'],
    ecopowerhubIntegration: 'Import Bluetti app data for predictive analytics; AI suggests optimal charge/discharge cycles based on weather forecasts and usage patterns'
  },
  {
    id: 'jackery',
    name: 'Jackery Explorer 2000 Plus',
    emoji: '☀️',
    tagline: 'Trusted brand with excellent customer support and warranty. Perfect for RV life, outdoor adventures, and emergency preparedness.',
    capacity: '2000Wh+ (expandable)',
    output: 'Reliable & consistent',
    solar: 'Optimized panels',
    commission: '5-8%',
    benefits: [
      'Industry-leading 5-year warranty and customer service',
      'Jackery App: Monitor battery status, solar input, and output in real-time; view historical data and trends; control charging modes; receive alerts for low battery or system issues',
      'High brand recognition and trust in outdoor/RV communities',
      'Excellent conversion rates for camping and emergency prep audiences'
    ],
    trackingId: 'ECOPOWERHUB_JACKERY_001',
    ctaLabel: 'Promote Jackery Explorer Series',
    ctaUrl: 'https://www.jackery.com/pages/affiliate-program',
    productImagePath: GENERATED_ASSETS.solarGeneratorJackeryProduct,
    appImagePath: GENERATED_ASSETS.solarGeneratorJackeryApp,
    appFeatures: ['Real-time monitoring', 'Historical data & trends', 'Charging mode control'],
    ecopowerhubIntegration: 'Sync Jackery app data for trip planning (e.g., "Your 3-day camping trip needs 4.5kWh; charge to 90% before departure"); AI-powered load recommendations'
  },
  {
    id: 'anker',
    name: 'Anker SOLIX F3800',
    emoji: '🌟',
    tagline: 'Premium build quality with cutting-edge tech. Ideal for tech enthusiasts who want the latest features and seamless smart home integration.',
    capacity: '3840Wh (expandable to 26.9kWh)',
    output: '6000W continuous',
    solar: 'Advanced MPPT',
    commission: '5-10%',
    benefits: [
      'Newest entrant with aggressive pricing and innovation',
      'Anker App: Comprehensive energy dashboard with real-time solar/grid/battery flow; AI-powered energy optimization suggestions; smart home integration (Alexa, Google Home); detailed analytics and cost savings reports',
      'Strong brand reputation from consumer electronics',
      'Appeals to tech-savvy buyers seeking smart home integration'
    ],
    trackingId: 'ECOPOWERHUB_ANKER_001',
    ctaLabel: 'Promote Anker SOLIX Series',
    ctaUrl: 'https://www.anker.com/pages/affiliate',
    productImagePath: GENERATED_ASSETS.solarGeneratorAnkerProduct,
    appImagePath: GENERATED_ASSETS.solarGeneratorAnkerApp,
    appFeatures: ['AI-powered optimization', 'Smart home integration', 'Cost savings analytics'],
    ecopowerhubIntegration: 'Deep integration with EcoPowerHub AI for whole-home energy orchestration; combine Anker data with utility rates, weather, and EV charging for maximum savings'
  }
];

export function SolarGeneratorAffiliateSection() {
  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sun className="h-8 w-8 text-yellow-500" />
          Solar Generator Affiliate Programs
          <Battery className="h-8 w-8 text-green-500" />
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Promote portable power stations with solar charging — perfect for backup power, off-grid living, RV life, and emergency preparedness. All brands offer companion apps with energy monitoring that integrates beautifully with EcoPowerHub AI.
        </p>
        
        {/* FTC Disclosure */}
        <Alert className="text-left">
          <AlertDescription className="text-sm">
            <strong>FTC Disclosure:</strong> The links below are affiliate links. If you purchase through these links, EcoPowerHub AI may earn a commission at no extra cost to you. We only recommend products we believe provide genuine value to our users.
          </AlertDescription>
        </Alert>
      </div>

      {/* Generator Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {SOLAR_GENERATORS.map((generator) => (
          <Card key={generator.id} className="overflow-hidden hover:shadow-xl transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{generator.emoji}</div>
                <Badge variant="secondary" className="text-xs">
                  {generator.commission} commission
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2">{generator.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {generator.tagline}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Product & App Images */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Product</p>
                  <StableImage
                    src={generator.productImagePath}
                    alt={`${generator.name} product`}
                    className="w-full h-32 object-cover rounded-lg border"
                    fallbackSrc={GENERATED_ASSETS.solarGeneratorEcoflowProduct}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">App Dashboard</p>
                  <StableImage
                    src={generator.appImagePath}
                    alt={`${generator.name} app`}
                    className="w-full h-32 object-cover rounded-lg border"
                    fallbackSrc={GENERATED_ASSETS.solarGeneratorEcoflowApp}
                  />
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Capacity</p>
                  <p className="font-semibold">{generator.capacity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Output</p>
                  <p className="font-semibold">{generator.output}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Solar</p>
                  <p className="font-semibold">{generator.solar}</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Why Promote This
                </h4>
                <ul className="space-y-1 text-xs">
                  {generator.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600 shrink-0">✓</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* App Features */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  App Features
                </h4>
                <ul className="space-y-1 text-xs">
                  {generator.appFeatures.map((feature, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* EcoPowerHub AI Integration */}
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
                  🤖 EcoPowerHub AI Integration
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {generator.ecopowerhubIntegration}
                </p>
              </div>

              {/* Tracking ID */}
              <TrackingIdCopy trackingId={generator.trackingId} />

              {/* CTA Button */}
              <Button className="w-full" size="lg" asChild>
                <a href={generator.ctaUrl} target="_blank" rel="noopener noreferrer">
                  {generator.ctaLabel}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Amazon Associates Card */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <span>📦</span>
            Amazon Associates — All Solar Generators
          </CardTitle>
          <CardDescription>
            Can't decide? Promote all brands through Amazon Associates and let customers choose their favorite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>All major brands available (EcoFlow, Bluetti, Jackery, Anker, Goal Zero, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Trusted checkout experience increases conversions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Prime shipping benefits for customers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy link generation and tracking</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Commission Rate</p>
                <p className="text-xl font-bold text-green-600">3-10%</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Cookie Duration</p>
                <p className="text-xl font-bold text-blue-600">24 hours</p>
              </div>
            </div>
          </div>

          <TrackingIdCopy trackingId="ecopowerhub-20" />

          <Button className="w-full" size="lg" asChild>
            <a href="https://affiliate-program.amazon.com/" target="_blank" rel="noopener noreferrer">
              Join Amazon Associates
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Getting Started with Solar Generator Affiliates</CardTitle>
          <CardDescription>
            Quick guide to start earning commissions promoting portable power stations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Choose Your Brands</h3>
              <p className="text-sm text-muted-foreground">
                Sign up for affiliate programs that match your audience. Start with 1-2 brands or use Amazon for all.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Create Content</h3>
              <p className="text-sm text-muted-foreground">
                Write reviews, comparison guides, or how-to articles. Focus on real-world use cases and app integration.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Track & Optimize</h3>
              <p className="text-sm text-muted-foreground">
                Monitor which brands convert best for your audience. Double down on winners and test new approaches.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Keywords (hidden but indexed) */}
      <div className="sr-only">
        solar generator affiliate program, portable power station affiliate, EcoFlow affiliate, Bluetti affiliate, 
        Jackery affiliate, Anker SOLIX affiliate, solar backup power, off-grid power solutions, emergency power 
        backup, RV solar power, camping power station, home battery backup, solar energy storage, portable solar 
        generator, best solar generators 2026, solar generator reviews, solar generator comparison
      </div>
    </section>
  );
}
