import { motion } from "motion/react";

type Props = {
  isOpen: boolean;
};

export function MobileMenuButton({ isOpen }: Props) {
  return (
    <motion.svg
      className="size-5 stroke-current"
      viewBox="0 0 10 10"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.path
        strokeWidth={1}
        strokeLinecap="round"
        variants={{
          closed: { d: "M 1 2 L 9 2" },
          open: { d: "M 2 2 L 5 5" },
        }}
      />
      <motion.path
        strokeWidth={1}
        strokeLinecap="round"
        variants={{
          closed: { d: "M 1 5 L 9 5" },
          open: { d: "M 2 8 L 8 2" },
        }}
      />
      <motion.path
        strokeWidth={1}
        strokeLinecap="round"
        variants={{
          closed: { d: "M 1 8 L 9 8" },
          open: { d: "M 5 5 L 8 8" },
        }}
      />
    </motion.svg>
  );
}
