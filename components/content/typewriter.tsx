"use client";

import { type Animation } from "@/lib/animations";
import { motion } from "motion/react";
import { useState } from "react";

export const TYPEWRITER_OPTIONS = {
  delay: 0,
  duration: 0.05,
};

type Props = ReturnType<Animation> & {
  children?: string;
};

export function Typewriter({ children, animate, onAnimationComplete, transition = {}, ...props }: Props) {
  const { duration, delay } = { ...TYPEWRITER_OPTIONS, ...transition };
  // this flag helps avoid unexpected behaviour when switching languages
  const [isCompleted, setIsCompleted] = useState(false);

  if (!children) return null;

  return (
    <motion.span {...props}>
      {!isCompleted
        ? children.split("").map((value, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={animate && { opacity: 1, transition: { duration, delay: (duration * i) + delay } }}
            onAnimationComplete={(d) => {
              if (i === (children.length - 1)) {
                setIsCompleted(true);
                if (onAnimationComplete) onAnimationComplete(d);
              }
            }}
            key={i}
          >
            {value}
          </motion.span>
        ))
        : children}
    </motion.span>
  );
}
