"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-md text-sm font-medium outline-none transition-[color,box-shadow]",
    "h-9 min-w-9 px-2",
    "bg-transparent hover:bg-toggle-hover data-[state=on]:bg-toggle-on",
    "disabled:pointer-events-none disabled:opacity-50",
    // "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "focus-visible:border-ring focus-visible:focus-ring",
    // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  ],
);

function Toggle({
  className,
  ...props
}:
  & React.ComponentProps<typeof TogglePrimitive.Root>
  & VariantProps<typeof toggleVariants>)
{
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
