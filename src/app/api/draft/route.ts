import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/** Studio "Open preview" links here: /api/draft?secret=...&path=/services/creative */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = process.env.SANITY_PREVIEW_SECRET;

  if (!secret || searchParams.get('secret') !== secret) {
    return new Response('Invalid preview secret', { status: 401 });
  }
  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response('SANITY_API_READ_TOKEN is not set, so drafts cannot be read.', { status: 500 });
  }

  // Only allow redirects to paths on this site
  const path = searchParams.get('path') ?? '/';
  const safePath = path.startsWith('/') && !path.startsWith('//') ? path : '/';

  (await draftMode()).enable();
  redirect(safePath);
}
