import React from "react";
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
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function Hero() {
  const heroProjects = projects.slice(0, 3);

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="status-pill"><Sparkles size={16} /> AI product engineering portfolio</div>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
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
      <div className="hero-visual">
        <div className="portrait-wrap">
          <img src={assetPath(profile.photo)} alt="Mohamed Hekal portrait" />
          <div className="portrait-card">
            <BrainCircuit size={22} />
            <div>
              <strong>AI systems with product sense</strong>
              <span>RAG, automation, SaaS, dashboards, and mobile apps.</span>
            </div>
          </div>
        </div>
        <div className="hero-proof">
          {heroProjects.map((project) => (
            <a href={project.live || project.source} target="_blank" rel="noreferrer" key={project.title}>
              <img src={assetPath(project.image)} alt={`${project.title} preview`} />
              <span>{project.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="proof-section" aria-label="Portfolio statistics">
      <div className="stats-grid">
        {stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="impact-grid">
        <div><Rocket size={22} /><strong>Product delivery</strong><span>From idea and architecture to deployed UI, APIs, and automation.</span></div>
        <div><Layers3 size={22} /><strong>Full-stack depth</strong><span>React, Next.js, Flutter, FastAPI, SQL, Docker, and cloud-ready workflows.</span></div>
        <div><TerminalSquare size={22} /><strong>Engineering proof</strong><span>Build checks, screenshots, GitHub repos, and live private-source showcases.</span></div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const isFeatured = index < 2;

  return (
    <article className={`project-card ${isFeatured ? "featured" : ""}`}>
      <div className="project-image">
        <img src={assetPath(project.image)} alt={`${project.title} screenshot`} loading="lazy" />
        <span>{String(index + 1).padStart(2, "0")} / {project.type}</span>
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

function Projects() {
  return (
    <section id="projects">
      <SectionHeading eyebrow="Selected work" title="AI products, SaaS platforms, and automation systems">
        Private-source commercial work is shown with screenshots only. Open-source portfolio projects link to GitHub.
      </SectionHeading>
      <div className="project-feature-strip">
        <div><Globe2 size={21} /><span>Live platforms</span><strong>NationStage + CafeSystem</strong></div>
        <div><Github size={21} /><span>Public code</span><strong>6 polished GitHub repos</strong></div>
        <div><CheckCircle2 size={21} /><span>Evidence</span><strong>Build checks + screenshots</strong></div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
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
      <div className="skills-grid">
        {skills.map((group) => (
          <div className="skill-card" key={group.title}>
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
      <div className="timeline">
        {experience.map((job) => (
          <article className="timeline-card" key={`${job.company}-${job.period}`}>
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
      <div className="verification-table">
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
  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand">MH</a>
        <nav>
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
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
