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
    v2: {
      ar: "قائمة داكنة بفحم وأسود وبرتقالي جمر ولمسة حمراء، مع ضباب وجمر مرسومين، وبطاقات وقوائم حادة، وحروف MA. ليست واجهة تابعة لسوني أو أكتيفيجن.",
      en: "A dark menu in charcoal, black, ember orange, and a little red, with drawn fog and embers, sharp cards and menus, and an MA monogram. It is not a Sony or Activision interface.",
    },
    browser: {
      ar: "فُحص بصريًا بعد تغيير الهوية: الإصدار الثاني فحمي مع جمر وحروف MA، والإصدار الأول فاتح. لا شعار رسمي ولا صورة الشخص المرجعية.",
      en: "Checked visually after the identity change: Version 2 is charcoal with embers and an MA monogram. Version 1 is light. No official logo and no reference portrait.",
    },
  },
  {
    id: "functionality",
    area: { ar: "الوظائف", en: "Functionality" },
    v1: {
      ar: "تنقل بين الأقسام وقائمة للجوال وروابط تواصل وتنزيل السيرة. لا معرض صور ولا تصفية ولا تبديل لغة، لأن البرومبت لا يطلبها.",
      en: "Section navigation, a mobile menu, contact links, and a CV download. No image gallery, filters, or language switch, because the prompt does not ask for them.",
    },
    v2: {
      ar: "تبديل لغة، تصفية المشاريع، حوار تفاصيل، معرض، وتنزيلات وروابط تواصل. المقدمة تُعرض مرة في الجلسة، والصوت لا يعمل إلا بملفات محلية وبعد الموافقة.",
      en: "Language switch, project filters, a detail dialog, a gallery, and real download and contact links. The intro shows once per session, and audio plays only from local files after consent.",
    },
    browser: {
      ar: "جُرّب تبديل اللغة، وتصفية السلاسل الزمنية، وحوار النفط ومعرضه، وإغلاق Escape مع إعادة التركيز، وحوار بلايستيشن مع عبارة أنه رسم توضيحي، وروابط السيرة والبريد والهاتف.",
      en: "Language switch, the time-series filter, the oil dialog and gallery, Escape with focus return, the PlayStation dialog with its illustration label, and the CV, email, and phone links were used.",
    },
  },
  {
    id: "ux",
    area: { ar: "تجربة الاستخدام", en: "UX" },
    v1: {
      ar: "يعرض الاسم والنبذة والتعليم والتدريب والمهارات والمشاريع والدورات والتواصل من السيرة، من غير مستويات مهارات مخترعة.",
      en: "It shows the CV name, summary, education, training, skills, projects, courses, and contact, without invented skill levels.",
    },
    v2: {
      ar: "كل مشروع يفصل الغرض والأدوات والدليل والنقص. أرقام اللوحات موصوفة كبيانات لا كإنجاز مالي.",
      en: "Each project separates purpose, tools, evidence, and gaps. Dashboard numbers are described as dataset figures, not personal financial results.",
    },
    browser: {
      ar: "قُرئت النصوص في المتصفح. صفحة المقارنة لا تعرض درجة ولا فائزًا.",
      en: "The visible copy was read in the browser. The comparison page shows no score and no winner.",
    },
  },
  {
    id: "responsiveness",
    area: { ar: "التجاوب", en: "Responsiveness" },
    v1: {
      ar: "البطاقات تصير عمودًا واحدًا تحت 720px، وتظهر زر القائمة.",
      en: "Cards become one column below 720px, and the menu button appears.",
    },
    v2: {
      ar: "التخطيط يستهدف 360 و768 و1440: عمود واحد ثم عمودان ثم ثلاثة، مع قائمة تحت 900px.",
      en: "The layout targets 360, 768, and 1440: one column, then two, then three, with a menu below 900px.",
    },
    browser: {
      ar: "لا تمرير أفقي للصفحة عند 360 و768 و1440 في الإصدارين. قائمة الإصدار الثاني ظهرت عند 360 و768. إطارات المقارنة جُربت عند 360 و768 و1440، جنبًا إلى جنب في نافذة عريضة وعموديًا في نافذة 400.",
      en: "No page-level horizontal overflow at 360, 768, or 1440 on either version. Version 2’s menu appeared at 360 and 768. Comparison frames were checked at 360, 768, and 1440: side by side in a wide window and stacked in a 400px window.",
    },
  },
  {
    id: "content",
    area: { ar: "المحتوى", en: "Content" },
    v1: {
      ar: "نفس وقائع السيرة: محمد الدوسري، الرياض، خمسة مشاريع، وإحدى عشرة دورة. بلا صور المشاريع وبلا استهداف الدور المذكور في الإجابات الإضافية.",
      en: "The same CV facts: Mohammed Aldosari, Riyadh, five projects, and eleven courses. No project images and no role targeting from the extra answers.",
    },
    v2: {
      ar: "نفس وقائع السيرة، ويضيف صور المشاريع واللغتين واستهداف علم البيانات وتحليل البيانات ووصف الشخصية. المهارات أسماء فقط، بلا مستويات.",
      en: "The same CV facts, plus project images, both languages, data-science and analyst targeting, and the personality description. Skills are names only, without levels.",
    },
    browser: {
      ar: "الإصدار الأول بقي باسم محمد الدوسري ومشاريعه الخمسة بلا صور. الإصدار الثاني يعرض المهارات بالاسم فقط، مع ثلاث صور والمقدمة. ملفا الصوت أصليان وموضوعان في المشروع، والموقع يصرّح أنهما ليسا تسجيل سوني أو أكتيفيجن.",
      en: "Version 1 still shows Mohammed Aldosari and five projects without images. Version 2 lists skills by name only, with three images and the intro. Both audio files are original and stored in the project, and the site states they are not a Sony or Activision recording.",
    },
  },
  {
    id: "completeness",
    area: { ar: "الاكتمال", en: "Completeness" },
    v1: {
      ar: "البرومبت عام ويطلب أقسام السي في. الصفحة تعرضها من غير تنظيم بصري أو تفاعلي مفروض.",
      en: "The prompt is general and asks for the CV sections. The page shows them without a prescribed visual system or interaction pattern.",
    },
    v2: {
      ar: "يغطي الأقسام المطلوبة. ما لم يرد في المصدر يُكتب «غير متوفر»، مثل دور محمد في نظام تتبع المهام.",
      en: "It covers the requested sections. Anything absent from the source is marked “Not provided”, including Mohammed’s role on the task-tracking system.",
    },
    browser: {
      ar: "الأقسام وتسميات «غير متوفر» ظاهرة. لم تُنفَّذ مراجعة عمياء منفصلة.",
      en: "The sections and “Not provided” labels were visible. No separate blinded review was run.",
    },
  },
  {
    id: "accessibility",
    area: { ar: "إمكانية الوصول", en: "Accessibility" },
    v1: {
      ar: "رابط تخطّي، وترتيب عناوين، وتركيز ظاهر، والقائمة تُغلق بـ Escape. الصفحة عربية واتجاهها من اليمين، والبريد والهاتف من اليسار.",
      en: "Skip link, heading order, visible focus, and a menu that closes with Escape. The page is Arabic and right to left, while email and phone stay left to right.",
    },
    v2: {
      ar: "رابط تخطّي، وتسميات عربية وإنجليزية، وحوار بمصيدة تركيز، ونص بديل للصور. البريد والجوال باتجاه من اليسار.",
      en: "Skip link, Arabic and English labels, a focus-trapped dialog, and image alt text. Email and phone stay left to right.",
    },
    browser: {
      ar: "إغلاق الحوار أعاد التركيز إلى البطاقة. البريد والهاتف باتجاه من اليسار. تقليل الحركة أوقف رسم الخط. تباين الألوان لم يُقس بأداة. تخزين تالف لم يُنفَّذ في المتصفح. صور المعرض كانت تُعلَن كلها حالية، وأُصلح ذلك بعد الفحص.",
      en: "Closing the dialog returned focus to the card. Email and phone computed as left to right. Reduced motion stopped the line drawing. Contrast was not measured with a tool. Corrupt storage was not executed in the browser. Gallery thumbnails all exposed a current state; that was corrected after the check.",
    },
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
      ar: "الإصدار الثاني مبني في Cursor من البرومبت القوي والسيرة والصور وملف التقرير. تعديل الملاحظات في هذه الصفحة لا يعيد بناء الموقع.",
      en: "Version 2 was built in Cursor from the strong prompt, the CV, the images, and the report file. Editing notes on this page does not rebuild the site.",
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
      ar: "الإصدار الثاني يفتح بقائمة داكنة أصلية، وحروف MA، ومعارض الأدلة، ومقدمة يمكن تجاوزها. لا شعارات رسمية ولا درجة ولا فائز.",
      en: "Version 2 opens into an original dark menu, with the MA monogram, evidence galleries, and an intro that can be skipped. There are no official logos, no score, and no winner.",
    },
  },
];
