import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, SearchX } from "lucide-react";
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

function ProjectCard({ project, onOpen, featured = false }: { project: Project; onOpen: () => void; featured?: boolean }) {
  const color = STATUS_COLOR[project.status] ?? "#5eead4";
  return (
    <motion.article
      layout
      exit={{ opacity: 0, scale: 0.97 }}
      className={clsx("card card-hover group relative flex flex-col overflow-hidden", featured && "md:col-span-2 lg:flex-row")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      {/* Faux "architecture preview" visual */}
      <button onClick={onOpen} aria-label={`View details for ${project.title}`} className={clsx("relative h-32 overflow-hidden border-b border-white/[0.06] bg-ink-900/60 text-left sm:h-36", featured && "lg:h-auto lg:min-h-72 lg:w-[44%] lg:border-b-0 lg:border-r")}>
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-3 sm:gap-2 sm:px-4">
          {project.workflow.slice(0, 4).map((w, i) => (
            <div key={w} className={clsx("items-center gap-2", i < 3 ? "flex" : "hidden sm:flex")}>
              <div
                className="rounded-md border border-white/10 bg-ink-800/90 px-2 py-1 font-mono text-xs text-white/65 transition-all duration-500 group-hover:border-white/25 group-hover:text-white/90"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {w.length > 14 ? w.slice(0, 13) + "…" : w}
              </div>
              {i < 3 && <span className="h-px w-3 bg-white/20" />}
            </div>
          ))}
          <span className="font-mono text-xs text-white/50">+{Math.max(0, project.workflow.length - 4)}</span>
        </div>
        <div
          className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
          style={{ background: color }}
        />
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-mono text-[13px]" style={{ color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
            {project.status}
          </span>
          <span className="text-white/20">·</span>
          <span className="font-mono text-[13px] text-white/60">{project.automationLevel}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{project.tagline}</p>

        {featured && project.capabilities?.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {project.capabilities.slice(0, 4).map((capability) => <li key={capability} className="flex gap-2 text-sm leading-relaxed text-white/70"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{capability}</li>)}
          </ul>
        ) : null}

        <div className="mt-5">
          <Pipeline steps={project.workflow.slice(0, 3)} accent={color} compact className="hidden sm:flex" />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t) => (
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
  const ordered = useMemo(() => [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))), [list]);

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
                "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-[13px] transition-all",
                tag === t
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-white/65" aria-live="polite">Showing <span className="font-semibold text-white">{list.length}</span> {list.length === 1 ? "project" : "projects"}{tag !== "All" ? ` tagged ${tag}` : ""}</p>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {ordered.map((p, i) => (
              <ProjectCard key={p.id} project={p} featured={i < 2 && p.featured} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
          {list.length === 0 && <div className="card col-span-full flex min-h-56 flex-col items-center justify-center p-8 text-center"><SearchX className="text-white/45" /><h3 className="mt-4 font-display text-xl font-semibold text-white">No matching systems</h3><p className="mt-2 text-sm text-white/65">Try another technology filter or return to all projects.</p><button onClick={() => setTag("All")} className="btn-ghost mt-5">Show all projects</button></div>}
        </motion.div>
      </div>

      <ProjectDetails project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
