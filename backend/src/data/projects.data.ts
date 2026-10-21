export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Full-Stack' | 'Intelligent Utility';
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
}

export const VERIFIED_PROJECTS: ProjectRecord[] = [
  {
    id: 'ai-personalized-learning',
    slug: 'ai-personalized-learning',
    title: 'AI Personalized Learning Platform',
    tagline: 'Adaptive AI-driven study sequencing & predictive learner mastery',
    category: 'AI / ML',
    summary: 'A full-stack intelligent learning platform that dynamically tailors educational content to student pace, performance history, and knowledge retention curves.',
    problem: 'One-size-fits-all curricula cause high student cognitive fatigue and leave conceptual gaps unresolved before advancing to complex topics.',
    solution: 'Designed an adaptive evaluation engine that diagnoses knowledge gaps in real time, recommends targeted remedial modules, and graphs mastery trajectories across subjects.',
    architecture: [
      'React frontend with modular component architecture & interactive visual analytics',
      'Node.js & Express API gateway managing authentication and progress persistence',
      'Python ML microservice computing student mastery scores and next-best learning recommendations',
      'MongoDB database indexing questions, student submission vectors, and mastery graphs'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'JWT', 'REST API'],
    highlights: [
      'Real-time student diagnostic assessment with dynamic question difficulty scaling',
      'Intuitive analytics dashboard visualizing mastery heatmaps across curriculum domains',
      'Deployed full-stack with secure JWT authentication and modular microservice endpoints'
    ],
    githubUrl: 'https://github.com/siva2787/AI-PERSONALIZED-LEARNING',
    liveUrl: 'https://ai-personalized-learning-coral.vercel.app/',
    metrics: [
      { label: 'Architecture', value: 'Microservice' },
      { label: 'Auth Mode', value: 'JWT / Secure Cookie' },
      { label: 'Evaluation', value: 'Real-time Scoring' }
    ],
    featured: true
  },
  {
    id: 'resumeiq',
    slug: 'resumeiq',
    title: 'ResumeIQ — AI Resume Analyzer',
    tagline: 'ATS-grade semantic evaluation, skill gap breakdown & optimization insights',
    category: 'AI / ML',
    summary: 'A production-grade AI resume analysis system that scans resumes against target job roles, detects missing keywords, highlights formatting risks, and generates actionable structural recommendations.',
    problem: 'Job seekers struggle to understand why their applications are filtered out by automated Applicant Tracking Systems (ATS) and fail to align their experience with modern hiring rubrics.',
    solution: 'Constructed an AI-powered analyzer that parses PDF/text resumes, benchmarks skill coverage against industrial taxonomies, grades readability, and returns interactive visual scorecards.',
    architecture: [
      'React 19 single-page interface with responsive dashboard layout & Framer Motion transitions',
      'Zustand state store managing multi-stage resume parsing states and score caching',
      'AI analysis pipeline orchestrating semantic extraction, keyword gap identification, and rubric scoring',
      'Export engine compiling downloadable PDF diagnostic reports for job seekers'
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'AI Parsing'],
    highlights: [
      'Instant ATS-readability and keyword relevance scoring with visual breakdown gauges',
      'Detailed skill gap matrix comparing applicant credentials to target role requisites',
      'Comprehensive report generation highlighting actionable phrasing optimizations'
    ],
    githubUrl: 'https://github.com/siva2787/ResumeIQ',
    liveUrl: 'https://resume-iq-ruby.vercel.app/',
    metrics: [
      { label: 'Scoring Vectors', value: 'ATS, Skills, Structure' },
      { label: 'Client Framework', value: 'React 19 + TS' },
      { label: 'State Management', value: 'Zustand Store' }
    ],
    featured: true
  },
  {
    id: 'learntwin-ai',
    slug: 'learntwin-ai',
    title: 'LearnTwin AI',
    tagline: 'Cognitive digital twin for personalized study guidance & active recall',
    category: 'AI / ML',
    summary: 'An autonomous digital learning companion that mirrors student progress, builds a personalized knowledge graph, and conducts conversational retrieval practice.',
    problem: 'Students frequently review material passively without active recall, resulting in rapid retention decay and poor long-term exam performance.',
    solution: 'Engineered an interactive conversational tutor that questions students using Socratic techniques, evaluates concept comprehension, and schedules spaced repetitions.',
    architecture: [
      'Modern web client built with responsive mobile-first typography and dynamic chat flows',
      'Prompt orchestration engine structuring adaptive active recall drills',
      'Knowledge vector representation tracking concept grasp over recurring study sessions'
    ],
    techStack: ['TypeScript', 'React', 'Python', 'FastAPI', 'LLM Prompting', 'Vector Embeddings'],
    highlights: [
      'Socratic dialogue mode challenging students to explain fundamental concepts in their own words',
      'Dynamic retention index identifying weak conceptual nodes prior to testing intervals',
      'Lightweight API layer designed for high responsiveness during multi-turn study sessions'
    ],
    githubUrl: 'https://github.com/siva2787/learntwin-ai',
    metrics: [
      { label: 'Interaction Pattern', value: 'Socratic Active Recall' },
      { label: 'Focus Area', value: 'Retention Optimization' }
    ],
    featured: true
  },
  {
    id: 'studentau-helper',
    slug: 'studentau-helper',
    title: 'Student Helper App (ARASUMATE Utility)',
    tagline: 'Academic utility tool for internal marks forecasting & attendance management',
    category: 'Intelligent Utility',
    summary: 'A web utility built for university peers that computes internal marks, tracks attendance margins, and calculates required scores for targeted semester GPA tiers.',
    problem: 'Students struggled with manual calculations across multiple internal assessment rubrics, resulting in surprise grade penalties and attendance shortages.',
    solution: 'Developed an interactive calculation and forecasting dashboard that takes continuous assessment inputs and renders clear safety thresholds.',
    architecture: [
      'Streamlit web application with reactive numerical calculation widgets',
      'Python data analysis scripts modelling historical grading formulas',
      'Interactive visual distribution charts displaying grade trajectories'
    ],
    techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy'],
    highlights: [
      'Rapid assessment calculator modeling university-specific internal mark formulas',
      'Attendance deficit forecaster alerting users before falling below mandatory percentages',
      'Zero-friction deployment accessed directly by classmates across mobile and desktop devices'
    ],
    githubUrl: 'https://github.com/siva2787/studentau',
    liveUrl: 'https://studentauapp.streamlit.app',
    metrics: [
      { label: 'User Community', value: 'University Classmates' },
      { label: 'Deployment', value: 'Streamlit Cloud' }
    ],
    featured: true
  },
  {
    id: 'zone-masteryflow',
    slug: 'zone-masteryflow',
    title: 'ZONE — MasteryFlow Platform',
    tagline: 'Deep work focus environment and mastery-based engineering roadmap tracker',
    category: 'Full-Stack',
    summary: 'A dedicated focus dashboard integrating milestone execution, Pomodoro flow states, and curriculum mastery tracking for software engineers.',
    problem: 'Context switching and unstructured study schedules decrease deep coding output and lead to project abandonment.',
    solution: 'Built a flow-state workspace uniting engineering project checkpoints with structured distraction-free work intervals.',
    architecture: [
      'Component-based client application with keyboard-first navigation',
      'Local persistence with offline-first state synchronization',
      'Visual milestone progress visualizer with dynamic completion stats'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Storage API'],
    highlights: [
      'Integrated distraction-free focus timer synchronized with sprint objectives',
      'Linear milestone breakdown visualizing prerequisites before unlocking advanced tasks'
    ],
    featured: false
  },
  {
    id: 'legalmet-ai',
    slug: 'legalmet-ai',
    title: 'LegalMet AI / LegalMetriX',
    tagline: 'Legal Metrology compliance auditor & label requirement verification solution',
    category: 'AI / ML',
    summary: 'An automated document and packaging analysis prototype that checks consumer goods labeling against statutory Legal Metrology rules.',
    problem: 'E-commerce vendors frequently face heavy regulatory fines due to non-compliant packaging declarations and mandatory field omissions.',
    solution: 'Designed an optical and rule-based verification pipeline to audit mandatory declarations (MRP, manufacturing dates, net quantity, manufacturer origin).',
    architecture: [
      'Python processing pipeline for image pre-processing and text extraction',
      'Rule validation engine checking extracted packaging fields against regulatory checklists',
      'Review dashboard displaying validation pass/fail breakdowns with annotated evidence'
    ],
    techStack: ['Python', 'OCR / Vision', 'FastAPI', 'Regex Engine'],
    highlights: [
      'Automated extraction of mandatory statutory packaging fields',
      'Instant compliance scorecard flagging non-conformities and missing manufacturer data'
    ],
    featured: false
  }
];
