export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  hi: 'हिन्दी',
  sw: 'Kiswahili',
  ar: 'العربية',
  id: 'Bahasa Indonesia',
} as const;

export const SUPPORTED_REGIONS = {
  'North America': ['US', 'Canada'],
  'Latin America': ['Mexico', 'Brazil', 'Argentina'],
  'Western Europe': ['UK', 'Germany', 'France'],
  'Northern Europe': ['Sweden', 'Norway', 'Denmark', 'Finland'],
  'Southern Europe': ['Spain', 'Italy', 'Greece'],
  'East Asia': ['Japan', 'South Korea', 'China'],
  'South Asia': ['India', 'Pakistan', 'Bangladesh'],
  'Southeast Asia': ['Indonesia', 'Philippines', 'Thailand', 'Vietnam'],
  'East Africa': ['Kenya', 'Tanzania', 'Uganda'],
  'West Africa': ['Nigeria', 'Ghana', 'Senegal'],
  'North Africa': ['Morocco', 'Egypt', 'Tunisia'],
  'Southern Africa': ['South Africa', 'Zimbabwe', 'Botswana'],
  'Oceania': ['Australia', 'New Zealand'],
} as const;

export const REGION_LABELS: Record<string, string> = {
  'US': 'United States',
  'Canada': 'Canada',
  'UK': 'United Kingdom',
  'Germany': 'Germany',
  'France': 'France',
  'Spain': 'Spain',
  'Italy': 'Italy',
  'China': 'China',
  'Japan': 'Japan',
  'India': 'India',
  'Singapore': 'Singapore',
  'South Africa': 'South Africa',
  'Nigeria': 'Nigeria',
  'Kenya': 'Kenya',
  'Australia': 'Australia',
  'New Zealand': 'New Zealand',
};

export const DEVICE_BRANDS = [
  { value: 'Sense', label: 'Sense (with Flex)' },
  { value: 'NeoCharge', label: 'NeoCharge' },
  { value: 'Emporia', label: 'Emporia' },
  { value: 'Shelly', label: 'Shelly EM' },
  { value: 'Aubess', label: 'Aubess Smart Energy Meter (Tuya)' },
  { value: 'Sonoff', label: 'Sonoff POW Elite' },
  { value: 'Tesla', label: 'Tesla Energy' },
  { value: 'Enphase', label: 'Enphase' },
  { value: 'SolarEdge', label: 'SolarEdge' },
  { value: 'Nest', label: 'Nest' },
  { value: 'Panasonic', label: 'Panasonic' },
  { value: 'Other', label: 'Other' },
] as const;

export const SYSTEM_TYPES = [
  { value: 'Energy Monitoring', label: 'Energy Monitoring' },
  { value: 'Energy Management', label: 'Energy Management' },
  { value: 'HVAC', label: 'HVAC System' },
  { value: 'Lighting', label: 'Lighting Control' },
  { value: 'Solar', label: 'Solar Panel' },
  { value: 'Battery', label: 'Battery Storage' },
  { value: 'EV Charger', label: 'EV Charger' },
  { value: 'Smart Meter', label: 'Smart Meter' },
  { value: 'Other', label: 'Other' },
] as const;

// RTL languages
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export function isRTL(language: string): boolean {
  return RTL_LANGUAGES.includes(language);
}

// Temperature conversion utilities
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

// Get user's preferred temperature unit based on region
export function getTemperatureUnit(region: string): 'C' | 'F' {
  const fahrenheitRegions = ['US'];
  return fahrenheitRegions.includes(region) ? 'F' : 'C';
}

// Format temperature with appropriate unit
export function formatTemperature(celsius: number, region: string): string {
  const unit = getTemperatureUnit(region);
  const temp = unit === 'F' ? celsiusToFahrenheit(celsius) : celsius;
  return `${temp.toFixed(1)}°${unit}`;
}

// Format timestamp in user's local timezone
export function formatTimestamp(timestamp: bigint, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(Number(timestamp) / 1000000);
  return date.toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...options,
  });
}

// Get user's timezone
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Regional device mapping for voice guidance
export const REGIONAL_DEVICE_MAPPING: Record<string, string> = {
  'north-america-us': 'Nest',
  'east-asia-jp': 'Panasonic',
  'east-africa-ke': 'Local Inverter',
  'east-africa-tz': 'Local Inverter',
  'west-africa-ng': 'Local Inverter',
  'west-africa-gh': 'Local Inverter',
  'south-asia': 'Local Smart Meter',
  'southeast-asia-id': 'Local Smart Meter',
  'southeast-asia-ph': 'Local Smart Meter',
};

// Get recommended device for region
export function getRegionalDevice(regionCode: string): string {
  return REGIONAL_DEVICE_MAPPING[regionCode] || 'Smart Meter';
}

// Language-specific voice settings
export const LANGUAGE_VOICE_MAP: Record<string, string> = {
  'en': 'en-US',
  'es': 'es-ES',
  'zh': 'zh-CN',
  'hi': 'hi-IN',
  'sw': 'sw-KE',
  'ar': 'ar-SA',
  'id': 'id-ID',
  'de': 'de-DE',
  'fr': 'fr-FR',
};

// Get voice language code for speech synthesis
export function getVoiceLanguage(languageCode: string): string {
  return LANGUAGE_VOICE_MAP[languageCode] || 'en-US';
}
