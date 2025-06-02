import { MotionProps, TargetAndTransition } from "motion/react";

export type Animation = (isMotionOn?: boolean, isDone?: boolean) => MotionProps & Record<string, any>;

export const noMotionFallback: Animation = () => {
  return {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } },
  };
};

export const typewriter: Animation = (isMotionOn, isDone) => {
  return isDone || !isMotionOn ? { animate: {}, transition: { delay: 0, duration: 0 } } : { animate: {} };
};

export const fadeIn: Animation = (isMotionOn, isDone) => {
  if (!isMotionOn || isDone) return noMotionFallback();
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };
};

export const slideIn = (from: TargetAndTransition, isMotionOn?: boolean, isDone?: boolean) => {
  if (!isMotionOn || isDone) return noMotionFallback();
  return {
    initial: { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.3 } },
  };
};

export const slideRight: Animation = (isMotionOn, isDone) => slideIn({ x: "-100%" }, isMotionOn, isDone);
export const slideUp: Animation = (isMotionOn, isDone) => slideIn({ y: "100%" }, isMotionOn, isDone);
export const slideDown: Animation = (isMotionOn, isDone) => slideIn({ y: "-100%" }, isMotionOn, isDone);

export const scaleOut: Animation = (isMotionOn, isDone) => {
  if (!isMotionOn || isDone) return noMotionFallback();
  return {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  };
};

export const wave: Animation = (isMotionOn) => {
  if (!isMotionOn) return {};
  return {
    animate: {
      rotate: Array(3).fill([0, "9deg"]).flat().concat([0]),
      transition: { duration: 1, repeatDelay: 5, repeat: Infinity, ease: "linear" },
    },
  };
};
