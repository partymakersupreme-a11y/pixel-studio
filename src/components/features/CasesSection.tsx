import { useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import Reveal from "@/components/features/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cases } from "@/data/cases";
import type { CaseCategory } from "@/types";

const allCategories: CaseCategory[] = [
  "website",
  "shop",
  "automation",
  "bot",
  "integrations",
];

export default function CasesSection() {
  const { t } = useTranslation();

  const presentCategories = allCategories.filter((cat) =>
    cases.some((c) => c.category === cat),
  );
  const filters: (CaseCategory | "all")[] =
    presentCategories.length > 1 ? ["all", ...presentCategories] : [];
  const [active, setActive] = useState<CaseCategory | "all">("all");

  const visible =
    active === "all" ? cases : cases.filter((c) => c.category === active);

  return (
    <section id="cases" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="label-uppercase text-primary">{t("cases.label")}</div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {t("cases.heading")}
          </h2>
          <div className="hairline mt-6 w-16" />
        </Reveal>

        {filters.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                  active === filter
                    ? "border-primary/60 bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {t(`cases.categories.${filter}`)}
              </button>
            ))}
          </div>
        </Reveal>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <Card className="glass-card-hover h-full">
                <CardContent className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-medium leading-snug">
                        {t(`cases.items.${item.id}.title`)}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {item.client} · {item.year}
                      </p>
                    </div>
                    <Badge variant="accent" className="shrink-0">
                      {t(`cases.categories.${item.category}`)}
                    </Badge>
                  </div>

                  <div className="mt-6 space-y-4 text-sm leading-relaxed">
                    <div>
                      <div className="label-uppercase mb-1.5 text-[0.55rem] text-muted-foreground">
                        {t("cases.before")}
                      </div>
                      <p className="text-muted-foreground">
                        {t(`cases.items.${item.id}.problem`)}
                      </p>
                    </div>
                    <div>
                      <div className="label-uppercase mb-1.5 text-[0.55rem] text-muted-foreground">
                        {t("cases.after")}
                      </div>
                      <p className="text-muted-foreground">
                        {t(`cases.items.${item.id}.solution`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-accent/25 bg-accent/8 p-4">
                    <TrendingUp
                      size={15}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="text-sm text-foreground/90">
                      {t(`cases.items.${item.id}.result`)}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/70 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {t("cases.open")}
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            {t("cases.empty")}
          </p>
        )}
      </div>
    </section>
  );
}
