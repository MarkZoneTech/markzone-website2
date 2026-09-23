import React, { useCallback, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import '../../styles/portal.css';
import {
  supabase, TIER_RATES, getTier, nextTier, isUaePhone, isEmail, passwordProblem,
  WHATSAPP, SITE, fmtDate, type Tier,
} from '../../lib/portal';
import { makeT, type Lang } from '../../lib/portal-i18n';

interface Props { lang?: Lang }

interface Referral {
  id: string; lead_name: string; lead_phone: string; lead_company: string | null;
  notes: string | null; status: string; commission_amount: number; created_at: string;
}
interface Payout { id: string; amount: number; status: string; payment_method: string | null; reference: string | null; created_at: string; paid_at: string | null }
interface PartnerProfile { id: string; referral_code: string; landing_page: string; commission_rate: number | null; use_tiered_commission: boolean }

const AR_PAGE = (lang: Lang, p: string) => (lang === 'ar' && p.startsWith('/') && !p.startsWith('/ar') ? `/ar${p === '/' ? '' : p}` : p);

export default function PartnerPortal({ lang = 'en' }: Props) {
  const t = useMemo(() => makeT(lang), [lang]);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<{ is_approved: boolean } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadRole = useCallback(async () => {
    if (!user) { setRole(null); setIsAdmin(false); return; }
    const { data } = await supabase.from('user_roles').select('role, is_approved').eq('user_id', user.id);
    const admin = (data || []).some((r: any) => r.role === 'admin');
    const partner = (data || []).find((r: any) => r.role === 'growth_partner');
    setIsAdmin(admin);
    if (partner) setRole({ is_approved: partner.is_approved });
    else if (admin) setRole({ is_approved: true });
    else {
      // brand-new sign-up: register the pending application
      await supabase.rpc('request_growth_partner');
      const { data: again } = await supabase.from('user_roles').select('is_approved').eq('user_id', user.id).eq('role', 'growth_partner').maybeSingle();
      setRole(again ? { is_approved: again.is_approved } : { is_approved: false });
    }
  }, [user]);

  useEffect(() => { loadRole(); }, [loadRole]);

  if (!ready) return <p className="pt-muted">{t('loading')}</p>;
  if (recovery && user) return <ResetPassword t={t} onDone={() => setRecovery(false)} />;
  if (!user) return <AuthPanel t={t} lang={lang} />;
  if (role && !role.is_approved) return <Pending t={t} email={user.email} onSignOut={() => supabase.auth.signOut()} />;
  return <Dashboard t={t} lang={lang} user={user} isAdmin={isAdmin} />;
}

/* ------------------------------------------------------------------ auth */
function AuthPanel({ t, lang }: { t: (k: any) => string; lang: Lang }) {
  const [mode, setMode] = useState<'in' | 'up' | 'reset'>('in');
  const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '' });
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null); setOk(null);
    if (!isEmail(form.email)) return setErr(t('badEmail'));
    setBusy(true);
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(form.email.trim(), {
          redirectTo: `${SITE}${lang === 'ar' ? '/ar' : ''}/growth-partner`,
        });
        if (error) throw error;
        setOk(t('resetSent'));
      } else if (mode === 'up') {
        if (form.fullName.trim().length < 2) throw new Error(t('nameRequired'));
        if (!isUaePhone(form.phone)) throw new Error(t('badPhone'));
        const pw = passwordProblem(form.password, t);
        if (pw) throw new Error(pw);
        const { error } = await supabase.auth.signUp({
          email: form.email.trim(), password: form.password,
          options: { data: { full_name: form.fullName.trim() }, emailRedirectTo: `${SITE}${lang === 'ar' ? '/ar' : ''}/growth-partner` },
        });
        if (error) throw error;
        const { data: s } = await supabase.auth.getSession();
        if (s.session?.user) {
          await supabase.from('profiles').update({ full_name: form.fullName.trim(), phone: form.phone.trim(), email: form.email.trim() }).eq('id', s.session.user.id);
          await supabase.rpc('request_growth_partner');
        }
        setOk(t('accountCreated'));
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
        if (error) throw error;
      }
    } catch (e: any) {
      setErr(e?.message || t('errorGeneric'));
    } finally { setBusy(false); }
  };

  return (
    <div className="pt-card pt-card--accent" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h2 className="pt-h2">{mode === 'up' ? t('createAccountTitle') : mode === 'reset' ? t('resetTitle') : t('welcomeBack')}</h2>
      <p className="pt-sub">{mode === 'up' ? t('signUpSub') : mode === 'reset' ? '' : t('signInSub')}</p>
      <form onSubmit={submit}>
        {mode === 'up' && (
          <>
            <label className="pt-field"><span>{t('fullName')}</span>
              <input className="pt-input" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} autoComplete="name" /></label>
            <label className="pt-field"><span>{t('phone')}</span>
              <input className="pt-input" dir="ltr" placeholder="+971 50 123 4567" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></label>
          </>
        )}
        <label className="pt-field"><span>{t('email')}</span>
          <input className="pt-input" dir="ltr" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></label>
        {mode !== 'reset' && (
          <label className="pt-field"><span>{t('password')}</span>
            <input className="pt-input" dir="ltr" type="password" value={form.password} onChange={(e) => set('password', e.target.value)}
              autoComplete={mode === 'up' ? 'new-password' : 'current-password'} /></label>
        )}
        <button className="btn btn--cta" style={{ width: '100%' }} disabled={busy}>
          {busy ? t('working') : mode === 'up' ? t('signUp') : mode === 'reset' ? t('updatePassword') : t('signIn')}
        </button>
        {err && <p className="pt-err">{err}</p>}
        {ok && <p className="pt-ok">{ok}</p>}
      </form>
      <div className="pt-row" style={{ marginTop: 18, justifyContent: 'space-between' }}>
        <button className="pt-link" onClick={() => { setMode(mode === 'up' ? 'in' : 'up'); setErr(null); setOk(null); }}>
          {mode === 'up' ? t('haveAccount') : t('noAccount')}
        </button>
        {mode !== 'reset' && <button className="pt-link" onClick={() => { setMode('reset'); setErr(null); setOk(null); }}>{t('forgot')}</button>}
      </div>
    </div>
  );
}

function ResetPassword({ t, onDone }: { t: (k: any) => string; onDone: () => void }) {
  const [pw, setPw] = useState(''); const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    const problem = passwordProblem(pw, t);
    if (problem) return setErr(problem);
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) setErr(error.message); else onDone();
  };
  return (
    <div className="pt-card pt-card--accent" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2 className="pt-h2">{t('resetTitle')}</h2>
      <form onSubmit={save}>
        <label className="pt-field"><span>{t('newPassword')}</span>
          <input className="pt-input" dir="ltr" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></label>
        <button className="btn btn--cta" style={{ width: '100%' }} disabled={busy}>{busy ? t('working') : t('updatePassword')}</button>
        {err && <p className="pt-err">{err}</p>}
      </form>
    </div>
  );
}

function Pending({ t, email, onSignOut }: { t: (k: any) => string; email?: string; onSignOut: () => void }) {
  const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hi MarkZone, I signed up as a Growth Partner (${email || ''}) and would like my account approved.`)}`;
  return (
    <div className="pt-card pt-card--accent" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
      <h2 className="pt-h2">{t('pendingTitle')}</h2>
      <p className="pt-sub">{t('pendingText')}</p>
      <a className="btn btn--cta" href={wa} rel="noopener" style={{ width: '100%' }}>{t('contactWa')}</a>
      <p style={{ marginTop: 16 }}><button className="pt-link" onClick={onSignOut}>{t('signOut')}</button></p>
    </div>
  );
}

/* ------------------------------------------------------------- dashboard */
function Dashboard({ t, lang, user, isAdmin }: { t: (k: any) => string; lang: Lang; user: any; isAdmin: boolean }) {
  const [profile, setProfile] = useState<{ full_name: string | null; phone: string | null }>({ full_name: '', phone: '' });
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [clicks, setClicks] = useState(0);
  const [refLeads, setRefLeads] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    const [{ data: prof }, { data: pp }, { data: refs }] = await Promise.all([
      supabase.from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle(),
      supabase.from('partner_profiles').select('id, referral_code, landing_page, commission_rate, use_tiered_commission').eq('user_id', user.id).maybeSingle(),
      supabase.from('referrals').select('*').order('created_at', { ascending: false }),
    ]);
    if (prof) setProfile(prof as any);
    setReferrals((refs as Referral[]) || []);
    if (pp) {
      setPartner(pp as PartnerProfile);
      const [{ count }, { data: leads }, { data: pays }] = await Promise.all([
        supabase.from('referral_clicks').select('id', { count: 'exact', head: true }).eq('partner_id', pp.id),
        supabase.from('leads').select('id').eq('referred_by_partner_id', pp.id),
        supabase.from('payouts').select('*').eq('partner_id', pp.id).order('created_at', { ascending: false }),
      ]);
      setClicks(count || 0); setRefLeads((leads || []).length); setPayouts((pays as Payout[]) || []);
    }
  }, [user.id]);
  useEffect(() => { load(); }, [load]);

  const converted = referrals.filter((r) => r.status === 'converted').length + refLeads;
  const tier: Tier = getTier(converted);
  const rate = partner && !partner.use_tiered_commission && partner.commission_rate != null ? Number(partner.commission_rate) : TIER_RATES[tier];
  const progress = nextTier(converted);
  const paidTotal = payouts.filter((p) => p.status === 'paid').reduce((s, p) => s + Number(p.amount || 0), 0);
  const pendingTotal = referrals
    .filter((r) => ['pending', 'contacted', 'qualified'].includes(r.status))
    .reduce((s, r) => s + (Number(r.commission_amount) || rate), 0);
  const link = partner ? `${SITE}/r/${partner.referral_code}` : '';

  return (
    <div>
      <div className="pt-card" style={{ marginBottom: 20 }}>
        <div className="pt-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 className="pt-h2">{t('dashboard')}</h2>
            <p className="pt-muted" style={{ margin: 0 }}>
              {profile.full_name || '—'} · <span dir="ltr">{user.email}</span> · <span dir="ltr">{profile.phone || '—'}</span>
            </p>
            <button className="pt-link" style={{ marginTop: 8 }} onClick={() => setEditing(true)}>{t('editProfile')}</button>
          </div>
          <div className="pt-row">
            {isAdmin && <a className="btn btn--outline" href={`${lang === 'ar' ? '/ar' : ''}/growth-partner/admin`}>{t('adminTitle')}</a>}
            <button className="btn btn--outline" onClick={() => supabase.auth.signOut()}>{t('signOut')}</button>
          </div>
        </div>
        {msg && <p className="pt-ok">{msg}</p>}
      </div>

      {editing && (
        <EditProfile t={t} initial={profile} onClose={() => setEditing(false)} onSave={async (v) => {
          const { error } = await supabase.from('profiles').update({ full_name: v.full_name, phone: v.phone }).eq('id', user.id);
          if (!error) { setProfile(v); setMsg(t('profileSaved')); setEditing(false); }
          return error?.message || null;
        }} />
      )}

      <div className="pt-grid pt-grid--3" style={{ marginBottom: 20 }}>
        <div className="pt-card pt-stat"><b>{referrals.length}</b><span className="pt-muted">{t('totalReferrals')}</span></div>
        <div className="pt-card pt-stat"><b dir="ltr">{pendingTotal.toLocaleString('en-US')} AED</b><span className="pt-muted">{t('pendingCommission')}</span></div>
        <div className="pt-card pt-stat"><b dir="ltr">{paidTotal.toLocaleString('en-US')} AED</b><span className="pt-muted">{t('totalPaid')}</span></div>
      </div>

      <div className="pt-grid pt-grid--2" style={{ marginBottom: 20 }}>
        <div className="pt-card">
          <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('tier')}</h3>
          <div className="pt-tier">
            <span className={`pt-tier__ring t-${tier}`}>{tier === 'gold' ? '3' : tier === 'silver' ? '2' : '1'}</span>
            <div>
              <p style={{ margin: 0, font: '700 18px/1.3 var(--f-head)', textTransform: 'capitalize' }}>{tier}</p>
              <p className="pt-muted" style={{ margin: 0 }} dir="ltr">{rate} {t('perConversion')}</p>
            </div>
          </div>
          <div className="pt-progress"><span style={{ width: `${Math.min(100, progress.pct)}%` }} /></div>
          <p className="pt-muted" style={{ marginTop: 10 }}>
            {progress.next ? `${progress.remaining} ${t('toNext')} ${progress.next}` : t('maxTier')}
          </p>
        </div>
        <div className="pt-card">
          <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('funnel')}</h3>
          <Funnel rows={[
            [t('clicks'), clicks],
            [t('leadsF'), referrals.length + refLeads],
            [t('qualified'), referrals.filter((r) => ['qualified', 'converted'].includes(r.status)).length],
            [t('converted'), converted],
          ]} />
        </div>
      </div>

      <div className="pt-card" style={{ marginBottom: 20 }}>
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('yourLink')}</h3>
        {partner ? <MarketingKit t={t} lang={lang} link={link} landing={AR_PAGE(lang, partner.landing_page)} /> : <p className="pt-note">{t('noCodeYet')}</p>}
      </div>

      <div className="pt-grid pt-grid--2" style={{ marginBottom: 20 }}>
        <SubmitLead t={t} userId={user.id} onDone={load} />
        <div className="pt-card">
          <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('myPayouts')}</h3>
          {payouts.length === 0 ? <p className="pt-note">{t('noPayouts')}</p> : (
            <div className="pt-scroll"><table className="pt-table">
              <thead><tr><th>{t('amount')}</th><th>{t('method')}</th><th>{t('status')}</th><th>{t('date')}</th></tr></thead>
              <tbody>{payouts.map((p) => (
                <tr key={p.id}>
                  <td dir="ltr">{Number(p.amount).toLocaleString('en-US')} AED</td>
                  <td>{p.payment_method || '—'}</td>
                  <td><span className={`pt-badge b-${p.status === 'paid' ? 'paid' : 'pending'}`}>{p.status === 'paid' ? t('st_paid') : t('st_pending')}</span></td>
                  <td>{fmtDate(p.paid_at || p.created_at, lang)}</td>
                </tr>))}
              </tbody>
            </table></div>
          )}
        </div>
      </div>

      <div className="pt-card">
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('myReferrals')}</h3>
        {referrals.length === 0 ? (
          <div className="pt-empty"><p style={{ margin: 0, fontWeight: 600 }}>{t('noReferrals')}</p><p style={{ margin: '6px 0 0' }}>{t('noReferralsSub')}</p></div>
        ) : (
          <div className="pt-scroll"><table className="pt-table">
            <thead><tr><th>{t('business')}</th><th>{t('contact')}</th><th>{t('status')}</th><th>{t('commission')}</th><th>{t('date')}</th></tr></thead>
            <tbody>{referrals.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.lead_company || '—'}</strong><br /><span className="pt-muted">{r.notes}</span></td>
                <td>{r.lead_name}<br /><span className="pt-muted" dir="ltr">{r.lead_phone}</span></td>
                <td><span className={`pt-badge b-${r.status}`}>{t(`st_${r.status}` as any)}</span></td>
                <td dir="ltr">{Number(r.commission_amount) > 0 ? `${Number(r.commission_amount).toLocaleString('en-US')} AED` : '—'}</td>
                <td>{fmtDate(r.created_at, lang)}</td>
              </tr>))}
            </tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}

function Funnel({ rows }: { rows: [string, number][] }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className="pt-funnel">
      {rows.map(([label, value]) => (
        <div className="pt-funnel__row" key={label}>
          <span>{label}</span>
          <span className="pt-funnel__bar"><span style={{ width: `${(value / max) * 100}%` }} /></span>
          <strong dir="ltr">{value}</strong>
        </div>
      ))}
    </div>
  );
}

function MarketingKit({ t, lang, link, landing }: { t: (k: any) => string; lang: Lang; link: string; landing: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [qr, setQr] = useState<string>('');
  useEffect(() => { QRCode.toDataURL(link, { width: 320, margin: 1, color: { dark: '#04478B', light: '#ffffff' } }).then(setQr).catch(() => {}); }, [link]);
  const message = lang === 'ar'
    ? `تعرف على ماركزون؟ عندهم تطبيقات تنظّم شغل المحلات والصالونات ومحلات الخياطة، بسعر مناسب ودعم على الواتساب. شوف من هني: ${link}`
    : `Do you know MarkZone? They build apps that organize shops, salons and tailoring businesses, at a fair price with real WhatsApp support. Have a look: ${link}`;
  const copy = async (text: string, key: string) => { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2000); };
  return (
    <div className="pt-grid pt-grid--2">
      <div>
        <p className="pt-code" dir="ltr">{link}</p>
        <div className="pt-row" style={{ marginTop: 12 }}>
          <button className="btn btn--outline" onClick={() => copy(link, 'link')}>{copied === 'link' ? t('copied') : t('copy')}</button>
          <a className="btn btn--cta" href={`https://wa.me/?text=${encodeURIComponent(message)}`} rel="noopener">{t('shareWa')}</a>
        </div>
        <p className="pt-muted" style={{ marginTop: 12 }}>{t('linkGoesTo')} <span dir="ltr">{landing}</span></p>
        <div className="pt-note" style={{ marginTop: 12 }}>
          <strong>{t('waTemplate')}</strong>
          <p style={{ margin: '8px 0' }}>{message}</p>
          <button className="pt-link" onClick={() => copy(message, 'msg')}>{copied === 'msg' ? t('copied') : t('useTemplate')}</button>
        </div>
      </div>
      <div>
        {qr && (
          <>
            <div className="pt-qr"><img src={qr} alt={t('qr')} width={200} height={200} /></div>
            <p style={{ marginTop: 10 }}><a className="pt-link" href={qr} download="markzone-referral-qr.png">{t('download')}</a></p>
          </>
        )}
      </div>
    </div>
  );
}

function SubmitLead({ t, userId, onDone }: { t: (k: any) => string; userId: string; onDone: () => void }) {
  const [f, setF] = useState({ businessName: '', contactPerson: '', phone: '', industry: 'salon', notes: '' });
  const [err, setErr] = useState<string | null>(null); const [ok, setOk] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null); setOk(false);
    if (f.businessName.trim().length < 2 || f.contactPerson.trim().length < 2) return setErr(t('errorGeneric'));
    if (!isUaePhone(f.phone)) return setErr(t('badPhone'));
    setBusy(true);
    const { error } = await supabase.from('referrals').insert({
      referrer_id: userId, lead_name: f.contactPerson.trim(), lead_phone: f.phone.trim(),
      lead_company: f.businessName.trim(), notes: [f.industry, f.notes.trim()].filter(Boolean).join(' · '),
    });
    setBusy(false);
    if (error) setErr(error.message);
    else { setOk(true); setF({ businessName: '', contactPerson: '', phone: '', industry: 'salon', notes: '' }); onDone(); }
  };
  return (
    <div className="pt-card">
      <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('submitLead')}</h3>
      <form onSubmit={submit}>
        <label className="pt-field"><span>{t('businessName')}</span>
          <input className="pt-input" value={f.businessName} onChange={(e) => set('businessName', e.target.value)} /></label>
        <label className="pt-field"><span>{t('contactPerson')}</span>
          <input className="pt-input" value={f.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} /></label>
        <label className="pt-field"><span>{t('phone')}</span>
          <input className="pt-input" dir="ltr" placeholder="+971 50 123 4567" value={f.phone} onChange={(e) => set('phone', e.target.value)} /></label>
        <label className="pt-field"><span>{t('industry')}</span>
          <select className="pt-select" value={f.industry} onChange={(e) => set('industry', e.target.value)}>
            <option value="salon">{t('salon')}</option>
            <option value="retail">{t('retail')}</option>
            <option value="tailoring">{t('tailoring')}</option>
            <option value="other">{t('other')}</option>
          </select></label>
        <label className="pt-field"><span>{t('notes')}</span>
          <textarea className="pt-textarea" value={f.notes} onChange={(e) => set('notes', e.target.value)} /></label>
        <button className="btn btn--cta" style={{ width: '100%' }} disabled={busy}>{busy ? t('working') : t('submit')}</button>
        {err && <p className="pt-err">{err}</p>}
        {ok && <p className="pt-ok">{t('submitted')}</p>}
      </form>
    </div>
  );
}

function EditProfile({ t, initial, onClose, onSave }: {
  t: (k: any) => string; initial: { full_name: string | null; phone: string | null };
  onClose: () => void; onSave: (v: { full_name: string; phone: string }) => Promise<string | null>;
}) {
  const [v, setV] = useState({ full_name: initial.full_name || '', phone: initial.phone || '' });
  const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const save = async () => {
    if (v.phone && !isUaePhone(v.phone)) return setErr(t('badPhone'));
    setBusy(true); const e = await onSave(v); setBusy(false); if (e) setErr(e);
  };
  return (
    <div className="pt-dialog" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pt-dialog__box">
        <h3 className="pt-h2" style={{ fontSize: 20 }}>{t('editProfile')}</h3>
        <label className="pt-field"><span>{t('fullName')}</span>
          <input className="pt-input" value={v.full_name} onChange={(e) => setV({ ...v, full_name: e.target.value })} /></label>
        <label className="pt-field"><span>{t('phone')}</span>
          <input className="pt-input" dir="ltr" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} /></label>
        {err && <p className="pt-err">{err}</p>}
        <div className="pt-row" style={{ marginTop: 10 }}>
          <button className="btn btn--cta" onClick={save} disabled={busy}>{busy ? t('working') : t('save')}</button>
          <button className="btn btn--outline" onClick={onClose}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
}
