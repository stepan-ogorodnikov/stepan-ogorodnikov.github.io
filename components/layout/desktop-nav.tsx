"use client";

import { Link } from "@/components/content/link";
import { useAppSelector } from "@/store/hooks";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { NavFileIcon } from "./nav-file-icon";

export function DesktopNav() {
  const path = usePathname();
  const files = useAppSelector((state) => state.nav.files);

  return (
    <nav>
      <ul className="max-sm:hidden flex flex-col">
        {files.map((file, i) => (
          <li key={i}>
            <Link
              className="relative flex flex-row items-center gap-2 w-full p-2 cursor-pointer"
              href={`/${file}`}
            >
              <NavFileIcon />
              <span className="font-mono font-medium">
                {file}
              </span>
              {path == `/${file}` && (
                <motion.div
                  layoutId="activeRouteIndicator"
                  className="absolute inset-0 bg-black/5 dark:bg-white/10"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
