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

const BASE_URL = "https://hugomitoire.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hugo Mitoire — Escritor",
    template: "%s | Hugo Mitoire",
  },
  description:
    "Sitio oficial de Hugo Mitoire, escritor argentino de literatura infantil, juvenil y policial negro. Autor de la serie Cuentos de Terror para Franco y de novelas como Los Ojos de Mariel y La Cacería.",
  keywords: [
    "Hugo Mitoire",
    "escritor argentino",
    "literatura infantil",
    "literatura juvenil",
    "Cuentos de Terror para Franco",
    "policial negro",
    "Chaco",
    "Margarita Belén",
    "novela argentina",
  ],
  authors: [{ name: "Hugo Mitoire", url: `${BASE_URL}/autor` }],
  creator: "Gastón Mitoire",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "Hugo Mitoire",
    title: "Hugo Mitoire — Escritor",
    description:
      "Sitio oficial de Hugo Mitoire, escritor argentino de literatura infantil, juvenil y policial negro.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Mitoire — Escritor",
    description:
      "Sitio oficial de Hugo Mitoire, escritor argentino de literatura infantil, juvenil y policial negro.",
  },
  alternates: {
    canonical: BASE_URL,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hugo Mitoire",
              url: BASE_URL,
              jobTitle: "Escritor",
              nationality: { "@type": "Country", name: "Argentina" },
              birthPlace: {
                "@type": "Place",
                name: "Margarita Belén, Chaco, Argentina",
              },
              description:
                "Escritor argentino de literatura infantil, juvenil y policial negro. Autor de la serie Cuentos de Terror para Franco.",
              sameAs: [
                "https://instagram.com/hugodanielmitoire",
                "https://facebook.com/hmitoire",
              ],
            }),
          }}
        />
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
