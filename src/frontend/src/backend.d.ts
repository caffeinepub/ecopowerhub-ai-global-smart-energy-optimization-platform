import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ICPGatewayConfig {
    domain: string;
    errorMessage?: string;
    tlsCertificateValid: boolean;
    lastSyncTimestamp: Time;
    isRegistered: boolean;
    canisterId: string;
}
export interface PricingTier {
    id: string;
    features: Array<string>;
    tierType: string;
    name: string;
    createdAt: Time;
    description: string;
    isActive: boolean;
    updatedAt: Time;
    currency: string;
    price: number;
}
export interface EnergyData {
    temperature: number;
    systemId: string;
    timestamp: Time;
    energyConsumption: number;
    location: string;
    timeZone: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ScheduledUpdate {
    updateType: string;
    userId: Principal;
    createdAt: Time;
    isActive: boolean;
    updateId: string;
    updatedAt: Time;
    scheduleTime: Time;
    frequency: string;
}
export interface CanisterInfo {
    status: CanisterStatus;
    name: string;
    errorMessage?: string;
    lastChecked: Time;
    canisterId: string;
}
export interface DomainPortfolio {
    recommendations: string;
    strategy: string;
    lastUpdated: Time;
    variants: Array<DomainVariant>;
}
export interface ComplianceReportData {
    title: string;
    quickReferenceTable: string;
    nercCipStandards: Array<NercCipStandard>;
    generatedAt: Time;
    legalDeclaration: string;
    sections: Array<ComplianceSection>;
    nistCsfResponsibilities: string;
}
export interface MaintenanceEvent {
    id: string;
    service: string;
    status: string;
    issueType: string;
    resolution: string;
    retryCount: bigint;
    timeToResolution: bigint;
    timestamp: Time;
    rootCause: string;
}
export interface ComplianceSection {
    title: string;
    content: string;
    subsections: Array<ComplianceSubsection>;
}
export interface EVOAuthConfig {
    expiresAt: Time;
    provider: EVProvider;
    refreshToken: string;
    userId: Principal;
    createdAt: Time;
    updatedAt: Time;
    accessToken: string;
}
export interface ErrorCode {
    manufacturer: string;
    code: string;
    createdAt: Time;
    supportUrl: string;
    description: string;
    isActive: boolean;
    updatedAt: Time;
    plainEnglishMessage: string;
}
export interface SystemHealth {
    activeProcesses: Array<string>;
    dataSyncStatus: ServiceStatus;
    deviceIntegrationStatus: ServiceStatus;
    backendStatus: ServiceStatus;
    networkStatus: ServiceStatus;
    uptime: number;
    performanceMetrics: string;
    overallStatus: ServiceStatus;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface SupportContract {
    expiresAt: Time;
    userId: Principal;
    tier: string;
    isActive: boolean;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface MaintenanceDashboard {
    optimizationSuggestions: Array<string>;
    learningUpdates: Array<LearningUpdate>;
    config: MaintenanceConfig;
    systemHealth: SystemHealth;
    recentEvents: Array<MaintenanceEvent>;
}
export interface DomainStatus {
    isAccessible: boolean;
    sslValid: boolean;
    lastChecked: Time;
    primaryDomain: string;
}
export interface CaseStudy {
    id: string;
    region: string;
    protocolsUsed: Array<string>;
    title: string;
    createdAt: Time;
    description: string;
    reliability: number;
    updatedAt: Time;
    energySavings: number;
}
export interface WeatherData {
    temperature: number;
    timestamp: Time;
    location: string;
    condition: string;
}
export interface SystemConfigPublic {
    region: string;
    systemId: string;
    apiEndpoint: string;
    brand: string;
    systemType: string;
}
export interface DNSSyncResult {
    domain: string;
    message: string;
    timestamp: Time;
    success: boolean;
}
export interface SystemConfig {
    region: string;
    authToken: string;
    owner: Principal;
    systemId: string;
    apiEndpoint: string;
    brand: string;
    systemType: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface DiagnosticCheckResult {
    status: string;
    message: string;
    checkType: string;
    timestamp: Time;
}
export interface PredictiveModel {
    lastUpdated: Time;
    systemId: string;
    modelData: string;
    modelId: string;
    timeZone: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface ComplianceSubsection {
    title: string;
    content: string;
}
export interface MotivationalMessage {
    content: string;
    messageId: string;
    language: string;
    timestamp: Time;
}
export interface LearningUpdate {
    id: string;
    impact: string;
    issuePattern: string;
    deviceCorrelation: string;
    timestamp: Time;
    optimizationSuggestion: string;
}
export interface EVTelemetry {
    provider: EVProvider;
    batteryPercent: number;
    userId: Principal;
    chargingStatus: string;
    timestamp: Time;
    rangeKm: number;
    vehicleId: string;
}
export interface UserProfile {
    preferredLanguage: string;
    name: string;
}
export interface ValueProposition {
    id: string;
    title: string;
    createdAt: Time;
    description: string;
    targetAudience: string;
    updatedAt: Time;
    benefits: Array<string>;
}
export type Time = bigint;
export interface SupportedDevice {
    region: string;
    model: string;
    brand: string;
    systemType: string;
}
export interface DeviceHealth {
    tagId: string;
    userId: Principal;
    quality: DeviceQuality;
    lastValue?: string;
    deviceId: string;
    lastChecked: Time;
    lastValueTimestamp: Time;
}
export interface DiagnosticFeedback {
    id: string;
    userId: Principal;
    comment?: string;
    wasHelpful: boolean;
    diagnosticEventId: string;
    timestamp: Time;
}
export interface ManufacturerSupport {
    id: string;
    name: string;
    createdAt: Time;
    supportUrl: string;
    description: string;
    isActive: boolean;
    updatedAt: Time;
    logoUrl: string;
}
export interface EnergySummary {
    totalConsumption: number;
    systemId: string;
    peakUsage: number;
    timestamp: Time;
}
export interface RegionalPricingModel {
    region: string;
    peakHours: Array<string>;
    pricePerKWh: number;
    currency: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Recommendation {
    id: string;
    region: string;
    systemId: string;
    language: string;
    message: string;
    timestamp: Time;
}
export interface ScadaProtocolSupport {
    id: string;
    protocol: string;
    createdAt: Time;
    tier: string;
    description: string;
    isActive: boolean;
    supportedDevices: Array<string>;
    updatedAt: Time;
}
export interface NercCipStandard {
    title: string;
    description: string;
    standardId: string;
    purpose: string;
}
export interface SupportBoundary {
    id: string;
    createdAt: Time;
    description: string;
    isActive: boolean;
    updatedAt: Time;
}
export interface DiagnosticEvent {
    id: string;
    status: string;
    tagId: string;
    manufacturerReferralUrl?: string;
    userId: Principal;
    quality: DeviceQuality;
    errorCode?: string;
    diagnosis: string;
    progressPercent: bigint;
    deviceId: string;
    timestamp: Time;
    suggestedActions: Array<string>;
    checks: Array<DiagnosticCheckResult>;
}
export interface DeploymentStatus {
    canisters: Array<CanisterInfo>;
    timestamp: Time;
    overallStatus: string;
    domainStatus: DomainStatus;
}
export interface DomainVariant {
    domain: string;
    isAvailable: boolean;
    registrar: string;
    lastChecked: Time;
    priceUsd: number;
}
export interface AlarmConfig {
    alertBeep: string;
    ringTone: string;
    alarmId: string;
    userId: Principal;
    createdAt: Time;
    wakeUpTime: Time;
    isActive: boolean;
    language: string;
    updatedAt: Time;
}
export interface MaintenanceConfig {
    alertEscalationThreshold: bigint;
    createdAt: Time;
    autoRepairThreshold: bigint;
    maxRetries: bigint;
    isActive: boolean;
    updatedAt: Time;
}
export enum CanisterStatus {
    failing = "failing",
    offline = "offline",
    unknown_ = "unknown",
    online = "online"
}
export enum DeviceQuality {
    bad = "bad",
    good = "good",
    uncertain = "uncertain"
}
export enum EVProvider {
    ford = "ford",
    rivian = "rivian"
}
export enum ServiceStatus {
    unhealthy = "unhealthy",
    healthy = "healthy",
    degraded = "degraded",
    unknown_ = "unknown"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAlarmConfig(alarm: AlarmConfig): Promise<void>;
    addCaseStudy(study: CaseStudy): Promise<void>;
    addDNSSyncResult(result: DNSSyncResult): Promise<void>;
    addDiagnosticEvent(event: DiagnosticEvent): Promise<void>;
    addDiagnosticFeedback(feedback: DiagnosticFeedback): Promise<void>;
    addEVOAuthConfig(config: EVOAuthConfig): Promise<void>;
    addEVTelemetry(telemetry: EVTelemetry): Promise<void>;
    addEnergyData(data: EnergyData): Promise<void>;
    addEnergySummary(summary: EnergySummary): Promise<void>;
    addErrorCode(errorCode: ErrorCode): Promise<void>;
    addICPGatewayConfig(config: ICPGatewayConfig): Promise<void>;
    addLearningUpdate(update: LearningUpdate): Promise<void>;
    addMaintenanceEvent(event: MaintenanceEvent): Promise<void>;
    addManufacturerSupport(support: ManufacturerSupport): Promise<void>;
    addMotivationalMessage(message: MotivationalMessage): Promise<void>;
    addPredictiveModel(model: PredictiveModel): Promise<void>;
    addPricingTier(tier: PricingTier): Promise<void>;
    addRecommendation(rec: Recommendation): Promise<void>;
    addRegionalPricingModel(model: RegionalPricingModel): Promise<void>;
    addScadaProtocol(protocol: ScadaProtocolSupport): Promise<void>;
    addScheduledUpdate(update: ScheduledUpdate): Promise<void>;
    addSupportBoundary(boundary: SupportBoundary): Promise<void>;
    addSupportContract(contract: SupportContract): Promise<void>;
    addSupportedDevice(device: SupportedDevice): Promise<void>;
    addSystemConfig(config: SystemConfig): Promise<void>;
    addValueProposition(prop: ValueProposition): Promise<void>;
    addWeatherData(weather: WeatherData): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteAlarmConfig(alarmId: string): Promise<void>;
    deleteEnergyData(systemId: string, timestamp: Time): Promise<void>;
    deletePredictiveModel(modelId: string): Promise<void>;
    deleteRecommendation(id: string): Promise<void>;
    deleteRegionalPricingModel(region: string): Promise<void>;
    deleteScheduledUpdate(updateId: string): Promise<void>;
    deleteSupportedDevice(brand: string, model: string): Promise<void>;
    deleteSystemConfig(systemId: string): Promise<void>;
    getAlarmConfig(alarmId: string): Promise<AlarmConfig | null>;
    getAllAlarmConfigs(): Promise<Array<AlarmConfig>>;
    getAllCaseStudies(): Promise<Array<CaseStudy>>;
    getAllDeviceHealth(): Promise<Array<DeviceHealth>>;
    getAllDiagnosticEvents(): Promise<Array<DiagnosticEvent>>;
    getAllEnergyData(): Promise<Array<EnergyData>>;
    getAllErrorCodes(): Promise<Array<ErrorCode>>;
    getAllICPGatewayConfigs(): Promise<Array<ICPGatewayConfig>>;
    getAllManufacturerSupport(): Promise<Array<ManufacturerSupport>>;
    getAllMotivationalMessages(): Promise<Array<MotivationalMessage>>;
    getAllPricingTiers(): Promise<Array<PricingTier>>;
    getAllRegionalPricingModels(): Promise<Array<RegionalPricingModel>>;
    getAllScadaProtocols(): Promise<Array<ScadaProtocolSupport>>;
    getAllScheduledUpdates(): Promise<Array<ScheduledUpdate>>;
    getAllSupportBoundaries(): Promise<Array<SupportBoundary>>;
    getAllSupportedDevices(): Promise<Array<SupportedDevice>>;
    getAllSystemConfigs(): Promise<Array<SystemConfigPublic>>;
    getAllSystemConfigsFull(): Promise<Array<SystemConfig>>;
    getAllValuePropositions(): Promise<Array<ValueProposition>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComplianceReportData(): Promise<ComplianceReportData | null>;
    getDNSSyncHistory(): Promise<Array<DNSSyncResult>>;
    getDeploymentStatus(): Promise<DeploymentStatus | null>;
    getDeviceHealth(deviceId: string): Promise<DeviceHealth | null>;
    getDiagnosticEvent(id: string): Promise<DiagnosticEvent | null>;
    getDiagnosticFeedback(diagnosticEventId: string): Promise<Array<DiagnosticFeedback>>;
    getDomainPortfolio(): Promise<DomainPortfolio | null>;
    getEVOAuthConfig(userId: Principal, provider: EVProvider): Promise<EVOAuthConfig | null>;
    getEVTelemetry(userId: Principal): Promise<Array<EVTelemetry>>;
    getEnergyData(systemId: string): Promise<Array<EnergyData>>;
    getEnergySummary(systemId: string): Promise<Array<EnergySummary>>;
    getErrorCode(code: string, manufacturer: string): Promise<ErrorCode | null>;
    getMaintenanceDashboard(): Promise<MaintenanceDashboard>;
    getPredictiveModel(modelId: string): Promise<PredictiveModel | null>;
    getRecommendations(systemId: string): Promise<Array<Recommendation>>;
    getRegionalPricingModel(region: string): Promise<RegionalPricingModel | null>;
    getScheduledUpdate(updateId: string): Promise<ScheduledUpdate | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getSupportContract(userId: Principal): Promise<SupportContract | null>;
    getSystemConfig(systemId: string): Promise<SystemConfigPublic | null>;
    getSystemConfigFull(systemId: string): Promise<SystemConfig | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWeatherData(location: string): Promise<WeatherData | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setComplianceReportData(data: ComplianceReportData): Promise<void>;
    setDeploymentStatus(status: DeploymentStatus): Promise<void>;
    setDomainPortfolio(portfolio: DomainPortfolio): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAlarmConfig(alarm: AlarmConfig): Promise<void>;
    updateDeviceHealth(health: DeviceHealth): Promise<void>;
    updateMaintenanceConfig(config: MaintenanceConfig): Promise<void>;
    updatePricingTier(tier: PricingTier): Promise<void>;
    updateSystemConfig(config: SystemConfig): Promise<void>;
    updateSystemHealth(health: SystemHealth): Promise<void>;
}
