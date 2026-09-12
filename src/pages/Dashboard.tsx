import { useEffect, useState } from "react";

import LeadsTable from "@/components/features/dashboard/LeadsTable";
import LiveBrowserScreen from "@/components/features/dashboard/LiveBrowserScreen";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { deleteLead, getLeads, isSupabaseConfigured, updateLeadStatus } from "@/lib/leads";
import type { Lead, LeadStatus } from "@/types";

/** Пока нет Supabase Realtime — обновляем список заявок по таймеру. */
const REFRESH_MS = 20_000;

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const refresh = () => {
    getLeads().then(setLeads);
  };

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setLeads(await updateLeadStatus(id, status));
  };

  const handleDelete = async (id: string) => {
    setLeads(await deleteLead(id));
  };

  return (
    <DashboardLayout title="Обзор" subtitle="Живой экран Instagram">
      <div className="space-y-8">
        {!isSupabaseConfigured && (
          <p className="rounded-lg border border-amber-500/25 bg-amber-500/8 p-4 text-xs leading-relaxed text-muted-foreground">
            Supabase не настроен — заявки показаны только из localStorage этого
            браузера. Настройка — в README, раздел «Заявки».
          </p>
        )}

        <LeadsTable
          leads={leads}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />

        <div id="instagram" className="h-[70vh] min-h-[420px]">
          <LiveBrowserScreen />
        </div>
      </div>
    </DashboardLayout>
  );
}
