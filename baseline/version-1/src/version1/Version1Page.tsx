import { useEffect, useRef, useState } from "react";
import { profileFields, sections } from "./content";
import "./version1.css";

/**
 * Version 1. Built from the one-line brief only.
 * Unknown personal details stay as neutral placeholders.
 */
export function Version1Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.title = "Personal website";
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const firstLink = menuPanel.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="v1">
      <a className="v1-skip" href="#content">
        Skip to content
      </a>
      <header className="v1-header">
        <div className="v1-bar">
          <a className="v1-brand" href="#top">
            Personal site
          </a>
          <button
            ref={menuButton}
            className="v1-menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="v1-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close menu" : "Menu"}
          </button>
          <nav className="v1-nav" aria-label="Sections">
            {sections.map((section) => (
              <a key={section.href} href={section.href}>
                {section.label}
              </a>
            ))}
          </nav>
        </div>
        {menuOpen ? (
          <div
            ref={menuPanel}
            id="v1-menu"
            className="v1-menu"
            role="navigation"
            aria-label="Sections"
          >
            {sections.map((section) => (
              <a key={section.href} href={section.href} onClick={closeMenu}>
                {section.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main id="content" tabIndex={-1}>
        <section className="v1-hero" id="top" aria-labelledby="v1-hero-title">
          <p className="v1-kicker">A modern personal website</p>
          <h1 id="v1-hero-title">Name not provided</h1>
          <p className="v1-lede">
            The request was to build a modern personal website and include
            information about the person. No name, role, biography, projects, or
            contact details were included, so this page keeps those fields empty
            instead of inventing them.
          </p>
          <div className="v1-actions">
            <a className="v1-button" href="#work">
              View work
            </a>
            <a className="v1-button v1-button-quiet" href="#contact">
              Contact
            </a>
          </div>
        </section>

        <section className="v1-section" id="about" aria-labelledby="about-title">
          <div className="v1-section-head">
            <h2 id="about-title">About</h2>
            <p>Facts below are limited to what the request actually contained.</p>
          </div>
          <dl className="v1-facts">
            {profileFields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="v1-section" id="skills" aria-labelledby="skills-title">
          <div className="v1-section-head">
            <h2 id="skills-title">Skills</h2>
            <p>No skills, tools, or proficiency levels were provided.</p>
          </div>
          <div className="v1-empty">
            <h3>Nothing listed yet</h3>
            <p>
              Skill names and levels stay blank. No sample technologies are shown,
              so the page does not imply experience that was never stated.
            </p>
          </div>
        </section>

        <section className="v1-section" id="work" aria-labelledby="work-title">
          <div className="v1-section-head">
            <h2 id="work-title">Work</h2>
            <p>No projects, employers, or case studies were provided.</p>
          </div>
          <div className="v1-empty">
            <h3>No projects to open</h3>
            <p>
              There is no gallery, filter, or project dialog on this version
              because there is no project to show. A placeholder card would look
              like real work.
            </p>
          </div>
        </section>

        <section className="v1-section" id="contact" aria-labelledby="contact-title">
          <div className="v1-section-head">
            <h2 id="contact-title">Contact</h2>
            <p>No email, phone, or profile links were provided.</p>
          </div>
          <div className="v1-empty">
            <h3>No contact channel</h3>
            <p>
              A form is omitted on purpose. Submitting one would suggest a message
              was delivered when there is nowhere to send it.
            </p>
          </div>
        </section>
      </main>

      <footer className="v1-footer">
        <p>Personal details were not part of this request, so none are shown.</p>
      </footer>
    </div>
  );
}
