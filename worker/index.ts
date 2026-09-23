/**
 * Serves the static site, and routes partner referral links (/r/<code>)
 * to the small redirect page that resolves the code in the browser.
 */
export interface Env { ASSETS: Fetcher }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/r' || url.pathname.startsWith('/r/')) {
      return env.ASSETS.fetch(new Request(new URL('/r/', url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
