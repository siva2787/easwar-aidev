export type ThemeMode = 'light' | 'dark';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Full-Stack' | 'Intelligent Utility' | 'Mobile' | 'Data App' | 'Mobile / Web' | 'Web';
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  color: string;
  skills: {
    name: string;
    level: string;
    context: string;
    iconLetter: string;
  }[];
}

export interface JourneyMilestone {
  period: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  highlights: string[];
  type: 'internship' | 'hackathon' | 'academic' | 'industry';
  badgeColor: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  type: string;
  skills: string[];
  description: string;
  image?: string;
  credentialUrl?: string;
  verifiedBy?: string;
  color: string;
}

export interface NarrationItem {
  sectionId: string;
  sectionTitle: string;
  script: string;
  estimatedDurationSeconds: number;
}