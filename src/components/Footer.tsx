import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-ink-800 font-display text-sm font-bold text-white">
                S
              </span>
              <span className="font-display text-sm font-semibold text-white">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/50">{profile.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <Mail size={15} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {[{ id: "projects", label: "Projects" }, { id: "experience", label: "Experience" }, { id: "about", label: "About" }, { id: "contact", label: "Contact" }].map((n) => (
              <a key={n.id} href={`#${n.id}`} className="flex min-h-11 items-center text-sm text-white/60 transition hover:text-white">{n.label}</a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {year} {profile.name} · Built with React, TypeScript, Tailwind & Framer Motion
          </p>
          <a href="#top" className="flex min-h-11 items-center gap-1.5 text-xs text-white/60 transition hover:text-white">
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
