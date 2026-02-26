import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, AlertTriangle, Wrench, RefreshCw, Target, Shield } from 'lucide-react';

export default function BestPracticesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00BCD4] via-[#007BFF] to-[#4CAF50] py-20">
        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Best Practices Guide
            </h1>
            <p className="text-xl md:text-2xl text-white/95">
              Expert recommendations for optimal performance, maintenance, and troubleshooting
            </p>
          </div>
        </div>
      </section>

      {/* Connection Maintenance */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Connection Maintenance
            </h2>
            <p className="text-xl text-muted-foreground">
              Keep your energy monitoring system running smoothly
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-[#4CAF50]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="h-8 w-8 text-[#4CAF50]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Regular Maintenance Schedule</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Follow this schedule to ensure long-term reliability and accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="weekly">
                    <AccordionTrigger className="text-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Weekly</Badge>
                        <span>Quick System Check</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Verify device is online and reporting data</li>
                        <li>Check for any error messages or alerts in app</li>
                        <li>Review power consumption trends for anomalies</li>
                        <li>Ensure WiFi connectivity is stable</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="monthly">
                    <AccordionTrigger className="text-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Monthly</Badge>
                        <span>Detailed Inspection</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Visually inspect CT clamps for secure closure and positioning</li>
                        <li>Check all cable connections for tightness</li>
                        <li>Compare device readings with utility meter (±5% acceptable)</li>
                        <li>Clean device exterior with dry cloth (power off first)</li>
                        <li>Review firmware version and update if available</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="quarterly">
                    <AccordionTrigger className="text-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Quarterly</Badge>
                        <span>Comprehensive Maintenance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Perform full calibration check against utility meter</li>
                        <li>Test polarity on all CT clamps with known loads</li>
                        <li>Inspect electrical panel for any changes or additions</li>
                        <li>Review and optimize WiFi network performance</li>
                        <li>Backup historical data and settings</li>
                        <li>Document any maintenance performed</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="annual">
                    <AccordionTrigger className="text-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Annual</Badge>
                        <span>Professional Service</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Schedule professional electrician inspection</li>
                        <li>Verify all electrical connections meet current codes</li>
                        <li>Consider CT clamp replacement if accuracy degrades</li>
                        <li>Review system configuration for optimization opportunities</li>
                        <li>Update documentation and installation records</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-[#007BFF]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#007BFF]">Connection Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Keep CT clamps away from high-temperature sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Ensure cables are not pinched or under tension</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Maintain proper spacing between CT clamps (minimum 2 inches)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Label all CT clamps for easy identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Document installation configuration for future reference</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00BCD4]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#007BFF]">Common Issues to Avoid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Installing CT clamps on bundled cables (use single conductors)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Incorrect polarity causing negative readings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Poor WiFi signal leading to data gaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Neglecting firmware updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Ignoring calibration drift over time</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Firmware Updates */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Firmware Updates
            </h2>
            <p className="text-xl text-muted-foreground">
              Keep your devices up-to-date for optimal performance and security
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-[#007BFF]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="h-8 w-8 text-[#007BFF]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Update Procedures</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Follow these steps to safely update your device firmware
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Before Updating</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Backup current device configuration and settings</li>
                    <li>Ensure stable WiFi connection (minimum -60 dBm signal strength)</li>
                    <li>Verify device has adequate power supply</li>
                    <li>Read release notes for new firmware version</li>
                    <li>Schedule update during low-usage period</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">During Update</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Do not power off device or interrupt WiFi connection</li>
                    <li>Monitor update progress in manufacturer's app</li>
                    <li>Allow 5-15 minutes for update to complete</li>
                    <li>Device may reboot multiple times - this is normal</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">After Update</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verify device comes back online successfully</li>
                    <li>Check firmware version matches expected update</li>
                    <li>Test basic functionality (power readings, connectivity)</li>
                    <li>Review any new features or settings</li>
                    <li>Monitor for 24 hours to ensure stability</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Automatic Updates:</strong> Most devices support automatic firmware updates. Enable this feature in device settings for hassle-free maintenance, but ensure updates occur during off-peak hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calibration */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Calibration Recommendations
            </h2>
            <p className="text-xl text-muted-foreground">
              Maintain accuracy with proper calibration procedures
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-[#4CAF50]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-8 w-8 text-[#4CAF50]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Calibration Process</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Step-by-step guide to calibrating your energy monitor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="baseline">
                    <AccordionTrigger className="text-lg">Step 1: Establish Baseline</AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <p>Compare device readings with your utility meter over a 24-hour period:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Record utility meter reading at start time (e.g., 8:00 AM)</li>
                        <li>Note device's total consumption reading at same time</li>
                        <li>Wait exactly 24 hours</li>
                        <li>Record both readings again at same time next day</li>
                        <li>Calculate difference for both meters</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="calculate">
                    <AccordionTrigger className="text-lg">Step 2: Calculate Calibration Factor</AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <p>Determine if calibration adjustment is needed:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Calculate percentage difference: (Utility - Device) / Utility × 100</li>
                        <li>If difference is within ±5%, no adjustment needed</li>
                        <li>If difference exceeds ±5%, calibration recommended</li>
                        <li>Calibration factor = Utility Reading / Device Reading</li>
                      </ul>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-3">
                        <p className="font-mono text-sm">
                          Example: Utility shows 25.0 kWh, device shows 24.0 kWh<br />
                          Calibration factor = 25.0 / 24.0 = 1.042
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="apply">
                    <AccordionTrigger className="text-lg">Step 3: Apply Calibration</AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <p>Enter calibration factor in device settings:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Open manufacturer's app and navigate to device settings</li>
                        <li>Find "Calibration" or "Advanced Settings" section</li>
                        <li>Enter calculated calibration factor</li>
                        <li>Save settings and allow device to restart if required</li>
                        <li>Verify readings now match utility meter more closely</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="verify">
                    <AccordionTrigger className="text-lg">Step 4: Verify Calibration</AccordionTrigger>
                    <AccordionContent className="text-base space-y-3">
                      <p>Confirm calibration was successful:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Repeat 24-hour comparison test</li>
                        <li>Verify readings now within ±2% of utility meter</li>
                        <li>If still outside acceptable range, repeat calibration process</li>
                        <li>Document calibration date and factor for future reference</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-yellow-900 dark:text-yellow-100">When to Recalibrate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                    <li>After any CT clamp repositioning or replacement</li>
                    <li>Following electrical panel modifications</li>
                    <li>If readings drift more than 5% from utility meter</li>
                    <li>At least annually as part of maintenance schedule</li>
                    <li>After firmware updates that affect measurement algorithms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Troubleshooting Principles */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#007BFF]">
              Core Troubleshooting Principles
            </h2>
            <p className="text-xl text-muted-foreground">
              Systematic approach to diagnosing and resolving issues
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-[#007BFF]/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-8 w-8 text-[#007BFF]" />
                  <CardTitle className="text-2xl text-[#007BFF]">Systematic Verification Method</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Follow this structured approach to identify and resolve issues efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#4CAF50]">1. Define the Problem</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>What exactly is not working? Be specific.</li>
                    <li>When did the problem start?</li>
                    <li>Has anything changed recently? (firmware, electrical work, network)</li>
                    <li>Is the problem consistent or intermittent?</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#4CAF50]">2. Check the Basics First</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Power: Is the device receiving power? Check LED indicators.</li>
                    <li>Connectivity: Is WiFi working? Can you access the device in the app?</li>
                    <li>Physical connections: Are all cables and CT clamps secure?</li>
                    <li>Settings: Have any configuration changes been made?</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#4CAF50]">3. Isolate the Issue</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Test one component at a time</li>
                    <li>Use process of elimination to narrow down the cause</li>
                    <li>Compare with known working configuration if available</li>
                    <li>Document what you've tried and the results</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#4CAF50]">4. Verify the Solution</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>After making changes, test thoroughly</li>
                    <li>Monitor for 24-48 hours to ensure problem is resolved</li>
                    <li>Document the solution for future reference</li>
                    <li>Update maintenance records</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-[#007BFF]">The Importance of Polarity</h3>
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                    <strong>Polarity is critical</strong> for accurate energy monitoring. Incorrect CT clamp orientation is the #1 cause of negative or inaccurate readings.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>Always verify arrow on CT clamp points toward load (away from utility meter)</li>
                    <li>Test polarity with known high-power appliance</li>
                    <li>Positive readings indicate correct polarity</li>
                    <li>If readings are negative, reverse CT clamp orientation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-[#4CAF50]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#007BFF]">Prevention is Key</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Most issues can be prevented with proper installation and regular maintenance:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Follow installation guide carefully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Perform regular maintenance checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Keep firmware up-to-date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span>Document configuration and changes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00BCD4]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#007BFF]">When to Seek Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact professional support if:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Problem persists after systematic troubleshooting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Electrical safety concerns arise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Hardware damage is suspected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Complex electrical panel modifications needed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
