import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
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
  EVProvider,
  EVOAuthConfig,
  EVTelemetry,
} from '../types';

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

// Mock queries for features not yet implemented in backend
// These return empty/mock data until backend implementation is complete

export function useGetSupportedLanguages() {
  return useQuery<string[]>({
    queryKey: ['supportedLanguages'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return ['English', 'Spanish', 'Mandarin', 'Hindi', 'Swahili', 'Arabic'];
    },
  });
}

export function useGetAllSystemConfigs() {
  return useQuery<SystemConfigPublic[]>({
    queryKey: ['systemConfigs'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllSystemConfigsFull() {
  return useQuery<SystemConfig[]>({
    queryKey: ['systemConfigsFull'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useAddSystemConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: SystemConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Adding system config:', config);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

export function useUpdateSystemConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: SystemConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Updating system config:', config);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

export function useDeleteSystemConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (systemId: string) => {
      // Mock implementation - backend not yet implemented
      console.log('Deleting system config:', systemId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] });
      queryClient.invalidateQueries({ queryKey: ['systemConfigsFull'] });
    },
  });
}

export function useGetAllEnergyData() {
  return useQuery<EnergyData[]>({
    queryKey: ['energyData'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useAddEnergyData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EnergyData) => {
      // Mock implementation - backend not yet implemented
      console.log('Adding energy data:', data);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energyData'] });
    },
  });
}

export function useGetAllRecommendations() {
  return useQuery<Recommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllSupportedDevices() {
  return useQuery<SupportedDevice[]>({
    queryKey: ['supportedDevices'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetSupportedDevices(region: string) {
  return useQuery<SupportedDevice[]>({
    queryKey: ['supportedDevices', region],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      console.log('Getting supported devices for region:', region);
      return [];
    },
  });
}

export function useGetAllAlarmConfigs() {
  return useQuery<AlarmConfig[]>({
    queryKey: ['alarmConfigs'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useAddAlarmConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: AlarmConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Adding alarm config:', config);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

export function useUpdateAlarmConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: AlarmConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Updating alarm config:', config);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

export function useDeleteAlarmConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alarmId: string) => {
      // Mock implementation - backend not yet implemented
      console.log('Deleting alarm config:', alarmId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarmConfigs'] });
    },
  });
}

export function useGetDeploymentUrl() {
  return useQuery<string>({
    queryKey: ['deploymentUrl'],
    queryFn: async () => {
      // Return the production URL
      return 'https://ecopowerhub.ai';
    },
  });
}

export function useGetAllPricingTiers() {
  return useQuery<PricingTier[]>({
    queryKey: ['pricingTiers'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllScadaProtocolSupport() {
  return useQuery<ScadaProtocolSupport[]>({
    queryKey: ['scadaProtocols'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllCaseStudies() {
  return useQuery<CaseStudy[]>({
    queryKey: ['caseStudies'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllValuePropositions() {
  return useQuery<ValueProposition[]>({
    queryKey: ['valuePropositions'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllManufacturerSupport() {
  return useQuery<ManufacturerSupport[]>({
    queryKey: ['manufacturerSupport'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetAllSupportBoundaries() {
  return useQuery<SupportBoundary[]>({
    queryKey: ['supportBoundaries'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useGetEVOAuthConfig(provider: EVProvider) {
  return useQuery<EVOAuthConfig | null>({
    queryKey: ['evOAuthConfig', provider],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      console.log('Getting EV OAuth config for provider:', provider);
      return null;
    },
  });
}

export function useAddEVOAuthConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: EVOAuthConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Adding EV OAuth config:', config);
      return Promise.resolve();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evOAuthConfig', variables.provider] });
    },
  });
}

export function useUpdateEVOAuthConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: EVOAuthConfig) => {
      // Mock implementation - backend not yet implemented
      console.log('Updating EV OAuth config:', config);
      return Promise.resolve();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evOAuthConfig', variables.provider] });
    },
  });
}

export function useDeleteEVOAuthConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provider: EVProvider) => {
      // Mock implementation - backend not yet implemented
      console.log('Deleting EV OAuth config for provider:', provider);
      return Promise.resolve();
    },
    onSuccess: (_, provider) => {
      queryClient.invalidateQueries({ queryKey: ['evOAuthConfig', provider] });
      queryClient.invalidateQueries({ queryKey: ['evTelemetry'] });
    },
  });
}

export function useGetEVTelemetry(provider: EVProvider, vehicleId: string) {
  return useQuery<EVTelemetry | null>({
    queryKey: ['evTelemetry', provider, vehicleId],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      console.log('Getting EV telemetry for provider:', provider, 'vehicle:', vehicleId);
      return null;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
}

export function useGetAllEVTelemetry() {
  return useQuery<EVTelemetry[]>({
    queryKey: ['evTelemetry'],
    queryFn: async () => {
      // Mock data - backend not yet implemented
      return [];
    },
  });
}

export function useAddEVTelemetry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (telemetry: EVTelemetry) => {
      // Mock implementation - backend not yet implemented
      console.log('Adding EV telemetry:', telemetry);
      return Promise.resolve();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evTelemetry', variables.provider, variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ['evTelemetry'] });
    },
  });
}
