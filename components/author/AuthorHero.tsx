"use client";

import React, { useRef } from "react";
import { FadeImage } from "@/components/ui/FadeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { AuthorData } from "@/data/types";
import { useIsDesktop } from "@/lib/hooks";

interface AuthorHeroProps {
  author: AuthorData;
}

export function AuthorHero({ author }: AuthorHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const [firstName, lastName] = author.name.split(" ");

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden flex items-end">
      {/* Parallax BG */}
      <motion.div style={{ y: isDesktop ? bgY : 0 }} className="absolute inset-0 scale-110">
        <FadeImage
          src="/assets/images/bg/los-ojos-de-mariel_BG.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
          duration={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/40 to-transparent" />
      </motion.div>

      {/* Radial warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 40% at 30% 60%, rgba(139,26,46,0.18), transparent)" }}
      />

      {/* Content */}
      <motion.div
        style={{ y: isDesktop ? textY : 0 }}
        className="relative z-10 w-full mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 pb-16 lg:pb-24 pt-36"
      >
        <div className="flex flex-col gap-4">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.28em] text-text-muted"
          >
            Escritor · {author.origin}
          </motion.p>

          {/* Name — massive stacked */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-cinzel font-bold leading-[0.92] tracking-tight text-white"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
            >
              {firstName}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
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

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="h-px w-24 bg-white/25 mt-2"
          />

          {/* Bio excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="font-bellefair text-lg lg:text-xl text-text-secondary leading-relaxed max-w-lg mt-1"
          >
            {author.bio[0].split(".")[0]}.
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
