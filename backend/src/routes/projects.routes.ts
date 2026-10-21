import { Router, Request, Response } from 'express';
import { VERIFIED_PROJECTS } from '../data/projects.data.js';

const router = Router();

// GET all projects
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    total: VERIFIED_PROJECTS.length,
    projects: VERIFIED_PROJECTS,
  });
});

// GET project by slug
router.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const project = VERIFIED_PROJECTS.find(p => p.slug === slug || p.id === slug);

  if (!project) {
    res.status(404).json({
      success: false,
      message: `Project with slug '${slug}' not found.`,
    });
    return;
  }

  res.json({
    success: true,
    project,
  });
});

export default router;
