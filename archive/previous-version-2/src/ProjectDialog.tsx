import { useEffect, useId, useState } from "react";
import type { Lang } from "../i18n";
import { copy, type Project } from "./content";
import { useDialog } from "./useDialog";

export function ProjectDialog({
  project,
  lang,
  onClose,
}: {
  project: Project;
  lang: Lang;
  onClose: () => void;
}) {
  const text = copy[lang];
  const titleId = useId();
  const panelRef = useDialog(true, onClose);
  const [index, setIndex] = useState(0);
  const [fullSize, setFullSize] = useState(false);
  const image = project.images[index];
  const count = project.images.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (count < 2) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % count);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + count) % count);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [count]);

  return (
    <div
      className="v2-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="v2-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="v2-dialog-bar">
          <p className="v2-kicker">{text.dialogLabel}</p>
          <button type="button" className="v2-text-button" onClick={onClose}>
            {text.close}
          </button>
        </div>
        <h2 id={titleId}>{project.title[lang]}</h2>
        <p className="v2-muted">{project.summary[lang]}</p>

        <section>
          <h3>{text.purpose}</h3>
          <p>{project.purpose[lang]}</p>
        </section>
        <section>
          <h3>{text.tools}</h3>
          {project.tools.length === 0 ? (
            <p>{text.notProvided}</p>
          ) : (
            <ul className="v2-inline">
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>{text.contributions}</h3>
          <ul>
            {project.contributions.map((item) => (
              <li key={item.en}>{item[lang]}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>{text.evidence}</h3>
          <ul>
            {project.evidence.map((item) => (
              <li key={item.en}>{item[lang]}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>{text.missing}</h3>
          <ul>
            {project.missing.map((item) => (
              <li key={item.en}>
                {item[lang]} — {text.notProvided}
              </li>
            ))}
          </ul>
        </section>

        {project.download ? (
          <p>
            <a className="v2-button" href={project.download.href} download>
              {text.downloadReport}
            </a>
          </p>
        ) : null}

        {count > 0 && image ? (
          <section className="v2-gallery" aria-label={text.gallery}>
            <div className="v2-gallery-head">
              <h3>{text.gallery}</h3>
              <p aria-live="polite">
                {text.imageStatus} {index + 1} / {count}. {image.alt[lang]}
              </p>
            </div>
            <div className={fullSize ? "v2-stage is-full" : "v2-stage"}>
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt[lang]}
                loading="eager"
              />
            </div>
            <div className="v2-gallery-actions">
              <button
                type="button"
                onClick={() => setIndex((current) => (current - 1 + count) % count)}
                disabled={count < 2}
              >
                {text.previous}
              </button>
              <button
                type="button"
                onClick={() => setIndex((current) => (current + 1) % count)}
                disabled={count < 2}
              >
                {text.next}
              </button>
              <button
                type="button"
                aria-pressed={fullSize}
                onClick={() => setFullSize((value) => !value)}
              >
                {fullSize ? text.fitWidth : text.fullSize}
              </button>
              <a href={image.src} target="_blank" rel="noreferrer">
                {text.openFile} ({text.newTab})
              </a>
            </div>
            <div className="v2-thumbs">
              {project.images.map((shot, shotIndex) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-current={shotIndex === index ? "true" : undefined}
                  aria-label={shot.alt[lang]}
                  onClick={() => setIndex(shotIndex)}
                >
                  <img
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt=""
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {project.illustration ? (
          <figure className="v2-uml">
            <svg viewBox="0 0 720 280" role="img" aria-label={text.illustration}>
              <title>{text.illustration}</title>
              <rect x="36" y="36" width="170" height="72" rx="12" />
              <rect x="276" y="36" width="170" height="72" rx="12" />
              <rect x="516" y="36" width="170" height="72" rx="12" />
              <rect x="156" y="168" width="170" height="72" rx="12" />
              <rect x="396" y="168" width="170" height="72" rx="12" />
              <path d="M206 72 H276 M446 72 H516 M360 108 V168 M480 108 V140 H481 V168" />
              <text x="121" y="78" textAnchor="middle">
                Actor
              </text>
              <text x="361" y="78" textAnchor="middle">
                Use case
              </text>
              <text x="601" y="78" textAnchor="middle">
                System
              </text>
              <text x="241" y="210" textAnchor="middle">
                Class
              </text>
              <text x="481" y="210" textAnchor="middle">
                Sequence
              </text>
            </svg>
            <figcaption>{text.illustration}</figcaption>
          </figure>
        ) : null}
      </div>
    </div>
  );
}
