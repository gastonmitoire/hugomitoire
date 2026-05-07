import type { Metadata } from "next";
import {
  Cinzel,
  DM_Sans,
  Bellefair,
  Atkinson_Hyperlegible,
} from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/accessibility-context";
import { Topbar } from "@/components/layout/Topbar";
import { Toaster } from "sonner";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel-var",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans-var",
  display: "swap",
});

const bellefair = Bellefair({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bellefair-var",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hugo Mitoire — Escritor",
    template: "%s | Hugo Mitoire",
  },
  description:
    "Sitio oficial de Hugo Mitoire, escritor argentino de literatura infantil, juvenil y policial negro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${dmSans.variable} ${bellefair.variable} ${atkinson.variable}`}
    >
      <body>
        <AccessibilityProvider>
          <Topbar />
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#F0EDE6",
              },
            }}
          />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
