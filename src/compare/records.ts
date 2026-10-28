export type VersionId = "1" | "2";

export type NoteEntry = {
  id: string;
  version: VersionId;
  text: string;
  savedAt: string;
};

export type IssueEntry = {
  id: string;
  issue: string;
  impact: string;
  fix: string;
  retest: string;
  savedAt: string;
};

export type Drafts = Record<VersionId, string>;

const isVersion = (value: unknown): value is VersionId => value === "1" || value === "2";

export function isDrafts(value: unknown): value is Drafts {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record["1"] === "string" && typeof record["2"] === "string";
}

export function isNoteList(value: unknown): value is NoteEntry[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== "object") return false;
      const note = item as Record<string, unknown>;
      return (
        typeof note.id === "string" &&
        isVersion(note.version) &&
        typeof note.text === "string" &&
        typeof note.savedAt === "string"
      );
    })
  );
}

export function isIssueList(value: unknown): value is IssueEntry[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== "object") return false;
      const issue = item as Record<string, unknown>;
      return (
        typeof issue.id === "string" &&
        typeof issue.issue === "string" &&
        typeof issue.impact === "string" &&
        typeof issue.fix === "string" &&
        typeof issue.retest === "string" &&
        typeof issue.savedAt === "string"
      );
    })
  );
}

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}`;
}
