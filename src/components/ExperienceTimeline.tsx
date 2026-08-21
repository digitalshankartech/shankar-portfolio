import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, TrendingUp } from "lucide-react";
import clsx from "clsx";
import { experience } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";

function Block({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="eyebrow mb-2 text-white/50">{title}</p>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm leading-relaxed text-white/75">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceTimeline() {
  const [open, setOpen] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="section">
      <div className="divider-glow" />
      <Glow className="-left-32 bottom-0 h-[500px] w-[500px]" color="rgba(167,139,250,0.08)" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="Experience"
            title="From frontend intern to building systems that act."
            description="Each role is described by the problems solved, the systems built and what changed in how I work — not by job-description bullet points."
          />
        </div>

        <ol className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-white/15 to-transparent" aria-hidden />
          {experience.map((e, i) => {
            const on = open === e.id;
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="relative pl-10 pb-6 last:pb-0"
              >
                <span
                  className={clsx(
                    "absolute left-0 top-5 grid h-6 w-6 place-items-center rounded-full border bg-ink-950",
                    e.current ? "border-accent/70" : "border-white/20"
                  )}
                  aria-hidden
                >
                  <span
                    className={clsx("h-2 w-2 rounded-full", e.current ? "bg-accent" : "bg-white/40")}
                    style={e.current ? { boxShadow: "0 0 12px #5eead4" } : undefined}
                  />
                  {e.current && <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />}
                </span>

                <div className={clsx("card overflow-hidden transition-all", on && "border-white/[0.14] bg-white/[0.04]")}>
                  <button
                    onClick={() => setOpen((v) => (v === e.id ? null : e.id))}
                    aria-expanded={on}
                    aria-controls={`experience-${e.id}`}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[13px] text-accent/90">{e.period}</span>
                        {e.current && <span className="chip border-accent/30 py-0.5 text-accent">Current</span>}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold text-white">{e.role}</h3>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-white/60">
                        <span className="font-medium text-white/80">{e.company}</span>
                        {e.location && (
                          <span className="flex items-center gap-1 text-white/45">
                            <MapPin size={12} /> {e.location}
                          </span>
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {e.focus.map((f) => (
                          <span key={f} className="chip">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={clsx("mt-1 shrink-0 text-white/50 transition-transform", on && "rotate-180 text-white")}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`experience-${e.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 border-t border-white/[0.06] p-5 sm:grid-cols-2 sm:p-6">
                          <Block title="Problems solved" items={e.problemsSolved} />
                          <Block title="Systems built" items={e.systemsBuilt} />
                          <div className="sm:col-span-2">
                            <p className="eyebrow mb-2 text-white/50">Technologies</p>
                            <div className="flex flex-wrap gap-1.5">
                              {e.technologies.map((t) => (
                                <span key={t} className="chip">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          {e.growth && (
                            <p className="flex gap-2 rounded-xl border border-accent/15 bg-accent/[0.04] p-4 text-sm text-white/75 sm:col-span-2">
                              <TrendingUp size={16} className="mt-0.5 shrink-0 text-accent" />
                              <span>
                                <span className="font-medium text-white">Growth: </span>
                                {e.growth}
                              </span>
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
