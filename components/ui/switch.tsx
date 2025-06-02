"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root asChild checked={checked} {...props}>
      <motion.button
        data-slot="switch"
        className={cn(
          "peer inline-flex h-6 w-10 p-0.5 rounded-full shadow-xs",
          "data-[state=checked]:bg-switch-checked data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-700",
          "data-[state=checked]:justify-end data-[state=unchecked]:justify-start",
          "focus-visible:border-ring focus-visible:ring-ring/50",
          "transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <SwitchPrimitive.Thumb
          asChild
          data-slot="switch-thumb"
          className={cn(
            "pointer-events-none size-5 rounded-full ring-0",
            "bg-background dark:bg-neutral-200",
          )}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.2,
            }}
          />
        </SwitchPrimitive.Thumb>
      </motion.button>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
