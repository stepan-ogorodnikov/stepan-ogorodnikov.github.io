import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { StoreInitializer } from "@/components/store-initializer";
import { StoreProvider } from "@/components/store-provier";

const sans = Inter({
  variable: "--font-app-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const mono = Source_Code_Pro({
  variable: "--font-app-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stepan, Frontend Developer",
  description: "Profile of Stepan Ogorodnikov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} h-screen w-screen min-w-xs bg-base fg-base scheme-light dark:scheme-dark antialiased font-sans`}
      >
        <StoreProvider>
          <TooltipProvider>
            <StoreInitializer />
            {children}
          </TooltipProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
