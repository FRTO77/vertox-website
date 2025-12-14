import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Premium transitions
    "transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
    // Subtle hover transform
    "hover:translate-y-[-1px]",
    // Gentle press effect
    "active:translate-y-[0.5px] active:scale-[0.985]",
    // Smooth active transition
    "active:transition-all active:duration-100",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground rounded-xl",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_4px_16px_-2px_hsl(var(--primary)/0.25)]",
          "hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_8px_24px_-4px_hsl(var(--primary)/0.35)]",
          "hover:bg-[hsl(217,91%,63%)]",
          "active:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_2px_8px_-2px_hsl(var(--primary)/0.2)]",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground rounded-xl",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_4px_16px_-2px_hsl(var(--destructive)/0.25)]",
          "hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_8px_24px_-4px_hsl(var(--destructive)/0.35)]",
          "hover:bg-[hsl(0,84%,63%)]",
        ].join(" "),
        outline: [
          "border border-border bg-transparent rounded-xl",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
          "hover:bg-secondary/50 hover:text-secondary-foreground",
          "hover:border-border/80 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground rounded-xl",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
          "hover:bg-secondary/70 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]",
        ].join(" "),
        ghost: [
          "rounded-xl",
          "hover:bg-secondary/60 hover:text-secondary-foreground",
          "hover:translate-y-0",
        ].join(" "),
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:translate-y-0",
        ].join(" "),
        glass: [
          "bg-secondary/40 backdrop-blur-md border border-white/[0.08] rounded-xl text-foreground",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.03)]",
          "hover:bg-secondary/60 hover:border-white/[0.12]",
          "hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        ].join(" "),
        hero: [
          "bg-gradient-to-b from-[hsl(217,91%,62%)] to-[hsl(217,91%,55%)] text-primary-foreground rounded-xl",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_4px_20px_-4px_hsl(var(--primary)/0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "hover:from-[hsl(217,91%,65%)] hover:to-[hsl(217,91%,58%)]",
          "hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_12px_32px_-8px_hsl(var(--primary)/0.5),inset_0_1px_0_0_rgba(255,255,255,0.15)]",
          "active:from-[hsl(217,91%,58%)] active:to-[hsl(217,91%,52%)]",
          "active:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_2px_8px_-2px_hsl(var(--primary)/0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        ].join(" "),
        heroOutline: [
          "border border-primary/30 bg-primary/[0.08] text-foreground rounded-xl backdrop-blur-sm",
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.02),inset_0_1px_0_0_hsl(var(--primary)/0.05)]",
          "hover:bg-primary/[0.12] hover:border-primary/50",
          "hover:shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.15),inset_0_1px_0_0_hsl(var(--primary)/0.1)]",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-9 px-4 text-[13px] rounded-lg",
        lg: "h-12 px-8 text-[15px] font-medium rounded-xl",
        xl: "h-14 px-10 text-base font-semibold rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
