/**
 * Centralized paths for all generated PNG assets in /generated
 * These files are copied from frontend/public/generated to frontend/dist/generated during build
 */

export const GENERATED_ASSETS = {
  // Branding & Marketing
  ecopowerhubLogo: '/generated/energyoptim-ai-logo-transparent.dim_200x200.png',
  heroBackgroundGlobe: '/generated/hero-background-globe.dim_1920x1080.png',
  
  // Device Integration Guides - Logos
  emporiaLogo: '/generated/emporia-logo-transparent.dim_150x150.png',
  senseLogo: '/generated/sense-logo-transparent.dim_150x150.png',
  iotawattLogo: '/generated/iotawatt-logo-transparent.dim_150x150.png',
  homeAssistantLogo: '/generated/home-assistant-logo-transparent.dim_150x150.png',
  shellyLogo: '/generated/shelly-logo-transparent.dim_150x150.png',
  tuyaLogo: '/generated/aubess-tuya-logo-transparent.dim_150x150.png',
  teslaPowerwallLogo: '/generated/tesla-powerwall-logo-transparent.dim_150x150.png',
  enphaseEnvoyLogo: '/generated/enphase-envoy-logo-transparent.dim_150x150.png',
  solaredgeLogo: '/generated/solaredge-logo-transparent.dim_150x150.png',
  generacPwrcellLogo: '/generated/generac-pwrcell-logo-transparent.dim_150x150.png',
  spanSmartPanelLogo: '/generated/span-smart-panel-logo-transparent.dim_150x150.png',
  neochargeLogo: '/generated/neocharge-logo-transparent.dim_150x150.png',
  rainforestEagleLogo: '/generated/rainforest-eagle-logo-transparent.dim_150x150.png',
  utilityDirectIntegrationLogo: '/generated/utility-direct-integration-logo-transparent.dim_150x150.png',
  
  // Device Integration Guides - Setup Images
  emporiaVueGen2Setup: '/generated/emporia-vue-gen2-setup.dim_800x600.png',
  emporiaVueTutorial: '/generated/emporia-vue-220v-tutorial.dim_800x600.png',
  senseMonitorInstallation: '/generated/sense-monitor-installation.dim_800x600.png',
  iotawattSetupGuide: '/generated/iotawatt-setup-guide.dim_800x600.png',
  homeAssistantIntegration: '/generated/home-assistant-integration.dim_800x600.png',
  shellyDeviceFamily: '/generated/shelly-device-family.dim_900x500.png',
  tuyaSmartLifeIntegration: '/generated/tuya-smart-life-integration.dim_600x800.png',
  teslaPowerwallIntegration: '/generated/tesla-powerwall-integration.dim_800x600.png',
  enphaseIqSetup: '/generated/enphase-iq-setup.dim_800x600.png',
  solaredgeIntegration: '/generated/solaredge-integration.dim_800x600.png',
  generacPwrcellSetup: '/generated/generac-pwrcell-setup.dim_800x600.png',
  spanIoIntegration: '/generated/span-io-integration.dim_800x600.png',
  neochargeSetupGuide: '/generated/neocharge-setup-guide.dim_800x600.png',
  deviceSetupCards: '/generated/device-setup-cards.dim_900x500.png',
  
  // AI & Support
  aiChatbotInterface: '/generated/ai-chatbot-interface.dim_600x400.png',
  globalFaqInterface: '/generated/global-faq-interface.dim_800x400.png',
  
  // Case Studies
  caseStudiesSavingsChart: '/generated/case-studies-savings-chart.dim_800x500.png',
  residentialCaseStudyDashboard: '/generated/residential-case-study-dashboard.dim_800x600.png',
  commercialEnergyOptimization: '/generated/commercial-energy-optimization.dim_800x600.png',
  industrialEnergyCaseStudy: '/generated/industrial-energy-case-study.dim_800x600.png',
  
  // Testimonials
  testimonialMichaelAvatar: '/generated/testimonial-michael-avatar.dim_100x100.png',
  testimonialSophieAvatar: '/generated/testimonial-sophie-avatar.dim_100x100.png',
  
  // SCADA & Technical
  scadaBenefitsInfographic: '/generated/scada-benefits-infographic.dim_800x500.png',
} as const;

export type GeneratedAssetKey = keyof typeof GENERATED_ASSETS;
