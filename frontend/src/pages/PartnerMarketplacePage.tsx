import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { GENERATED_ASSETS } from '../lib/generatedAssetPaths';
import { StableImage } from '../components/StableImage';
import { SolarGeneratorAffiliateSection } from '../components/affiliate/SolarGeneratorAffiliateSection';

interface AffiliateProgram {
  id: string;
  name: string;
  url: string;
  description: string;
  image: string;
  commission: string;
  cookieDuration: string;
  benefits: string[];
  trackingId: string;
}

const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  {
    id: 'sense',
    name: 'Sense Affiliate Program',
    url: 'https://sense.com/affiliates',
    description: 'Earn commissions promoting Sense home energy monitors with real-time tracking and device detection.',
    image: GENERATED_ASSETS.senseAffiliateCard,
    commission: 'Up to 10%',
    cookieDuration: '30 days',
    benefits: ['High conversion rates', 'Marketing materials provided', 'Dedicated support'],
    trackingId: 'ecopowerhub-sense-001',
  },
  {
    id: 'emporia',
    name: 'Emporia Vue Program',
    url: 'https://emporiaenergy.com/pages/become-affiliate',
    description: 'Partner with Emporia to promote Vue energy monitors compatible with 220V systems worldwide.',
    image: GENERATED_ASSETS.emporiaAffiliateCard,
    commission: '8-12%',
    cookieDuration: '45 days',
    benefits: ['Global compatibility', 'Recurring commissions', 'Exclusive promotions'],
    trackingId: 'ecopowerhub-emporia-001',
  },
  {
    id: 'amazon-associates',
    name: 'Amazon Associates',
    url: 'https://affiliate-program.amazon.com/',
    description: 'Earn commissions on smart plugs, energy monitors, and home automation devices',
    image: GENERATED_ASSETS.amazonAssociatesCard,
    commission: '3-10%',
    cookieDuration: '24 hours',
    benefits: [
      'Massive product catalog for all energy devices',
      'Trusted checkout experience increases conversions',
      'Prime shipping benefits for customers',
      'Easy link generation and tracking'
    ],
    trackingId: 'ecopowerhub-20',
  },
  {
    id: 'shareasale',
    name: 'ShareASale Network',
    url: 'https://www.shareasale.com/info/',
    description: 'Access 100+ energy, solar, and smart home brands through one network',
    image: GENERATED_ASSETS.shareasaleCard,
    commission: '5-20%',
    cookieDuration: 'Varies by merchant',
    benefits: [
      'Single dashboard for multiple affiliate programs',
      'Brands include Shelly, Tuya, and more',
      'Reliable tracking and timely payments',
      'Dedicated affiliate support team'
    ],
    trackingId: 'ECOPOWERHUB_SAS_001',
  },
  {
    id: 'cj-affiliate',
    name: 'CJ Affiliate (Commission Junction)',
    url: 'https://www.cj.com/advertiser-signup',
    description: 'Premium affiliate network with top solar and energy efficiency brands',
    image: GENERATED_ASSETS.cjAffiliateCard,
    commission: '5-25%',
    cookieDuration: 'Varies by merchant',
    benefits: [
      'Access to premium solar brands (SolarEdge, Enphase)',
      'Advanced reporting and analytics',
      'Deep linking tools for better conversions',
      'Global reach for international audience'
    ],
    trackingId: 'ECOPOWERHUB_CJ_001',
  }
];

export default function PartnerMarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-primary mb-3">Partner Marketplace</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Monetize your energy optimization expertise through our curated affiliate partnerships
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Earn up to 25% commission</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>High-converting offers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Trusted brands</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Solar Generator Section - NEW */}
        <SolarGeneratorAffiliateSection />

        {/* Divider */}
        <div className="my-16 border-t" />

        {/* Original Affiliate Programs Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Energy Monitoring & Network Partners</h2>
          <p className="text-muted-foreground mb-8">
            Additional affiliate opportunities for energy monitors and affiliate networks
          </p>
        </div>

        {/* Affiliate Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {AFFILIATE_PROGRAMS.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">
                  <StableImage
                    src={program.image}
                    alt={`${program.name} card`}
                    className="w-full h-40 object-cover rounded-lg"
                    fallbackSrc={GENERATED_ASSETS.senseAffiliateCard}
                  />
                </div>
                <CardTitle className="text-2xl mb-2">{program.name}</CardTitle>
                <CardDescription className="text-base">
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Commission Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Commission Rate</p>
                    <p className="text-xl font-bold text-green-600">{program.commission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cookie Duration</p>
                    <p className="text-xl font-bold text-blue-600">{program.cookieDuration}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Partner Benefits
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tracking ID */}
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Your Tracking ID</p>
                  <code className="text-sm font-mono">{program.trackingId}</code>
                </div>

                {/* Sign Up Button */}
                <Button className="w-full" size="lg" asChild>
                  <a href={program.url} target="_blank" rel="noopener noreferrer">
                    Join {program.name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <Card className="border-2 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How Affiliate Marketing Works</CardTitle>
            <CardDescription>
              Simple steps to start earning commissions through EcoPowerHub AI partnerships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  Join affiliate programs that match your audience
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Get Links</h3>
                <p className="text-sm text-muted-foreground">
                  Receive unique tracking links for products
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Share</h3>
                <p className="text-sm text-muted-foreground">
                  Recommend products to your users
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  4
                </div>
                <h3 className="font-semibold mb-2">Earn</h3>
                <p className="text-sm text-muted-foreground">
                  Get paid for every sale you generate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Affiliate Marketing Best Practices</CardTitle>
            <CardDescription>
              Maximize your earnings with these proven strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Do's ✓</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Disclose affiliate relationships transparently</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Only recommend products you've tested or researched</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Provide genuine value and honest reviews</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Track performance and optimize your strategy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Build trust with your audience first</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg">Don'ts ✗</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Spam affiliate links without context</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Recommend products solely for commission</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Hide affiliate relationships from users</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Make false claims about product benefits</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Ignore program terms and conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} EcoPowerHub AI. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'ecopowerhub.ai'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
