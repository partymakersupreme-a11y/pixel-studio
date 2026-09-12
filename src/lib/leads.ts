import type { Lead, LeadStatus } from "@/types";

const STORAGE_KEY = "sozdatel_leads";

/**
 * Хранилище заявок на время, пока нет бэкенда.
 * Всё лежит в localStorage браузера: заявка, отправленная с телефона клиента,
 * в вашем кабинете НЕ появится. Это витрина логики, а не рабочий приём заявок.
 * Как подключить настоящую отправку — см. TODO в ContactForm.tsx и README.
 */

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLead(input: Pick<Lead, "name" | "contact" | "task">): Lead {
  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    contact: input.contact.trim(),
    task: input.task.trim(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...getLeads()]));
  } catch {
    /* приватный режим или переполнение — заявку не теряем, просто не храним */
  }
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead[] {
  const next = getLeads().map((lead) =>
    lead.id === id ? { ...lead, status } : lead
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage недоступен */
  }
  return next;
}

export function deleteLead(id: string): Lead[] {
  const next = getLeads().filter((lead) => lead.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage недоступен */
  }
  return next;
}

/** Заявки за последние N дней, сгруппированные по дню — для графика. */
export function leadsByDay(
  leads: Lead[],
  days = 14
): { label: string; count: number }[] {
  const buckets: { label: string; count: number }[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const key = day.toISOString().slice(0, 10);
    const count = leads.filter(
      (lead) => lead.createdAt.slice(0, 10) === key
    ).length;
    buckets.push({
      label: day.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      }),
      count,
    });
  }
  return buckets;
}

export function formatLeadDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
