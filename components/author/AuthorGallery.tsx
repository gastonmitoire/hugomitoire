"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/assets/images/author/abuelos.jpg", caption: "Con el abuelo Félix y la abuela María", aspect: "portrait" },
  { src: "/assets/images/author/nino.jpg", caption: "Niño bueno", aspect: "portrait" },
  { src: "/assets/images/author/con-papa.jpg", caption: "Con papá", aspect: "portrait" },
  { src: "/assets/images/author/secundaria.jpg", caption: "Empezando la secundaria", aspect: "portrait" },
  { src: "/assets/images/author/soldado-1983.jpg", caption: "Soldado argentino, 1983", aspect: "portrait" },
  { src: "/assets/images/author/con-victor-heredia.jpg", caption: "Con Víctor Heredia", aspect: "landscape" },
];

type Photo = typeof photos[number];

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function PhotoLightbox({
  startIndex,
  onClose,
}: {
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(MIN_SCALE);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const photo = photos[index];
  const isZoomed = scale > 1;

  const resetTransform = useCallback(() => {
    animate(x, 0, { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const });
    animate(y, 0, { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const });
    setScale(MIN_SCALE);
  }, [x, y]);

  const goTo = useCallback((newIdx: number) => {
    x.set(0);
    y.set(0);
    setScale(MIN_SCALE);
    setIndex(newIdx);
  }, [x, y]);

  const prev = useCallback(() => goTo((index - 1 + photos.length) % photos.length), [index, goTo]);
  const next = useCallback(() => goTo((index + 1) % photos.length), [index, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // Wheel zoom — non-passive to allow preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.35 : -0.35;
      setScale((prev) => {
        const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta));
        if (next === MIN_SCALE) {
          animate(x, 0, { duration: 0.25 });
          animate(y, 0, { duration: 0.25 });
        }
        return next;
      });
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [x, y]);

  // Drag constraints: keep zoomed image within bounds
  const dragConstraints = useCallback(() => {
    const el = imageRef.current;
    if (!el || scale <= MIN_SCALE) return { top: 0, bottom: 0, left: 0, right: 0 };
    const ox = (el.offsetWidth * (scale - 1)) / 2;
    const oy = (el.offsetHeight * (scale - 1)) / 2;
    return { top: -oy, bottom: oy, left: -ox, right: ox };
  }, [scale]);

  const handleDoubleClick = () => {
    if (isZoomed) resetTransform();
    else setScale(2.5);
  };

  const cursor = isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      style={{ cursor }}
    >
      {/* Top bar */}
      <div className="relative flex items-center justify-between px-5 py-4 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase tabular-nums">
            {index + 1} / {photos.length}
          </span>
          <AnimatePresence>
            {isZoomed && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-white/30 tracking-widest ml-2"
              >
                {scale.toFixed(1)}×
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <Dialog.Close asChild>
          <button
            aria-label="Cerrar"
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </Dialog.Close>
      </div>

      {/* Image area */}
      <div
        className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden"
        onClick={(e) => { if (e.target === e.currentTarget && !isZoomed) onClose(); }}
      >
        {/* Prev / Next */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-5 z-10 p-2 sm:p-3 text-white/30 hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-5 z-10 p-2 sm:p-3 text-white/30 hover:text-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}

        {/* Zoomed/draggable image */}
        <motion.div
          ref={imageRef}
          key={photo.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ x, y, scale }}
          drag={isZoomed}
          dragConstraints={dragConstraints()}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDoubleClick={handleDoubleClick}
          className="select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.src}
            alt={photo.caption}
            width={1200}
            height={1600}
            className="max-h-[calc(100dvh-10rem)] max-w-[calc(100vw-8rem)] w-auto h-auto object-contain shadow-2xl"
            priority
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Caption + hint */}
      <div className="shrink-0 py-4 px-6 flex flex-col items-center gap-1.5 z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={photo.caption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-white/50 tracking-wide text-center"
          >
            {photo.caption}
          </motion.p>
        </AnimatePresence>
        {!isZoomed && (
          <p className="text-[9px] text-white/18 tracking-[0.18em] uppercase">
            Rueda para zoom · doble click · ← →
          </p>
        )}
      </div>

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="shrink-0 pb-5 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1}`}
              className="transition-all duration-200"
            >
              <div
                className={`h-[3px] rounded-full bg-white transition-all duration-200 ${
                  i === index ? "w-5 opacity-60" : "w-1.5 opacity-20"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────
// aspect-ratio + fill = espacio siempre reservado antes de que cargue la imagen

function GalleryThumb({ photo, onLoad }: { photo: Photo; onLoad: () => void }) {
  const aspectRatio = photo.aspect === "portrait" ? "3/4" : "4/3";
  return (
    <div
      className="relative overflow-hidden rounded-sm bg-elevated"
      style={{ aspectRatio }}
    >
      <Image
        fill
        src={photo.src}
        alt={photo.caption}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        onLoad={onLoad}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <figcaption className="absolute bottom-0 inset-x-0 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[10px] text-white/80 leading-tight">{photo.caption}</p>
      </figcaption>
    </div>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

export function AuthorGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const isOpen = selectedIndex !== null;

  const handleImageLoad = useCallback(() => {
    setLoadedCount((n) => {
      const next = n + 1;
      if (next >= photos.length) setRevealed(true);
      return next;
    });
  }, []);

  // Seguro: revela después de 2.5 s aunque alguna imagen falle
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2500);
    return () => clearTimeout(t);
  }, []);

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

        {/* El grid ocupa siempre su espacio (no hay CLS); se revela cuando todas las imágenes cargaron */}
        <motion.div
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 lg:gap-4"
        >
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className="break-inside-avoid mb-3 lg:mb-4 group cursor-zoom-in"
              onClick={() => setSelectedIndex(i)}
            >
              <GalleryThumb photo={photo} onLoad={handleImageLoad} />
            </figure>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={isOpen} onOpenChange={(v) => !v && setSelectedIndex(null)}>
        <AnimatePresence>
          {isOpen && selectedIndex !== null && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild aria-describedby={undefined}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-50"
                >
                  <Dialog.Title className="sr-only">
                    {photos[selectedIndex].caption}
                  </Dialog.Title>
                  <PhotoLightbox
                    startIndex={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                  />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
