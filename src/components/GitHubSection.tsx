import { motion } from "framer-motion";
import { ArrowUpRight, Github, Pin, Star } from "lucide-react";
import { github, pinnedRepos } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

function fmt(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toLocaleString("en", { month: "short", year: "numeric" });
}

export default function GitHubSection() {
  return (
    <section id="open-source" className="section">
      <div className="divider-glow" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Open Source / GitHub"
            title="Code, in the open."
            description="Pinned repositories and selected work. Repos are listed in github.json — pin, reorder or add new ones without touching a component."
          />
          <a href={github.profileUrl} target="_blank" rel="noreferrer" className="btn-ghost shrink-0">
            <Github size={16} /> @{github.username}
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pinnedRepos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              custom={i}
              className="card card-hover group relative flex flex-col overflow-hidden p-5"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Github size={15} className="text-white/45" />
                  <span className="font-mono text-[13px] text-white group-hover:text-accent">{repo.name}</span>
                </div>
                {repo.pinned && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-accent/80">
                    <Pin size={10} /> pinned
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{repo.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {repo.technologies.map((t) => (
                  <span key={t} className="chip py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[10.5px] text-white/35">updated {fmt(repo.lastUpdated)}</span>
                <span className="flex items-center gap-2 text-white/40">
                  {typeof repo.stars === "number" && (
                    <span className="flex items-center gap-1 font-mono text-[10.5px]">
                      <Star size={11} /> {repo.stars}
                    </span>
                  )}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
