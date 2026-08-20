/* ------------------------------------------------------------------
 * Content types — every JSON file in src/data is typed here.
 * Add new fields here first, then fill them in the JSON.
 * ------------------------------------------------------------------ */

export type Tag =
  | "AI Agent"
  | "Browser Automation"
  | "Playwright"
  | "Python"
  | "LLM"
  | "MCP"
  | "LangChain"
  | "n8n"
  | "Automation"
  | "React"
  | "Node.js"
  | "RAG"
  | "Research"
  | "Reporting"
  | "SEO"
  | "Full-Stack"
  | (string & {});

export type ProjectStatus = "Production" | "In Progress" | "Prototype" | "Concept" | "Archived";
export type AutomationLevel = "Fully Automated" | "Human-in-the-loop" | "Semi-Automated" | "Assistive";

export interface MediaItem {
  type: "image" | "video" | "youtube";
  src: string;
  alt?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  tags: Tag[];
  /** Linear workflow shown as an animated pipeline */
  workflow: string[];
  /** Optional architecture layers (component → responsibility) */
  architecture?: { layer: string; detail: string }[];
  screenshots?: MediaItem[];
  videos?: MediaItem[];
  github?: string;
  live?: string;
  keyLearnings?: string[];
  automationLevel: AutomationLevel;
  status: ProjectStatus;
  featured?: boolean;
  /** Use only honest capability statements — never invented metrics */
  capabilities?: string[];
  year?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  skills: string[];
}

export interface SkillLink {
  from: string;
  to: string;
}

export interface SkillsData {
  categories: SkillCategory[];
  /** Category-level relationships for the ecosystem graph */
  links: SkillLink[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  end: string | null;
  location?: string;
  focus: string[];
  problemsSolved?: string[];
  systemsBuilt?: string[];
  technologies: string[];
  growth?: string;
  current?: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  problem: string;
  build: string[];
  outcome: string;
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tags: Tag[];
  problem: string;
  oldProcess: string[];
  opportunity: string;
  system: string;
  architecture: string[];
  technologies: string[];
  result: string[];
  learned: string[];
  media?: MediaItem[];
  codeSnippet?: { language: string; title?: string; code: string };
  github?: string;
  status?: ProjectStatus;
}

export type LearningStatus = "Exploring" | "Learning" | "Applying" | "Comfortable";

export interface LearningItem {
  id: string;
  title: string;
  category: string;
  status: LearningStatus;
  since: string;
  note?: string;
}

export interface GithubRepo {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  lastUpdated: string;
  pinned?: boolean;
  stars?: number;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  short: string;
  description: string;
  experience: string[];
  items: string[];
  color: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  portrait: string;
  resume: string;
  availability: string;
  heroHeadline: string;
  heroRotating: string[];
  heroSub: string;
  indicators: string[];
  aboutHeadline: string;
  about: string[];
  facts: { label: string; value: string }[];
}
