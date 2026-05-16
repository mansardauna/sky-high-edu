import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-none border-0 border-b border-input bg-transparent px-0 pt-4 pb-2 text-base placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
