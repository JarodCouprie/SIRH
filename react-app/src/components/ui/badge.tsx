import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "h-fit w-fit inline-flex text-nowrap items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent dark:bg-gray-700 dark:text-gray-50 bg-gray-200 text-gray-950 shadow hover:bg-gray-400/80 dark:hover:bg-gray-500/80",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        destructive:
          "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80",
        outline: "text-gray-950 dark:text-gray-50",
        accepted:
          "text-emerald-800 bg-emerald-200/80 dark:text-emerald-600 dark:bg-emerald-900/40 border-none",
        denied: "text-red-600 bg-red-600/15 border-none",
        waiting: "bg-amber-500/15 text-amber-500 border-none",
        draft:
          "text-blue-800 bg-sky-300/40 dark:text-sky-600 dark:bg-sky-600/20 border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
