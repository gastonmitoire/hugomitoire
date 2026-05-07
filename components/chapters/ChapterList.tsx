"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChapterData, SectionData } from "@/data/types";
import { FragmentReader } from "./FragmentReader";
import { cn } from "@/lib/utils";

interface ChapterListProps {
  bookTitle: string;
  chapters: ChapterData[];
  accentColor: string;
}

type ReaderTarget = { label: string; fragment: string };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

// ─── Chapter row (flat, no sections) ─────────────────────────────────────────

function ChapterItem({
  ch,
  accentColor,
  onOpen,
}: {
  ch: ChapterData;
  accentColor: string;
  onOpen: (t: ReaderTarget) => void;
}) {
  const label = `${ch.order}. ${ch.title}`;

  if (ch.fragment) {
    return (
      <motion.button
        variants={item}
        onClick={() => onOpen({ label, fragment: ch.fragment! })}
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
    );
  }

  return (
    <motion.div
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
  );
}

// ─── Section row ──────────────────────────────────────────────────────────────

function SectionItem({
  chOrder,
  sec,
  accentColor,
  onOpen,
}: {
  chOrder: number;
  sec: SectionData;
  accentColor: string;
  onOpen: (t: ReaderTarget) => void;
}) {
  const label = `${chOrder}.${sec.subOrder}  ${sec.title}`;

  if (sec.fragment) {
    return (
      <motion.button
        variants={item}
        onClick={() => onOpen({ label, fragment: sec.fragment! })}
        className={cn(
          "group flex items-center justify-between gap-3 px-4 py-2.5 text-left w-full",
          "bg-white/[0.03] hover:bg-white/[0.07]",
          "border border-white/[0.06] hover:border-white/10",
          "rounded-sm transition-all duration-200"
        )}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="text-text-muted text-[10px] font-mono tabular-nums shrink-0 w-8 text-right">
            {chOrder}.{sec.subOrder}
          </span>
          <span className="text-text-secondary group-hover:text-text-primary text-[13px] transition-colors truncate">
            {sec.title}
          </span>
        </span>
        <BookOpen size={12} className="shrink-0 opacity-70" style={{ color: accentColor }} />
      </motion.button>
    );
  }

  return (
    <motion.div
      variants={item}
      className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.015] border border-white/[0.03] rounded-sm"
    >
      <span className="text-text-muted text-[10px] font-mono tabular-nums shrink-0 w-8 text-right">
        {chOrder}.{sec.subOrder}
      </span>
      <span className="text-text-muted text-[13px] truncate">{sec.title}</span>
    </motion.div>
  );
}

// ─── Chapter group (with sections) ───────────────────────────────────────────

function ChapterGroup({
  ch,
  accentColor,
  onOpen,
}: {
  ch: ChapterData;
  accentColor: string;
  onOpen: (t: ReaderTarget) => void;
}) {
  return (
    <motion.div variants={item} className="col-span-full space-y-1.5">
      {/* Chapter header */}
      <div className="flex items-center gap-3 px-1 pb-1 border-b border-white/[0.06]">
        <span className="text-text-muted text-[11px] font-mono tabular-nums shrink-0">
          {String(ch.order).padStart(2, "0")}
        </span>
        <span className="text-text-secondary text-sm font-medium">{ch.title}</span>
        <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-text-muted">
          {ch.sections!.length} secciones
        </span>
      </div>

      {/* Section list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4">
        {ch.sections!.map((sec) => (
          <SectionItem
            key={sec.subOrder}
            chOrder={ch.order}
            sec={sec}
            accentColor={accentColor}
            onOpen={onOpen}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ChapterList({ bookTitle, chapters, accentColor }: ChapterListProps) {
  const [selected, setSelected] = useState<ReaderTarget | null>(null);
  const [open, setOpen] = useState(false);

  const openReader = (target: ReaderTarget) => {
    setSelected(target);
    setOpen(true);
  };

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
          ch.sections?.length ? (
            <ChapterGroup
              key={ch.order}
              ch={ch}
              accentColor={accentColor}
              onOpen={openReader}
            />
          ) : (
            <ChapterItem
              key={ch.order}
              ch={ch}
              accentColor={accentColor}
              onOpen={openReader}
            />
          )
        )}
      </motion.div>

      {selected && (
        <FragmentReader
          bookTitle={bookTitle}
          label={selected.label}
          fragment={selected.fragment}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
