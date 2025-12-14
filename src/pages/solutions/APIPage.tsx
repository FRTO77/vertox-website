import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Zap, Shield, Globe, Terminal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Translation",
    description: "Sub-200ms latency for seamless speech-to-speech translation across 45+ languages.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, SOC 2 compliance, and GDPR-ready infrastructure.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Auto-scaling infrastructure handles millions of concurrent translations.",
  },
  {
    icon: Code,
    title: "Simple Integration",
    description: "RESTful APIs and SDKs for JavaScript, Python, Go, and more.",
  },
];

const endpoints = [
  { method: "POST", path: "/v1/translate/text", description: "Translate text between languages" },
  { method: "POST", path: "/v1/translate/speech", description: "Real-time speech translation" },
  { method: "POST", path: "/v1/tts", description: "Text-to-speech synthesis" },
  { method: "POST", path: "/v1/stt", description: "Speech-to-text transcription" },
  { method: "GET", path: "/v1/languages", description: "List supported languages" },
];

const codeExample = `import { VertoX } from '@vertox/sdk';

const client = new VertoX({
  apiKey: process.env.VERTOX_API_KEY
});

// Translate text
const result = await client.translate({
  text: "Hello, how are you?",
  from: "en",
  to: "es"
});

console.log(result.translation);
// "Hola, ¿cómo estás?"`;

const APIPage = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <Link to="/" className="text-xl font-semibold gradient-text">
            VertoX
          </Link>
          <div className="w-24" />
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              API for Developers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Build with
              <span className="gradient-text block">Translation APIs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Integrate real-time translation into your applications with our powerful, 
              developer-friendly APIs. Start building in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg">
                Get API Key
              </Button>
              <Button variant="heroOutline" size="lg">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Quick Start</h2>
            <p className="text-muted-foreground">Get started with just a few lines of code</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">JavaScript</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground">{codeExample}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">API Endpoints</h2>
            <p className="text-muted-foreground">Core endpoints for translation services</p>
          </motion.div>

          <div className="space-y-3">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <span className="px-2 py-1 rounded text-xs font-mono font-medium bg-primary/10 text-primary">
                  {endpoint.method}
                </span>
                <span className="font-mono text-sm text-foreground flex-1">{endpoint.path}</span>
                <span className="text-sm text-muted-foreground hidden md:block">{endpoint.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center glass-card p-8 md:p-12"
        >
          <Code className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start Building Today
          </h2>
          <p className="text-muted-foreground mb-6">
            Free tier includes 10,000 characters per month. No credit card required.
          </p>
          <Button variant="hero" size="lg">
            Get Your API Key
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          © VertoX, 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default APIPage;
