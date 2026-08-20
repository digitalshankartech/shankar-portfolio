import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, Globe, Search, Layers, Plus, Minus } from "lucide-react";
import clsx from "clsx";
import SectionHeader from "@/components/ui/SectionHeader";
import Pipeline from "@/components/ui/Pipeline";
import Glow from "@/components/ui/Glow";
import { fadeUp, viewport } from "@/lib/motion";

interface BuildCard {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  tech: string[];
  problem: string;
  system: string;
  automation: string[];
  result: string;
}

const CARDS: BuildCard[] = [
  {
    id: "agents",
    title: "AI Agents",
    icon: Bot,
    color: "#5eead4",
    description:
      "LLM-powered agents capable of reasoning, using tools, retrieving information, and executing multi-step tasks.",
    tech: ["LLMs", "LangChain", "OpenAI APIs", "Tool Calling", "MCP", "RAG"],
    problem: "A task needs judgement, several steps and access to real tools — a single prompt can't do it.",
    system: "An agent loop that plans, selects typed tools, executes, reviews results and stops when done.",
    automation: ["Task analysis", "Tool selection", "Multi-step execution", "Result verification"],
    result: "A finished, reviewable output instead of a chat answer.",
  },
  {
    id: "automation",
    title: "AI Automation Systems",
    icon: Sparkles,
    color: "#22d3ee",
    description: "Automating repetitive workflows using AI, APIs, databases, and automation platforms.",
    tech: ["n8n", "Node.js", "LLM APIs", "Webhooks", "MongoDB"],
    problem: "Work repeats every day: reading, classifying, moving data between tools, writing updates.",
    system: "Event-driven workflows where AI handles reading and routing, tools handle actions, humans handle approvals.",
    automation: ["Workflow automation", "Data processing", "AI analysis", "Automated reporting", "Business process automation"],
    result: "Hours of manual work become a scheduled, logged workflow.",
  },
  {
    id: "browser",
    title: "Browser Automation",
    icon: Globe,
    color: "#a78bfa",
    description:
      "Automated systems that interact with websites, extract information, capture screenshots, process data, and execute repetitive browser tasks.",
    tech: ["Playwright", "Python", "Web Scraping", "Browser Workflows"],
    problem: "The data or the action lives behind a website with no API — someone clicks through it manually.",
    system: "Playwright workers that log in, navigate, extract, capture evidence and hand structured results downstream.",
    automation: ["Navigation & forms", "Data extraction", "Screenshot capture", "Scheduled runs"],
    result: "Browser work runs on its own and produces structured data + evidence.",
  },
  {
    id: "research",
    title: "Intelligent Research & Analysis",
    icon: Search,
    color: "#fbbf24",
    description:
      "Systems that collect information, analyze data using AI, identify patterns, and generate structured reports or presentations.",
    tech: ["Playwright", "LLM Analysis", "Structured Outputs", "python-pptx", "Reporting"],
    problem: "Research and reporting follow the same structure every time but are rebuilt by hand.",
    system: "Collection → AI analysis with fixed schemas → templated report or presentation generation.",
    automation: ["Website analysis", "SEO research workflows", "Competitor research", "Screenshot analysis", "Automated PPT / report generation"],
    result: "Consistent, evidence-backed reports produced on demand.",
  },
  {
    id: "fullstack",
    title: "Full-Stack AI Applications",
    icon: Layers,
    color: "#f472b6",
    description:
      "Complete applications where AI agents and automation systems are integrated into real user-facing products.",
    tech: ["React", "Node.js", "MongoDB", "Express", "APIs", "Databases"],
    problem: "AI features exist as scripts and demos but aren't part of a product people can actually use.",
    system: "React frontends and Node.js APIs wrapped around agents, automations and data — with auth, logs and controls.",
    automation: ["AI features in-product", "Run history & controls", "Integrations", "Dashboards"],
    result: "A maintainable product where intelligence is a feature, not a side script.",
  },
];

function Card({ card, open, onToggle, index }: { card: BuildCard; open: boolean; onToggle: () => void; index: number }) {
  const Icon = card.icon;
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      layout
      className={clsx(
        "card card-hover group relative flex flex-col overflow-hidden p-5 sm:p-7",
        open && "border-white/[0.14] bg-white/[0.04]"
      )}
      style={open ? { boxShadow: `0 0 60px -20px ${card.color}55` } : undefined}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: card.color }}
      />
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`build-${card.id}`}
        className="relative flex min-h-11 w-full items-start justify-between gap-3 text-left sm:gap-4"
      >
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10"
            style={{ background: `${card.color}14`, color: card.color }}
          >
            <Icon size={20} />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{card.description}</p>
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition group-hover:border-white/30 group-hover:text-white">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {card.tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`build-${card.id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="mt-6 grid gap-4 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
              <Step label="Problem" color={card.color} text={card.problem} />
              <Step label="System" color={card.color} text={card.system} />
              <div className="sm:col-span-2">
                <p className="eyebrow mb-2" style={{ color: card.color }}>
                  Automation
                </p>
                <Pipeline steps={card.automation} accent={card.color} compact />
              </div>
              <Step label="Result" color={card.color} text={card.result} className="sm:col-span-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Step({ label, text, color, className }: { label: string; text: string; color: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-1.5" style={{ color }}>
        {label}
      </p>
      <p className="text-sm leading-relaxed text-white/75">{text}</p>
    </div>
  );
}

export default function WhatIBuild() {
  const [openId, setOpenId] = useState<string | null>("agents");
  return (
    <section id="build" className="section">
      <div className="divider-glow" />
      <Glow className="left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2" color="rgba(94,234,212,0.08)" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="What I Build"
          title="What Can I Build?"
          description="Five kinds of systems, one way of thinking: understand the workflow, let AI handle the reasoning, let tools do the work, keep humans where they matter. Click a card to see Problem → System → Automation → Result."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          {CARDS.map((c, i) => (
            <Card
              key={c.id}
              card={c}
              index={i}
              open={openId === c.id}
              onToggle={() => setOpenId((v) => (v === c.id ? null : c.id))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
