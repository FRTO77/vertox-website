import { motion } from "framer-motion";

interface VisualSectionProps {
  reversed?: boolean;
  tag?: string;
  title?: string;
  description?: string;
  features?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export function VisualSection({ 
  reversed = false,
  tag = "Feature",
  title = "Amazing Feature Title",
  description = "This is a description of the feature that explains what it does and why it's valuable.",
  features = ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  imageSrc,
  imageAlt = "Feature illustration"
}: VisualSectionProps) {
  return (
    <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-32 py-20`}>
      {/* Content Area */}
      <motion.div 
        className="flex-1 space-y-8"
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
          {tag}
        </div>
        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-white/60 leading-relaxed">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-white/80 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Visual Container Area */}
      <motion.div 
        className="flex-1 relative group w-full"
        initial={{ opacity: 0, x: reversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full" />

        {/* Main Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/50 aspect-square lg:aspect-video">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}

          {/* Floating UI Elements inside */}
          <div className="absolute top-6 left-6 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        {/* Floating Metric Card */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 p-6 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl hidden xl:block w-64"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded bg-blue-500" />
            </div>
            <div className="flex-1 h-4 bg-white/10 rounded" />
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-blue-500" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
