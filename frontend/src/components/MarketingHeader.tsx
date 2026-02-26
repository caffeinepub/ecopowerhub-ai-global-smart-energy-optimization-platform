import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Globe, Languages, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

const REGIONS = [
  { value: 'north-america', label: 'North America' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'western-europe', label: 'Western Europe' },
  { value: 'northern-europe', label: 'Northern Europe' },
  { value: 'southern-europe', label: 'Southern Europe' },
  { value: 'east-asia', label: 'East Asia' },
  { value: 'south-asia', label: 'South Asia' },
  { value: 'southeast-asia', label: 'Southeast Asia' },
  { value: 'east-africa', label: 'East Africa' },
  { value: 'west-africa', label: 'West Africa' },
  { value: 'north-africa', label: 'North Africa' },
  { value: 'southern-africa', label: 'Southern Africa' },
  { value: 'oceania', label: 'Oceania' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'zh', label: 'Mandarin' },
  { value: 'hi', label: 'Hindi' },
  { value: 'sw', label: 'Swahili' },
  { value: 'ar', label: 'Arabic' },
];

export default function MarketingHeader() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('north-america');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    // Load saved preferences
    const savedRegion = localStorage.getItem('selectedRegion');
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedRegion) setSelectedRegion(savedRegion);
    if (savedLanguage) setSelectedLanguage(savedLanguage);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    localStorage.setItem('selectedRegion', region);
    window.dispatchEvent(new CustomEvent('regionChange', { detail: region }));
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  };

  // Use resolvedTheme to handle 'system' theme correctly
  // Light mode uses white logo (black elements), dark mode uses dark logo (white elements)
  const logoSrc = resolvedTheme === 'dark' 
    ? '/logo-mono-dark.png' 
    : '/logo-mono-white.png';
  
  const logoAlt = resolvedTheme === 'dark'
    ? 'EcoPowerHub AI (dark)'
    : 'EcoPowerHub AI';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={logoSrc}
            alt={logoAlt}
            style={{ height: '80px', width: 'auto' }}
            className="object-contain"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight">EcoPowerHub AI</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Global Smart Energy Platform</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            How It Works
          </button>
          
          {/* Support & Integrations Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium hover:text-[#007BFF] transition-colors flex items-center gap-1">
                Support & Integrations
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Support Resources</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <a href="/support">Support & Integrations</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/integration-guides">Integration Guides</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/diagnostics">Diagnostics & Help</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a href="/tech-specs" className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Tech Specs
          </a>
          <a href="/best-practices" className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Best Practices
          </a>
          <a href="/partner-marketplace" className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Partner Marketplace
          </a>
          <a href="/compliance-security" className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Compliance & Security
          </a>
          <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Pricing
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-[#007BFF] transition-colors">
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden xl:flex gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-xs">
                  {REGIONS.find(r => r.value === selectedRegion)?.label || 'Region'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
              <DropdownMenuLabel>Select Your Region</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {REGIONS.map((region) => (
                <DropdownMenuItem
                  key={region.value}
                  onClick={() => handleRegionChange(region.value)}
                  className={selectedRegion === region.value ? 'bg-accent' : ''}
                >
                  {region.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden xl:flex gap-2">
                <Languages className="h-4 w-4" />
                <span className="text-xs">
                  {LANGUAGES.find(l => l.value === selectedLanguage)?.label || 'English'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map((language) => (
                <DropdownMenuItem
                  key={language.value}
                  onClick={() => handleLanguageChange(language.value)}
                  className={selectedLanguage === language.value ? 'bg-accent' : ''}
                >
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container flex flex-col gap-4 py-4 px-4">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Home
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              How It Works
            </button>
            <a href="/support" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Support & Integrations
            </a>
            <a href="/integration-guides" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left pl-4">
              → Integration Guides
            </a>
            <a href="/diagnostics" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Diagnostics & Help Center
            </a>
            <a href="/tech-specs" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Tech Specs
            </a>
            <a href="/best-practices" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Best Practices
            </a>
            <a href="/partner-marketplace" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Partner Marketplace
            </a>
            <a href="/compliance-security" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Compliance & Security
            </a>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Pricing
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-[#007BFF] transition-colors text-left">
              Contact
            </button>
            
            {/* Mobile Region Selector */}
            <div className="pt-2 border-t border-border/40">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Region</p>
              <select 
                value={selectedRegion} 
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background text-sm"
              >
                {REGIONS.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Language Selector */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Language</p>
              <select 
                value={selectedLanguage} 
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background text-sm"
              >
                {LANGUAGES.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
