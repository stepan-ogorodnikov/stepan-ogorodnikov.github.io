import { CornerBox } from "@/components/content/corner-box";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "motion/react";
import SVG from "react-inlinesvg";

type IconObject = {
  filename: string;
  type: string;
  cn: string;
};

const ICONS: Record<string, IconObject> = {
  "TypeScript": { filename: "typescript", type: "svg", cn: "" },
  "Vanilla JS": { filename: "javascript", type: "svg", cn: "" },
  "Vite": { filename: "vite", type: "svg", cn: "" },
  "React": { filename: "react", type: "svg", cn: "" },
  "SolidJS": { filename: "solidjs", type: "svg", cn: "" },
  "Astro": { filename: "astro", type: "svg", cn: "" },
  "Next.js": { filename: "next-js", type: "svg", cn: "" },
  "Remix": { filename: "remix", type: "svg", cn: "w-auto h-full" },
  "SolidStart": { filename: "solidstart", type: "svg", cn: "" },
  "Tailwind CSS": { filename: "tailwindcss", type: "svg", cn: "" },
  "SASS": { filename: "sass", type: "svg", cn: "" },
  "TanStack Query": { filename: "tanstack-query", type: "svg", cn: "" },
  "Redux": { filename: "redux", type: "svg", cn: "" },
  "Zustand": { filename: "zustand", type: "png", cn: "" },
  "Jotai": { filename: "jotai", type: "svg", cn: "" },
  "Zod": { filename: "zod", type: "svg", cn: "" },
  "Drizzle ORM": { filename: "drizzle", type: "svg", cn: "fill-[#121212] dark:fill-[#C5F74F]" },
  "Motion": { filename: "motion", type: "svg", cn: "fill-[#0F1115] dark:fill-[#FFF312]" },
};

type TechCardProps = MotionProps & {
  title: string;
  className?: string;
  size?: [number, number];
  withTooltip?: boolean;
  hasFrame?: boolean;
  cornerLength?: number;
};

export function TechCard(
  { title, className, size, withTooltip = true, hasFrame = true, cornerLength, ...props }: TechCardProps,
) {
  const icon = ICONS[title];

  if (!icon) return null;

  if (!withTooltip) {
    return (
      <motion.div className={cn("flex items-center justify-center relative p-4 group", className)} {...props}>
        {hasFrame && size && (
          <CornerBox
            className="group-hover:stroke-stronger"
            size={[size[0] * 24, size[1] * 24]}
            cornerLength={cornerLength || 8}
          />
        )}
        {icon.type == "svg"
          ? (
            <SVG
              className={cn("fill-current", icon.cn)}
              src={`images/logos/${icon.filename}.svg`}
            />
          )
          : (
            <img
              className="select-none"
              src={`images/logos/${icon.filename}.${icon.type}`}
              alt=""
            />
          )}
      </motion.div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div className={cn("flex items-center justify-center relative p-4 group", className)} {...props}>
          {hasFrame && size && (
            <CornerBox
              className="group-hover:stroke-stronger"
              size={[size[0] * 24, size[1] * 24]}
              cornerLength={cornerLength || 8}
            />
          )}
          {icon.type == "svg"
            ? (
              <SVG
                className={cn("fill-current", icon.cn)}
                src={`images/logos/${icon.filename}.svg`}
              />
            )
            : (
              <img
                className="select-none"
                src={`images/logos/${icon.filename}.${icon.type}`}
                alt=""
              />
            )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent className="font-mono font-semibold text-sm">
        <span>{title}</span>
      </TooltipContent>
    </Tooltip>
  );
}
