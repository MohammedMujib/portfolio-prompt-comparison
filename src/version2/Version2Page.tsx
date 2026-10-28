import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../i18n";
import { publicUrl } from "../publicUrl";
import "../shell/shell.css";
export function Version2Page() {
  const [params] = useSearchParams();
  const embed = params.get("embed") === "1";
  const {lang} = useLang();
  useEffect(()=>{document.title=lang === "ar" ? "محمد الدوسري | الإصدار القوي" : "Mohammed Aldosari | Strong Version";document.documentElement.lang=lang;document.documentElement.dir=lang === "ar" ? "rtl" : "ltr"},[lang]);
  // Only mounted on this route. Removing it destroys its audio, timers and animation context.
  return <main className={embed ? "strong-page is-embed" : "strong-page"}><iframe key={String(embed)+lang} className="strong-frame" title="Version 2 — Mohammed Aldosari / الإصدار القوي" src={publicUrl("/local-strong/index.html")+"?lang="+lang+(embed ? "&embed=1" : "")} allow={embed ? undefined : "autoplay"} /></main>;
}
