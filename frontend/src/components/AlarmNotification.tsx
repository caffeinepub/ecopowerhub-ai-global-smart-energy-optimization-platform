import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Cloud, Zap, TrendingUp, Volume2, Sparkles } from 'lucide-react';
import { playAlarmSound, speakMorningUpdate, type MorningUpdate } from '../lib/alarmService';

interface AlarmNotificationProps {
  update: MorningUpdate;
  ringTone: string;
  alertBeep: string;
  language: string;
  onDismiss: () => void;
}

export default function AlarmNotification({
  update,
  ringTone,
  alertBeep,
  language,
  onDismiss,
}: AlarmNotificationProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!hasPlayed) {
      playAlarmSound(ringTone, alertBeep);
      setHasPlayed(true);
    }
  }, [hasPlayed, ringTone, alertBeep]);

  const handleSpeak = () => {
    speakMorningUpdate(update, language);
  };

  const getEfficiencyEmoji = (efficiency: string) => {
    if (efficiency === 'Excellent') return '🌟';
    if (efficiency === 'Good') return '👍';
    return '💪';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-primary animate-in fade-in zoom-in duration-300">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Good Morning, Friend! ☀️</CardTitle>
          </div>
          <CardDescription>EcoPowerHub AI – Global Smart Energy Optimization Platform is here with your morning update</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-accent/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-medium">Today's Weather</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(update.weather.temperature)}°C</div>
                <p className="text-sm text-muted-foreground">{update.weather.condition}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div>Wind: {update.weather.windSpeed} km/h</div>
                  <div>Humidity: {update.weather.humidity}%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-medium">Your Energy Use</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{update.energySummary.totalConsumption.toFixed(1)} kWh</div>
                <p className="text-sm text-muted-foreground">
                  {update.energySummary.totalConsumption < 50 ? "Fantastic job!" : "We can improve this together"}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div>Peak: {update.energySummary.peakUsage.toFixed(1)} kWh</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {update.energySummary.efficiency}
                  <span>{getEfficiencyEmoji(update.energySummary.efficiency)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{update.systemStatus}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-medium leading-relaxed">{update.motivationalMessage}</p>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={handleSpeak} variant="outline" className="gap-2">
              <Volume2 className="h-4 w-4" />
              Hear My Voice Update
            </Button>
            <Button onClick={onDismiss} className="gap-2">
              Thanks, EcoPowerHub AI! Let's Go! 🚀
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
