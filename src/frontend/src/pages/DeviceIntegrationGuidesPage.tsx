import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Shield, 
  Gift, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Wrench
} from 'lucide-react';
import { GENERATED_ASSETS } from '../lib/generatedAssetPaths';
import { StableImage } from '../components/StableImage';

interface DeviceGuide {
  id: string;
  name: string;
  category: 'energy-monitor' | 'solar' | 'battery' | 'smart-home' | 'utility';
  logoPath: string;
  description: string;
  setupSteps: string[];
  imagePath: string;
  quickConnectRoute: string;
  privacyNotes: string[];
  troubleshooting: { issue: string; solution: string }[];
  ecoTokenBenefits: string[];
  compatibility: string[];
}

const DEVICE_GUIDES: DeviceGuide[] = [
  {
    id: 'emporia-vue-gen2',
    name: 'Emporia Vue Gen 2',
    category: 'energy-monitor',
    logoPath: GENERATED_ASSETS.emporiaLogo,
    description: 'Whole-home energy monitoring with 8 or 16 circuit-level sensors',
    setupSteps: [
      'Install the Vue device in your electrical panel (licensed electrician recommended)',
      'Connect CT clamps to individual circuits you want to monitor',
      'Power on the device and connect to your Wi-Fi network using the Emporia app',
      'In EcoPowerHub AI, navigate to Settings > Devices > Add Device',
      'Select "Emporia Vue Gen 2" and enter your Emporia account credentials',
      'Grant API access permissions when prompted',
      'Wait 2-3 minutes for initial data sync',
      'Verify real-time energy data appears in your dashboard'
    ],
    imagePath: GENERATED_ASSETS.emporiaVueGen2Setup,
    quickConnectRoute: '/app?action=add-device&type=emporia-vue-gen2',
    privacyNotes: [
      'Your Emporia credentials are encrypted and stored securely',
      'We only access energy consumption data, not personal information',
      'Data is transmitted over HTTPS with end-to-end encryption',
      'You can revoke access at any time from your Emporia account settings'
    ],
    troubleshooting: [
      {
        issue: 'Device not appearing in EcoPowerHub AI',
        solution: 'Ensure your Emporia device is online in the Emporia app first. Check that API access is enabled in your Emporia account settings.'
      },
      {
        issue: 'Data not updating in real-time',
        solution: 'Refresh the connection by going to Settings > Devices > Emporia Vue Gen 2 > Reconnect. If the issue persists, check your Wi-Fi connection.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 500 EcoTokens upon successful device connection',
      'Earn 10 EcoTokens per day for active monitoring',
      'Bonus 100 EcoTokens for sharing energy-saving tips with the community'
    ],
    compatibility: ['110V', '220V', '240V', 'Split-phase', 'Three-phase']
  },
  {
    id: 'emporia-vue-220v',
    name: 'Emporia Vue (220V Tutorial)',
    category: 'energy-monitor',
    logoPath: GENERATED_ASSETS.emporiaLogo,
    description: 'Specialized setup guide for 220V electrical systems',
    setupSteps: [
      'Verify your electrical panel is 220V compatible',
      'Turn off main breaker before installation',
      'Install Vue device following 220V wiring diagram',
      'Connect CT clamps to both hot legs (L1 and L2)',
      'Restore power and verify LED indicators',
      'Connect to Wi-Fi using Emporia mobile app',
      'Link to EcoPowerHub AI via Settings > Devices'
    ],
    imagePath: GENERATED_ASSETS.emporiaVueTutorial,
    quickConnectRoute: '/app?action=add-device&type=emporia-vue-220v',
    privacyNotes: [
      'Encrypted credential storage',
      'Read-only access to energy data',
      'No personal information collected'
    ],
    troubleshooting: [
      {
        issue: 'Incorrect voltage readings',
        solution: 'Verify CT clamps are installed on correct hot legs (L1/L2). Check polarity orientation.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 500 EcoTokens for successful 220V setup',
      'Daily monitoring rewards'
    ],
    compatibility: ['220V', '230V', '240V']
  },
  {
    id: 'sense-monitor',
    name: 'Sense Energy Monitor',
    category: 'energy-monitor',
    logoPath: GENERATED_ASSETS.senseLogo,
    description: 'AI-powered whole-home energy monitor with device detection',
    setupSteps: [
      'Install Sense monitor in your electrical panel',
      'Connect voltage reference wires and CT clamps',
      'Power on and connect to Wi-Fi via Sense app',
      'Wait 24-48 hours for initial device detection',
      'In EcoPowerHub AI, go to Settings > Devices > Add Device',
      'Select "Sense Monitor" and authorize API access',
      'Sync detected devices and energy data'
    ],
    imagePath: GENERATED_ASSETS.senseMonitorInstallation,
    quickConnectRoute: '/app?action=add-device&type=sense',
    privacyNotes: [
      'OAuth 2.0 secure authentication',
      'Only energy consumption data is accessed',
      'Device detection data remains private'
    ],
    troubleshooting: [
      {
        issue: 'Devices not being detected',
        solution: 'Sense requires 24-48 hours to learn your devices. Ensure devices are used regularly during this period.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 600 EcoTokens for Sense integration',
      'Bonus tokens for each device detected'
    ],
    compatibility: ['110V', '220V', 'Split-phase']
  },
  {
    id: 'iotawatt',
    name: 'IoTaWatt',
    category: 'energy-monitor',
    logoPath: GENERATED_ASSETS.iotawattLogo,
    description: 'Open-source energy monitor with up to 14 channels',
    setupSteps: [
      'Install IoTaWatt device in electrical panel',
      'Connect CT sensors to circuits',
      'Power on and connect to local Wi-Fi',
      'Access IoTaWatt web interface (iotawatt.local)',
      'Configure circuit names and CT types',
      'Enable API access in IoTaWatt settings',
      'Add device in EcoPowerHub AI with local IP address'
    ],
    imagePath: GENERATED_ASSETS.iotawattSetupGuide,
    quickConnectRoute: '/app?action=add-device&type=iotawatt',
    privacyNotes: [
      'Local network access only',
      'No cloud credentials required',
      'Data stays on your network'
    ],
    troubleshooting: [
      {
        issue: 'Cannot access web interface',
        solution: 'Ensure IoTaWatt is on same network. Try accessing via IP address instead of iotawatt.local.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 700 EcoTokens for open-source support',
      'Community contribution bonuses'
    ],
    compatibility: ['110V', '220V', '240V', 'Three-phase']
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    category: 'smart-home',
    logoPath: GENERATED_ASSETS.homeAssistantLogo,
    description: 'Open-source home automation platform integration',
    setupSteps: [
      'Ensure Home Assistant is running and accessible',
      'Create long-lived access token in Home Assistant',
      'In EcoPowerHub AI, go to Settings > Devices > Add Device',
      'Select "Home Assistant" and enter your instance URL',
      'Paste the long-lived access token',
      'Select energy entities to monitor',
      'Verify data sync'
    ],
    imagePath: GENERATED_ASSETS.homeAssistantIntegration,
    quickConnectRoute: '/app?action=add-device&type=home-assistant',
    privacyNotes: [
      'Token-based authentication',
      'Only selected entities are accessed',
      'Local or cloud Home Assistant supported'
    ],
    troubleshooting: [
      {
        issue: 'Connection timeout',
        solution: 'Verify Home Assistant URL is accessible from internet. Check firewall settings.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 800 EcoTokens for Home Assistant integration',
      'Automation bonus rewards'
    ],
    compatibility: ['All Home Assistant installations']
  },
  {
    id: 'shelly-devices',
    name: 'Shelly Smart Plugs & Switches',
    category: 'smart-home',
    logoPath: GENERATED_ASSETS.shellyLogo,
    description: 'Wi-Fi enabled smart switches with energy monitoring',
    setupSteps: [
      'Install Shelly device following manufacturer instructions',
      'Connect to Wi-Fi using Shelly app',
      'Enable cloud integration in Shelly app',
      'In EcoPowerHub AI, add Shelly Cloud integration',
      'Authorize access to your Shelly devices',
      'Select devices to monitor'
    ],
    imagePath: GENERATED_ASSETS.shellyDeviceFamily,
    quickConnectRoute: '/app?action=add-device&type=shelly',
    privacyNotes: [
      'Shelly Cloud API authentication',
      'Only energy data is accessed',
      'Device control remains in Shelly app'
    ],
    troubleshooting: [
      {
        issue: 'Device offline in EcoPowerHub AI',
        solution: 'Check device status in Shelly app first. Ensure cloud integration is enabled.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 400 EcoTokens per Shelly device connected',
      'Multi-device bonus rewards'
    ],
    compatibility: ['Shelly 1PM', 'Shelly Plug S', 'Shelly EM', 'Shelly 3EM']
  },
  {
    id: 'tuya-smart-life',
    name: 'Tuya / Smart Life Devices',
    category: 'smart-home',
    logoPath: GENERATED_ASSETS.tuyaLogo,
    description: 'Smart plugs and switches from Tuya ecosystem',
    setupSteps: [
      'Set up devices in Smart Life or Tuya app',
      'Create Tuya IoT Platform account',
      'Link Smart Life account to Tuya IoT',
      'Create Cloud Project and get API credentials',
      'In EcoPowerHub AI, add Tuya integration',
      'Enter API credentials and authorize'
    ],
    imagePath: GENERATED_ASSETS.tuyaSmartLifeIntegration,
    quickConnectRoute: '/app?action=add-device&type=tuya',
    privacyNotes: [
      'Tuya Cloud API access',
      'Encrypted credential storage',
      'Read-only energy data access'
    ],
    troubleshooting: [
      {
        issue: 'API credentials not working',
        solution: 'Verify Cloud Project is authorized for your region. Check API key and secret are correct.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 350 EcoTokens per Tuya device',
      'Ecosystem integration bonus'
    ],
    compatibility: ['All Tuya-compatible smart plugs with energy monitoring']
  },
  {
    id: 'tesla-powerwall',
    name: 'Tesla Powerwall',
    category: 'battery',
    logoPath: GENERATED_ASSETS.teslaPowerwallLogo,
    description: 'Home battery system with solar integration',
    setupSteps: [
      'Ensure Powerwall is online and connected to Tesla app',
      'In EcoPowerHub AI, go to Settings > Devices > Add Device',
      'Select "Tesla Powerwall"',
      'Log in with your Tesla account',
      'Authorize EcoPowerHub AI to access energy data',
      'Select Powerwall to monitor'
    ],
    imagePath: GENERATED_ASSETS.teslaPowerwallIntegration,
    quickConnectRoute: '/app?action=add-device&type=tesla-powerwall',
    privacyNotes: [
      'Tesla OAuth authentication',
      'Only energy and battery data accessed',
      'Vehicle data not accessed'
    ],
    troubleshooting: [
      {
        issue: 'Cannot see Powerwall data',
        solution: 'Verify Powerwall is commissioned and online in Tesla app. Check internet connectivity.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 1000 EcoTokens for Powerwall integration',
      'Solar generation bonus rewards'
    ],
    compatibility: ['Powerwall 2', 'Powerwall+']
  },
  {
    id: 'enphase-envoy',
    name: 'Enphase Envoy',
    category: 'solar',
    logoPath: GENERATED_ASSETS.enphaseEnvoyLogo,
    description: 'Solar monitoring gateway for Enphase microinverters',
    setupSteps: [
      'Ensure Envoy is online and accessible',
      'Create Enphase Enlighten account if needed',
      'In EcoPowerHub AI, add Enphase integration',
      'Log in with Enlighten credentials',
      'Authorize API access',
      'Select system to monitor'
    ],
    imagePath: GENERATED_ASSETS.enphaseIqSetup,
    quickConnectRoute: '/app?action=add-device&type=enphase',
    privacyNotes: [
      'Enphase Enlighten API',
      'Solar production data only',
      'Secure OAuth flow'
    ],
    troubleshooting: [
      {
        issue: 'No production data showing',
        solution: 'Check Envoy is reporting to Enlighten. Verify system is producing power during daylight.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 900 EcoTokens for solar integration',
      'Green energy production bonuses'
    ],
    compatibility: ['Envoy-S', 'Envoy IQ']
  },
  {
    id: 'solaredge',
    name: 'SolarEdge Monitoring',
    category: 'solar',
    logoPath: GENERATED_ASSETS.solaredgeLogo,
    description: 'Solar inverter monitoring platform',
    setupSteps: [
      'Access SolarEdge monitoring portal',
      'Generate API key in Admin settings',
      'In EcoPowerHub AI, add SolarEdge integration',
      'Enter site ID and API key',
      'Verify connection and data sync'
    ],
    imagePath: GENERATED_ASSETS.solaredgeIntegration,
    quickConnectRoute: '/app?action=add-device&type=solaredge',
    privacyNotes: [
      'API key authentication',
      'Read-only access',
      'Solar production data only'
    ],
    troubleshooting: [
      {
        issue: 'Invalid API key error',
        solution: 'Regenerate API key in SolarEdge portal. Ensure key has read permissions.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 900 EcoTokens for SolarEdge setup',
      'Solar optimization rewards'
    ],
    compatibility: ['All SolarEdge inverters with monitoring']
  },
  {
    id: 'generac-pwrcell',
    name: 'Generac PWRcell',
    category: 'battery',
    logoPath: GENERATED_ASSETS.generacPwrcellLogo,
    description: 'Home battery and backup power system',
    setupSteps: [
      'Ensure PWRcell is online via PWRview app',
      'Contact Generac support to enable API access',
      'Receive API credentials from Generac',
      'In EcoPowerHub AI, add Generac PWRcell',
      'Enter API credentials',
      'Verify battery status sync'
    ],
    imagePath: GENERATED_ASSETS.generacPwrcellSetup,
    quickConnectRoute: '/app?action=add-device&type=generac-pwrcell',
    privacyNotes: [
      'Generac API authentication',
      'Battery and backup data only',
      'Secure encrypted connection'
    ],
    troubleshooting: [
      {
        issue: 'API access not available',
        solution: 'Contact Generac customer support to request API access for your system.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 1000 EcoTokens for PWRcell integration',
      'Backup power readiness bonuses'
    ],
    compatibility: ['PWRcell M3', 'PWRcell M4', 'PWRcell M5', 'PWRcell M6']
  },
  {
    id: 'span-panel',
    name: 'Span Smart Panel',
    category: 'energy-monitor',
    logoPath: GENERATED_ASSETS.spanSmartPanelLogo,
    description: 'Smart electrical panel with circuit-level control',
    setupSteps: [
      'Ensure Span Panel is installed and online',
      'Access Span mobile app',
      'Enable API access in app settings',
      'In EcoPowerHub AI, add Span integration',
      'Log in with Span credentials',
      'Authorize data access'
    ],
    imagePath: GENERATED_ASSETS.spanIoIntegration,
    quickConnectRoute: '/app?action=add-device&type=span',
    privacyNotes: [
      'Span OAuth authentication',
      'Circuit-level energy data',
      'Control features remain in Span app'
    ],
    troubleshooting: [
      {
        issue: 'Panel not responding',
        solution: 'Check Span Panel internet connection. Restart panel if needed via app.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 1200 EcoTokens for Span Panel integration',
      'Smart home automation bonuses'
    ],
    compatibility: ['Span Panel (all versions)']
  },
  {
    id: 'neocharge',
    name: 'NeoCharge Smart Splitter',
    category: 'smart-home',
    logoPath: GENERATED_ASSETS.neochargeLogo,
    description: 'EV charging and dryer outlet sharing device',
    setupSteps: [
      'Install NeoCharge device per instructions',
      'Connect to Wi-Fi via NeoCharge app',
      'In EcoPowerHub AI, add NeoCharge integration',
      'Enter device serial number',
      'Authorize data access',
      'Monitor EV charging patterns'
    ],
    imagePath: GENERATED_ASSETS.neochargeSetupGuide,
    quickConnectRoute: '/app?action=add-device&type=neocharge',
    privacyNotes: [
      'Local network communication',
      'Charging data only',
      'No personal information collected'
    ],
    troubleshooting: [
      {
        issue: 'Device not switching properly',
        solution: 'Check circuit breaker rating. Ensure dryer and EV charger do not exceed combined capacity.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 600 EcoTokens for NeoCharge setup',
      'EV charging optimization rewards'
    ],
    compatibility: ['NeoCharge Smart Splitter (all models)']
  },
  {
    id: 'rainforest-eagle',
    name: 'Rainforest Eagle',
    category: 'utility',
    logoPath: GENERATED_ASSETS.rainforestEagleLogo,
    description: 'Utility meter data gateway',
    setupSteps: [
      'Connect Eagle device to utility smart meter',
      'Power on and connect to Wi-Fi',
      'Access Eagle web interface',
      'Enable cloud upload in settings',
      'In EcoPowerHub AI, add Rainforest Eagle',
      'Enter device MAC address and cloud ID'
    ],
    imagePath: GENERATED_ASSETS.deviceSetupCards,
    quickConnectRoute: '/app?action=add-device&type=rainforest-eagle',
    privacyNotes: [
      'Direct meter data access',
      'Encrypted transmission',
      'Utility billing data not accessed'
    ],
    troubleshooting: [
      {
        issue: 'Cannot connect to smart meter',
        solution: 'Verify your utility meter supports Zigbee/HAN. Contact utility to enable smart meter access.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 550 EcoTokens for utility integration',
      'Real-time pricing optimization rewards'
    ],
    compatibility: ['Eagle-200', 'Eagle-3']
  },
  {
    id: 'utility-direct',
    name: 'Utility Direct Integration',
    category: 'utility',
    logoPath: GENERATED_ASSETS.utilityDirectIntegrationLogo,
    description: 'Direct connection to utility provider data',
    setupSteps: [
      'Check if your utility is supported',
      'In EcoPowerHub AI, go to Settings > Devices > Add Device',
      'Select "Utility Direct Integration"',
      'Choose your utility provider from the list',
      'Log in with your utility account credentials',
      'Authorize data access',
      'Wait for initial data sync (may take 24 hours)'
    ],
    imagePath: GENERATED_ASSETS.deviceSetupCards,
    quickConnectRoute: '/app?action=add-device&type=utility-direct',
    privacyNotes: [
      'OAuth authentication with utility',
      'Read-only access to usage data',
      'Billing information not accessed',
      'Credentials encrypted and secure'
    ],
    troubleshooting: [
      {
        issue: 'Utility not in supported list',
        solution: 'Contact support@ecopowerhub.ai to request your utility be added. We are constantly expanding coverage.'
      },
      {
        issue: 'Data not syncing',
        solution: 'Some utilities update data every 24 hours. Check back tomorrow or verify credentials are still valid.'
      }
    ],
    ecoTokenBenefits: [
      'Earn 600 EcoTokens for utility integration',
      'Time-of-use optimization bonuses',
      'Peak demand reduction rewards'
    ],
    compatibility: ['PG&E', 'SCE', 'ConEd', 'Duke Energy', 'National Grid', '100+ more']
  }
];

const CATEGORY_LABELS = {
  'energy-monitor': 'Energy Monitor',
  'solar': 'Solar',
  'battery': 'Battery',
  'smart-home': 'Smart Home',
  'utility': 'Utility'
};

const CATEGORY_COLORS = {
  'energy-monitor': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'solar': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'battery': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'smart-home': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'utility': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
};

export default function DeviceIntegrationGuidesPage() {
  const [openGuides, setOpenGuides] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleGuide = (id: string) => {
    setOpenGuides(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredGuides = selectedCategory === 'all' 
    ? DEVICE_GUIDES 
    : DEVICE_GUIDES.filter(guide => guide.category === selectedCategory);

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Device Integration Guides</h1>
              <p className="text-muted-foreground mt-1">
                Step-by-step setup instructions for connecting your energy devices to EcoPowerHub AI
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Devices' : CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </Button>
          ))}
        </div>
      </div>

      {/* Device Guides Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map(guide => (
            <Card key={guide.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-shrink-0">
                    <StableImage
                      src={guide.logoPath}
                      alt={`${guide.name} logo`}
                      width={80}
                      height={80}
                      className="rounded-lg"
                      fallbackSrc={GENERATED_ASSETS.deviceSetupCards}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg">{guide.name}</CardTitle>
                    <Badge className={`mt-2 ${CATEGORY_COLORS[guide.category]}`}>
                      {CATEGORY_LABELS[guide.category]}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="mt-3">{guide.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <Collapsible open={openGuides.has(guide.id)} onOpenChange={() => toggleGuide(guide.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>View Setup Guide</span>
                      {openGuides.has(guide.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4 space-y-6">
                    {/* Setup Image - Always rendered, never unmounted */}
                    <div className="rounded-lg overflow-hidden border bg-muted/50">
                      <StableImage
                        src={guide.imagePath}
                        alt={`${guide.name} setup`}
                        width={800}
                        height={600}
                        className="w-full"
                        fallbackSrc={GENERATED_ASSETS.deviceSetupCards}
                      />
                    </div>

                    {/* Setup Steps */}
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <Wrench className="h-5 w-5 text-primary" />
                        Setup Steps
                      </h3>
                      <ol className="space-y-2 list-decimal list-inside text-sm">
                        {guide.setupSteps.map((step, idx) => (
                          <li key={idx} className="text-muted-foreground">{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Privacy & Security */}
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        Privacy & Security
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {guide.privacyNotes.map((note, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Troubleshooting */}
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Troubleshooting
                      </h3>
                      <div className="space-y-3 text-sm">
                        {guide.troubleshooting.map((item, idx) => (
                          <div key={idx}>
                            <p className="font-medium text-foreground">{item.issue}</p>
                            <p className="text-muted-foreground mt-1">{item.solution}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* EcoToken Benefits */}
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <Gift className="h-5 w-5 text-purple-600" />
                        EcoToken Rewards
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {guide.ecoTokenBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Zap className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compatibility */}
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Compatibility</h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.compatibility.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick Connect Button */}
                    <Button className="w-full" asChild>
                      <a href={guide.quickConnectRoute}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Quick Connect
                      </a>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="container mx-auto px-4 pb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Need Additional Help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you with device integration and troubleshooting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" asChild>
                <a href="mailto:support@ecopowerhub.ai">
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/diagnostics">
                  Visit Help Center
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
