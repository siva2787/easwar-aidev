import { z } from 'zod';

export const ContactSubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name cannot exceed 80 characters'),
  email: z.string().trim().email('Please provide a valid email address').max(120, 'Email cannot exceed 120 characters'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(120, 'Subject cannot exceed 120 characters').optional().default('Collaboration Inquiry'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters long').max(3000, 'Message cannot exceed 3000 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;
