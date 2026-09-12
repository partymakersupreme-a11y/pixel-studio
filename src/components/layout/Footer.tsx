import { Link } from "react-router-dom";
import { Mail, MapPin, Send } from "lucide-react";

import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="font-display text-xl font-semibold">Pixel Studio</div>
            <div className="hairline mt-4 w-14" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Павел — автоматизация бизнес-процессов, сайты и Telegram-боты.
              Работаю из Версилии, проекты — по всей Италии и удалённо.
            </p>
          </div>

          <div>
            <div className="label-uppercase mb-5 text-muted-foreground">
              Услуги
            </div>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id} className="text-sm text-muted-foreground">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label-uppercase mb-5 text-muted-foreground">
              Контакты
            </div>
            {/* TODO(владелец): подставить свои реальные контакты */}
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="shrink-0 text-primary" />
                Версилия, Италия
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-primary" />
                hello@sozdatel.it
              </li>
              <li className="flex items-center gap-2.5">
                <Send size={14} className="shrink-0 text-primary" />
                @sozdatel
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pixel Studio
          </span>
          <Link
            to="/login"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Личный кабинет
          </Link>
        </div>
      </div>
    </footer>
  );
}
