import { revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

/**
 * Sanity webhook target. In manage.sanity.io > API > Webhooks:
 *   URL:        https://<your-site>/api/revalidate
 *   Trigger on: create, update, delete
 *   Filter:     _type in ["service", "roadMap", "caseStudy"]
 *   Projection: {_type, "slug": slug.current}
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response('SANITY_REVALIDATE_SECRET is not set', { status: 500 });

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: { _type?: string; slug?: string | null };
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const tags = new Set<string>();
  if (payload._type) tags.add(payload._type);
  if (payload._type && payload.slug) tags.add(`${payload._type}:${payload.slug}`);
  // The road map embeds service names, colors, and links, so a service change refreshes it too
  if (payload._type === 'service') tags.add('roadMap');

  tags.forEach((tag) => revalidateTag(tag));
  return Response.json({ revalidated: [...tags] });
}
