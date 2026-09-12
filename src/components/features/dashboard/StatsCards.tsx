import {
  Briefcase,
  CalendarClock,
  Inbox,
  Loader,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cases } from "@/data/cases";
import type { Lead } from "@/types";

interface StatsCardsProps {
  leads: Lead[];
}

interface Stat {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCards({ leads }: StatsCardsProps) {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const last7 = leads.filter(
    (lead) => new Date(lead.createdAt).getTime() >= weekAgo
  ).length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const inProgress = leads.filter((lead) => lead.status === "in_progress").length;

  const stats: Stat[] = [
    {
      label: "Заявок за 7 дней",
      value: last7,
      hint: `всего в базе — ${leads.length}`,
      icon: CalendarClock,
      color: "hsl(var(--brand-violet))",
    },
    {
      label: "Новые",
      value: newLeads,
      hint: "ждут первого ответа",
      icon: Inbox,
      color: "#34d399",
    },
    {
      label: "В работе",
      value: inProgress,
      hint: "взяты в обработку",
      icon: Loader,
      color: "#fbbf24",
    },
    {
      label: "Кейсов на сайте",
      value: cases.length,
      hint: "в src/data/cases.ts",
      icon: Briefcase,
      color: "hsl(var(--brand-cyan))",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-start justify-between">
                <span className="label-uppercase text-[0.55rem] text-muted-foreground">
                  {stat.label}
                </span>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon size={14} style={{ color: stat.color }} />
                </div>
              </div>

              <div className="mt-5 font-display text-4xl font-light tabular-nums leading-none">
                {stat.value}
              </div>
              <div className="mt-2.5 text-xs text-muted-foreground">
                {stat.hint}
              </div>

              <div
                className="mt-5 h-0.5 w-10 rounded-full"
                style={{ background: stat.color }}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
