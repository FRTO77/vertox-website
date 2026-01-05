import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface SmoothButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const SmoothButton = forwardRef<HTMLButtonElement, SmoothButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        ref={ref}
        {...props} 
        className={`px-8 py-6 text-lg rounded-full transition-shadow hover:shadow-lg ${className}`}
      >
        {children}
      </Button>
    </motion.div>
  )
);

SmoothButton.displayName = "SmoothButton";
