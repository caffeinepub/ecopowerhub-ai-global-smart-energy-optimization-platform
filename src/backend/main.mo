import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Float "mo:base/Float";
import List "mo:base/List";

actor EcoPowerHubAI {
  let storage = Storage.new();
  include MixinStorage(storage);

  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  // Track initialization state to prevent duplicate initialization
  var isDevicesInitialized : Bool = false;
  var isPricingTiersInitialized : Bool = false;
  var isScadaProtocolsInitialized : Bool = false;
  var isCaseStudiesInitialized : Bool = false;
  var isValuePropositionsInitialized : Bool = false;
  var isErrorCodeDatabaseInitialized : Bool = false;
  var isManufacturerSupportInitialized : Bool = false;
  var isSupportBoundariesInitialized : Bool = false;

  // Stripe configuration state
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Initialize auth (first caller becomes admin, others become users)
  public shared ({ caller }) func initializeAccessControl() : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    if (Principal.isAnonymous(caller)) {
      return #guest;
    };
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    name : Text;
    preferredLanguage : Text;
  };

  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  var userProfiles = principalMap.empty<UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  public type SystemConfig = {
    systemId : Text;
    apiEndpoint : Text;
    systemType : Text;
    authToken : Text;
    brand : Text;
    region : Text;
    owner : Principal;
  };

  public type SystemConfigPublic = {
    systemId : Text;
    apiEndpoint : Text;
    systemType : Text;
    brand : Text;
    region : Text;
  };

  public type EnergyData = {
    timestamp : Time.Time;
    systemId : Text;
    energyConsumption : Float;
    temperature : Float;
    location : Text;
    timeZone : Text;
  };

  public type Recommendation = {
    id : Text;
    systemId : Text;
    message : Text;
    language : Text;
    timestamp : Time.Time;
    region : Text;
  };

  public type PredictiveModel = {
    modelId : Text;
    systemId : Text;
    modelData : Text;
    lastUpdated : Time.Time;
    timeZone : Text;
  };

  public type RegionalPricingModel = {
    region : Text;
    currency : Text;
    pricePerKWh : Float;
    peakHours : [Text];
  };

  public type SupportedDevice = {
    brand : Text;
    model : Text;
    region : Text;
    systemType : Text;
  };

  public type AlarmConfig = {
    alarmId : Text;
    userId : Principal;
    wakeUpTime : Time.Time;
    ringTone : Text;
    alertBeep : Text;
    language : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type ScheduledUpdate = {
    updateId : Text;
    userId : Principal;
    updateType : Text;
    scheduleTime : Time.Time;
    frequency : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type WeatherData = {
    location : Text;
    temperature : Float;
    condition : Text;
    timestamp : Time.Time;
  };

  public type EnergySummary = {
    systemId : Text;
    totalConsumption : Float;
    peakUsage : Float;
    timestamp : Time.Time;
  };

  public type MotivationalMessage = {
    messageId : Text;
    content : Text;
    language : Text;
    timestamp : Time.Time;
  };

  public type PricingTier = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    currency : Text;
    features : [Text];
    tierType : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type ScadaProtocolSupport = {
    id : Text;
    protocol : Text;
    description : Text;
    supportedDevices : [Text];
    tier : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type CaseStudy = {
    id : Text;
    title : Text;
    description : Text;
    protocolsUsed : [Text];
    energySavings : Float;
    reliability : Float;
    region : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type ValueProposition = {
    id : Text;
    title : Text;
    description : Text;
    benefits : [Text];
    targetAudience : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type ManufacturerSupport = {
    id : Text;
    name : Text;
    supportUrl : Text;
    logoUrl : Text;
    description : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type SupportBoundary = {
    id : Text;
    description : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type DomainVariant = {
    domain : Text;
    isAvailable : Bool;
    priceUsd : Float;
    registrar : Text;
    lastChecked : Time.Time;
  };

  public type DomainPortfolio = {
    variants : [DomainVariant];
    strategy : Text;
    recommendations : Text;
    lastUpdated : Time.Time;
  };

  public type ServiceStatus = {
    #healthy;
    #degraded;
    #unhealthy;
    #unknown;
  };

  public type MaintenanceEvent = {
    id : Text;
    timestamp : Time.Time;
    service : Text;
    issueType : Text;
    resolution : Text;
    status : Text;
    rootCause : Text;
    timeToResolution : Int;
    retryCount : Nat;
  };

  public type LearningUpdate = {
    id : Text;
    timestamp : Time.Time;
    issuePattern : Text;
    optimizationSuggestion : Text;
    deviceCorrelation : Text;
    impact : Text;
  };

  public type SystemHealth = {
    overallStatus : ServiceStatus;
    networkStatus : ServiceStatus;
    deviceIntegrationStatus : ServiceStatus;
    dataSyncStatus : ServiceStatus;
    backendStatus : ServiceStatus;
    performanceMetrics : Text;
    uptime : Float;
    activeProcesses : [Text];
  };

  public type MaintenanceConfig = {
    autoRepairThreshold : Nat;
    maxRetries : Nat;
    alertEscalationThreshold : Nat;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type MaintenanceDashboard = {
    systemHealth : SystemHealth;
    recentEvents : [MaintenanceEvent];
    learningUpdates : [LearningUpdate];
    optimizationSuggestions : [Text];
    config : MaintenanceConfig;
  };

  public type DeviceQuality = {
    #good;
    #bad;
    #uncertain;
  };

  public type ErrorCode = {
    code : Text;
    manufacturer : Text;
    description : Text;
    plainEnglishMessage : Text;
    supportUrl : Text;
    isActive : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type DiagnosticCheckResult = {
    checkType : Text;
    status : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type DiagnosticEvent = {
    id : Text;
    deviceId : Text;
    tagId : Text;
    userId : Principal;
    timestamp : Time.Time;
    quality : DeviceQuality;
    checks : [DiagnosticCheckResult];
    errorCode : ?Text;
    diagnosis : Text;
    suggestedActions : [Text];
    manufacturerReferralUrl : ?Text;
    status : Text;
    progressPercent : Nat;
  };

  public type DiagnosticFeedback = {
    id : Text;
    diagnosticEventId : Text;
    userId : Principal;
    wasHelpful : Bool;
    comment : ?Text;
    timestamp : Time.Time;
  };

  public type DeviceHealth = {
    deviceId : Text;
    tagId : Text;
    userId : Principal;
    quality : DeviceQuality;
    lastValue : ?Text;
    lastValueTimestamp : Time.Time;
    lastChecked : Time.Time;
  };

  public type SupportContract = {
    userId : Principal;
    isActive : Bool;
    tier : Text;
    expiresAt : Time.Time;
  };

  public type ComplianceSection = {
    title : Text;
    content : Text;
    subsections : [ComplianceSubsection];
  };

  public type ComplianceSubsection = {
    title : Text;
    content : Text;
  };

  public type ComplianceReportData = {
    title : Text;
    generatedAt : Time.Time;
    sections : [ComplianceSection];
    nercCipStandards : [NercCipStandard];
    nistCsfResponsibilities : Text;
    quickReferenceTable : Text;
    legalDeclaration : Text;
  };

  public type NercCipStandard = {
    standardId : Text;
    title : Text;
    description : Text;
    purpose : Text;
  };

  public type CanisterStatus = {
    #online;
    #offline;
    #failing;
    #unknown;
  };

  public type CanisterInfo = {
    canisterId : Text;
    name : Text;
    status : CanisterStatus;
    lastChecked : Time.Time;
    errorMessage : ?Text;
  };

  public type DeploymentStatus = {
    overallStatus : Text;
    canisters : [CanisterInfo];
    domainStatus : DomainStatus;
    timestamp : Time.Time;
  };

  public type DomainStatus = {
    primaryDomain : Text;
    isAccessible : Bool;
    sslValid : Bool;
    lastChecked : Time.Time;
  };

  public type ICPGatewayConfig = {
    domain : Text;
    canisterId : Text;
    isRegistered : Bool;
    tlsCertificateValid : Bool;
    lastSyncTimestamp : Time.Time;
    errorMessage : ?Text;
  };

  public type DNSSyncResult = {
    domain : Text;
    success : Bool;
    timestamp : Time.Time;
    message : Text;
  };

  public type EVProvider = {
    #ford;
    #rivian;
  };

  public type EVOAuthConfig = {
    userId : Principal;
    provider : EVProvider;
    accessToken : Text;
    refreshToken : Text;
    expiresAt : Time.Time;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type EVTelemetry = {
    userId : Principal;
    provider : EVProvider;
    vehicleId : Text;
    batteryPercent : Float;
    rangeKm : Float;
    chargingStatus : Text;
    timestamp : Time.Time;
  };

  // State variables
  var maintenanceEvents : List.List<MaintenanceEvent> = List.nil<MaintenanceEvent>();
  var learningUpdates : List.List<LearningUpdate> = List.nil<LearningUpdate>();
  var maintenanceConfig : MaintenanceConfig = {
    autoRepairThreshold = 3;
    maxRetries = 5;
    alertEscalationThreshold = 3;
    isActive = true;
    createdAt = Time.now();
    updatedAt = Time.now();
  };
  var systemHealth : SystemHealth = {
    overallStatus = #healthy;
    networkStatus = #healthy;
    deviceIntegrationStatus = #healthy;
    dataSyncStatus = #healthy;
    backendStatus = #healthy;
    performanceMetrics = "All systems operational";
    uptime = 99.99;
    activeProcesses = ["monitoring", "sync", "integration"];
  };

  var errorCodeDatabase : List.List<ErrorCode> = List.nil<ErrorCode>();
  var diagnosticEvents : List.List<DiagnosticEvent> = List.nil<DiagnosticEvent>();
  var diagnosticFeedback : List.List<DiagnosticFeedback> = List.nil<DiagnosticFeedback>();
  var deviceHealthRecords : List.List<DeviceHealth> = List.nil<DeviceHealth>();
  var supportContracts : List.List<SupportContract> = List.nil<SupportContract>();

  var complianceReportData : ?ComplianceReportData = null;
  var deploymentStatus : ?DeploymentStatus = null;

  var icpGatewayConfigs : List.List<ICPGatewayConfig> = List.nil<ICPGatewayConfig>();
  var dnsSyncHistory : List.List<DNSSyncResult> = List.nil<DNSSyncResult>();

  var evOAuthConfigs : List.List<EVOAuthConfig> = List.nil<EVOAuthConfig>();
  var evTelemetryData : List.List<EVTelemetry> = List.nil<EVTelemetry>();

  // Helper functions
  func hasSystemAccess(caller : Principal, systemId : Text) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (textMap.get(systemConfigs, systemId)) {
      case (null) { false };
      case (?config) { config.owner == caller };
    };
  };

  func hasDeviceAccess(caller : Principal, deviceId : Text) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    let devices = List.toArray(deviceHealthRecords);
    for (device in devices.vals()) {
      if (device.deviceId == deviceId and device.userId == caller) {
        return true;
      };
    };
    false;
  };

  func hasActiveSupportContract(userId : Principal) : Bool {
    if (Principal.isAnonymous(userId)) {
      return false;
    };
    let contracts = List.toArray(supportContracts);
    let now = Time.now();
    for (contract in contracts.vals()) {
      if (contract.userId == userId and contract.isActive and contract.expiresAt > now) {
        return true;
      };
    };
    false;
  };

  func sanitizeConfig(config : SystemConfig) : SystemConfigPublic {
    {
      systemId = config.systemId;
      apiEndpoint = config.apiEndpoint;
      systemType = config.systemType;
      brand = config.brand;
      region = config.region;
    };
  };

  func hasAlarmAccess(caller : Principal, alarmId : Text) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (textMap.get(alarmConfigs, alarmId)) {
      case (null) { false };
      case (?alarm) { alarm.userId == caller };
    };
  };

  func hasScheduledUpdateAccess(caller : Principal, updateId : Text) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (textMap.get(scheduledUpdates, updateId)) {
      case (null) { false };
      case (?update) { update.userId == caller };
    };
  };

  func hasDiagnosticAccess(caller : Principal, diagnosticId : Text) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    let events = List.toArray(diagnosticEvents);
    for (event in events.vals()) {
      if (event.id == diagnosticId and event.userId == caller) {
        return true;
      };
    };
    false;
  };

  func hasEVOAuthAccess(caller : Principal, userId : Principal) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    caller == userId;
  };

  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  var systemConfigs = textMap.empty<SystemConfig>();
  var energyData = textMap.empty<EnergyData>();
  var recommendations = textMap.empty<Recommendation>();
  var predictiveModels = textMap.empty<PredictiveModel>();
  var regionalPricingModels = textMap.empty<RegionalPricingModel>();
  var supportedDevices = textMap.empty<SupportedDevice>();
  var alarmConfigs = textMap.empty<AlarmConfig>();
  var scheduledUpdates = textMap.empty<ScheduledUpdate>();
  var weatherData = textMap.empty<WeatherData>();
  var energySummaries = textMap.empty<EnergySummary>();
  var motivationalMessages = textMap.empty<MotivationalMessage>();
  var pricingTiers = textMap.empty<PricingTier>();
  var scadaProtocols = textMap.empty<ScadaProtocolSupport>();
  var caseStudies = textMap.empty<CaseStudy>();
  var valuePropositions = textMap.empty<ValueProposition>();
  var manufacturerSupport = textMap.empty<ManufacturerSupport>();
  var supportBoundaries = textMap.empty<SupportBoundary>();
  var domainPortfolio = textMap.empty<DomainPortfolio>();

  // System Configuration Management
  public shared ({ caller }) func addSystemConfig(config : SystemConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add system configs");
    };
    let configWithOwner = {
      config with owner = caller;
    };
    systemConfigs := textMap.put(systemConfigs, config.systemId, configWithOwner);
  };

  public shared ({ caller }) func updateSystemConfig(config : SystemConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update system configs");
    };
    if (not hasSystemAccess(caller, config.systemId)) {
      Debug.trap("Unauthorized: You can only update your own systems");
    };
    switch (textMap.get(systemConfigs, config.systemId)) {
      case (null) { Debug.trap("System config not found") };
      case (?existingConfig) {
        let configWithOwner = {
          config with owner = existingConfig.owner;
        };
        systemConfigs := textMap.put(systemConfigs, config.systemId, configWithOwner);
      };
    };
  };

  public shared ({ caller }) func deleteSystemConfig(systemId : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete system configs");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only delete your own systems");
    };
    systemConfigs := textMap.delete(systemConfigs, systemId);
  };

  public query ({ caller }) func getSystemConfig(systemId : Text) : async ?SystemConfigPublic {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view system configs");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only view your own systems");
    };
    switch (textMap.get(systemConfigs, systemId)) {
      case (null) { null };
      case (?config) { ?sanitizeConfig(config) };
    };
  };

  public query ({ caller }) func getSystemConfigFull(systemId : Text) : async ?SystemConfig {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view full system configs");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only view full system configs for your own systems");
    };
    textMap.get(systemConfigs, systemId);
  };

  public query ({ caller }) func getAllSystemConfigs() : async [SystemConfigPublic] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view system configs");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    Iter.toArray(
      Iter.map(
        Iter.filter(
          textMap.vals(systemConfigs),
          func(config : SystemConfig) : Bool {
            isAdmin or config.owner == caller
          },
        ),
        sanitizeConfig,
      )
    );
  };

  public query ({ caller }) func getAllSystemConfigsFull() : async [SystemConfig] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view all full system configs");
    };
    Iter.toArray(textMap.vals(systemConfigs));
  };

  // Energy Data Management
  public shared ({ caller }) func addEnergyData(data : EnergyData) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add energy data");
    };
    if (not hasSystemAccess(caller, data.systemId)) {
      Debug.trap("Unauthorized: You can only add data to your own systems");
    };
    let key = data.systemId # "-" # debug_show (data.timestamp);
    energyData := textMap.put(energyData, key, data);
  };

  public query ({ caller }) func getEnergyData(systemId : Text) : async [EnergyData] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view energy data");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only view data from your own systems");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(energyData),
        func(d : EnergyData) : Bool { d.systemId == systemId },
      )
    );
  };

  public query ({ caller }) func getAllEnergyData() : async [EnergyData] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view energy data");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    Iter.toArray(
      Iter.filter(
        textMap.vals(energyData),
        func(d : EnergyData) : Bool {
          isAdmin or hasSystemAccess(caller, d.systemId)
        },
      )
    );
  };

  public shared ({ caller }) func deleteEnergyData(systemId : Text, timestamp : Time.Time) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete energy data");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only delete data from your own systems");
    };
    let key = systemId # "-" # debug_show (timestamp);
    energyData := textMap.delete(energyData, key);
  };

  // Recommendations Management
  public shared ({ caller }) func addRecommendation(rec : Recommendation) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add recommendations");
    };
    if (not hasSystemAccess(caller, rec.systemId)) {
      Debug.trap("Unauthorized: You can only add recommendations to your own systems");
    };
    recommendations := textMap.put(recommendations, rec.id, rec);
  };

  public query ({ caller }) func getRecommendations(systemId : Text) : async [Recommendation] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view recommendations");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only view recommendations for your own systems");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(recommendations),
        func(r : Recommendation) : Bool { r.systemId == systemId },
      )
    );
  };

  public shared ({ caller }) func deleteRecommendation(id : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete recommendations");
    };
    switch (textMap.get(recommendations, id)) {
      case (null) { Debug.trap("Recommendation not found") };
      case (?rec) {
        if (not hasSystemAccess(caller, rec.systemId)) {
          Debug.trap("Unauthorized: You can only delete recommendations from your own systems");
        };
        recommendations := textMap.delete(recommendations, id);
      };
    };
  };

  // Predictive Models Management
  public shared ({ caller }) func addPredictiveModel(model : PredictiveModel) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add predictive models");
    };
    if (not hasSystemAccess(caller, model.systemId)) {
      Debug.trap("Unauthorized: You can only add models to your own systems");
    };
    predictiveModels := textMap.put(predictiveModels, model.modelId, model);
  };

  public query ({ caller }) func getPredictiveModel(modelId : Text) : async ?PredictiveModel {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view predictive models");
    };
    switch (textMap.get(predictiveModels, modelId)) {
      case (null) { null };
      case (?model) {
        if (not hasSystemAccess(caller, model.systemId)) {
          Debug.trap("Unauthorized: You can only view models from your own systems");
        };
        ?model;
      };
    };
  };

  public shared ({ caller }) func deletePredictiveModel(modelId : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete predictive models");
    };
    switch (textMap.get(predictiveModels, modelId)) {
      case (null) { Debug.trap("Model not found") };
      case (?model) {
        if (not hasSystemAccess(caller, model.systemId)) {
          Debug.trap("Unauthorized: You can only delete models from your own systems");
        };
        predictiveModels := textMap.delete(predictiveModels, modelId);
      };
    };
  };

  // Regional Pricing Models Management (Admin only)
  public shared ({ caller }) func addRegionalPricingModel(model : RegionalPricingModel) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add regional pricing models");
    };
    regionalPricingModels := textMap.put(regionalPricingModels, model.region, model);
  };

  public query func getRegionalPricingModel(region : Text) : async ?RegionalPricingModel {
    // Public read access for pricing information
    textMap.get(regionalPricingModels, region);
  };

  public query func getAllRegionalPricingModels() : async [RegionalPricingModel] {
    // Public read access for pricing information
    Iter.toArray(textMap.vals(regionalPricingModels));
  };

  public shared ({ caller }) func deleteRegionalPricingModel(region : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete regional pricing models");
    };
    regionalPricingModels := textMap.delete(regionalPricingModels, region);
  };

  // Supported Devices Management (Admin only)
  public shared ({ caller }) func addSupportedDevice(device : SupportedDevice) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add supported devices");
    };
    let key = device.brand # "-" # device.model;
    supportedDevices := textMap.put(supportedDevices, key, device);
  };

  public query func getAllSupportedDevices() : async [SupportedDevice] {
    // Public read access for device information
    Iter.toArray(textMap.vals(supportedDevices));
  };

  public shared ({ caller }) func deleteSupportedDevice(brand : Text, model : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete supported devices");
    };
    let key = brand # "-" # model;
    supportedDevices := textMap.delete(supportedDevices, key);
  };

  // Alarm Configuration Management
  public shared ({ caller }) func addAlarmConfig(alarm : AlarmConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add alarm configs");
    };
    let alarmWithUser = {
      alarm with userId = caller;
    };
    alarmConfigs := textMap.put(alarmConfigs, alarm.alarmId, alarmWithUser);
  };

  public query ({ caller }) func getAlarmConfig(alarmId : Text) : async ?AlarmConfig {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view alarm configs");
    };
    if (not hasAlarmAccess(caller, alarmId)) {
      Debug.trap("Unauthorized: You can only view your own alarms");
    };
    textMap.get(alarmConfigs, alarmId);
  };

  public query ({ caller }) func getAllAlarmConfigs() : async [AlarmConfig] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view alarm configs");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    Iter.toArray(
      Iter.filter(
        textMap.vals(alarmConfigs),
        func(alarm : AlarmConfig) : Bool {
          isAdmin or alarm.userId == caller
        },
      )
    );
  };

  public shared ({ caller }) func updateAlarmConfig(alarm : AlarmConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update alarm configs");
    };
    if (not hasAlarmAccess(caller, alarm.alarmId)) {
      Debug.trap("Unauthorized: You can only update your own alarms");
    };
    switch (textMap.get(alarmConfigs, alarm.alarmId)) {
      case (null) { Debug.trap("Alarm config not found") };
      case (?existingAlarm) {
        let alarmWithUser = {
          alarm with userId = existingAlarm.userId;
        };
        alarmConfigs := textMap.put(alarmConfigs, alarm.alarmId, alarmWithUser);
      };
    };
  };

  public shared ({ caller }) func deleteAlarmConfig(alarmId : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete alarm configs");
    };
    if (not hasAlarmAccess(caller, alarmId)) {
      Debug.trap("Unauthorized: You can only delete your own alarms");
    };
    alarmConfigs := textMap.delete(alarmConfigs, alarmId);
  };

  // Scheduled Updates Management
  public shared ({ caller }) func addScheduledUpdate(update : ScheduledUpdate) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add scheduled updates");
    };
    let updateWithUser = {
      update with userId = caller;
    };
    scheduledUpdates := textMap.put(scheduledUpdates, update.updateId, updateWithUser);
  };

  public query ({ caller }) func getScheduledUpdate(updateId : Text) : async ?ScheduledUpdate {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view scheduled updates");
    };
    if (not hasScheduledUpdateAccess(caller, updateId)) {
      Debug.trap("Unauthorized: You can only view your own scheduled updates");
    };
    textMap.get(scheduledUpdates, updateId);
  };

  public query ({ caller }) func getAllScheduledUpdates() : async [ScheduledUpdate] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view scheduled updates");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    Iter.toArray(
      Iter.filter(
        textMap.vals(scheduledUpdates),
        func(update : ScheduledUpdate) : Bool {
          isAdmin or update.userId == caller
        },
      )
    );
  };

  public shared ({ caller }) func deleteScheduledUpdate(updateId : Text) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete scheduled updates");
    };
    if (not hasScheduledUpdateAccess(caller, updateId)) {
      Debug.trap("Unauthorized: You can only delete your own scheduled updates");
    };
    scheduledUpdates := textMap.delete(scheduledUpdates, updateId);
  };

  // Weather Data Management (Admin only for write, public read)
  public shared ({ caller }) func addWeatherData(weather : WeatherData) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add weather data");
    };
    weatherData := textMap.put(weatherData, weather.location, weather);
  };

  public query func getWeatherData(location : Text) : async ?WeatherData {
    // Public read access for weather information
    textMap.get(weatherData, location);
  };

  // Energy Summary Management
  public shared ({ caller }) func addEnergySummary(summary : EnergySummary) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add energy summaries");
    };
    if (not hasSystemAccess(caller, summary.systemId)) {
      Debug.trap("Unauthorized: You can only add summaries to your own systems");
    };
    let key = summary.systemId # "-" # debug_show (summary.timestamp);
    energySummaries := textMap.put(energySummaries, key, summary);
  };

  public query ({ caller }) func getEnergySummary(systemId : Text) : async [EnergySummary] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view energy summaries");
    };
    if (not hasSystemAccess(caller, systemId)) {
      Debug.trap("Unauthorized: You can only view summaries from your own systems");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(energySummaries),
        func(s : EnergySummary) : Bool { s.systemId == systemId },
      )
    );
  };

  // Motivational Messages Management (Admin only for write, public read)
  public shared ({ caller }) func addMotivationalMessage(message : MotivationalMessage) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add motivational messages");
    };
    motivationalMessages := textMap.put(motivationalMessages, message.messageId, message);
  };

  public query func getAllMotivationalMessages() : async [MotivationalMessage] {
    // Public read access for motivational messages
    Iter.toArray(textMap.vals(motivationalMessages));
  };

  // Pricing Tiers Management (Admin only for write, public read)
  public shared ({ caller }) func addPricingTier(tier : PricingTier) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add pricing tiers");
    };
    pricingTiers := textMap.put(pricingTiers, tier.id, tier);
  };

  public query func getAllPricingTiers() : async [PricingTier] {
    // Public read access for pricing information
    Iter.toArray(textMap.vals(pricingTiers));
  };

  public shared ({ caller }) func updatePricingTier(tier : PricingTier) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update pricing tiers");
    };
    pricingTiers := textMap.put(pricingTiers, tier.id, tier);
  };

  // SCADA Protocol Support Management (Admin only for write, public read)
  public shared ({ caller }) func addScadaProtocol(protocol : ScadaProtocolSupport) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add SCADA protocols");
    };
    scadaProtocols := textMap.put(scadaProtocols, protocol.id, protocol);
  };

  public query func getAllScadaProtocols() : async [ScadaProtocolSupport] {
    // Public read access for protocol information
    Iter.toArray(textMap.vals(scadaProtocols));
  };

  // Case Studies Management (Admin only for write, public read)
  public shared ({ caller }) func addCaseStudy(study : CaseStudy) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add case studies");
    };
    caseStudies := textMap.put(caseStudies, study.id, study);
  };

  public query func getAllCaseStudies() : async [CaseStudy] {
    // Public read access for case studies
    Iter.toArray(textMap.vals(caseStudies));
  };

  // Value Propositions Management (Admin only for write, public read)
  public shared ({ caller }) func addValueProposition(prop : ValueProposition) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add value propositions");
    };
    valuePropositions := textMap.put(valuePropositions, prop.id, prop);
  };

  public query func getAllValuePropositions() : async [ValueProposition] {
    // Public read access for value propositions
    Iter.toArray(textMap.vals(valuePropositions));
  };

  // Manufacturer Support Management (Admin only for write, public read)
  public shared ({ caller }) func addManufacturerSupport(support : ManufacturerSupport) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add manufacturer support");
    };
    manufacturerSupport := textMap.put(manufacturerSupport, support.id, support);
  };

  public query func getAllManufacturerSupport() : async [ManufacturerSupport] {
    // Public read access for manufacturer support information
    Iter.toArray(textMap.vals(manufacturerSupport));
  };

  // Support Boundaries Management (Admin only for write, public read)
  public shared ({ caller }) func addSupportBoundary(boundary : SupportBoundary) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add support boundaries");
    };
    supportBoundaries := textMap.put(supportBoundaries, boundary.id, boundary);
  };

  public query func getAllSupportBoundaries() : async [SupportBoundary] {
    // Public read access for support boundaries
    Iter.toArray(textMap.vals(supportBoundaries));
  };

  // Domain Portfolio Management (Admin only)
  public shared ({ caller }) func setDomainPortfolio(portfolio : DomainPortfolio) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set domain portfolio");
    };
    domainPortfolio := textMap.put(domainPortfolio, "main", portfolio);
  };

  public query ({ caller }) func getDomainPortfolio() : async ?DomainPortfolio {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view domain portfolio");
    };
    textMap.get(domainPortfolio, "main");
  };

  // Maintenance Dashboard Management (Admin only)
  public shared ({ caller }) func addMaintenanceEvent(event : MaintenanceEvent) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add maintenance events");
    };
    maintenanceEvents := List.push(event, maintenanceEvents);
  };

  public shared ({ caller }) func addLearningUpdate(update : LearningUpdate) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add learning updates");
    };
    learningUpdates := List.push(update, learningUpdates);
  };

  public shared ({ caller }) func updateMaintenanceConfig(config : MaintenanceConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update maintenance config");
    };
    maintenanceConfig := config;
  };

  public shared ({ caller }) func updateSystemHealth(health : SystemHealth) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update system health");
    };
    systemHealth := health;
  };

  public query ({ caller }) func getMaintenanceDashboard() : async MaintenanceDashboard {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view maintenance dashboard");
    };
    {
      systemHealth;
      recentEvents = List.toArray(maintenanceEvents);
      learningUpdates = List.toArray(learningUpdates);
      optimizationSuggestions = ["Optimize device polling intervals", "Implement caching for frequently accessed data"];
      config = maintenanceConfig;
    };
  };

  // Error Code Database Management (Admin only for write, users can read)
  public shared ({ caller }) func addErrorCode(errorCode : ErrorCode) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add error codes");
    };
    errorCodeDatabase := List.push(errorCode, errorCodeDatabase);
  };

  public query ({ caller }) func getErrorCode(code : Text, manufacturer : Text) : async ?ErrorCode {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view error codes");
    };
    let codes = List.toArray(errorCodeDatabase);
    for (ec in codes.vals()) {
      if (ec.code == code and ec.manufacturer == manufacturer) {
        return ?ec;
      };
    };
    null;
  };

  public query ({ caller }) func getAllErrorCodes() : async [ErrorCode] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view error codes");
    };
    List.toArray(errorCodeDatabase);
  };

  // Diagnostic Events Management
  public shared ({ caller }) func addDiagnosticEvent(event : DiagnosticEvent) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add diagnostic events");
    };
    let eventWithUser = {
      event with userId = caller;
    };
    diagnosticEvents := List.push(eventWithUser, diagnosticEvents);
  };

  public query ({ caller }) func getDiagnosticEvent(id : Text) : async ?DiagnosticEvent {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view diagnostic events");
    };
    if (not hasDiagnosticAccess(caller, id)) {
      Debug.trap("Unauthorized: You can only view your own diagnostic events");
    };
    let events = List.toArray(diagnosticEvents);
    for (event in events.vals()) {
      if (event.id == id) {
        return ?event;
      };
    };
    null;
  };

  public query ({ caller }) func getAllDiagnosticEvents() : async [DiagnosticEvent] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view diagnostic events");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let events = List.toArray(diagnosticEvents);
    Iter.toArray(
      Iter.filter(
        events.vals(),
        func(event : DiagnosticEvent) : Bool {
          isAdmin or event.userId == caller
        },
      )
    );
  };

  // Diagnostic Feedback Management
  public shared ({ caller }) func addDiagnosticFeedback(feedback : DiagnosticFeedback) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add diagnostic feedback");
    };
    if (not hasDiagnosticAccess(caller, feedback.diagnosticEventId)) {
      Debug.trap("Unauthorized: You can only provide feedback for your own diagnostic events");
    };
    let feedbackWithUser = {
      feedback with userId = caller;
    };
    diagnosticFeedback := List.push(feedbackWithUser, diagnosticFeedback);
  };

  public query ({ caller }) func getDiagnosticFeedback(diagnosticEventId : Text) : async [DiagnosticFeedback] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view diagnostic feedback");
    };
    let allFeedback = List.toArray(diagnosticFeedback);
    Iter.toArray(
      Iter.filter(
        allFeedback.vals(),
        func(fb : DiagnosticFeedback) : Bool {
          fb.diagnosticEventId == diagnosticEventId
        },
      )
    );
  };

  // Device Health Management
  public shared ({ caller }) func updateDeviceHealth(health : DeviceHealth) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update device health");
    };
    let healthWithUser = {
      health with userId = caller;
    };
    deviceHealthRecords := List.push(healthWithUser, deviceHealthRecords);
  };

  public query ({ caller }) func getDeviceHealth(deviceId : Text) : async ?DeviceHealth {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view device health");
    };
    if (not hasDeviceAccess(caller, deviceId)) {
      Debug.trap("Unauthorized: You can only view health for your own devices");
    };
    let devices = List.toArray(deviceHealthRecords);
    for (device in devices.vals()) {
      if (device.deviceId == deviceId) {
        return ?device;
      };
    };
    null;
  };

  public query ({ caller }) func getAllDeviceHealth() : async [DeviceHealth] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view device health");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let devices = List.toArray(deviceHealthRecords);
    Iter.toArray(
      Iter.filter(
        devices.vals(),
        func(device : DeviceHealth) : Bool {
          isAdmin or device.userId == caller
        },
      )
    );
  };

  // Support Contracts Management (Admin only)
  public shared ({ caller }) func addSupportContract(contract : SupportContract) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add support contracts");
    };
    supportContracts := List.push(contract, supportContracts);
  };

  public query ({ caller }) func getSupportContract(userId : Principal) : async ?SupportContract {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: You can only view your own support contract");
    };
    let contracts = List.toArray(supportContracts);
    for (contract in contracts.vals()) {
      if (contract.userId == userId) {
        return ?contract;
      };
    };
    null;
  };

  // Compliance Report Management (Admin only for write, users can read)
  public shared ({ caller }) func setComplianceReportData(data : ComplianceReportData) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set compliance report data");
    };
    complianceReportData := ?data;
  };

  public query ({ caller }) func getComplianceReportData() : async ?ComplianceReportData {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view compliance report data");
    };
    complianceReportData;
  };

  // Deployment Status Management (Admin only)
  public shared ({ caller }) func setDeploymentStatus(status : DeploymentStatus) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set deployment status");
    };
    deploymentStatus := ?status;
  };

  public query ({ caller }) func getDeploymentStatus() : async ?DeploymentStatus {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view deployment status");
    };
    deploymentStatus;
  };

  // ICP Gateway Configuration Management (Admin only)
  public shared ({ caller }) func addICPGatewayConfig(config : ICPGatewayConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add ICP gateway configs");
    };
    icpGatewayConfigs := List.push(config, icpGatewayConfigs);
  };

  public query ({ caller }) func getAllICPGatewayConfigs() : async [ICPGatewayConfig] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view ICP gateway configs");
    };
    List.toArray(icpGatewayConfigs);
  };

  // DNS Sync Management (Admin only)
  public shared ({ caller }) func addDNSSyncResult(result : DNSSyncResult) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add DNS sync results");
    };
    dnsSyncHistory := List.push(result, dnsSyncHistory);
  };

  public query ({ caller }) func getDNSSyncHistory() : async [DNSSyncResult] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view DNS sync history");
    };
    List.toArray(dnsSyncHistory);
  };

  // EV OAuth Configuration Management
  public shared ({ caller }) func addEVOAuthConfig(config : EVOAuthConfig) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add EV OAuth configs");
    };
    let configWithUser = {
      config with userId = caller;
    };
    evOAuthConfigs := List.push(configWithUser, evOAuthConfigs);
  };

  public query ({ caller }) func getEVOAuthConfig(userId : Principal, provider : EVProvider) : async ?EVOAuthConfig {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view EV OAuth configs");
    };
    if (not hasEVOAuthAccess(caller, userId)) {
      Debug.trap("Unauthorized: You can only view your own EV OAuth configs");
    };
    let configs = List.toArray(evOAuthConfigs);
    for (config in configs.vals()) {
      if (config.userId == userId and config.provider == provider) {
        return ?config;
      };
    };
    null;
  };

  // EV Telemetry Management
  public shared ({ caller }) func addEVTelemetry(telemetry : EVTelemetry) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can add EV telemetry");
    };
    let telemetryWithUser = {
      telemetry with userId = caller;
    };
    evTelemetryData := List.push(telemetryWithUser, evTelemetryData);
  };

  public query ({ caller }) func getEVTelemetry(userId : Principal) : async [EVTelemetry] {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view EV telemetry");
    };
    if (not hasEVOAuthAccess(caller, userId)) {
      Debug.trap("Unauthorized: You can only view your own EV telemetry");
    };
    let allTelemetry = List.toArray(evTelemetryData);
    Iter.toArray(
      Iter.filter(
        allTelemetry.vals(),
        func(t : EVTelemetry) : Bool {
          t.userId == userId
        },
      )
    );
  };

  // Stripe Integration
  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can check Stripe configuration");
    };
    switch (stripeConfig) {
      case (null) { false };
      case (?_) { true };
    };
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Debug.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    // Public access for session status checking (needed for payment verification)
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (Principal.isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principal not allowed");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    // Public access for HTTP outcall transformation
    OutCall.transform(input);
  };
};

