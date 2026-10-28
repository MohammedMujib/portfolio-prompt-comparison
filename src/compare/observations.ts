import type { Lang } from "../i18n";

export type Observation = {
  id: string;
  area: Record<Lang, string>;
  v1: Record<Lang, string>;
  v2: Record<Lang, string>;
  browser: Record<Lang, string>;
};

export const observations: Observation[] = [
  {
    id: "design",
    area: { ar: "التصميم", en: "Design" },
    v1: {
      ar: "صفحة فاتحة بلون أخضر مزرق. البرومبت لا يطلب هوية المرجع، لذلك لا يستخدم البنفسجي ولا صور المشاريع.",
      en: "A light page with a teal accent. The prompt does not ask for the reference identity, so it does not use the violet system or project images.",
    },
    v2: { ar: "الموقع المحلي الكامل: خلفية زومبي وصورة وضباب وجمر وقائمة داكنة وتفاصيل برتقالية ومقدمة PS3.", en: "The complete local site: zombie background imagery, fog, embers, dark menu, orange accents and a PS3 intro." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "functionality",
    area: { ar: "الوظائف", en: "Functionality" },
    v1: {
      ar: "تنقل بين الأقسام وقائمة للجوال وروابط تواصل وتنزيل السيرة. لا معرض صور ولا تصفية ولا تبديل لغة، لأن البرومبت لا يطلبها.",
      en: "Section navigation, a mobile menu, contact links, and a CV download. No image gallery, filters, or language switch, because the prompt does not ask for them.",
    },
    v2: { ar: "تبديل لغة وأقسام وحوارات مشاريع وتحميل السيرة والتقارير. تشغيل صوت اختياري وإعادة المقدمة في الإصدار الكامل؛ المعاينة صامتة.", en: "Language switching, section navigation, project dialogs, CV and report downloads. Optional sound and intro replay on the full version; silent comparison preview." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "ux",
    area: { ar: "تجربة الاستخدام", en: "UX" },
    v1: {
      ar: "يعرض الاسم والنبذة والتعليم والتدريب والمهارات والمشاريع والدورات والتواصل من السيرة، من غير مستويات مهارات مخترعة.",
      en: "It shows the CV name, summary, education, training, skills, projects, courses, and contact, without invented skill levels.",
    },
    v2: { ar: "واجهة قائمة تفتح النبذة والمشاريع والمهارات والتواصل؛ بوابة دخول بالصوت أو بدونه في الصفحة الكاملة فقط.", en: "Menu navigation opens profile, projects, skills and contact; a sound-or-silent entry gate appears only on the full page." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "responsiveness",
    area: { ar: "التجاوب", en: "Responsiveness" },
    v1: {
      ar: "البطاقات تصير عمودًا واحدًا تحت 720px، وتظهر زر القائمة.",
      en: "Cards become one column below 720px, and the menu button appears.",
    },
    v2: { ar: "تصميم النسخة المحلية يعتمد على قواعد استجابة خاصة به؛ المقارنة تحتفظ بعروض 360 و768 و1440 بكسل.", en: "The local version keeps its responsive CSS; comparison retains true 360, 768 and 1440px frame widths." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "content",
    area: { ar: "المحتوى", en: "Content" },
    v1: {
      ar: "نفس وقائع السيرة: محمد الدوسري، الرياض، خمسة مشاريع، وإحدى عشرة دورة. بلا صور المشاريع وبلا استهداف الدور المذكور في الإجابات الإضافية.",
      en: "The same CV facts: Mohammed Aldosari, Riyadh, five projects, and eleven courses. No project images and no role targeting from the extra answers.",
    },
    v2: { ar: "المحتوى والبيانات الشخصية والتقارير هي ملفات النسخة المحلية المرفقة دون إعادة اختراعها.", en: "Content, profile facts and reports come from the supplied local version." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "completeness",
    area: { ar: "الاكتمال", en: "Completeness" },
    v1: {
      ar: "البرومبت عام ويطلب أقسام السي في. الصفحة تعرضها من غير تنظيم بصري أو تفاعلي مفروض.",
      en: "The prompt is general and asks for the CV sections. The page shows them without a prescribed visual system or interaction pattern.",
    },
    v2: { ar: "الموقع المحلي يتضمن نبذة ومهارات وخمسة مشاريع ودورات وتواصل وسيرة ذاتية وتقارير، دون افتراض تطابقه مع كل شرط في البرومبت القديم.", en: "The local site includes profile, skills, five projects, courses, contact, CV and reports; this does not imply every old brief requirement is implemented." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
  {
    id: "accessibility",
    area: { ar: "إمكانية الوصول", en: "Accessibility" },
    v1: {
      ar: "رابط تخطّي، وترتيب عناوين، وتركيز ظاهر، والقائمة تُغلق بـ Escape. الصفحة عربية واتجاهها من اليمين، والبريد والهاتف من اليسار.",
      en: "Skip link, heading order, visible focus, and a menu that closes with Escape. The page is Arabic and right to left, while email and phone stay left to right.",
    },
    v2: { ar: "المصدر يتضمن رابط تخطٍّ وحوارًا وتسميات وتحكمًا بالصوت وتقليل الحركة. تحتاج التجربة الجديدة مراجعة يدوية مستقلة.", en: "Source includes a skip link, dialog, labels, audio controls and reduced motion. The new integration needs its own manual accessibility review." },
    browser: { ar: "نتائج الفحص القديمة مؤرشفة وتخص الإصدار السابق. لم تُعتمد كفحص لهذه النسخة المحلية الجديدة؛ راجع verification.md.", en: "Previous browser results are archived and refer to the old version, not the replacement. See verification.md for current checks." },
  },
];

export const stages: {
  id: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}[] = [
  {
    id: "reveal",
    title: { ar: "Reveal Yourself", en: "Reveal Yourself" },
    body: {
      ar: "البرومبت الضعيف الحالي يطلب موقعًا حديثًا من السي في المرفقة، من غير هوية بصرية أو تنظيم أو تفاصيل تفاعل. لقطة المصدر الأولى في 2026-10-25T20:02:42+03:00 كانت قبل هذا التصحيح وما زالت في baseline/version-1. هذه ليست تجربة عمياء مستقلة.",
      en: "The current weak prompt asks for a modern site from the attached CV, without a visual identity, structure, or interaction detail. The first source snapshot at 2026-10-25T20:02:42+03:00 predates this correction and remains in baseline/version-1. This is not an independent blind experiment.",
    },
  },
  {
    id: "real",
    title: { ar: "Make It Real", en: "Make It Real" },
    body: {
      ar: "الإصدار الثاني الحالي نسخة من المشروع المحلي المرفق، استُبدلت بها النسخة السابقة. تعديل الملاحظات في هذه الصفحة لا يعيد بناء الموقع.",
      en: "Current Version 2 is a copy of the supplied local portfolio, replacing the earlier implementation. Editing notes on this page does not rebuild the site.",
    },
  },
  {
    id: "blind",
    title: { ar: "Blind Test", en: "Blind Test" },
    body: {
      ar: "لم تُنفَّذ جلسة مراجعة عمياء منفصلة أثناء البناء. سجل المشكلات يدوي ويبدأ فارغًا. أي بند لم يُفحص في المتصفح يبقى «لم يُختبر».",
      en: "No separate blinded review session was run during the build. The issue log is manual and starts empty. Any item that was not exercised in the browser stays “Not tested”.",
    },
  },
  {
    id: "unforgettable",
    title: { ar: "Make It Unforgettable", en: "Make It Unforgettable" },
    body: {
      ar: "الإصدار الثاني يفتح بقائمة داكنة أصلية، وحروف MA، ومعارض الأدلة، ومقدمة يمكن تجاوزها. يتضمن مقدمة PS3 من الملف المحلي؛ الموقع شخصي ولا يشير إلى انتماء رسمي. لا درجة ولا فائز.",
      en: "Version 2 opens into an original dark menu, with the MA monogram, evidence galleries, and an intro that can be skipped. It preserves the local PS3 intro; it is a personal site with no official affiliation. No score or winner.",
    },
  },
];
