import { Request, Response } from 'express';
import { ContactSubmissionSchema } from '../validators/contact.validator.js';

export interface ContactResponse {
  success: boolean;
  message: string;
  receiptId?: string;
  errors?: Record<string, string>;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/** Sends the message through Resend. Returns false if delivery is not configured or fails. */
export async function deliverEmail(p: { name: string; email: string; subject: string; message: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: p.email,
      subject: `[Portfolio] ${p.subject}`,
      html: `<p><b>${esc(p.name)}</b> &lt;${esc(p.email)}&gt;</p><p>${esc(p.message).replace(/\n/g, '<br>')}</p>`,
    }),
  });
  return res.ok;
}

export const handleContactSubmission = async (req: Request, res: Response): Promise<void> => {
  const parsed = ContactSubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[i.path.join('.') || 'form'] = i.message;
    res.status(400).json({ success: false, message: 'Please check the highlighted fields.', errors } as ContactResponse);
    return;
  }
  const { name, email, subject, message, honeypot } = parsed.data;
  if (honeypot) { // bots: pretend nothing, store nothing
    res.status(200).json({ success: true, message: 'Thanks!' } as ContactResponse);
    return;
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    res.status(503).json({ success: false, message: 'Email delivery is not configured on the server yet.' } as ContactResponse);
    return;
  }
  try {
    const ok = await deliverEmail({ name, email, subject, message });
    if (!ok) throw new Error('provider rejected');
    res.status(200).json({ success: true, message: 'Thank you! Your message has been sent.' } as ContactResponse);
  } catch (err) {
    console.error('[CONTACT] delivery failed', err instanceof Error ? err.message : err);
    res.status(502).json({ success: false, message: 'Your message could not be delivered right now.' } as ContactResponse);
  }
};
