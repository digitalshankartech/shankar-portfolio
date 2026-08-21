import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { skills } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Glow from "@/components/ui/Glow";

const W = 640;
const H = 520;
const CX = W / 2;
const CY = H / 2;
const R = 190;

/** Positions each category on a ring; the skills orbit their category. */
function useLayout() {
  return useMemo(() => {
    const n = skills.categories.length;
    const nodes = skills.categories.map((c, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return { ...c, x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R, angle: a };
    });
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const links = skills.links
      .map((l) => ({ ...l, a: byId[l.from], b: byId[l.to] }))
      .filter((l) => l.a && l.b);
    return { nodes, links };
  }, []);
}

export default function SkillsEcosystem() {
  const { nodes, links } = useLayout();
  const [active, setActive] = useState<string | null>(skills.categories[0]?.id ?? null);
  const reduce = useReducedMotion();
  const current = skills.categories.find((c) => c.id === active) ?? null;

  const isLinked = (id: string) =>
    !active || id === active || links.some((l) => (l.from === active && l.to === id) || (l.to === active && l.from === id));

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="divider-glow" />
      <Glow className="left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" color="rgba(94,234,212,0.06)" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="Technology Ecosystem"
          title="Skills as a connected system — not a list of percentages."
          description="Agents need tools, tools need automation, automation needs data processing, and all of it ships inside real software. Select a skill area to see how it connects."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Graph */}
          <div className="relative mx-auto hidden w-full max-w-2xl sm:block">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Technology relationship graph">
              <defs>
                <radialGradient id="core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* rings */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.05)" />
              <circle cx={CX} cy={CY} r={R + 46} fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 6" />
              <circle cx={CX} cy={CY} r={60} fill="url(#core)" />

              {/* links */}
              {links.map((l, i) => {
                const on = active && (l.from === active || l.to === active);
                const dim = active && !on;
                return (
                  <g key={i}>
                    <line
                      x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
                      stroke={on ? l.a.color : "rgba(255,255,255,0.12)"}
                      strokeWidth={on ? 1.8 : 1}
                      strokeOpacity={dim ? 0.25 : 1}
                      className={!reduce && on ? "flow-line" : undefined}
                    />
                    {!reduce && !active && (
                      <circle r="2" fill="rgba(255,255,255,0.6)">
                        <animateMotion
                          dur={`${4 + (i % 3)}s`}
                          repeatCount="indefinite"
                          path={`M${l.a.x},${l.a.y} L${l.b.x},${l.b.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* spokes to centre */}
              {nodes.map((n) => (
                <line
                  key={`spoke-${n.id}`}
                  x1={CX} y1={CY} x2={n.x} y2={n.y}
                  stroke={n.color}
                  strokeOpacity={active === n.id ? 0.45 : 0.08}
                  strokeWidth={1}
                />
              ))}

              {/* centre */}
              <g>
                <circle cx={CX} cy={CY} r="34" fill="#0a0c12" stroke="rgba(255,255,255,0.15)" />
                <text x={CX} y={CY - 3} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  SYSTEMS
                </text>
                <text x={CX} y={CY + 10} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace">
                  that act
                </text>
              </g>

              {/* category nodes */}
              {nodes.map((n) => {
                const on = active === n.id;
                const linked = isLinked(n.id);
                // orbiting skills
                const count = n.skills.length;
                return (
                  <g
                    key={n.id}
                    className="cursor-pointer focus:outline-none"
                    onMouseEnter={() => setActive(n.id)}
                    onMouseLeave={(event) => { if (!event.currentTarget.matches(":focus")) setActive(null); }}
                    onClick={() => setActive((a) => (a === n.id ? null : n.id))}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive((a) => (a === n.id ? null : n.id)); }
                    }}
                    tabIndex={0}
                    onFocus={() => setActive(n.id)}
                    role="button"
                    aria-label={n.name}
                    aria-pressed={on}
                    opacity={linked ? 1 : 0.3}
                    style={{ transition: "opacity .3s" }}
                  >
                    {/* orbit skills as small dots */}
                    {n.skills.map((s, j) => {
                      const a = n.angle + ((j - (count - 1) / 2) * 0.32);
                      const rr = 42;
                      const sx = n.x + Math.cos(a) * rr;
                      const sy = n.y + Math.sin(a) * rr;
                      return (
                        <g key={s} opacity={on ? 1 : 0.45} style={{ transition: "opacity .3s" }}>
                          <circle cx={sx} cy={sy} r={on ? 3.2 : 2.2} fill={n.color} />
                        </g>
                      );
                    })}
                    {on && (
                      <circle cx={n.x} cy={n.y} r="40" fill={n.color} opacity="0.12">
                        {!reduce && <animate attributeName="r" values="34;44;34" dur="2s" repeatCount="indefinite" />}
                      </circle>
                    )}
                    <circle cx={n.x} cy={n.y} r="26" fill="#0a0c12" stroke={n.color} strokeWidth={on ? 2 : 1.2} />
                    <circle cx={n.x} cy={n.y} r="6" fill={n.color} />
                    <text
                      x={n.x}
                      y={n.y + (n.y < CY ? -38 : 46)}
                      textAnchor="middle"
                      fill={on ? "#fff" : "rgba(255,255,255,0.75)"}
                      fontSize="11"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                    >
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Category panel */}
          <div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {skills.categories.map((c) => {
                const on = active === c.id;
                const dim = active && !on;
                return (
                  <motion.button
                    key={c.id}
                    onMouseEnter={() => setActive(c.id)}
                    onMouseLeave={(event) => { if (!event.currentTarget.matches(":focus")) setActive(null); }}
                      onClick={() => setActive(c.id)}
                    aria-pressed={on}
                    animate={{ opacity: dim ? 0.45 : 1 }}
                    className={clsx(
                      "card card-hover relative min-h-11 overflow-hidden p-4 text-left transition-all",
                      on && "border-2 border-white/30 bg-white/[0.08]"
                    )}
                    style={on ? { boxShadow: `0 0 40px -16px ${c.color}88` } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
                        <span className="h-2 w-2 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                        {c.name}
                      </p>
                      <span className="font-mono text-xs text-white/60">{c.skills.length} skills</span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/65">{c.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border px-2 py-0.5 font-mono text-xs transition-colors"
                          style={{
                            borderColor: on ? `${c.color}55` : "rgba(255,255,255,0.08)",
                            color: on ? "#fff" : "rgba(255,255,255,0.6)",
                            background: on ? `${c.color}10` : "transparent",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <p className="mt-4 text-[13px] text-white/60" aria-live="polite">
              {current ? `${current.name} connects to ${links.filter((l) => l.from === current.id || l.to === current.id).length} other areas` : "Select a skill area to highlight its relationships"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
