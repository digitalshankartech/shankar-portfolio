import { Github, ExternalLink, CheckCircle2, Lightbulb } from "lucide-react";
import type { Project, MediaItem } from "@/types";
import Modal from "@/components/ui/Modal";
import Pipeline from "@/components/ui/Pipeline";

function Media({ item }: { item: MediaItem }) {
  if (item.type === "youtube") {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe
          className="h-full w-full"
          src={item.src}
          title={item.caption ?? "Video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (item.type === "video") {
    return (
      <video className="w-full rounded-xl border border-white/10" controls preload="metadata" src={item.src}>
        {item.caption}
      </video>
    );
  }
  return (
    <figure>
      <img src={item.src} alt={item.alt ?? ""} loading="lazy" className="w-full rounded-xl border border-white/10" />
      {item.caption && <figcaption className="mt-2 text-xs text-white/50">{item.caption}</figcaption>}
    </figure>
  );
}

export function MediaGallery({ items, title }: { items?: MediaItem[]; title: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((m, i) => (
          <Media key={m.src + i} item={m} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetails({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Modal open={!!project} onClose={onClose} labelledBy="project-title">
      {project && (
        <div className="px-5 pb-6 pt-0 sm:px-10 sm:pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-accent/30 text-accent">{project.status}</span>
            <span className="chip">{project.automationLevel}</span>
            {project.year && <span className="chip">{project.year}</span>}
          </div>
          <h3 id="project-title" className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-white/60">{project.tagline}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-white/75">{project.description}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="card p-5">
              <p className="eyebrow mb-2">Problem</p>
              <p className="text-sm leading-relaxed text-white/75">{project.problem}</p>
            </div>
            <div className="card p-5">
              <p className="eyebrow mb-2">Solution</p>
              <p className="text-sm leading-relaxed text-white/75">{project.solution}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-3">Workflow</p>
            <Pipeline steps={project.workflow} />
          </div>

          {project.architecture && project.architecture.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">Architecture</p>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {project.architecture.map((a, i) => (
                  <div
                    key={a.layer}
                    className="grid gap-1 border-b border-white/[0.06] px-4 py-3 text-sm last:border-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4"
                    style={{ background: i % 2 ? "rgba(255,255,255,0.015)" : "transparent" }}
                  >
                    <span className="font-mono text-[12px] text-accent/90">{a.layer}</span>
                    <span className="text-white/70">{a.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {project.capabilities && (
              <div>
                <p className="eyebrow mb-3">System capabilities</p>
                <ul className="space-y-2">
                  {project.capabilities.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-white/75">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.keyLearnings && (
              <div>
                <p className="eyebrow mb-3">Key learnings</p>
                <ul className="space-y-2">
                  {project.keyLearnings.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-white/75">
                      <Lightbulb size={15} className="mt-0.5 shrink-0 text-accent-amber" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-8">
            <MediaGallery items={project.screenshots} title="Screenshots" />
            <MediaGallery items={project.videos} title="Videos" />
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-3">Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {(project.github || project.live) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Github size={16} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink size={16} /> Live demo
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
