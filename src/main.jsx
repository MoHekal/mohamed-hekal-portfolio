import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Download,
  Github,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { education, experience, profile, projects, skills, stats, verification } from "./data";
import "./styles.css";

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
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="status-pill"><Sparkles size={16} /> Available for AI product and full-stack engineering</div>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
        <div className="hero-actions">
          <LinkButton href={profile.github}><Github size={18} /> GitHub</LinkButton>
          <LinkButton href={profile.cv} variant="secondary"><Download size={18} /> Download CV</LinkButton>
          <LinkButton href={`mailto:${profile.email}`} variant="ghost"><Mail size={18} /> Contact</LinkButton>
        </div>
        <div className="contact-strip">
          <span><MapPin size={16} /> {profile.location}</span>
          <span><Mail size={16} /> {profile.email}</span>
          <span><Phone size={16} /> {profile.phone}</span>
        </div>
      </div>
      <div className="portrait-wrap">
        <img src={profile.photo} alt="Mohamed Hekal portrait" />
        <div className="portrait-card">
          <BrainCircuit size={22} />
          <div>
            <strong>AI systems with product sense</strong>
            <span>RAG, automation, SaaS, dashboards, and mobile apps.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats-grid" aria-label="Portfolio statistics">
      {stats.map(([value, label]) => (
        <div className="stat" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${index < 2 ? "featured" : ""}`}>
      <div className="project-image">
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        <span>{project.type}</span>
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <div className="project-links">
            {project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}><ArrowUpRight size={18} /></a> : null}
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
