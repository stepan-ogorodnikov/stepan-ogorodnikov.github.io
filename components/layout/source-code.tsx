import { useAppSelector } from "@/store/hooks";
import { useAnimate } from "motion/react";
import { type ReactNode, useEffect } from "react";

type Props = {
  code: ReactNode;
};

export function SourceCode({ code }: Props) {
  const [scope, animate] = useAnimate();
  const isNavigating = useAppSelector((state) => state.nav.isNavigating);

  useEffect(() => {
    if (isNavigating) {
      animate(".source-code", { filter: "blur(2px)", opacity: 0 });
    } else {
      animate(".source-code", { filter: "blur(0)", opacity: 1 });
    }
  }, [isNavigating]);

  return (
    <div
      className="max-h-screen overflow-auto"
      ref={scope}
    >
      {code}
    </div>
  );
}
