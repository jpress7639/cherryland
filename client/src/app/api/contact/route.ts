import { NextResponse } from 'next/server';

type Payload = {
  name?: string;
  email?: string;
  project?: string;
  service?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
};

const clean = (v: unknown, max = 4000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and drop it
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const message = clean(body.message);

  if (!name) return NextResponse.json({ error: 'Add your name.' }, { status: 422 });
  if (!emailRe.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 422 });
  if (!message) return NextResponse.json({ error: 'Tell us a little about the project.' }, { status: 422 });

  const project = clean(body.project, 200);
  const service = clean(body.service, 100);
  const budget = clean(body.budget, 100);

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (project) lines.push(`Artist / project: ${project}`);
  if (service) lines.push(`Service: ${service}`);
  if (budget) lines.push(`Budget: ${budget}`);
  lines.push('', message);
  const text = lines.join('\n');

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] email not configured, logging inquiry instead:\n' + text);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'Email is not configured on the server.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New inquiry: ${project || name}${service ? ` (${service})` : ''}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text());
    return NextResponse.json({ error: 'Could not send your inquiry. Try again in a moment.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
