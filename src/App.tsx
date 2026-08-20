import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatIBuild from "@/components/WhatIBuild";
import AutomationFlow from "@/components/AutomationFlow";
import ProjectGrid from "@/components/ProjectGrid";
import ArchitectureVisualizer from "@/components/ArchitectureVisualizer";
import SkillsEcosystem from "@/components/SkillsEcosystem";
import LearningJourney from "@/components/LearningJourney";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-ink-950">
      <a
        href="#build"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>

      <Navigation />

      <main>
        <Hero />
        <WhatIBuild />
        <AutomationFlow />
        <ProjectGrid />
        <ArchitectureVisualizer />
        <SkillsEcosystem />
        <LearningJourney />
        <ExperienceTimeline />
        <Services />
        <CaseStudy />
        <About />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
