import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://feycjrxrbwzcndsustxe.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWNqcnhyYnd6Y25kc3VzdHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTM2MDYsImV4cCI6MjA4MzEyOTYwNn0.PRatOPlv9qCEz1XEk91FKLrVS_2LMeXGoatPWDdgp-c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

/* ---------- commission tiers (same rules as the previous portal) ---------- */
export type Tier = 'bronze' | 'silver' | 'gold';
export const TIER_RATES: Record<Tier, number> = { bronze: 200, silver: 250, gold: 300 };
export const TIER_THRESHOLDS = { silver: 6, gold: 16 };

export function getTier(conversions: number): Tier {
  if (conversions >= TIER_THRESHOLDS.gold) return 'gold';
  if (conversions >= TIER_THRESHOLDS.silver) return 'silver';
  return 'bronze';
}
export function nextTier(conversions: number): { next: Tier | null; remaining: number; pct: number } {
  if (conversions >= TIER_THRESHOLDS.gold) return { next: null, remaining: 0, pct: 100 };
  if (conversions >= TIER_THRESHOLDS.silver) {
    const range = TIER_THRESHOLDS.gold - TIER_THRESHOLDS.silver;
    return { next: 'gold', remaining: TIER_THRESHOLDS.gold - conversions, pct: ((conversions - TIER_THRESHOLDS.silver) / range) * 100 };
  }
  return { next: 'silver', remaining: TIER_THRESHOLDS.silver - conversions, pct: (conversions / TIER_THRESHOLDS.silver) * 100 };
}

/* ---------- referral tracking ---------- */
export const REF_KEY = 'mz_partner_ref';
export interface StoredRef { code: string; partnerId: string }

export function readRef(): StoredRef | null {
  try {
    const ls = localStorage.getItem(REF_KEY);
    if (ls) return JSON.parse(ls);
  } catch {}
  const m = document.cookie.match(/(?:^|;\s*)mz_partner_ref=([^;]*)/);
  if (m) { try { return JSON.parse(decodeURIComponent(m[1])); } catch {} }
  return null;
}
export function storeRef(ref: StoredRef) {
  const v = JSON.stringify(ref);
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${REF_KEY}=${encodeURIComponent(v)}; expires=${expires}; path=/; SameSite=Lax`;
  try { localStorage.setItem(REF_KEY, v); } catch {}
}

/* ---------- validation ---------- */
export const UAE_PHONE = /^(\+971|00971|0)?5[0-9]{8}$/;
export const isUaePhone = (p: string) => UAE_PHONE.test(p.replace(/[\s-]/g, ''));
export const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
export function passwordProblem(p: string, L: (k: string) => string): string | null {
  if (p.length < 12) return L('pwLength');
  if (!/[A-Z]/.test(p)) return L('pwUpper');
  if (!/[a-z]/.test(p)) return L('pwLower');
  if (!/[0-9]/.test(p)) return L('pwDigit');
  if (!/[^A-Za-z0-9]/.test(p)) return L('pwSymbol');
  return null;
}

export const WHATSAPP = 'https://wa.me/971506552181';
export const SITE = 'https://markzonetech.com';
export const fmtDate = (d: string, lang: 'en' | 'ar') =>
  new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
