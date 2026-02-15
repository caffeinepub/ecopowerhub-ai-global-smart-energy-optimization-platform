/**
 * Asset Restoration Utility
 * 
 * This file documents all 58 required PNG assets for the application.
 * These assets must exist in frontend/public/generated/ with exact filenames and dimensions.
 * 
 * The vite-build-verify.js script validates:
 * 1. All 58 files exist in public/generated/
 * 2. Each file is a valid PNG
 * 3. Pixel dimensions match the dim_WIDTHxHEIGHT in the filename
 * 4. Files are copied to dist/generated/ during build
 */

export interface RequiredAsset {
  filename: string;
  width: number;
  height: number;
  purpose: string;
  usedIn: string[];
  category: string;
}

export const REQUIRED_ASSETS: RequiredAsset[] = [
  // Branding / Hero (3 assets)
  {
    filename: 'energyoptim-ai-logo-transparent.dim_200x200.png',
    width: 200,
    height: 200,
    purpose: 'EcoPowerHub AI logo with transparency',
    usedIn: ['Header', 'Footer', 'LandingPage'],
    category: 'Branding'
  },
  {
    filename: 'ecopowerhub-logo-full-color.1024x1024.png',
    width: 1024,
    height: 1024,
    purpose: 'EcoPowerHub AI full-color emblem logo with transparent background for high-resolution display and marketing materials',
    usedIn: ['Marketing materials', 'High-resolution displays', 'App stores'],
    category: 'Branding'
  },
  {
    filename: 'hero-background-globe.dim_1920x1080.png',
    width: 1920,
    height: 1080,
    purpose: 'Hero section background with globe visualization',
    usedIn: ['LandingPage'],
    category: 'Branding'
  },
  
  // Device Logos (14 assets)
  {
    filename: 'emporia-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Emporia Vue logo',
    usedIn: ['DeviceIntegrationGuidesPage', 'PartnerMarketplacePage'],
    category: 'Logos'
  },
  {
    filename: 'sense-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Sense Energy Monitor logo',
    usedIn: ['DeviceIntegrationGuidesPage', 'PartnerMarketplacePage'],
    category: 'Logos'
  },
  {
    filename: 'iotawatt-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'IoTaWatt logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'home-assistant-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Home Assistant logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'shelly-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Shelly smart devices logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'aubess-tuya-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Aubess/Tuya Smart Life logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'tesla-powerwall-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Tesla Powerwall logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'enphase-envoy-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Enphase Envoy logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'solaredge-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'SolarEdge logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'generac-pwrcell-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Generac PWRcell logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'span-smart-panel-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'SPAN Smart Panel logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'neocharge-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'NeoCharge logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'rainforest-eagle-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Rainforest EAGLE logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  {
    filename: 'utility-direct-integration-logo-transparent.dim_150x150.png',
    width: 150,
    height: 150,
    purpose: 'Utility Direct Integration logo',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Logos'
  },
  
  // Setup Guides (13 assets)
  {
    filename: 'emporia-vue-gen2-setup.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Emporia Vue Gen 2 setup guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'emporia-vue-220v-tutorial.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Emporia Vue 220V installation tutorial',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'sense-monitor-installation.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Sense Monitor installation guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'iotawatt-setup-guide.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'IoTaWatt setup guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'home-assistant-integration.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Home Assistant integration guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'shelly-device-family.dim_900x500.png',
    width: 900,
    height: 500,
    purpose: 'Shelly device family overview',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'tuya-smart-life-integration.dim_600x800.png',
    width: 600,
    height: 800,
    purpose: 'Tuya Smart Life integration guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'tesla-powerwall-integration.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Tesla Powerwall integration guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'enphase-iq-setup.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Enphase IQ setup guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'solaredge-integration.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'SolarEdge integration guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'generac-pwrcell-setup.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Generac PWRcell setup guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'span-io-integration.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'SPAN.IO integration guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  {
    filename: 'neocharge-setup-guide.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'NeoCharge setup guide',
    usedIn: ['DeviceIntegrationGuidesPage'],
    category: 'Setup Guides'
  },
  
  // Core App Images (11 assets)
  {
    filename: 'interactive-setup-diagram.dim_900x500.png',
    width: 900,
    height: 500,
    purpose: 'Interactive setup flow diagram',
    usedIn: ['LandingPage', 'DeviceIntegrationGuidesPage'],
    category: 'Core App'
  },
  {
    filename: 'device-setup-cards.dim_900x500.png',
    width: 900,
    height: 500,
    purpose: 'Device setup cards overview',
    usedIn: ['LandingPage', 'DeviceIntegrationGuidesPage'],
    category: 'Core App'
  },
  {
    filename: 'ai-chatbot-interface.dim_600x400.png',
    width: 600,
    height: 400,
    purpose: 'AI chatbot interface preview',
    usedIn: ['LandingPage', 'SupportIntegrationsPage'],
    category: 'Core App'
  },
  {
    filename: 'global-faq-interface.dim_800x400.png',
    width: 800,
    height: 400,
    purpose: 'Global FAQ interface screenshot',
    usedIn: ['LandingPage', 'SupportIntegrationsPage'],
    category: 'Core App'
  },
  {
    filename: 'case-studies-savings-chart.dim_800x500.png',
    width: 800,
    height: 500,
    purpose: 'Case studies energy savings chart',
    usedIn: ['LandingPage', 'TechSpecsPage'],
    category: 'Core App'
  },
  {
    filename: 'residential-case-study-dashboard.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Residential case study dashboard',
    usedIn: ['LandingPage', 'TechSpecsPage'],
    category: 'Core App'
  },
  {
    filename: 'commercial-energy-optimization.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Commercial energy optimization dashboard',
    usedIn: ['LandingPage', 'TechSpecsPage'],
    category: 'Core App'
  },
  {
    filename: 'industrial-energy-case-study.dim_800x600.png',
    width: 800,
    height: 600,
    purpose: 'Industrial energy case study visualization',
    usedIn: ['LandingPage', 'TechSpecsPage'],
    category: 'Core App'
  },
  {
    filename: 'testimonial-michael-avatar.dim_100x100.png',
    width: 100,
    height: 100,
    purpose: 'Michael testimonial avatar',
    usedIn: ['LandingPage'],
    category: 'Core App'
  },
  {
    filename: 'testimonial-sophie-avatar.dim_100x100.png',
    width: 100,
    height: 100,
    purpose: 'Sophie testimonial avatar',
    usedIn: ['LandingPage'],
    category: 'Core App'
  },
  {
    filename: 'scada-benefits-infographic.dim_800x500.png',
    width: 800,
    height: 500,
    purpose: 'SCADA protocol benefits infographic',
    usedIn: ['TechSpecsPage', 'SupportIntegrationsPage'],
    category: 'Core App'
  },
  
  // Solar Generator Products (8 assets)
  {
    filename: 'solar-generator-ecoflow-product.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'EcoFlow solar generator product image',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-ecoflow-app-dashboard.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'EcoFlow app dashboard screenshot',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-bluetti-product.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Bluetti solar generator product image',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-bluetti-app-dashboard.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Bluetti app dashboard screenshot',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-jackery-product.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Jackery solar generator product image',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-jackery-app-dashboard.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Jackery app dashboard screenshot',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-anker-product.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Anker solar generator product image',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  {
    filename: 'solar-generator-anker-app-dashboard.dim_1200x800.png',
    width: 1200,
    height: 800,
    purpose: 'Anker app dashboard screenshot',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Solar Generators'
  },
  
  // Affiliate Cards (5 assets)
  {
    filename: 'sense-affiliate-card.dim_300x200.png',
    width: 300,
    height: 200,
    purpose: 'Sense affiliate program card',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Affiliate Cards'
  },
  {
    filename: 'emporia-affiliate-card.dim_300x200.png',
    width: 300,
    height: 200,
    purpose: 'Emporia affiliate program card',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Affiliate Cards'
  },
  {
    filename: 'amazon-associates-card.dim_300x200.png',
    width: 300,
    height: 200,
    purpose: 'Amazon Associates program card',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Affiliate Cards'
  },
  {
    filename: 'shareasale-card.dim_300x200.png',
    width: 300,
    height: 200,
    purpose: 'ShareASale affiliate program card',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Affiliate Cards'
  },
  {
    filename: 'cj-affiliate-card.dim_300x200.png',
    width: 300,
    height: 200,
    purpose: 'CJ Affiliate program card',
    usedIn: ['PartnerMarketplacePage'],
    category: 'Affiliate Cards'
  },
];

/**
 * Deployment Checklist
 * 
 * Before deploying to production, verify:
 * 
 * 1. ✅ All 58 PNG files exist in frontend/public/generated/
 * 2. ✅ Each PNG has correct dimensions matching its filename
 * 3. ✅ Each PNG has valid PNG signature (starts with 0x89504E47)
 * 4. ✅ Run: node frontend/restore-assets.js (should show 58/58 present)
 * 5. ✅ Run: cd frontend && npm run build
 * 6. ✅ Run: node frontend/vite-build-verify.js (should pass all checks)
 * 7. ✅ Verify dist/generated/ contains all 58 PNG files
 * 8. ✅ Verify dist/index.html exists
 * 9. ✅ Verify dist/assets/ contains JS and CSS bundles
 * 10. ✅ Deploy to Internet Computer with: dfx deploy
 */

export function getTotalAssetCount(): number {
  return REQUIRED_ASSETS.length;
}

export function getAssetsByCategory(category: string): RequiredAsset[] {
  return REQUIRED_ASSETS.filter(asset => asset.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(REQUIRED_ASSETS.map(asset => asset.category));
  return Array.from(categories);
}
