import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/" className="text-xl font-bold gradient-text">VertoX</Link>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files stored on your device when you visit our website. 
                  They help us provide a better user experience by remembering your preferences 
                  and understanding how you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="glass-card p-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Required for the website to function properly. These cannot be disabled. 
                      They include cookies for authentication, security, and basic functionality.
                    </p>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Remember your preferences such as language settings, theme preferences, 
                      and other customizations to enhance your experience.
                    </p>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Help us understand how visitors interact with our website by collecting 
                      anonymous information. We use this to improve our services.
                    </p>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Used to track visitors across websites to display relevant advertisements. 
                      These are optional and can be disabled.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>View what cookies are stored</li>
                  <li>Delete cookies individually or all at once</li>
                  <li>Block cookies from specific or all websites</li>
                  <li>Set preferences for first-party vs third-party cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set their own cookies, including analytics 
                  providers (like Google Analytics) and payment processors. These third parties 
                  have their own privacy policies governing the use of their cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Duration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Cookies have different lifespans:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong className="text-foreground">Persistent cookies:</strong> Remain until they expire or you delete them</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted 
                  on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at{" "}
                  <a href="mailto:privacy@vertox.ai" className="text-primary hover:underline">privacy@vertox.ai</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CookiesPage;
