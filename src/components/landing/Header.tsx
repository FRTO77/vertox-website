import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, Menu, X, Download } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GlobalSearch } from '@/components/GlobalSearch';

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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

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
            {/* Pricing */}
            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5">
                Pricing
              </Button>
            </Link>

            {/* Solutions Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5 gap-1.5">
                  Solutions <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2 bg-card/95 backdrop-blur-xl border-border/60 shadow-xl" align="start">
                <div className="grid gap-0.5">
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex flex-col gap-1 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200"
                    >
                      <span className="font-medium text-foreground text-sm">{item.name}</span>
                      <span className="text-[13px] text-muted-foreground leading-relaxed">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Resources */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5 gap-1.5">
                  Resources <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-card/95 backdrop-blur-xl border-border/60 shadow-xl" align="start">
                <Link
                  to="/careers"
                  className="flex p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 text-foreground text-sm"
                >
                  Careers
                </Link>
              </PopoverContent>
            </Popover>

            {/* Community */}
            <Link to="/community">
              <Button variant="ghost" size="sm" className="text-muted-foreground/90 hover:text-foreground text-[13px] font-medium px-3.5">
                Community
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
              <Link to="/pricing" className="p-3 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <div className="p-3">
                <span className="text-muted-foreground text-sm">Solutions</span>
                <div className="mt-2 flex flex-col gap-1 pl-3">
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="p-2 hover:bg-secondary rounded-lg text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/careers" className="p-3 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Careers
              </Link>
              <Link to="/community" className="p-3 hover:bg-secondary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Community
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
