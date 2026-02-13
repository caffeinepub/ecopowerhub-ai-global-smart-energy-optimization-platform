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

// Required PNG files with exact dimensions (case-sensitive)
const REQUIRED_PNGS = [
  { filename: 'hero-background-globe.dim_1920x1080.png', width: 1920, height: 1080 },
  { filename: 'interactive-setup-diagram.dim_900x500.png', width: 900, height: 500 },
  { filename: 'emporia-vue-220v-tutorial.dim_800x600.png', width: 800, height: 600 },
  { filename: 'device-setup-cards.dim_900x500.png', width: 900, height: 500 },
  { filename: 'ai-chatbot-interface.dim_600x400.png', width: 600, height: 400 },
  { filename: 'global-faq-interface.dim_800x400.png', width: 800, height: 400 },
  { filename: 'case-studies-savings-chart.dim_800x500.png', width: 800, height: 500 },
  { filename: 'residential-case-study-dashboard.dim_800x600.png', width: 800, height: 600 },
  { filename: 'commercial-energy-optimization.dim_800x600.png', width: 800, height: 600 },
  { filename: 'industrial-energy-case-study.dim_800x600.png', width: 800, height: 600 },
  { filename: 'testimonial-michael-avatar.dim_100x100.png', width: 100, height: 100 },
  { filename: 'testimonial-sophie-avatar.dim_100x100.png', width: 100, height: 100 },
  { filename: 'scada-benefits-infographic.dim_800x500.png', width: 800, height: 500 }
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
  
  console.log('Success: Production index.html exists!\n');
  
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
    console.error('  1. Check that vite.config.ts has correct build.outDir setting');
    console.error('  2. Verify that the Vite build command completed successfully');
    console.error('  3. Check for build errors in the console output above');
    console.error('  4. Ensure frontend/src/main.tsx exists and is valid');
    console.error('');
    process.exit(1);
  }
  
  // Count and verify bundle files
  const bundleFiles = fs.readdirSync(distAssetsPath);
  const jsFiles = bundleFiles.filter(f => f.endsWith('.js'));
  const cssFiles = bundleFiles.filter(f => f.endsWith('.css'));
  
  console.log(`Vite bundle output (frontend/dist/assets/):`);
  console.log(`  JavaScript bundles: ${jsFiles.length}`);
  console.log(`  CSS bundles: ${cssFiles.length}`);
  console.log(`  Total files: ${bundleFiles.length}`);
  console.log('');
  
  if (jsFiles.length === 0) {
    console.error('CRITICAL ERROR: No JavaScript bundles found in frontend/dist/assets/!');
    console.error('');
    console.error('The build produced a dist/assets/ directory but it contains no .js files.');
    console.error('This will cause a black screen because React cannot load.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Check the Vite build logs for errors');
    console.error('  2. Verify that frontend/src/main.tsx exists and is valid');
    console.error('  3. Check that vite.config.ts has correct rollupOptions.input');
    console.error('  4. Try running: cd frontend && npm run build');
    console.error('');
    process.exit(1);
  }
  
  if (cssFiles.length === 0) {
    console.warn('WARNING: No CSS bundles found in frontend/dist/assets/');
    console.warn('The app may load but will have no styling.');
    console.warn('');
  }
  
  console.log('Success: Vite bundle output verified!\n');
  
  // Check if dist/generated directory exists
  console.log('Step 3: Verifying generated asset directories...\n');
  
  if (!fs.existsSync(distGeneratedPath)) {
    console.error('CRITICAL ERROR: frontend/dist/generated directory does not exist!');
    console.error('Expected path:', distGeneratedPath);
    console.error('');
    console.error('Generated assets (images) are required for production.');
    console.error('Without them, pages will show broken images and 404 errors.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Verify that frontend/public/generated exists and contains PNG files');
    console.error('  2. Check that vite.config.ts has publicDir set to "public"');
    console.error('  3. Ensure the Vite build copied public/ contents to dist/');
    console.error('  4. Try running: npm run extract-assets-all');
    console.error('');
    process.exit(1);
  }

  // Check if public/generated directory exists
  if (!fs.existsSync(publicGeneratedPath)) {
    console.error('CRITICAL ERROR: frontend/public/generated directory does not exist!');
    console.error('Expected path:', publicGeneratedPath);
    console.error('');
    console.error('Source assets are missing. Run asset extraction first.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Run: npm run extract-assets-all');
    console.error('  2. Verify that scripts/copy-assets-from-storage.js exists');
    console.error('  3. Check ASSET_EXTRACTION_GUIDE.md for details');
    console.error('');
    process.exit(1);
  }

  // Count files in public/generated
  const publicFiles = fs.readdirSync(publicGeneratedPath).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'].includes(ext);
  });

  // Count files in dist/generated
  const distFiles = fs.readdirSync(distGeneratedPath).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'].includes(ext);
  });

  console.log(`Source (public/generated): ${publicFiles.length} image files`);
  console.log(`Build output (dist/generated): ${distFiles.length} image files\n`);

  if (distFiles.length === 0) {
    console.error('CRITICAL ERROR: No image assets were copied to dist/generated!');
    console.error('');
    console.error('Vite did not copy assets from public/generated to dist/generated.');
    console.error('This will cause 404 errors for all images in production.');
    console.error('');
    console.error('Troubleshooting steps:');
    console.error('  1. Ensure publicDir is set to "public" in vite.config.ts');
    console.error('  2. Verify that frontend/public/generated contains PNG files');
    console.error('  3. Try running: npm run extract-assets-all && cd frontend && npm run build');
    console.error('');
    process.exit(1);
  }

  if (distFiles.length < publicFiles.length) {
    console.warn(`Warning: Only ${distFiles.length} of ${publicFiles.length} images were copied\n`);
    
    // Find missing files
    const missingFiles = publicFiles.filter(file => !distFiles.includes(file));
    if (missingFiles.length > 0 && missingFiles.length <= 10) {
      console.log('Missing files:');
      missingFiles.forEach(file => console.log(`  - ${file}`));
      console.log('');
    }
  } else {
    console.log('Success: All image assets copied successfully!\n');
  }

  // Verify required PNG files with dimension validation
  console.log('Step 4: Required PNG asset verification:\n');
  
  let hasErrors = false;
  const errors = [];

  for (const requiredPng of REQUIRED_PNGS) {
    const { filename, width: expectedWidth, height: expectedHeight } = requiredPng;
    
    // Check in public/generated
    const publicPath = path.join(publicGeneratedPath, filename);
    const publicExists = fs.existsSync(publicPath);
    
    // Check in dist/generated
    const distPath = path.join(distGeneratedPath, filename);
    const distExists = fs.existsSync(distPath);
    
    if (!publicExists) {
      console.error(`Error: ${filename} - NOT FOUND in public/generated`);
      errors.push(`${filename} is missing from public/generated`);
      hasErrors = true;
      continue;
    }
    
    if (!distExists) {
      console.error(`Error: ${filename} - NOT FOUND in dist/generated (exists in public but not copied)`);
      errors.push(`${filename} exists in public/generated but was not copied to dist/generated`);
      hasErrors = true;
      continue;
    }
    
    // Validate dimensions in public/generated
    const publicDimensions = getPNGDimensions(publicPath);
    if (!publicDimensions) {
      console.error(`Error: ${filename} - INVALID PNG format in public/generated`);
      errors.push(`${filename} is not a valid PNG file in public/generated`);
      hasErrors = true;
      continue;
    }
    
    if (publicDimensions.width !== expectedWidth || publicDimensions.height !== expectedHeight) {
      console.error(`Error: ${filename} - DIMENSION MISMATCH in public/generated`);
      console.error(`  Expected: ${expectedWidth}x${expectedHeight}px`);
      console.error(`  Actual: ${publicDimensions.width}x${publicDimensions.height}px`);
      errors.push(`${filename} has incorrect dimensions in public/generated (expected ${expectedWidth}x${expectedHeight}px, got ${publicDimensions.width}x${publicDimensions.height}px)`);
      hasErrors = true;
      continue;
    }
    
    // Validate dimensions in dist/generated
    const distDimensions = getPNGDimensions(distPath);
    if (!distDimensions) {
      console.error(`Error: ${filename} - INVALID PNG format in dist/generated`);
      errors.push(`${filename} is not a valid PNG file in dist/generated`);
      hasErrors = true;
      continue;
    }
    
    if (distDimensions.width !== expectedWidth || distDimensions.height !== expectedHeight) {
      console.error(`Error: ${filename} - DIMENSION MISMATCH in dist/generated`);
      console.error(`  Expected: ${expectedWidth}x${expectedHeight}px`);
      console.error(`  Actual: ${distDimensions.width}x${distDimensions.height}px`);
      errors.push(`${filename} has incorrect dimensions in dist/generated (expected ${expectedWidth}x${expectedHeight}px, got ${distDimensions.width}x${distDimensions.height}px)`);
      hasErrors = true;
      continue;
    }
    
    console.log(`  Success: ${filename} - ${expectedWidth}x${expectedHeight}px (verified in both locations)`);
  }

  console.log('');

  // Verify Device Integration Guides logo assets
  console.log('Step 5: Device Integration Guides logo verification:\n');
  
  const deviceGuideLogos = [
    'emporia-logo-transparent.dim_150x150.png',
    'sense-logo-transparent.dim_150x150.png',
    'iotawatt-logo-transparent.dim_150x150.png',
    'home-assistant-logo-transparent.dim_150x150.png',
    'shelly-logo-transparent.dim_150x150.png',
    'aubess-tuya-logo-transparent.dim_150x150.png',
    'tesla-powerwall-logo-transparent.dim_150x150.png',
    'enphase-envoy-logo-transparent.dim_150x150.png',
    'solaredge-logo-transparent.dim_150x150.png',
    'generac-pwrcell-logo-transparent.dim_150x150.png',
    'span-smart-panel-logo-transparent.dim_150x150.png',
    'neocharge-logo-transparent.dim_150x150.png',
    'rainforest-eagle-logo-transparent.dim_150x150.png',
    'utility-direct-integration-logo-transparent.dim_150x150.png'
  ];

  let missingDeviceLogos = [];
  deviceGuideLogos.forEach(logo => {
    if (distFiles.includes(logo)) {
      console.log(`  Success: ${logo}`);
    } else if (publicFiles.includes(logo)) {
      console.log(`  Warning: ${logo} (exists in source but not copied)`);
      missingDeviceLogos.push(logo);
    } else {
      console.log(`  Error: ${logo} (not found in source)`);
      missingDeviceLogos.push(logo);
    }
  });

  if (missingDeviceLogos.length > 0) {
    console.error(`\nError: ${missingDeviceLogos.length} Device Integration Guides logo(s) missing`);
    console.log('Tip: These images are required for the Device Integration Guides page');
    hasErrors = true;
  }

  // Log individual image verification for key assets
  console.log('\nStep 6: Key asset verification:\n');
  
  const keyAssets = [
    'hero-background-globe.dim_1920x1080.png',
    'ecopowerhub-ai-logo-transparent.dim_200x200.png',
    'ecopowerhub-ai-dashboard.dim_800x600.png',
    'device-setup-cards.dim_900x500.png'
  ];

  keyAssets.forEach(asset => {
    if (distFiles.includes(asset)) {
      console.log(`  Success: ${asset}`);
    } else if (publicFiles.includes(asset)) {
      console.log(`  Warning: ${asset} (exists in source but not copied)`);
    } else {
      console.log(`  Info: ${asset} (not found in source)`);
    }
  });

  console.log(`\nTotal image assets successfully copied: ${distFiles.length}`);
  console.log(`Image types: PNG (${distFiles.filter(f => f.endsWith('.png')).length}), JPG (${distFiles.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg')).length}), SVG (${distFiles.filter(f => f.endsWith('.svg')).length})\n`);

  if (hasErrors) {
    console.error('=== Build verification FAILED! ===\n');
    console.error('Summary of errors:');
    errors.forEach((error, index) => {
      console.error(`  ${index + 1}. ${error}`);
    });
    console.error('');
    console.error('Production deployment will fail or show broken images.');
    console.error('Fix the errors above before deploying to production.');
    console.error('');
    process.exit(1);
  }

  console.log('=== Build verification complete - all checks passed! ===\n');
  console.log('Production build is ready for deployment to Internet Computer.');
  console.log('');
} catch (error) {
  console.error('Error during verification:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
