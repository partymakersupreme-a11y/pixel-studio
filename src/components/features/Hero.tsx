import { motion } from "framer-motion";
import { ArrowRight, Bot, Workflow, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Workflow, label: "n8n-воркфлоу" },
  { icon: Bot, label: "Telegram-боты" },
  { icon: Store, label: "Shopify и сайты" },
];

export default function Hero() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const scrollToCases = () =>
    document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
      {/* Фон: сетка + два световых пятна */}
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <div
        className="absolute -top-40 left-1/4 h-[420px] w-[420px] animate-glow-pulse rounded-full blur-[120px]"
        style={{ background: "hsl(var(--brand-violet) / 0.32)" }}
        aria-hidden
      />
      <div
        className="absolute -right-20 top-1/3 h-[360px] w-[360px] animate-glow-pulse rounded-full blur-[130px]"
        style={{ background: "hsl(var(--brand-cyan) / 0.18)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="label-uppercase text-[0.6rem] text-muted-foreground">
              Версилия, Италия — беру проекты
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Делаю так, чтобы
            <br />
            рутина работала
            <br />
            <span className="text-gradient">без вас</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Автоматизирую заявки, счета и отчёты, собираю сайты и Telegram-ботов,
            связываю магазин со складом и CRM. Вы занимаетесь делом — система
            делает остальное.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="gradient" size="lg" onClick={scrollToContact}>
                Обсудить проект
                <ArrowRight size={18} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" onClick={scrollToCases}>
                Посмотреть кейсы
              </Button>
            </motion.div>
          </motion.div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4">
            {highlights.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <Icon size={16} className="text-primary" />
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
