import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { ComparePage } from "./compare/ComparePage";
import { LanguageProvider } from "./i18n";
import { SiteChrome } from "./shell/SiteChrome";
import { HomePage } from "./shell/HomePage";
import { Version1Page } from "./version1/Version1Page";
import { publicUrl, routerBasename } from "./publicUrl";
import { primeVersion2Audio, stopVersion2Audio } from "./version2/audioPrime";
import { Version2Page } from "./version2/Version2Page";
function Frame() {
  const [params] = useSearchParams();
  const location = useLocation();
  const embed = params.get("embed") === "1";
  useLayoutEffect(() => {
    if (location.pathname !== "/version-2" || embed) stopVersion2Audio();
  }, [location.pathname, embed]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const version2 = new URL(publicUrl("/version-2"), window.location.origin);
      if (url.pathname === version2.pathname && url.searchParams.get("embed") !== "1") primeVersion2Audio();
      else stopVersion2Audio();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", stopVersion2Audio);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", stopVersion2Audio);
    };
  }, []);
  return <div className="app-frame">
    {!embed && location.pathname !== "/" ? <SiteChrome /> : null}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/version-1" element={<Version1Page />} />
      <Route path="/version-2" element={<Version2Page />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>;
}
export function App() { return <LanguageProvider><BrowserRouter basename={routerBasename()}><Frame /></BrowserRouter></LanguageProvider>; }
