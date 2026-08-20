import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { navItems, profile } from "@/lib/content";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDetailsElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) {
      requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = [...menuRef.current.querySelectorAll<HTMLElement>('a, button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container-x">
          <nav
            aria-label="Primary"
            className={clsx(
              "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
              scrolled ? "glass shadow-card" : "border border-transparent"
            )}
          >
            <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
              <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-ink-800">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/30 to-accent-violet/30 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative font-display text-sm font-bold text-white">S</span>
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-tight text-white sm:block">
                Shankar Kumar
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "location" : undefined}
                    className={clsx(
                      "relative rounded-full px-3 py-1.5 text-[13px] transition-colors",
                      active === item.id ? "text-white" : "text-white/55 hover:text-white"
                    )}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <details ref={moreRef} className="group/more relative">
                  <summary
                    className={clsx(
                      "flex min-h-9 cursor-pointer list-none items-center gap-1 rounded-full px-3 text-[13px] transition-colors [&::-webkit-details-marker]:hidden",
                      navItems.slice(6).some((item) => item.id === active)
                        ? "bg-white/[0.07] text-white"
                        : "text-white/55 hover:text-white"
                    )}
                  >
                    More <ChevronDown size={13} className="transition-transform group-open/more:rotate-180" />
                  </summary>
                  <div className="glass absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-2xl p-2 shadow-2xl">
                    {navItems.slice(6).map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        aria-current={active === item.id ? "location" : undefined}
                        onClick={() => moreRef.current?.removeAttribute("open")}
                        className={clsx(
                          "flex min-h-11 items-center rounded-xl px-3 text-sm transition-colors",
                          active === item.id ? "bg-white/[0.07] text-accent" : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </details>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-ink-950 transition hover:bg-accent sm:inline-flex"
              >
                Let&apos;s Talk <ArrowUpRight size={14} />
              </a>
              <button
                ref={menuButtonRef}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:border-white/25 focus-visible:ring-2 focus-visible:ring-accent/60 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>
        </div>
        {/* scroll progress */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-accent-cyan to-accent-violet"
          style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="safe-top safe-bottom fixed inset-0 z-40 overflow-y-auto bg-ink-950/95 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col py-8 pt-20">
              <p className="eyebrow mb-5">Browse the portfolio</p>
              {[
                { label: "Work", items: navItems.slice(0, 5) },
                { label: "Profile", items: navItems.slice(5, 9) },
                { label: "Connect", items: navItems.slice(9) },
              ].map((group, groupIndex) => (
                <div key={group.label} className="mb-6">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-white/35">{group.label}</p>
                  <ul className="grid grid-cols-2 gap-1.5">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.025 * (i + groupIndex * 4) }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "location" : undefined}
                      className={clsx("flex min-h-11 items-center rounded-xl border px-3 font-display text-[15px] font-semibold transition", active === item.id ? "border-accent/25 bg-accent/[0.08] text-accent" : "border-white/[0.06] bg-white/[0.02] text-white/75 hover:bg-white/[0.05] hover:text-white")}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
                </div>
              ))}
              <div className="mt-auto flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                <a href={`mailto:${profile.email}`} className="btn-primary" onClick={() => setOpen(false)}>
                  Email me
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
