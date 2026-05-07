const STORAGE_KEY = "hm_watch_v1";

export interface WatchEntry {
  position: number;
  duration: number;
  updatedAt: string;
  completed: boolean;
}

type WatchHistory = Record<string, WatchEntry>;

function read(): WatchHistory {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function write(data: WatchHistory) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProgress(videoId: string): WatchEntry | null {
  return read()[videoId] ?? null;
}

export function setProgress(videoId: string, position: number, duration: number) {
  const history = read();
  history[videoId] = {
    position,
    duration,
    updatedAt: new Date().toISOString(),
    completed: duration > 0 && position / duration > 0.9,
  };
  write(history);
}

export function getAllProgress(): WatchHistory {
  return read();
}

export function clearProgress(videoId: string) {
  const history = read();
  delete history[videoId];
  write(history);
}
