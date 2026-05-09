"use client";

import React, { useRef, useState } from "react";
import { FadeImage } from "@/components/ui/FadeImage";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { AuthorData } from "@/data/types";

// Scroll cruza un umbral → fase cambia → animación ocurre sola con su propio timing.
// El scroll no controla frame a frame — sólo dispara.
type Phase = "intro" | "exiting" | "image" | "fading";

// Aceleración fuerte al salir, desacelera nunca (sale disparado)
const LAUNCH = [0.4, 0, 1, 1] as const;

interface AuthorHeroProps {
  author: AuthorData;
}

export function AuthorHero({ author }: AuthorHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("intro");

  // 200dvh wrapper → 100dvh de scroll activo mientras la sección está pinned
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if      (v < 0.11) setPhase("intro");
    else if (v < 0.46) setPhase("exiting");
    else if (v < 0.82) setPhase("image");
    else               setPhase("fading");
  });

  const gone = phase !== "intro";
  const [firstName, lastName] = author.name.split(" ");

  return (
    <div ref={wrapperRef} style={{ height: "200dvh" }}>
      <motion.section
        id="autor-hero"
        animate={phase === "fading" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.6, 1] }}
        className="sticky top-0 h-dvh overflow-hidden flex items-end"
      >

        {/* Imagen: zoom-out al revelarse → zoom-in lento mientras está sola → fade */}
        <motion.div
          animate={{
            scale:
              phase === "intro"   ? 1.12 :
              phase === "exiting" ? 1.0  :
              phase === "image"   ? 1.13 :
              1.16,
          }}
          transition={{
            duration: phase === "image" ? 5.0 : 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 origin-center"
        >
          <FadeImage
            src="/assets/images/author/106.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
            duration={900}
          />
        </motion.div>

        {/* Overlays oscuros — se disuelven revelando la imagen cruda */}
        <motion.div
          animate={{ opacity: gone ? 0.05 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/40"
        />
        <motion.div
          animate={{ opacity: gone ? 0.05 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/40 to-transparent"
        />

        {/* Warm glow permanente */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 30% 60%, rgba(139,26,46,0.18), transparent)",
          }}
        />

        {/* ── CONTENIDO ────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 pb-16 lg:pb-24 pt-36">
          <div className="flex flex-col gap-4">

            {/* Label — sube y desaparece */}
            <motion.div
              animate={gone ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.38, ease: LAUNCH }}
            >
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[10px] uppercase tracking-[0.28em] text-text-muted"
              >
                Escritor · {author.origin}
              </motion.p>
            </motion.div>

            {/* "Hugo" — sale disparado hacia la izquierda y arriba */}
            <motion.div
              animate={
                gone
                  ? { x: -1800, y: -90, opacity: 0 }
                  : { x: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.65, ease: LAUNCH }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  className="font-cinzel font-bold leading-[0.92] tracking-tight text-white"
                  style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
                >
                  {firstName}
                </motion.h1>
              </div>
            </motion.div>

            {/* "Mitoire" — sale hacia la derecha y abajo, un beat después */}
            <motion.div
              animate={
                gone
                  ? { x: 1800, y: 90, opacity: 0 }
                  : { x: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.65, delay: 0.1, ease: LAUNCH }}
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  className="font-cinzel font-bold leading-[0.92] tracking-tight block"
                  style={{
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    WebkitTextStroke: "1px rgba(240,237,230,0.35)",
                    color: "transparent",
                  }}
                >
                  {lastName}
                </motion.span>
              </div>
            </motion.div>

            {/* Divider + bio — caen hacia abajo */}
            <motion.div
              animate={gone ? { y: 70, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease: LAUNCH }}
            >
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="h-px w-24 bg-white/25 mt-2"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="font-bellefair text-lg lg:text-xl text-text-secondary leading-relaxed max-w-lg mt-4"
              >
                {author.bio[0].split(".")[0]}.
              </motion.p>
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <motion.div
          animate={{ opacity: gone ? 0.04 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none"
        />

      </motion.section>
    </div>
  );
}
