import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Headphones, Smartphone, Wifi, Battery, Volume2, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mic,
    title: "Speaker Detection",
    description: "Automatically identifies who's speaking and translates in real-time.",
  },
  {
    icon: Headphones,
    title: "Personal Audio",
    description: "Each participant hears translation in their preferred language via earbuds.",
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    description: "Works without internet for 20+ common language pairs.",
  },
  {
    icon: Battery,
    title: "All-Day Battery",
    description: "12+ hours of continuous translation on a single charge.",
  },
  {
    icon: Volume2,
    title: "Voice Preservation",
    description: "Maintains speaker's tone, pitch, and emotional nuance.",
  },
  {
    icon: Users,
    title: "Multi-Speaker",
    description: "Handles up to 10 simultaneous speakers seamlessly.",
  },
];

const useCases = [
  {
    title: "Business Conferences",
    description: "Enable attendees from different countries to participate fully without interpreters.",
    icon: Users,
  },
  {
    title: "Trade Shows",
    description: "Connect with international clients and partners on the exhibition floor.",
    icon: Globe,
  },
  {
    title: "Training Sessions",
    description: "Deliver in-person training to multilingual teams simultaneously.",
    icon: Mic,
  },
];

const PhysicalMeetingsPage = () => {
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
              Physical Meetings
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              In-Person Meetings,
              <span className="gradient-text block">Instantly Translated</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Break language barriers in face-to-face meetings. Our wearable technology delivers 
              real-time translation directly to each participant's earbuds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg">
                Request Demo
              </Button>
              <Button variant="heroOutline" size="lg">
                Download App
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Simple Setup</h2>
            <p className="text-muted-foreground">Get started in three easy steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Download App", description: "Install VertoX on your smartphone" },
              { step: "02", title: "Connect Earbuds", description: "Pair any Bluetooth earbuds" },
              { step: "03", title: "Start Talking", description: "Speak naturally — hear translations instantly" },
            ].map((item, index) => (
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

      {/* Device Illustration */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-56 rounded-3xl bg-gradient-to-b from-muted to-muted/50 border border-border flex items-center justify-center">
                    <Smartphone className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-16 top-8"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute -left-16 bottom-8"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">Works With Any Device</h3>
                <p className="text-muted-foreground mb-4">
                  Use your existing smartphone and Bluetooth earbuds. No special hardware required. 
                  The VertoX app handles all the processing, delivering crystal-clear translations 
                  with minimal latency.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">iOS</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">Android</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">AirPods</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">Any Bluetooth</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-muted-foreground">Built for real-world conversations</p>
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Use Cases</h2>
            <p className="text-muted-foreground">Perfect for any in-person scenario</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
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
          <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Experience It Yourself
          </h2>
          <p className="text-muted-foreground mb-6">
            Schedule a live demo with our team and see how VertoX transforms in-person communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg">
              Request Demo
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
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

export default PhysicalMeetingsPage;
