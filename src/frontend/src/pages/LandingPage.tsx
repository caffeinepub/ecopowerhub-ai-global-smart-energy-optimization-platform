import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import MarketingHeader from '../components/MarketingHeader';
import MarketingFooter from '../components/MarketingFooter';
import { GENERATED_ASSETS } from '../lib/generatedAssetPaths';

export default function LandingPage() {
  return (
    <>
      <MarketingHeader />
      
      <main className="flex flex-col">
        {/* Hero Section - Full-Screen Globe Background */}
        <section 
          className="h-screen w-full relative flex flex-col justify-center items-center text-center text-white bg-blue-900 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${GENERATED_ASSETS.heroBackgroundGlobe})`
          }}
        >
          {/* Semi-transparent Dark Blue Overlay for Text Readability */}
          <div className="absolute inset-0 bg-blue-900/60 z-10" />
          
          {/* Hero Content - Layered Above Overlay */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 space-y-8">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight drop-shadow-2xl">
              EcoPowerHub AI
            </h1>
            
            {/* Subtitle with Pulse Animation */}
            <p className="text-3xl md:text-5xl font-semibold leading-relaxed drop-shadow-2xl animate-pulse">
              Global Smart Energy Optimization Platform on the Blockchain
            </p>
            
            {/* Supporting Text */}
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-lg max-w-4xl mx-auto pt-4">
              Connect your smart plugs, get voice‑guided coaching in your language – save on bills worldwide.
            </p>
            
            {/* Large Green CTA Button */}
            <div className="pt-8">
              <Button 
                size="lg" 
                className="text-2xl px-16 py-8 bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-2xl rounded-full font-bold relative z-30"
                asChild
              >
                <a href="/login">
                  Start Your Free Energy Audit
                  <ArrowRight className="ml-3 h-8 w-8" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Device Setup Guides Section */}
        <section className="py-20 md:py-32 bg-white dark:bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#007BFF]">
                Device Setup Guides
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Step-by-step visual guides for installing energy monitors in your region
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-2 border-[#4CAF50]/30 hover:border-[#4CAF50] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Emporia Vue</CardTitle>
                  <CardDescription className="text-base">
                    Complete installation guide for 220V regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]" asChild>
                    <a href="/integration-guides">View Guide</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#007BFF]/30 hover:border-[#007BFF] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Sense Monitor</CardTitle>
                  <CardDescription className="text-base">
                    Real-time energy tracking setup
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3]" asChild>
                    <a href="/integration-guides">View Guide</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00BCD4]/30 hover:border-[#00BCD4] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Smart Plugs</CardTitle>
                  <CardDescription className="text-base">
                    Compatible with Nest, Tuya, Shelly & more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1]" asChild>
                    <a href="/integration-guides">View Guide</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Troubleshooting Hub Section */}
        <section className="py-20 md:py-32 bg-[#F5F5F5] dark:bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#007BFF]">
                Troubleshooting Hub
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered assistance for connectivity and voltage questions in your region
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-4 border-[#007BFF] shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl text-[#007BFF]">AI Chatbot Assistant</CardTitle>
                  <CardDescription className="text-lg">
                    Get instant help with device setup, connectivity issues, and voltage compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#007BFF]">Voice-Guided Support</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Region-neutral troubleshooting</li>
                        <li>• Brand-specific guidance</li>
                        <li>• Multilingual support</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#007BFF]">Common Issues</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• WiFi connectivity problems</li>
                        <li>• Voltage compatibility checks</li>
                        <li>• Device pairing assistance</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-lg py-6" asChild>
                    <a href="/diagnostics">Launch Troubleshooting Assistant</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 md:py-32 bg-white dark:bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#007BFF]">
                Real-World Energy Savings
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Proven results from residential, commercial, and industrial implementations worldwide
              </p>
            </div>

            {/* Savings Overview */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-4 border-[#4CAF50] shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-[#007BFF] mb-4">Average Energy Savings</CardTitle>
                  <div className="flex items-center justify-center gap-8 flex-wrap">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-[#4CAF50]">7-34%</p>
                      <p className="text-lg text-muted-foreground mt-2">Energy Reduction</p>
                    </div>
                    <div className="text-center">
                      <p className="text-6xl font-bold text-[#007BFF]">$200+</p>
                      <p className="text-lg text-muted-foreground mt-2">Annual Savings</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Case Study Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-2 border-[#4CAF50]/30 hover:border-[#4CAF50] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Residential</CardTitle>
                  <CardDescription className="text-base">
                    3-bedroom home with smart HVAC
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Energy Reduction:</span>
                      <span className="text-2xl font-bold text-[#4CAF50]">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Annual Savings:</span>
                      <span className="text-xl font-bold text-[#007BFF]">$264</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#007BFF]/30 hover:border-[#007BFF] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Commercial</CardTitle>
                  <CardDescription className="text-base">
                    5,000 sq ft office building
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Energy Reduction:</span>
                      <span className="text-2xl font-bold text-[#4CAF50]">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Annual Savings:</span>
                      <span className="text-xl font-bold text-[#007BFF]">$3,200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00BCD4]/30 hover:border-[#00BCD4] transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Industrial</CardTitle>
                  <CardDescription className="text-base">
                    Manufacturing plant with heavy machinery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Energy Reduction:</span>
                      <span className="text-2xl font-bold text-[#4CAF50]">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Annual Savings:</span>
                      <span className="text-xl font-bold text-[#007BFF]">$28,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section id="pricing" className="py-20 md:py-32 bg-[#F5F5F5] dark:bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#007BFF]">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that fits your needs – from home to industrial scale
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Essentials Tier */}
              <Card className="border-2 border-[#4CAF50]/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Essentials</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-[#4CAF50]">Free</span>
                  </div>
                  <CardDescription className="mt-4 text-base">
                    Dashboard access, 14-day tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]" asChild>
                    <a href="/login">Get Started</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Tier */}
              <Card className="border-2 border-[#007BFF] shadow-xl scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-[#4CAF50]">$14.99</span>
                    <span className="text-muted-foreground text-xl">/month</span>
                  </div>
                  <CardDescription className="mt-4 text-base">
                    Adds forecasting, carbon analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3]" asChild>
                    <a href="/login">Get Pro</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Unlimited Tier */}
              <Card className="border-2 border-[#00BCD4]/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Unlimited</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-[#00BCD4]">$49.99</span>
                    <span className="text-muted-foreground text-xl">/month</span>
                  </div>
                  <CardDescription className="mt-4 text-base">
                    Full AI integration, permanent tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1]" asChild>
                    <a href="/login">Get Unlimited</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
