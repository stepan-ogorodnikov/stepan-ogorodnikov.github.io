"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NAVIGATION_EXIT_DELAY } from "@/lib/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsNavigating } from "@/store/nav-slice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { NavFileIcon } from "../nav-file-icon";

export function MobileNav() {
  const { t } = useTranslation();
  const router = useRouter();
  const files = useAppSelector((state) => state.nav.files);
  const current = useAppSelector((state) => state.nav.currentFile);
  const isNavigating = useAppSelector((state) => state.nav.isNavigating);
  const dispatch = useAppDispatch();

  const navigate = (href: string) => {
    dispatch(setIsNavigating(true));
    setTimeout(() => {
      router.push(href);
    }, NAVIGATION_EXIT_DELAY * 1000);
  };

  return (
    <nav className="flex grow">
      <Select
        value={current}
        onValueChange={(value) => navigate(`/${value}`)}
      >
        <SelectTrigger className="w-full" aria-label={t("app.select.file")}>
          {!isNavigating ? <SelectValue /> : <div className="grow" />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {files.map((file) => (
              <SelectItem
                className="flex flex-row items-center gap-1 sm:gap-2"
                key={file}
                value={file}
              >
                <NavFileIcon />
                <span className="font-mono text-lg">
                  {file}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </nav>
  );
}
