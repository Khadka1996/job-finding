import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[#b10f2e] text-white hover:bg-[#8d1129] shadow-lg shadow-[#b10f2e]/20",
  secondary: "bg-white text-[#14213d] border border-[#c8d0df] hover:border-[#9faec7] hover:bg-[#f7f8fc]",
  ghost: "bg-transparent text-[#14213d] hover:bg-[#eef2fb]",
  outline: "bg-transparent border border-[#c8d0df] text-[#14213d] hover:bg-[#f7f8fc]",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, type = "button", children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10f2e] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      buttonVariants[variant],
      className,
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children.props as { className?: string }).className),
      });
    }

    return (
      <button
        ref={ref as never}
        type={type}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };