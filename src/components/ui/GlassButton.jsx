import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

const glassButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "glass-button text-foreground",
        primary: "glass-primary text-primary-foreground",
        ghost: "bg-transparent hover:bg-muted/30 text-foreground",
        outline:
          "glass-button border-primary/30 text-foreground hover:border-primary/60",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const GlassButton = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(glassButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

GlassButton.displayName = "GlassButton";

/* same exports as TSX, plus default for easier imports */
export default GlassButton;
export { GlassButton, glassButtonVariants };
