import { motion } from 'framer-motion';
import { Waves, UserCheck, Sparkles, Volume2 } from 'lucide-react';

export function VoiceCloningSection() {
  return (
    <section className="py-28 md:py-36 bg-muted/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[13px] font-medium mb-6">
              <Waves className="h-3.5 w-3.5" />
              Voice Cloning Technology
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
              Your voice, any language
            </h2>
            
            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              VertoX clones your unique voice characteristics — tone, pitch, and emotions — 
              making translations sound authentically you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center mx-auto mb-6">
                <Volume2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">Record Your Voice</h3>
              <p className="text-muted-foreground/90 leading-relaxed">
                A short voice sample is all we need to capture your unique vocal characteristics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/15 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">AI Learns You</h3>
              <p className="text-muted-foreground/90 leading-relaxed">
                Our AI analyzes and learns your tone, emotions, and speaking patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/8 border border-primary/15 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">Sound Like You</h3>
              <p className="text-muted-foreground/90 leading-relaxed">
                Translations are delivered in your cloned voice — indistinguishable and safe.
              </p>
            </motion.div>
          </div>

          {/* Visual representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 glass-card p-8 text-center"
          >
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-2xl">🎤</span>
                </div>
                <span className="text-sm text-muted-foreground">Your Voice</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary/30" />
                <Waves className="h-6 w-6 text-primary animate-pulse" />
                <div className="w-8 h-0.5 bg-primary/30" />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">AI Processing</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-accent/30" />
                <Waves className="h-6 w-6 text-accent animate-pulse" />
                <div className="w-8 h-0.5 bg-accent/30" />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-2xl">🔊</span>
                </div>
                <span className="text-sm text-muted-foreground">Cloned Output</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
