import {
  BarChart3,
  Bot,
  Check,
  LayoutTemplate,
  Plug,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Reveal from "@/components/features/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";

/** Имя иконки из data → компонент lucide-react. */
const iconMap: Record<string, LucideIcon> = {
  Workflow,
  LayoutTemplate,
  Bot,
  Plug,
  BarChart3,
  Sparkles,
};

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="label-uppercase text-primary">{t("services.label")}</div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {t("services.heading")}
            <span className="text-gradient">{t("services.headingGradient")}</span>
          </h2>
          <div className="hairline mt-6 w-16" />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            const bullets = t(`services.items.${service.id}.bullets`, {
              returnObjects: true,
            }) as string[];
            return (
              <Reveal key={service.id} delay={i * 0.07}>
                <Card className="glass-card-hover h-full">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12">
                      <Icon size={20} className="text-primary" />
                    </div>

                    <h3 className="font-display text-lg font-medium leading-snug">
                      {t(`services.items.${service.id}.title`)}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {t(`services.items.${service.id}.pitch`)}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <Check
                            size={14}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
