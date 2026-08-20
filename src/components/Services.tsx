import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  BrainCircuit,
  Database,
  Globe,
  Layers,
  Sparkles,
  Workflow,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { services } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";
import { fadeUp, viewport } from "@/lib/motion";

/** Icons referenced by name from services.json — add new entries here when adding a service. */
const ICONS: Record<string, React.ElementType> = {
  Bot,
  BrainCircuit,
  Database,
  Globe,
  Layers,
  Sparkles,
  Workflow,
  Wrench,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} size={18} />;
}

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id ?? null);
  return (
    <section id="services" className="section">
      <div className="divider-glow" />
      <Glow className="right-0 top-1/4 h-[500px] w-[500px]" color="rgba(94,234,212,0.07)" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="How I Can Help"
          title="Freelance & consulting — built around your workflow."
          description="For founders, teams and recruiters: each service starts from a real problem, shows what I can build, and what the outcome looks like. Scope is always defined together before any build."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              variants={fadeUp}
              custom={i}
              className="card card-hover group relative flex flex-col overflow-hidden p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                aria-expanded={expanded === s.id}
                aria-controls={`service-${s.id}`}
                onClick={() => setExpanded((value) => value === s.id ? null : s.id)}
                className="flex min-h-11 w-full items-center gap-3 text-left md:pointer-events-none"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3 className="flex-1 font-display text-[16px] font-semibold leading-tight text-white">{s.title}</h3>
                <ChevronDown size={17} className={`text-white/50 transition-transform md:hidden ${expanded === s.id ? "rotate-180" : ""}`} />
              </button>

              <motion.div
                id={`service-${s.id}`}
                initial={false}
                className={`mt-5 flex flex-1 flex-col gap-3 ${expanded === s.id ? "flex" : "hidden md:flex"}`}
              >
                <div>
                  <p className="eyebrow mb-1 text-white/45">Problem</p>
                  <p className="text-sm leading-relaxed text-white/70">“{s.problem}”</p>
                </div>
                <ArrowDown size={14} className="text-white/25" />
                <div>
                  <p className="eyebrow mb-1.5 text-accent/80">What I can build</p>
                  <ul className="space-y-1">
                    {s.build.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowDown size={14} className="text-white/25" />
                <div>
                  <p className="eyebrow mb-1 text-white/45">Possible outcome</p>
                  <p className="text-sm leading-relaxed text-white/70">{s.outcome}</p>
                </div>
              </motion.div>

              <div className={`mt-5 items-center justify-between border-t border-white/[0.06] pt-4 ${expanded === s.id ? "flex" : "hidden md:flex"}`}>
                <div className="flex flex-wrap items-center gap-1.5">
                  {s.tags?.slice(0, 3).map((t, idx) => (
                    <span key={t} className="flex items-center gap-1.5">
                      {idx > 0 && <span className="text-white/20">·</span>}
                      <span className="font-mono text-[10px] text-white/40">{t}</span>
                    </span>
                  ))}
                </div>
                <a href="#contact" className="flex items-center gap-1 text-xs font-medium text-white/70 transition hover:text-accent">
                  Discuss <ArrowRight size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
