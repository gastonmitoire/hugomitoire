"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChapterData } from "@/data/types";
import { FragmentReader } from "./FragmentReader";
import { cn } from "@/lib/utils";

interface ChapterListProps {
  bookTitle: string;
  chapters: ChapterData[];
  accentColor: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ChapterList({ bookTitle, chapters, accentColor }: ChapterListProps) {
  const [selected, setSelected] = useState<ChapterData | null>(null);
  const [open, setOpen] = useState(false);

  if (!chapters.length) {
    return (
      <p className="text-text-muted text-sm italic">
        Próximamente fragmentos disponibles.
      </p>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-1.5"
      >
        {chapters.map((ch) =>
          ch.fragment ? (
            <motion.button
              key={ch.order}
              variants={item}
              onClick={() => { setSelected(ch); setOpen(true); }}
              className={cn(
                "group flex items-center justify-between gap-3 px-4 py-3 text-left w-full",
                "bg-white/[0.03] hover:bg-white/[0.07]",
                "border border-white/[0.06] hover:border-white/10",
                "rounded-sm transition-all duration-200"
              )}
              style={{ "--book-accent": accentColor } as React.CSSProperties}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="text-text-muted text-[11px] font-mono tabular-nums shrink-0">
                  {String(ch.order).padStart(2, "0")}
                </span>
                <span className="text-text-secondary group-hover:text-text-primary text-sm transition-colors truncate">
                  {ch.title}
                </span>
              </span>
              <BookOpen size={13} className="shrink-0 opacity-80" style={{ color: accentColor }} />
            </motion.button>
          ) : (
            <motion.div
              key={ch.order}
              variants={item}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                "bg-white/[0.02] border border-white/[0.04] rounded-sm"
              )}
            >
              <span className="text-text-muted text-[11px] font-mono tabular-nums shrink-0">
                {String(ch.order).padStart(2, "0")}
              </span>
              <span className="text-text-muted text-sm truncate">{ch.title}</span>
            </motion.div>
          )
        )}
      </motion.div>

      <FragmentReader
        bookTitle={bookTitle}
        chapter={selected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
