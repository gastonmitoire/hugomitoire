"use client";

import { VideoData } from "@/data/types";
import { SERIES_LABELS } from "@/data/videos";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: VideoData;
  progress?: number;
  onClick: () => void;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const SERIES_ACCENT: Record<VideoData["series"], string> = {
  terror: "#e05252",
  jovenes: "#f5cb5c",
  aventuras: "#52b0e0",
};

export function VideoCard({ video, progress, onClick }: VideoCardProps) {
  const pct = progress != null ? Math.min(progress * 100, 100) : 0;
  const hasProgress = progress != null && progress > 0.02 && progress < 0.95;
  const completed = progress != null && progress >= 0.95;
  const accent = SERIES_ACCENT[video.series];

  return (
    <button
      onClick={onClick}
      className="group text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm"
    >
      <div className="relative overflow-hidden rounded-sm bg-elevated aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration */}
        <span className="absolute bottom-2 right-2 text-[11px] font-mono text-white bg-black/75 px-1.5 py-0.5 rounded-sm">
          {formatDuration(video.duration)}
        </span>

        {/* Completed check */}
        {completed && (
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-white/70">
              <path d="M13.5 2.5L6 10.5 2.5 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        )}

        {/* Progress bar */}
        {hasProgress && (
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/20">
            <div
              className="h-full transition-none"
              style={{ width: `${pct}%`, backgroundColor: accent }}
            />
          </div>
        )}
      </div>

      <div className="mt-2.5 space-y-1">
        <p className="text-text-primary text-sm font-medium leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {video.title}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-medium px-1.5 py-px rounded-sm"
            style={{ color: accent, backgroundColor: `${accent}18` }}
          >
            {SERIES_LABELS[video.series].split(" ").slice(2).join(" ") || SERIES_LABELS[video.series]}
          </span>
          {hasProgress && (
            <span className="text-[10px] text-text-muted">
              {Math.round(pct)}% visto
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
