import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Boxes, Github, Lightbulb, ListChecks, Target, Workflow } from "lucide-react";
import clsx from "clsx";
import { caseStudies } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";
import Pipeline from "@/components/ui/Pipeline";
import { MediaGallery } from "@/components/ProjectDetails";
import { fadeUp, viewport } from "@/lib/motion";

function StudyBlock({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("card p-5 sm:p-6", className)}>
      <p className="eyebrow mb-3 flex items-center gap-2">
        <Icon size={13} />
        {label}
      </p>
      {children}
    </div>
  );
}

export default function CaseStudy() {
  const [activeId, setActiveId] = useState(caseStudies[0]?.id);
  const study = caseStudies.find((c) => c.id === activeId) ?? caseStudies[0];

  if (!study) return null;

  return (
    <section id="case-studies" className="section">
      <div className="divider-glow" />
      <Glow className="-right-40 top-1/3 h-[560px] w-[560px]" color="rgba(34,211,238,0.08)" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="Case Studies"
          title="The full story: problem, process, system, result."
          description="A repeatable template for every system I build — what was manual, where the automation opportunity was, what I actually built, and what I learned. Written from system capabilities, never invented metrics."
        />

        {/* Selector */}
        <div className="mt-10 flex flex-wrap gap-2">
          {caseStudies.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={clsx(
                "rounded-full border px-4 py-2 text-left text-[13px] transition-all",
                activeId === c.id
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        <motion.div
          key={study.id}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-8"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="card relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative flex flex-wrap items-center gap-2">
              {study.status && <span className="chip border-accent/30 text-accent">{study.status}</span>}
              {study.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="relative mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">{study.title}</h3>
            <p className="relative mt-2 text-white/60">{study.subtitle}</p>
          </motion.div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <motion.div variants={fadeUp} custom={1}>
              <StudyBlock icon={AlertTriangle} label="The Problem">
                <p className="text-sm leading-relaxed text-white/75">{study.problem}</p>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}>
              <StudyBlock icon={ListChecks} label="The Old Manual Process">
                <ol className="space-y-2">
                  {study.oldProcess.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-white/70">
                      <span className="font-mono text-xs text-white/55">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={3}>
              <StudyBlock icon={Target} label="The Automation Opportunity">
                <p className="text-sm leading-relaxed text-white/75">{study.opportunity}</p>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <StudyBlock icon={Boxes} label="The System I Built">
                <p className="text-sm leading-relaxed text-white/75">{study.system}</p>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="lg:col-span-2">
              <StudyBlock icon={Workflow} label="System Architecture">
                <Pipeline steps={study.architecture} />
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={6}>
              <StudyBlock icon={ArrowRight} label="Result / Output">
                <ul className="space-y-2">
                  {study.result.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-white/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={7}>
              <StudyBlock icon={Lightbulb} label="What I Learned">
                <ul className="space-y-2">
                  {study.learned.map((l) => (
                    <li key={l} className="flex gap-2 text-sm text-white/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-amber" />
                      {l}
                    </li>
                  ))}
                </ul>
              </StudyBlock>
            </motion.div>

            <motion.div variants={fadeUp} custom={8} className="lg:col-span-2">
              <StudyBlock icon={Boxes} label="Technologies">
                <div className="flex flex-wrap gap-1.5">
                  {study.technologies.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </StudyBlock>
            </motion.div>

            {study.codeSnippet && (
              <motion.div variants={fadeUp} custom={9} className="lg:col-span-2">
                <details className="card group overflow-hidden">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-sm font-medium text-white marker:hidden">
                    <span>View technical implementation: {study.codeSnippet.title ?? "Code snippet"}</span>
                    <span className="chip py-0.5">{study.codeSnippet.language}</span>
                  </summary>
                  <pre className="overflow-x-auto border-t border-white/[0.06] p-5 font-mono text-[13px] leading-relaxed text-white/80">
                    <code>{study.codeSnippet.code}</code>
                  </pre>
                </details>
              </motion.div>
            )}

            {study.media && study.media.length > 0 && (
              <motion.div variants={fadeUp} custom={10} className="lg:col-span-2">
                <div className="card p-5 sm:p-6">
                  <MediaGallery items={study.media} title="Screenshots & Diagrams" />
                </div>
              </motion.div>
            )}
          </div>

          {study.github && (
            <motion.div variants={fadeUp} custom={11} className="mt-4">
              <a href={study.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={16} /> View code
              </a>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="mt-6 text-xs text-white/50"
        >
          Template lives in case-studies.json — add a new object and it renders here automatically.
        </motion.p>
      </div>
    </section>
  );
}
