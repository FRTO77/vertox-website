import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Pricing', href: '/pricing' },
    { name: 'API', href: '/solutions/api' },
    { name: 'Desktop App', href: '#download' },
    { name: 'Mobile App', href: '#download' },
  ],
  solutions: [
    { name: 'Online Meetings', href: '/solutions/online-meetings' },
    { name: 'Physical Meetings', href: '/solutions/physical-meetings' },
    { name: 'Enterprise', href: '/pricing' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold gradient-text">VertoX</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Breaking language barriers in real-time with AI-powered translation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a
                href="https://x.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © VertoX, 2025. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact us
            </Link>
            <Link to="/partnership" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Partnership
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
