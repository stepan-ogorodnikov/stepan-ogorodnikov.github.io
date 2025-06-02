import { TYPEWRITER_OPTIONS } from "@/components/content/typewriter";
import { DEFAULT_THEME, Theme, THEMES } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import type { Transition } from "motion/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContentFileSlug(filename: string) {
  return filename.substring(3);
}

export function isOneOf<T extends any>(value: any, values: readonly T[]): value is T {
  return values.includes(value as T);
}

function getStorageValue(key: string): string | null;
function getStorageValue<T>(key: string, fallback: T): string | T;

function getStorageValue<T>(key: string, fallback?: T | null): string | T | null {
  if (typeof localStorage !== "object") return fallback ?? null;
  const value = localStorage.getItem(key);
  return value !== null ? value : fallback ?? null;
}

export function getPreferences() {
  const stringValue = getStorageValue("preferences");
  try {
    return stringValue ? JSON.parse(stringValue) : null;
  } catch {
    return null;
  }
}

export function setPreferences(preferences: object) {
  try {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  } catch {
    return;
  }
}

export function getTheme(): Theme {
  const theme = getPreferences()?.theme;
  return isOneOf(theme, THEMES) ? theme : DEFAULT_THEME;
}

export function getTypewriterTotal(value: string, transition: Transition = {}) {
  const { delay, duration } = { ...transition, ...TYPEWRITER_OPTIONS };
  return delay + (duration * value.length);
}

export function createObjectFromProperties<K extends string, T>(keys: K[], value: T): Record<K, T> {
  return keys.reduce<Record<K, T>>((obj, key) => {
    obj[key] = value;
    return obj;
  }, {} as Record<K, T>);
}
