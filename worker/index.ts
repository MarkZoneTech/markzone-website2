/**
 * Serves the static site, routes partner referral links (/r/<code>) to the small
 * redirect page that resolves the code in the browser, and serves /api/rating:
 * the live Google rating for the business, cached for 6 hours.
 */
export interface Env {
  ASSETS: Fetcher;
  GOOGLE_PLACES_KEY?: string; // secret: Google Places API key
  GOOGLE_PLACE_ID?: string;   // secret/var: Place ID of the MarkZone Google listing
}

async function rating(env: Env, ctx: ExecutionContext, request: Request): Promise<Response> {
  const headers = { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600' };
  if (!env.GOOGLE_PLACES_KEY || !env.GOOGLE_PLACE_ID) return new Response('{}', { status: 503, headers });
  const cache = (caches as unknown as { default: Cache }).default;
  const key = new Request(new URL('/api/rating', request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;
  const r = await fetch(`https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}`, {
    headers: { 'X-Goog-Api-Key': env.GOOGLE_PLACES_KEY, 'X-Goog-FieldMask': 'rating,userRatingCount' },
  });
  if (!r.ok) return new Response('{}', { status: 502, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  const d = (await r.json()) as { rating?: number; userRatingCount?: number };
  if (!d.rating || !d.userRatingCount) return new Response('{}', { status: 502, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  const res = new Response(JSON.stringify({ value: d.rating.toFixed(1), count: d.userRatingCount }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=21600' },
  });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/rating') return rating(env, ctx, request);
    if (url.pathname === '/r' || url.pathname.startsWith('/r/')) {
      return env.ASSETS.fetch(new Request(new URL('/r/', url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
