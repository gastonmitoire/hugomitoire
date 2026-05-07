import { Metadata } from "next";
import { author } from "@/data/author";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponete en contacto con Hugo Mitoire.",
};

export default function ContactoPage() {
  return (
    <>
      <main className="min-h-screen pt-28 lg:pt-36">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <ContactInfo author={author} />

            <div>
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
