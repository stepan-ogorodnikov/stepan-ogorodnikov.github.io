"use client";

import { NAVIGATION_EXIT_DELAY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useNavigation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(true);

  const delayedNavigate = (href: string) => {
    if (isNavigating) return;

    setIsNavigating(false);

    setTimeout(() => {
      router.push(href);
    }, NAVIGATION_EXIT_DELAY);
  };

  return { delayedNavigate, isNavigating };
}
