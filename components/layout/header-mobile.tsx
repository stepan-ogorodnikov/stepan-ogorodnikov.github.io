"use client";

import { MobileNav } from "@/components/layout/header/mobile-nav";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type CSSProperties, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "vaul";
import { MobileMenu } from "./header/mobile-menu";
import { MobileMenuButton } from "./header/mobile-menu-button";

export function HeaderMobile() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="flex flex-col sm:items-center border-b">
      <div className="sm:hidden fixed top-0 left-0 right-0 w-screen grow flex flex-col bg-editor" ref={menuRef}>
        <Drawer.Root direction="top" modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <div className="grow flex flex-row items-center gap-2 fixed top-0 left-0 right-0 z-2 p-2 bg-editor border-b">
            <MobileNav />
            <Drawer.Trigger asChild>
              <Button
                className="size-9 text-secondary-fg"
                variant="ghost"
                aria-label={t(`app.menu.${isOpen ? "close" : "open"}`)}
              >
                <MobileMenuButton isOpen={isOpen} />
              </Button>
            </Drawer.Trigger>
          </div>
          <Drawer.Portal container={menuRef.current}>
            <Drawer.Overlay className="fixed inset-0 top-13 bg-black/40" />
            <Drawer.Content
              className="fixed z-1 top-13 left-0 right-0 p-2 bg-editor border-b after:hidden"
              style={{ "--initial-transform": "calc(100% + 3.25rem)" } as CSSProperties}
            >
              <VisuallyHidden>
                <Drawer.Title>{t("app.menu.title")}</Drawer.Title>
                <Drawer.Description>{t("app.menu.description")}</Drawer.Description>
              </VisuallyHidden>
              <MobileMenu />
              <div className="w-12 h-1.5 mx-auto rounded-full bg-neutral-300 dark:bg-neutral-600" />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
