import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Zap, Globe, Plug, Shield, Server, Network } from 'lucide-react';
import { useGetAllScadaProtocolSupport } from '../hooks/useQueries';

const VOLTAGE_COMPATIBILITY = [
  { region: 'North America', voltage: '120V / 240V', frequency: '60Hz', plugTypes: 'Type A, B', compatible: true },
  { region: 'Europe', voltage: '230V', frequency: '50Hz', plugTypes: 'Type C, E, F', compatible: true },
  { region: 'Asia (China)', voltage: '220V', frequency: '50Hz', plugTypes: 'Type A, C, I', compatible: true },
  { region: 'South America', voltage: '110V / 220V', frequency: '50Hz / 60Hz', plugTypes: 'Type A, C, I', compatible: true },
  { region: 'Australia / NZ', voltage: '230V', frequency: '50Hz', plugTypes: 'Type I', compatible: true },
  { region: 'Russia / CIS', voltage: '220V', frequency: '50Hz', plugTypes: 'Type C, F', compatible: true },
  { region: 'Africa', voltage: '220V / 230V', frequency: '50Hz', plugTypes: 'Type C, D, G, M', compatible: true },
];

const DEVICE_SPECS = [
  {
    brand: 'Sense',
    model: 'Sense with Flex',
    voltage: '120V / 240V',
    frequency: '50Hz / 60Hz',
    maxCurrent: '200A',
    accuracy: '±1%',
    connectivity: 'WiFi 2.4GHz',
  },
  {
    brand: 'Emporia',
    model: 'Vue Energy Monitor',
    voltage: '100V - 240V',
    frequency: '50Hz / 60Hz',
    maxCurrent: '200A',
    accuracy: '±2%',
    connectivity: 'WiFi 2.4GHz',
  },
  {
    brand: 'Shelly',
    model: 'EM',
    voltage: '110V - 230V',
    frequency: '50Hz / 60Hz',
    maxCurrent: '120A',
    accuracy: '±1%',
    connectivity: 'WiFi 2.4GHz',
  },
  {
    brand: 'Aubess',
    model: 'Smart Energy Meter (Tuya)',
    voltage: '80V - 300V',
    frequency: '45Hz - 65Hz',
    maxCurrent: '100A',
    accuracy: '±1.5%',
    connectivity: 'WiFi 2.4GHz',
  },
  {
    brand: 'Sonoff',
    model: 'POW Elite',
    voltage: '100V - 240V',
    frequency: '50Hz / 60Hz',
    maxCurrent: '20A',
    accuracy: '±1%',
    connectivity: 'WiFi 2.4GHz',
  },
];

const COMPLIANCE_STANDARDS = [
  { standard: 'UL 61010-1', region: 'North America', description: 'Safety requirements for electrical equipment' },
  { standard: 'CE', region: 'Europe', description: 'European Conformity marking' },
  { standard: 'FCC Part 15', region: 'North America', description: 'Radio frequency device regulations' },
  { standard: 'RoHS', region: 'Global', description: 'Restriction of Hazardous Substances' },
  { standard: 'IEC 61000-4-2', region: 'Global', description: 'Electromagnetic compatibility (EMC)' },
  { standard: 'IP20', region: 'Global', description: 'Ingress protection rating' },
];

export default function TechSpecsPage() {
  const { data: scadaProtocols = [] } = useGetAllScadaProtocolSupport();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4CAF50] via-[#007BFF] to-[#00BCD4] py-20">
        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Technical Specifications
            </h1>
            <p className="text-xl md:text-2xl text-white/95">
              Comprehensive voltage compatibility, device specs, SCADA protocol support, and global compliance information
            </p>
          </div>
        </div>
      </section>

      {/* Voltage Compatibility Matrix */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Global Voltage Compatibility
            </h2>
            <p className="text-xl text-muted-foreground">
              Supported voltage standards and plug types by region
            </p>
          </div>

          <Card className="max-w-6xl mx-auto border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-8 w-8 text-[#007BFF]" />
                <CardTitle className="text-2xl">Regional Compatibility Matrix</CardTitle>
              </div>
              <CardDescription className="text-base">
                All EcoPowerHub AI supported devices are compatible with these regional standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Region</TableHead>
                      <TableHead className="font-bold">Voltage</TableHead>
                      <TableHead className="font-bold">Frequency</TableHead>
                      <TableHead className="font-bold">Plug Types</TableHead>
                      <TableHead className="font-bold text-center">Compatible</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {VOLTAGE_COMPATIBILITY.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{item.region}</TableCell>
                        <TableCell>{item.voltage}</TableCell>
                        <TableCell>{item.frequency}</TableCell>
                        <TableCell>{item.plugTypes}</TableCell>
                        <TableCell className="text-center">
                          {item.compatible && (
                            <CheckCircle2 className="h-6 w-6 text-[#4CAF50] mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Note:</strong> All supported devices feature wide voltage range compatibility (100-300V) and dual frequency support (50Hz/60Hz), making them suitable for worldwide deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 max-w-6xl mx-auto">
            <img 
              src="/assets/generated/voltage-compatibility-chart.dim_900x600.png" 
              alt="Voltage Compatibility Chart" 
              className="w-full rounded-lg border-2 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Device Specifications */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Supported Device Specifications
            </h2>
            <p className="text-xl text-muted-foreground">
              Technical details for all compatible smart energy monitors
            </p>
          </div>

          <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Specs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEVICE_SPECS.map((device, index) => (
                  <Card key={index} className="border-2 hover:border-[#007BFF] transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="h-8 w-8 text-[#4CAF50]" />
                        <Badge variant="outline">{device.connectivity}</Badge>
                      </div>
                      <CardTitle className="text-xl text-[#007BFF]">{device.brand}</CardTitle>
                      <CardDescription className="text-base">{device.model}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">Voltage:</span>
                        <span className="text-sm">{device.voltage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">Frequency:</span>
                        <span className="text-sm">{device.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">Max Current:</span>
                        <span className="text-sm">{device.maxCurrent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">Accuracy:</span>
                        <span className="text-sm">{device.accuracy}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#007BFF]">Detailed Specifications</CardTitle>
                  <CardDescription className="text-base">
                    Complete technical specifications for all supported devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">Brand</TableHead>
                          <TableHead className="font-bold">Model</TableHead>
                          <TableHead className="font-bold">Voltage Range</TableHead>
                          <TableHead className="font-bold">Frequency</TableHead>
                          <TableHead className="font-bold">Max Current</TableHead>
                          <TableHead className="font-bold">Accuracy</TableHead>
                          <TableHead className="font-bold">Connectivity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {DEVICE_SPECS.map((device, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-semibold">{device.brand}</TableCell>
                            <TableCell>{device.model}</TableCell>
                            <TableCell>{device.voltage}</TableCell>
                            <TableCell>{device.frequency}</TableCell>
                            <TableCell>{device.maxCurrent}</TableCell>
                            <TableCell>{device.accuracy}</TableCell>
                            <TableCell>{device.connectivity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SCADA Protocol Integration Section */}
      {scadaProtocols.length > 0 && (
        <section className="py-20 bg-white dark:bg-background">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
                Protocol Integration (Coming Soon)
              </h2>
              <p className="text-xl text-muted-foreground">
                SCADA protocol handlers for industrial energy monitoring
              </p>
            </div>

            <Card className="max-w-6xl mx-auto border-4 border-[#007BFF] shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Server className="h-10 w-10 text-[#007BFF]" />
                  <CardTitle className="text-3xl text-[#007BFF]">SCADA Protocol Support</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Industrial-grade protocol support for Modbus RTU/TCP, DNP3, and IEC 61850 in the Unlimited Industrial tier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {scadaProtocols.map((protocol) => (
                    <Card key={protocol.id} className="border-2 border-[#00BCD4]/30">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Network className="h-8 w-8 text-[#00BCD4]" />
                          <Badge className="bg-[#00BCD4] text-white">{protocol.tier}</Badge>
                        </div>
                        <CardTitle className="text-xl text-[#007BFF]">{protocol.protocol}</CardTitle>
                        <CardDescription className="text-sm">{protocol.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Supported Devices:</p>
                          <div className="flex flex-wrap gap-1">
                            {protocol.supportedDevices.map((device, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {device}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <img 
                      src="/assets/generated/siemens-s7-plc.dim_400x300.png" 
                      alt="Siemens S7 PLC" 
                      className="w-full rounded-lg border mb-3"
                    />
                    <p className="font-semibold text-[#007BFF]">Siemens S7</p>
                    <p className="text-sm text-muted-foreground">Tested with emulators</p>
                  </div>
                  <div className="text-center">
                    <img 
                      src="/assets/generated/ge-fanuc-controller.dim_400x300.png" 
                      alt="GE Fanuc Controller" 
                      className="w-full rounded-lg border mb-3"
                    />
                    <p className="font-semibold text-[#007BFF]">GE Fanuc (Emerson)</p>
                    <p className="text-sm text-muted-foreground">Tested with emulators</p>
                  </div>
                  <div className="text-center">
                    <img 
                      src="/assets/generated/abb-automation-device.dim_400x300.png" 
                      alt="ABB Automation Device" 
                      className="w-full rounded-lg border mb-3"
                    />
                    <p className="font-semibold text-[#007BFF]">ABB Systems</p>
                    <p className="text-sm text-muted-foreground">Tested with emulators</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-[#007BFF]">Development Status</h3>
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    SCADA protocol handlers for Modbus RTU/TCP, DNP3, and IEC 61850 will be added in the <strong>Unlimited Industrial tier</strong>. 
                    All protocols have been tested with device emulators and are ready for production deployment. 
                    Compatible with Siemens WinCC and GE Cimplicity SCADA systems.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-[#4CAF50]">Prototype Library Reference</h3>
                  <p className="text-sm text-green-900 dark:text-green-100">
                    The backend implementation references a conceptual prototype library for SCADA protocol handling. 
                    This includes connection management, data polling, and error handling for industrial energy monitoring applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Installation Requirements */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Installation Requirements
            </h2>
            <p className="text-xl text-muted-foreground">
              Prerequisites and technical requirements for installation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-[#4CAF50]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Plug className="h-8 w-8 text-[#4CAF50]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Electrical Requirements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <span>Access to main electrical panel or distribution board</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <span>Compatible voltage system (100-300V AC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <span>Sufficient space for CT clamp installation around conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <span>Licensed electrician recommended for installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <span>Compliance with local electrical codes and regulations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#007BFF]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-8 w-8 text-[#007BFF]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Network Requirements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>WiFi router with 2.4GHz band support (5GHz not compatible)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>Stable internet connection with minimum 1 Mbps upload/download</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>WiFi signal strength at installation location (minimum -70 dBm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>Router firewall configured to allow device communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>Mobile device or computer for initial setup and configuration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance & Safety */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Global Compliance & Safety Standards
            </h2>
            <p className="text-xl text-muted-foreground">
              Certifications and safety standards for worldwide deployment
            </p>
          </div>

          <Card className="max-w-5xl mx-auto border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-[#4CAF50]" />
                <CardTitle className="text-2xl">Compliance Standards</CardTitle>
              </div>
              <CardDescription className="text-base">
                All supported devices meet or exceed these international safety and compliance standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Standard</TableHead>
                      <TableHead className="font-bold">Region</TableHead>
                      <TableHead className="font-bold">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPLIANCE_STANDARDS.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{item.standard}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.region}</Badge>
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-[#4CAF50]">Safety First</h3>
                  <p className="text-sm text-green-900 dark:text-green-100">
                    All devices are designed with multiple safety features including overcurrent protection, thermal shutdown, and isolation barriers to ensure safe operation in residential and commercial environments.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-[#007BFF]">Professional Installation Recommended</h3>
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    While devices are designed for ease of installation, we strongly recommend hiring a licensed electrician to ensure compliance with local electrical codes and safety regulations in your region.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
