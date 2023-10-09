import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin-ext"] });

import { register } from "swiper/element/bundle";
import { Providers } from "./providers";

import { Image } from "@nextui-org/image";
import { Textarea } from "@nextui-org/input";

import { Topbar } from "./_components/Topbar";
import { Footer } from "./_components/Footer";

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
        className={`min-h-screen bg-background text-foreground dark ${montserrat.className}`}
      >
        <Providers>
          <span className="fixed top-0 z-30 w-full">
            <Topbar pathname={activePath} />
          </span>

          {props.children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
