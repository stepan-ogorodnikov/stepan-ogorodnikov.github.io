"use client";

import { ExternalLink } from "@/components/content/external-link";
import { Page } from "@/components/content/page";
import { TechCard } from "@/components/content/tech-card";
import { Typewriter } from "@/components/content/typewriter";
import { usePage } from "@/hooks/use-page";
import { fadeIn, scaleOut, slideRight, slideUp, typewriter, wave } from "@/lib/animations";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ANIMATIONS = {
  photo: scaleOut,
  hand: slideRight,
  namePrefix: slideUp,
  nameValue: typewriter,
  positionPrefix: slideUp,
  positionValue: typewriter,
  stack: slideUp,
  stackItems: fadeIn,
  github: slideUp,
};

export default function Index() {
  const { t } = useTranslation();
  const { data, startAnimation, updateAnimation, isDone, setIsDone } = usePage(ANIMATIONS);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startAnimation(["photo", "hand"]);
    }, isDone ? 0 : 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Page>
      <div className="w-72 relative">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="flex justify-center relative w-full p-6">
            <motion.img
              className="size-36 rounded-full border-3 border-neutral-200"
              src="/images/photo-144.webp"
              srcSet="/images/photo-144.webp 144w, /images/photo-288.webp 288w"
              sizes="9rem"
              alt=""
              loading="eager"
              onAnimationComplete={() => startAnimation("namePrefix")}
              {...data.photo}
            />
          </div>
          <div className="self-stretch flex flex-row items-center text-2xl/12 font-bold">
            <div className="inline-flex items-center justify-center size-12">
              <motion.span
                className="text-3xl select-none origin-bottom-right"
                onAnimationComplete={() => updateAnimation({ hand: wave })}
                {...data.hand}
              >
                👋
              </motion.span>
            </div>
            <motion.div
              className="grow text-center"
              onAnimationComplete={() => startAnimation("nameValue")}
              {...data.namePrefix}
            >
              <span className="text-lighter-fg">{t("index.name.prefix")}</span>
              <Typewriter
                onAnimationComplete={() => startAnimation("positionPrefix")}
                {...data.nameValue}
              >
                {t("index.name.value")}
              </Typewriter>
            </motion.div>
          </div>
          <motion.div
            className="text-xl/12 font-bold"
            onAnimationComplete={() => startAnimation("positionValue")}
            {...data.positionPrefix}
          >
            <span className="text-lighter-fg">{t("index.position.prefix")}</span>
            <Typewriter
              onAnimationComplete={() => startAnimation("stack")}
              {...data.positionValue}
            >
              {t("index.position.value")}
            </Typewriter>
          </motion.div>
          <motion.div
            className="mt-6 text-xl/12 font-bold"
            onAnimationComplete={() => startAnimation("stackItems")}
            {...data.stack}
          >
            <span className="text-lighter-fg">{t("index.stack")}</span>
          </motion.div>
          <motion.div
            className="flex flex-row justify-center gap-6 mt-6"
            onAnimationComplete={() => startAnimation("github")}
            {...data.stackItems}
          >
            {["TypeScript", "React", "Next.js"].map((item) => (
              <TechCard
                title={item}
                className="size-12 p-1"
                size={[2, 2]}
                hasFrame={false}
                key={item}
              />
            ))}
          </motion.div>
          <motion.div
            className="flex flex-row items-center justify-center relative mt-12"
            onAnimationComplete={() => setIsDone()}
            {...data.github}
          >
            <ExternalLink
              className="w-24 text-center text-lg/12 font-mono"
              size={[24, 12]}
              href="https://github.com/stepan-ogorodnikov"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </ExternalLink>
          </motion.div>
        </div>
      </div>
    </Page>
  );
}
