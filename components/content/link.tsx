"use client";

import { NAVIGATION_EXIT_DELAY } from "@/lib/config";
import { useAppDispatch } from "@/store/hooks";
import { setIsNavigating } from "@/store/nav-slice";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren & { href: string };

export function Link({ href, ...props }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setIsNavigating(true));
    setTimeout(() => {
      router.push(href);
    }, NAVIGATION_EXIT_DELAY * 1000);
  };

  return <NextLink href={href} onClick={handleClick} {...props} />;
}
