import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function DemoSection() {
  return (
    <section className="py-24 bg-muted/30" id="demo">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See VertoX Meet in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how VertoX enables seamless real-time translation in meetings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
            {/* Placeholder video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-105 shadow-glow">
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              </button>
            </div>
            
            {/* Video preview UI mockup */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/30 border-2 border-background flex items-center justify-center text-sm font-medium">EN</div>
                  <div className="w-10 h-10 rounded-full bg-accent/30 border-2 border-background flex items-center justify-center text-sm font-medium">ES</div>
                </div>
                <div>
                  <p className="font-medium">Real-time Translation Demo</p>
                  <p className="text-sm text-muted-foreground">English → Spanish • 2:34</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
