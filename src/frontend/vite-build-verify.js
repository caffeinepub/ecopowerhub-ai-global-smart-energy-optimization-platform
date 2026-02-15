import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verify image assets were copied
const distGeneratedPath = path.resolve(__dirname, 'dist/generated');
const publicGeneratedPath = path.resolve(__dirname, 'public/generated');
const distAssetsPath = path.resolve(__dirname, 'dist/assets');
const distIndexPath = path.resolve(__dirname, 'dist/index.html');

// Complete list of required PNG files with exact dimensions
const REQUIRED_PNGS = [
  // Branding / Hero
  { filename: 'energyoptim-ai-logo-transparent.dim_200x200.png', width: 200, height: 200 },
  { filename: 'ecopowerhub-logo-full-color.1024x1024.png', width: 1024, height: 1024 },
  { filename: 'hero-background-globe.dim_1920x1080.png', width: 1920, height: 1080 },
  
  // Logos (150x150)
  { filename: 'emporia-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'sense-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'iotawatt-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'home-assistant-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'shelly-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'aubess-tuya-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'tesla-powerwall-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'enphase-envoy-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'solaredge-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'generac-pwrcell-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'span-smart-panel-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'neocharge-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'rainforest-eagle-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  { filename: 'utility-direct-integration-logo-transparent.dim_150x150.png', width: 150, height: 150 },
  
  // Setup Guides
  { filename: 'emporia-vue-gen2-setup.dim_800x600.png', width: 800, height: 600 },
  { filename: 'emporia-vue-220v-tutorial.dim_800x600.png', width: 800, height: 600 },
  { filename: 'sense-monitor-installation.dim_800x600.png', width: 800, height: 600 },
  { filename: 'iotawatt-setup-guide.dim_800x600.png', width: 800, height: 600 },
  { filename: 'home-assistant-integration.dim_800x600.png', width: 800, height: 600 },
  { filename: 'shelly-device-family.dim_900x500.png', width: 900, height: 500 },
  { filename: 'tuya-smart-life-integration.dim_600x800.png', width: 600, height: 800 },
  { filename: 'tesla-powerwall-integration.dim_800x600.png', width: 800, height: 600 },
  { filename: 'enphase-iq-setup.dim_800x600.png', width: 800, height: 600 },
  { filename: 'solaredge-integration.dim_800x600.png', width: 800, height: 600 },
  { filename: 'generac-pwrcell-setup.dim_800x600.png', width: 800, height: 600 },
  { filename: 'span-io-integration.dim_800x600.png', width: 800, height: 600 },
  { filename: 'neocharge-setup-guide.dim_800x600.png', width: 800, height: 600 },
  
  // Core App Images
  { filename: 'interactive-setup-diagram.dim_900x500.png', width: 900, height: 500 },
  { filename: 'device-setup-cards.dim_900x500.png', width: 900, height: 500 },
  { filename: 'ai-chatbot-interface.dim_600x400.png', width: 600, height: 400 },
  { filename: 'global-faq-interface.dim_800x400.png', width: 800, height: 400 },
  { filename: 'case-studies-savings-chart.dim_800x500.png', width: 800, height: 500 },
  { filename: 'residential-case-study-dashboard.dim_800x600.png', width: 800, height: 600 },
  { filename: 'commercial-energy-optimization.dim_800x600.png', width: 800, height: 600 },
  { filename: 'industrial-energy-case-study.dim_800x600.png', width: 800, height: 600 },
  { filename: 'testimonial-michael-avatar.dim_100x100.png', width: 100, height: 100 },
  { filename: 'testimonial-sophie-avatar.dim_100x100.png', width: 100, height: 100 },
  { filename: 'scada-benefits-infographic.dim_800x500.png', width: 800, height: 500 },
  
  // Solar Generator Cards
  { filename: 'solar-generator-ecoflow-product.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-ecoflow-app-dashboard.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-bluetti-product.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-bluetti-app-dashboard.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-jackery-product.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-jackery-app-dashboard.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-anker-product.dim_1200x800.png', width: 1200, height: 800 },
  { filename: 'solar-generator-anker-app-dashboard.dim_1200x800.png', width: 1200, height: 800 },
  
  // Affiliate Cards
  { filename: 'sense-affiliate-card.dim_300x200.png', width: 300, height: 200 },
  { filename: 'emporia-affiliate-card.dim_300x200.png', width: 300, height: 200 },
  { filename: 'amazon-associates-card.dim_300x200.png', width: 300, height: 200 },
  { filename: 'shareasale-card.dim_300x200.png', width: 300, height: 200 },
  { filename: 'cj-affiliate-card.dim_300x200.png', width: 300, height: 200 },
];

console.log('\n=== EcoPowerHub AI Production Build Verification ===\n');

// Helper function to read PNG dimensions without external dependencies
function getPNGDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // Check PNG signature
    if (buffer.length < 24 || 
        buffer[0] !== 0x89 || buffer[1] !== 0x50 || 
        buffer[2] !== 0x4E || buffer[3] !== 0x47) {
      return null;
    }
    
    // Read IHDR chunk (starts at byte 16)
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    
    return { width, height };
  } catch (error) {
    return null;
  }
}

try {
  // CRITICAL: Verify dist/index.html exists
  console.log('Step 1: Verifying production HTML entry point...\n');
  
  if (!fs.existsSync(distIndexPath)) {
    console.error('CRITICAL ERROR: Production index.html does not exist!');
    console.error('Expected path: frontend/dist/index.html');
    console.error('Actual path checked:', distIndexPath);
    console.error('');
    console.error('Without index.html, the IC asset canister cannot serve the app.');
    console.error('This will result in a 404 or blank page in production.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Verify that frontend/index.html exists in the source');
    console.error('  2. Check that vite.config.ts has correct build.rollupOptions.input');
    console.error('  3. Ensure the Vite build command completed successfully');
    console.error('  4. Try running: cd frontend && npm run build');
    console.error('');
    process.exit(1);
  }
  
  console.log('✅ Success: Production index.html exists!\n');
  
  // CRITICAL: Verify Vite bundle output directory exists
  console.log('Step 2: Verifying Vite bundle output directory...\n');
  
  if (!fs.existsSync(distAssetsPath)) {
    console.error('CRITICAL ERROR: Vite bundle output directory does not exist!');
    console.error('Expected path: frontend/dist/assets/');
    console.error('Actual path checked:', distAssetsPath);
    console.error('');
    console.error('This means the Vite build did not produce any JavaScript or CSS bundles.');
    console.error('Without these bundles, the React application cannot mount and will show a black screen.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Check that the Vite build completed without errors');
    console.error('  2. Verify vite.config.ts has correct build.outDir setting');
    console.error('  3. Try running: cd frontend && npm run build');
    console.error('');
    process.exit(1);
  }
  
  const jsFiles = fs.readdirSync(distAssetsPath).filter(f => f.endsWith('.js'));
  const cssFiles = fs.readdirSync(distAssetsPath).filter(f => f.endsWith('.css'));
  
  if (jsFiles.length === 0) {
    console.error('CRITICAL ERROR: No JavaScript bundles found in dist/assets/!');
    console.error('The React application cannot run without JavaScript bundles.');
    console.error('');
    process.exit(1);
  }
  
  console.log(`✅ Success: Found ${jsFiles.length} JS bundle(s) and ${cssFiles.length} CSS file(s)\n`);
  
  // CRITICAL: Verify generated assets directory exists
  console.log('Step 3: Verifying generated assets directory...\n');
  
  if (!fs.existsSync(distGeneratedPath)) {
    console.error('CRITICAL ERROR: Generated assets directory does not exist!');
    console.error('Expected path: frontend/dist/generated/');
    console.error('Actual path checked:', distGeneratedPath);
    console.error('');
    console.error('This means the PNG assets were not copied during the build.');
    console.error('The application will show broken images in production.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Verify frontend/public/generated/ exists and contains PNG files');
    console.error('  2. Check that vite.config.ts has publicDir: "public" configured');
    console.error('  3. Run: node frontend/restore-assets.js');
    console.error('  4. Try running: cd frontend && npm run build');
    console.error('');
    process.exit(1);
  }
  
  console.log('✅ Success: Generated assets directory exists!\n');
  
  // Verify all required PNG assets
  console.log(`Step 4: Verifying ${REQUIRED_PNGS.length} required PNG assets...\n`);
  
  let allValid = true;
  let validCount = 0;
  let missingCount = 0;
  let invalidCount = 0;
  
  REQUIRED_PNGS.forEach(({ filename, width, height }) => {
    const publicPath = path.join(publicGeneratedPath, filename);
    const distPath = path.join(distGeneratedPath, filename);
    
    // Check if file exists in public/generated/
    if (!fs.existsSync(publicPath)) {
      console.error(`❌ MISSING in public/generated/: ${filename}`);
      missingCount++;
      allValid = false;
      return;
    }
    
    // Check if file exists in dist/generated/
    if (!fs.existsSync(distPath)) {
      console.error(`❌ NOT COPIED to dist/generated/: ${filename}`);
      missingCount++;
      allValid = false;
      return;
    }
    
    // Verify PNG signature and dimensions
    const dimensions = getPNGDimensions(distPath);
    
    if (!dimensions) {
      console.error(`❌ INVALID PNG: ${filename} (not a valid PNG file)`);
      invalidCount++;
      allValid = false;
      return;
    }
    
    if (dimensions.width !== width || dimensions.height !== height) {
      console.error(`❌ WRONG DIMENSIONS: ${filename}`);
      console.error(`   Expected: ${width}x${height}`);
      console.error(`   Actual: ${dimensions.width}x${dimensions.height}`);
      invalidCount++;
      allValid = false;
      return;
    }
    
    validCount++;
    console.log(`✅ ${filename} (${width}x${height})`);
  });
  
  console.log('\n==================================================');
  console.log('📊 Asset Verification Summary:');
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ❌ Missing: ${missingCount}`);
  console.log(`   ⚠️  Invalid: ${invalidCount}`);
  console.log(`   📦 Total: ${REQUIRED_PNGS.length}`);
  console.log('==================================================\n');
  
  if (!allValid) {
    console.error('❌ BUILD VERIFICATION FAILED!');
    console.error('');
    console.error('The production build is incomplete and will cause issues in production.');
    console.error('');
    console.error('Next steps:');
    console.error('  1. Run: node frontend/restore-assets.js');
    console.error('  2. Fix any missing or invalid assets');
    console.error('  3. Run: cd frontend && npm run build');
    console.error('  4. Run this verification script again');
    console.error('');
    process.exit(1);
  }
  
  console.log('✅ BUILD VERIFICATION PASSED!');
  console.log('');
  console.log('All critical components are present:');
  console.log('  ✅ Production HTML entry point (index.html)');
  console.log('  ✅ Vite JavaScript and CSS bundles');
  console.log(`  ✅ All ${REQUIRED_PNGS.length} required PNG assets with correct dimensions`);
  console.log('');
  console.log('The build is ready for deployment to the Internet Computer.');
  console.log('');
  
} catch (error) {
  console.error('UNEXPECTED ERROR during build verification:');
  console.error(error);
  process.exit(1);
}
