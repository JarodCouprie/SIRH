import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm outline outline-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
