import * as React from "react";
import { cn } from "../../utils/utils";

const GlassCard = React.forwardRef(
  ({ className, hover = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass rounded-2xl p-6 transition-all duration-300",
          hover &&
            "cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/40",
          glow && "glow-pulse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
