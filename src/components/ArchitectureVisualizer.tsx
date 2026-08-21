import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { architecture } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";

export default function ArchitectureVisualizer() {
  const [activeId, setActiveId] = useState(architecture[1]?.id ?? architecture[0].id);
  const active = architecture.find((l) => l.id === activeId) ?? architecture[0];

  return (
    <section id="architecture" className="section overflow-hidden">
      <div className="divider-glow" />
      <Glow className="right-0 top-0 h-[500px] w-[500px]" color="rgba(94,234,212,0.08)" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="System Architecture"
          title="How the pieces fit together."
          description="Every agentic system I build follows the same layered shape. Select a layer to see the tools and responsibilities at that level."
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          {/* Stack */}
          <ol className="relative mx-auto w-full max-w-md space-y-2" aria-label="Architecture layers">
            {architecture.map((layer, i) => {
              const on = layer.id === activeId;
              return (
                <li key={layer.id} className="relative">
                  <button
                    onClick={() => setActiveId(layer.id)}
                    aria-pressed={on}
                    aria-controls="architecture-detail"
                    className={clsx(
                      "group relative min-h-11 w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 sm:px-5",
                      on
                        ? "border-white/[0.18] bg-white/[0.05]"
                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.03]"
                    )}
                    style={on ? { boxShadow: `0 0 50px -15px ${layer.color}66` } : undefined}
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1 transition-opacity"
                      style={{ background: layer.color, opacity: on ? 1 : 0.25 }}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[13px] text-white/55">0{i + 1}</span>
                        <div>
                          <p className={clsx("font-display text-[15px] font-semibold", on ? "text-white" : "text-white/75")}>
                            {layer.title}
                          </p>
                          <p className="text-[13px] text-white/65">{layer.short}</p>
                        </div>
                      </div>
                      <span
                        className="h-2 w-2 rounded-full transition-all"
                        style={{
                          background: layer.color,
                          boxShadow: on ? `0 0 12px ${layer.color}` : "none",
                          opacity: on ? 1 : 0.4,
                        }}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {layer.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-md border border-white/[0.08] px-2 py-0.5 font-mono text-xs text-white/65"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </button>
                  {i < architecture.length - 1 && (
                    <div className="flex justify-center py-0.5 text-white/20" aria-hidden>
                      <ChevronDown size={14} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                id="architecture-detail"
                aria-live="polite"
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="card relative overflow-hidden p-5 sm:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl"
                  style={{ background: active.color }}
                />
                <p className="eyebrow" style={{ color: active.color }}>
                  Layer · {active.title}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">{active.short}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{active.description}</p>

                <p className="eyebrow mt-7 mb-3 text-white/60">What I have worked with</p>
                <ul className="space-y-2.5">
                  {active.experience.map((e, i) => (
                    <motion.li
                      key={e}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex gap-2.5 text-sm text-white/80"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: active.color }} />
                      {e}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
