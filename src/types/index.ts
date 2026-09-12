/** Кейс портфолио. Данные лежат в src/data/cases.ts */
export interface CaseItem {
  id: string;
  title: string;
  client: string;
  category: CaseCategory;
  year: number;
  /** Короткое описание задачи клиента */
  problem: string;
  /** Что было сделано */
  solution: string;
  /** Измеримый результат — одна строка */
  result: string;
  /** Технологии, показываются чипами */
  stack: string[];
  /** Ссылка на живой проект, если есть */
  url?: string;
}

export type CaseCategory =
  | "Сайт"
  | "Интернет-магазин"
  | "Автоматизация"
  | "Telegram-бот"
  | "Интеграции";

/** Услуга на витрине */
export interface ServiceItem {
  id: string;
  title: string;
  /** Иконка lucide-react */
  icon: string;
  /** Польза для клиента, а не описание технологии */
  pitch: string;
  bullets: string[];
}

/** Шаг процесса работы */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
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
