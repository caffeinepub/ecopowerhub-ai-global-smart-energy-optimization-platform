// Local type definitions for frontend use
// These types mirror the backend structure but are defined locally
// since the backend interface doesn't export them

import type { Principal } from '@icp-sdk/core/principal';

export interface SystemConfig {
  systemId: string;
  apiEndpoint: string;
  systemType: string;
  authToken: string;
  brand: string;
  region: string;
  owner: Principal;
}

export interface SystemConfigPublic {
  systemId: string;
  apiEndpoint: string;
  systemType: string;
  brand: string;
  region: string;
}

export interface EnergyData {
  timestamp: bigint;
  systemId: string;
  energyConsumption: number;
  temperature: number;
  location: string;
  timeZone: string;
}

export interface Recommendation {
  id: string;
  systemId: string;
  message: string;
  language: string;
  timestamp: bigint;
  region: string;
}

export interface PredictiveModel {
  modelId: string;
  systemId: string;
  modelData: string;
  lastUpdated: bigint;
  timeZone: string;
}

export interface RegionalPricingModel {
  region: string;
  currency: string;
  pricePerKWh: number;
  peakHours: string[];
}

export interface SupportedDevice {
  brand: string;
  model: string;
  region: string;
  systemType: string;
}

export interface AlarmConfig {
  alarmId: string;
  userId: Principal;
  wakeUpTime: bigint;
  ringTone: string;
  alertBeep: string;
  language: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ScheduledUpdate {
  updateId: string;
  userId: Principal;
  updateType: string;
  scheduleTime: bigint;
  frequency: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  timestamp: bigint;
}

export interface EnergySummary {
  systemId: string;
  totalConsumption: number;
  peakUsage: number;
  timestamp: bigint;
}

export interface MotivationalMessage {
  messageId: string;
  content: string;
  language: string;
  timestamp: bigint;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  tierType: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ScadaProtocolSupport {
  id: string;
  protocol: string;
  description: string;
  supportedDevices: string[];
  tier: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  protocolsUsed: string[];
  energySavings: number;
  reliability: number;
  region: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  targetAudience: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ManufacturerSupport {
  id: string;
  name: string;
  supportUrl: string;
  logoUrl: string;
  description: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface SupportBoundary {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export enum EVProvider {
  Ford = 'ford',
  Rivian = 'rivian',
}

export interface EVOAuthConfig {
  userId: Principal;
  provider: EVProvider;
  accessToken: string;
  refreshToken: string;
  expiresAt: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface EVTelemetry {
  userId: Principal;
  provider: EVProvider;
  vehicleId: string;
  batteryPercent: number;
  rangeKm: number;
  chargingStatus: string;
  timestamp: bigint;
}
