import { motion } from "framer-motion";

interface GlassTerminalProps {
  leftLabel?: string;
  rightLabel?: string;
  children?: React.ReactNode;
}

export function GlassTerminal({ 
  leftLabel = "Input",
  rightLabel = "Output",
  children 
}: GlassTerminalProps) {
  return (
    <motion.div 
      className="relative mx-auto max-w-4xl rounded-[1.8rem] border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-3xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 px-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-white/40 text-sm font-mono">terminal</div>
        <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
      </div>

      {/* Content Area */}
      {children ? (
        <div className="p-6 min-h-[300px]">
          {children}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 p-6 min-h-[300px]">
          <div className="space-y-4">
            <div className="w-20 h-3 bg-blue-500/20 rounded text-xs text-blue-400 flex items-center justify-center">
              {leftLabel}
            </div>
            <div className="w-full h-32 bg-white/5 border border-white/5 rounded-xl p-4">
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-white/10 rounded" />
                <div className="h-2 w-1/2 bg-white/10 rounded" />
                <div className="h-2 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-20 h-3 bg-purple-500/20 rounded text-xs text-purple-400 flex items-center justify-center">
              {rightLabel}
            </div>
            <div className="w-full h-32 bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
              <div className="space-y-2">
                <div className="h-2 w-2/3 bg-purple-500/20 rounded" />
                <div className="h-2 w-3/4 bg-purple-500/20 rounded" />
                <div className="h-2 w-1/2 bg-purple-500/20 rounded" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="px-3 py-1 bg-white/5 rounded text-xs text-white/40">Copy</div>
              <div className="px-3 py-1 bg-white/5 rounded text-xs text-white/40">Export</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
