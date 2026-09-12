import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import Reveal from "@/components/features/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveLead } from "@/lib/leads";

type FormState = "idle" | "sending" | "success";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contact.trim() || !task.trim()) {
      setError("Заполните все три поля — так я сразу пойму, о чём речь.");
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
            <div className="label-uppercase text-primary">Заявка</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Расскажите, что
              <span className="text-gradient"> отнимает время</span>
            </h2>
            <div className="hairline mt-6 w-16" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Опишите задачу своими словами — без технических терминов. Отвечу в
              течение дня и честно скажу, стоит ли это делать и сколько займёт.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Первый разговор — бесплатно",
                "Фиксированная цена до начала работ",
                "Мелкие правки после запуска без счёта",
              ].map((item) => (
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
                      Заявка принята
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      Свяжусь с вами в течение дня. Если вопрос срочный —
                      напишите в Telegram, там отвечаю быстрее.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-8"
                      onClick={() => setState("idle")}
                    >
                      Отправить ещё одну
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="lead-name">Как вас зовут</Label>
                      <Input
                        id="lead-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Павел"
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-contact">
                        Telegram, почта или телефон
                      </Label>
                      <Input
                        id="lead-contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="@username или mail@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-task">Что нужно сделать</Label>
                      <Textarea
                        id="lead-task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Например: заявки приходят в почту и Telegram, теряются. Хочу, чтобы всё падало в одну таблицу и приходило уведомление."
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
                          Отправляю…
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <ArrowRight size={17} />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Никакого спама и передачи контактов третьим лицам.
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
