import { Inbox, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatLeadDate } from "@/lib/leads";
import type { Lead, LeadStatus } from "@/types";

const statusLabels: Record<LeadStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Готово",
};

const statusVariants: Record<
  LeadStatus,
  "success" | "warning" | "outline"
> = {
  new: "success",
  in_progress: "warning",
  done: "outline",
};

/** Клик по статусу переключает его по кругу. */
const nextStatus: Record<LeadStatus, LeadStatus> = {
  new: "in_progress",
  in_progress: "done",
  done: "new",
};

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

export default function LeadsTable({
  leads,
  onStatusChange,
  onDelete,
}: LeadsTableProps) {
  return (
    <Card id="leads" className="scroll-mt-6">
      <CardHeader>
        <CardTitle>Входящие заявки</CardTitle>
        <p className="mt-1 text-xs text-muted-foreground">
          Хранятся в localStorage этого браузера — не на сервере. Клик по
          статусу переключает его.
        </p>
      </CardHeader>

      <CardContent>
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-elevated">
              <Inbox size={20} className="text-muted-foreground" />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Заявок пока нет.
            </p>
            <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">
              Отправьте форму на главной странице — заявка появится здесь.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Контакт</TableHead>
                <TableHead>Задача</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatLeadDate(lead.createdAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    {lead.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                    {lead.contact}
                  </TableCell>
                  <TableCell className="max-w-sm text-sm text-muted-foreground">
                    {lead.task}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        onStatusChange(lead.id, nextStatus[lead.status])
                      }
                      title="Переключить статус"
                    >
                      <Badge variant={statusVariants[lead.status]}>
                        {statusLabels[lead.status]}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(lead.id)}
                      title="Удалить заявку"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
