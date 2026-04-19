import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

function Separator({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-slate-200", className)} {...props} />;
}

export { Separator };