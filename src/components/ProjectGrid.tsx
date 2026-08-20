import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import clsx from "clsx";
import type { Project } from "@/types";
import { allProjectTags, projects } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Pipeline from "@/components/ui/Pipeline";
import Glow from "@/components/ui/Glow";
import ProjectDetails from "@/components/ProjectDetails";

const STATUS_COLOR: Record<string, string> = {
  Production: "#5eead4",
  "In Progress": "#fbbf24",
  Prototype: "#a78bfa",
  Concept: "#94a3b8",
  Archived: "#64748b",
};

function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const color = STATUS_COLOR[project.status] ?? "#5eead4";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="card card-hover group relative flex flex-col overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      {/* Faux "architecture preview" visual */}
      <div className="relative h-32 overflow-hidden border-b border-white/[0.06] bg-ink-900/60 sm:h-36">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-3 sm:gap-2 sm:px-4">
          {project.workflow.slice(0, 4).map((w, i) => (
            <div key={w} className={clsx("items-center gap-2", i < 3 ? "flex" : "hidden sm:flex")}>
              <div
                className="rounded-md border border-white/10 bg-ink-800/90 px-2 py-1 font-mono text-[9px] text-white/60 transition-all duration-500 group-hover:border-white/25 group-hover:text-white/90"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {w.length > 14 ? w.slice(0, 13) + "…" : w}
              </div>
              {i < 3 && <span className="h-px w-3 bg-white/20" />}
            </div>
          ))}
          <span className="font-mono text-[10px] text-white/30">+{Math.max(0, project.workflow.length - 4)}</span>
        </div>
        <div
          className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
          style={{ background: color }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
            {project.status}
          </span>
          <span className="text-white/20">·</span>
          <span className="font-mono text-[11px] text-white/50">{project.automationLevel}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{project.tagline}</p>

        <div className="mt-5">
          <Pipeline steps={project.workflow.slice(0, 3)} accent={color} compact className="hidden sm:flex" />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <button
            onClick={onOpen}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-white transition hover:text-accent"
          >
            View system
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="grid h-11 w-11 place-items-center rounded-lg text-white/50 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectGrid() {
  const [tag, setTag] = useState<string>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(
    () => (tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag))),
    [tag]
  );

  return (
    <section id="projects" className="section">
      <div className="divider-glow" />
      <Glow className="-left-40 top-1/2 h-[600px] w-[600px]" color="rgba(34,211,238,0.08)" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured Projects"
            title="Systems that do real work."
            description="Each project is described by its problem, the system, the workflow it automates, and what it can do — no invented metrics. Data lives in projects.json, so new work drops in without touching the UI."
          />
        </div>

        <div className="-mx-4 mt-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-10 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter projects by tag">
          {["All", ...allProjectTags].map((t) => (
            <button
              key={t}
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={clsx(
                "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-all",
                tag === t
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectDetails project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
