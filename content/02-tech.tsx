"use client";

import { Page } from "@/components/content/page";
import { TechCard } from "@/components/content/tech-card";
import { usePage } from "@/hooks/use-page";
import { fadeIn, slideDown } from "@/lib/animations";
import { createObjectFromProperties } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const STACK = [
  "typescript",
  "react",
  "nextjs",
  "astro",
  "remix",
  "vanillajs",
  "vite",
  "solidjs",
  "solidstart",
  "sass",
  "tailwind",
  "tsquery",
  "redux",
  "zustand",
  "jotai",
  "zod",
  "drizzle",
  "motion",
];

const ANIMATIONS = {
  message: slideDown,
  ...createObjectFromProperties(STACK, fadeIn),
};

export default function Stacks() {
  const { t } = useTranslation();
  const { data, startAnimation, isDone, setIsDone } = usePage(ANIMATIONS);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startAnimation(["message"]);
    }, isDone ? 0 : 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Page>
      <motion.div
        className="text-xl/12 font-bold fg-lighter"
        onAnimationComplete={() => startAnimation("typescript")}
        {...data.message}
      >
        {t("tech.message")}
      </motion.div>
      <div className="mt-6">
        <div className="grid grid-cols-[repeat(12,--spacing(6))] grid-rows-[repeat(21,--spacing(6))]">
          <TechCard
            title="TypeScript"
            className="col-start-4 col-span-6 row-start-4 row-span-6 p-6"
            size={[6, 6]}
            onAnimationComplete={() => startAnimation("react")}
            {...data.typescript}
          />
          <TechCard
            title="React"
            className="col-start-4 col-span-6 row-start-10 row-span-6 p-6"
            size={[6, 6]}
            onAnimationComplete={() => startAnimation("nextjs")}
            {...data.react}
          />
          <TechCard
            title="Next.js"
            className="col-start-1 col-span-6 row-start-16 row-span-6 p-6"
            size={[6, 6]}
            onAnimationComplete={() => startAnimation("astro")}
            {...data.nextjs}
          />
          <TechCard
            title="Astro"
            className="col-start-1 col-span-3 row-start-10 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("remix")}
            {...data.astro}
          />
          <TechCard
            title="Remix"
            className="col-start-10 col-span-3 row-start-13 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("vanillajs")}
            {...data.remix}
          />
          <TechCard
            title="Vanilla JS"
            className="col-start-1 col-span-3 row-start-7 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("vite")}
            {...data.vanillajs}
          />
          <TechCard
            title="Vite"
            className="col-start-1 col-span-3 row-start-4 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("solidjs")}
            {...data.vite}
          />
          <TechCard
            title="SolidJS"
            className="col-start-10 col-span-3 row-start-4 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("solidstart")}
            {...data.solidjs}
          />
          <TechCard
            title="SolidStart"
            className="col-start-10 col-span-3 row-start-7 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("sass")}
            {...data.solidstart}
          />
          <TechCard
            title="SASS"
            className="col-start-7 col-span-3 row-start-1 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("tailwind")}
            {...data.sass}
          />
          <TechCard
            title="Tailwind CSS"
            className="col-start-4 col-span-3 row-start-1 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("tsquery")}
            {...data.tailwind}
          />
          <TechCard
            title="TanStack Query"
            className="col-start-1 col-span-3 row-start-13 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("redux")}
            {...data.tsquery}
          />
          <TechCard
            title="Redux"
            className="col-start-10 col-span-3 row-start-10 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("zustand")}
            {...data.redux}
          />
          <TechCard
            title="Zustand"
            className="col-start-7 col-span-3 row-start-16 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("jotai")}
            {...data.zustand}
          />
          <TechCard
            title="Jotai"
            className="col-start-7 col-span-6 row-start-19 row-span-3"
            size={[6, 3]}
            onAnimationComplete={() => startAnimation("zod")}
            {...data.jotai}
          />
          <TechCard
            title="Zod"
            className="col-start-10 col-span-3 row-start-16 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("drizzle")}
            {...data.zod}
          />
          <TechCard
            title="Drizzle ORM"
            className="col-start-1 col-span-3 row-start-1 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => startAnimation("motion")}
            {...data.drizzle}
          />
          <TechCard
            title="Motion"
            className="col-start-10 col-span-3 row-start-1 row-span-3"
            size={[3, 3]}
            onAnimationComplete={() => setIsDone()}
            {...data.motion}
          />
        </div>
      </div>
    </Page>
  );
}
