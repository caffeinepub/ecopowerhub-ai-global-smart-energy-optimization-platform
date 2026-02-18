import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile } from '../backend';
import type {
  SystemConfig,
  SystemConfigPublic,
  EnergyData,
  Recommendation,
  PredictiveModel,
  RegionalPricingModel,
  SupportedDevice,
  AlarmConfig,
  ScheduledUpdate,
  WeatherData,
  EnergySummary,
  MotivationalMessage,
  PricingTier,
  ScadaProtocolSupport,
  CaseStudy,
  ValueProposition,
  ManufacturerSupport,
  SupportBoundary,
  MaintenanceDashboard,
  DiagnosticEvent,
  ErrorCode,
  DeviceHealth,
} from '../backend';
import type {
  EVProvider,
  EVOAuthConfig,
  EVTelemetry,
} from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Check Query
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Supported Languages (hardcoded list - no backend storage needed)
export function useGetSupportedLanguages() {
  return useQuery<string[]>({
    queryKey: ['supportedLanguages'],
    queryFn: async () => {
      return ['English', 'Spanish', 'Mandarin', 'Hindi', 'Swahili', 'Arabic', 'French', 'Portuguese', 'Indonesian'];
    },
  });
}

// System Configuration Queries
export function useGetAllSystemConfigs() {
  const { actor, isFetching } = useActor();

  return useQuery<SystemConfigPublic[]>({
    queryKey: ['systemConfigs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSystemConfigs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSystemConfigsFull() {
  const { actor, isFetching } = useActor();

  return useQuery<SystemConfig[]>({
    queryKey: ['systemConfigsFull'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSystemConfigsFull();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSystemConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: SystemConfig) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addSystemConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

export function useUpdateSystemConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: SystemConfig) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateSystemConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

export function useDeleteSystemConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (systemId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteSystemConfig(systemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

// Energy Data Queries
export function useGetAllEnergyData() {
  const { actor, isFetching } = useActor();

  return useQuery<EnergyData[]>({
    queryKey: ['energyData'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnergyData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddEnergyData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EnergyData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEnergyData(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energyData'] });
    },
  });
}

// Recommendations Queries
export function useGetAllRecommendations() {
  const { actor, isFetching } = useActor();

  return useQuery<Recommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      if (!actor) return [];
      // Get all system configs to fetch recommendations for each
      const configs = await actor.getAllSystemConfigs();
      const allRecommendations: Recommendation[] = [];
      for (const config of configs) {
        const recs = await actor.getRecommendations(config.systemId);
        allRecommendations.push(...recs);
      }
      return allRecommendations;
    },
    enabled: !!actor && !isFetching,
  });
}

// Supported Devices Queries
export function useGetAllSupportedDevices() {
  const { actor, isFetching } = useActor();

  return useQuery<SupportedDevice[]>({
    queryKey: ['supportedDevices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSupportedDevices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSupportedDevices(region: string) {
  const { actor, isFetching } = useActor();

  return useQuery<SupportedDevice[]>({
    queryKey: ['supportedDevices', region],
    queryFn: async () => {
      if (!actor) return [];
      const allDevices = await actor.getAllSupportedDevices();
      return allDevices.filter((device) => device.region === region);
    },
    enabled: !!actor && !isFetching,
  });
}

// Alarm Configuration Queries
export function useGetAllAlarmConfigs() {
  const { actor, isFetching } = useActor();

  return useQuery<AlarmConfig[]>({
    queryKey: ['alarmConfigs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAlarmConfigs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddAlarmConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: AlarmConfig) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addAlarmConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

export function useUpdateAlarmConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: AlarmConfig) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAlarmConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

export function useDeleteAlarmConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alarmId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteAlarmConfig(alarmId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

// Deployment URL (static)
export function useGetDeploymentUrl() {
  return useQuery<string>({
    queryKey: ['deploymentUrl'],
    queryFn: async () => {
      return 'https://ecopowerhub.ai';
    },
  });
}

// Pricing Tiers Queries
export function useGetAllPricingTiers() {
  const { actor, isFetching } = useActor();

  return useQuery<PricingTier[]>({
    queryKey: ['pricingTiers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPricingTiers();
    },
    enabled: !!actor && !isFetching,
  });
}

// SCADA Protocol Support Queries
export function useGetAllScadaProtocolSupport() {
  const { actor, isFetching } = useActor();

  return useQuery<ScadaProtocolSupport[]>({
    queryKey: ['scadaProtocols'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScadaProtocols();
    },
    enabled: !!actor && !isFetching,
  });
}

// Case Studies Queries
export function useGetAllCaseStudies() {
  const { actor, isFetching } = useActor();

  return useQuery<CaseStudy[]>({
    queryKey: ['caseStudies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCaseStudies();
    },
    enabled: !!actor && !isFetching,
  });
}

// Value Propositions Queries
export function useGetAllValuePropositions() {
  const { actor, isFetching } = useActor();

  return useQuery<ValueProposition[]>({
    queryKey: ['valuePropositions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllValuePropositions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Manufacturer Support Queries
export function useGetAllManufacturerSupport() {
  const { actor, isFetching } = useActor();

  return useQuery<ManufacturerSupport[]>({
    queryKey: ['manufacturerSupport'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllManufacturerSupport();
    },
    enabled: !!actor && !isFetching,
  });
}

// Support Boundaries Queries
export function useGetAllSupportBoundaries() {
  const { actor, isFetching } = useActor();

  return useQuery<SupportBoundary[]>({
    queryKey: ['supportBoundaries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSupportBoundaries();
    },
    enabled: !!actor && !isFetching,
  });
}

// EV OAuth Configuration Queries
export function useGetEVOAuthConfig(provider: EVProvider) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EVOAuthConfig | null>({
    queryKey: ['evOAuthConfig', provider],
    queryFn: async () => {
      if (!actor || !identity) return null;
      const userId = identity.getPrincipal();
      return actor.getEVOAuthConfig(userId, provider);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useAddEVOAuthConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: EVOAuthConfig) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEVOAuthConfig(config);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evOAuthConfig', variables.provider] });
    },
  });
}

export function useDeleteEVOAuthConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provider: EVProvider) => {
      if (!actor) throw new Error('Actor not available');
      // Note: Backend doesn't have a delete method, so we'd need to add one
      // For now, this is a placeholder
      throw new Error('Delete EV OAuth config not yet implemented in backend');
    },
    onSuccess: (_, provider) => {
      queryClient.invalidateQueries({ queryKey: ['evOAuthConfig', provider] });
      queryClient.invalidateQueries({ queryKey: ['evTelemetry'] });
    },
  });
}

// EV Telemetry Queries
export function useGetEVTelemetry(provider: EVProvider, vehicleId: string) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EVTelemetry | null>({
    queryKey: ['evTelemetry', provider, vehicleId],
    queryFn: async () => {
      if (!actor || !identity) return null;
      const userId = identity.getPrincipal();
      const allTelemetry = await actor.getEVTelemetry(userId);
      return allTelemetry.find((t) => t.provider === provider && t.vehicleId === vehicleId) || null;
    },
    enabled: !!actor && !isFetching && !!identity,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
}

export function useGetAllEVTelemetry() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EVTelemetry[]>({
    queryKey: ['evTelemetry'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const userId = identity.getPrincipal();
      return actor.getEVTelemetry(userId);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useAddEVTelemetry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (telemetry: EVTelemetry) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEVTelemetry(telemetry);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evTelemetry', variables.provider, variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ['evTelemetry'] });
    },
  });
}

// Maintenance Dashboard Queries (Admin only)
export function useGetMaintenanceDashboard() {
  const { actor, isFetching } = useActor();

  return useQuery<MaintenanceDashboard>({
    queryKey: ['maintenanceDashboard'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMaintenanceDashboard();
    },
    enabled: !!actor && !isFetching,
  });
}

// Diagnostic Events Queries
export function useGetAllDiagnosticEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<DiagnosticEvent[]>({
    queryKey: ['diagnosticEvents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDiagnosticEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDiagnosticEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: DiagnosticEvent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDiagnosticEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosticEvents'] });
    },
  });
}

// Error Code Database Queries
export function useGetAllErrorCodes() {
  const { actor, isFetching } = useActor();

  return useQuery<ErrorCode[]>({
    queryKey: ['errorCodes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllErrorCodes();
    },
    enabled: !!actor && !isFetching,
  });
}

// Device Health Queries
export function useGetAllDeviceHealth() {
  const { actor, isFetching } = useActor();

  return useQuery<DeviceHealth[]>({
    queryKey: ['deviceHealth'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDeviceHealth();
    },
    enabled: !!actor && !isFetching,
  });
}
