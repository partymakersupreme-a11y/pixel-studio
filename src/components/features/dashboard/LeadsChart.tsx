import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leadsByDay } from "@/lib/leads";
import type { Lead } from "@/types";

export default function LeadsChart({ leads }: { leads: Lead[] }) {
  const data = leadsByDay(leads, 14);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Заявки за 14 дней</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {total > 0
              ? `Всего за период — ${total}`
              : "За период заявок не было"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(258 90% 66%)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(258 90% 66%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(232 14% 22%)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="hsl(225 10% 62%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="hsl(225 10% 62%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                width={40}
              />
              <Tooltip
                cursor={{ stroke: "hsl(258 90% 66%)", strokeWidth: 1 }}
                contentStyle={{
                  background: "hsl(232 18% 14%)",
                  border: "1px solid hsl(232 14% 22%)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(225 10% 62%)" }}
                formatter={(value: number) => [`${value}`, "Заявок"]}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(258 90% 66%)"
                strokeWidth={2}
                fill="url(#leadsFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
