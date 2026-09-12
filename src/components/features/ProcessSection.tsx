import Reveal from "@/components/features/Reveal";
import { processSteps } from "@/data/services";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-border/50 bg-surface/30 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="label-uppercase text-accent">Как работаем</div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            От разговора до запуска — четыре шага
          </h2>
          <div className="hairline mt-6 w-16" />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.09}>
              <div className="relative h-full">
                {/* Соединительная линия между шагами */}
                {i < processSteps.length - 1 && (
                  <div
                    className="absolute left-12 right-0 top-5 hidden h-px lg:block"
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(var(--line)), transparent)",
                    }}
                    aria-hidden
                  />
                )}

                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-ink font-display text-sm font-semibold text-primary">
                  {step.step}
                </div>

                <h3 className="mt-6 font-display text-lg font-medium">
                  {step.title}
                </h3>
                <div className="label-uppercase mt-2 text-[0.55rem] text-muted-foreground">
                  {step.duration}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
