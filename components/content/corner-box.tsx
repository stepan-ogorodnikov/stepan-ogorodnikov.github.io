"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "motion/react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & MotionProps & {
  className?: string;
  size: [number, number];
  cornerLength: number;
};

export function CornerBox({ className, size, cornerLength: cl, children, ...props }: Props) {
  return (
    <motion.svg
      className={cn("absolute inset-0 stroke-1 stroke-base fill-none", className)}
      viewBox={`0 0 ${size[0]} ${size[1]}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={`M ${cl} 0 h -${cl} v ${cl}`} />
      <path d={`M 0 ${size[1] - cl} v ${cl} h ${cl}`} />
      <path d={`M ${size[0] - cl} ${size[1]} h ${cl} v -${cl}`} />
      <path d={`M ${size[0] - cl} 0 h ${cl} v ${cl}`} />
      {children}
    </motion.svg>
  );
}
