import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Monitor, 
  Apple, 
  CheckCircle2,
  Cpu,
  Shield,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Platform = "windows" | "macos" | "linux" | "unknown";

const DesktopDownloadPage = () => {
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("win")) {
      setDetectedPlatform("windows");
    } else if (userAgent.includes("mac")) {
      setDetectedPlatform("macos");
    } else if (userAgent.includes("linux")) {
      setDetectedPlatform("linux");
    }
  }, []);

  const platforms = [
    {
      id: "windows" as Platform,
      name: "Windows",
      icon: Monitor,
      version: "VertoX for Windows",
      requirements: "Windows 10 or later (64-bit)",
      downloadUrl: "#",
      fileName: "VertoX-Setup-1.0.0.exe",
      size: "78 MB"
    },
    {
      id: "macos" as Platform,
      name: "macOS",
      icon: Apple,
      version: "VertoX for macOS",
      requirements: "macOS 11 Big Sur or later",
      downloadUrl: "#",
      fileName: "VertoX-1.0.0.dmg",
      size: "82 MB"
    },
    {
      id: "linux" as Platform,
      name: "Linux",
      icon: Cpu,
      version: "VertoX for Linux",
      requirements: "Ubuntu 20.04+, Fedora 34+, or equivalent",
      downloadUrl: "#",
      fileName: "VertoX-1.0.0.AppImage",
      size: "85 MB"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Native Performance",
      description: "Optimized for your operating system with minimal resource usage"
    },
    {
      icon: Globe,
      title: "Offline Mode",
      description: "Download language packs for translation without internet"
    },
    {
      icon: Shield,
      title: "System Integration",
      description: "Seamless integration with system audio and microphone"
    }
  ];

  const detectedPlatformData = platforms.find(p => p.id === detectedPlatform);

  return (
    <div className="min-h-screen premium-bg">
      <div className="noise-overlay" />
      <div className="wave-lines" />
      
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

      <main className="relative z-10 pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-8 border border-primary/20">
                <Download className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Download <span className="gradient-text">VertoX Desktop</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get the full power of VertoX on your desktop. Native app with system integration, 
                offline capabilities, and optimized performance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Detected Platform Download */}
        {detectedPlatformData && (
          <section className="px-6 pb-12">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Detected: {detectedPlatformData.name}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {detectedPlatformData.version}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {detectedPlatformData.requirements}
                </p>
                <Button variant="hero" size="xl" className="mb-4">
                  <Download className="w-5 h-5 mr-2" />
                  Download for {detectedPlatformData.name}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {detectedPlatformData.fileName} • {detectedPlatformData.size}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* All Platforms */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-8 text-foreground">
              All Platforms
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  className={`glass-card p-6 text-center group cursor-pointer transition-all duration-300 hover:border-primary/30 ${
                    platform.id === detectedPlatform ? "border-primary/30 bg-primary/5" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                    <platform.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{platform.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{platform.requirements}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">{platform.size}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-8 text-foreground">
              Why Desktop?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Installation Guide</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Download the installer</h4>
                    <p className="text-sm text-muted-foreground">Click the download button for your operating system</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Run the installer</h4>
                    <p className="text-sm text-muted-foreground">Double-click the downloaded file and follow the prompts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Sign in to your account</h4>
                    <p className="text-sm text-muted-foreground">Use your existing VertoX credentials or create a new account</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Start translating</h4>
                    <p className="text-sm text-muted-foreground">You are ready to use VertoX on your desktop</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-muted-foreground mb-6">
                Prefer the web version? No download required.
              </p>
              <Link to="/dashboard">
                <Button variant="outline">
                  Open Web App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesktopDownloadPage;
