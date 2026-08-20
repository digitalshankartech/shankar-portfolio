import clsx from "clsx";

/** Soft radial glow used as section ambience. Purely decorative. */
export default function Glow({
  className,
  color = "rgba(94,234,212,0.18)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute rounded-full opacity-50 blur-2xl sm:opacity-75 sm:blur-3xl lg:opacity-100", className)}
      style={{ background: `radial-gradient(closest-side, ${color}, transparent 70%)` }}
    />
  );
}
