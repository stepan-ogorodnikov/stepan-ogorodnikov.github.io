"use client";

import { PageLink } from "@/components/content/page-link";
import { MIN_LAYOUT_WIDTH, NAVIGATION_EXIT_DELAY } from "@/lib/config";
import { useAppSelector } from "@/store/hooks";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, useLayoutEffect, useRef } from "react";

export function Content({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isSettled = useAppSelector((state) => state.app.isSettled);
  const isNavigating = useAppSelector((state) => state.nav.isNavigating);
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useLayoutEffect(() => {
    if (!contentRef?.current) return;
    // make page content match the background grid
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (let _ of entries) {
        if (contentRef.current) {
          // get 1rem value
          const fontSize = window.getComputedStyle(document.documentElement).fontSize;
          const fontSizeInPixels = parseFloat(fontSize);
          // get tailwind's spacing value
          const spacing = window.getComputedStyle(document.documentElement).getPropertyValue("--spacing").trim();
          const spacingInRems = parseFloat(spacing);
          // calculate grid size based on 1rem and spacing values
          const gridSize = fontSizeInPixels * spacingInRems * 6;
          // calculate paddings and bg position based on container's size
          const { scrollWidth, scrollHeight, clientWidth, clientHeight } = contentRef.current;
          const width = scrollWidth > clientWidth ? clientWidth : scrollWidth;
          const paddingInline = width >= MIN_LAYOUT_WIDTH ? (width % (gridSize * 2)) / 2 : 0;
          const height = scrollHeight > clientHeight ? clientHeight : scrollHeight;
          const paddingBlock = (height % (gridSize * 2)) / 2;
          contentRef.current.style.paddingInline = `${paddingInline}px`;
          contentRef.current.style.paddingBlock = `${paddingBlock}px`;
          contentRef.current.style.backgroundPosition = `${paddingInline}px ${paddingBlock}px`;
        }
      }
    });

    resizeObserverRef.current.observe(contentRef.current);

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, []);

  return (
    <div
      className="flex overflow-auto w-full max-sm:mt-13 bg-grid"
      id="app-content"
      ref={contentRef}
    >
      <AnimatePresence>
        {!isNavigating && isSettled && (
          <motion.div
            className="grow flex flex-col items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: NAVIGATION_EXIT_DELAY }}
            key={pathname}
          >
            <PageLink />
            {children}
            <PageLink isNext />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
