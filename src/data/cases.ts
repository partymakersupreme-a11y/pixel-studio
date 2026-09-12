import type { CaseItem } from "@/types";

/**
 * Реальные проекты. Сайты уже сделаны и работают у заказчиков, публичных
 * ссылок здесь нет — домены ещё не зарегистрированы. Цифр без подтверждения
 * не пишем: там, где нет измеренного результата, описываем эффект словами.
 * Тексты (title/problem/solution/result) — в src/i18n/locales/*, ключ cases.items.<id>.
 */
export const cases: CaseItem[] = [
  {
    id: "evdokimov-costruzioni",
    client: "Evdokimov Costruzioni, Форте-дей-Марми",
    category: "website",
    year: 2026,
    stack: ["React", "Vite", "Tailwind"],
  },
  {
    id: "versilia-trasporti",
    client: "Versilia Trasporti e Sgomberi",
    category: "website",
    year: 2026,
    stack: ["React", "Vite", "Tailwind"],
  },
  {
    id: "rc-verniciatura",
    client: "RC Verniciatura Nautica, Виареджо и Масса",
    category: "website",
    year: 2025,
    stack: ["React", "framer-motion", "Tailwind"],
  },
];
