import { motion } from 'framer-motion';
import { supportedLanguages } from '@/lib/settings';

export function LanguagesSection() {
  return (
    <section className="py-28 md:py-36 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/4 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5">
            30+ Languages Supported
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg">
            From Uzbek to Japanese, we support the languages that matter to you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto"
        >
          {supportedLanguages.map((lang, i) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.015, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-card/80 border border-border/50 rounded-full hover:border-primary/30 hover:bg-card transition-all duration-300 cursor-default"
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground/90">{lang.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
