import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readStorage, storageKeys, writeStorage } from "./storage";

export type Lang = "ar" | "en";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLang = (value: unknown): value is Lang => value === "ar" || value === "en";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const apply = () => {
      const stored = readStorage(storageKeys.lang, isLang);
      if (stored.ok && stored.value) setLangState(stored.value);
    };
    apply();
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKeys.lang) apply();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    writeStorage(storageKeys.lang, next);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLang must be used within LanguageProvider");
  return value;
}
