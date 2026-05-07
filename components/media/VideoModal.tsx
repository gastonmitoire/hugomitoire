"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { VideoData } from "@/data/types";
import { SERIES_LABELS } from "@/data/videos";
import { getProgress, setProgress } from "@/lib/watchHistory";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayerInstance {
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface VideoModalProps {
  video: VideoData | null;
  onClose: () => void;
}

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m} min ${sec > 0 ? `${sec} seg` : ""}`.trim();
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video || !containerRef.current) return;

    const startPos = getProgress(video.id)?.position ?? 0;

    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: video.id,
        playerVars: {
          start: Math.floor(startPos),
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          color: "white",
        },
        events: {
          onStateChange: ({ data, target }) => {
            if (data === 1) {
              intervalRef.current = setInterval(() => {
                setProgress(video.id, target.getCurrentTime(), target.getDuration());
              }, 5000);
            } else {
              clearInterval(intervalRef.current);
              try {
                setProgress(video.id, target.getCurrentTime(), target.getDuration());
              } catch {}
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      clearInterval(intervalRef.current);
      try {
        playerRef.current?.destroy();
      } catch {}
      playerRef.current = null;
    };
  }, [video?.id]);

  const handleClose = () => {
    clearInterval(intervalRef.current);
    if (playerRef.current && video) {
      try {
        setProgress(
          video.id,
          playerRef.current.getCurrentTime(),
          playerRef.current.getDuration()
        );
        playerRef.current.destroy();
      } catch {}
    }
    onClose();
  };

  return (
    <Dialog.Root open={!!video} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          <div className="relative w-full max-w-4xl">
            <Dialog.Close
              onClick={handleClose}
              className="absolute -top-10 right-0 text-text-secondary hover:text-white transition-colors p-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </Dialog.Close>

            {/* Player container — YT API replaces this div */}
            <div className="aspect-video w-full bg-black rounded-sm overflow-hidden">
              <div ref={containerRef} className="w-full h-full" />
            </div>

            {video && (
              <div className="mt-4 space-y-1">
                <Dialog.Title className="font-cinzel text-lg text-text-primary">
                  {video.title}
                </Dialog.Title>
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  {SERIES_LABELS[video.series]} &nbsp;·&nbsp; {formatDuration(video.duration)}
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
