import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

/**
 * Animated linear workflow: step → step → step.
 * Renders horizontally on wide screens, vertically on narrow ones.
 */
export default function Pipeline({
  steps,
  accent = "#5eead4",
  compact = false,
  className,
}: {
  steps: string[];
  accent?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <ol
      className={clsx(
        "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center",
        compact ? "gap-1.5" : "gap-2",
        className
      )}
    >
      {steps.map((step, i) => (
        <li key={step + i} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={clsx(
              "relative inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] font-mono text-white/80",
              compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
            )}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
            />
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <ArrowRight size={compact ? 12 : 14} className="hidden shrink-0 text-white/25 sm:block" />
          )}
          {i < steps.length - 1 && (
            <span className="ml-3 block h-3 w-px bg-white/15 sm:hidden" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  );
}
