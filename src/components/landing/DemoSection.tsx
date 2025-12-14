import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function DemoSection() {
  return (
    <section className="py-28 md:py-36 bg-muted/20" id="demo">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5">
            See VertoX Meet in Action
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Watch how VertoX enables seamless real-time translation in meetings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-card group cursor-pointer">
            {/* Placeholder video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/8 flex items-center justify-center transition-all duration-500">
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5)]"
              >
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              </motion.button>
            </div>
            
            {/* Video preview UI mockup */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium">EN</div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-sm font-medium">ES</div>
                </div>
                <div>
                  <p className="font-medium text-[15px]">Real-time Translation Demo</p>
                  <p className="text-sm text-muted-foreground/80">English → Spanish • 2:34</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
