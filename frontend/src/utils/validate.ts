export interface ContactForm { name: string; email: string; message: string; honeypot: string }
export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export function validateContact(f: ContactForm): ContactErrors {
  const e: ContactErrors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name (2+ characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  else if (f.message.length > 3000) e.message = 'Message is too long (3000 max).';
  return e;
}
