import { motion } from 'framer-motion';
import { 
  Mic, 
  Headphones, 
  Globe2, 
  Zap, 
  Shield, 
  Waves,
  Code,
  MessageSquare,
  FileText,
  Radio
} from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Speaker Capture',
    description: 'VertoX captures speech from the speaker side with crystal-clear quality.',
  },
  {
    icon: Globe2,
    title: 'Real-time Translation',
    description: 'Instant translation powered by advanced AI models with sub-500ms latency.',
  },
  {
    icon: Headphones,
    title: 'Headphone Output',
    description: 'Translated audio delivered seamlessly to your headphones.',
  },
  {
    icon: Waves,
    title: 'Voice Cloning',
    description: 'AI learns your voice tone and emotions for natural-sounding translations.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption and data protection following best practices.',
  },
  {
    icon: Zap,
    title: 'Low Latency',
    description: 'Optimized for real-time conversations with minimal delay.',
  },
];

const apiFeatures = [
  {
    icon: Radio,
    title: 'Speech-to-Speech Translation API',
    description: 'Real-time voice translation with natural output.',
  },
  {
    icon: FileText,
    title: 'Speech-to-Text API',
    description: 'Accurate transcription in 30+ languages.',
  },
  {
    icon: MessageSquare,
    title: 'Text-to-Speech API',
    description: 'Natural voice synthesis with custom voice options.',
  },
  {
    icon: Code,
    title: 'Real-Time Translation API',
    description: 'High-quality text translation with context awareness.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative">
      {/* How it works */}
      <div className="container mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How <span className="gradient-text">VertoX</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seamless translation flow from speaker to listener
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.slice(0, 3).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="glass-card p-8 h-full hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Features */}
      <div className="container mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for seamless multilingual communication
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.slice(3).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* API Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-4">
            <Code className="h-4 w-4" />
            Developer APIs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Build with VertoX API
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Integrate powerful translation capabilities into your applications
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {apiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="bg-gradient-to-br from-card to-muted/50 border border-border rounded-2xl p-6 h-full hover:border-accent/50 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
