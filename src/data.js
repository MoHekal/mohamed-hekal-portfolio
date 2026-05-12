export const profile = {
  name: "Mohamed Hekal",
  role: "Full Stack AI Engineer",
  location: "Bochum, Germany",
  email: "mhekal.de@gmail.com",
  phone: "017661881119",
  github: "https://github.com/MoHekal",
  cv: "assets/Mohamed_Hekal_CV.pdf",
  photo: "assets/mohamed-hekal.jpg",
  intro:
    "I build AI-powered business applications, RAG systems, workflow automation platforms, and full-stack SaaS products that turn messy operations into usable software.",
  summary:
    "Full Stack AI Engineer experienced with Python, FastAPI, React, TypeScript, Flutter, SQL, Docker, LLM integrations, vector databases, AI agents, and production-minded software architecture."
};

export const stats = [
  ["AI", "Product engineering focus"],
  ["SaaS", "Production-style business domains"],
  ["3", "Languages: English, German, Arabic"],
  ["2021", "Professional software work since"]
];

export const skills = [
  {
    title: "AI Engineering",
    items: ["LLMs", "RAG", "AI agents", "Prompt engineering", "Vision AI", "Semantic search"]
  },
  {
    title: "Backend",
    items: ["Python", "FastAPI", "SQLAlchemy", "REST APIs", "PostgreSQL", "Docker"]
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Flutter", "Responsive UI", "Dashboards"]
  },
  {
    title: "Automation & Data",
    items: ["n8n", "Workflow engines", "Neo4j", "Weaviate", "FAISS", "Business intelligence"]
  }
];

export const experience = [
  {
    company: "Raghd Henna Factory",
    role: "Full Stack AI Engineer",
    period: "08/2025 - 04/2026",
    location: "Jeddah, KSA (Remote)",
    points: [
      "Built web and mobile e-commerce applications with backend services and operational workflows.",
      "Developed AI automation for supplier sourcing, inventory management, and customer support.",
      "Integrated payments, dashboards, APIs, and workflow tooling for business operations."
    ]
  },
  {
    company: "Kostal Group",
    role: "Full Stack AI Engineer",
    period: "08/2024 - 12/2025",
    location: "Dortmund, Germany",
    points: [
      "Developed enterprise AI applications for document processing and intelligent knowledge retrieval.",
      "Built semantic search and RAG systems using FastAPI, FAISS, Weaviate, and Neo4j.",
      "Containerized and optimized applications across the full development lifecycle."
    ]
  },
  {
    company: "Telus International",
    role: "Data Scientist",
    period: "08/2022 - 08/2024",
    location: "Essen, Germany",
    points: [
      "Analyzed moderation data to identify behavioral patterns and emerging policy trends.",
      "Created dashboards to visualize content and operational patterns."
    ]
  },
  {
    company: "Pelephant GmbH",
    role: "Full Stack Python Developer",
    period: "09/2021 - 09/2022",
    location: "Remote, Switzerland",
    points: [
      "Contributed backend services and mobile-integrated features for an AI-powered math-solving app.",
      "Improved reliability through validation, monitoring, and performance optimization."
    ]
  }
];

export const projects = [
  {
    title: "NationStage Platform",
    type: "Private-source live platform",
    image: "screenshots/nationstage.png",
    live: "https://nationstage.net",
    source: null,
    tags: ["Full Stack", "Content Platform", "Responsive UI", "Business Operations"],
    summary:
      "A digital platform for nation-based fan engagement, content management, and online business operations around World Cup 2026 brand participation.",
    highlights: [
      "Developed responsive frontend interfaces and business-facing platform flows.",
      "Built scalable backend/API foundations for content and online operations.",
      "Source code is private; public portfolio includes screenshots only."
    ],
    tests: ["Live site smoke test", "Desktop screenshot capture", "Responsive content review"]
  },
  {
    title: "CafeSystem",
    type: "Private-source SaaS showcase",
    image: "screenshots/cafesystem.png",
    live: null,
    privateShowcase: true,
    source: null,
    tags: ["SaaS", "QR Ordering", "Cloudflare Workers", "Payments", "AI Concierge"],
    summary:
      "A cafe ordering and operations platform with QR menus, kitchen display flow, loyalty, analytics, and AI concierge features.",
    highlights: [
      "Built a complete customer-facing SaaS concept with pricing, demo flows, and cafe operations UX.",
      "Designed for independent cafes with ordering, kitchen, loyalty, analytics, and multilingual flows.",
      "Source code is private; public portfolio includes screenshots only."
    ],
    tests: ["Private screenshot review", "Desktop screenshot capture", "Anchor navigation check"]
  },
  {
    title: "DocAssistant",
    type: "Open-source portfolio project",
    image: "screenshots/docassistant.png",
    live: null,
    source: "https://github.com/MoHekal/docassistant",
    tags: ["Next.js", "FastAPI", "RAG", "Qdrant", "OpenAI", "Docker"],
    summary:
      "A document intelligence SaaS prototype with workspace-based document upload, semantic retrieval, and AI chat over business documents.",
    highlights: [
      "FastAPI backend for auth, workspaces, documents, chat, and admin flows.",
      "RAG-oriented services for text extraction, embeddings, vector search, and LLM responses.",
      "Dockerized infrastructure using PostgreSQL, Redis, Qdrant, and Nginx."
    ],
    tests: ["Frontend route smoke test", "Repository docs reviewed", "Build command documented"]
  },
  {
    title: "SupportAI",
    type: "Open-source portfolio project",
    image: "screenshots/supportai.png",
    live: null,
    source: "https://github.com/MoHekal/supportai",
    tags: ["Next.js", "FastAPI", "RAG", "Tickets", "Analytics", "Stripe"],
    summary:
      "A multi-tenant AI customer support platform with knowledge upload, support tickets, analytics, and an embeddable widget.",
    highlights: [
      "Dashboard pages for tenants, documents, chat, tickets, settings, and analytics.",
      "Backend routes for widget config, webhooks, AI chat, document ingestion, and billing hooks.",
      "Embeddable public widget script for customer-facing support."
    ],
    tests: ["Next.js landing page smoke test", "Public widget file check", "Repository docs reviewed"]
  },
  {
    title: "AI Architecture Diagram Generator",
    type: "Open-source portfolio project",
    image: "screenshots/diagram-generator.png",
    live: null,
    source: "https://github.com/MoHekal/ai-architecture-diagram-generator",
    tags: ["React", "FastAPI", "Vision AI", "Mermaid", "BPMN", "PlantUML"],
    summary:
      "A vision-assisted tool that converts sketches, BIM workflows, and process images into editable architecture diagrams.",
    highlights: [
      "Editable graph canvas with node and edge controls.",
      "Optional OpenAI/Gemini vision analysis with local deterministic fallback.",
      "Exports to Mermaid, draw.io XML, BPMN XML, and PlantUML."
    ],
    tests: ["Vite build", "FastAPI health route", "Screenshot capture from local app"]
  },
  {
    title: "AI Workflow Automation Builder",
    type: "Open-source portfolio project",
    image: "screenshots/workflow-builder.png",
    live: null,
    source: "https://github.com/MoHekal/ai-workflow-automation-builder",
    tags: ["React Flow", "FastAPI", "Celery", "Automation", "Workflow Engine"],
    summary:
      "A visual builder for AI and business automation flows with drag-and-drop nodes and backend execution endpoints.",
    highlights: [
      "React Flow canvas for trigger, action, notification, and AI nodes.",
      "Property panel for node configuration and workflow editing.",
      "FastAPI endpoints for saving and executing workflow definitions."
    ],
    tests: ["Frontend build attempt", "API route inspection", "Screenshot capture from local app"]
  },
  {
    title: "NutriAI",
    type: "Open-source mobile project",
    image: "screenshots/nutriai.png",
    live: null,
    source: "https://github.com/MoHekal/nutriai",
    tags: ["Flutter", "Supabase", "AI Coaching", "Nutrition", "Mobile"],
    summary:
      "A Flutter nutrition and fitness tracking app with meal logging, workout summaries, progress dashboards, and AI coaching insights.",
    highlights: [
      "Layered Flutter architecture with Riverpod, GoRouter, domain entities, and repository contracts.",
      "Supabase functions for meal analysis, generated insights, and weekly reports.",
      "Provider-based AI service layer for OpenAI, Claude, and DeepSeek."
    ],
    tests: ["Repository hygiene scan", "Flutter project structure review", "GitHub source link verified"]
  },
  {
    title: "Qwen3-Coder Studio",
    type: "Open-source portfolio project",
    image: "screenshots/qwen-studio.png",
    live: null,
    source: "https://github.com/MoHekal/qwen3-coder-studio",
    tags: ["Node.js", "Electron", "Hugging Face", "Qwen", "Developer Tools"],
    summary:
      "A local web and desktop coding workspace for Qwen3-Coder through Hugging Face Inference Providers.",
    highlights: [
      "Project file browser, prompt composer, selected-file context, and proposed edit handling.",
      "Local server keeps Hugging Face tokens away from browser JavaScript.",
      "Desktop mode with Electron and safe file filtering for sensitive paths."
    ],
    tests: ["Node syntax check", "Local server screenshot", "Sensitive file filtering reviewed"]
  }
];

export const education = [
  "Bachelor of Computer Science - Germany, 10/2023 - Present",
  "Bachelor of Electrical Engineering - Tanta University, Egypt, 09/2018 - 09/2021"
];

export const verification = [
  {
    project: "Portfolio",
    checks: ["Production build", "Asset/link reference check", "Screenshot availability check"],
    status: "Passed"
  },
  {
    project: "Qwen3-Coder Studio",
    checks: ["Node syntax check", "Electron entry check", "Local server screenshot"],
    status: "Passed"
  },
  {
    project: "AI Architecture Diagram Generator",
    checks: ["TypeScript compile", "Vite production build", "Local app screenshot"],
    status: "Passed"
  },
  {
    project: "AI Workflow Automation Builder",
    checks: ["TypeScript compile", "Vite production build", "Local app screenshot"],
    status: "Passed"
  },
  {
    project: "SupportAI",
    checks: ["Next.js production build", "Static route generation", "Local screenshot"],
    status: "Passed"
  },
  {
    project: "DocAssistant",
    checks: ["Next.js production build", "Static route generation", "Local screenshot"],
    status: "Passed"
  },
  {
    project: "NationStage and CafeSystem",
    checks: ["Live URL smoke test", "Screenshot capture", "Private-source boundary respected"],
    status: "Passed"
  }
];
