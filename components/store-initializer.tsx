"use client";

import { reducedMotionUpdated, storeInitialized } from "@/store/app-slice";
import { useAppDispatch } from "@/store/hooks";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

export function StoreInitializer() {
  const dispatch = useAppDispatch();
  const isMotionReduced = useReducedMotion();

  useEffect(() => {
    dispatch(storeInitialized({
      isMotionReduced,
      layoutWidth: window?.innerWidth | 0,
    }));
  }, []);

  useEffect(() => {
    dispatch(reducedMotionUpdated(isMotionReduced));
  }, [isMotionReduced]);

  return null;
}
