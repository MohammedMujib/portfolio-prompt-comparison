'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const safeStore={get(k,type='localStorage'){try{return window[type].getItem(k)}catch{return null}},set(k,v,type='localStorage'){try{window[type].setItem(k,v)}catch{}}};
const integrationParams=new URLSearchParams(location.search);
const comparisonEmbed=integrationParams.get('embed')==='1';
let lang=(integrationParams.get('lang')||safeStore.get('ma-language'))==='en'?'en':'ar';
const text={
ar:{portfolio:'الموقع الشخصي',location:'الرياض، المملكة العربية السعودية',welcome:'WELCOME TO MY WORLD',graduate:'خريج علوم الحاسب',profile:'نبذة عني',projects:'المشاريع',skills:'المهارات',contact:'لنتواصل',motto:'شغف. مثابرة.<br>تطوّر مستمر.','enter-world':'استكشف عالمي',back:'العودة للقائمة ↗','about-tag':'ما وراء الأرقام','about-heading':'أبحث عن القصة<br>داخل البيانات.',bio:'أنا محمد الدوسري، خريج علوم الحاسب. أستخدم Python وSQL وPower BI لاستكشاف البيانات وبناء تقارير تساعد على فهمها. أؤمن بالتعلّم المستمر، وتحويل التحديات إلى فرص للتطوّر.',trait1:'مثابر',trait2:'شغوف',trait3:'أطمح للتطوّر الدائم',download:'تحميل السيرة الذاتية ↓',degree:'بكالوريوس علوم الحاسب',university:'جامعة الأمير سطام بن عبدالعزيز','training-date':'يونيو — أغسطس 2025',training:'تدريب تعاوني — بلدية الأفلاج','training-body':'تجربة عززت تحمّل المسؤولية والتعلّم الذاتي وإنجاز المهام تحت ضغط الوقت.',languages:'اللغات',bilingual:'العربية والإنجليزية',courses:'الدورات والتعلّم المستمر','projects-lead':'من البيانات الخام إلى رؤية أوضح. اختر مشروعًا لاستكشاف تفاصيله.','skills-lead':'أدوات أستخدمها لفهم البيانات، حل المشكلات وبناء الأفكار.','beyond-tools':'أبعد من الأدوات','learning-status':'قيد التعلّم — لم تُفتح بعد','learning-note':'أتعلّم هذه المهارة حاليًا','next-chapter':'الفصل القادم يبدأ بمحادثة','contact-heading':'لنصنع شيئًا<br>يستحق الاهتمام.',email:'البريد الإلكتروني',phone:'الهاتف',footer:'محمد الدوسري · خريج علوم الحاسب',replay:'إعادة المقدمة',motion:'الحركة','entry-title':'أهلًا بك في عالمي.','entry-body':'رحلة تبدأ بصوت مألوف، وتأخذك إلى عالم من البيانات.',start:'ابدأ التجربة مع الصوت',silent:'الدخول بدون صوت','entry-foot':'مقدمة قصيرة · يمكنك تجاوزها في أي وقت',skip:'تجاوز المقدمة ↗',soundOn:'الصوت يعمل',soundOff:'الصوت متوقف',openProject:'استكشف المشروع',close:'إغلاق',viewReport:'عرض تقرير المشروع',downloadReport:'تحميل التقرير',viewImage:'عرض الصورة كاملة ↗',source:'مستودع GitHub ↗',audioError:'تعذّر تشغيل الصوت. اضغط زر الصوت للمحاولة مجددًا.',missingAudio:'تعذّر تحميل ملف الصوت. لا يزال بإمكانك تصفّح الموقع.',introError:'تعذّر تحميل صوت المقدمة؛ يمكنك متابعة التجربة.',resume:'اضغط لتشغيل صوت المقدمة'},
en:{portfolio:'PERSONAL PORTFOLIO',location:'RIYADH, SAUDI ARABIA',welcome:'WELCOME TO MY WORLD',graduate:'COMPUTER SCIENCE GRADUATE',profile:'PROFILE',projects:'PROJECTS',skills:'SKILLS',contact:'CONTACT',motto:'PASSION. PERSISTENCE.<br>CONTINUOUS GROWTH.','enter-world':'ENTER THE EXPERIENCE',back:'BACK TO MENU ↗','about-tag':'BEYOND THE NUMBERS','about-heading':'Finding the story<br>inside the data.',bio:'I’m Mohammed Aldosari, a Computer Science graduate. I use Python, SQL and Power BI to explore data and build reports that make it easier to understand. I believe in continuous learning and turning challenges into opportunities to grow.',trait1:'Persistent',trait2:'Passionate',trait3:'Always growing',download:'DOWNLOAD CV ↓',degree:'B.Sc. Computer Science',university:'Prince Sattam bin Abdulaziz University','training-date':'JUNE — AUGUST 2025',training:'Cooperative Training — Municipality of Al Aflaj','training-body':'An experience that strengthened responsibility, self-learning and delivering tasks under time pressure.',languages:'LANGUAGES',bilingual:'Arabic & English',courses:'COURSES & CONTINUOUS LEARNING','projects-lead':'From raw data to a clearer perspective. Select a project to explore its details.','skills-lead':'Tools I use to understand data, solve problems and bring ideas to life.','beyond-tools':'BEYOND THE TOOLS','learning-status':'LOCKED — CURRENTLY LEARNING','learning-note':'I\'m currently learning this skill','next-chapter':'THE NEXT CHAPTER STARTS WITH A CONVERSATION','contact-heading':'LET’S BUILD<br>SOMETHING MEANINGFUL.',email:'EMAIL',phone:'PHONE',footer:'MOHAMMED ALDOSARI · COMPUTER SCIENCE GRADUATE',replay:'REPLAY INTRO',motion:'MOTION','entry-title':'Welcome to my world.','entry-body':'A familiar sound. A different experience. A world of data.',start:'START WITH SOUND',silent:'ENTER WITHOUT SOUND','entry-foot':'A short introduction · Skip at any time',skip:'SKIP INTRO ↗',soundOn:'SOUND ON',soundOff:'SOUND OFF',openProject:'EXPLORE PROJECT',close:'Close',viewReport:'View Project Report',downloadReport:'Download Report',viewImage:'VIEW FULL IMAGE ↗',source:'GITHUB REPOSITORY ↗',audioError:'Audio could not play. Press the sound button to try again.',missingAudio:'Audio could not load. You can still explore the website.',introError:'The intro audio could not load. You can continue the experience.',resume:'Tap to play the intro sound'}
};
const t=k=>text[lang][k]||k;
const projects=[
 {id:'real-estate',title:{ar:'تحليل الصفقات العقارية السعودية',en:'Saudi Real Estate Transactions'},stack:'POWER BI / DAX',image:'assets/real-estate.png',desc:{ar:'تقرير تفاعلي لتحليل الصفقات العقارية باستخدام البيانات السعودية المفتوحة.',en:'An interactive report exploring real estate transactions using official Saudi open data.'},body:{ar:'بناء تقرير Power BI لتحليل أكثر من 196 ألف صفقة عقارية بقيمة تتجاوز 200 مليار ريال. يعرض المشروع مؤشرات السوق والتوزيع الجغرافي للصفقات، باستخدام DAX والبيانات السعودية المفتوحة الرسمية.',en:'Built a Power BI report analyzing over 196K real estate transactions worth more than SAR 200B. The project explores market indicators and the geographic distribution of transactions using DAX and official Saudi open data.'},facts:{ar:['196 ألف+ صفقة','200 مليار+ ريال','بيانات سعودية مفتوحة'],en:['196K+ transactions','SAR 200B+ analyzed','Official Saudi open data']}},
 {id:'oil',title:{ar:'تحليل صادرات النفط السعودية',en:'Saudi Oil Exports Time Series'},stack:'PYTHON / SARIMA / ML / DL',desc:{ar:'استكشاف السلاسل الزمنية وبناء نماذج للتنبؤ باستخدام بيانات KAPSARC.',en:'Time series exploration and forecasting models using KAPSARC oil export data.'},body:{ar:'تحليل السلاسل الزمنية لصادرات النفط السعودية باستخدام Python وبيانات مركز الملك عبدالله للدراسات والبحوث البترولية KAPSARC. يتضمن المشروع بناء نماذج SARIMA والتعلّم الآلي والتعلّم العميق للتنبؤ بالصادرات.',en:'Analyzed Saudi oil export time series using Python and KAPSARC data. The project includes SARIMA, machine learning and deep learning forecasting models.'},facts:{ar:['Python','SARIMA / ML / DL','بيانات KAPSARC'],en:['Python','SARIMA / ML / DL','KAPSARC data']},report:'assets/saudi-oil-project.pdf'},
 {id:'ecommerce',title:{ar:'لوحة بيانات التجارة الإلكترونية',en:'E-Commerce Dashboard'},stack:'POWER BI / DAX',image:'assets/ecommerce.png',desc:{ar:'لوحة تفاعلية لمتابعة مؤشرات الأداء والمبيعات وشرائح العملاء.',en:'An interactive dashboard tracking KPIs, sales performance and customer segments.'},body:{ar:'تصميم لوحة بيانات تفاعلية باستخدام Power BI وDAX لمتابعة مؤشرات الأداء الرئيسية وشرائح العملاء وأداء المبيعات، وتجميعها في عرض بصري واضح يسهل استكشافه.',en:'Built an interactive Power BI dashboard using DAX to track key performance indicators, customer segments and sales performance in a clear visual overview.'},facts:{ar:['مؤشرات الأداء','شرائح العملاء','أداء المبيعات'],en:['Key performance indicators','Customer segments','Sales performance']}},
 {id:'tts',title:{ar:'نظام تتبّع المهام — TTS',en:'Task Tracking System — TTS'},stack:'GRADUATION PROJECT / SYSTEM DEVELOPMENT',icon:'{ TTS }',desc:{ar:'مشروع تخرج لإدارة المشاريع وتوزيع المهام ومتابعة الأداء.',en:'A graduation project for managing projects, assigning tasks and tracking performance.'},body:{ar:'نظام سهل الاستخدام يساعد الشركات في إدارة المشاريع وتوزيع المهام ومتابعة الأداء. يهدف إلى دعم الإنتاجية من خلال أدوات واضحة وتقارير تفصيلية.',en:'A user-friendly system that helps companies manage projects by assigning tasks, tracking performance and supporting productivity through clear tools and detailed reports.'},facts:{ar:['إدارة المشاريع','توزيع المهام','تقارير تفصيلية'],en:['Project management','Task assignment','Detailed reports']},report:'assets/tts-project-report.pdf'},
 {id:'playstation',title:{ar:'تحليل نظام تطبيق PlayStation',en:'PlayStation App System Analysis'},stack:'SOFTWARE ENGINEERING / UML',icon:'△ ○ × □',desc:{ar:'تحليل المتطلبات وتصميم النظام باستخدام مخططات UML.',en:'Requirements analysis and system design using UML diagrams.'},body:{ar:'مشروع هندسة برمجيات يتضمن تحليل متطلبات تطبيق PlayStation وتصميم النظام باستخدام مخططات UML لتنظيم وظائف النظام وعلاقات مكوناته.',en:'A software engineering project covering requirements analysis and system design for the PlayStation app using UML diagrams to organize system behavior and component relationships.'},facts:{ar:['تحليل المتطلبات','تصميم النظام','مخططات UML'],en:['Requirements analysis','System design','UML diagrams']},report:'assets/playstation-app-report.pdf'}
];
const courses=[
 {name:{ar:'تجربة العمل الافتراضي في تحليل البيانات',en:'Data Analyst Virtual Work Experience'},org:{ar:'مؤسسة مسك وSTC',en:'MISK FOUNDATION & STC'},when:{ar:'7 ساعات / سبتمبر 2026',en:'7 HOURS / SEP 2026'}},
 {name:{ar:'برنامج الاستعداد المهني',en:'Career Preparation Program'},org:{ar:'مؤسسة مسك',en:'MISK FOUNDATION'},when:{ar:'50 ساعة / مايو 2026',en:'50 HOURS / MAY 2026'}},
 {name:{ar:'تحليل السلاسل الزمنية باستخدام بايثون',en:'Time Series Analysis using Python'},org:{ar:'أكاديمية طويق',en:'TUWAIQ ACADEMY'},when:{ar:'40 ساعة / أبريل 2026',en:'40 HOURS / APR 2026'}},
 {name:{ar:'مسار علم البيانات والذكاء الاصطناعي',en:'Data Science & Artificial Intelligence Track'},org:{ar:'منصة سطر',en:'SATR'},when:{ar:'27 ساعة / فبراير 2026',en:'27 HOURS / FEB 2026'}},
 {name:{ar:'هندسة البيانات وتحليلها',en:'Data Engineering & Analysis'},org:{ar:'أكاديمية طويق',en:'TUWAIQ ACADEMY'},when:{ar:'فبراير 2026',en:'FEB 2026'}},
 {name:{ar:'مسار تحليل البيانات',en:'Data Analysis Track'},org:{ar:'منصة سطر',en:'SATR'},when:{ar:'27 ساعة / ديسمبر 2025',en:'27 HOURS / DEC 2025'}},
 {name:{ar:'مقدمة في ذكاء الأعمال',en:'Introduction to Business Intelligence'},org:{ar:'منصة سطر',en:'SATR'},when:{ar:'سبتمبر 2025',en:'SEP 2025'}},
 {name:{ar:'المهارات التقنية باستخدام الذكاء الاصطناعي التوليدي',en:'Technical Skills using GenAI'},org:{ar:'أكاديمية طويق',en:'TUWAIQ ACADEMY'},when:{ar:'سبتمبر 2025',en:'SEP 2025'}},
 {name:{ar:'أساسيات البحث العلمي لمشروع التخرج',en:'Fundamentals of Scientific Research for Graduation Project'},org:{ar:'جامعة الأمير سطام بن عبدالعزيز',en:'PSAU'},when:{ar:'يناير 2025',en:'JAN 2025'}},
 {name:{ar:'ريادة الأعمال ورؤية 2030',en:'Entrepreneurship & Vision 2030'},org:{ar:'جامعة الأمير سطام بن عبدالعزيز',en:'PSAU'},when:{ar:'نوفمبر 2022',en:'NOV 2022'}},
 {name:{ar:'مقدمة في إنترنت الأشياء',en:'Introduction to the IoT'},org:{ar:'دروب',en:'DOROOB'},when:{ar:'يوليو 2022',en:'JUL 2022'}}
];
const skillName=(en,ar)=>({en,ar:ar||en});
const skills=[
 {id:'python',name:skillName('PYTHON'),status:'equipped'},
 {id:'sql',name:skillName('SQL'),status:'equipped'},
 {id:'powerbi',name:skillName('POWER BI'),status:'equipped'},
 {id:'analysis',name:skillName('DATA ANALYSIS'),status:'equipped'},
 {id:'ml',name:skillName('MACHINE LEARNING'),status:'equipped'},
 {id:'dl',name:skillName('DEEP LEARNING'),status:'equipped'},
 {id:'web',name:skillName('HTML / CSS / JS'),status:'equipped'},
 {id:'java',name:skillName('JAVA'),status:'equipped'},
 {id:'office',name:skillName('MS OFFICE'),status:'equipped'},
 {id:'ai',name:skillName('Artificial Intelligence (AI)','الذكاء الاصطناعي'),status:'learning'},
 {id:'vibe',name:skillName('Vibe Coding','البرمجة بمساعدة الذكاء الاصطناعي'),status:'learning'}
];
const lockIcon='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="5" y="11" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const softIcon=d=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const softSkills=[
 {ar:'التفكير التحليلي',en:'Analytical thinking',icon:softIcon('<path d="M4 19V10M10 19V5M16 19v-7M22 19H2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')},
 {ar:'حل المشكلات',en:'Problem solving',icon:softIcon('<path d="M8 4h3v3h2.2a1.8 1.8 0 1 1 0 3.6H11V13h5v3h-3v4H8v-4H5v-5h3V4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>')},
 {ar:'العمل الجماعي',en:'Teamwork',icon:softIcon('<circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.6 18.5c.6-2.5 2.4-3.8 4.4-3.8s3.8 1.3 4.4 3.8M12.2 18.5c.4-2 1.9-3.1 3.8-3.1 1.8 0 3.3 1.1 3.9 3.1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')},
 {ar:'التواصل',en:'Communication',icon:softIcon('<path d="M5 6h14v9H8.5L5 18V6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>')},
 {ar:'التعلّم الذاتي',en:'Self-learning',icon:softIcon('<path d="M3 6.2h6.2A2.3 2.3 0 0 1 11.5 8.5V19H5.4A2.4 2.4 0 0 0 3 21.4V6.2zM21 6.2h-6.2A2.3 2.3 0 0 0 12.5 8.5V19h6.1A2.4 2.4 0 0 1 21 21.4V6.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>')},
 {ar:'العمل تحت الضغط',en:'Working under pressure',icon:softIcon('<circle cx="12" cy="13" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 13V9.5M12 3.5v2.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')}
];
const oilVisual='<div class="project-visual oil-chart"><svg viewBox="0 0 340 140" aria-hidden="true"><path d="M0 115H340M0 75H340M0 35H340" stroke="#536165" stroke-width=".4"/><path d="M0 100 25 80 50 86 75 40 100 67 125 52 150 72 175 48 200 58 225 24 250 41 275 31 305 18 340 30V140H0Z" fill="#d58a3d18"/><path d="M0 100 25 80 50 86 75 40 100 67 125 52 150 72 175 48 200 58 225 24 250 41 275 31 305 18 340 30" fill="none" stroke="#d89b60" stroke-width="2"/><path d="M200 58 225 48 250 55 275 33 305 44 340 21" fill="none" stroke="#8db2b4" stroke-width="2" stroke-dasharray="4 5"/></svg></div>';
function visual(p){return p.image?`<img src="${p.image}" alt="${p.title[lang]}" loading="lazy" width="1276" height="850">`:p.id==='oil'?oilVisual:`<div class="project-visual code"><span class="code-icon">${p.icon}</span><small>${p.id==='tts'?'TASK TRACKING SYSTEM':'SYSTEM ANALYSIS'}</small></div>`}
function renderProjects(){
 $('#project-grid').innerHTML=projects.map((p,i)=>`<button class="project-card" data-project="${p.id}"><div class="project-image"><span class="project-number">0${i+1}</span>${visual(p)}</div><div class="project-copy"><h3>${p.title[lang]}</h3><span class="project-stack">${p.stack}</span><p>${p.desc[lang]}</p><span class="project-open">${t('openProject')} <b>↗</b></span></div></button>`).join('');
 $$('[data-project]').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));
}
function renderSkills(){
 let equipped=0;
 $('#skill-grid').innerHTML=skills.map(s=>{
  const label=s.name[lang];
  const dir=/[\u0600-\u06FF]/.test(label)?'rtl':'ltr';
  if(s.status==='learning'){
   return `<button type="button" class="skill is-learning" dir="${dir}" aria-expanded="false" aria-describedby="note-${s.id}"><span class="skill-lock" aria-hidden="true">${lockIcon}</span><small>${t('learning-status')}</small><strong>${label}</strong><span class="skill-note" id="note-${s.id}" role="tooltip">${t('learning-note')}</span></button>`;
  }
  equipped+=1;
  return `<div class="skill" dir="${dir}"><small>${String(equipped).padStart(2,'0')} / EQUIPPED</small><strong>${label}</strong></div>`;
 }).join('');
 $$('.skill.is-learning').forEach(btn=>btn.addEventListener('click',()=>{
  const open=!btn.classList.contains('is-open');
  $$('.skill.is-learning.is-open').forEach(other=>{other.classList.remove('is-open');other.setAttribute('aria-expanded','false')});
  btn.classList.toggle('is-open',open);
  btn.setAttribute('aria-expanded',String(open));
 }));
 $('#soft-grid').innerHTML=softSkills.map(s=>`<div class="soft-card" tabindex="0"><span class="soft-icon">${s.icon}</span><span>${s[lang]}</span></div>`).join('');
}
function renderCourses(){
 const dir=lang==='ar'?'rtl':'ltr';
 $('#course-list').dir=dir;
 $('#course-list').innerHTML=courses.map(c=>`<div dir="${dir}"><strong>${c.name[lang]}</strong><small>${c.org[lang]} · ${c.when[lang]}</small></div>`).join('');
}
renderSkills();renderCourses();
$('#social-links').innerHTML='<a href="https://www.linkedin.com/in/mohammed-aldosari-7a5684369" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg></a><a href="https://github.com/MohammedMujib" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg></a>';
let selectedProject=null, projectOpener=null;
function openProject(id){
 const p=projects.find(p=>p.id===id);if(!p)return;
 selectedProject=id;projectOpener=document.activeElement;
 $('#project-detail').innerHTML=`<div class="detail-inner"><span class="section-tag">${p.stack}</span><h2>${p.title[lang]}</h2>${p.image?`<img class="detail-image" src="${p.image}" alt="${p.title[lang]}">`:p.id==='oil'?`<div class="project-image">${oilVisual}</div>`:''}<p>${p.body[lang]}</p><div class="detail-facts">${p.facts[lang].map(f=>`<span>${f}</span>`).join('')}</div><div class="detail-actions">${p.report?`<a class="button primary" href="${p.report}" target="_blank" rel="noopener noreferrer">${t('viewReport')}</a><a class="button" href="${p.report}" download>${t('downloadReport')}</a>`:''}${p.image?`<a class="button primary" href="${p.image}" target="_blank" rel="noopener noreferrer">${t('viewImage')}</a>`:''}<a class="button" href="assets/mohammed-aldosari-cv.pdf" download>${t('download')}</a></div></div>`;
 if(!$('#project-dialog').open)$('#project-dialog').showModal();$('#project-dialog').scrollTop=0;
}
$('#close-dialog').onclick=()=>$('#project-dialog').close();
$('#project-dialog').addEventListener('click',e=>{if(e.target===$('#project-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
$('#project-dialog').addEventListener('close',()=>{selectedProject=null;projectOpener?.focus()});
function applyLanguage(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 $$('[data-i18n]').forEach(el=>{el.innerHTML=t(el.dataset.i18n)});
 document.title=lang==='ar'?'محمد الدوسري | خريج علوم الحاسب':'Mohammed Aldosari | Computer Science Graduate';
 const metaDesc=document.querySelector('meta[name="description"]');
 if(metaDesc)metaDesc.content=lang==='ar'?'محمد الدوسري، خريج علوم الحاسب.':'Mohammed Aldosari, Computer Science Graduate.';
 $$('#language .lang-option').forEach(el=>el.classList.toggle('is-active',el.dataset.langOption===lang));
 $('#language').setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
 $('.main-menu').setAttribute('aria-label',lang==='ar'?'أقسام الموقع':'Portfolio sections');
 $('#volume').setAttribute('aria-label',lang==='ar'?'مستوى الصوت':'Volume');$('#close-dialog').setAttribute('aria-label',t('close'));$('.skip-link').textContent=lang==='ar'?'تخطي إلى المحتوى':'Skip to content';
 renderProjects();renderSkills();renderCourses();updateSoundUI();if(selectedProject)openProject(selectedProject);
}
$('#language').onclick=()=>{lang=lang==='ar'?'en':'ar';safeStore.set('ma-language',lang);applyLanguage()};
let page='home';
function route(name,focus=true){
 if(!['home','profile','projects','skills','contact'].includes(name))name='home';
 if($('#project-dialog').open)$('#project-dialog').close();
 $$('.screen').forEach(s=>s.hidden=s.id!==name);page=name;
 $$('[data-page]').forEach(b=>{if(b.dataset.page===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 if(focus){window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true})}
}
$$('[data-page]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.page;if(location.hash==='#'+n)route(n);else location.hash=n}));
document.addEventListener('click',e=>{if(e.target.closest('.skill.is-learning'))return;$$('.skill.is-learning.is-open').forEach(b=>{b.classList.remove('is-open');b.setAttribute('aria-expanded','false')})});
window.addEventListener('hashchange',()=>route(location.hash.slice(1)));
document.addEventListener('keydown',e=>{
 if($('#project-dialog').open)return;
 if(e.key==='Escape'){const openNotes=$$('.skill.is-learning.is-open');if(openNotes.length){openNotes.forEach(b=>{b.classList.remove('is-open');b.setAttribute('aria-expanded','false')});return}if(!$('#boot').hidden||!$('#entry').hidden)return;if(page!=='home')location.hash='home'}
 if(!$('#entry').hidden||!$('#boot').hidden||page!=='home'||!['ArrowDown','ArrowUp'].includes(e.key))return;
 if(e.target.matches('input,select,textarea'))return;
 const buttons=$$('.main-menu button');let i=buttons.indexOf(document.activeElement);i=e.key==='ArrowDown'?(i+1)%buttons.length:(i<0?buttons.length-1:(i-1+buttons.length)%buttons.length);e.preventDefault();buttons[i].focus();
});

const localBoot=$('#boot-audio'),localTheme=$('#theme-audio');
let bootAudio=localBoot,themeAudio=localTheme,usingParentAudio=false;
let wantsSound=false,playbackBlocked=false,booting=false,entered=false,finishTimer=null,toastTimer,starting=false;
let bootVisualArmed=false,audioGeneration=0;
let volume=Number(safeStore.get('ma-volume')??.35);if(!Number.isFinite(volume)||volume<0||volume>1)volume=.35;
$('#volume').value=volume;localBoot.volume=volume;localTheme.volume=volume;
let playTicket=0,fadeFrame=0;
const themeFadeMs=2000;
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),5500)}
function trackPlaying(audio){return !!audio&&!audio.paused&&!audio.ended}
function updateSoundUI(){
 const playing=!playbackBlocked&&wantsSound&&volume>0&&(trackPlaying(bootAudio)||trackPlaying(themeAudio));
 $('#sound-toggle').setAttribute('aria-pressed',String(playing));
 $('#sound-toggle').setAttribute('aria-label',playing?(lang==='ar'?'إيقاف الصوت':'Mute sound'):(lang==='ar'?'تشغيل الصوت':'Enable sound'));
 $('#sound-label').textContent=t(playing?'soundOn':'soundOff');
}
function parentSession(){
 try{
  if(window.parent===window)return null;
  const session=window.parent.__v2AudioPrime;
  if(!session||session.disposed)return null;
  if(Date.now()-session.createdAt>20000)return null;
  return session;
 }catch{return null}
}
function releaseElement(audio){audio.onended=null;audio.onerror=null;audio.onplaying=null;audio.onloadedmetadata=null;audio.pause();audio.removeAttribute('src');audio.load()}
function hideResume(){const button=$('#resume-audio');if(button)button.hidden=true}
function showResume(){
 if(!booting)return;
 const button=$('#resume-audio');if(!button)return;
 playbackBlocked=true;wantsSound=false;button.hidden=false;updateSoundUI();button.focus();
}
function setBootAnimationState(state){$$('.boot-overlay .boot-logo,.boot-overlay .boot-progress i').forEach(el=>{el.style.animationPlayState=state})}
function armBootAnimation(){
 if(bootVisualArmed||!booting||!trackPlaying(bootAudio))return;
 const duration=bootAudio.duration;
 if(!Number.isFinite(duration)||duration<=0.05)return;
 const offset=Math.min(Math.max(bootAudio.currentTime||0,0),duration);
 const boot=$('#boot');
 boot.style.setProperty('--boot-duration',duration+'s');
 boot.style.setProperty('--boot-delay',(-offset)+'s');
 boot.classList.add('is-timed');
 $$('.boot-overlay .boot-logo,.boot-overlay .boot-progress i').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation=''});
 bootVisualArmed=true;
}
function bindActiveAudio(){
 bootAudio.loop=false;themeAudio.loop=true;
 bootAudio.onended=()=>{if(booting)finishBoot(false)};
 bootAudio.onerror=()=>{
  if(!booting||parentSession()?.disposed)return;
  showResume();
 };
 bootAudio.onloadedmetadata=()=>armBootAnimation();
 bootAudio.onplaying=()=>{
  if(!booting)return;
  playbackBlocked=false;
  if(wantsSound)hideResume();
  updateSoundUI();
  armBootAnimation();
 };
 themeAudio.onerror=()=>{
  if(!wantsSound||comparisonEmbed||parentSession()?.disposed)return;
  playTicket++;cancelAnimationFrame(fadeFrame);themeAudio.pause();
  playbackBlocked=true;wantsSound=false;updateSoundUI();toast(t('missingAudio'));
 };
}
function showBootScreen(){
 clearTimeout(finishTimer);
 setContentInert(true);
 $('#entry').hidden=true;$('#entry').inert=true;
 const boot=$('#boot');
 boot.classList.remove('leaving');
 boot.hidden=false;boot.inert=false;
 hideResume();
 bootVisualArmed=false;
 if(!trackPlaying(bootAudio))boot.classList.remove('is-timed');
 armBootAnimation();
 $('#skip-boot').focus();
}
function playTheme(fade){
 if(comparisonEmbed||!wantsSound||booting||!entered)return;
 const ticket=++playTicket;cancelAnimationFrame(fadeFrame);
 if(!bootAudio.paused){bootAudio.pause();if(!bootAudio.ended)bootAudio.currentTime=0}
 themeAudio.loop=true;
 const startingTheme=themeAudio.paused||themeAudio.ended;
 if(themeAudio.ended)themeAudio.currentTime=0;
 if(startingTheme)themeAudio.volume=fade?0:volume;
 const pending=startingTheme?themeAudio.play():Promise.resolve();
 pending.then(()=>{
  if(ticket!==playTicket)return;
  if(!wantsSound||booting||!entered){themeAudio.pause();return}
  playbackBlocked=false;updateSoundUI();
  if(!fade){themeAudio.volume=volume;return}
  const from=themeAudio.volume,start=performance.now();
  const step=now=>{
   if(ticket!==playTicket||!wantsSound||booting||!entered)return;
   const progress=Math.min(1,(now-start)/themeFadeMs);
   themeAudio.volume=from+(volume-from)*progress;
   if(progress<1)fadeFrame=requestAnimationFrame(step);
  };
  fadeFrame=requestAnimationFrame(step);
 }).catch(()=>{
  if(ticket!==playTicket)return;
  playbackBlocked=true;wantsSound=false;updateSoundUI();
  if(booting)showResume();else toast(t('audioError'));
 });
}
function stopSound(){
 playTicket++;audioGeneration++;cancelAnimationFrame(fadeFrame);
 bootAudio.pause();themeAudio.pause();
 wantsSound=false;playbackBlocked=false;updateSoundUI();
}
function finishBoot(fromSkip){
 if(!booting)return;
 booting=false;audioGeneration++;clearTimeout(finishTimer);cancelAnimationFrame(fadeFrame);
 bootAudio.pause();
 if(fromSkip){try{bootAudio.currentTime=0}catch{/* Metadata may still be loading. */}}
 $('#boot').classList.add('leaving');
 entered=true;hideResume();
 finishTimer=setTimeout(()=>{$('#boot').hidden=true;$('#boot').classList.remove('leaving','is-timed');$('#boot').inert=true;setContentInert(false);$('#main').focus({preventScroll:true})},800);
 wantsSound=true;playbackBlocked=false;playTheme(true);
}
function startBoot(){
 if(comparisonEmbed||starting)return;
 starting=true;
 const generation=++audioGeneration;
 clearTimeout(finishTimer);cancelAnimationFrame(fadeFrame);playTicket++;
 themeAudio.pause();bootAudio.pause();
 try{themeAudio.currentTime=0;bootAudio.currentTime=0}catch{/* Restart once metadata exists. */}
 wantsSound=true;playbackBlocked=false;booting=true;entered=false;
 bootAudio.volume=volume;themeAudio.volume=0;
 bindActiveAudio();showBootScreen();
 bootAudio.play().then(()=>{
  starting=false;
  if(generation!==audioGeneration)return;
  if(!booting||!wantsSound){bootAudio.pause();return}
  playbackBlocked=false;hideResume();updateSoundUI();armBootAnimation();
 }).catch(()=>{
  starting=false;
  if(generation!==audioGeneration||!booting)return;
  showResume();
 });
}
function resumeBootAudio(){
 if(!booting)return;
 const generation=audioGeneration;
 wantsSound=true;playbackBlocked=false;bootAudio.loop=false;bootAudio.volume=volume;
 bootAudio.play().then(()=>{
  if(generation!==audioGeneration||!booting)return;
  playbackBlocked=false;wantsSound=true;hideResume();updateSoundUI();armBootAnimation();
 }).catch(()=>{
  if(generation!==audioGeneration||!booting)return;
  showResume();
 });
}
function adoptParentAudio(){
 const session=parentSession();
 if(!session)return false;
 usingParentAudio=true;
 releaseElement(localBoot);releaseElement(localTheme);
 bootAudio=session.boot;themeAudio=session.theme;
 bootAudio.volume=volume;
 if(themeAudio.paused)themeAudio.volume=0;
 wantsSound=!session.blocked;playbackBlocked=!!session.blocked;
 booting=true;entered=false;
 bindActiveAudio();showBootScreen();
 session.playPromise.then(result=>{
  if(!booting)return;
  if(bootAudio.ended){finishBoot(false);return}
  if(result==='playing'&&trackPlaying(bootAudio)){playbackBlocked=false;wantsSound=true;hideResume();updateSoundUI();armBootAnimation();return}
  showResume();
 });
 return true;
}
$('#skip-boot').onclick=()=>finishBoot(true);
$('#resume-audio').onclick=()=>resumeBootAudio();
$('#replay').onclick=()=>startBoot();
$('#sound-toggle').onclick=()=>{
 if(comparisonEmbed)return;
 if(wantsSound&&(trackPlaying(bootAudio)||trackPlaying(themeAudio))){stopSound();return}
 wantsSound=true;playbackBlocked=false;
 if(volume===0){volume=.35;$('#volume').value=volume;safeStore.set('ma-volume',String(volume))}
 if(booting)resumeBootAudio();else if(entered)playTheme(false);
};
$('#volume').oninput=e=>{volume=Number(e.target.value);bootAudio.volume=volume;if(!themeAudio.paused&&!booting)themeAudio.volume=volume;safeStore.set('ma-volume',String(volume));updateSoundUI()};
document.addEventListener('visibilitychange',()=>{
 if(comparisonEmbed)return;
 if(document.hidden){
  if(booting)bootAudio.pause();
  if(!themeAudio.paused)themeAudio.pause();
  setBootAnimationState('paused');
  return;
 }
 if(booting&&wantsSound){
  bootVisualArmed=false;
  bootAudio.play().then(()=>{if(!booting)return;setBootAnimationState('running');armBootAnimation();updateSoundUI()}).catch(()=>{if(booting)showResume()});
  return;
 }
 if(entered&&wantsSound)playTheme(false);
});

function setContentInert(value){['main','.topbar','.bottom-bar','.skip-link'].forEach(s=>$(s).inert=value)}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let motion=!comparisonEmbed&&(safeStore.get('ma-motion')!==null?safeStore.get('ma-motion')==='on':!reduced.matches);
function applyMotion(){document.documentElement.classList.toggle('motion-off',!motion);$('#motion-toggle').setAttribute('aria-pressed',String(motion));drawEmbers()}
$('#motion-toggle').onclick=()=>{motion=!motion;safeStore.set('ma-motion',motion?'on':'off');applyMotion()};
reduced.addEventListener('change',e=>{if(e.matches){motion=false;applyMotion()}});
let pointerFrame=0;
document.addEventListener('pointermove',e=>{if(!motion||reduced.matches||e.pointerType==='touch')return;cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{document.documentElement.style.setProperty('--px',`${(e.clientX/innerWidth-.5)*-14}px`);document.documentElement.style.setProperty('--py',`${(e.clientY/innerHeight-.5)*-10}px`)})});
const canvas=$('#embers'),ctx=canvas.getContext('2d');let particleFrame=0,particles=[],lastTime=0;
function resizeEmbers(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:innerWidth<720?24:58},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*1.3+.35,v:Math.random()*13+8,o:Math.random()*.55+.12,phase:Math.random()*6.28}))}
function drawEmbers(){cancelAnimationFrame(particleFrame);if(!ctx||!motion||reduced.matches||document.hidden)return;lastTime=performance.now();function tick(now){if(!motion||document.hidden||reduced.matches)return;const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of particles){p.y-=p.v*dt;p.x+=Math.sin(now/2400+p.phase)*dt*5;if(p.y<-4){p.y=innerHeight+4;p.x=Math.random()*innerWidth}ctx.fillStyle=`rgba(243,139,66,${p.o*(.65+Math.sin(now/900+p.phase)*.25)})`;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill()}particleFrame=requestAnimationFrame(tick)}particleFrame=requestAnimationFrame(tick)}
window.addEventListener('resize',resizeEmbers);document.addEventListener('visibilitychange',()=>{if(!document.hidden)drawEmbers();else cancelAnimationFrame(particleFrame)});
resizeEmbers();applyMotion();applyLanguage();route(location.hash.slice(1),false);$('#boot').inert=true;
try{sessionStorage.removeItem('ma-entered')}catch{/* Leaving Version 2 always starts the introduction again. */}
if(comparisonEmbed){
 entered=true;booting=false;
 $('#entry').hidden=true;$('#entry').inert=true;$('#boot').hidden=true;$('#boot').inert=true;
 setContentInert(false);$('#replay').hidden=true;$('.audio-controls').hidden=true;
 localBoot.pause();localTheme.pause();localBoot.preload='none';localTheme.preload='none';
}else if(!adoptParentAudio())startBoot();
window.addEventListener('pagehide',()=>{
 booting=false;clearTimeout(finishTimer);clearTimeout(toastTimer);cancelAnimationFrame(fadeFrame);cancelAnimationFrame(particleFrame);
 if(!usingParentAudio){localBoot.pause();localTheme.pause();try{localBoot.currentTime=0;localTheme.currentTime=0}catch{/* Already released. */}}
 else{const session=parentSession();if(session&&Date.now()-session.createdAt>1500){session.boot.pause();session.theme.pause()}}
});
