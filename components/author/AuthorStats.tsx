"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AuthorData } from "@/data/types";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { key: "books" as const, label: "Libros publicados", suffix: "" },
  { key: "series" as const, label: "Series completas", suffix: "" },
  { key: "yearsWriting" as const, label: "Años escribiendo", suffix: "+" },
];

export function AuthorStats({ author }: { author: AuthorData }) {
  return (
    <section id="autor-numeros" className="bg-surface border-y border-white/[0.06] py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-white/[0.06]">
          {stats.map(({ key, label, suffix }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: -70, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: i * 0.18,
              }}
              className="flex flex-col items-center sm:px-10 text-center gap-2"
            >
              <span
                className="font-cinzel font-bold text-white leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
              >
                <Counter target={author.stats[key]} suffix={suffix} />
              </span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
