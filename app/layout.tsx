import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin-ext"] });

import { register } from "swiper/element/bundle";
import { Providers } from "./providers";

import { Toaster } from "sonner";
import { Image } from "@nextui-org/image";
import { Textarea } from "@nextui-org/input";

import { Footer } from "./_shared/_components/Footer";
import { Topbar } from "./_shared/_components/Topbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Hugo Mitoire",
  description: "Hugo Mitoire",
};

export default function RootLayout(props: RootLayoutProps) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");
  register(); // Register Swiper elements
  return (
    <html lang="en">
      <body
        className={`h-full min-h-screen text-foreground ${montserrat.className}`}
      >
        <Providers>
          <span className="fixed top-0 z-30 w-full">
            <Topbar pathname={activePath} />
          </span>

          {props.children}

          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
