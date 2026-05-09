import type { Metadata } from "next";
import { videos } from "@/data/videos";
import { EscucharPageClient } from "@/components/media/EscucharPageClient";

export const metadata: Metadata = {
  title: "Escuchar",
  description:
    "Cuentos de Hugo Mitoire relatados por el autor. Terror, aventuras y humor narrados en vivo durante la cuarentena 2020.",
  alternates: { canonical: "/escuchar" },
  openGraph: {
    title: "Escuchar | Hugo Mitoire",
    description:
      "Cuentos de Hugo Mitoire relatados por el autor. Terror, aventuras y humor.",
    type: "website",
    url: "/escuchar",
  },
};

export default function EscucharPage() {
  return <EscucharPageClient videos={videos} />;
}
