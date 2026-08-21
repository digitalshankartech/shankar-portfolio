import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { LearningStatus } from "@/types";
import { learning } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";

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
  const [showAll, setShowAll] = useState(false);
  const items = useMemo(
    () =>
      (cat === "All" ? learning : learning.filter((l) => l.category === cat)).slice().sort((a, b) => {
        const s = STATUS[b.status].order - STATUS[a.status].order;
        return s !== 0 ? s : b.since.localeCompare(a.since);
      }),
    [cat]
  );
  const visibleItems = showAll ? items : items.slice(0, 6);

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
              <span key={s} className="flex items-center gap-1.5 text-[13px] text-white/65">
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
                "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-[13px] transition-all",
                cat === c ? "border-accent/50 bg-accent/10 text-accent" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.018] p-4 sm:p-6">
          <p className="eyebrow">Current focus</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">Actively applying {items.filter((item) => item.status === "Applying").slice(0, 3).map((item) => item.title).join(", ") || "new agentic engineering patterns"}, while keeping the complete learning inventory available below.</p>
        </div>

        <motion.ul layout className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
          {visibleItems.map((l) => {
            const s = STATUS[l.status];
            return (
              <motion.li
                key={l.id}
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="card card-hover group relative overflow-hidden p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.08em] text-white/55">{l.category}</p>
                    <h3 className="mt-1.5 font-display text-[15px] font-semibold text-white">{l.title}</h3>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-2 py-0.5 text-[12px]"
                    style={{ borderColor: `${s.color}55`, color: s.color, background: `${s.color}12` }}
                  >
                    {s.label}
                  </span>
                </div>
                {l.note && <p className="mt-3 text-sm leading-relaxed text-white/60">{l.note}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[12px] text-white/55">since {fmt(l.since)}</span>
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
          </AnimatePresence>
        </motion.ul>
        {items.length > 6 && <button type="button" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)} className="btn-ghost mt-6"><ChevronDown size={16} className={clsx("transition-transform", showAll && "rotate-180")} />{showAll ? "Show less" : `View all ${items.length} topics`}</button>}
      </div>
    </section>
  );
}
