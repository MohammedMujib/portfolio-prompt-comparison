import type { Lang } from "../i18n";
import { publicUrl } from "../publicUrl";

export type FilterId = "all" | "data" | "timeseries" | "systems";
export type ProjectFilter = Exclude<FilterId, "all">;

export const nav = [
  { id: "about", ar: "نبذة", en: "About" },
  { id: "skills", ar: "المهارات", en: "Skills" },
  { id: "projects", ar: "المشاريع", en: "Projects" },
  { id: "education", ar: "التعليم والتدريب", en: "Education & Training" },
  { id: "courses", ar: "الدورات", en: "Courses" },
  { id: "contact", ar: "التواصل", en: "Contact" },
] as const;

export const filters: { id: FilterId; ar: string; en: string }[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "data", ar: "تحليل البيانات", en: "Data Analysis" },
  { id: "timeseries", ar: "السلاسل الزمنية", en: "Time Series" },
  { id: "systems", ar: "البرمجيات والأنظمة", en: "Software & Systems" },
];

type Text = Record<Lang, string>;

export const copy: Record<
  Lang,
  {
    metaTitle: string;
    skip: string;
    navLabel: string;
    menu: string;
    closeMenu: string;
    langLabel: string;
    arabic: string;
    english: string;
    home: string;
    kicker: string;
    heroTitle: string;
    heroBody: string;
    ctaProjects: string;
    ctaCv: string;
    ctaContact: string;
    portraitNote: string;
    aboutTitle: string;
    aboutLead: string;
    aboutBody: string;
    aboutPersonality: string;
    skillsTitle: string;
    skillsLead: string;
    bootKicker: string;
    bootTitle: string;
    bootBody: string;
    bootRunning: string;
    startSound: string;
    enterSilent: string;
    skipIntro: string;
    replayIntro: string;
    notOfficial: string;
    audioLabel: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    volume: string;
    checkingAudio: string;
    bothMissing: string;
    bootMissing: string;
    themeMissing: string;
    playbackBlocked: string;
    audioShortBoth: string;
    audioShortBoot: string;
    audioShortTheme: string;
    audioShortBlocked: string;
    audioOriginal: string;
    projectsTitle: string;
    projectsLead: string;
    projectsNote: string;
    featured: string;
    staticShot: string;
    noShot: string;
    showing: string;
    filtersLabel: string;
    educationTitle: string;
    educationLead: string;
    degreeTitle: string;
    degreeBody: string;
    trainingTitle: string;
    trainingBody: string;
    coursesTitle: string;
    coursesLead: string;
    hoursMissing: string;
    contactTitle: string;
    contactLead: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
    newTab: string;
    close: string;
    purpose: string;
    tools: string;
    contributions: string;
    evidence: string;
    missing: string;
    notProvided: string;
    gallery: string;
    previous: string;
    next: string;
    imageStatus: string;
    fullSize: string;
    fitWidth: string;
    openFile: string;
    downloadReport: string;
    illustration: string;
    dialogLabel: string;
  }
> = {
  ar: {
    metaTitle: "محمد الدوسري — عالم بيانات",
    skip: "تخطي إلى المحتوى",
    navLabel: "أقسام الصفحة",
    menu: "القائمة",
    closeMenu: "إغلاق القائمة",
    langLabel: "اللغة",
    arabic: "العربية",
    english: "English",
    home: "البداية",
    kicker: "عالم بيانات طموح · الرياض",
    heroTitle: "أحوّل البيانات إلى رؤى ذات معنى",
    heroBody:
      "محمد الدوسري، خريج علوم حاسب في الرياض، يبني هذا الملف كعالم بيانات طموح ويستهدف أيضًا أدوار محلل البيانات. المشاريع المعروضة أكاديمية وتدريبية، وليس تاريخًا وظيفيًا.",
    ctaProjects: "استعرض المشاريع",
    ctaCv: "حمّل السيرة الذاتية",
    ctaContact: "تواصل معي",
    portraitNote: "لا توجد صورة شخصية مرفقة. الحروف MA بديل عن الصورة.",
    aboutTitle: "نبذة",
    aboutLead: "خريج حديث، لا موظف بخبرة طويلة.",
    aboutBody:
      "تصف السيرة الذاتية أساسًا في البرمجة وتحليل البيانات وحل المشكلات، مع استخدام بايثون وSQL وPower BI في مشاريع دراسية وتدريب. اللغتان المذكورتان هما العربية والإنجليزية. لم تُضف قصص شخصية خارج هذا المصدر.",
    aboutPersonality: "المثابرة، والشغف، والالتزام بالتطوير المستمر.",
    skillsTitle: "المهارات",
    skillsLead: "أسماء المهارات والتقنيات كما وردت، من غير مستويات أو نسب.",
    bootKicker: "محمد الدوسري",
    bootTitle: "قبل الدخول إلى القائمة",
    bootBody:
      "مقدمة قصيرة بأجواء تشغيل أصلية، ثم ملفك. المحتوى عن محمد الدوسري ومشاريعه، لا عن لعبة.",
    bootRunning: "جارٍ الدخول إلى القائمة",
    startSound: "ابدأ التجربة مع الصوت / Start with sound",
    enterSilent: "الدخول بدون صوت",
    skipIntro: "تجاوز المقدمة",
    replayIntro: "إعادة المقدمة",
    notOfficial:
      "معالجة بصرية أصلية لموقع محمد الدوسري. ليست تابعة لسوني أو أكتيفيجن، ولا تستبدل الملف بمحتوى لعبة.",
    audioLabel: "الصوت",
    play: "تشغيل",
    pause: "إيقاف مؤقت",
    mute: "كتم الصوت",
    unmute: "إلغاء الكتم",
    volume: "مستوى الصوت",
    checkingAudio: "جارٍ التحقق من ملفات الصوت المحلية.",
    bothMissing:
      "لا يوجد ملف صوت في الأصول. الموسيقى تنتظر public/assets/audio/zombies-theme.mp3، وصوت التشغيل ينتظر public/assets/audio/boot.mp3. لم يُشغَّل بديل.",
    bootMissing:
      "صوت التشغيل غير موجود في public/assets/audio/boot.mp3، ولم يُشغَّل ملف آخر مكانه.",
    themeMissing:
      "موسيقى الخلفية تنتظر إضافة public/assets/audio/zombies-theme.mp3. لا تُشغَّل مقطوعة بديلة.",
    playbackBlocked: "رفض المتصفح التشغيل. الموقع يعمل، ويمكن المحاولة من زر الصوت.",
    audioShortBoth: "الصوت متوقف لأن الملفات المحلية غير موجودة.",
    audioShortBoot: "صوت التشغيل غير موجود.",
    audioShortTheme: "موسيقى الخلفية غير موجودة.",
    audioShortBlocked: "المتصفح رفض التشغيل.",
    audioOriginal: "صوت أصلي صُنع لهذا الموقع، وليس تسجيل سوني أو أكتيفيجن.",
    projectsTitle: "المشاريع",
    projectsLead: "خمسة مشاريع من السيرة. الثلاثة البيانية هي الأعمال البارزة.",
    projectsNote:
      "لقطات اللوحات أرقام من مجموعات البيانات، وليست أرباحًا أو وفورات تخص محمد. الصور ثابتة وليست لوحات مباشرة.",
    featured: "بارز",
    staticShot: "لقطة ثابتة",
    noShot: "لا توجد لقطة",
    showing: "المعروض",
    filtersLabel: "تصفية المشاريع",
    educationTitle: "التعليم والتدريب",
    educationLead: "ما ورد في السيرة فقط، دون مهام تقنية مخترعة.",
    degreeTitle: "بكالوريوس علوم الحاسب",
    degreeBody: "جامعة الأمير سطام بن عبدالعزيز، 2021–2025.",
    trainingTitle: "تدريب تعاوني في بلدية الأفلاج",
    trainingBody: "يونيو–أغسطس 2025. المهارات المذكورة: تحمل المسؤولية، والتعلم الذاتي، والعمل تحت ضغط الوقت.",
    coursesTitle: "الدورات",
    coursesLead:
      "دورات مذكورة في السيرة الذاتية مع الجهة والتاريخ والساعات حين تُذكر. ليست شهادات مهنية ما لم ينص المصدر على ذلك.",
    hoursMissing: "الساعات غير مذكورة",
    contactTitle: "التواصل",
    contactLead: "بيانات وافق على نشرها. لا يوجد نموذج يزعم أن الرسالة أُرسلت.",
    email: "البريد",
    phone: "الجوال",
    linkedin: "لنكدإن",
    github: "جيت هاب",
    location: "الرياض، السعودية",
    newTab: "يفتح في علامة جديدة",
    close: "إغلاق",
    purpose: "الغرض",
    tools: "الأدوات المعروفة",
    contributions: "ما يدعمه المصدر",
    evidence: "الدليل",
    missing: "تفاصيل غير متوفرة",
    notProvided: "غير متوفر",
    gallery: "معرض الصور",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
    imageStatus: "صورة",
    fullSize: "الحجم الكامل",
    fitWidth: "ملاءمة العرض",
    openFile: "فتح الملف الأصلي",
    downloadReport: "تنزيل ملف التقرير",
    illustration: "رسم توضيحي وليس دليلًا من المشروع",
    dialogLabel: "تفاصيل المشروع",
  },
  en: {
    metaTitle: "Mohammed Aldosari — Data Scientist",
    skip: "Skip to content",
    navLabel: "Page sections",
    menu: "Menu",
    closeMenu: "Close menu",
    langLabel: "Language",
    arabic: "العربية",
    english: "English",
    home: "Home",
    kicker: "Aspiring data scientist · Riyadh",
    heroTitle: "Turning data into meaningful insights",
    heroBody:
      "Mohammed Aldosari is a Computer Science graduate in Riyadh, presenting himself as an aspiring data scientist and also targeting data analyst roles. The work here is academic and from training, not an employment history.",
    ctaProjects: "Explore Projects",
    ctaCv: "Download CV",
    ctaContact: "Contact Me",
    portraitNote: "No portrait was supplied. The MA monogram stands in for one.",
    aboutTitle: "About",
    aboutLead: "A fresh graduate, not a long-tenured employee.",
    aboutBody:
      "The CV describes a foundation in programming, data analysis, and problem solving, with Python, SQL, and Power BI used in academic projects and training. Arabic and English are the listed languages. No personal stories were added beyond that source.",
    aboutPersonality: "Persistent, passionate, and committed to continuous development.",
    skillsTitle: "Skills",
    skillsLead: "Skill and tool names only, with no levels or scores.",
    bootKicker: "Mohammed Aldosari",
    bootTitle: "Before the main menu",
    bootBody:
      "A short original startup sequence, then the portfolio. The subject is Mohammed Aldosari and his projects, not a game.",
    bootRunning: "Entering the menu",
    startSound: "ابدأ التجربة مع الصوت / Start with sound",
    enterSilent: "Enter without sound",
    skipIntro: "Skip the intro",
    replayIntro: "Replay the intro",
    notOfficial:
      "An original visual treatment for Mohammed Aldosari’s site. It is not affiliated with Sony or Activision, and it does not replace the portfolio with game content.",
    audioLabel: "Audio",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    volume: "Volume",
    checkingAudio: "Checking the local audio files.",
    bothMissing:
      "No audio file is in the assets. Music waits for public/assets/audio/zombies-theme.mp3, and the startup sound waits for public/assets/audio/boot.mp3. No substitute is playing.",
    bootMissing:
      "The startup sound is not at public/assets/audio/boot.mp3, and no other file is playing in its place.",
    themeMissing:
      "Background music waits for public/assets/audio/zombies-theme.mp3. No substitute track is playing.",
    playbackBlocked: "The browser refused playback. The site still works, and audio can be tried again from the sound control.",
    audioShortBoth: "Audio is stopped because the local files are missing.",
    audioShortBoot: "The startup sound is missing.",
    audioShortTheme: "Background music is missing.",
    audioShortBlocked: "The browser refused playback.",
    audioOriginal: "Original audio made for this site, not a Sony or Activision recording.",
    projectsTitle: "Projects",
    projectsLead: "All five CV projects. The three data projects are featured.",
    projectsNote:
      "Dashboard figures describe datasets, not revenue or savings attributable to Mohammed. Screenshots are static evidence, not live dashboards.",
    featured: "Featured",
    staticShot: "Static screenshot",
    noShot: "No screenshot",
    showing: "Showing",
    filtersLabel: "Filter projects",
    educationTitle: "Education & Training",
    educationLead: "Only what the CV states. No invented technical duties.",
    degreeTitle: "Bachelor of Computer Science",
    degreeBody: "Prince Sattam bin Abdulaziz University, 2021–2025.",
    trainingTitle: "Cooperative training at the Municipality of Al Aflaj",
    trainingBody:
      "June–August 2025. Stated gains: responsibility for assigned work, self-learning, and working under time pressure.",
    coursesTitle: "Courses",
    coursesLead:
      "Courses named in the CV, with provider, date, and hours where the source states them. They are not presented as professional certifications.",
    hoursMissing: "Hours not stated",
    contactTitle: "Contact",
    contactLead: "Details approved for public sharing. There is no form claiming a message was sent.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Riyadh, Saudi Arabia",
    newTab: "opens in a new tab",
    close: "Close",
    purpose: "Purpose",
    tools: "Known tools",
    contributions: "What the source supports",
    evidence: "Evidence",
    missing: "Details not provided",
    notProvided: "Not provided",
    gallery: "Image gallery",
    previous: "Previous image",
    next: "Next image",
    imageStatus: "Image",
    fullSize: "Full size",
    fitWidth: "Fit width",
    openFile: "Open original file",
    downloadReport: "Download the report PDF",
    illustration: "Illustration, not project evidence",
    dialogLabel: "Project details",
  },
};

export const skillGroups: { title: Text; items: Text[] }[] = [
  {
    title: { ar: "مهارات تقنية", en: "Technical skills" },
    items: [
      { ar: "تحليل البيانات", en: "Data analysis" },
      { ar: "بايثون", en: "Python" },
      { ar: "Power BI", en: "Power BI" },
      { ar: "SQL", en: "SQL" },
      { ar: "HTML / CSS / JavaScript", en: "HTML / CSS / JavaScript" },
      { ar: "تعلم الآلة", en: "Machine learning" },
      { ar: "التعلم العميق", en: "Deep learning" },
      { ar: "الذكاء الاصطناعي", en: "Artificial intelligence" },
      { ar: "Java", en: "Java" },
      { ar: "مايكروسوفت أوفيس", en: "MS Office" },
    ],
  },
  {
    title: { ar: "مهارات شخصية", en: "Soft skills" },
    items: [
      { ar: "التواصل", en: "Communication" },
      { ar: "العمل الجماعي", en: "Teamwork" },
      { ar: "سرعة التعلم", en: "Fast learning" },
      { ar: "البحث", en: "Research" },
      { ar: "حل المشكلات", en: "Problem solving" },
      { ar: "التفكير التحليلي", en: "Analytical thinking" },
    ],
  },
  {
    title: { ar: "اللغات", en: "Languages" },
    items: [
      { ar: "العربية", en: "Arabic" },
      { ar: "الإنجليزية", en: "English" },
    ],
  },
];

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: Text;
};

export type Project = {
  id: string;
  filter: ProjectFilter;
  featured: boolean;
  title: Text;
  summary: Text;
  purpose: Text;
  tools: string[];
  contributions: Text[];
  evidence: Text[];
  missing: Text[];
  images: GalleryImage[];
  download?: { href: string };
  illustration: boolean;
};

export const projects: Project[] = [
  {
    id: "real-estate",
    filter: "data",
    featured: true,
    title: {
      ar: "تحليل الصفقات العقارية السعودية",
      en: "Saudi Real Estate Transactions Analysis",
    },
    summary: {
      ar: "تقرير Power BI وDAX على بيانات سعودية مفتوحة: أكثر من 196 ألف صفقة بقيمة تتجاوز 200 مليار ريال.",
      en: "A Power BI and DAX report on official Saudi open data: 196K+ transactions worth SAR 200B+.",
    },
    purpose: {
      ar: "قراءة سوق الصفقات العقارية من بيانات رسمية مفتوحة، لا من أرقام أعمال خاصة بمحمد.",
      en: "Read the real-estate transaction market from official open data, not from personal business results.",
    },
    tools: ["Power BI", "DAX"],
    contributions: [
      {
        ar: "بناء تقرير Power BI يحلّل أكثر من 196 ألف صفقة عقارية بقيمة تتجاوز 200 مليار ريال باستخدام بيانات سعودية رسمية مفتوحة.",
        en: "Built a Power BI report analyzing 196K+ real estate transactions worth SAR 200B+ using official Saudi open data.",
      },
    ],
    evidence: [
      {
        ar: "لقطة النظرة العامة تعرض نحو 196 ألف صفقة، ونحو 201 ألف عقار متداول، وقيمة صفقات 200 مليار، و161 منطقة نشطة.",
        en: "The overview screenshot shows about 196K transactions, about 201K traded properties, SAR 200bn in transaction value, and 161 active areas.",
      },
      {
        ar: "لقطة الجغرافيا تعرض مدنًا وخريطة، ومنها 161 مدينة نشطة. العقارات والصفقات مقياسَان مختلفان.",
        en: "The geography screenshot shows cities and a map, including 161 active cities. Properties and transactions are different measures.",
      },
      {
        ar: "حجم البيانات وقيمة الصفقات ليسا مالًا حققه محمد أو وفّره.",
        en: "Dataset size and transaction value are not money Mohammed generated or saved.",
      },
    ],
    missing: [
      { ar: "رابط عرض مباشر", en: "A live demo URL" },
      { ar: "دور تقني أدق من بناء التقرير", en: "A technical role finer than building the report" },
    ],
    images: [
      {
        src: publicUrl("/assets/real-estate-overview.png"),
        width: 1276,
        height: 850,
        alt: {
          ar: "لقطة ثابتة من Power BI بعنوان نظرة عامة على السوق العقاري. تظهر 196 ألف صفقة و201 ألف عقار و200 مليار و161 منطقة.",
          en: "Static Power BI screenshot titled as an overview of the real-estate market. It shows 196K transactions, 201K properties, 200bn, and 161 areas.",
        },
      },
      {
        src: publicUrl("/assets/real-estate-geography.png"),
        width: 1267,
        height: 849,
        alt: {
          ar: "لقطة ثابتة من Power BI لتحليل المدن والتوزيع الجغرافي، وفيها أعمدة مدن وخريطة للمملكة.",
          en: "Static Power BI screenshot of city and geographic distribution, with city bars and a map of Saudi Arabia.",
        },
      },
      {
        src: publicUrl("/assets/real-estate-statistics.png"),
        width: 1285,
        height: 850,
        alt: {
          ar: "لقطة ثابتة من Power BI لإحصاءات السوق العقاري، وفيها جدول مناطق ومخططات للمساحة والتصنيف.",
          en: "Static Power BI screenshot of real-estate market statistics, with a regional table plus area and classification charts.",
        },
      },
    ],
    illustration: false,
  },
  {
    id: "oil",
    filter: "timeseries",
    featured: true,
    title: {
      ar: "تحليل السلاسل الزمنية لصادرات النفط السعودية",
      en: "Saudi Oil Exports Time Series Analysis",
    },
    summary: {
      ar: "نماذج تنبؤ ببايثون على بيانات كابسارك، كما ورد في السيرة: SARIMA وتعلم الآلة والتعلم العميق.",
      en: "Python forecasting on KAPSARC data, as the CV states: SARIMA, machine learning, and deep learning.",
    },
    purpose: {
      ar: "دراسة سلسلة صادرات النفط وبناء نماذج تنبؤ. الأشكال مقتطفات ثابتة من التقرير وليست تنبؤًا مباشرًا.",
      en: "Study an oil-export series and build forecasting models. The figures are static report excerpts, not a live forecast.",
    },
    tools: ["Python", "SARIMA", "Machine Learning", "Deep Learning"],
    contributions: [
      {
        ar: "بناء نماذج تنبؤ باستخدام SARIMA وتعلم الآلة والتعلم العميق على بيانات صادرات النفط من كابسارك، كما تذكر السيرة.",
        en: "Built forecasting models using SARIMA, machine learning, and deep learning on KAPSARC oil-export data, as stated in the CV.",
      },
    ],
    evidence: [
      {
        ar: "شكل السلسلة الأصلية رسم matplotlib بعنوان Original Time Series. وحدة المحور الرأسي غير مذكورة هنا.",
        en: "The original-series figure is a matplotlib chart titled Original Time Series. The vertical-axis unit is not stated here.",
      },
      {
        ar: "شكل التفكيك بعنوان Seasonal Decomposition (Additive) ويعرض القيمة والاتجاه والموسمية والبواقي.",
        en: "The decomposition figure is titled Seasonal Decomposition (Additive) and shows the value, trend, seasonal, and residual panels.",
      },
      {
        ar: "شكل المقارنة بعنوان Actual vs Deep Learning Predictions ويعرض الفعلي وSimple RNN وLSTM وGRU. لا دقة رقمية ولا نموذج فائز.",
        en: "The comparison figure is titled Actual vs Deep Learning Predictions and shows Actual, Simple RNN, LSTM, and GRU. No numeric accuracy and no winning model are stated.",
      },
    ],
    missing: [
      { ar: "أي مقياس دقة أو تقييم رقمي", en: "Any accuracy metric or numeric evaluation" },
      { ar: "ادعاء أفضل نموذج", en: "A best-model claim" },
      { ar: "عرض تنبؤ مباشر", en: "A live prediction demo" },
    ],
    images: [
      {
        src: publicUrl("/assets/oil-original-series.png"),
        width: 1600,
        height: 652,
        alt: {
          ar: "مقتطف ثابت من التقرير: مخطط خطي بعنوان Original Time Series من نحو 2002 إلى 2025.",
          en: "Static report excerpt: a line chart titled Original Time Series spanning roughly 2002 to 2025.",
        },
      },
      {
        src: publicUrl("/assets/oil-seasonal-decomposition.png"),
        width: 1600,
        height: 560,
        alt: {
          ar: "مقتطف ثابت بعنوان Seasonal Decomposition (Additive) مع لوحات القيمة والاتجاه والموسمية والبواقي.",
          en: "Static excerpt titled Seasonal Decomposition (Additive), with value, trend, seasonal, and residual panels.",
        },
      },
      {
        src: publicUrl("/assets/oil-predictions.png"),
        width: 1600,
        height: 584,
        alt: {
          ar: "مقتطف ثابت بعنوان Actual vs Deep Learning Predictions يقارن الفعلي مع Simple RNN وLSTM وGRU دون درجة دقة.",
          en: "Static excerpt titled Actual vs Deep Learning Predictions comparing Actual with Simple RNN, LSTM, and GRU, without an accuracy score.",
        },
      },
    ],
    download: { href: publicUrl("/assets/saudi-oil-project.pdf") },
    illustration: false,
  },
  {
    id: "ecommerce",
    filter: "data",
    featured: true,
    title: { ar: "لوحة معلومات التجارة الإلكترونية", en: "E-commerce Dashboard" },
    summary: {
      ar: "لوحة Power BI وDAX لمؤشرات الأداء وشرائح العملاء وأداء المبيعات. العملة غير محددة في الصورة.",
      en: "A Power BI and DAX dashboard of KPIs, customer segments, and sales performance. The image does not name a currency.",
    },
    purpose: {
      ar: "متابعة مؤشرات وتجزئة العملاء وأداء المبيعات. الأرقام ظاهرة في لقطة ثابتة وليست نتائج أعمال لمحمد.",
      en: "Track KPIs, customer segments, and sales performance. The numbers are visible in a static snapshot and are not Mohammed's business results.",
    },
    tools: ["Power BI", "DAX"],
    contributions: [
      {
        ar: "بناء لوحة تفاعلية لمتابعة مؤشرات الأداء وشرائح العملاء وأداء المبيعات باستخدام DAX، كما تذكر السيرة.",
        en: "Built an interactive dashboard to track KPIs, customer segments, and sales performance using DAX, as the CV states.",
      },
    ],
    evidence: [
      {
        ar: "الصورة تعرض: الإيراد 10.64M، والطلبات 20K، والعملاء 4K، ومتوسط قيمة الطلب 524.75، والوحدات المباعة 6M. العملة غير مكتوبة.",
        en: "The image shows revenue 10.64M, orders 20K, customers 4K, average order value 524.75, and items sold 6M. No currency is printed.",
      },
      {
        ar: "هذه أرقام اللقطة، ولم تُغيَّر. لا تُنسب إلى محمد كأرباح حققها.",
        en: "These are the snapshot figures and were not altered. They are not attributed to Mohammed as revenue he earned.",
      },
    ],
    missing: [
      { ar: "عملة المبالغ", en: "A currency for the amounts" },
      { ar: "رابط اللوحة الحية", en: "A live dashboard URL" },
    ],
    images: [
      {
        src: publicUrl("/assets/ecommerce-dashboard.png"),
        width: 1425,
        height: 792,
        alt: {
          ar: "لقطة ثابتة بعنوان E-Commerce Dashboard. الأرقام الظاهرة: إيراد 10.64M، و20K طلبًا، و4K عميلًا، ومتوسط طلب 524.75، و6M وحدة. العملة غير محددة.",
          en: "Static screenshot titled E-Commerce Dashboard. Visible figures: revenue 10.64M, 20K orders, 4K customers, average order value 524.75, and 6M items sold. Currency is not shown.",
        },
      },
    ],
    illustration: false,
  },
  {
    id: "tts",
    filter: "systems",
    featured: false,
    title: {
      ar: "مشروع التخرج — نظام تتبع المهام",
      en: "Graduation Project — TTS (Task Tracking System)",
    },
    summary: {
      ar: "برنامج يساعد الشركات على إسناد المهام ومتابعة الأداء وعرض التقارير. الدور التقني الشخصي غير مذكور.",
      en: "A program that helps companies assign tasks, track performance, and view reports. A personal technical role is not stated.",
    },
    purpose: {
      ar: "نظام تتبع مهام لمساعدة الشركات على إسناد المهام ومتابعة الأداء وعرض التقارير.",
      en: "A task-tracking system that helps companies assign tasks, track performance, and view reports.",
    },
    tools: [],
    contributions: [
      {
        ar: "السيرة تصف غاية البرنامج. لا يوجد وصف لدور محمد التقني داخل الفريق.",
        en: "The CV describes the program's purpose. It does not describe Mohammed's personal technical role.",
      },
    ],
    evidence: [
      {
        ar: "لا توجد لقطة مرفقة. لم يُخترع رسم للواجهة.",
        en: "No screenshot was supplied. No interface mockup was invented.",
      },
    ],
    missing: [
      { ar: "الدور التقني الشخصي", en: "Personal technical role" },
      { ar: "التقنيات المستخدمة", en: "Technology stack" },
      { ar: "نتائج مقيسة", en: "Measured results" },
      { ar: "عرض أو لقطة", en: "A demo or screenshot" },
    ],
    images: [],
    illustration: false,
  },
  {
    id: "playstation",
    filter: "systems",
    featured: false,
    title: {
      ar: "مشروع هندسة برمجيات — تحليل نظام تطبيق بلايستيشن",
      en: "Software Engineering Project — PlayStation App System Analysis",
    },
    summary: {
      ar: "تحليل متطلبات وتصميم نظام باستخدام UML. ليس تطبيقًا منشورًا ولا علاقة وظيفية بسوني.",
      en: "Requirements analysis and system design using UML. Not a deployed app and not a Sony affiliation.",
    },
    purpose: {
      ar: "تحليل متطلبات وتصميم نظام لتطبيق بلايستيشن باستخدام مخططات UML ضمن مشروع هندسة برمجيات.",
      en: "Requirements analysis and system design for a PlayStation app, using UML diagrams, as a software engineering project.",
    },
    tools: ["UML"],
    contributions: [
      {
        ar: "تنفيذ تحليل متطلبات وتصميم نظام بمخططات UML، كما ورد في السيرة.",
        en: "Performed requirements analysis and system design using UML diagrams, as stated in the CV.",
      },
    ],
    evidence: [
      {
        ar: "لا توجد لقطة للمخططات الأصلية. الرسم في هذه الصفحة توضيحي عام وصُنع للموقع، وليس دليلًا من المشروع.",
        en: "The original diagrams were not supplied. The drawing on this page is a generic illustration made for the site, not evidence from the project.",
      },
      {
        ar: "لا يُفهم من المشروع وجود علاقة مع سوني أو تطبيق منشور.",
        en: "The project does not imply a Sony affiliation or a deployed application.",
      },
    ],
    missing: [
      { ar: "مخططات UML الأصلية", en: "The original UML diagrams" },
      { ar: "لقطة شاشة", en: "A screenshot" },
    ],
    images: [],
    illustration: true,
  },
];

export const courses: {
  title: Text;
  provider: Text;
  when: Text;
  hours: Text | null;
}[] = [
  {
    title: { ar: "تجربة عمل افتراضية لمحلل بيانات", en: "Data Analyst Virtual Work Experience" },
    provider: { ar: "مؤسسة مسك و stc", en: "MISK Foundation & STC" },
    when: { ar: "سبتمبر 2026", en: "September 2026" },
    hours: { ar: "7 ساعات", en: "7 hours" },
  },
  {
    title: { ar: "برنامج الإعداد المهني", en: "Career Preparation Program" },
    provider: { ar: "مؤسسة مسك", en: "MISK Foundation" },
    when: { ar: "مايو 2026", en: "May 2026" },
    hours: { ar: "50 ساعة", en: "50 hours" },
  },
  {
    title: {
      ar: "برنامج تحليل السلاسل الزمنية باستخدام بايثون",
      en: "Time Series Analysis Program using Python",
    },
    provider: { ar: "أكاديمية طويق", en: "Tuwaiq Academy" },
    when: { ar: "أبريل 2026", en: "April 2026" },
    hours: { ar: "40 ساعة", en: "40 hours" },
  },
  {
    title: {
      ar: "مسار علم البيانات والذكاء الاصطناعي",
      en: "Data Science & Artificial Intelligence Track",
    },
    provider: { ar: "سطر", en: "SATR" },
    when: { ar: "فبراير 2026", en: "February 2026" },
    hours: { ar: "27 ساعة", en: "27 hours" },
  },
  {
    title: { ar: "هندسة البيانات وتحليلها", en: "Data Engineering & Analysis" },
    provider: { ar: "أكاديمية طويق", en: "Tuwaiq Academy" },
    when: { ar: "فبراير 2026", en: "February 2026" },
    hours: null,
  },
  {
    title: { ar: "مسار تحليل البيانات", en: "Data Analysis Track" },
    provider: { ar: "سطر", en: "SATR" },
    when: { ar: "ديسمبر 2025", en: "December 2025" },
    hours: { ar: "27 ساعة", en: "27 hours" },
  },
  {
    title: { ar: "مقدمة في ذكاء الأعمال", en: "Introduction to Business Intelligence" },
    provider: { ar: "سطر", en: "SATR" },
    when: { ar: "سبتمبر 2025", en: "September 2025" },
    hours: null,
  },
  {
    title: {
      ar: "المهارات التقنية باستخدام الذكاء الاصطناعي التوليدي",
      en: "Technical skills using GenAI",
    },
    provider: { ar: "أكاديمية طويق", en: "Tuwaiq Academy" },
    when: { ar: "سبتمبر 2025", en: "September 2025" },
    hours: null,
  },
  {
    title: {
      ar: "أساسيات البحث العلمي لمشروع التخرج",
      en: "Fundamentals of Scientific Research for Graduation Project",
    },
    provider: { ar: "جامعة الأمير سطام بن عبدالعزيز", en: "PSAU" },
    when: { ar: "يناير 2025", en: "January 2025" },
    hours: null,
  },
  {
    title: { ar: "ريادة الأعمال ورؤية 2030", en: "Entrepreneurship & Vision 2030" },
    provider: { ar: "جامعة الأمير سطام بن عبدالعزيز", en: "PSAU" },
    when: { ar: "نوفمبر 2022", en: "November 2022" },
    hours: null,
  },
  {
    title: { ar: "مقدمة في إنترنت الأشياء", en: "Introduction to the IoT" },
    provider: { ar: "دروب", en: "Doroob" },
    when: { ar: "يوليو 2022", en: "July 2022" },
    hours: null,
  },
];

export const contacts = {
  email: "alajaleenmohammed0@gmail.com",
  phoneDisplay: "0550872895",
  phoneHref: "tel:+966550872895",
  linkedin: "https://www.linkedin.com/in/mohammed-aldosari-7a5684369",
  github: "https://github.com/MohammedMujib",
  cv: publicUrl("/assets/mohammed-aldosari-cv.pdf"),
};
