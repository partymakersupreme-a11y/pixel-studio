import type { ProcessStep, ServiceItem } from "@/types";

/**
 * Услуги витрины. Иконка — имя компонента из lucide-react.
 * Тексты (title/pitch/bullets) — в src/i18n/locales/*, ключ services.items.<id>.
 */
export const services: ServiceItem[] = [
  { id: "automation", icon: "Workflow" },
  { id: "websites", icon: "LayoutTemplate" },
  { id: "bots", icon: "Bot" },
  { id: "integrations", icon: "Plug" },
  { id: "dashboards", icon: "BarChart3" },
  { id: "extras", icon: "Sparkles" },
];

/**
 * Как строится работа над проектом.
 * Тексты (title/duration/description) — в src/i18n/locales/*, ключ process.items.<step>.
 */
export const processSteps: ProcessStep[] = [
  { step: 1 },
  { step: 2 },
  { step: 3 },
  { step: 4 },
];
