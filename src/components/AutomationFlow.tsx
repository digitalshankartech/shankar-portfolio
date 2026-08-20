import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText, Eye, Repeat, Bot, Wrench, Database, BrainCircuit, FileOutput, UserCheck,
} from "lucide-react";
import clsx from "clsx";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";

const NODES = [
  { id: "manual", label: "Manual Process", icon: FileText, hint: "How work is done today — clicks, copies, checks." },
  { id: "understand", label: "Understand the Workflow", icon: Eye, hint: "Map every step, input, decision and output." },
  { id: "repeat", label: "Identify Repetitive Tasks", icon: Repeat, hint: "Find what is deterministic vs. what needs judgement." },
  { id: "agent", label: "AI Agent / Automation Logic", icon: Bot, hint: "Design the agent loop or workflow that owns the task." },
  { id: "tools", label: "Tools + APIs + Browser", icon: Wrench, hint: "Give the system hands: Playwright, APIs, MCP, databases." },
  { id: "data", label: "Data Processing", icon: Database, hint: "Clean, structure and store what was collected." },
  { id: "analysis", label: "AI Analysis", icon: BrainCircuit, hint: "LLM analysis with structured outputs." },
  { id: "output", label: "Automated Output", icon: FileOutput, hint: "Reports, presentations, actions, notifications." },
  { id: "human", label: "Human Approval (when needed)", icon: UserCheck, hint: "Control stays where it actually matters." },
];

export default function AutomationFlow() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (hover !== null || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % NODES.length), 1500);
    return () => clearInterval(t);
  }, [hover, reduce]);

  const current = hover ?? active;

  return (
    <section id="process" className="section overflow-hidden">
      <div className="divider-glow" />
      <Glow className="-right-32 top-1/3 h-[600px] w-[600px]" color="rgba(167,139,250,0.1)" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="How I Think About Automation"
            title="From Manual Workflows to Intelligent Systems"
            description="My goal is not simply to connect tools. I analyze how work is currently done, identify repetitive and high-effort tasks, and design systems that can automate as much of the workflow as possible while keeping human control where it actually matters."
          />
          <motion.div
            key={NODES[current].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            id="automation-step-detail"
            aria-live="polite"
            className="card mt-10 p-5"
          >
            <p className="eyebrow mb-2">
              Step {String(current + 1).padStart(2, "0")} / {String(NODES.length).padStart(2, "0")}
            </p>
            <p className="font-display text-lg font-semibold text-white">{NODES[current].label}</p>
            <p className="mt-1.5 text-sm text-white/60">{NODES[current].hint}</p>
          </motion.div>
        </div>

        {/* Flow graph */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            {/* vertical connector */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-white/10 sm:left-7" aria-hidden>
              {!reduce && (
                <motion.span
                  className="absolute left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent to-transparent"
                  animate={{ top: ["-10%", "100%"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <ol className="relative space-y-3">
              {NODES.map((n, i) => {
                const Icon = n.icon;
                const on = i === current;
                const done = i < current;
                return (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="relative"
                  >
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-pressed={i === active}
                    aria-describedby="automation-step-detail"
                    onClick={() => setActive(i)}
                    className={clsx(
                      "group relative flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl border py-2.5 pl-2 pr-3 text-left transition-all duration-300 sm:gap-5 sm:pr-4",
                      on
                        ? "border-white/[0.16] bg-white/[0.05] shadow-glow"
                        : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={clsx(
                        "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 sm:h-11 sm:w-11",
                        on
                          ? "border-accent/70 bg-accent/15 text-accent"
                          : done
                            ? "border-white/20 bg-ink-800 text-white/70"
                            : "border-white/10 bg-ink-900 text-white/40"
                      )}
                      style={on ? { boxShadow: "0 0 28px rgba(94,234,212,0.35)" } : undefined}
                    >
                      <Icon size={16} />
                      {on && !reduce && (
                        <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className={clsx("text-sm font-medium transition-colors sm:text-[15px]", on ? "text-white" : "text-white/65")}>
                        {n.label}
                      </p>
                    </div>
                    {i === NODES.length - 1 && (
                      <span className="ml-auto chip border-accent-amber/30 text-accent-amber">control</span>
                    )}
                  </button>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
