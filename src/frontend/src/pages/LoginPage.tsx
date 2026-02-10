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
                <h3 className="font-semibold text-lg mb-1">Voice-Guided Coaching</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations in your language with friendly voice guidance
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered forecasts help you stay ahead and optimize your energy consumption
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with Internet Identity - no passwords, no tracking
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              size="lg"
              className="w-full text-lg py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {isLoggingIn ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Connecting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Let's Get Started! 🚀
                </>
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              By logging in, you agree to our{' '}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </p>
          </div>

          {/* Additional Info */}
          <div className="pt-6 border-t">
            <p className="text-center text-sm text-muted-foreground">
              🌟 Join thousands of users worldwide who are already saving energy and money with EcoPowerHub AI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
