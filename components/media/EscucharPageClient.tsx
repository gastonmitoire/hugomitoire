"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { VideoData } from "@/data/types";
import { SERIES_LABELS } from "@/data/videos";
import { getAllProgress, WatchEntry } from "@/lib/watchHistory";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import { cn } from "@/lib/utils";

type Filter = "all" | VideoData["series"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "terror", label: "Terror" },
  { value: "jovenes", label: "Jóvenes y Adultos" },
  { value: "aventuras", label: "Aventuras y Humor" },
];

const ease = [0.16, 1, 0.3, 1] as const;

interface EscucharPageClientProps {
  videos: VideoData[];
}

export function EscucharPageClient({ videos }: EscucharPageClientProps) {
  const [selected, setSelected] = useState<VideoData | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [history, setHistory] = useState<Record<string, WatchEntry>>({});

  useEffect(() => {
    setHistory(getAllProgress());
  }, []);

  const refreshHistory = () => setHistory(getAllProgress());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return videos.filter((v) => {
      const matchFilter = filter === "all" || v.series === filter;
      const matchSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        SERIES_LABELS[v.series].toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [videos, search, filter]);

  const inProgress = useMemo(
    () =>
      videos.filter((v) => {
        const h = history[v.id];
        return h && h.position / (h.duration || v.duration) > 0.02 && !h.completed;
      }),
    [videos, history]
  );

  const getProgressRatio = (videoId: string) => {
    const h = history[videoId];
    if (!h) return undefined;
    return h.position / (h.duration || 1);
  };

  const openVideo = (v: VideoData) => {
    setSelected(v);
  };

  const closeVideo = () => {
    setSelected(null);
    refreshHistory();
  };

  return (
    <>
      <VideoModal video={selected} onClose={closeVideo} />

      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 pt-28 lg:pt-36 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 lg:mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
            Canal de YouTube
          </p>
          <h1 className="font-cinzel text-4xl lg:text-6xl font-semibold text-text-primary mb-4">
            Escuchar
          </h1>
          <p className="font-bellefair text-text-secondary text-lg max-w-xl">
            Cuentos relatados por el autor. Cuarentena 2020.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-10 lg:mb-14"
        >
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar…"
              className="w-full bg-surface border border-white/8 rounded-sm pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded-sm border transition-colors",
                  filter === f.value
                    ? "border-white/30 text-white bg-white/8"
                    : "border-white/8 text-text-muted hover:text-text-secondary hover:border-white/15"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Seguir viendo */}
        {inProgress.length > 0 && !search && filter === "all" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-5">
              Seguir viendo
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {inProgress.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                >
                  <VideoCard
                    video={v}
                    progress={getProgressRatio(v.id)}
                    onClick={() => openVideo(v)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Video grid */}
        <section>
          {!search && filter === "all" && (
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-5">
              Todos los videos · {videos.length}
            </p>
          )}
          {search || filter !== "all" ? (
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-5">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <p className="text-text-muted font-bellefair text-lg py-16 text-center">
              Sin resultados para &ldquo;{search}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {filtered.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: Math.min(i * 0.04, 0.4) }}
                >
                  <VideoCard
                    video={v}
                    progress={getProgressRatio(v.id)}
                    onClick={() => openVideo(v)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
