/** Кейс портфолио. Данные лежат в src/data/cases.ts, тексты — в src/i18n/locales/*. */
export interface CaseItem {
  id: string;
  client: string;
  category: CaseCategory;
  year: number;
  /** Технологии, показываются чипами */
  stack: string[];
  /** Ссылка на живой проект, если есть */
  url?: string;
}

export type CaseCategory =
  | "website"
  | "shop"
  | "automation"
  | "bot"
  | "integrations";

/** Услуга на витрине. Тексты — в src/i18n/locales/*, ключ services.items.<id>. */
export interface ServiceItem {
  id: string;
  /** Иконка lucide-react */
  icon: string;
}

/** Шаг процесса работы. Тексты — в src/i18n/locales/*, ключ process.items.<step>. */
export interface ProcessStep {
  step: number;
}

/** Заявка с формы. Пока хранится в localStorage. */
export interface Lead {
  id: string;
  name: string;
  contact: string;
  task: string;
  /** ISO-строка */
  createdAt: string;
  status: LeadStatus;
}

export type LeadStatus = "new" | "in_progress" | "done";
