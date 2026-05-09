import { Metadata } from "next";
import { author } from "@/data/author";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponete en contacto con Hugo Mitoire para consultas sobre sus obras, charlas o presentaciones.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <main className="min-h-screen pt-28 lg:pt-36 relative overflow-hidden">
        {/* Radial glow — warm gold, top right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 80% 8%, rgba(245,203,92,0.07), transparent)",
          }}
        />
        {/* Secondary glow — cool, bottom left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 10% 90%, rgba(91,127,166,0.05), transparent)",
          }}
        />

        <div className="relative mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

            <ContactInfo author={author} />

            {/* Vertical separator */}
            <div className="hidden lg:block self-stretch mx-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Form */}
            <div className="lg:pl-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
                Formulario
              </p>
              <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wide">
                Enviá un mensaje
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
