/** Local files the visitor can add. Nothing is fetched from the network. */
export const AUDIO_PATHS = {
  boot: "/assets/audio/boot.mp3",
  theme: "/assets/audio/zombies-theme.mp3",
} as const;

const PREFS_KEY = "portfolio.v2.audio";
export const DEFAULT_VOLUME = 0.22;

export type AudioPrefs = { volume: number; muted: boolean };

export function readAudioPrefs(): AudioPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { volume: DEFAULT_VOLUME, muted: false };
    const parsed = JSON.parse(raw) as Partial<AudioPrefs>;
    const volume =
      typeof parsed.volume === "number" ? Math.min(1, Math.max(0, parsed.volume)) : DEFAULT_VOLUME;
    return { volume, muted: parsed.muted === true || volume === 0 };
  } catch {
    return { volume: DEFAULT_VOLUME, muted: false };
  }
}

export function writeAudioPrefs(prefs: AudioPrefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* The control still works for this visit. */
  }
}

export async function localAudioExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) return false;
    const type = response.headers.get("content-type") ?? "";
    return !type.includes("text/html");
  } catch {
    return false;
  }
}
