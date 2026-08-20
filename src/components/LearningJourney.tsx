import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { LearningStatus } from "@/types";
import { learning } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

const STATUS: Record<LearningStatus, { color: string; label: string; order: number }> = {
  Exploring: { color: "#94a3b8", label: "Exploring", order: 0 },
  Learning: { color: "#fbbf24", label: "Learning", order: 1 },
  Applying: { color: "#22d3ee", label: "Applying", order: 2 },
  Comfortable: { color: "#5eead4", label: "Comfortable", order: 3 },
};

function fmt(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toLocaleString("en", { month: "short", year: "numeric" });
}

export default function LearningJourney() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(learning.map((l) => l.category)))], []);
  const [cat, setCat] = useState("All");
  const items = useMemo(
    () =>
      (cat === "All" ? learning : learning.filter((l) => l.category === cat)).slice().sort((a, b) => {
        const s = STATUS[b.status].order - STATUS[a.status].order;
        return s !== 0 ? s : b.since.localeCompare(a.since);
      }),
    [cat]
  );

  return (
    <section id="learning" className="section">
      <div className="divider-glow" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Currently Exploring"
            title="A portfolio that keeps moving."
            description="What I'm learning, applying and getting comfortable with right now. This list lives in learning.json and changes as my work does."
          />
          <div className="flex flex-wrap items-center gap-4">
            {(Object.keys(STATUS) as LearningStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5 font-mono text-[11px] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[s].color }} />
                {STATUS[s].label}
              </span>
            ))}
          </div>
        </div>

        <div className="-mx-4 mt-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter learning topics">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={clsx(
                "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-all",
                cat === c ? "border-accent/50 bg-accent/10 text-accent" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((l, i) => {
            const s = STATUS[l.status];
            return (
              <motion.li
                key={l.id}
                layout
                variants={fadeUp}
                custom={i}
                className="card card-hover group relative overflow-hidden p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{l.category}</p>
                    <h3 className="mt-1.5 font-display text-[15px] font-semibold text-white">{l.title}</h3>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px]"
                    style={{ borderColor: `${s.color}55`, color: s.color, background: `${s.color}12` }}
                  >
                    {s.label}
                  </span>
                </div>
                {l.note && <p className="mt-3 text-sm leading-relaxed text-white/60">{l.note}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] text-white/35">since {fmt(l.since)}</span>
                  <div className="flex gap-1" aria-label={`Progress: ${s.label}`}>
                    {[0, 1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="h-1 w-4 rounded-full transition-colors"
                        style={{ background: n <= s.order ? s.color : "rgba(255,255,255,0.1)" }}
                      />
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
