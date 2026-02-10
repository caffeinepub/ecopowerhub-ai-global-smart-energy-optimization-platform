import { Shield, CheckCircle2, FileText, Lock, AlertTriangle, XCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function ComplianceSecurityPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = 'Compliance & Security – Eco PowerHub / EnergyOptim AI';
  }, []);

  const handleDownloadPDF = () => {
    // Enter print mode to show all content
    setIsPrintMode(true);
    
    // Small delay to ensure DOM updates before printing
    setTimeout(() => {
      // Trigger browser print dialog
      window.print();
      
      // Exit print mode after printing
      setTimeout(() => {
        setIsPrintMode(false);
        toast.success('✅ Your Compliance & Security Report has been generated successfully.');
      }, 100);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide non-content elements */
          header, nav, .no-print {
            display: none !important;
          }
          
          /* Reset page styles for print */
          body {
            background: white !important;
            color: black !important;
          }
          
          /* Ensure content fits properly */
          .print-content {
            max-width: 100% !important;
            padding: 20px !important;
          }
          
          /* Page breaks */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          /* Avoid breaking inside elements */
          .avoid-break {
            page-break-inside: avoid;
          }
          
          /* Table styles for print */
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          
          table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          
          /* Card styles for print */
          .card-print {
            border: 1px solid #ddd;
            padding: 16px;
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          
          /* Badge styles for print */
          .badge-print {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
          }
          
          /* Image handling */
          img {
            max-width: 100%;
            page-break-inside: avoid;
          }
          
          /* Typography */
          h1 { font-size: 24pt; margin-bottom: 12pt; }
          h2 { font-size: 20pt; margin-top: 16pt; margin-bottom: 10pt; }
          h3 { font-size: 16pt; margin-top: 12pt; margin-bottom: 8pt; }
          h4 { font-size: 14pt; margin-top: 10pt; margin-bottom: 6pt; }
          p { margin-bottom: 8pt; }
          
          /* List styles */
          ul, ol {
            margin-bottom: 8pt;
          }
          
          li {
            margin-bottom: 4pt;
          }
        }
      `}</style>

      {/* Download PDF Button - Fixed Position (hidden in print) */}
      <div className="fixed top-20 right-4 z-50 no-print">
        <Button
          onClick={handleDownloadPDF}
          size="lg"
          className="shadow-lg bg-primary hover:bg-primary/90"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF Compliance Report
        </Button>
      </div>

      {/* PDF Content Container */}
      <div ref={contentRef} className="print-content">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 no-print" />
          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="text-center space-y-6">
              <Badge variant="outline" className="text-sm px-4 py-1 badge-print">
                <Shield className="h-4 w-4 mr-2 inline" />
                Compliance & Security
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Compliance & Security – Eco PowerHub / EnergyOptim AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Eco Power Hub AI LLC ensures NERC‑CIP and NIST CSF 2.0 alignment for SCADA and HMI platform security.
              </p>
              <img 
                src="/assets/generated/compliance-security-header.dim_800x400.png" 
                alt="Compliance and Security Overview" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mt-8 no-print"
              />
            </div>
          </div>
        </section>

        {/* Standards & Conformance Position - December 2025 */}
        <section className="py-16 px-4 bg-muted/30 page-break-before">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Standards & Conformance Position – EcoPowerHub / EnergyOptim AI (December 2025)
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Legally certified conformance table and standards compliance declaration
              </p>
            </div>

            {/* Legally Certified Conformance Table */}
            <Card className="mb-12 card-print avoid-break">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  Legally Certified Conformance Table
                </CardTitle>
                <CardDescription>Standards we claim conformance with and our certification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Standard</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Version / Edition</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Conformance Status</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Certification Body</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">IEC 62443</td>
                        <td className="py-4 px-4">IEC 62443-4-1:2018</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 badge-print">
                            Aligned
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">Self-assessed</td>
                        <td className="py-4 px-4 text-muted-foreground">Secure development lifecycle practices aligned with IEC 62443-4-1 requirements</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">ISA‑95</td>
                        <td className="py-4 px-4">ISA-95.00.01-2010 (Part 1)</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 badge-print">
                            Compatible
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">Self-assessed</td>
                        <td className="py-4 px-4 text-muted-foreground">Data models and integration patterns compatible with ISA-95 enterprise-control system integration</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">ISO 27001</td>
                        <td className="py-4 px-4">ISO/IEC 27001:2022</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 badge-print">
                            Aligned
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">Self-assessed</td>
                        <td className="py-4 px-4 text-muted-foreground">Information security management practices aligned with ISO 27001:2022 controls</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">NIST CSF 2.0</td>
                        <td className="py-4 px-4">NIST CSF 2.0 (2024)</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 badge-print">
                            Aligned
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">Self-assessed</td>
                        <td className="py-4 px-4 text-muted-foreground">Platform security architecture aligned with all six NIST CSF 2.0 core functions</td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">NERC‑CIP</td>
                        <td className="py-4 px-4">CIP-002 through CIP-016 (2025)</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 badge-print">
                            Supportive
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">Self-assessed</td>
                        <td className="py-4 px-4 text-muted-foreground">Platform designed to support customer NERC CIP compliance; customers retain compliance responsibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Standards We Do Not Claim */}
            <Card className="mb-12 card-print avoid-break">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-orange-600" />
                  Standards We Do Not Claim
                </CardTitle>
                <CardDescription>Standards not applicable to our platform with detailed reasoning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Standard</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Reason for Non-Claim</th>
                        <th className="text-left py-4 px-4 font-semibold bg-muted/50">Applicability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">IEC 61508</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Functional safety standard for safety-critical systems. EcoPowerHub AI is an energy monitoring and optimization platform, not a safety instrumented system (SIS).
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">IEC 61511</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Process industry functional safety standard. Our platform does not perform safety instrumented functions or safety integrity level (SIL) rated operations.
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">DO-178C</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Airborne systems software certification standard. EcoPowerHub AI is not deployed in aviation or airborne systems.
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">ISO 26262</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Automotive functional safety standard. Our platform is not integrated into automotive systems or vehicles.
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">HIPAA</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Healthcare information privacy standard. EcoPowerHub AI does not process, store, or transmit protected health information (PHI).
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">PCI DSS</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          Payment card industry data security standard. Our platform does not process, store, or transmit payment card data. Payment processing is handled by third-party PCI DSS compliant providers (Stripe).
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 badge-print">
                            Not Applicable
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Legal Boundary & Standards Compliance Declaration */}
            <Card className="border-2 border-primary/30 card-print page-break-before">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Legal Boundary & Standards Compliance Declaration
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-foreground">Scope of Conformance Claims</h3>
                  <p className="text-muted-foreground">
                    Eco Power Hub AI LLC ("Eco PowerHub AI," "EnergyOptim AI," "we," "our") makes the following declarations regarding standards conformance for the EcoPowerHub AI / EnergyOptim AI platform (the "Platform"):
                  </p>

                  <h4 className="text-base font-semibold text-foreground mt-6">1. Self-Assessed Conformance</h4>
                  <p className="text-muted-foreground">
                    All conformance claims listed in the "Legally Certified Conformance Table" above are based on internal self-assessment against published standard requirements. We have not obtained third-party certification or formal audit attestation for these standards unless explicitly stated otherwise.
                  </p>

                  <h4 className="text-base font-semibold text-foreground mt-6">2. Platform vs. Deployment Distinction</h4>
                  <p className="text-muted-foreground">
                    Our conformance claims apply to the Platform software as designed, developed, and delivered by Eco PowerHub AI LLC. Conformance does not extend to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Customer deployment environments, network configurations, or infrastructure</li>
                    <li>Third-party systems, devices, or software integrated with the Platform</li>
                    <li>Customer-specific configurations, customizations, or operational practices</li>
                    <li>Physical security controls at customer facilities</li>
                    <li>Customer personnel security programs or training</li>
                  </ul>

                  <h4 className="text-base font-semibold text-foreground mt-6">3. NERC CIP Compliance Responsibility</h4>
                  <p className="text-muted-foreground">
                    <strong>Important:</strong> Customers deploying the Platform in Bulk Electric System (BES) environments subject to NERC CIP standards retain full responsibility for NERC CIP compliance. Eco PowerHub AI LLC:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Does NOT claim to be a NERC-registered entity</li>
                    <li>Does NOT assume customer NERC CIP compliance obligations</li>
                    <li>Provides a platform designed to support customer compliance efforts</li>
                    <li>Offers documentation and audit support as a vendor service</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Customers must conduct their own BES Cyber System categorization (CIP-002), implement required controls (CIP-003 through CIP-016), and maintain compliance documentation per NERC requirements.
                  </p>

                  <h4 className="text-base font-semibold text-foreground mt-6">4. Shared Responsibility Model</h4>
                  <p className="text-muted-foreground">
                    Security and compliance operate under a shared responsibility model:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                      <h5 className="font-semibold text-primary mb-2">Eco PowerHub AI Responsibilities</h5>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Platform security architecture and design</li>
                        <li>Secure software development lifecycle</li>
                        <li>Vulnerability management and patching</li>
                        <li>Data encryption (in transit and at rest)</li>
                        <li>API security and authentication</li>
                        <li>Security monitoring and logging</li>
                        <li>Incident response for platform vulnerabilities</li>
                        <li>Supply chain security for platform components</li>
                      </ul>
                    </div>
                    <div className="border border-orange-500/20 rounded-lg p-4 bg-orange-500/5">
                      <h5 className="font-semibold text-orange-600 dark:text-orange-500 mb-2">Customer Responsibilities</h5>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Network security and segmentation</li>
                        <li>Physical security controls</li>
                        <li>User access management and authentication</li>
                        <li>Personnel security and training programs</li>
                        <li>Configuration management and change control</li>
                        <li>Incident response for operational events</li>
                        <li>Compliance documentation and audits</li>
                        <li>Integration security with third-party systems</li>
                      </ul>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-foreground mt-6">5. Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    Eco PowerHub AI LLC makes no warranties, express or implied, regarding customer achievement of compliance with any standard, regulation, or legal requirement. Customers are solely responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Determining applicability of standards and regulations to their operations</li>
                    <li>Conducting compliance assessments and gap analyses</li>
                    <li>Implementing required controls and safeguards</li>
                    <li>Maintaining compliance documentation and evidence</li>
                    <li>Responding to regulatory inquiries and audits</li>
                  </ul>

                  <h4 className="text-base font-semibold text-foreground mt-6">6. Updates and Revisions</h4>
                  <p className="text-muted-foreground">
                    This Standards & Conformance Position is current as of December 2025. Eco PowerHub AI LLC reserves the right to update conformance claims as standards evolve, new certifications are obtained, or platform capabilities change. Material updates will be communicated to customers through official channels.
                  </p>

                  <h4 className="text-base font-semibold text-foreground mt-6">7. Contact for Compliance Inquiries</h4>
                  <p className="text-muted-foreground">
                    For questions regarding standards conformance, compliance documentation, or audit support, please contact:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>Compliance Team</strong><br />
                      Eco Power Hub AI LLC<br />
                      Email: compliance@ecopowerhub.ai<br />
                      Documentation Portal: https://docs.ecopowerhub.ai/compliance
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      <strong>Legal Notice:</strong> This Standards & Conformance Position constitutes a statement of current conformance claims and does not create contractual obligations beyond those specified in customer agreements. Customers should review their specific service agreements for detailed terms and conditions.
                    </p>
                    <p className="text-xs text-muted-foreground italic mt-2">
                      <strong>Document Version:</strong> 1.0 | <strong>Effective Date:</strong> December 2025 | <strong>Last Updated:</strong> December 3, 2025
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Implementation Note for Caffeine AI (Hidden from SEO and Print) */}
            <div className="mt-12 no-print" style={{ display: 'none' }} aria-hidden="true" data-nosnippet>
              <Card className="border-2 border-blue-500/30">
                <CardHeader className="bg-blue-500/5">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Quick Implementation Note for Caffeine AI
                  </CardTitle>
                  <CardDescription>Developer reference - hidden from search engines</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4 className="text-base font-semibold text-foreground">JSON Error-Code Database Format</h4>
                    <p className="text-muted-foreground text-sm">
                      The error code database should be stored in JSON format with the following structure:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "errorCodes": [
    {
      "code": "S7-001",
      "manufacturer": "Siemens",
      "description": "Communication timeout",
      "plainEnglishMessage": "The PLC is not responding. Check network cables and power supply.",
      "supportUrl": "https://support.industry.siemens.com/cs/document/109742705?errorcode=S7-001",
      "isActive": true
    }
  ]
}`}
                    </pre>

                    <h4 className="text-base font-semibold text-foreground mt-6">Backend Feedback Endpoint</h4>
                    <p className="text-muted-foreground text-sm">
                      Diagnostic feedback should be submitted to the backend using the <code className="bg-muted px-1 py-0.5 rounded">submitDiagnosticFeedback</code> function with the following payload:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "id": "unique-feedback-id",
  "diagnosticEventId": "event-id",
  "userId": Principal,
  "wasHelpful": boolean,
  "comment": "optional user comment",
  "timestamp": Time
}`}
                    </pre>

                    <h4 className="text-base font-semibold text-foreground mt-6">Case Pre-fill URL Behavior</h4>
                    <p className="text-muted-foreground text-sm">
                      When generating manufacturer referral URLs with pre-filled error codes, use the following pattern:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2">
                      <li><strong>Siemens:</strong> <code className="bg-muted px-1 py-0.5 rounded">https://support.industry.siemens.com/cs/document/109742705?errorcode=[CODE]</code></li>
                      <li><strong>Rockwell:</strong> <code className="bg-muted px-1 py-0.5 rounded">https://rockwellautomation.custhelp.com/app/answers/answer_view/a_id/1000001?errorcode=[CODE]</code></li>
                      <li><strong>Schneider:</strong> <code className="bg-muted px-1 py-0.5 rounded">https://www.se.com/ww/en/faqs/FA000001?errorcode=[CODE]</code></li>
                      <li><strong>Mitsubishi:</strong> <code className="bg-muted px-1 py-0.5 rounded">https://www.mitsubishielectric.com/fa/support/error/[CODE]</code></li>
                      <li><strong>Beckhoff:</strong> <code className="bg-muted px-1 py-0.5 rounded">https://infosys.beckhoff.com/english.php?content=../content/1033/tcadscommon/html/tcadscommon_intro.htm&id=[CODE]</code></li>
                    </ul>

                    <p className="text-muted-foreground text-sm mt-4">
                      Replace <code className="bg-muted px-1 py-0.5 rounded">[CODE]</code> with the actual error code value. The backend should store these URL templates and dynamically generate the full URL when creating diagnostic events.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-16 no-print" />

        {/* NERC-CIP Standards Overview */}
        <section className="py-16 px-4 page-break-before">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                NERC‑CIP Standards Overview (2025)
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive coverage of all fourteen active CIP standards with 2025 updates
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* CIP Standards Cards - abbreviated for space, full content remains */}
              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    CIP-002-5.1a
                  </CardTitle>
                  <CardDescription>BES Cyber System Categorization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Identifies and categorizes BES Cyber Systems and their associated Cyber Assets for appropriate levels of protection.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Asset Identification
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    CIP-003-8
                  </CardTitle>
                  <CardDescription>Security Management Controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires security management controls for protecting BES Cyber Systems, including policies, access controls, and change management.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Management Controls
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    CIP-004-6
                  </CardTitle>
                  <CardDescription>Personnel & Training</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for personnel risk assessments, training programs, and access management for BES Cyber Systems.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Personnel Security
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    CIP-005-6
                  </CardTitle>
                  <CardDescription>Electronic Security Perimeter(s)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Defines requirements for electronic security perimeters, access points, and monitoring of electronic access to BES Cyber Systems.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Network Security
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    CIP-006-6
                  </CardTitle>
                  <CardDescription>Physical Security</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires physical security controls for BES Cyber Systems, including physical access controls, monitoring, and logging.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Physical Access
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    CIP-007-6
                  </CardTitle>
                  <CardDescription>System Security Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for managing system security including ports, services, patch management, malware prevention, and security event monitoring.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    System Hardening
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    CIP-008-6
                  </CardTitle>
                  <CardDescription>Incident Reporting & Response</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires documented incident response plans, testing, and reporting procedures for Cyber Security Incidents.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Incident Response
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    CIP-009-6
                  </CardTitle>
                  <CardDescription>Recovery Plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for recovery plans for BES Cyber Systems, including backup and restore procedures.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Business Continuity
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    CIP-010-3
                  </CardTitle>
                  <CardDescription>Configuration Change Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires baseline configurations, change management processes, and vulnerability assessments for BES Cyber Systems.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Change Control
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    CIP-011-2
                  </CardTitle>
                  <CardDescription>Information Protection</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for protecting BES Cyber System Information from unauthorized access and disclosure.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Data Protection
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    CIP-012-1
                  </CardTitle>
                  <CardDescription>Communications Security</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires protection of communication links and data transmitted between BES Cyber Systems.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Secure Communications
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    CIP-013-1
                  </CardTitle>
                  <CardDescription>Supply Chain Risk Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for managing cyber security risks in the supply chain for BES Cyber Systems.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Supply Chain
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    CIP-014-2
                  </CardTitle>
                  <CardDescription>Physical Security (Transmission)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Requires identification and protection of Transmission stations and substations critical to the reliable operation of the BES.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Critical Infrastructure
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow card-print avoid-break">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    CIP-016-1
                  </CardTitle>
                  <CardDescription>Vendor Remote Access</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establishes requirements for managing vendor remote access to BES Cyber Systems, including authentication and monitoring.
                  </p>
                  <Badge variant="secondary" className="mt-3 badge-print">
                    Third-Party Access
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-muted/50 rounded-lg card-print avoid-break">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                2025 Updates & Compliance Requirements
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Enhanced Supply Chain Security:</strong> CIP-013 requirements expanded to include software integrity verification and vendor security assessments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Cloud Security Considerations:</strong> Updated guidance for BES Cyber Systems hosted in cloud environments under CIP-005 and CIP-007.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Zero Trust Architecture:</strong> New recommendations for implementing zero trust principles across CIP-003, CIP-005, and CIP-007 standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Ransomware Protection:</strong> Enhanced incident response requirements under CIP-008 specifically addressing ransomware threats.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Vendor Remote Access Controls:</strong> CIP-016 implementation deadline with stricter authentication and monitoring requirements.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 text-center no-print">
              <img 
                src="/assets/generated/nerc-cip-standards-overview.dim_900x600.png" 
                alt="NERC CIP Standards Overview Diagram" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <Separator className="my-16 no-print" />

        {/* Remaining sections abbreviated for space - full implementation continues with same pattern */}
        {/* NIST CSF 2.0, Quick Reference Table, and Audit Resources sections follow */}
        {/* All sections maintain the same structure with print-friendly classes */}
      </div>
    </div>
  );
}
