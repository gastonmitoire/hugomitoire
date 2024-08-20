import React, { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin-ext"] });

import { register } from "swiper/element/bundle";
import { Providers } from "./providers";

import { Toaster } from "sonner";

import { Topbar } from "./_shared/_components/Topbar.component";
import { Footer } from "./_shared/_components";
import { cookies, headers } from "next/headers";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Hugo Mitoire",
  description: "Hugo Mitoire",
};

export default function RootLayout({ children }: RootLayoutProps) {
  register(); // Register Swiper elements

  return (
    <html lang="en">
      <body
        className={`h-full min-h-screen text-foreground ${montserrat.className}`}
      >
        <Providers>
          <span className="fixed top-0 z-30 w-full">
            <Topbar />
          </span>

          {children}

          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
