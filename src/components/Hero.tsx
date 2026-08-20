import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, BriefcaseBusiness, Download, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/content";
import Glow from "@/components/ui/Glow";

const FLOW = [
  { id: "input", label: "Input", sub: "task · form · webhook" },
  { id: "reasoning", label: "AI Reasoning", sub: "plan · analyze · decide" },
  { id: "tools", label: "Tools", sub: "tool calling · MCP" },
  { id: "world", label: "Browser / APIs / DB", sub: "act on real systems" },
  { id: "output", label: "Real-World Output", sub: "report · action · notify" },
];

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [reduce, words.length]);
  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text max-w-full"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Animated background: a vertical pipeline with a travelling signal. */
function FlowBackdrop({ active }: { active: number }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60 mask-fade-y" />
      <Glow className="-left-40 top-0 h-[560px] w-[560px]" color="rgba(94,234,212,0.16)" />
      <Glow className="-right-40 top-1/3 h-[520px] w-[520px]" color="rgba(167,139,250,0.16)" />

      {/* Right-side pipeline (desktop) */}
      <div className="absolute right-[6%] top-1/2 hidden -translate-y-1/2 xl:block">
        <div className="relative flex flex-col items-start gap-6">
          <div className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          {!reduce && (
            <motion.div
              className="absolute left-[10px] h-2 w-2 rounded-full bg-accent"
              style={{ boxShadow: "0 0 18px 4px rgba(94,234,212,0.6)" }}
              animate={{ top: ["2%", "96%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {FLOW.map((n, i) => {
            const on = i === active;
            return (
              <div key={n.id} className="relative flex items-center gap-4">
                <span
                  className="relative z-10 grid h-7 w-7 place-items-center rounded-full border transition-all duration-500"
                  style={{
                    borderColor: on ? "rgba(94,234,212,0.8)" : "rgba(255,255,255,0.12)",
                    background: on ? "rgba(94,234,212,0.12)" : "rgba(10,12,18,0.9)",
                    boxShadow: on ? "0 0 24px rgba(94,234,212,0.35)" : "none",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                    style={{ background: on ? "#5eead4" : "rgba(255,255,255,0.3)" }}
                  />
                </span>
                <div
                  className="rounded-xl border px-3.5 py-2 transition-all duration-500"
                  style={{
                    borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
                    background: on ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.015)",
                    transform: on ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <p className="font-mono text-[11px] tracking-wider text-white">{n.label}</p>
                  <p className="font-mono text-[10px] text-white/40">{n.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit rings */}
      <div className="absolute -right-[10%] top-[10%] hidden h-[720px] w-[720px] rounded-full border border-white/[0.04] xl:block" />
      <div className="absolute -right-[2%] top-[22%] hidden h-[460px] w-[460px] rounded-full border border-white/[0.05] xl:block" />
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % FLOW.length), 1400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32 [@media(max-height:650px)]:min-h-0 [@media(max-height:650px)]:py-24">
      <FlowBackdrop active={active} />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-accent-violet/35 bg-ink-800 p-0.5 shadow-[0_0_28px_-10px_rgba(244,114,182,0.65)] sm:h-14 sm:w-14">
              <img
                src={profile.portrait}
                alt="Portrait of Shankar Kumar"
                width="56"
                height="56"
                fetchPriority="high"
                className="h-full w-full rounded-[0.8rem] object-cover object-top"
              />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white sm:text-base">Hi, I&apos;m {profile.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/55 sm:text-sm">
                <BriefcaseBusiness size={13} className="shrink-0 text-accent-violet" aria-hidden />
                Software Developer at 11MINDS
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 font-mono text-xs tracking-wide text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[16ch] font-display text-[clamp(2.25rem,10.5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white"
          >
            Building AI Agents That Don&apos;t Just Answer —{" "}
            <span className="gradient-text">They Act.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 font-display text-xl text-white/70 sm:text-2xl"
          >
            I build <RotatingWord words={profile.heroRotating} /> that perform real business work.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lead mt-5 max-w-2xl"
          >
            {profile.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center sm:mt-9"
          >
            <a href="#projects" className="btn-primary group">
              Explore My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Build Something
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 flex flex-wrap items-center gap-1"
            aria-label="Profile links"
          >
            <a
              href={profile.resume}
              download="Shankar_Kumar_Resume.docx"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Download size={15} aria-hidden /> Download resume
            </a>
            <span className="h-4 w-px bg-white/10" aria-hidden />
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full text-white/50 transition hover:bg-white/[0.04] hover:text-accent">
              <Github size={17} aria-hidden />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full text-white/50 transition hover:bg-white/[0.04] hover:text-accent-violet">
              <Linkedin size={17} aria-hidden />
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } } }}
            className="mt-9 grid grid-cols-1 gap-x-6 gap-y-3 min-[420px]:grid-cols-2 sm:mt-12 sm:flex sm:flex-wrap"
            aria-label="Focus areas"
          >
            {profile.indicators.map((t, i) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="group flex cursor-default items-center gap-2 font-mono text-[12px] tracking-wide text-white/60 transition hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all group-hover:scale-150"
                  style={{
                    background: ["#5eead4", "#22d3ee", "#a78bfa", "#fbbf24", "#f472b6"][i % 5],
                    boxShadow: `0 0 10px ${["#5eead4", "#22d3ee", "#a78bfa", "#fbbf24", "#f472b6"][i % 5]}`,
                  }}
                />
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Mobile pipeline strip */}
        <div className="mt-10 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2 min-[480px]:flex min-[480px]:flex-wrap min-[480px]:items-center xl:hidden" aria-label="Agent workflow">
          {FLOW.map((n, i) => (
            <div key={n.id} className="flex min-w-0 items-center gap-2">
              <span
                className="min-w-0 rounded-md border px-2 py-1.5 font-mono text-[10px] leading-tight transition-colors duration-500"
                style={{
                  borderColor: i === active ? "rgba(94,234,212,0.6)" : "rgba(255,255,255,0.08)",
                  color: i === active ? "#5eead4" : "rgba(255,255,255,0.5)",
                }}
              >
                {n.label}
              </span>
              {i < FLOW.length - 1 && <ArrowRight size={10} className="text-white/25" />}
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#build"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/40 transition hover:text-white sm:block"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
