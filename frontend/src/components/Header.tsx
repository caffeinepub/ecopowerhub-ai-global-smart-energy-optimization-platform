import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Use resolvedTheme to handle 'system' theme correctly
  // resolvedTheme will be 'light' or 'dark' based on actual OS preference
  // Light mode uses white logo (black elements), dark mode uses dark logo (white elements)
  const logoSrc = resolvedTheme === 'dark' 
    ? '/logo-mono-dark.png' 
    : '/logo-mono-white.png';
  
  const logoAlt = resolvedTheme === 'dark'
    ? 'EcoPowerHub AI (dark)'
    : 'EcoPowerHub AI';

  // Toggle theme based on resolved theme for consistent behavior
  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 sm:h-24 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img 
            src={logoSrc}
            alt={logoAlt}
            style={{ height: '80px', width: 'auto' }}
            className="object-contain"
          />
          <div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight">EcoPowerHub AI</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Global Smart Energy Optimization Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {userProfile && (
            <div className="text-sm">
              <span className="text-muted-foreground">Hey there, </span>
              <span className="font-medium">{userProfile.name}</span>
              <span className="text-muted-foreground">! 👋</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 mt-8">
                {userProfile && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-muted-foreground">Coaching</p>
                    <p className="font-medium">{userProfile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Language: {userProfile.preferredLanguage.toUpperCase()}
                    </p>
                  </div>
                )}
                <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
