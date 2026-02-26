import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, CheckCircle2, AlertCircle, Settings, Zap } from 'lucide-react';
import { toast } from 'sonner';

// Email automation rules with sharp, founder-voice style responses
const EMAIL_RULES = [
  {
    id: 'emporia-connection',
    keywords: ['emporia', 'vue', 'not connecting', 'connection'],
    subject: 'Emporia Vue not connecting',
    response: "Log out/in of Emporia app. Hit 'Refresh Token' in Devices. 90% fixed.",
  },
  {
    id: 'add-sense',
    keywords: ['add sense', 'sense integration', 'connect sense'],
    subject: 'Add Sense',
    response: 'Go to Devices → Sense → OAuth login → done in 30 sec. https://ecopowerhub.ai/devices/sense',
  },
  {
    id: 'ecotokens-timing',
    keywords: ['ecotokens', 'payout', 'when', 'timing'],
    subject: 'EcoTokens timing',
    response: 'First payout 24 hrs after your first shift. Check /rewards.',
  },
  {
    id: 'bill-high',
    keywords: ['bill', 'still high', 'expensive', 'not saving'],
    subject: 'Bill still high',
    response: "Run 'Find Vampires' in dashboard — A/C at 2 AM is usually the culprit.",
  },
  {
    id: 'data-safe',
    keywords: ['data safe', 'security', 'privacy', 'secure'],
    subject: 'Data safe',
    response: 'Yes. Read-only. End-to-end encrypted. You own it. No sales, ever.',
  },
  {
    id: 'lost-password',
    keywords: ['lost password', 'forgot password', 'reset password'],
    subject: 'Lost password',
    response: 'Reset at /login → email link expires in 10 min.',
  },
  {
    id: 'tesla-powerwall',
    keywords: ['tesla', 'powerwall', 'connect'],
    subject: 'Connect Tesla Powerwall',
    response: 'Devices → Tesla → OAuth → approve read-only.',
  },
  {
    id: 'home-assistant',
    keywords: ['home assistant', 'ha token', 'connect ha'],
    subject: 'Home Assistant',
    response: 'Paste your HA token in Devices. Takes 15 sec.',
  },
  {
    id: 'solar-integration',
    keywords: ['solar', 'enphase', 'solaredge', 'generac'],
    subject: 'Solar integration',
    response: 'Yep. Enphase, SolarEdge, Generac — all in. Connect now.',
  },
  {
    id: 'delete-account',
    keywords: ['delete account', 'remove data', 'cancel'],
    subject: 'Delete account',
    response: 'Settings → Delete Data. Gone in 5 min.',
  },
  {
    id: 'no-push-alerts',
    keywords: ['no alerts', 'push notification', 'notifications'],
    subject: 'No push alerts',
    response: 'Check app permissions. iOS: Settings → Notifications → EcoPowerHub → ON.',
  },
  {
    id: 'savings-average',
    keywords: ['savings', 'average', 'how much', 'typical'],
    subject: 'Savings average',
    response: '$150–$400 first year. Most hit $237.',
  },
  {
    id: 'shelly-plugs',
    keywords: ['shelly', 'plug', 'compatible'],
    subject: 'Shelly plugs',
    response: 'Absolutely. Plug in → Devices → Shelly → OAuth.',
  },
  {
    id: 'dashboard-missing',
    keywords: ['dashboard', 'blank', 'missing', 'not loading'],
    subject: 'Dashboard missing',
    response: 'After login you are there. If blank, clear cache.',
  },
  {
    id: 'ecotoken-value',
    keywords: ['ecotoken value', 'token worth', 'cash out'],
    subject: 'EcoToken value',
    response: '1 token = 1 kWh saved. Trade or cash out at $0.09 each.',
  },
  {
    id: 'matter-compatibility',
    keywords: ['matter', 'compatible', 'support'],
    subject: 'Matter compatibility',
    response: 'Every Matter plug or thermostat — one-tap connect.',
  },
  {
    id: 'ev-charger',
    keywords: ['ev charger', 'electric vehicle', 'neocharge', 'span'],
    subject: 'EV charger missing',
    response: 'Add NeoCharge or Span → rescan.',
  },
  {
    id: 'refunds',
    keywords: ['refund', 'return', 'money back'],
    subject: 'Refunds',
    response: 'We are free. For hardware, return to Emporia/Sense. We guide.',
  },
  {
    id: 'multilingual',
    keywords: ['language', 'spanish', 'french', 'german', 'multilingual'],
    subject: 'Multilingual support',
    response: 'Voice coaching in Spanish, French, German — toggle in Settings.',
  },
  {
    id: 'data-ownership',
    keywords: ['data ownership', 'who owns', 'my data'],
    subject: 'Energy data ownership',
    response: 'You own your energy data. We just crunch it.',
  },
];

const FALLBACK_CONFIG = {
  message: 'Got it — forwarding to EcoPowerHub AI Team.',
  ccEmail: 'Bill Martin Miyesa',
};

const SIGNATURE = '— The EcoPowerHub AI Team (P.S. Black coffee helps focus on savings.)';

export default function EmailAutomationPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const handleToggleAutomation = () => {
    setIsEnabled(!isEnabled);
    toast.success(
      isEnabled 
        ? 'Email automation disabled' 
        : 'Email automation enabled — support@ecopowerhub.ai is live'
    );
  };

  const handleTestRule = (ruleId: string) => {
    const rule = EMAIL_RULES.find(r => r.id === ruleId);
    if (rule) {
      toast.success(`Test email sent with response: "${rule.response}"`);
    }
  };

  return (
    <div className="container py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Email Automation</h1>
            <p className="text-muted-foreground">
              Auto-respond to support@ecopowerhub.ai with sharp, founder-voice replies. Black coffee at 6 AM style.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isEnabled ? 'default' : 'secondary'} className="text-sm">
              {isEnabled ? (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Active
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Disabled
                </>
              )}
            </Badge>
            <div className="flex items-center gap-2">
              <Label htmlFor="automation-toggle" className="text-sm font-medium">
                Auto-respond
              </Label>
              <Switch
                id="automation-toggle"
                checked={isEnabled}
                onCheckedChange={handleToggleAutomation}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>
              Email automation settings and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Email address</span>
                <span className="font-mono text-xs">support@ecopowerhub.ai</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active rules</span>
                <span className="font-semibold">{EMAIL_RULES.length}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fallback CC</span>
                <span className="text-xs">{FALLBACK_CONFIG.ccEmail}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing mode</span>
                <Badge variant="outline" className="text-xs">
                  Inbound only
                </Badge>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold">Signature</h4>
              <p className="text-xs text-muted-foreground italic border-l-2 border-primary pl-3">
                {SIGNATURE}
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold">Fallback Response</h4>
              <p className="text-xs text-muted-foreground border-l-2 border-muted pl-3">
                {FALLBACK_CONFIG.message}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Rules List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Auto-Response Rules ({EMAIL_RULES.length})
            </CardTitle>
            <CardDescription>
              Keyword-matched canned replies with founder-voice style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {EMAIL_RULES.map((rule, index) => (
                  <Card
                    key={rule.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedRule === rule.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <CardTitle className="text-sm">{rule.subject}</CardTitle>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {rule.keywords.map((keyword) => (
                              <Badge key={keyword} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestRule(rule.id);
                          }}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    {selectedRule === rule.id && (
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Response</Label>
                            <p className="text-sm mt-1 p-3 bg-muted rounded-md border-l-2 border-primary">
                              {rule.response}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Full Email Preview</Label>
                            <div className="text-xs mt-1 p-3 bg-background rounded-md border space-y-2">
                              <p className="font-mono text-muted-foreground">To: customer@example.com</p>
                              <p className="font-mono text-muted-foreground">From: support@ecopowerhub.ai</p>
                              <p className="font-mono text-muted-foreground">Subject: Re: {rule.subject}</p>
                              <Separator />
                              <p>{rule.response}</p>
                              <p className="italic text-muted-foreground mt-4">{SIGNATURE}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Stats and Activity */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Emails Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Auto-Responses Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,089</div>
            <p className="text-xs text-muted-foreground mt-1">87% match rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Forwarded to Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">158</div>
            <p className="text-xs text-muted-foreground mt-1">13% fallback rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
