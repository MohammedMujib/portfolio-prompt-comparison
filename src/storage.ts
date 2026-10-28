export type StorageError = "unavailable" | "corrupt";

export type ReadResult<T> =
  | { ok: true; value: T | null }
  | { ok: false; error: StorageError };

export function readStorage<T>(
  key: string,
  guard: (value: unknown) => value is T,
): ReadResult<T> {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return { ok: true, value: null };
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: false, error: "corrupt" };
    }
    if (!guard(parsed)) return { ok: false, error: "corrupt" };
    return { ok: true, value: parsed };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

export function writeStorage(key: string, value: unknown): StorageError | null {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return null;
  } catch {
    return "unavailable";
  }
}

export function removeStorage(key: string): StorageError | null {
  try {
    localStorage.removeItem(key);
    return null;
  } catch {
    return "unavailable";
  }
}

export const storageKeys = {
  lang: "portfolio.lang.v1",
  drafts: "portfolio.promptDrafts.v1",
  history: "portfolio.promptHistory.v1",
  issues: "portfolio.issueLog.v1",
} as const;
