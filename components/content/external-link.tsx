import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { AnchorHTMLAttributes } from "react";
import { CornerBox } from "./corner-box";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  size: [number, number];
};

export function ExternalLink({ className, children, size, ...props }: Props) {
  return (
    <a
      className={cn("relative text-link group cursor-pointer", className)}
      {...props}
    >
      <CornerBox size={[size[0] * 4, size[1] * 4]} cornerLength={8} whileHover="hover">
        <g className="stroke-2 stroke-link fill-none">
          <motion.path
            initial={{ pathLength: 0 }}
            variants={{ hover: { pathLength: 1 } }}
            d={`M ${size[0] * 4} 0 h -8`}
          />
          <motion.path
            initial={{ pathLength: 0 }}
            variants={{ hover: { pathLength: 1 } }}
            d={`M ${size[0] * 4} 0 v 8`}
          />
          <motion.path
            className="stroke-1"
            initial={{ pathLength: 0 }}
            variants={{ hover: { pathLength: 1 } }}
            d={`M ${size[0] * 4} 0 l -10 10`}
          />
        </g>
      </CornerBox>
      {children}
    </a>
  );
}
