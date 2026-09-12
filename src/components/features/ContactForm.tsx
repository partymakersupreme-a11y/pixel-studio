import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import Reveal from "@/components/features/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveLead } from "@/lib/leads";

type FormState = "idle" | "sending" | "success";

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const bullets = t("contact.bullets", { returnObjects: true }) as string[];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contact.trim() || !task.trim()) {
      setError(t("contact.errorRequired"));
      return;
    }

    setError("");
    setState("sending");

    const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL as
      | string
      | undefined;
    const formspreeUrl = import.meta.env.VITE_LEAD_FORMSPREE_URL as
      | string
      | undefined;

    // Уведомления — лучшее усилие, не блокируют сохранение заявки ниже.
    const notify = (endpoint: string) =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, contact, task }),
      }).catch(() => {
        // Заявка всё равно сохранится ниже — не блокируем клиента из-за
        // сетевой ошибки, но стоит проверить адрес вебхука/Formspree.
      });

    await Promise.all(
      [webhookUrl, formspreeUrl].filter(Boolean).map((url) => notify(url as string))
    );

    await saveLead({ name, contact, task });

    setState("success");
    setName("");
    setContact("");
    setTask("");
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="label-uppercase text-primary">{t("contact.label")}</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {t("contact.heading1")}
              <span className="text-gradient">{t("contact.headingGradient")}</span>
            </h2>
            <div className="hairline mt-6 w-16" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("contact.description")}
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <CardContent className="p-7 lg:p-8">
                {state === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                      <CheckCircle2 size={26} className="text-emerald-400" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-medium">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {t("contact.successBody")}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-8"
                      onClick={() => setState("idle")}
                    >
                      {t("contact.sendAnother")}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="lead-name">{t("contact.nameLabel")}</Label>
                      <Input
                        id="lead-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("contact.namePlaceholder")}
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-contact">
                        {t("contact.contactLabel")}
                      </Label>
                      <Input
                        id="lead-contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder={t("contact.contactPlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-task">{t("contact.taskLabel")}</Label>
                      <Textarea
                        id="lead-task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder={t("contact.taskPlaceholder")}
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full"
                      disabled={state === "sending"}
                    >
                      {state === "sending" ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          {t("contact.submit")}
                          <ArrowRight size={17} />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t("contact.privacyNote")}
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
