import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, FileText, Zap, Globe, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { useState } from 'react';
import SmartDiagnosticsPanel from '../components/diagnostics/SmartDiagnosticsPanel';

const CONTINENTAL_SYSTEMS = [
  {
    id: 'north-america',
    name: 'North America',
    voltage: '120V / 240V',
    frequency: '60Hz',
    plugTypes: ['Type A', 'Type B'],
    description: 'Split-phase electrical system with 120V for standard outlets and 240V for heavy appliances',
  },
  {
    id: 'europe',
    name: 'Europe',
    voltage: '230V',
    frequency: '50Hz',
    plugTypes: ['Type C', 'Type E', 'Type F'],
    description: 'Single-phase 230V system standard across most European countries',
  },
  {
    id: 'asia-china',
    name: 'Asia (including China)',
    voltage: '220V / 230V',
    frequency: '50Hz',
    plugTypes: ['Type A', 'Type C', 'Type I'],
    description: 'Varies by country; China uses 220V with Type A/C/I plugs',
  },
  {
    id: 'south-america',
    name: 'South America',
    voltage: '110V / 220V',
    frequency: '50Hz / 60Hz',
    plugTypes: ['Type A', 'Type C', 'Type I'],
    description: 'Mixed voltage standards; Brazil uses 127V/220V, Argentina 220V',
  },
  {
    id: 'australia-nz',
    name: 'Australia / New Zealand',
    voltage: '230V',
    frequency: '50Hz',
    plugTypes: ['Type I'],
    description: 'Standard 230V single-phase system with Type I plugs',
  },
  {
    id: 'russia-cis',
    name: 'Russia / CIS',
    voltage: '220V',
    frequency: '50Hz',
    plugTypes: ['Type C', 'Type F'],
    description: '220V system standard across Russia and CIS countries',
  },
  {
    id: 'africa',
    name: 'Africa',
    voltage: '220V / 230V',
    frequency: '50Hz',
    plugTypes: ['Type C', 'Type D', 'Type G', 'Type M'],
    description: 'Varies by country; most use 220-230V with diverse plug types',
  },
];

const DOCUMENTATION_LINKS = [
  {
    title: 'Emporia Vue 220V Installation Guide',
    url: '/assets/IMG_2482.png',
    category: 'Installation',
    region: 'Global',
  },
  {
    title: 'CT Configuration Manual',
    url: '/assets/IMG_2483.png',
    category: 'Configuration',
    region: 'Global',
  },
  {
    title: 'Polarity Check Procedure',
    url: '/assets/IMG_2484.png',
    category: 'Troubleshooting',
    region: 'Global',
  },
  {
    title: 'Voltage Dip Analysis Guide',
    url: '/assets/IMG_2486.jpeg',
    category: 'Troubleshooting',
    region: 'Global',
  },
  {
    title: 'Installation Verification Protocol',
    url: '/assets/IMG_2487.jpeg',
    category: 'Verification',
    region: 'Global',
  },
  {
    title: 'Regional Setup Guide',
    url: '/assets/IMG_2488.png',
    category: 'Installation',
    region: 'Global',
  },
];

export default function DiagnosticsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredSystems = CONTINENTAL_SYSTEMS.filter(system =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.voltage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.plugTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDocs = DOCUMENTATION_LINKS.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#007BFF] via-[#00BCD4] to-[#4CAF50] py-20">
        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Diagnostics & Help Center
            </h1>
            <p className="text-xl md:text-2xl text-white/95">
              Comprehensive global electrical system documentation and troubleshooting guides
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documentation, voltage standards, plug types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white dark:bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Diagnostics Panel */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <SmartDiagnosticsPanel />
        </div>
      </section>

      {/* Continental Systems Overview */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Global Electrical Systems
            </h2>
            <p className="text-xl text-muted-foreground">
              Voltage standards and specifications by continental region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSystems.map((system) => (
              <Card 
                key={system.id} 
                className="border-2 hover:border-[#007BFF] transition-all cursor-pointer"
                onClick={() => setSelectedRegion(system.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Globe className="h-8 w-8 text-[#007BFF]" />
                    <Badge variant="outline">{system.frequency}</Badge>
                  </div>
                  <CardTitle className="text-2xl text-[#007BFF]">{system.name}</CardTitle>
                  <CardDescription className="text-base">{system.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#4CAF50]" />
                    <span className="font-semibold">Voltage:</span>
                    <span>{system.voltage}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">Plug Types:</span>
                    {system.plugTypes.map((type) => (
                      <Badge key={type} variant="secondary">{type}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation & Troubleshooting Guides */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Installation & Troubleshooting
            </h2>
            <p className="text-xl text-muted-foreground">
              Step-by-step guides and diagnostic procedures
            </p>
          </div>

          <Tabs defaultValue="installation" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>

            <TabsContent value="installation" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Installation Procedures</CardTitle>
                  <CardDescription>Region-specific installation steps and verification protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="step1">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          Step 1: Verify Voltage Compatibility
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>Before installation, verify that your device is compatible with your region's voltage system:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Check device specifications for voltage range (e.g., 110-240V)</li>
                          <li>Confirm frequency compatibility (50Hz or 60Hz)</li>
                          <li>Verify plug type matches your region's standard</li>
                          <li>Consult the continental systems guide above for your region</li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              <strong>Safety Warning:</strong> Always consult a licensed electrician for installation. Incorrect voltage can damage equipment or cause safety hazards.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step2">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          Step 2: CT Clamp Installation
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>Current Transformer (CT) clamps must be installed correctly for accurate readings:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Identify main power lines in your electrical panel</li>
                          <li>Open CT clamp and position around single conductor wire</li>
                          <li>Ensure arrow on clamp points toward load (away from utility meter)</li>
                          <li>Close clamp firmly until it clicks</li>
                          <li>Verify polarity using the polarity check procedure</li>
                        </ul>
                        <img 
                          src="/assets/generated/installation-verification-flowchart.dim_700x900.png" 
                          alt="CT Installation Flowchart" 
                          className="w-full max-w-md mx-auto rounded-lg border mt-4"
                        />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step3">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          Step 3: Device Connection & WiFi Setup
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>Connect your device to power and configure WiFi connectivity:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Connect device to appropriate voltage source</li>
                          <li>Power on device and wait for initialization (LED indicators)</li>
                          <li>Use manufacturer's app to configure WiFi (2.4GHz band required)</li>
                          <li>Enter WiFi credentials and complete pairing process</li>
                          <li>Verify device appears online in app dashboard</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step4">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          Step 4: Verification & Testing
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>Verify installation is working correctly:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Check real-time power readings in app</li>
                          <li>Turn on/off major appliances and verify detection</li>
                          <li>Confirm voltage readings match expected values</li>
                          <li>Run polarity check to ensure correct CT orientation</li>
                          <li>Monitor for 24 hours to establish baseline</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">CT Configuration</CardTitle>
                  <CardDescription>Current transformer setup and calibration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2 text-[#007BFF]">Understanding CT Polarity</h3>
                    <p className="text-base mb-3">
                      CT polarity determines the direction of current measurement. Incorrect polarity results in negative power readings.
                    </p>
                    <img 
                      src="/assets/generated/polarity-check-diagram.dim_600x400.png" 
                      alt="Polarity Check Diagram" 
                      className="w-full max-w-lg mx-auto rounded-lg border"
                    />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="polarity">
                      <AccordionTrigger className="text-lg">Polarity Check Procedure</AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Turn on a known high-power appliance (e.g., electric kettle, space heater)</li>
                          <li>Check power reading in app - should show positive value</li>
                          <li>If reading is negative, reverse CT clamp orientation</li>
                          <li>Retest with appliance on - reading should now be positive</li>
                          <li>Repeat for all CT clamps in multi-circuit installations</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="calibration">
                      <AccordionTrigger className="text-lg">Calibration Recommendations</AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>For optimal accuracy, calibrate your device:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Compare readings with utility meter over 24-hour period</li>
                          <li>Adjust calibration factor in app if readings differ by more than 5%</li>
                          <li>Recalibrate after any CT repositioning or electrical panel changes</li>
                          <li>Schedule annual calibration checks for long-term accuracy</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="multi-phase">
                      <AccordionTrigger className="text-lg">Multi-Phase Configuration</AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p>For split-phase or three-phase systems:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Install CT clamps on all hot legs (L1, L2, and L3 if applicable)</li>
                          <li>Verify voltage reference matches your region's system</li>
                          <li>Configure device for correct phase count in settings</li>
                          <li>Test each phase independently for proper operation</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Troubleshooting Guide</CardTitle>
                  <CardDescription>Common issues and systematic diagnostic procedures</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="no-readings">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          No Power Readings
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p className="font-semibold">Systematic verification steps:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Verify device has power (check LED indicators)</li>
                          <li>Confirm WiFi connectivity (device online in app)</li>
                          <li>Check CT clamps are fully closed and positioned correctly</li>
                          <li>Verify CT cables are securely connected to device</li>
                          <li>Test with high-power appliance to generate measurable load</li>
                          <li>Check for firmware updates in device settings</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="negative-readings">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          Negative Power Readings
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p className="font-semibold">Polarity issue - follow these steps:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Identify which CT clamp shows negative readings</li>
                          <li>Power off the circuit breaker for safety</li>
                          <li>Open CT clamp and reverse orientation (flip 180°)</li>
                          <li>Ensure arrow points toward load (away from utility meter)</li>
                          <li>Close clamp firmly and restore power</li>
                          <li>Verify readings are now positive with appliance running</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="inaccurate-readings">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          Inaccurate Readings
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p className="font-semibold">Calibration and positioning checks:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Compare device readings with utility meter over 24 hours</li>
                          <li>Ensure CT clamps are on main power lines (not sub-circuits)</li>
                          <li>Verify CT clamps are around single conductor (not bundled cables)</li>
                          <li>Check for loose connections or damaged CT cables</li>
                          <li>Adjust calibration factor in app settings if needed</li>
                          <li>Consider electromagnetic interference from nearby equipment</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="connectivity">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                          WiFi Connectivity Issues
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p className="font-semibold">Network troubleshooting:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Verify router is broadcasting 2.4GHz WiFi (5GHz not supported by most devices)</li>
                          <li>Check WiFi password is correct (case-sensitive)</li>
                          <li>Ensure device is within range of router (signal strength)</li>
                          <li>Restart router and device to refresh connection</li>
                          <li>Check for router firewall blocking device communication</li>
                          <li>Try factory reset and reconfigure device if persistent</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="voltage-dips">
                      <AccordionTrigger className="text-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-purple-500" />
                          Voltage Dips & Fluctuations
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base space-y-3">
                        <p className="font-semibold">Analyzing voltage stability:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Monitor voltage readings over time to identify patterns</li>
                          <li>Voltage dips when appliances start are normal (inrush current)</li>
                          <li>Persistent low voltage may indicate utility supply issues</li>
                          <li>Contact utility provider if voltage consistently outside ±5% of nominal</li>
                          <li>Consider voltage stabilizer for sensitive equipment</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Documentation Library */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Documentation Library
            </h2>
            <p className="text-xl text-muted-foreground">
              Downloadable manuals, guides, and reference materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredDocs.map((doc, index) => (
              <Card key={index} className="border-2 hover:border-[#4CAF50] transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="h-8 w-8 text-[#007BFF]" />
                    <Badge variant="secondary">{doc.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription>Region: {doc.region}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      View Document
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-gradient-to-br from-[#007BFF] to-[#00BCD4]">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Need More Help?
            </h2>
            <p className="text-xl text-white/95">
              Our support team is here to assist with your installation and troubleshooting needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="mailto:support@ecopowerhub.ai">
                  Contact Support
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
                <a href="/">
                  Back to Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
