/**
 * Runtime Asset Verification Utility
 * 
 * Provides functions to verify that all required generated assets are accessible
 * at runtime via HTTP HEAD requests.
 */

export interface AssetCategory {
  name: string;
  assets: string[];
}

// Complete categorized list of all required generated assets
export const ALL_REQUIRED_ASSETS: AssetCategory[] = [
  {
    name: 'Branding & Hero',
    assets: [
      '/generated/energyoptim-ai-logo-transparent.dim_200x200.png',
      '/generated/ecopowerhub-logo-full-color.1024x1024.png',
      '/generated/hero-background-globe.dim_1920x1080.png',
    ]
  },
  {
    name: 'Device Logos',
    assets: [
      '/generated/emporia-logo-transparent.dim_150x150.png',
      '/generated/sense-logo-transparent.dim_150x150.png',
      '/generated/iotawatt-logo-transparent.dim_150x150.png',
      '/generated/home-assistant-logo-transparent.dim_150x150.png',
      '/generated/shelly-logo-transparent.dim_150x150.png',
      '/generated/aubess-tuya-logo-transparent.dim_150x150.png',
      '/generated/tesla-powerwall-logo-transparent.dim_150x150.png',
      '/generated/enphase-envoy-logo-transparent.dim_150x150.png',
      '/generated/solaredge-logo-transparent.dim_150x150.png',
      '/generated/generac-pwrcell-logo-transparent.dim_150x150.png',
      '/generated/span-smart-panel-logo-transparent.dim_150x150.png',
      '/generated/neocharge-logo-transparent.dim_150x150.png',
      '/generated/rainforest-eagle-logo-transparent.dim_150x150.png',
      '/generated/utility-direct-integration-logo-transparent.dim_150x150.png',
    ]
  },
  {
    name: 'Setup Guides',
    assets: [
      '/generated/emporia-vue-gen2-setup.dim_800x600.png',
      '/generated/emporia-vue-220v-tutorial.dim_800x600.png',
      '/generated/sense-monitor-installation.dim_800x600.png',
      '/generated/iotawatt-setup-guide.dim_800x600.png',
      '/generated/home-assistant-integration.dim_800x600.png',
      '/generated/shelly-device-family.dim_900x500.png',
      '/generated/tuya-smart-life-integration.dim_600x800.png',
      '/generated/tesla-powerwall-integration.dim_800x600.png',
      '/generated/enphase-iq-setup.dim_800x600.png',
      '/generated/solaredge-integration.dim_800x600.png',
      '/generated/generac-pwrcell-setup.dim_800x600.png',
      '/generated/span-io-integration.dim_800x600.png',
      '/generated/neocharge-setup-guide.dim_800x600.png',
    ]
  },
  {
    name: 'Core App Images',
    assets: [
      '/generated/interactive-setup-diagram.dim_900x500.png',
      '/generated/device-setup-cards.dim_900x500.png',
      '/generated/ai-chatbot-interface.dim_600x400.png',
      '/generated/global-faq-interface.dim_800x400.png',
      '/generated/case-studies-savings-chart.dim_800x500.png',
      '/generated/residential-case-study-dashboard.dim_800x600.png',
      '/generated/commercial-energy-optimization.dim_800x600.png',
      '/generated/industrial-energy-case-study.dim_800x600.png',
      '/generated/testimonial-michael-avatar.dim_100x100.png',
      '/generated/testimonial-sophie-avatar.dim_100x100.png',
      '/generated/scada-benefits-infographic.dim_800x500.png',
    ]
  },
  {
    name: 'Solar Generator Products',
    assets: [
      '/generated/solar-generator-ecoflow-product.dim_1200x800.png',
      '/generated/solar-generator-ecoflow-app-dashboard.dim_1200x800.png',
      '/generated/solar-generator-bluetti-product.dim_1200x800.png',
      '/generated/solar-generator-bluetti-app-dashboard.dim_1200x800.png',
      '/generated/solar-generator-jackery-product.dim_1200x800.png',
      '/generated/solar-generator-jackery-app-dashboard.dim_1200x800.png',
      '/generated/solar-generator-anker-product.dim_1200x800.png',
      '/generated/solar-generator-anker-app-dashboard.dim_1200x800.png',
    ]
  },
  {
    name: 'Affiliate Cards',
    assets: [
      '/generated/sense-affiliate-card.dim_300x200.png',
      '/generated/emporia-affiliate-card.dim_300x200.png',
      '/generated/amazon-associates-card.dim_300x200.png',
      '/generated/shareasale-card.dim_300x200.png',
      '/generated/cj-affiliate-card.dim_300x200.png',
    ]
  }
];

export interface AssetVerificationResult {
  url: string;
  exists: boolean;
  contentType?: string;
  error?: string;
}

/**
 * Verify a single asset exists and returns correct Content-Type
 */
export async function verifyAsset(url: string): Promise<AssetVerificationResult> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    return {
      url,
      exists: response.ok,
      contentType: response.headers.get('Content-Type') || undefined,
      error: response.ok ? undefined : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      url,
      exists: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Verify all required assets
 */
export async function verifyAllAssets(): Promise<AssetVerificationResult[]> {
  const allAssets = ALL_REQUIRED_ASSETS.flatMap(category => category.assets);
  const results = await Promise.all(allAssets.map(verifyAsset));
  return results;
}

/**
 * Log verification results to console
 */
export function logVerificationResults(results: AssetVerificationResult[]): void {
  console.group('🎨 Asset Verification Results');
  
  const successful = results.filter(r => r.exists);
  const failed = results.filter(r => !r.exists);
  
  console.log(`✅ Accessible: ${successful.length}`);
  console.log(`❌ Missing: ${failed.length}`);
  console.log(`📦 Total: ${results.length}`);
  
  if (failed.length > 0) {
    console.group('❌ Missing Assets:');
    failed.forEach(result => {
      console.log(`  ${result.url} - ${result.error}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Get total count of required assets
 */
export function getTotalAssetCount(): number {
  return ALL_REQUIRED_ASSETS.reduce((sum, category) => sum + category.assets.length, 0);
}
