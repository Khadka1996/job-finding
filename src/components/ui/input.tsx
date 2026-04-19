import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-full border border-[#c8d0df] bg-white/85 px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };