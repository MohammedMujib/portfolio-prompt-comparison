import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./shell.css";
const choices = [
  {to:"/version-1",no:"01",title:"Version 1",label:"البرومبت الضعيف",english:"Weak Prompt",body:"النسخة الأصلية بتصميمها ومحتواها كما هي."},
  {to:"/version-2",no:"02",title:"Version 2",label:"البرومبت القوي",english:"Strong Prompt",body:"التجربة السينمائية الجديدة. الصوت والمقدمة داخل هذه النسخة فقط."},
  {to:"/compare",no:"03",title:"Compare",label:"المقارنة",english:"Side by side",body:"شاهد الفرق واقرأ البرومبتات. معاينة صامتة دون مقدمة."}
];
export function HomePage() {
  useEffect(()=>{document.title="محمد الدوسري | تجربة الإصدارين";document.documentElement.lang="ar";document.documentElement.dir="rtl"},[]);
  return <main className="launch-home" dir="rtl"><div className="launch-orbit" aria-hidden="true"/><div className="launch-inner"><div className="launch-top"><span>MA / PORTFOLIO LAB</span><span>محمد الدوسري</span></div><p className="launch-kicker">ONE PORTFOLIO. TWO APPROACHES.</p><h1>نفس الفكرة.<br/><em>تجربتان مختلفتان.</em></h1><p className="launch-intro">اختر الإصدار الذي تريد استكشافه، أو شاهد المقارنة بين البرومبت الضعيف والقوي.</p><nav className="launch-choices" aria-label="اختيار صفحة"><>{choices.map(c=><Link key={c.to} to={c.to} className="launch-choice"><span className="launch-number">{c.no}<span aria-hidden="true">↖</span></span><span className="launch-title" dir="ltr">{c.title}</span><strong>{c.label}</strong><span className="launch-english">{c.english}</span><p>{c.body}</p></Link>)}</></nav><footer>اختر تجربتك · EXPLORE THE DIFFERENCE</footer></div></main>;
}
