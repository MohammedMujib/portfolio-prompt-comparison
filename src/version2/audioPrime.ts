import { publicUrl } from "../publicUrl";

/** One boot track and one theme track, started from the Version 2 click. */
export type PrimeResult = "playing" | "blocked";

export type V2AudioSession = {
  boot: HTMLAudioElement;
  theme: HTMLAudioElement;
  playPromise: Promise<PrimeResult>;
  createdAt: number;
  blocked: boolean;
  disposed: boolean;
};

declare global {
  interface Window {
    __v2AudioPrime?: V2AudioSession;
  }
}

const DEFAULT_VOLUME = 0.35;

function readVolume() {
  try {
    const value = Number(localStorage.getItem("ma-volume"));
    if (!Number.isFinite(value) || value < 0 || value > 1) return DEFAULT_VOLUME;
    return value;
  } catch {
    return DEFAULT_VOLUME;
  }
}

function silence(audio: HTMLAudioElement) {
  audio.onended = null;
  audio.onerror = null;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    /* The element may not have metadata yet. */
  }
  audio.removeAttribute("src");
  audio.load();
}

export function stopVersion2Audio() {
  const session = window.__v2AudioPrime;
  if (!session || session.disposed) return;
  session.disposed = true;
  silence(session.boot);
  silence(session.theme);
  delete window.__v2AudioPrime;
}

export function primeVersion2Audio() {
  stopVersion2Audio();
  const volume = readVolume();
  const boot = new Audio(publicUrl("/local-strong/assets/ps3-startup.mp3"));
  const theme = new Audio(publicUrl("/local-strong/assets/zombies-theme.mp3"));
  boot.preload = "auto";
  theme.preload = "auto";
  boot.loop = false;
  theme.loop = true;
  boot.volume = volume;
  theme.volume = 0;
  const session: V2AudioSession = {
    boot,
    theme,
    playPromise: Promise.resolve("blocked"),
    createdAt: Date.now(),
    blocked: false,
    disposed: false,
  };
  window.__v2AudioPrime = session;
  session.playPromise = boot
    .play()
    .then(() => "playing" as const)
    .catch(() => {
      session.blocked = true;
      return "blocked" as const;
    });
}
