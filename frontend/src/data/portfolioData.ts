import type { ProjectItem, SkillGroup, JourneyMilestone, CertificateItem, NarrationItem } from '../types/portfolio';

export const PERSONAL_IDENTITY = {
  name: 'Easwar S',
  shortTitle: 'AI/ML Engineer & Full-Stack Developer',
  headline: 'Turning Ideas Into Real Impact',
  bioSummary: 'Engineering adaptive AI platforms, full-stack web applications, and data-driven systems designed for real-world impact.',
  institution: 'Arasu Engineering College (AI & DS)',
  location: 'Kumbakonam / Chennai, India',
  email: 'sivaai2787@gmail.com',
  siteUrl: 'https://easwar-dev.vercel.app/',
  github: 'https://github.com/siva2787/',
  linkedin: 'https://www.linkedin.com/in/siva2787/',
  avatarUrl: '/easwar-portrait.png',
  openToWork: true,
  statusBadge: 'Available for Internships & AI Engineering Roles',
};

export const NARRATION_SCRIPTS: Record<string, NarrationItem> = {
  hero: {
    sectionId: 'hero',
    sectionTitle: 'Prologue',
    script: "Hi, I'm Easwar. Welcome to my portfolio. I'm passionate about building intelligent software and meaningful digital experiences. Let me walk you through my projects, technical architecture, and problem-solving journey.",
    estimatedDurationSeconds: 12,
  },
  about: {
    sectionId: 'about',
    sectionTitle: 'Philosophy',
    script: "My journey is driven by curiosity, experimentation, and a desire to turn ideas into useful products. I believe machine learning creates true value only when coupled with clean full-stack architecture and intuitive user interfaces.",
    estimatedDurationSeconds: 14,
  },
  journey: {
    sectionId: 'journey',
    sectionTitle: 'Journey',
    script: "Here is my engineering journey — from competitive national hackathons like Smart India Hackathon, to virtual internships at CodeAlpha, and industrial exposure to enterprise production systems.",
    estimatedDurationSeconds: 13,
  },
  skills: {
    sectionId: 'skills',
    sectionTitle: 'Expertise',
    script: "My technical toolkit brings together Python and deep learning frameworks with modern React, Node.js, and cloud deployments. Every skill here is backed by concrete code in real projects.",
    estimatedDurationSeconds: 12,
  },
  projects: {
    sectionId: 'projects',
    sectionTitle: 'Case Studies',
    script: "Here are some of the software products I have built. Each project challenged me to think deeply about system architecture, data flow, predictive accuracy, and end-user experience.",
    estimatedDurationSeconds: 13,
  },
  experience: {
    sectionId: 'experience',
    sectionTitle: 'Credentials',
    script: "Take a look at my verified internships, simulation achievements, and industry workshops covering data analytics, forensic technology, and ethical cybersecurity.",
    estimatedDurationSeconds: 11,
  },
  contact: {
    sectionId: 'contact',
    sectionTitle: 'Closing Scene',
    script: "If you have an engineering challenge, an internship opportunity, or an exciting project in mind, I'd love to connect. Drop a message or reach out on LinkedIn.",
    estimatedDurationSeconds: 11,
  },
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'studentau-helper',
    slug: 'studentau-helper',
    title: 'StudentAU',
    tagline: 'Internal marks, attendance and target-score calculator',
    category: 'Data App',
    summary: 'A web utility that computes internal marks, tracks attendance margins and works out the scores needed for a target result.',
    problem: 'Students calculated internal assessment marks and attendance by hand, and were surprised by shortfalls.',
    solution: 'An interactive calculator that takes assessment inputs and shows clear safety thresholds and projected outcomes.',
    architecture: [
      'Streamlit app with reactive input widgets',
      'Python and Pandas logic modelling the internal-mark formulas',
      'Charts displaying projected outcomes',
    ],
    techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy'],
    highlights: [
      'Internal-mark calculator for university formulas',
      'Attendance shortfall forecasting',
      'Usable on mobile and desktop',
    ],
    githubUrl: 'https://github.com/siva2787/studentau',
    liveUrl: 'https://studentauapp.streamlit.app/',
    image: '/studentau.webp',
    featured: true,
  },
  {
    id: 'ai-personalized-learning',
    slug: 'ai-personalized-learning',
    title: 'AI Personalized Learning',
    tagline: 'Adaptive study sequencing and learner mastery tracking',
    category: 'AI / ML',
    summary: 'A full-stack learning platform that tailors content to each student’s pace and performance history.',
    problem: 'One-size-fits-all curricula leave conceptual gaps unresolved before students move on to harder topics.',
    solution: 'An adaptive evaluation flow that diagnoses knowledge gaps, recommends targeted modules and visualises mastery across subjects.',
    architecture: [
      'React frontend with modular components and analytics views',
      'Node.js / Express API handling authentication and progress persistence',
      'Python service computing mastery scores and next-step recommendations',
      'MongoDB storing questions, submissions and mastery data',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'JWT'],
    highlights: [
      'Diagnostic assessment with adjustable question difficulty',
      'Analytics dashboard showing mastery across curriculum domains',
      'JWT-secured API and a deployed live demo',
    ],
    githubUrl: 'https://github.com/siva2787/AI-PERSONALIZED-LEARNING',
    liveUrl: 'https://ai-personalized-learning-coral.vercel.app/',
    image: '/ai-personalized-learning.webp',
    featured: true,
  },
  {
    id: 'resumeiq',
    slug: 'resumeiq',
    title: 'ResumeIQ',
    tagline: 'AI resume analyser with ATS-style scoring and skill-gap insights',
    category: 'AI / ML',
    summary: 'Scans a resume against a target role, flags missing keywords and formatting risks, and suggests concrete improvements.',
    problem: 'Job seekers rarely know why automated screening filters out their applications.',
    solution: 'An analyser that parses resumes, benchmarks skill coverage for a role and returns a visual scorecard with actionable recommendations.',
    architecture: [
      'React 19 + TypeScript single-page interface',
      'Zustand store managing parsing stages and cached scores',
      'AI analysis pipeline for keyword extraction and rubric scoring',
      'Report export for downloadable feedback',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    highlights: [
      'Readability and keyword relevance scoring',
      'Skill-gap view comparing a resume with role requirements',
      'Exportable diagnostic report',
    ],
    githubUrl: 'https://github.com/siva2787/ResumeIQ-2',
    liveUrl: 'https://resume-iq-2.vercel.app/',
    image: '/resumeiq.webp',
    featured: true,
  },
  {
    id: 'arasumate',
    slug: 'arasumate',
    title: 'Arasumate',
    tagline: 'Student academic management app for campus life',
    category: 'Mobile / Web',
    summary: 'A Flutter app that keeps core academic utilities for Arasu Engineering College students in one place.',
    problem: 'Students juggle scattered tools for academic tracking, and campus connectivity is unreliable.',
    solution: 'A single Flutter application with local persistence that brings essential academic utilities together.',
    architecture: ['Flutter client', 'Local on-device persistence', 'Web build deployed on Vercel'],
    techStack: ['Flutter', 'Dart', 'Local storage'],
    highlights: ['Built for students of Arasu Engineering College', 'Offline-friendly by design', 'Live web build'],
    githubUrl: 'https://github.com/siva2787/arasumate-v3',
    liveUrl: 'https://arasumate-v1l.vercel.app/',
    image: '/arasumate.webp',
    featured: true,
  },
  {
    id: 'legalmet-ai',
    slug: 'legalmet-ai',
    title: 'Legal AI',
    tagline: 'Legal Metrology compliance checks for packaged-goods labels',
    category: 'AI / ML',
    summary: 'Reads package label images and checks mandatory declarations for compliance.',
    problem: 'Sellers risk penalties when mandatory label declarations are missing or wrong.',
    solution: 'OCR-based extraction plus rule checks that flag missing or non-conforming fields.',
    architecture: ['React + TypeScript + Vite + Tailwind client', 'Express API with SQLite storage', 'Gemini-powered label OCR and rule validation'],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'SQLite', 'Gemini'],
    highlights: ['Label OCR', 'Compliance pass/fail breakdown'],
    githubUrl: 'https://github.com/siva2787/legal-ai',
    liveUrl: 'https://legal-ai-umber-two.vercel.app/',
    image: '/legal-ai.webp',
    featured: true,
  },
  {
    id: 'zone',
    slug: 'zone',
    title: 'Zone',
    tagline: 'Adaptive learning engine built for a 36-hour hackathon',
    category: 'Full-Stack',
    summary: 'An intelligent learning platform (MasteryFlow) built for YUVA MEGATHON 2026, EDUGENAI at SRM Trichy.',
    problem: 'Learners progress on a fixed schedule instead of on demonstrated mastery.',
    solution: 'A mastery-based flow that adapts what a learner studies next.',
    architecture: ['Adaptive learning engine', 'Mastery-driven progression'],
    techStack: ['React', 'TypeScript'],
    highlights: ['Built within a 36-hour hackathon window'],
    githubUrl: 'https://github.com/siva2787/zone',
    liveUrl: 'https://zone-v2.onrender.com/',
    image: '/zone.webp',
    featured: true,
  },
  {
    id: 'abi-woodworks',
    slug: 'abi-woodworks',
    title: 'Abi Wood Works',
    tagline: 'Business website for a woodworking studio',
    category: 'Web',
    summary: 'A responsive business website presenting a woodworking studio’s craft, services and contact details.',
    problem: 'A local woodworking business needed an online presence to showcase its work and reach customers.',
    solution: 'A fast, responsive website that presents the studio’s work and makes enquiries easy.',
    architecture: ['Responsive React front end', 'Static deployment on Vercel'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Responsive across mobile and desktop', 'Live client-facing deployment'],
    githubUrl: 'https://github.com/siva2787/abi-woodworks',
    liveUrl: 'https://abi-woodworks.vercel.app/',
    image: '/abi-woodworks.webp',
    featured: true,
  },
];

export const PROJECT_STATS = { projects: FEATURED_PROJECTS.length };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    description: 'Foundational languages for systems programming, data pipelines, and client development.',
    color: '#3b82f6',
    skills: [
      { name: 'Python', level: 'Advanced', context: 'Data Science, PyTorch, FastAPI, ML Pipelines', iconLetter: 'Py' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', context: 'Modern Async Flows, DOM, React Ecosystem', iconLetter: 'JS' },
      { name: 'TypeScript', level: 'Intermediate', context: 'Strict typing, full-stack data models & interfaces', iconLetter: 'TS' },
      { name: 'HTML5 / Modern CSS', level: 'Advanced', context: 'Semantic layouts, responsive grids, animations', iconLetter: 'H5' },
    ]
  },
  {
    category: 'AI, Machine Learning & LLMs',
    description: 'Frameworks and tooling applied to predictive modeling, NLP, and agentic workflows.',
    color: '#8b5cf6',
    skills: [
      { name: 'PyTorch', level: 'Intermediate', context: 'Neural network training, tensor calculations', iconLetter: 'Pt' },
      { name: 'scikit-learn', level: 'Advanced', context: 'Classification, regression, clustering, preprocessing', iconLetter: 'Sk' },
      { name: 'HuggingFace', level: 'Intermediate', context: 'Transformers, pipeline inference, model evaluation', iconLetter: 'HF' },
      { name: 'LLM & RAG Pipelines', level: 'Intermediate', context: 'Prompt orchestration, embeddings, active recall', iconLetter: 'LL' },
      { name: 'Pandas & NumPy', level: 'Advanced', context: 'High-throughput data manipulation and EDA', iconLetter: 'Pd' },
    ]
  },
  {
    category: 'Frontend & UI Engineering',
    description: 'Crafting responsive, editorial user experiences with robust state management.',
    color: '#06b6d4',
    skills: [
      { name: 'React 18 / 19', level: 'Advanced', context: 'Hooks, custom state architectures, reusable design systems', iconLetter: 'Re' },
      { name: 'Tailwind CSS', level: 'Advanced', context: 'Custom utility design systems, dark mode palettes', iconLetter: 'TW' },
      { name: 'Three.js / WebGL', level: 'Intermediate', context: 'Interactive 3D geometry, lighting, particle fields', iconLetter: '3D' },
      { name: 'Framer Motion', level: 'Intermediate', context: 'Declarative layout transitions & micro-interactions', iconLetter: 'FM' },
    ]
  },
  {
    category: 'Backend & APIs',
    description: 'Constructing performant, resilient API layers and data access gates.',
    color: '#10b981',
    skills: [
      { name: 'FastAPI', level: 'Intermediate', context: 'High-performance async Python APIs, OpenAPI schemas', iconLetter: 'FA' },
      { name: 'Node.js & Express', level: 'Intermediate', context: 'REST architecture, JWT auth, middleware chains', iconLetter: 'Nd' },
      { name: 'PostgreSQL', level: 'Intermediate', context: 'Relational schemas, indexing, ACID compliance', iconLetter: 'PG' },
      { name: 'MongoDB', level: 'Intermediate', context: 'Document schemas, dynamic query aggregation', iconLetter: 'Mg' },
    ]
  },
  {
    category: 'Infrastructure, DevOps & Tools',
    description: 'Disciplined version control, containerization, and modern developer tooling.',
    color: '#f59e0b',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', context: 'Trunk workflows, pull requests, open-source repos', iconLetter: 'Gt' },
      { name: 'Docker', level: 'Intermediate', context: 'Containerizing Python & Node services for deployment', iconLetter: 'Dk' },
      { name: 'Linux / Bash', level: 'Intermediate', context: 'Shell automation, remote server environments', iconLetter: 'Lx' },
      { name: 'Vercel / Cloud', level: 'Intermediate', context: 'Continuous integration, edge deployments, DNS', iconLetter: 'Vc' },
    ]
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: 'Ongoing',
    role: 'B.Tech — Artificial Intelligence & Data Science',
    organization: 'Arasu Engineering College',
    location: 'Kumbakonam, Tamil Nadu',
    description: 'Studying AI and data science while building full-stack and machine-learning projects alongside coursework.',
    highlights: ['AI/ML and data science coursework', 'Full-stack and machine-learning projects'],
    type: 'academic',
    badgeColor: '#3b4df0'
  },
  {
    period: 'Sep 2025',
    role: 'Smart India Hackathon Participant',
    organization: 'Smart India Hackathon 2025',
    location: 'National Level',
    description: 'Collaborated with a team to prototype an end-to-end software solution for a real-world problem statement under jury evaluation.',
    highlights: [
      'Worked in a team on a time-boxed prototype sprint',
      'Practised rapid prototyping under evaluation pressure'
    ],
    type: 'hackathon',
    badgeColor: '#6366f1'
  },
  {
    period: 'Dec 2025 – Jan 2026',
    role: 'Data Analytics Intern',
    organization: 'CodeAlpha · Virtual Internship Program',
    location: 'Remote (Govt. of India MSME Recognized)',
    description: 'Conducted exploratory data analysis, built statistical predictive models, and translated raw data into visual executive summaries. Received formal Letter of Recommendation for exceptional dedication.',
    highlights: [
      'Executed Python analytics notebooks utilizing Pandas, NumPy, and Matplotlib',
      'Formulated risk profiling and data storytelling frameworks',
      'Earned verifiable certificate of merit and recommendation'
    ],
    type: 'internship',
    badgeColor: '#10b981'
  },
  {
    period: 'Feb 2026',
    role: 'Industrial Visit',
    organization: 'Spectrum Softtech Solutions Pvt. Ltd.',
    location: 'Kochi, Kerala',
    description: 'Participated in an industrial visit, studying production software architectures, server infrastructure, and enterprise deployment pipelines.',
    highlights: [
      'Studied enterprise data center operations and production security layers',
      'Gained firsthand insights into large-scale commercial software lifecycles'
    ],
    type: 'industry',
    badgeColor: '#06b6d4'
  },
  {
    period: 'Apr 2026',
    role: 'Best Volunteer Award',
    organization: 'Arasu FM 90.4',
    description: 'Received the Best Volunteer award from Arasu FM 90.4 in recognition of consistent contribution and commitment.',
    highlights: ['Recognised for dedication and teamwork'],
    type: 'academic',
    badgeColor: '#f59e0b'
  },
  {
    period: 'Jun 2026',
    role: 'AI/ML Intern',
    organization: 'Softrate',
    location: 'Tech Park, Chennai',
    description: 'Completed an AI/ML internship at Softrate, gaining hands-on experience in an industry environment.',
    highlights: ['Hands-on AI/ML work in an industry setting'],
    type: 'internship',
    badgeColor: '#10b981'
  },
  {
    period: 'Sep 2026',
    role: 'Hackathon Participant',
    organization: 'YUVA MegaThon · SIH’26 · Uran’26',
    location: 'SRM, Trichy · PMIST',
    description: 'Competed in three hackathons in a single month, building and presenting working prototypes with my team.',
    highlights: [
      'YUVA MegaThon at SRM, Trichy',
      'Smart India Hackathon 2026',
      'Uran’26 Hackathon at PMIST'
    ],
    type: 'hackathon',
    badgeColor: '#6366f1'
  },
  {
    period: 'Oct 2026',
    role: 'Chief Executive Officer',
    organization: 'StormForge Technologies · Startup',
    description: 'Leading StormForge Technologies, a startup that designs and delivers web and mobile applications for clients.',
    highlights: ['Startup and entrepreneurship', 'Client-focused product delivery'],
    type: 'industry',
    badgeColor: '#3b4df0'
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-ethical-hacking',
    name: 'Ethical Hacking Masterclass',
    issuer: 'Cydenium',
    date: '5 April 2026',
    type: 'Cybersecurity Masterclass',
    skills: ['Vulnerability Assessment', 'Network Reconnaissance', 'Responsible Disclosure', 'Security Fundamentals'],
    description: 'Completed an intensive ethical hacking training module focusing on practical vulnerability auditing, defensive posture, and ethical boundary testing.',
    verifiedBy: 'Naveen Aryan, Founder & CEO',
    image: '/certs/ethical-hacking.jpeg',
    color: '#6366f1'
  },
  {
    id: 'cert-codealpha',
    name: 'Data Analytics Internship Certificate & LOR',
    issuer: 'CodeAlpha (MSME Recognized)',
    date: '10 Jan 2026',
    type: 'Virtual Internship & LOR',
    skills: ['Python Data Analysis', 'Pandas', 'Predictive Modeling', 'Data Visualization'],
    description: 'Successfully completed virtual internship program with distinction. Earned formal Letter of Recommendation recognizing technical curiosity and problem-solving capability.',
    verifiedBy: 'Certificate ID: CA/DE1/6774 · CEO & Founder',
    color: '#10b981'
  },
  {
    id: 'cert-prime-vector',
    name: 'Prime Vector Applied Engineering Workshop',
    issuer: 'AICTE / MSME Government of India',
    date: '14 March 2026',
    type: 'Industry Workshop',
    skills: ['Applied Engineering', 'Emerging Tech', 'Systems Design'],
    description: 'Completed hands-on technology workshop sponsored by MSME & AICTE exploring modern engineering problem formulation.',
    verifiedBy: 'Cert ID: PV-WS-2026-0062',
    color: '#f59e0b'
  },
  {
    id: 'cert-deloitte',
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte · Forage',
    date: 'May 2026',
    type: 'Corporate Job Simulation',
    skills: ['Forensic Technology', 'Business Analytics', 'Client Presentation'],
    description: 'Completed real-world client data scenarios evaluating forensic signals and synthesizing business intelligence reports.',
    verifiedBy: 'Tina McCreery, CHRO — Deloitte',
    color: '#0284c7'
  },
  {
    id: 'cert-tata',
    name: 'GenAI Powered Data Analytics Simulation',
    issuer: 'Tata · Forage',
    date: 'May 2026',
    type: 'Corporate Job Simulation',
    skills: ['GenAI Workflows', 'Exploratory Data Analysis', 'Risk Profiling', 'Strategic AI Planning'],
    description: 'Simulated enterprise delinquency risk modeling and implemented automated generative AI analytics strategies.',
    verifiedBy: 'Tom Brunskill, Co-Founder — Forage',
    color: '#06b6d4'
  },
  {
    id: 'cert-british-airways',
    name: 'Data Science Simulation',
    issuer: 'British Airways · Forage',
    date: 'May 2026',
    type: 'Corporate Job Simulation',
    skills: ['Predictive ML Modeling', 'Customer Behaviour Analysis', 'Data Wrangling'],
    description: 'Constructed machine learning models to predict customer flight bookings and passenger lounge eligibility at London Heathrow.',
    verifiedBy: 'British Airways Engineering Team',
    color: '#e11d48'
  }
];