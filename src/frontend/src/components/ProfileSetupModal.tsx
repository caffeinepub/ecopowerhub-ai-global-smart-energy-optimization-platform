import { useState, useEffect } from 'react';
import { useSaveCallerUserProfile, useGetSupportedLanguages } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { SUPPORTED_LANGUAGES, getUserTimezone } from '../lib/i18n';
import { Sparkles } from 'lucide-react';

interface ProfileSetupModalProps {
  onComplete: () => void;
}

export default function ProfileSetupModal({ onComplete }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const { data: supportedLanguages } = useGetSupportedLanguages();
  const saveProfile = useSaveCallerUserProfile();
  const [detectedTimezone] = useState(getUserTimezone());

  // Auto-detect language from browser
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages?.includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, [supportedLanguages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name so I can greet you properly!');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        preferredLanguage: language,
      });
      toast.success(`Welcome aboard, ${name.trim()}! Let's start saving energy together! 🎉`);
      onComplete();
    } catch (error) {
      toast.error('Oops! Something went wrong. Let\'s try that again.');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <DialogTitle>Welcome to EcoPowerHub AI!</DialogTitle>
          </div>
          <DialogDescription>
            Your Global Smart Energy Optimization Platform! I'm so excited to meet you. Let's get to know each other so I can provide you with personalized energy guidance and support.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">What should I call you?</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              I'll use this to give you a warm, personalized experience
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Which language do you prefer?</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages?.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES] || lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              I'll communicate with you in your preferred language
            </p>
          </div>
          <div className="rounded-lg bg-muted p-3 text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium">Your timezone:</span> {detectedTimezone}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              I'll show all times in your local timezone for your convenience
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={saveProfile.isPending}>
            {saveProfile.isPending ? 'Setting Things Up...' : 'Let\'s Get Started! 🚀'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
