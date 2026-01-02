import * as React from "react";
import { cn } from "../../utils/utils";

const GlassInput = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn("input-glass", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
