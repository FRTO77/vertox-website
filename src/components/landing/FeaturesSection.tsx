import { motion } from 'framer-motion';
import { 
  AnimatedMicIcon,
  AnimatedGlobeIcon,
  AnimatedHeadphonesIcon,
  AnimatedWavesIcon,
  AnimatedShieldIcon,
  AnimatedZapIcon,
  AnimatedCodeIcon,
  AnimatedRadioIcon,
  AnimatedDocumentIcon,
  AnimatedMessageIcon
} from './AnimatedIcons';

const features = [
  {
    icon: AnimatedMicIcon,
    title: 'Speaker Capture',
    description: 'VertoX captures speech from the speaker side with crystal-clear quality, ensuring every word is accurately processed for translation.',
  },
  {
    icon: AnimatedGlobeIcon,
    title: 'Real-time Translation',
    description: 'Instant translation powered by advanced AI models with sub-500ms latency. Break language barriers in real-time conversations.',
  },
  {
    icon: AnimatedHeadphonesIcon,
    title: 'Headphone Output',
    description: 'Translated audio delivered seamlessly to your headphones with natural voice synthesis and perfect timing.',
  },
  {
    icon: AnimatedWavesIcon,
    title: 'Voice Cloning',
    description: 'AI learns your unique voice characteristics, tone, and emotions for translations that sound genuinely like you.',
  },
  {
    icon: AnimatedShieldIcon,
    title: 'Enterprise Security',
    description: 'End-to-end encryption and robust data protection following industry best practices to keep your conversations private.',
  },
  {
    icon: AnimatedZapIcon,
    title: 'Low Latency',
    description: 'Optimized for real-time conversations with minimal delay. Experience natural, flowing dialogue without awkward pauses.',
  },
];

const apiFeatures = [
  {
    icon: AnimatedRadioIcon,
    title: 'Speech-to-Speech Translation API',
    description: 'Real-time voice translation with natural output. Perfect for live interpreting and conversational AI applications.',
  },
  {
    icon: AnimatedDocumentIcon,
    title: 'Speech-to-Text API',
    description: 'Accurate transcription in 30+ languages with speaker diarization, punctuation, and formatting support.',
  },
  {
    icon: AnimatedMessageIcon,
    title: 'Text-to-Speech API',
    description: 'Natural voice synthesis with custom voice options, emotional expression, and multilingual support.',
  },
  {
    icon: AnimatedCodeIcon,
    title: 'Real-Time Translation API',
    description: 'High-quality text translation with context awareness, preserving meaning, tone, and cultural nuances.',
  },
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-32 md:py-44 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <FloatingParticles />
      
      {/* How it works */}
      <div className="container mx-auto px-6 mb-36 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            How It Works
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            How <span className="gradient-text">VertoX</span> Works
          </h2>
          <p className="text-muted-foreground/90 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Experience seamless, real-time translation from speaker to listener in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.slice(0, 3).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <motion.div 
                className="glass-card p-10 h-full relative overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {i + 1}
                </div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500 shadow-lg shadow-primary/10">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground/90 leading-relaxed text-base">{feature.description}</p>
                </div>
              </motion.div>
              
              {/* Connector line */}
              {i < 2 && (
                <motion.div 
                  className="hidden md:block absolute top-1/2 -right-4 w-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <motion.div 
                    className="h-px bg-gradient-to-r from-primary/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.2 }}
                  />
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Features */}
      <div className="container mx-auto px-6 mb-36 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedShieldIcon className="h-4 w-4" />
            Powerful Features
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Core Features</h2>
          <p className="text-muted-foreground/90 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Everything you need for seamless multilingual communication, built with enterprise-grade reliability
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.slice(3).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="glass-card p-8 h-full group relative overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/80 to-muted flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-primary/10 transition-all duration-500">
                    <feature.icon className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground/90 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* API Section */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Background decoration for API section */}
        <div className="absolute inset-0 -mx-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-accent/[0.08] to-transparent blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 relative z-10"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedCodeIcon className="h-4 w-4" />
            Developer APIs
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build with <span className="gradient-text">VertoX API</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Integrate powerful translation capabilities into your applications with our comprehensive API suite
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
          {apiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="bg-gradient-to-br from-card via-card to-muted/30 border border-border/60 rounded-2xl p-8 h-full group relative overflow-hidden"
                whileHover={{ y: -8, borderColor: 'hsl(var(--accent) / 0.4)' }}
                transition={{ duration: 0.4 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-500 shadow-lg shadow-accent/10">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* API CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 relative z-10"
        >
          <motion.a
            href="/solutions/api"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent font-medium hover:bg-accent/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore API Documentation
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
