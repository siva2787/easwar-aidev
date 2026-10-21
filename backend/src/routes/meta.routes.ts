import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    meta: {
      name: 'Easwar S',
      title: 'AI/ML Engineer & Full-Stack Developer',
      status: 'Open to Internships & Engineering Roles',
      location: 'Kumbakonam / Chennai, India',
      timezone: 'Asia/Kolkata (IST, UTC+5:30)',
      institution: 'Arasu Engineering College (AI & DS)',
      github: 'https://github.com/siva2787',
      linkedin: 'https://www.linkedin.com/in/easwar-s-3053a4386/',
      email: 'sivaai2787@gmail.com',
      verifiedSkills: [
        'Python', 'JavaScript', 'TypeScript', 'React', 'FastAPI', 'Node.js',
        'Express', 'PyTorch', 'scikit-learn', 'Streamlit', 'PostgreSQL',
        'MongoDB', 'Docker', 'AWS', 'Vercel', 'Git', 'Linux'
      ],
      coreCompetencies: [
        'End-to-End AI Web Systems',
        'Model Integration & Prompt Pipelines',
        'Full-Stack Component Architectures',
        'Predictive Analytics & Active Recall Systems',
        'Cybersecurity & Ethical Hacking Awareness'
      ],
      systemVersion: '2.0.0-cinematic',
      buildTimestamp: new Date().toISOString(),
    }
  });
});

export default router;
