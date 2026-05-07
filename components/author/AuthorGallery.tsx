"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const photos = [
  {
    src: "/assets/images/author/abuelos.jpg",
    caption: "Con el abuelo Félix y la abuela María",
    aspect: "portrait",
  },
  {
    src: "/assets/images/author/nino.jpg",
    caption: "Niño bueno",
    aspect: "portrait",
  },
  {
    src: "/assets/images/author/con-papa.jpg",
    caption: "Con papá",
    aspect: "portrait",
  },
  {
    src: "/assets/images/author/secundaria.jpg",
    caption: "Empezando la secundaria",
    aspect: "portrait",
  },
  {
    src: "/assets/images/author/soldado-1983.jpg",
    caption: "Soldado argentino, 1983",
    aspect: "portrait",
  },
  {
    src: "/assets/images/author/con-victor-heredia.jpg",
    caption: "Con Víctor Heredia",
    aspect: "landscape",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

type Photo = typeof photos[number];

export function AuthorGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <section id="autor-historia" className="py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2">Orígenes</p>
          <h2 className="font-cinzel text-3xl lg:text-4xl font-semibold text-text-primary tracking-wide">
            Una vida en imágenes
          </h2>
          <div className="mt-3 h-px w-14 bg-white/20" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 lg:gap-4"
        >
          {photos.map((photo) => (
            <motion.figure
              key={photo.src}
              variants={item}
              className="break-inside-avoid mb-3 lg:mb-4 group cursor-zoom-in"
              onClick={() => setSelected(photo)}
            >
              <div className="relative overflow-hidden rounded-sm bg-elevated">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  width={400}
                  height={photo.aspect === "portrait" ? 540 : 300}
                  className="w-full h-auto object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <figcaption className="absolute bottom-0 inset-x-0 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-[10px] text-white/80 leading-tight">{photo.caption}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <AnimatePresence>
          {selected && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
                  onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
                >
                  <Dialog.Title className="sr-only">{selected.caption}</Dialog.Title>

                  <div className="relative max-w-4xl w-full max-h-[90dvh] flex flex-col items-center gap-3">
                    <Dialog.Close asChild>
                      <button
                        aria-label="Cerrar"
                        className="absolute -top-10 right-0 p-1.5 text-white/50 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>

                    <div className="relative w-full max-h-[80dvh] flex items-center justify-center">
                      <Image
                        src={selected.src}
                        alt={selected.caption}
                        width={1200}
                        height={1600}
                        className="max-h-[80dvh] w-auto h-auto object-contain rounded-sm shadow-2xl"
                      />
                    </div>

                    <p className="text-[11px] text-white/55 tracking-wide">{selected.caption}</p>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
