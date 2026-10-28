import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import weakPrompt from "../../01-WEAK-PROMPT.txt?raw";
import strongPrompt from "../../02-STRONG-PROMPT.md?raw";
import { useLang, type Lang } from "../i18n";
import { publicUrl } from "../publicUrl";
import { readStorage, removeStorage, storageKeys, writeStorage, type StorageError } from "../storage";
import { observations, stages } from "./observations";
import {
  createId,
  isDrafts,
  isIssueList,
  isNoteList,
  type Drafts,
  type IssueEntry,
  type NoteEntry,
  type VersionId,
} from "./records";
import "./compare.css";

const presets = [360, 768, 1440] as const;
type Preset = (typeof presets)[number];
const frameHeight = 780;

const text = {
  ar: {
    title: "مقارنة الإصدارين",
    meta: "مقارنة الإصدارين",
    skip: "تخطي إلى المحتوى",
    disclosure:
      "الإصدار الأول محفوظ كما هو. الإصدار الثاني استُبدل بالموقع المحلي المعتمد بخلفيته السينمائية وصوته ومقدمة PS3 الاختيارية. المعاينة هنا صامتة ودون مقدمة؛ افتح الإصدار الثاني للتجربة الكاملة. ليست كل الظروف متطابقة.",
    contamination:
      "البرومبت الضعيف عام: يطلب الموقع من السي في ولا يحدد هوية بصرية ولا تنظيمًا ولا تفاصيل تفاعل. سياق بناء النسخة السابقة موثق في الأرشيف. استبدال الإصدار القوي لا يمثل تجربة عمياء مستقلة.",
    noWinner: "لا درجات رقمية ولا فائز محدد سلفًا.",
    presets: "عرض الإطار بالبكسل",
    presetHint: "360 بكسل إطار ضيق، و768 إطار متوسط، و1440 إطار عريض.",
    layoutStacked: "ترتيب الصفحة: عمودي، لأن نافذة المقارنة ضيقة.",
    layoutSide: "ترتيب الصفحة: جنبًا إلى جنب، لأن نافذة المقارنة عريضة.",
    both: "عرض الإطارين معًا",
    openV1: "افتح الإصدار الأول في الصفحة كاملة",
    openV2: "افتح الإصدار الثاني في الصفحة كاملة",
    frameV1: "Version 1 — Weak Prompt. الإصدار الأول — برومبت ضعيف",
    frameV2: "Version 2 — Strong Prompt. الإصدار الثاني — برومبت قوي",
    prompts: "البرومبتات المعتمدة",
    promptsLead: "البرومبت الضعيف محفوظ كما هو. البرومبت القوي وصف مجمع لمتطلبات النسخة المحلية؛ محادثة توليدها الأصلية غير مرفقة. الملاحظات لا تعيد بناء الموقع.",
    original: "النص الأصلي",
    copy: "نسخ البرومبت",
    copied: "تم النسخ",
    copyFailed: "تعذر النسخ",
    note: "ملاحظة على البرومبت",
    save: "حفظ الملاحظة",
    saved: "حُفظت الملاحظة في هذا المتصفح",
    emptyNote: "اكتب ملاحظة قبل الحفظ",
    noteHint: "حفظ الملاحظة لا يولّد موقعًا جديدًا.",
    history: "سجل الملاحظات",
    historyEmpty: "لا ملاحظات محفوظة. لا توجد تكرارات مخترعة هنا.",
    export: "تصدير JSON",
    clear: "مسح البيانات المحفوظة",
    storageCorrupt: "تعذرت قراءة البيانات المحفوظة لأنها تالفة. الصفحة تعمل، ويمكن مسح المفاتيح والمحاولة من جديد.",
    storageUnavailable: "التخزين المحلي غير متاح. الملاحظات قد تبقى ظاهرة في هذه الجلسة فقط.",
    observations: "ملاحظات مبنية على الدليل",
    v1: "الإصدار الأول — برومبت ضعيف",
    v2: "الإصدار الثاني — برومبت قوي",
    browser: "فحص المتصفح",
    stages: "مراحل العمل",
    log: "سجل مشكلات الاختبار اليدوي",
    logLead: "أضف مشكلة حقيقية. الحقول الفارغة لإعادة الاختبار تبقى «لم يُختبر». لا تُملأ الجلسة بنتائج مخترعة.",
    issue: "المشكلة",
    impact: "الأثر",
    fix: "الإصلاح",
    retest: "إعادة الاختبار",
    add: "إضافة إلى السجل",
    logEmpty: "السجل فارغ. لم تُسجَّل جلسة اختبار عمياء مكتملة.",
    notTested: "لم يُختبر",
    notRecorded: "غير مسجّل",
    required: "المشكلة والأثر مطلوبان",
    langLabel: "لغة صفحة المقارنة والإصدار الثاني",
    arabic: "العربية",
    english: "English",
    version1: "الإصدار الأول",
    version2: "الإصدار الثاني",
  },
  en: {
    title: "Compare the two versions",
    meta: "Compare the two versions",
    skip: "Skip to content",
    disclosure:
      "Version 1 is preserved. Version 2 is now the supplied local cinematic portfolio, including its optional PS3 intro and audio. This preview is silent and skips the intro; open Version 2 for the complete experience. Conditions are not identical.",
    contamination:
      "The weak prompt is general: it asks for a site from the CV and does not set a visual identity, content structure, or interaction detail. The earlier build history is archived. Replacing the strong version does not create an independent blind experiment.",
    noWinner: "There are no numeric scores and no predetermined winner.",
    presets: "Frame width in pixels",
    presetHint: "360px is a narrow frame, 768px is a medium frame, and 1440px is a wide frame.",
    layoutStacked: "Page arrangement: stacked, because the comparison window is narrow.",
    layoutSide: "Page arrangement: side by side, because the comparison window is wide.",
    both: "Both frames are",
    openV1: "Open Version 1 full page",
    openV2: "Open Version 2 full page",
    frameV1: "Version 1 — Weak Prompt. الإصدار الأول — برومبت ضعيف",
    frameV2: "Version 2 — Strong Prompt. الإصدار الثاني — برومبت قوي",
    prompts: "Current prompts",
    promptsLead:
      "The weak prompt is unchanged. The strong brief consolidates the local version requirements; its original generation transcript was not supplied. Notes do not rebuild the site.",
    original: "Original text",
    copy: "Copy prompt",
    copied: "Copied",
    copyFailed: "Copy failed",
    note: "Prompt note",
    save: "Save note",
    saved: "The note was saved in this browser",
    emptyNote: "Write a note before saving",
    noteHint: "Saving a note does not generate a new site.",
    history: "Note history",
    historyEmpty: "No saved notes. Nothing here is an invented iteration.",
    export: "Export JSON",
    clear: "Clear saved data",
    storageCorrupt:
      "Saved data could not be read because it is corrupt. The page still works. You can clear the keys and try again.",
    storageUnavailable:
      "Local storage is unavailable. Notes may stay visible only for this session.",
    observations: "Evidence-based observations",
    v1: "Version 1 — Weak Prompt",
    v2: "Version 2 — Strong Prompt",
    browser: "Browser check",
    stages: "Working stages",
    log: "Manual test issue log",
    logLead:
      "Add a real issue. An empty retest stays “Not tested”. This log is not filled with invented results.",
    issue: "Issue",
    impact: "Impact",
    fix: "Fix",
    retest: "Retest",
    add: "Add to the log",
    logEmpty: "The log is empty. No completed blind-test session was recorded.",
    notTested: "Not tested",
    notRecorded: "Not recorded",
    required: "Issue and impact are required",
    langLabel: "Language for this page and Version 2",
    arabic: "العربية",
    english: "English",
    version1: "Version 1",
    version2: "Version 2",
  },
} as const;

const promptLabel: Record<Lang, Record<VersionId, string>> = {
  ar: { "1": "برومبت الإصدار الأول", "2": "برومبت الإصدار الثاني" },
  en: { "1": "Version 1 prompt", "2": "Version 2 prompt" },
};

function storageMessage(error: StorageError, lang: Lang) {
  return error === "corrupt" ? text[lang].storageCorrupt : text[lang].storageUnavailable;
}

export function ComparePage() {
  const { lang, setLang } = useLang();
  const ui = text[lang];
  const stageRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<Preset>(360);
  const [stacked, setStacked] = useState(false);
  const [scale, setScale] = useState(1);
  const [drafts, setDrafts] = useState<Drafts>({ "1": weakPrompt, "2": strongPrompt });
  const [history, setHistory] = useState<NoteEntry[]>([]);
  const [issues, setIssues] = useState<IssueEntry[]>([]);
  const [storageError, setStorageError] = useState<StorageError | null>(null);
  const [copyState, setCopyState] = useState<Record<VersionId, "" | "copied" | "failed">>({
    "1": "",
    "2": "",
  });
  const [noteCode, setNoteCode] = useState<"" | "saved" | "empty" | "corrupt" | "unavailable">("");
  const [form, setForm] = useState({ issue: "", impact: "", fix: "", retest: "" });
  const [formCode, setFormCode] = useState<"" | "required">("");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = ui.meta;
  }, [lang, ui.meta]);

  useEffect(() => {
    const draftRead = readStorage(storageKeys.drafts, isDrafts);
    const historyRead = readStorage(storageKeys.history, isNoteList);
    const issueRead = readStorage(storageKeys.issues, isIssueList);
    const failed = [draftRead, historyRead, issueRead].find((item) => !item.ok);
    if (failed && !failed.ok) setStorageError(failed.error);
    if (draftRead.ok && draftRead.value) setDrafts(draftRead.value);
    if (historyRead.ok && historyRead.value) setHistory(historyRead.value);
    if (issueRead.ok && issueRead.value) setIssues(issueRead.value);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 800px)");
    const apply = () => setStacked(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () => {
      const columns = stacked ? 1 : 2;
      const gap = 16;
      const natural = preset * columns + gap * (columns - 1);
      const available = node.clientWidth;
      setScale(available > 0 ? Math.min(1, available / natural) : 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [preset, stacked]);

  const columns = stacked ? 1 : 2;
  const gap = 16;
  const naturalWidth = preset * columns + gap * (columns - 1);
  const naturalHeight = stacked ? frameHeight * 2 + gap : frameHeight;

  const rememberError = (error: StorageError | null) => {
    if (error) setStorageError(error);
  };

  const saveNote = (version: VersionId) => {
    const note = drafts[version];
    if (!note.trim()) {
      setNoteCode("empty");
      return;
    }
    const entry: NoteEntry = {
      id: createId(),
      version,
      text: note,
      savedAt: new Date().toISOString(),
    };
    const next = [entry, ...history];
    setHistory(next);
    const historyError = writeStorage(storageKeys.history, next);
    const draftError = writeStorage(storageKeys.drafts, drafts);
    const error = historyError ?? draftError;
    if (error) {
      setStorageError(error);
      setNoteCode(error);
      return;
    }
    setNoteCode("saved");
  };

  const copyPrompt = async (version: VersionId, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState((current) => ({ ...current, [version]: "copied" }));
    } catch {
      setCopyState((current) => ({ ...current, [version]: "failed" }));
    }
  };

  const exportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      drafts,
      history,
      issues,
      storageError,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompt-notes.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearSaved = () => {
    rememberError(removeStorage(storageKeys.drafts));
    rememberError(removeStorage(storageKeys.history));
    rememberError(removeStorage(storageKeys.issues));
    setDrafts({ "1": weakPrompt, "2": strongPrompt });
    setHistory([]);
    setIssues([]);
    setStorageError(null);
  };

  const addIssue = (event: FormEvent) => {
    event.preventDefault();
    if (!form.issue.trim() || !form.impact.trim()) {
      setFormCode("required");
      return;
    }
    const entry: IssueEntry = {
      id: createId(),
      issue: form.issue,
      impact: form.impact,
      fix: form.fix,
      retest: form.retest,
      savedAt: new Date().toISOString(),
    };
    const next = [entry, ...issues];
    setIssues(next);
    rememberError(writeStorage(storageKeys.issues, next));
    setForm({ issue: "", impact: "", fix: "", retest: "" });
    setFormCode("");
  };

  return (
    <div className="compare-page">
      <a className="compare-skip" href="#content">
        {ui.skip}
      </a>
      <main id="content" tabIndex={-1}>
        <header className="compare-intro">
          <div className="compare-lang" role="group" aria-label={ui.langLabel}>
            <button type="button" aria-pressed={lang === "ar"} onClick={() => setLang("ar")}>
              {ui.arabic}
            </button>
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              {ui.english}
            </button>
          </div>
          <h1>{ui.title}</h1>
          <p className="compare-alert">{ui.disclosure}</p>
          <p className="compare-alert">{ui.contamination}</p>
          <p>{ui.noWinner}</p>
        </header>

        <section className="compare-block" aria-labelledby="frames-title">
          <h2 id="frames-title">{ui.presets}</h2>
          <p>{ui.presetHint}</p>
          <div role="group" aria-label={ui.presets} className="compare-presets">
            {presets.map((width) => (
              <button
                key={width}
                type="button"
                aria-pressed={preset === width}
                onClick={() => setPreset(width)}
              >
                {width}px
              </button>
            ))}
          </div>
          <p>{stacked ? ui.layoutStacked : ui.layoutSide}</p>
          <p>
            {ui.both}: {preset}px
          </p>
          <div className={stacked ? "compare-links is-stacked" : "compare-links"}>
            <a href={publicUrl("/version-1")}>{ui.openV1}</a>
            <Link to="/version-2">{ui.openV2}</Link>
          </div>
          <div ref={stageRef} className="compare-stage">
            <div className="compare-scale" style={{ width: naturalWidth * scale, height: naturalHeight * scale }}>
              <div
                className={stacked ? "compare-pair is-stacked" : "compare-pair"}
                style={{ width: naturalWidth, transform: `scale(${scale})`, gap }}
              >
                <iframe title={ui.frameV1} src={publicUrl("/version-1") + "?embed=1"} style={{ width: preset, height: frameHeight }} />
                <iframe title={ui.frameV2} src={publicUrl("/version-2") + "?embed=1"} style={{ width: preset, height: frameHeight }} />
              </div>
            </div>
          </div>
        </section>

        <section className="compare-block" aria-labelledby="prompts-title">
          <h2 id="prompts-title">{ui.prompts}</h2>
          <p>{ui.promptsLead}</p>
          {(["1", "2"] as const).map((version) => {
            const original = version === "1" ? weakPrompt : strongPrompt;
            return (
              <article key={version} className="compare-card">
                <h3>{promptLabel[lang][version]}</h3>
                <p>{ui.original}</p>
                <pre>{original}</pre>
                <button type="button" onClick={() => void copyPrompt(version, original)}>
                  {ui.copy}
                </button>
                <p aria-live="polite">
                  {copyState[version] === "copied"
                    ? ui.copied
                    : copyState[version] === "failed"
                      ? ui.copyFailed
                      : ""}
                </p>
                <label htmlFor={`note-${version}`}>{ui.note}</label>
                <textarea
                  id={`note-${version}`}
                  value={drafts[version]}
                  onChange={(event) =>
                    setDrafts((current) => ({ ...current, [version]: event.target.value }))
                  }
                />
                <p>{ui.noteHint}</p>
                <button type="button" onClick={() => saveNote(version)}>
                  {ui.save}
                </button>
              </article>
            );
          })}
          <p aria-live="polite">
            {noteCode === "saved"
              ? ui.saved
              : noteCode === "empty"
                ? ui.emptyNote
                : noteCode === "corrupt" || noteCode === "unavailable"
                  ? storageMessage(noteCode, lang)
                  : ""}
          </p>
        </section>

        <section className="compare-block" aria-labelledby="history-title">
          <h2 id="history-title">{ui.history}</h2>
          {storageError ? <p className="compare-alert">{storageMessage(storageError, lang)}</p> : null}
          {history.length === 0 ? <p>{ui.historyEmpty}</p> : null}
          <ol className="compare-history">
            {history.map((entry) => (
              <li key={entry.id}>
                <p>
                  <time dateTime={entry.savedAt}>{new Date(entry.savedAt).toLocaleString(lang)}</time>
                  {" · "}
                  {entry.version === "1" ? ui.version1 : ui.version2}
                </p>
                <pre>{entry.text}</pre>
              </li>
            ))}
          </ol>
          <div className="compare-row">
            <button type="button" onClick={exportJson}>
              {ui.export}
            </button>
            <button type="button" onClick={clearSaved}>
              {ui.clear}
            </button>
          </div>
        </section>

        <section className="compare-block" aria-labelledby="observations-title">
          <h2 id="observations-title">{ui.observations}</h2>
          <div className="compare-table">
            {observations.map((item) => (
              <article key={item.id}>
                <h3>{item.area[lang]}</h3>
                <p>
                  <strong>{ui.v1}: </strong>
                  {item.v1[lang]}
                </p>
                <p>
                  <strong>{ui.v2}: </strong>
                  {item.v2[lang]}
                </p>
                <p>
                  <strong>{ui.browser}: </strong>
                  {item.browser[lang]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="compare-block" aria-labelledby="stages-title">
          <h2 id="stages-title">{ui.stages}</h2>
          {stages.map((stage) => (
            <article key={stage.id} className="compare-card">
              <h3>{stage.title[lang]}</h3>
              <p>{stage.body[lang]}</p>
            </article>
          ))}
        </section>

        <section className="compare-block" aria-labelledby="log-title">
          <h2 id="log-title">{ui.log}</h2>
          <p>{ui.logLead}</p>
          <form onSubmit={addIssue} className="compare-form">
            <label>
              {ui.issue}
              <input
                value={form.issue}
                onChange={(event) => setForm({ ...form, issue: event.target.value })}
              />
            </label>
            <label>
              {ui.impact}
              <input
                value={form.impact}
                onChange={(event) => setForm({ ...form, impact: event.target.value })}
              />
            </label>
            <label>
              {ui.fix}
              <textarea
                value={form.fix}
                onChange={(event) => setForm({ ...form, fix: event.target.value })}
              />
            </label>
            <label>
              {ui.retest}
              <textarea
                value={form.retest}
                onChange={(event) => setForm({ ...form, retest: event.target.value })}
              />
            </label>
            <button type="submit">{ui.add}</button>
            <p aria-live="polite">{formCode === "required" ? ui.required : ""}</p>
          </form>
          {issues.length === 0 ? <p>{ui.logEmpty}</p> : null}
          <ol className="compare-history">
            {issues.map((entry) => (
              <li key={entry.id}>
                <p>
                  <time dateTime={entry.savedAt}>{new Date(entry.savedAt).toLocaleString(lang)}</time>
                </p>
                <p>
                  {ui.issue}: {entry.issue}
                </p>
                <p>
                  {ui.impact}: {entry.impact}
                </p>
                <p>
                  {ui.fix}: {entry.fix.trim() ? entry.fix : ui.notRecorded}
                </p>
                <p>
                  {ui.retest}: {entry.retest.trim() ? entry.retest : ui.notTested}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
