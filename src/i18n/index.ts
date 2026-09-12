import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru";
import it from "./locales/it";
import en from "./locales/en";
import de from "./locales/de";
import fr from "./locales/fr";

export const STORAGE_KEY = "sozdatel-lang";
export const SUPPORTED_LANGUAGES = ["it", "en", "ru", "de", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
const DEFAULT_LANGUAGE: SupportedLanguage = "it";

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

const storedLanguage = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
const initialLanguage = isSupportedLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    it: { translation: it },
    en: { translation: en },
    de: { translation: de },
    fr: { translation: fr },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export function setLanguage(lang: SupportedLanguage) {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }
}

export default i18n;
