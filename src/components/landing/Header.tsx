import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, Menu, X, Download } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GlobalSearch } from '@/components/GlobalSearch';
import { ThemeToggle } from '@/components/ThemeToggle';

const solutions = [
  { name: 'API for Developers', href: '/solutions/api', description: 'Integrate translation into your apps' },
  { name: 'Online Meetings Translation', href: '/solutions/online-meetings', description: 'Real-time translation for virtual meetings' },
  { name: 'Physical Meetings Translation', href: '/solutions/physical-meetings', description: 'In-person meeting translation solutions' },
];

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'RU', name: 'Русский' },
];

const navSections = [
  { name: 'Product', id: 'product' },
  { name: 'Solutions', id: 'solutions' },
  { name: 'Customers', id: 'customers' },
  { name: 'Resources', id: 'resources' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl lg:text-2xl font-semibold tracking-tight gradient-text transition-opacity group-hover:opacity-80">VertoX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Section Navigation */}
            {navSections.map((section) => (
              <Button 
                key={section.id}
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5"
                onClick={() => scrollToSection(section.id)}
              >
                {section.name}
              </Button>
            ))}

            {/* Pricing */}
            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5">
                Pricing
              </Button>
            </Link>

            {/* Desktop Download */}
            <Link to="/download">
              <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5 gap-2">
                <Download className="h-3.5 w-3.5 opacity-70" />
                Desktop
              </Button>
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Global Search */}
            <GlobalSearch />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground/80 px-3">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="text-[13px]">{currentLang}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-1.5 bg-card/95 backdrop-blur-xl border-border/60 shadow-xl" align="end">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      currentLang === lang.code
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary/60 text-foreground'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            <div className="w-px h-5 bg-border/50 mx-1" />

            {/* Auth Buttons */}
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-[13px] font-medium px-3.5">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="text-[13px] px-4">Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {/* Section Navigation for Mobile */}
              {navSections.map((section) => (
                <button
                  key={section.id}
                  className="p-3 hover:bg-secondary rounded-lg text-left"
                  onClick={() => {
                    scrollToSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {section.name}
                </button>
              ))}
              <Link to="/pricing" className="p-3 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link to="/download" className="p-3 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Desktop Download
              </Link>
              <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign in</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="hero" className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
