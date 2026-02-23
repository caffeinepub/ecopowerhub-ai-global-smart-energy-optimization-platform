import List "mo:base/List";

module {
    type MaintenanceEvent = {
        id : Text;
        timestamp : Int;
        service : Text;
        issueType : Text;
        resolution : Text;
        status : Text;
        rootCause : Text;
        timeToResolution : Int;
        retryCount : Nat;
    };

    type LearningUpdate = {
        id : Text;
        timestamp : Int;
        issuePattern : Text;
        optimizationSuggestion : Text;
        deviceCorrelation : Text;
        impact : Text;
    };

    type ServiceStatus = {
        #healthy;
        #degraded;
        #unhealthy;
        #unknown;
    };

    type MaintenanceConfig = {
        autoRepairThreshold : Nat;
        maxRetries : Nat;
        alertEscalationThreshold : Nat;
        isActive : Bool;
        createdAt : Int;
        updatedAt : Int;
    };

    type SystemHealth = {
        overallStatus : ServiceStatus;
        networkStatus : ServiceStatus;
        deviceIntegrationStatus : ServiceStatus;
        dataSyncStatus : ServiceStatus;
        backendStatus : ServiceStatus;
        performanceMetrics : Text;
        uptime : Float;
        activeProcesses : [Text];
    };

    type ErrorCode = {
        code : Text;
        manufacturer : Text;
        description : Text;
        plainEnglishMessage : Text;
        supportUrl : Text;
        isActive : Bool;
        createdAt : Int;
        updatedAt : Int;
    };

    type DiagnosticCheckResult = {
        checkType : Text;
        status : Text;
        message : Text;
        timestamp : Int;
    };

    type DiagnosticEvent = {
        id : Text;
        deviceId : Text;
        tagId : Text;
        userId : Principal;
        timestamp : Int;
        quality : {
            #good;
            #bad;
            #uncertain;
        };
        checks : [DiagnosticCheckResult];
        errorCode : ?Text;
        diagnosis : Text;
        suggestedActions : [Text];
        manufacturerReferralUrl : ?Text;
        status : Text;
        progressPercent : Nat;
    };

    type DiagnosticFeedback = {
        id : Text;
        diagnosticEventId : Text;
        userId : Principal;
        wasHelpful : Bool;
        comment : ?Text;
        timestamp : Int;
    };

    type DeviceHealth = {
        deviceId : Text;
        tagId : Text;
        userId : Principal;
        quality : {
            #good;
            #bad;
            #uncertain;
        };
        lastValue : ?Text;
        lastValueTimestamp : Int;
        lastChecked : Int;
    };

    type SupportContract = {
        userId : Principal;
        isActive : Bool;
        tier : Text;
        expiresAt : Int;
    };

    type ComplianceSection = {
        title : Text;
        content : Text;
        subsections : [ComplianceSubsection];
    };

    type ComplianceSubsection = {
        title : Text;
        content : Text;
    };

    type ComplianceReportData = {
        title : Text;
        generatedAt : Int;
        sections : [ComplianceSection];
        nercCipStandards : [NercCipStandard];
        nistCsfResponsibilities : Text;
        quickReferenceTable : Text;
        legalDeclaration : Text;
    };

    type NercCipStandard = {
        standardId : Text;
        title : Text;
        description : Text;
        purpose : Text;
    };

    type CanisterStatus = {
        #online;
        #offline;
        #failing;
        #unknown;
    };

    type CanisterInfo = {
        canisterId : Text;
        name : Text;
        status : CanisterStatus;
        lastChecked : Int;
        errorMessage : ?Text;
    };

    type DeploymentStatus = {
        overallStatus : Text;
        canisters : [CanisterInfo];
        domainStatus : DomainStatus;
        timestamp : Int;
    };

    type DomainStatus = {
        primaryDomain : Text;
        isAccessible : Bool;
        sslValid : Bool;
        lastChecked : Int;
    };

    type ICPGatewayConfig = {
        domain : Text;
        canisterId : Text;
        isRegistered : Bool;
        tlsCertificateValid : Bool;
        lastSyncTimestamp : Int;
        errorMessage : ?Text;
    };

    type DNSSyncResult = {
        domain : Text;
        success : Bool;
        timestamp : Int;
        message : Text;
    };

    type EVProvider = {
        #ford;
        #rivian;
    };

    type EVOAuthConfig = {
        userId : Principal;
        provider : EVProvider;
        accessToken : Text;
        refreshToken : Text;
        expiresAt : Int;
        createdAt : Int;
        updatedAt : Int;
    };

    type EVTelemetry = {
        userId : Principal;
        provider : EVProvider;
        vehicleId : Text;
        batteryPercent : Float;
        rangeKm : Float;
        chargingStatus : Text;
        timestamp : Int;
    };

    type OldActor = {
        maintenanceEvents : List.List<MaintenanceEvent>;
        learningUpdates : List.List<LearningUpdate>;
        maintenanceConfig : MaintenanceConfig;
        systemHealth : SystemHealth;
        errorCodeDatabase : List.List<ErrorCode>;
        diagnosticEvents : List.List<DiagnosticEvent>;
        diagnosticFeedback : List.List<DiagnosticFeedback>;
        deviceHealthRecords : List.List<DeviceHealth>;
        supportContracts : List.List<SupportContract>;
        complianceReportData : ?ComplianceReportData;
        deploymentStatus : ?DeploymentStatus;
        icpGatewayConfigs : List.List<ICPGatewayConfig>;
        dnsSyncHistory : List.List<DNSSyncResult>;
        evOAuthConfigs : List.List<EVOAuthConfig>;
        evTelemetryData : List.List<EVTelemetry>;
    };

    type NewActor = {
        maintenanceEvents : List.List<MaintenanceEvent>;
        learningUpdates : List.List<LearningUpdate>;
        maintenanceConfig : MaintenanceConfig;
        systemHealth : SystemHealth;
        errorCodeDatabase : List.List<ErrorCode>;
        diagnosticEvents : List.List<DiagnosticEvent>;
        diagnosticFeedback : List.List<DiagnosticFeedback>;
        deviceHealthRecords : List.List<DeviceHealth>;
        supportContracts : List.List<SupportContract>;
        complianceReportData : ?ComplianceReportData;
        deploymentStatus : ?DeploymentStatus;
        icpGatewayConfigs : List.List<ICPGatewayConfig>;
        dnsSyncHistory : List.List<DNSSyncResult>;
        evOAuthConfigs : List.List<EVOAuthConfig>;
        evTelemetryData : List.List<EVTelemetry>;
    };

    public func run(old : OldActor) : NewActor {
        {
            maintenanceEvents = old.maintenanceEvents;
            learningUpdates = old.learningUpdates;
            maintenanceConfig = old.maintenanceConfig;
            systemHealth = old.systemHealth;
            errorCodeDatabase = old.errorCodeDatabase;
            diagnosticEvents = old.diagnosticEvents;
            diagnosticFeedback = old.diagnosticFeedback;
            deviceHealthRecords = old.deviceHealthRecords;
            supportContracts = old.supportContracts;
            complianceReportData = old.complianceReportData;
            deploymentStatus = old.deploymentStatus;
            icpGatewayConfigs = old.icpGatewayConfigs;
            dnsSyncHistory = old.dnsSyncHistory;
            evOAuthConfigs = old.evOAuthConfigs;
            evTelemetryData = old.evTelemetryData;
        };
    };
};
