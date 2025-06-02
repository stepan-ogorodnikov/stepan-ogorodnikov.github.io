"use client";

import { Page } from "@/components/content/page";
import { TechCard } from "@/components/content/tech-card";
import { Typewriter } from "@/components/content/typewriter";
import { usePage } from "@/hooks/use-page";
import { fadeIn, slideDown } from "@/lib/animations";
import { createObjectFromProperties } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const STACK = ["TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "Motion"];

const ANIMATIONS = {
  message: slideDown,
  ...createObjectFromProperties(STACK, fadeIn),
};

export default function BuiltWith() {
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
      <div className="w-72 relative flex flex-col gap-6">
        <motion.div
          className="self-center text-xl/12 font-bold text-lighter-fg"
          onAnimationComplete={() => startAnimation("TypeScript")}
          {...data.message}
        >
          {t("builtWith.message")}
        </motion.div>
        <ul className="flex flex-col gap-6">
          {STACK.map((item, index) => (
            <motion.li className="flex flex-row items-center gap-6" key={item} {...data[item]}>
              <TechCard
                className="size-12 p-1"
                size={[2, 2]}
                hasFrame={false}
                withTooltip={false}
                title={item}
              />
              <Typewriter
                className="text-xl/12 font-mono"
                animate={data[item].animate && {}}
                onAnimationComplete={() => {
                  if (index < STACK.length - 1) {
                    startAnimation(STACK[index + 1]);
                  } else {
                    setIsDone();
                  }
                }}
              >
                {item}
              </Typewriter>
            </motion.li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
