import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Video, 
  Image as ImageIcon, 
  Copy, 
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const AD_SCRIPT = {
  title: "I Saved $187 This Month Without Changing My Life – Here's How",
  duration: "60 seconds",
  format: "Vertical (9:16)",
  scenes: [
    {
      time: "0-5s",
      visual: "Close-up of electric bill showing $187 in red",
      voiceover: "My electric bill was killing me. $187 last month alone.",
      onScreen: "$187 😱"
    },
    {
      time: "5-10s",
      visual: "Hand holding phone, opening EcoPowerHub AI app",
      voiceover: "Then I found EcoPowerHub AI. Took 11 seconds to connect my Emporia monitor.",
      onScreen: "11 seconds ⚡"
    },
    {
      time: "10-20s",
      visual: "Dashboard showing real-time energy usage with colorful charts",
      voiceover: "It showed me exactly where my money was going. My AC was running 24/7. My pool pump was on during peak hours.",
      onScreen: "Real-time insights 📊"
    },
    {
      time: "20-30s",
      visual: "Quick cuts: adjusting thermostat, setting pool timer, unplugging devices",
      voiceover: "I made three tiny changes. Adjusted my AC schedule. Moved pool pump to off-peak. Unplugged vampire devices.",
      onScreen: "3 simple changes ✅"
    },
    {
      time: "30-40s",
      visual: "Dashboard showing downward trend in energy costs",
      voiceover: "First month? Saved $62. Second month? $89. This month? $187 saved.",
      onScreen: "$187 saved! 💰"
    },
    {
      time: "40-50s",
      visual: "Person smiling, holding phone with savings dashboard",
      voiceover: "Same house. Same lifestyle. Just smarter energy use.",
      onScreen: "No sacrifices needed 🎉"
    },
    {
      time: "50-60s",
      visual: "EcoPowerHub AI logo with app interface",
      voiceover: "Link in bio. Connect your Emporia in 11 seconds and start saving today.",
      onScreen: "Link in bio 👇\nStart saving now"
    }
  ],
  cta: "Link in bio – connect your Emporia in 11 seconds and start saving today.",
  targetPlatforms: ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook Reels"],
  hashtags: ["#EnergySavings", "#SmartHome", "#SaveMoney", "#EcoPowerHub", "#ElectricBill", "#HomeAutomation"]
};

const BANNER_VARIANTS = [
  {
    id: "variant-a",
    headline: "I Saved $187 This Month",
    subheadline: "Without changing my lifestyle",
    size: "1920×1080",
    format: "Web/YouTube Thumbnail",
    downloadUrl: "#"
  },
  {
    id: "variant-b",
    headline: "Cut Your Electric Bill in Half",
    subheadline: "11-second setup. Real results.",
    size: "1080×1080",
    format: "Instagram/X Post",
    downloadUrl: "#"
  },
  {
    id: "variant-c",
    headline: "Stop Wasting Money on Energy",
    subheadline: "See where every dollar goes",
    size: "1200×628",
    format: "Facebook/Link Preview",
    downloadUrl: "#"
  }
];

export default function MarketingCampaignAssetsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyFullScript = () => {
    const fullScript = AD_SCRIPT.scenes.map((scene, idx) => 
      `Scene ${idx + 1} (${scene.time}):\nVisual: ${scene.visual}\nVoiceover: "${scene.voiceover}"\nOn-Screen Text: ${scene.onScreen}\n`
    ).join('\n');
    
    copyToClipboard(fullScript, 'full-script');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#007BFF]/10 to-emerald-500/10">
        <div className="container max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007BFF]/10 text-[#007BFF] text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Marketing Campaign Assets
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready-to-Use Campaign Assets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional marketing materials for your EcoPowerHub AI campaigns. Download, customize, and launch.
          </p>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="video-script" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="video-script" className="gap-2">
              <Video className="h-4 w-4" />
              Video Script
            </TabsTrigger>
            <TabsTrigger value="banners" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Banner Graphics
            </TabsTrigger>
          </TabsList>

          {/* Video Script Tab */}
          <TabsContent value="video-script" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{AD_SCRIPT.title}</CardTitle>
                    <CardDescription className="text-base">
                      {AD_SCRIPT.duration} • {AD_SCRIPT.format}
                    </CardDescription>
                  </div>
                  <Button onClick={copyFullScript} variant="outline" className="gap-2">
                    {copiedSection === 'full-script' ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Full Script
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target Platforms */}
                <div>
                  <h3 className="font-semibold mb-3">Target Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {AD_SCRIPT.targetPlatforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Scenes */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Scene Breakdown</h3>
                  {AD_SCRIPT.scenes.map((scene, idx) => (
                    <Card key={idx} className="bg-muted/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Scene {idx + 1} ({scene.time})
                            </CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {scene.onScreen}
                            </Badge>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard(
                              `Visual: ${scene.visual}\nVoiceover: "${scene.voiceover}"\nOn-Screen: ${scene.onScreen}`,
                              `scene-${idx}`
                            )}
                          >
                            {copiedSection === `scene-${idx}` ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">Visual:</p>
                          <p>{scene.visual}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">Voiceover:</p>
                          <p className="italic">"{scene.voiceover}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA */}
                <Card className="bg-gradient-to-br from-[#007BFF]/10 to-emerald-500/10">
                  <CardHeader>
                    <CardTitle>Call to Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold mb-4">{AD_SCRIPT.cta}</p>
                    <Button 
                      onClick={() => copyToClipboard(AD_SCRIPT.cta, 'cta')}
                      variant="outline"
                      className="gap-2"
                    >
                      {copiedSection === 'cta' ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy CTA
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Hashtags */}
                <div>
                  <h3 className="font-semibold mb-3">Recommended Hashtags</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {AD_SCRIPT.hashtags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(AD_SCRIPT.hashtags.join(' '), 'hashtags')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedSection === 'hashtags' ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy All Hashtags
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banner Graphics Tab */}
          <TabsContent value="banners" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BANNER_VARIANTS.map((variant) => (
                <Card key={variant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-[#007BFF] to-emerald-600 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                      <h3 className="text-2xl font-bold mb-2">{variant.headline}</h3>
                      <p className="text-lg opacity-90">{variant.subheadline}</p>
                      <div className="absolute bottom-4 right-4">
                        <img 
                          src="/assets/generated/energyoptim-ai-logo-transparent.dim_200x200.png"
                          alt="EcoPowerHub AI"
                          className="h-12 w-12"
                        />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{variant.headline}</CardTitle>
                    <CardDescription>
                      {variant.size} • {variant.format}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Button className="flex-1 gap-2" asChild>
                        <a href={variant.downloadUrl} download>
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                      <Button variant="outline" className="gap-2" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Edit
                        </a>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Editable template • Canva-compatible
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Design Specs */}
            <Card>
              <CardHeader>
                <CardTitle>Design Specifications</CardTitle>
                <CardDescription>
                  All banners follow EcoPowerHub AI brand guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2">Color Palette</h4>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-[#007BFF]" title="Electric Cyan" />
                      <div className="w-8 h-8 rounded bg-black" title="Black" />
                      <div className="w-8 h-8 rounded bg-white border" title="White" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Electric Cyan + Black + White
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2">Typography</h4>
                    <p className="text-sm">
                      Headlines: Bold, 32-48pt<br />
                      Body: Regular, 16-24pt
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2">Elements</h4>
                    <p className="text-sm">
                      Logo placement: Bottom-right<br />
                      Phone mockup: Center-left<br />
                      CTA button: Bottom-center
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Custom Assets?</CardTitle>
            <CardDescription>
              Our team can create custom marketing materials tailored to your specific campaign needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/support">Contact Marketing Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
