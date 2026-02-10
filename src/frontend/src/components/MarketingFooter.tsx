import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

export default function MarketingFooter() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border/40 bg-[#F5F5F5] dark:bg-background">
      <div className="container py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/generated/energyoptim-ai-logo-transparent.dim_200x200.png" 
                alt="EcoPowerHub AI Logo" 
                className="h-10 w-10"
              />
              <div>
                <h3 className="font-bold text-[#007BFF]">EcoPowerHub AI</h3>
                <p className="text-xs text-muted-foreground">Global Energy Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Voice-guided smart energy optimization for homes and businesses worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-[#007BFF] transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter/X" className="text-muted-foreground hover:text-[#007BFF] transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-[#007BFF] transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-[#007BFF] transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-semibold mb-4 text-[#007BFF]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#007BFF] transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#007BFF] transition-colors">How It Works</button></li>
              <li><a href="/support" className="hover:text-[#007BFF] transition-colors">Support</a></li>
              <li><a href="/compliance-security" className="hover:text-[#007BFF] transition-colors">Compliance & Security</a></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-[#007BFF] transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#007BFF] transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold mb-4 text-[#007BFF]">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-[#007BFF] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[#007BFF] transition-colors">Terms</a></li>
              <li><a href="https://www.ecopowerhub.ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">www.EcoPowerHub.ai</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Eco PowerHub AI LLC. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#007BFF] hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
