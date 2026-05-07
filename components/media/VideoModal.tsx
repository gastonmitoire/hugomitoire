"use client";

import { useEffect, useRef, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { VideoData } from "@/data/types";
import { SERIES_LABELS } from "@/data/videos";
import { getProgress, setProgress } from "@/lib/watchHistory";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: string | HTMLElement,
        opts: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
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
  return `${m} min${sec > 0 ? ` ${sec} seg` : ""}`;
}

let ytApiLoading = false;

export function VideoModal({ video, onClose }: VideoModalProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const videoIdRef = useRef<string | undefined>(undefined);

  const destroyPlayer = useCallback(() => {
    clearInterval(intervalRef.current);
    clearTimeout(timerRef.current);
    try { playerRef.current?.destroy(); } catch {}
    playerRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    if (playerRef.current && videoIdRef.current) {
      try {
        setProgress(
          videoIdRef.current,
          playerRef.current.getCurrentTime(),
          playerRef.current.getDuration()
        );
      } catch {}
    }
    destroyPlayer();
    onClose();
  }, [destroyPlayer, onClose]);

  useEffect(() => {
    if (!video) return;
    videoIdRef.current = video.id;

    const startPos = Math.floor(getProgress(video.id)?.position ?? 0);
    const containerId = `yt-player-${video.id}`;

    const createPlayer = () => {
      const el = document.getElementById(containerId);
      if (!el) return;

      playerRef.current = new window.YT.Player(el, {
        videoId: video.id,
        width: "100%",
        height: "100%",
        playerVars: {
          start: startPos,
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          color: "white",
          playsinline: 1,
        },
        events: {
          onStateChange: ({ data, target }) => {
            clearInterval(intervalRef.current);
            if (data === 1) {
              intervalRef.current = setInterval(() => {
                try { setProgress(video.id, target.getCurrentTime(), target.getDuration()); } catch {}
              }, 5000);
            } else {
              try { setProgress(video.id, target.getCurrentTime(), target.getDuration()); } catch {}
            }
          },
        },
      });
    };

    // Small delay so Dialog animation finishes and DOM has correct dimensions
    timerRef.current = setTimeout(() => {
      if (window.YT?.Player) {
        createPlayer();
      } else if (!ytApiLoading) {
        ytApiLoading = true;
        window.onYouTubeIframeAPIReady = createPlayer;
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      } else {
        // Script already loading — chain onto existing callback
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prev?.();
          createPlayer();
        };
      }
    }, 120);

    return destroyPlayer;
  }, [video?.id, destroyPlayer]);

  const playerId = video ? `yt-player-${video.id}` : "yt-player-placeholder";

  return (
    <Dialog.Root open={!!video} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 pointer-events-none focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-4xl pointer-events-auto">
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-text-secondary hover:text-white transition-colors p-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* YT API replaces the inner div with the iframe */}
            <div className="aspect-video w-full bg-black rounded-sm overflow-hidden [&_iframe]:w-full [&_iframe]:h-full">
              <div id={playerId} className="w-full h-full" />
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
