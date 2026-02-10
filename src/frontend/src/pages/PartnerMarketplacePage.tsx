import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { GENERATED_ASSETS } from '../lib/generatedAssetPaths';

interface AffiliateProgram {
  id: string;
  name: string;
  logoPath: string;
  description: string;
  commissionRate: string;
  cookieDuration: string;
  benefits: string[];
  signupUrl: string;
  trackingId: string;
  category: 'energy-monitor' | 'marketplace' | 'network';
}

const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  {
    id: 'sense',
    name: 'Sense Energy Monitor',
    logoPath: '/generated/sense-logo-transparent.dim_150x150.png',
    description: 'AI-powered whole-home energy monitor with real-time device detection',
    commissionRate: '8-12%',
    cookieDuration: '30 days',
    benefits: [
      'High conversion rate on energy-conscious audience',
      'Recurring commission on subscription upgrades',
      'Exclusive partner pricing for your users',
      'Co-marketing opportunities'
    ],
    signupUrl: 'https://sense.com/affiliates',
    trackingId: 'ECOPOWERHUB_SENSE_001',
    category: 'energy-monitor'
  },
  {
    id: 'emporia',
    name: 'Emporia Energy',
    logoPath: '/generated/emporia-logo-transparent.dim_150x150.png',
    description: 'Affordable whole-home energy monitoring with circuit-level insights',
    commissionRate: '10%',
    cookieDuration: '45 days',
    benefits: [
      'Budget-friendly option for wider audience reach',
      'Strong brand recognition in energy monitoring',
      'Excellent customer support reputation',
      'Multiple product tiers for upselling'
    ],
    signupUrl: 'https://emporiaenergy.com/pages/affiliate-program',
    trackingId: 'ECOPOWERHUB_EMPORIA_001',
    category: 'energy-monitor'
  },
  {
    id: 'amazon-associates',
    name: 'Amazon Associates',
    logoPath: '/generated/sense-logo-transparent.dim_150x150.png',
    description: 'Earn commissions on smart plugs, energy monitors, and home automation devices',
    commissionRate: '3-10%',
    cookieDuration: '24 hours',
    benefits: [
      'Massive product catalog for all energy devices',
      'Trusted checkout experience increases conversions',
      'Prime shipping benefits for customers',
      'Easy link generation and tracking'
    ],
    signupUrl: 'https://affiliate-program.amazon.com/',
    trackingId: 'ecopowerhub-20',
    category: 'marketplace'
  },
  {
    id: 'shareasale',
    name: 'ShareASale Network',
    logoPath: '/generated/sense-logo-transparent.dim_150x150.png',
    description: 'Access 100+ energy, solar, and smart home brands through one network',
    commissionRate: '5-20%',
    cookieDuration: 'Varies by merchant',
    benefits: [
      'Single dashboard for multiple affiliate programs',
      'Brands include Shelly, Tuya, and more',
      'Reliable tracking and timely payments',
      'Dedicated affiliate support team'
    ],
    signupUrl: 'https://www.shareasale.com/info/',
    trackingId: 'ECOPOWERHUB_SAS_001',
    category: 'network'
  },
  {
    id: 'cj-affiliate',
    name: 'CJ Affiliate (Commission Junction)',
    logoPath: '/generated/sense-logo-transparent.dim_150x150.png',
    description: 'Premium affiliate network with top solar and energy efficiency brands',
    commissionRate: '5-25%',
    cookieDuration: 'Varies by merchant',
    benefits: [
      'Access to premium solar brands (SolarEdge, Enphase)',
      'Advanced reporting and analytics',
      'Deep linking tools for better conversions',
      'Global reach for international audience'
    ],
    signupUrl: 'https://www.cj.com/advertiser-signup',
    trackingId: 'ECOPOWERHUB_CJ_001',
    category: 'network'
  }
];

export default function PartnerMarketplacePage() {
  const getCategoryBadgeColor = (category: AffiliateProgram['category']) => {
    switch (category) {
      case 'energy-monitor':
        return 'bg-blue-500';
      case 'marketplace':
        return 'bg-purple-500';
      case 'network':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

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
        {/* Affiliate Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {AFFILIATE_PROGRAMS.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={program.logoPath}
                    alt={`${program.name} logo`}
                    className="w-20 h-20 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/generated/sense-logo-transparent.dim_150x150.png';
                    }}
                  />
                  <Badge className={getCategoryBadgeColor(program.category)}>
                    {program.category.replace('-', ' ')}
                  </Badge>
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
                    <p className="text-xl font-bold text-green-600">{program.commissionRate}</p>
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
                  <a href={program.signupUrl} target="_blank" rel="noopener noreferrer">
                    Join {program.name} Program
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
                    <span>Focus on products that match your audience needs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg">Don'ts ✗</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Hide affiliate links or relationships</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Make false claims about products</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Spam users with excessive promotions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Recommend products solely for high commissions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Violate program terms and conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
