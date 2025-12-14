import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Book, Newspaper, ArrowRight, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchResult {
  type: 'page' | 'docs' | 'blog';
  title: string;
  description: string;
  href: string;
}

const allContent: SearchResult[] = [
  // Pages
  { type: 'page', title: 'Pricing', description: 'View our plans and pricing', href: '/pricing' },
  { type: 'page', title: 'API for Developers', description: 'Integrate translation into your apps', href: '/solutions/api' },
  { type: 'page', title: 'Online Meetings', description: 'Real-time translation for virtual meetings', href: '/solutions/online-meetings' },
  { type: 'page', title: 'Physical Meetings', description: 'In-person meeting translation', href: '/solutions/physical-meetings' },
  { type: 'page', title: 'Careers', description: 'Join our team', href: '/careers' },
  { type: 'page', title: 'Community', description: 'Connect with other users', href: '/community' },
  { type: 'page', title: 'Contact', description: 'Get in touch with us', href: '/contact' },
  { type: 'page', title: 'Partnership', description: 'Become a partner', href: '/partnership' },
  // Docs
  { type: 'docs', title: 'Quick Start Guide', description: 'Get up and running in 5 minutes', href: '/docs/getting-started/quick-start' },
  { type: 'docs', title: 'Authentication', description: 'Set up API authentication', href: '/docs/getting-started/authentication' },
  { type: 'docs', title: 'Speech-to-Speech API', description: 'Real-time voice translation', href: '/docs/api-reference/speech-to-speech' },
  { type: 'docs', title: 'Speech-to-Text API', description: 'Transcription endpoints', href: '/docs/api-reference/speech-to-text' },
  { type: 'docs', title: 'Text-to-Speech API', description: 'Voice synthesis endpoints', href: '/docs/api-reference/text-to-speech' },
  { type: 'docs', title: 'Voice Cloning', description: 'Train your voice model', href: '/docs/voice-cloning/training' },
  // Blog
  { type: 'blog', title: 'Introducing VertoX 2.0', description: 'The biggest update yet', href: '/blog/vertox-2-release' },
  { type: 'blog', title: 'Voice Cloning Revolution', description: 'How AI is changing communication', href: '/blog/voice-cloning-revolution' },
  { type: 'blog', title: 'Multilingual Video Conferences', description: 'Best practices guide', href: '/blog/multilingual-video-conferences' },
];

const typeIcons = {
  page: FileText,
  docs: Book,
  blog: Newspaper,
};

const typeLabels = {
  page: 'Page',
  docs: 'Documentation',
  blog: 'Blog',
};

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = allContent.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(href);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
            >
              <div className="glass-card overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center border-b border-border/50 px-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search pages, docs, and blog..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((result, index) => {
                        const Icon = typeIcons[result.type];
                        return (
                          <button
                            key={index}
                            onClick={() => handleSelect(result.href)}
                            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground truncate">{result.title}</span>
                                <span className="text-xs text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
                                  {typeLabels[result.type]}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                          </button>
                        );
                      })}
                    </div>
                  ) : query ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No results found for "{query}"</p>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>Start typing to search...</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border/50 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
