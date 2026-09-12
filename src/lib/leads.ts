import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import type { Lead, LeadStatus } from "@/types";

const STORAGE_KEY = "sozdatel_leads";
const TABLE = "leads";

/**
 * Приём и хранение заявок.
 *
 * Если заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY — заявки уходят в
 * Supabase и видны в /dashboard с любого устройства. Без них — старый режим:
 * всё лежит в localStorage браузера клиента и в кабинете НЕ появляется.
 * Настройка Supabase — см. README, раздел «Заявки».
 */

function mapRow(row: {
  id: string;
  name: string;
  contact: string;
  task: string;
  created_at: string;
  status: LeadStatus;
}): Lead {
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    task: row.task,
    createdAt: row.created_at,
    status: row.status,
  };
}

function getLocalLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalLead(input: Pick<Lead, "name" | "contact" | "task">): Lead {
  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    contact: input.contact.trim(),
    task: input.task.trim(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...getLocalLeads()]));
  } catch {
    /* приватный режим или переполнение — заявку не теряем, просто не храним */
  }
  return lead;
}

/** Достаёт заявки: из Supabase, если настроен, иначе из localStorage. */
export async function getLeads(): Promise<Lead[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Не удалось получить заявки из Supabase:", error.message);
      return [];
    }
    return (data ?? []).map(mapRow);
  }
  return getLocalLeads();
}

/** Сохраняет заявку с формы. В Supabase-режиме дублирует в localStorage не нужно. */
export async function saveLead(
  input: Pick<Lead, "name" | "contact" | "task">
): Promise<Lead | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        name: input.name.trim(),
        contact: input.contact.trim(),
        task: input.task.trim(),
        status: "new",
      })
      .select()
      .single();
    if (error) {
      console.error("Не удалось сохранить заявку в Supabase:", error.message);
      return null;
    }
    return mapRow(data);
  }
  return saveLocalLead(input);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead[]> {
  if (supabase) {
    const { error } = await supabase.from(TABLE).update({ status }).eq("id", id);
    if (error) {
      console.error("Не удалось обновить статус заявки:", error.message);
    }
    return getLeads();
  }
  const next = getLocalLeads().map((lead) =>
    lead.id === id ? { ...lead, status } : lead
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage недоступен */
  }
  return next;
}

export async function deleteLead(id: string): Promise<Lead[]> {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) {
      console.error("Не удалось удалить заявку:", error.message);
    }
    return getLeads();
  }
  const next = getLocalLeads().filter((lead) => lead.id !== id);
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

export { isSupabaseConfigured };
