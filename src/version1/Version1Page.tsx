import { useEffect, useRef, useState } from "react";
import { contacts, courses, projects, sections, skillGroups } from "./content";
import "./version1.css";

/** Version 1. General prompt plus the attached CV. No project images or interview additions. */
export function Version1Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.title = "محمد الدوسري";
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
        تخطي إلى المحتوى
      </a>
      <header className="v1-header">
        <div className="v1-bar">
          <a className="v1-brand" href="#top">
            محمد الدوسري
          </a>
          <button
            ref={menuButton}
            className="v1-menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="v1-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "إغلاق القائمة" : "القائمة"}
          </button>
          <nav className="v1-nav" aria-label="أقسام الصفحة">
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
            aria-label="أقسام الصفحة"
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
          <p className="v1-kicker">خريج علوم حاسب · الرياض</p>
          <h1 id="v1-hero-title">محمد الدوسري</h1>
          <p className="v1-lede">
            خريج علوم حاسب متحمس، لدي أساس في البرمجة وتحليل البيانات وحل المشكلات.
            أستخدم Python وSQL وPower BI، مع خبرة من مشاريع دراسية وتدريب. حريص على
            التعلم والمساهمة في بيئة عمل مهنية.
          </p>
          <div className="v1-actions">
            <a className="v1-button" href="#projects">
              المشاريع
            </a>
            <a className="v1-button v1-button-quiet" href={contacts.cv} download>
              السيرة الذاتية
            </a>
            <a className="v1-button v1-button-quiet" href="#contact">
              التواصل
            </a>
          </div>
        </section>

        <section className="v1-section" id="about" aria-labelledby="about-title">
          <div className="v1-section-head">
            <h2 id="about-title">نبذة</h2>
            <p>كما وردت في السيرة الذاتية، من غير إضافة قصة شخصية.</p>
          </div>
          <div className="v1-panel">
            <p>
              محمد الدوسري، خريج علوم حاسب حديث من الرياض في السعودية. الأساس المذكور
              هو البرمجة وتحليل البيانات وحل المشكلات، عبر مشاريع أكاديمية وتدريب.
            </p>
            <p>اللغتان المذكورتان: العربية والإنجليزية.</p>
          </div>
        </section>

        <section className="v1-section" id="skills" aria-labelledby="skills-title">
          <div className="v1-section-head">
            <h2 id="skills-title">المهارات</h2>
            <p>الأسماء كما في السيرة. لا مستويات ولا نسب، لأنها غير مذكورة هناك.</p>
          </div>
          <div className="v1-skill-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="v1-panel">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="v1-section" id="projects" aria-labelledby="projects-title">
          <div className="v1-section-head">
            <h2 id="projects-title">المشاريع</h2>
            <p>المشاريع الخمسة المذكورة في السيرة، كنص من غير لقطات الشاشة.</p>
          </div>
          <div className="v1-project-grid">
            {projects.map((project) => (
              <article key={project.title} className="v1-panel">
                <h3>{project.title}</h3>
                <p className="v1-meta">{project.tools}</p>
                <p>{project.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v1-section" id="education" aria-labelledby="education-title">
          <div className="v1-section-head">
            <h2 id="education-title">التعليم</h2>
            <p>المؤهل المذكور في السيرة.</p>
          </div>
          <article className="v1-panel">
            <h3>بكالوريوس علوم الحاسب</h3>
            <p>جامعة الأمير سطام بن عبدالعزيز، من 2021 إلى 2025.</p>
          </article>
        </section>

        <section className="v1-section" id="experience" aria-labelledby="experience-title">
          <div className="v1-section-head">
            <h2 id="experience-title">الخبرة</h2>
            <p>السيرة تذكر تدريبًا تعاونيًا، لا وظيفة بأعمال تقنية مفصّلة.</p>
          </div>
          <article className="v1-panel">
            <h3>تدريب تعاوني في بلدية الأفلاج</h3>
            <p>من يونيو 2025 إلى أغسطس 2025.</p>
            <ul>
              <li>تحمل مسؤولية العمل والمهام.</li>
              <li>التعلم الذاتي.</li>
              <li>العمل تحت ضغط الوقت.</li>
            </ul>
          </article>
        </section>

        <section className="v1-section" id="courses" aria-labelledby="courses-title">
          <div className="v1-section-head">
            <h2 id="courses-title">الدورات</h2>
            <p>دورات السيرة مع الجهة والتاريخ والساعات حين تُذكر. ليست شهادات مهنية.</p>
          </div>
          <ol className="v1-courses">
            {courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ol>
        </section>

        <section className="v1-section" id="contact" aria-labelledby="contact-title">
          <div className="v1-section-head">
            <h2 id="contact-title">التواصل</h2>
            <p>وسائل التواصل الموجودة في السيرة. لا يوجد نموذج يزعم إرسال رسالة.</p>
          </div>
          <div className="v1-contact-grid">
            <a className="v1-panel" href={`mailto:${contacts.email}`}>
              <span>البريد</span>
              <strong dir="ltr">{contacts.email}</strong>
            </a>
            <a className="v1-panel" href={contacts.phoneHref}>
              <span>الجوال</span>
              <strong dir="ltr">{contacts.phoneDisplay}</strong>
            </a>
            <a className="v1-panel" href={contacts.linkedin} target="_blank" rel="noreferrer">
              <span>لنكدإن</span>
              <strong>الملف الشخصي، يفتح في علامة جديدة</strong>
            </a>
            <a className="v1-panel" href={contacts.github} target="_blank" rel="noreferrer">
              <span>جيت هاب</span>
              <strong dir="ltr">MohammedMujib</strong>
            </a>
          </div>
          <p className="v1-meta">الرياض، السعودية</p>
        </section>
      </main>

      <footer className="v1-footer">
        <p>محمد الدوسري · الرياض، السعودية</p>
      </footer>
    </div>
  );
}
