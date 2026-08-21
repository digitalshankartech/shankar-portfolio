import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { profile } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";
import { fadeUp, viewport } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="divider-glow" />
      <Glow className="-left-32 top-1/4 h-[520px] w-[520px]" color="rgba(167,139,250,0.09)" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow="About" title={profile.aboutHeadline} />
          <div className="mt-7 flex items-center gap-4 rounded-2xl border border-accent-violet/15 bg-gradient-to-r from-accent-violet/[0.08] to-transparent p-4">
            <span className="block h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-accent-violet/30 bg-ink-800 shadow-[0_0_30px_-14px_rgba(244,114,182,0.7)]"><img src={profile.portrait} alt="" width="80" height="80" loading="lazy" className="h-full w-full object-cover object-top" /></span>
            <p className="text-sm leading-relaxed text-white/70">Builder first: I care about the path from a messy real-world workflow to a dependable system someone can actually use.</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-8 space-y-5"
          >
            {profile.about.map((p, i) => (
              <motion.p key={i} variants={fadeUp} custom={i} className="text-[15px] leading-relaxed text-white/70 sm:text-base">
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/50"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" /> {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap size={14} className="text-accent" /> MCA · AISECT University · 2025
            </span>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid content-start gap-3"
        >
          {profile.facts.map((f, i) => (
            <motion.div key={f.label} variants={fadeUp} custom={i} className="card card-hover group p-5">
              <p className="eyebrow text-white/40">{f.label}</p>
              <p className="mt-2 font-display text-[15px] font-medium text-white">{f.value}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} custom={4} className="card relative overflow-hidden p-5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <p className="eyebrow text-accent/80">Working principle</p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/75">
              Automate the deterministic parts, use AI for the parts that need reading and judgement, and keep a human
              approval step wherever the output matters.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
