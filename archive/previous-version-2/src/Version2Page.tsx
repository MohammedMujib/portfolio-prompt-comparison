import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../i18n";
import { Atmosphere } from "./Atmosphere";
import { AUDIO_PATHS } from "./audioConfig";
import { BootGate } from "./BootGate";
import { ProjectDialog } from "./ProjectDialog";
import {
  contacts,
  copy,
  courses,
  filters,
  nav,
  projects,
  skillGroups,
  type FilterId,
} from "./content";
import { useSiteAudio } from "./useSiteAudio";
import "./version2.css";

const INTRO_KEY = "portfolio.v2.introSeen";

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* The gate still closes for this visit. */
  }
}

function forgetIntro() {
  try {
    sessionStorage.removeItem(INTRO_KEY);
  } catch {
    /* Replay still opens now. */
  }
}

export function Version2Page() {
  const { lang, setLang } = useLang();
  const text = copy[lang];
  const [params] = useSearchParams();
  const embed = params.get("embed") === "1";
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [phase, setPhase] = useState<"gate" | "cinematic" | "site">(() =>
    embed || introAlreadySeen() ? "site" : "gate",
  );
  const [filter, setFilter] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const revealFocus = useRef(false);
  const audio = useSiteAudio(!embed);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = text.metaTitle;
  }, [lang, text.metaTitle]);

  useEffect(() => {
    if (phase !== "cinematic") return;
    const delay = reduced ? 500 : 2800;
    const id = window.setTimeout(() => {
      rememberIntro();
      revealFocus.current = true;
      setPhase("site");
    }, delay);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== "site" || !revealFocus.current) return;
    revealFocus.current = false;
    document.getElementById("content")?.focus();
  }, [phase]);

  useEffect(() => {
    if (!menuOpen) return;
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const visible =
    filter === "all" ? projects : projects.filter((project) => project.filter === filter);
  const active = projects.find((project) => project.id === openId) ?? null;

  const followHash = (event: MouseEvent<HTMLAnchorElement>) => {
    const id = event.currentTarget.getAttribute("href")?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    target.tabIndex = -1;
    window.setTimeout(() => target.focus(), 0);
    setMenuOpen(false);
  };

  const finishNow = useCallback(() => {
    rememberIntro();
    revealFocus.current = true;
    setPhase("site");
  }, []);

  const replay = () => {
    audio.stopAll();
    forgetIntro();
    setOpenId(null);
    setMenuOpen(false);
    setPhase("gate");
  };

  const audioDetail = !audio.probed
    ? ""
    : audio.bootMissing && audio.themeMissing
      ? text.bothMissing
      : audio.blocked
        ? text.playbackBlocked
        : audio.themeMissing
          ? text.themeMissing
          : audio.bootMissing
            ? text.bootMissing
            : "";
  const audioShort = !audio.probed
    ? text.checkingAudio
    : audio.bootMissing && audio.themeMissing
      ? text.audioShortBoth
      : audio.blocked
        ? text.audioShortBlocked
        : audio.themeMissing
          ? text.audioShortTheme
          : audio.bootMissing
            ? text.audioShortBoot
            : text.audioOriginal;

  return (
    <div className={phase === "site" ? "v2 is-in" : "v2"} data-phase={phase}>
      <Atmosphere quiet={reduced || embed} />
      <div className="v2-glow" aria-hidden="true" />
      <div className="v2-grain" aria-hidden="true" />
      {embed ? null : (
        <>
          <audio ref={audio.bootRef} src={audio.bootReady ? AUDIO_PATHS.boot : undefined} preload="auto" />
          <audio
            ref={audio.themeRef}
            src={audio.themeReady ? AUDIO_PATHS.theme : undefined}
            preload="none"
          />
        </>
      )}
      {phase !== "site" ? (
        <BootGate
          phase={phase}
          lang={lang}
          text={text}
          setLang={setLang}
          probed={audio.probed}
          onSound={() => {
            audio.startWithSound();
            setPhase("cinematic");
          }}
          onSilent={() => setPhase("cinematic")}
          onSkip={finishNow}
        />
      ) : null}

      <div
        className="v2-shell"
        inert={phase === "site" ? undefined : true}
        aria-hidden={phase === "site" ? undefined : true}
      >
        <a className="v2-skip" href="#content">
          {text.skip}
        </a>
        <header className="v2-float">
          <div className="v2-nav">
            <a className="v2-mark" href="#top" aria-label={text.home}>
              MA
            </a>
            <nav className="v2-links" aria-label={text.navLabel}>
              {nav.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={followHash}>
                  {item[lang]}
                </a>
              ))}
            </nav>
            <div className="v2-nav-tools">
              <div className="v2-lang" role="group" aria-label={text.langLabel}>
                <button type="button" aria-pressed={lang === "ar"} onClick={() => setLang("ar")}>
                  {text.arabic}
                </button>
                <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                  {text.english}
                </button>
              </div>
              <button
                ref={menuButton}
                type="button"
                className="v2-menu-btn"
                aria-expanded={menuOpen}
                aria-controls="v2-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? text.closeMenu : text.menu}
              </button>
            </div>
          </div>
          <div
            id="v2-menu"
            ref={menuPanel}
            className="v2-menu"
            hidden={!menuOpen}
            role="navigation"
            aria-label={text.navLabel}
          >
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={followHash}>
                {item[lang]}
              </a>
            ))}
          </div>
        </header>

        <main id="content" tabIndex={-1}>
          <section className="v2-hero" id="top" aria-labelledby="hero-title">
            <div className="v2-hero-copy">
              <p className="v2-kicker">{text.kicker}</p>
              <h1 id="hero-title">{text.heroTitle}</h1>
              <p className="v2-lede">{text.heroBody}</p>
              <div className="v2-actions">
                <a className="v2-button" href="#projects" onClick={followHash}>
                  {text.ctaProjects}
                </a>
                <a className="v2-button v2-button-ghost" href={contacts.cv} download>
                  {text.ctaCv}
                </a>
                <a className="v2-button v2-button-quiet" href="#contact" onClick={followHash}>
                  {text.ctaContact}
                </a>
              </div>
            </div>
            <div className="v2-art">
              <p className="v2-monogram" aria-hidden="true">
                MA
              </p>
              <svg className="v2-lines" viewBox="0 0 360 150" aria-hidden="true">
                <polyline points="8,110 40,96 70,102 100,70 130,78 160,46 190,60 220,38 250,64 280,42 310,58 350,28" />
                <polyline points="8,128 48,120 90,124 140,100 180,108 230,86 280,98 350,74" />
              </svg>
              <p>{text.portraitNote}</p>
            </div>
          </section>

          <section className="v2-section" id="about" aria-labelledby="about-title">
            <div className="v2-section-head">
              <h2 id="about-title">{text.aboutTitle}</h2>
              <p>{text.aboutLead}</p>
            </div>
            <div className="v2-card v2-about">
              <p>{text.aboutBody}</p>
              <p>{text.aboutPersonality}</p>
            </div>
          </section>

          <section className="v2-section" id="skills" aria-labelledby="skills-title">
            <div className="v2-section-head">
              <h2 id="skills-title">{text.skillsTitle}</h2>
              <p>{text.skillsLead}</p>
            </div>
            <div className="v2-skill-grid">
              {skillGroups.map((group) => (
                <article key={group.title.en} className="v2-card">
                  <h3>{group.title[lang]}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.en}>{item[lang]}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="v2-section" id="projects" aria-labelledby="projects-title">
            <div className="v2-section-head">
              <h2 id="projects-title">{text.projectsTitle}</h2>
              <p>{text.projectsLead}</p>
            </div>
            <p className="v2-note">{text.projectsNote}</p>
            <div className="v2-filters" role="group" aria-label={text.filtersLabel}>
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item[lang]}
                </button>
              ))}
            </div>
            <p aria-live="polite">
              {text.showing}: {visible.length}
            </p>
            <div className="v2-project-grid">
              {visible.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={project.featured ? "v2-project is-featured" : "v2-project"}
                  onClick={() => setOpenId(project.id)}
                >
                  {project.images[0] ? (
                    <span className="v2-project-media">
                      <img
                        src={project.images[0].src}
                        width={project.images[0].width}
                        height={project.images[0].height}
                        alt=""
                        loading="lazy"
                      />
                    </span>
                  ) : (
                    <span className="v2-project-media is-empty" />
                  )}
                  <span className="v2-badges">
                    {project.featured ? <span>{text.featured}</span> : null}
                    <span>{project.images.length > 0 ? text.staticShot : text.noShot}</span>
                  </span>
                  <span className="v2-project-title">{project.title[lang]}</span>
                  <span className="v2-project-summary">{project.summary[lang]}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="v2-section" id="education" aria-labelledby="education-title">
            <div className="v2-section-head">
              <h2 id="education-title">{text.educationTitle}</h2>
              <p>{text.educationLead}</p>
            </div>
            <div className="v2-two">
              <article className="v2-card">
                <h3>{text.degreeTitle}</h3>
                <p>{text.degreeBody}</p>
              </article>
              <article className="v2-card">
                <h3>{text.trainingTitle}</h3>
                <p>{text.trainingBody}</p>
              </article>
            </div>
          </section>

          <section className="v2-section" id="courses" aria-labelledby="courses-title">
            <div className="v2-section-head">
              <h2 id="courses-title">{text.coursesTitle}</h2>
              <p>{text.coursesLead}</p>
            </div>
            <ol className="v2-courses">
              {courses.map((course) => (
                <li key={course.title.en}>
                  <h3>{course.title[lang]}</h3>
                  <p>
                    {course.provider[lang]} · {course.when[lang]} ·{" "}
                    {course.hours ? course.hours[lang] : text.hoursMissing}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="v2-section" id="contact" aria-labelledby="contact-title">
            <div className="v2-section-head">
              <h2 id="contact-title">{text.contactTitle}</h2>
              <p>{text.contactLead}</p>
            </div>
            <div className="v2-contact-grid">
              <a className="v2-card" href={`mailto:${contacts.email}`}>
                <span>{text.email}</span>
                <strong dir="ltr">{contacts.email}</strong>
              </a>
              <a className="v2-card" href={contacts.phoneHref}>
                <span>{text.phone}</span>
                <strong dir="ltr">{contacts.phoneDisplay}</strong>
              </a>
              <a className="v2-card" href={contacts.linkedin} target="_blank" rel="noreferrer">
                <span>{text.linkedin}</span>
                <strong>
                  {text.linkedin} ({text.newTab})
                </strong>
              </a>
              <a className="v2-card" href={contacts.github} target="_blank" rel="noreferrer">
                <span>{text.github}</span>
                <strong>MohammedMujib ({text.newTab})</strong>
              </a>
            </div>
            <p className="v2-location">{text.location}</p>
          </section>
        </main>
        <footer className="v2-footer">
          <p>Mohammed Aldosari · {text.location}</p>
          <p>{text.notOfficial}</p>
          {audioDetail ? <p>{audioDetail}</p> : null}
        </footer>
        {embed ? null : (
          <div className="v2-audio" role="region" aria-label={text.audioLabel}>
            <button type="button" onClick={audio.togglePlay} aria-pressed={audio.playing}>
              {audio.playing ? text.pause : text.play}
            </button>
            <button type="button" onClick={audio.toggleMute} aria-pressed={audio.muted}>
              {audio.muted ? text.unmute : text.mute}
            </button>
            <label>
              {text.volume}
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(audio.volume * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(audio.volume * 100)}
                aria-label={text.volume}
                onChange={(event) => audio.setVolume(Number(event.target.value) / 100)}
              />
            </label>
            <button type="button" onClick={replay}>
              {text.replayIntro}
            </button>
            {audioShort ? (
              <p className="v2-audio-note" aria-live="polite">
                {audioShort}
              </p>
            ) : null}
          </div>
        )}
      </div>
      {active && phase === "site" ? (
        <ProjectDialog project={active} lang={lang} onClose={() => setOpenId(null)} />
      ) : null}
    </div>
  );
}
