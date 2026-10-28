import { useEffect, useRef } from "react";
import type { Lang } from "../i18n";
import type { copy } from "./content";

type BootCopy = (typeof copy)["ar"];

export function BootGate({
  phase,
  lang,
  text,
  setLang,
  probed,
  onSound,
  onSilent,
  onSkip,
}: {
  phase: "gate" | "cinematic";
  lang: Lang;
  text: BootCopy;
  setLang: (lang: Lang) => void;
  probed: boolean;
  onSound: () => void;
  onSilent: () => void;
  onSkip: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = panelRef.current;
    const items = () =>
      [...(root?.querySelectorAll<HTMLElement>("button, a, input") ?? [])].filter(
        (item) => !item.hasAttribute("disabled"),
      );
    items()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onSkip();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = items();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onSkip, phase]);

  return (
    <div
      ref={panelRef}
      className={phase === "cinematic" ? "v2-boot is-cinematic" : "v2-boot"}
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-title"
    >
      <div className="v2-boot-waves" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="v2-boot-card">
        <p className="v2-kicker">{text.bootKicker}</p>
        <h1 id="boot-title">{phase === "cinematic" ? text.bootRunning : text.bootTitle}</h1>
        {phase === "gate" ? (
          <>
            <p>{text.bootBody}</p>
            <div className="v2-lang" role="group" aria-label={text.langLabel}>
              <button type="button" aria-pressed={lang === "ar"} onClick={() => setLang("ar")}>
                {text.arabic}
              </button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                {text.english}
              </button>
            </div>
            <div className="v2-boot-actions">
              <button type="button" onClick={onSound} disabled={!probed}>
                {text.startSound}
              </button>
              <button type="button" onClick={onSilent}>
                {text.enterSilent}
              </button>
              <button type="button" onClick={onSkip}>
                {text.skipIntro}
              </button>
            </div>
            <p className="v2-audio-note">{probed ? text.notOfficial : text.checkingAudio}</p>
          </>
        ) : (
          <button type="button" onClick={onSkip}>
            {text.skipIntro}
          </button>
        )}
      </div>
    </div>
  );
}
