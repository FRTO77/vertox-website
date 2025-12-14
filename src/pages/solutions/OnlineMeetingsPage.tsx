import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Video, Globe, Headphones, Users, Monitor, MessageSquare, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Globe,
    title: "45+ Languages",
    description: "Real-time translation across major world languages with high accuracy.",
  },
  {
    icon: Headphones,
    title: "Voice Cloning",
    description: "Hear translations in the speaker's own voice tone and emotion.",
  },
  {
    icon: Users,
    title: "Unlimited Participants",
    description: "Host meetings with hundreds of participants, each in their language.",
  },
  {
    icon: Monitor,
    title: "Screen Sharing",
    description: "Share presentations with live translated captions overlay.",
  },
  {
    icon: MessageSquare,
    title: "Live Transcripts",
    description: "Automatic transcription in multiple languages simultaneously.",
  },
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    description: "Enterprise-grade security for confidential meetings.",
  },
];

const steps = [
  { step: "01", title: "Create Meeting", description: "Generate a unique meeting link instantly" },
  { step: "02", title: "Select Languages", description: "Choose input and output languages for each participant" },
  { step: "03", title: "Join & Speak", description: "Start talking — translation happens automatically" },
];

const OnlineMeetingsPage = () => {
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
              Online Meetings
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Global Meetings,
              <span className="gradient-text block">Zero Language Barriers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Host virtual meetings where everyone speaks their language and understands each other 
              in real-time. Powered by AI that preserves voice and emotion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/dashboard/meet">Start Free Meeting</Link>
              </Button>
              <Button variant="heroOutline" size="lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to global communication</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need for multilingual meetings</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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

      {/* Use Cases */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Perfect For</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "International team standups",
              "Client presentations across borders",
              "Remote interviews with global talent",
              "Educational webinars worldwide",
              "Cross-border sales calls",
              "Multilingual customer support",
            ].map((useCase, index) => (
              <motion.div
                key={useCase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 glass-card"
              >
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{useCase}</span>
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
          <Video className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Go Global?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start your first translated meeting in under a minute. Free for up to 3 participants.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/dashboard/meet">Start Free Meeting</Link>
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

export default OnlineMeetingsPage;
