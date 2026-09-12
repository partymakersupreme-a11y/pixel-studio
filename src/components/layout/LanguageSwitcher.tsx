import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, setLanguage, type SupportedLanguage } from "@/i18n";

const LANGUAGE_META: Record<SupportedLanguage, { flag: string; label: string }> = {
  it: { flag: "🇮🇹", label: "Italiano" },
  en: { flag: "🇬🇧", label: "English" },
  ru: { flag: "🇷🇺", label: "Русский" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  fr: { flag: "🇫🇷", label: "Français" },
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = (i18n.language as SupportedLanguage) in LANGUAGE_META
    ? (i18n.language as SupportedLanguage)
    : "it";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">{LANGUAGE_META[current].flag}</span>
        <span className="hidden sm:inline">{LANGUAGE_META[current].label}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                role="option"
                aria-selected={lang === current}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                  lang === current ? "bg-white/5 font-medium" : ""
                }`}
              >
                <span aria-hidden="true">{LANGUAGE_META[lang].flag}</span>
                <span>{LANGUAGE_META[lang].label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
