import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Globe, TrendingDown, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/dashboard' });
    }
  }, [identity, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-primary">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              EcoPowerHub AI
            </CardTitle>
          </div>
          <CardDescription className="text-xl md:text-2xl font-semibold text-foreground">
            Global Smart Energy Optimization Platform
          </CardDescription>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome! I'm your friendly personal energy coach, here to help you save money and energy worldwide. 
            Let's make your home or business more efficient together! 🌍
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-Time Energy Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your energy use as it happens and get instant insights to help you save
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Works Worldwide</h3>
                <p className="text-sm text-muted-foreground">
                  Compatible with devices in any region, with support for your local voltage and language
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized tips to reduce your bills without sacrificing comfort
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and stored on the blockchain for maximum security
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div 
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20"
            style={{
              minHeight: 'clamp(500px, 80vh, 800px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to Start Saving?
              </h2>
              <p className="text-muted-foreground max-w-md">
                Log in securely with Internet Identity to access your personalized energy dashboard
              </p>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              size="lg"
              className="text-xl px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              {isLoggingIn ? (
                <>
                  <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Connecting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6" />
                  Login with Internet Identity
                </>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center max-w-md">
              New to Internet Identity? Don't worry! It's a secure, privacy-focused way to log in. 
              We'll guide you through the simple setup process.
            </p>
          </div>

          {/* Trust Indicators */}
          <div 
            className="text-center space-y-3 pt-6 border-t"
            style={{
              borderRadius: '16px',
              backdropFilter: 'blur(8px)',
              padding: 'clamp(1.5rem, 5vw, 3rem)'
            }}
          >
            <p className="text-sm font-semibold text-muted-foreground">
              Trusted by energy-conscious users worldwide
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Blockchain Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Real-Time Data</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
