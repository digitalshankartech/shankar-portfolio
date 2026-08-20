import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/content";
import Glow from "@/components/ui/Glow";
import { fadeUp, viewport } from "@/lib/motion";

const LINKS = [
  { id: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { id: "linkedin", label: "LinkedIn", value: "/in/digitalshankartech", href: profile.linkedin, icon: Linkedin },
  { id: "github", label: "GitHub", value: "@digitalshankartech", href: profile.github, icon: Github },
];

export default function Contact() {
  return (
    <section id="contact" className="section overflow-hidden">
      <div className="divider-glow" />
      <Glow className="left-1/2 top-1/4 h-[700px] w-[900px] -translate-x-1/2" color="rgba(94,234,212,0.12)" />
      <div className="container-x relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-10 lg:p-14"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-y" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.p variants={fadeUp} className="eyebrow mb-5">
              Contact
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Have a Manual Process That <span className="gradient-text">Should Be Automated?</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="lead mx-auto mt-6 max-w-2xl">
              Let&apos;s explore whether AI, automation, browser workflows, or a custom software system can turn it into
              something smarter.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-col justify-center gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
              <a
                href={`mailto:${profile.email}?subject=Project%20enquiry%20—%20AI%20automation`}
                className="btn-primary group"
              >
                Start a Conversation
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={16} /> Connect on LinkedIn
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-12 grid gap-3 sm:grid-cols-3">
              {LINKS.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.id}
                    href={l.href}
                    target={l.id === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="card card-hover group flex items-center gap-3 p-4 text-left"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-accent">
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{l.label}</span>
                      <span className="block truncate text-[13px] text-white/80 group-hover:text-white">{l.value}</span>
                    </span>
                  </a>
                );
              })}
            </motion.div>

            <motion.p variants={fadeUp} custom={5} className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-center font-mono text-[11px] text-white/40">
              <MapPin size={12} /> {profile.location} · {profile.availability}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
