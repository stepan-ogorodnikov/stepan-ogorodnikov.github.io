import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col grow items-center justify-center">
      {children}
    </div>
  );
}
