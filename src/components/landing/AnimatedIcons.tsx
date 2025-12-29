import { motion } from 'framer-motion';

// Animated Microphone Icon
export function AnimatedMicIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Sound waves */}
      <motion.path
        d="M36 18C38.5 20.5 40 24 40 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      />
      <motion.path
        d="M32 22C33.5 23.5 34.5 25.5 34.5 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, delay: 0.2 }}
      />
      {/* Microphone body */}
      <motion.rect
        x="18"
        y="8"
        width="12"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Stand */}
      <path d="M24 32V38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 38H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Base arc */}
      <motion.path
        d="M12 24C12 30.6 17.4 36 24 36C30.6 36 36 30.6 36 24"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

// Animated Globe Translation Icon
export function AnimatedGlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Globe circle */}
      <motion.circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Latitude lines */}
      <motion.ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      {/* Longitude arc */}
      <motion.ellipse
        cx="24"
        cy="24"
        rx="7"
        ry="18"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      />
      {/* Rotating arrow around globe */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '24px 24px' }}
      >
        <circle cx="24" cy="4" r="3" fill="currentColor" opacity="0.6" />
      </motion.g>
      {/* Translation arrows */}
      <motion.path
        d="M8 24L4 24M4 24L7 21M4 24L7 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      <motion.path
        d="M40 24L44 24M44 24L41 21M44 24L41 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
    </svg>
  );
}

// Animated Headphones Icon
export function AnimatedHeadphonesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Headband */}
      <motion.path
        d="M8 28C8 18.06 16.06 10 26 10H22C31.94 10 40 18.06 40 28"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Left earpiece */}
      <motion.rect
        x="4"
        y="26"
        width="8"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />
      {/* Right earpiece */}
      <motion.rect
        x="36"
        y="26"
        width="8"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />
      {/* Sound waves in left ear */}
      <motion.circle
        cx="8"
        cy="33"
        r="2"
        fill="currentColor"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Sound waves in right ear */}
      <motion.circle
        cx="40"
        cy="33"
        r="2"
        fill="currentColor"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </svg>
  );
}

// Animated Voice Waves Icon
export function AnimatedWavesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Sound wave bars */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.line
          key={i}
          x1={8 + i * 5}
          y1="24"
          x2={8 + i * 5}
          y2="24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            y1: [24 - (i % 2 === 0 ? 8 : 12), 24 + (i % 2 === 0 ? 8 : 12), 24 - (i % 2 === 0 ? 8 : 12)],
            y2: [24 + (i % 2 === 0 ? 8 : 12), 24 - (i % 2 === 0 ? 8 : 12), 24 + (i % 2 === 0 ? 8 : 12)]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
}

// Animated Shield Icon
export function AnimatedShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Shield outline */}
      <motion.path
        d="M24 4L6 12V24C6 34 14 42 24 44C34 42 42 34 42 24V12L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Checkmark */}
      <motion.path
        d="M16 24L22 30L32 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      {/* Glow pulse */}
      <motion.circle
        cx="24"
        cy="24"
        r="16"
        fill="currentColor"
        opacity="0"
        animate={{ opacity: [0, 0.15, 0], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

// Animated Lightning/Speed Icon
export function AnimatedZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Lightning bolt */}
      <motion.path
        d="M26 4L10 26H22L20 44L38 20H26L26 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {/* Electric sparks */}
      <motion.circle
        cx="14"
        cy="18"
        r="1.5"
        fill="currentColor"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
      />
      <motion.circle
        cx="34"
        cy="28"
        r="1.5"
        fill="currentColor"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5, delay: 0.3 }}
      />
      <motion.circle
        cx="18"
        cy="34"
        r="1"
        fill="currentColor"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.6 }}
      />
    </svg>
  );
}

// Animated API/Code Icon
export function AnimatedCodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Left bracket */}
      <motion.path
        d="M16 10L6 24L16 38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Right bracket */}
      <motion.path
        d="M32 10L42 24L32 38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      {/* Slash */}
      <motion.line
        x1="28"
        y1="8"
        x2="20"
        y2="40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      {/* Cursor blink */}
      <motion.rect
        x="22"
        y="22"
        width="4"
        height="8"
        fill="currentColor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

// Animated Radio/Speech Icon  
export function AnimatedRadioIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Center circle */}
      <motion.circle
        cx="24"
        cy="24"
        r="6"
        fill="currentColor"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Expanding waves */}
      {[12, 18, 24].map((r, i) => (
        <motion.circle
          key={r}
          cx="24"
          cy="24"
          r={r}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.6, 0.2, 0], scale: [0.8, 1.2, 1.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
    </svg>
  );
}

// Animated Document/Text Icon
export function AnimatedDocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Document outline */}
      <motion.path
        d="M10 6H30L38 14V42H10V6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Folded corner */}
      <motion.path
        d="M30 6V14H38"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      {/* Text lines appearing */}
      {[20, 26, 32].map((y, i) => (
        <motion.line
          key={y}
          x1="16"
          y1={y}
          x2={i === 2 ? "26" : "32"}
          y2={y}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
        />
      ))}
    </svg>
  );
}

// Animated Message/Chat Icon
export function AnimatedMessageIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Speech bubble */}
      <motion.path
        d="M6 12C6 9.79 7.79 8 10 8H38C40.21 8 42 9.79 42 12V32C42 34.21 40.21 36 38 36H16L8 44V36H10C7.79 36 6 34.21 6 32V12Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Typing dots */}
      {[18, 24, 30].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="22"
          r="2.5"
          fill="currentColor"
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15
          }}
        />
      ))}
    </svg>
  );
}
