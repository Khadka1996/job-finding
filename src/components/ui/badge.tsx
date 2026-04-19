import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-[#14213d] text-white",
  muted: "bg-[#eef2fb] text-[#475569]",
  accent: "bg-[#f8d6dd] text-[#8d1129]",
  success: "bg-emerald-100 text-emerald-800",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", badgeVariants[variant], className)} {...props} />;
}

export { Badge };