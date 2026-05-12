import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrainCircuit,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import { education, experience, profile, projects, skills, stats, verification } from "./data";
import "./styles.css";

function assetPath(value) {
  if (!value || value.startsWith("http") || value.startsWith("mailto:")) return value;
  return `${import.meta.env.BASE_URL}${value.replace(/^\/+/, "")}`;
}

function LinkButton({ href, children, variant = "primary" }) {
  return (
    <a className={`btn ${variant}`} href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading reveal">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function usePortfolioMotion() {
  useEffect(() => {
    const animatedItems = document.querySelectorAll(".reveal, .stagger > *");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
    );

    const observeItems = () => {
      document.querySelectorAll(".reveal:not(.is-visible), .stagger > *:not(.is-visible)").forEach((item) => observer.observe(item));
    };

    animatedItems.forEach((item) => observer.observe(item));
    const mutations = new MutationObserver(observeItems);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const sectionIds = ["projects", "skills", "verification", "experience", "about"];
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);

      const current = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (current) setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { progress, activeSection };
}

function Hero() {
  const heroProjects = projects.slice(0, 3);

  return (
    <section className="hero" id="top">
      <div className="hero-copy motion-card">
        <div className="status-pill"><Sparkles size={16} /> AI product engineering portfolio</div>
        <h1><span>Mohamed</span><span>Hekal</span></h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
        <div className="hero-specialties" aria-label="Core specialties">
          <span>RAG platforms</span>
          <span>AI SaaS</span>
          <span>Workflow automation</span>
          <span>Full-stack systems</span>
        </div>
        <div className="hero-actions">
          <LinkButton href={profile.github}><Github size={18} /> GitHub</LinkButton>
          <LinkButton href={assetPath(profile.cv)} variant="secondary"><Download size={18} /> Download CV</LinkButton>
          <LinkButton href={`mailto:${profile.email}`} variant="ghost"><Mail size={18} /> Contact</LinkButton>
        </div>
        <div className="contact-strip">
          <span><MapPin size={16} /> {profile.location}</span>
          <span><Mail size={16} /> {profile.email}</span>
          <span><Phone size={16} /> {profile.phone}</span>
        </div>
      </div>
      <div className="hero-visual reveal">
        <div className="command-card motion-card">
          <div className="command-topline">
            <span>Selected systems</span>
            <strong>Systems board</strong>
          </div>
          <div className="portrait-wrap">
            <img src={assetPath(profile.photo)} alt="Mohamed Hekal portrait" />
            <div className="portrait-card">
              <BrainCircuit size={22} />
              <div>
                <strong>AI systems with product sense</strong>
                <span>RAG, automation, SaaS, dashboards, and mobile apps.</span>
              </div>
            </div>
            <div className="signal-board" aria-hidden="true">
              <span>API</span>
              <span>RAG</span>
              <span>UI</span>
              <span>Deploy</span>
            </div>
          </div>
          <div className="command-metrics">
            <div><strong>FastAPI</strong><span>Backend APIs</span></div>
            <div><strong>React</strong><span>Product UI</span></div>
            <div><strong>LLMs</strong><span>AI workflows</span></div>
          </div>
        </div>
        <div className="hero-proof stagger">
          {heroProjects.map((project) => {
            const href = project.live || project.source;
            const content = (
              <>
                <img src={assetPath(project.image)} alt={`${project.title} preview`} />
                <span>{project.title}</span>
              </>
            );

            return href ? (
              <a href={href} target="_blank" rel="noreferrer" key={project.title}>{content}</a>
            ) : (
              <div className="proof-tile locked" key={project.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="proof-section" aria-label="Portfolio statistics">
      <div className="stats-grid stagger">
        {stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="impact-grid stagger">
        <div><Rocket size={22} /><strong>Product delivery</strong><span>From idea and architecture to deployed UI, APIs, and automation.</span></div>
        <div><Layers3 size={22} /><strong>Full-stack depth</strong><span>React, Next.js, Flutter, FastAPI, SQL, Docker, and cloud-ready workflows.</span></div>
        <div><TerminalSquare size={22} /><strong>Engineering proof</strong><span>Build checks, screenshots, GitHub repos, and live private-source showcases.</span></div>
      </div>
    </section>
  );
}

function ProjectCard({ project, compact = false }) {
  return (
    <article className={`project-card motion-card ${compact ? "compact" : ""}`}>
      <div className="project-image">
        <img src={assetPath(project.image)} alt={`${project.title} screenshot`} loading="lazy" />
        <span>{project.type}</span>
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <div>
            <p className="project-kicker">{project.tags.slice(0, 3).join(" / ")}</p>
            <h3>{project.title}</h3>
          </div>
          <div className="project-links">
            {project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}><ExternalLink size={18} /></a> : null}
            {project.source ? <a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.title} source`}><Github size={18} /></a> : null}
          </div>
        </div>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="details-grid">
          <div>
            <h4>What I built</h4>
            <ul>
              {project.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h4>Validation</h4>
            <ul className="checks">
              {project.tests.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkIndex({ activeMode, onModeChange }) {
  const modes = [
    { id: "showcase", label: "Private showcases", icon: Globe2 },
    { id: "github", label: "GitHub repos", icon: Github },
    { id: "proof", label: "Validation proof", icon: CheckCircle2 }
  ];

  return (
    <aside className="work-index reveal" aria-label="Work organization">
      <div className="work-index-card">
        <span className="index-label">Portfolio map</span>
        <h3>Choose the evidence you want to inspect.</h3>
        <div className="work-mode-list">
          {modes.map(({ id, label, icon: Icon }) => (
            <button className={activeMode === id ? "active" : ""} type="button" onClick={() => onModeChange(id)} key={id}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </div>
      </div>
      <div className="work-index-card dark">
        <span className="index-label">Best signal</span>
        <strong>Private commercial platforms + public source projects</strong>
        <p>Commercial work is screenshot-only. Public projects show source, docs, and validation evidence.</p>
      </div>
    </aside>
  );
}

function FeaturedCaseStudy({ project }) {
  return (
    <article className="case-study motion-card reveal">
      <div className="case-visual">
        <img src={assetPath(project.image)} alt={`${project.title} screenshot`} />
      </div>
      <div className="case-content">
        <div className="case-summary">
          <div className="case-meta">
            <span>{project.type}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="case-actions">
            {project.live ? <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={17} /> Live site</a> : null}
            {project.source ? <a href={project.source} target="_blank" rel="noreferrer"><Github size={17} /> Source</a> : null}
            {!project.live && !project.source ? <span>Screenshot-only showcase</span> : null}
          </div>
        </div>
        <div className="case-info">
          <div className="case-columns">
            <div>
              <h4>Role and build</h4>
              <ul>
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4>Evidence</h4>
              <ul className="checks">
                {project.tests.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}
              </ul>
            </div>
          </div>
          <div className="tag-row">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkProofPanel({ items }) {
  return (
    <div className="proof-board mode-pane">
      {items.map((project) => (
        <article className="proof-card motion-card" key={project.title}>
          <div>
            <span>{project.source ? "Public repository" : "Private showcase"}</span>
            <h3>{project.title}</h3>
          </div>
          <ul className="checks">
            {project.tests.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Projects() {
  const [activeMode, setActiveMode] = useState("showcase");
  const liveProjects = projects.filter((project) => project.live || project.privateShowcase);
  const sourceProjects = projects.filter((project) => project.source);
  const modeCopy = {
    showcase: "Private-source work stays screenshot-only, with outcomes and boundaries made clear.",
    github: "Public repositories are grouped as engineering evidence with screenshots, docs, and validation notes.",
    proof: "Validation cards show how each project was checked before being presented in the portfolio."
  };

  return (
    <section id="projects">
      <SectionHeading eyebrow="Selected work" title="AI products, SaaS platforms, and automation systems">
        Private-source commercial work is shown with screenshots only. Open-source portfolio projects link to GitHub.
      </SectionHeading>
      <div className="project-feature-strip stagger">
        <div><Globe2 size={21} /><span>Live platforms</span><strong>NationStage + CafeSystem</strong></div>
        <div><Github size={21} /><span>Public code</span><strong>Polished GitHub repositories</strong></div>
        <div><CheckCircle2 size={21} /><span>Evidence</span><strong>Build checks + screenshots</strong></div>
      </div>
      <div className="workbench">
        <div className="workbench-top reveal">
          <div>
            <span>Interactive workbench</span>
            <h3>{activeMode === "showcase" ? "Private-source product showcases" : activeMode === "github" ? "Public engineering portfolio" : "Build and screenshot validation"}</h3>
            <p>{modeCopy[activeMode]}</p>
          </div>
          <div className="workbench-status">
            <span />
            Active view
          </div>
        </div>
      </div>
      <div className="work-layout">
        <WorkIndex activeMode={activeMode} onModeChange={setActiveMode} />
        <div className="work-content">
          {activeMode === "showcase" ? <div id="live-work" className="work-cluster mode-pane" key="showcase">
            <div className="cluster-heading reveal">
              <span><Globe2 size={20} /></span>
              <div>
                <h3>Private-source platforms</h3>
                <p>Source code stays private. The portfolio shows screenshots, product outcomes, and validation boundaries.</p>
              </div>
            </div>
            {liveProjects.map((project) => (
              <FeaturedCaseStudy project={project} key={project.title} />
            ))}
          </div> : null}

          {activeMode === "github" ? <div id="open-source" className="work-cluster mode-pane" key="github">
            <div className="cluster-heading reveal">
              <span><Github size={20} /></span>
              <div>
                <h3>Open-source engineering portfolio</h3>
                <p>Public GitHub repos with cleaned READMEs, source links, screenshots, and build evidence.</p>
              </div>
            </div>
            <div className="projects-grid stagger">
              {sourceProjects.map((project) => (
                <ProjectCard project={project} compact key={project.title} />
              ))}
            </div>
          </div> : null}

          {activeMode === "proof" ? <div id="work-proof" className="work-cluster mode-pane" key="proof">
            <div className="cluster-heading reveal">
              <span><CheckCircle2 size={20} /></span>
              <div>
                <h3>Validation proof</h3>
                <p>Build checks, screenshot captures, smoke tests, and source review signals grouped by project.</p>
              </div>
            </div>
            <WorkProofPanel items={[...liveProjects, ...sourceProjects]} />
          </div> : null}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="band">
      <SectionHeading eyebrow="Capabilities" title="The stack behind the work">
        I focus on AI systems that still feel like good software: reliable APIs, clear user flows, maintainable architecture, and measurable business value.
      </SectionHeading>
      <div className="skills-grid stagger">
        {skills.map((group) => (
          <div className="skill-card motion-card" key={group.title}>
            <h3>{group.title}</h3>
            <div>
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <SectionHeading eyebrow="Experience" title="Engineering across AI, data, and business systems" />
      <div className="timeline stagger">
        {experience.map((job) => (
          <article className="timeline-card motion-card" key={`${job.company}-${job.period}`}>
            <div>
              <span>{job.period}</span>
              <h3>{job.role}</h3>
              <p>{job.company} · {job.location}</p>
            </div>
            <ul>
              {job.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Verification() {
  return (
    <section id="verification" className="verification-section">
      <SectionHeading eyebrow="Validation" title="Build and screenshot test cases">
        Each featured project has at least one portfolio-safe verification signal: a production build, syntax check, live route smoke test, or captured screenshot.
      </SectionHeading>
      <div className="verification-table stagger">
        {verification.map((item) => (
          <article key={item.project}>
            <div>
              <h3>{item.project}</h3>
              <span>{item.status}</span>
            </div>
            <ul>
              {item.checks.map((check) => <li key={check}>{check}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-grid">
      <div>
        <SectionHeading eyebrow="Profile" title="Full-stack engineer with an AI product bias">
          {profile.summary}
        </SectionHeading>
        <div className="principles">
          <div><ShieldCheck size={21} /><span>Private commercial code stays private; outcomes and screenshots are shown clearly.</span></div>
          <div><ShieldCheck size={21} /><span>Portfolio repos are cleaned, documented, and linked to public GitHub sources.</span></div>
          <div><ShieldCheck size={21} /><span>Projects emphasize useful AI workflows, not demos for their own sake.</span></div>
        </div>
      </div>
      <div className="education-card">
        <h3>Education</h3>
        {education.map((item) => <p key={item}>{item}</p>)}
        <h3>Languages</h3>
        <p>English · German · Arabic</p>
      </div>
    </section>
  );
}

function App() {
  usePortfolioMotion();
  const { progress, activeSection } = useScrollState();
  const navItems = [
    ["projects", "Work"],
    ["skills", "Skills"],
    ["verification", "Proof"],
    ["experience", "Experience"],
    ["about", "About"]
  ];

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="site-header">
        <a href="#top" className="brand">MH</a>
        <nav>
          {navItems.map(([id, label]) => (
            <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
      </header>
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Verification />
        <Experience />
        <About />
      </main>
      <footer>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
