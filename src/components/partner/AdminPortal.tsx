import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../styles/portal.css';
import { supabase, isUaePhone, isEmail, SITE, fmtDate } from '../../lib/portal';
import { makeT, type Lang } from '../../lib/portal-i18n';

interface Props { lang?: Lang }

const LANDING_PAGES = ['/', '/oxpos', '/zainaapp', '/texpos', '/websites', '/custom-software', '/contact', '/coming-soon'];
const STATUSES = ['pending', 'contacted', 'qualified', 'converted', 'rejected'];

export default function AdminPortal({ lang = 'en' }: Props) {
  const t = useMemo(() => makeT(lang), [lang]);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<'partners' | 'referrals' | 'leads' | 'payouts'>('partners');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', data.session.user.id).eq('role', 'admin');
        setIsAdmin(!!roles?.length);
      }
      setReady(true);
    })();
  }, []);

  if (!ready) return <p className="pt-muted">{t('loading')}</p>;
  if (!isAdmin) return <div className="pt-card"><p className="pt-sub" style={{ margin: 0 }}>{t('noAccess')}</p>
    <p><a className="pt-link" href={`${lang === 'ar' ? '/ar' : ''}/growth-partner`}>{t('signIn')}</a></p></div>;

  return (
    <div>
      <div className="pt-tabs" role="tablist">
        {(['partners', 'referrals', 'leads', 'payouts'] as const).map((k) => (
          <button key={k} className="pt-tab" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
            {k === 'partners' ? t('approvedPartners') : k === 'referrals' ? t('referralsAdmin') : k === 'leads' ? t('leadsAdmin') : t('payoutsAdmin')}
          </button>
        ))}
      </div>
      {tab === 'partners' && <Partners t={t} lang={lang} />}
      {tab === 'referrals' && <Referrals t={t} lang={lang} />}
      {tab === 'leads' && <Leads t={t} lang={lang} />}
      {tab === 'payouts' && <Payouts t={t} lang={lang} />}
    </div>
  );
}

/* ------------------------------------------------------------- partners */
interface Row {
  roleId: string; userId: string; approved: boolean; created_at: string;
  email: string; full_name: string | null; phone: string | null;
  partnerId: string | null; code: string | null; landing: string | null;
  clicks: number; leads: number;
}

function Partners({ t, lang }: { t: (k: any) => string; lang: Lang }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);

  const load = useCallback(async () => {
    const { data: roles } = await supabase.from('user_roles').select('id, user_id, created_at, is_approved').eq('role', 'growth_partner');
    if (!roles?.length) { setRows([]); return; }
    const ids = roles.map((r: any) => r.user_id);
    const [{ data: profiles }, { data: pps }] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, phone').in('id', ids),
      supabase.from('partner_profiles').select('id, user_id, referral_code, landing_page').in('user_id', ids),
    ]);
    const pIds = (pps || []).map((p: any) => p.id);
    const clickMap: Record<string, number> = {}; const leadMap: Record<string, number> = {};
    if (pIds.length) {
      const [{ data: clicks }, { data: leads }] = await Promise.all([
        supabase.from('referral_clicks').select('partner_id').in('partner_id', pIds),
        supabase.from('leads').select('referred_by_partner_id').in('referred_by_partner_id', pIds),
      ]);
      (clicks || []).forEach((c: any) => { clickMap[c.partner_id] = (clickMap[c.partner_id] || 0) + 1; });
      (leads || []).forEach((l: any) => { if (l.referred_by_partner_id) leadMap[l.referred_by_partner_id] = (leadMap[l.referred_by_partner_id] || 0) + 1; });
    }
    setRows(roles.map((r: any) => {
      const prof = profiles?.find((p: any) => p.id === r.user_id);
      const pp = pps?.find((p: any) => p.user_id === r.user_id);
      return {
        roleId: r.id, userId: r.user_id, approved: r.is_approved, created_at: r.created_at,
        email: prof?.email || '', full_name: prof?.full_name || null, phone: prof?.phone || null,
        partnerId: pp?.id || null, code: pp?.referral_code || null, landing: pp?.landing_page || null,
        clicks: pp ? clickMap[pp.id] || 0 : 0, leads: pp ? leadMap[pp.id] || 0 : 0,
      };
    }));
  }, []);
  useEffect(() => { load(); }, [load]);

  /** Approving also issues the referral code, through the create-partner function. */
  const approve = async (row: Row) => {
    setBusy(row.roleId); setMsg(null);
    try {
      if (!row.phone || !isUaePhone(row.phone)) throw new Error(t('badPhone'));
      const { data, error } = await supabase.functions.invoke('create-partner', {
        body: { full_name: row.full_name || row.email, email: row.email, phone: row.phone, landing_page: '/', use_tiered_commission: true },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setMsg(t('approved')); await load();
    } catch (e: any) { setMsg(e.message || t('errorGeneric')); } finally { setBusy(null); }
  };

  const remove = async (row: Row) => {
    if (!confirm(t('confirmRemove'))) return;
    setBusy(row.roleId);
    await supabase.from('user_roles').delete().eq('id', row.roleId);
    setBusy(null); setMsg(t('removed')); load();
  };

  const pending = rows.filter((r) => !r.approved);
  const approved = rows.filter((r) => r.approved);

  return (
    <div>
      <div className="pt-row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 className="pt-h2" style={{ margin: 0 }}>{t('adminTitle')}</h2>
        <button className="btn btn--cta" onClick={() => setCreating(true)}>{t('createPartner')}</button>
      </div>
      {msg && <p className="pt-ok">{msg}</p>}

      <div className="pt-card" style={{ marginBottom: 20 }}>
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('pendingApprovals')}</h3>
        {pending.length === 0 ? <p className="pt-note">{t('noPending')}</p> : (
          <div className="pt-scroll"><table className="pt-table">
            <thead><tr><th>{t('fullName')}</th><th>{t('email')}</th><th>{t('phone')}</th><th>{t('date')}</th><th /></tr></thead>
            <tbody>{pending.map((r) => (
              <tr key={r.roleId}>
                <td>{r.full_name || '—'}</td><td dir="ltr">{r.email}</td><td dir="ltr">{r.phone || '—'}</td>
                <td>{fmtDate(r.created_at, lang)}</td>
                <td><div className="pt-row">
                  <button className="btn btn--cta" disabled={busy === r.roleId} onClick={() => approve(r)}>{busy === r.roleId ? t('working') : t('approve')}</button>
                  <button className="pt-link" onClick={() => remove(r)}>{t('remove')}</button>
                </div></td>
              </tr>))}
            </tbody>
          </table></div>
        )}
      </div>

      <div className="pt-card">
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('approvedPartners')}</h3>
        {approved.length === 0 ? <p className="pt-note">{t('noPartners')}</p> : (
          <div className="pt-scroll"><table className="pt-table">
            <thead><tr><th>{t('fullName')}</th><th>{t('email')}</th><th>{t('yourLink')}</th><th>{t('clicks')}</th><th>{t('leadsF')}</th><th /></tr></thead>
            <tbody>{approved.map((r) => (
              <tr key={r.roleId}>
                <td>{r.full_name || '—'}<br /><span className="pt-muted" dir="ltr">{r.phone || ''}</span></td>
                <td dir="ltr">{r.email}</td>
                <td>
                  {r.code ? (<>
                    <code className="pt-muted" dir="ltr">{SITE}/r/{r.code}</code><br />
                    <button className="pt-link" onClick={() => navigator.clipboard.writeText(`${SITE}/r/${r.code}`)}>{t('copy')}</button>
                    <span className="pt-muted"> · {t('linkGoesTo')} <span dir="ltr">{r.landing}</span></span>
                  </>) : <span className="pt-muted">—</span>}
                </td>
                <td dir="ltr">{r.clicks}</td><td dir="ltr">{r.leads}</td>
                <td><div className="pt-row">
                  {r.partnerId && <button className="pt-link" onClick={() => setEditing(r)}>{t('edit')}</button>}
                  <button className="pt-link" onClick={() => remove(r)}>{t('remove')}</button>
                </div></td>
              </tr>))}
            </tbody>
          </table></div>
        )}
      </div>

      {creating && <CreatePartner t={t} onClose={() => setCreating(false)} onCreated={() => { setCreating(false); load(); }} />}
      {editing && <EditPartner t={t} row={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); setMsg(t('partnerSaved')); load(); }} />}
    </div>
  );
}

function CreatePartner({ t, onClose, onCreated }: { t: (k: any) => string; onClose: () => void; onCreated: () => void }) {
  const [f, setF] = useState({ full_name: '', email: '', phone: '', company: '', landing_page: '/', commission_rate: '' });
  const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ email: string; tempPassword: string | null; referralUrl: string } | null>(null);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setErr(null);
    if (f.full_name.trim().length < 2) return setErr(t('nameRequired'));
    if (!isEmail(f.email)) return setErr(t('badEmail'));
    if (!isUaePhone(f.phone)) return setErr(t('badPhone'));
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-partner', {
        body: {
          full_name: f.full_name.trim(), email: f.email.trim().toLowerCase(), phone: f.phone.trim(),
          company: f.company.trim() || undefined, landing_page: f.landing_page,
          commission_rate: f.commission_rate ? Number(f.commission_rate) : null,
          use_tiered_commission: !f.commission_rate,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult({ email: (data as any).email, tempPassword: (data as any).tempPassword, referralUrl: (data as any).referralUrl });
      onCreated();
    } catch (e: any) { setErr(e.message || t('errorGeneric')); } finally { setBusy(false); }
  };

  const details = result ? (result.tempPassword
    ? `MarkZone Growth Partner\nEmail: ${result.email}\nTemporary password: ${result.tempPassword}\nSign in: ${SITE}/growth-partner\nYour referral link: ${result.referralUrl}`
    : `MarkZone Growth Partner\nEmail: ${result.email}\nSign in: ${SITE}/growth-partner\nYour referral link: ${result.referralUrl}`) : '';

  return (
    <div className="pt-dialog" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pt-dialog__box">
        {!result ? (<>
          <h3 className="pt-h2" style={{ fontSize: 20 }}>{t('createPartner')}</h3>
          <label className="pt-field"><span>{t('fullName')}</span><input className="pt-input" value={f.full_name} onChange={(e) => set('full_name', e.target.value)} /></label>
          <label className="pt-field"><span>{t('email')}</span><input className="pt-input" dir="ltr" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} /></label>
          <label className="pt-field"><span>{t('phone')}</span><input className="pt-input" dir="ltr" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+971 50 123 4567" /></label>
          <label className="pt-field"><span>{t('company')}</span><input className="pt-input" value={f.company} onChange={(e) => set('company', e.target.value)} /></label>
          <label className="pt-field"><span>{t('landingPage')}</span>
            <select className="pt-select" value={f.landing_page} onChange={(e) => set('landing_page', e.target.value)}>
              {LANDING_PAGES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select></label>
          <label className="pt-field"><span>{t('commissionRate')}</span>
            <input className="pt-input" dir="ltr" type="number" value={f.commission_rate} onChange={(e) => set('commission_rate', e.target.value)} placeholder="200" />
            <span className="pt-muted">{t('commissionHint')}</span></label>
          {err && <p className="pt-err">{err}</p>}
          <div className="pt-row">
            <button className="btn btn--cta" onClick={submit} disabled={busy}>{busy ? t('working') : t('create')}</button>
            <button className="btn btn--outline" onClick={onClose}>{t('cancel')}</button>
          </div>
        </>) : (<>
          <h3 className="pt-h2" style={{ fontSize: 20 }}>{t('created')}</h3>
          <pre className="pt-code" dir="ltr" style={{ whiteSpace: 'pre-wrap' }}>{details}</pre>
          <div className="pt-row" style={{ marginTop: 14 }}>
            <button className="btn btn--outline" onClick={() => navigator.clipboard.writeText(details)}>{t('copyDetails')}</button>
            <a className="btn btn--cta" href={`https://wa.me/?text=${encodeURIComponent(details)}`} rel="noopener">{t('sendWa')}</a>
            <button className="pt-link" onClick={onClose}>{t('cancel')}</button>
          </div>
        </>)}
      </div>
    </div>
  );
}

function EditPartner({ t, row, onClose, onSaved }: { t: (k: any) => string; row: Row; onClose: () => void; onSaved: () => void }) {
  const [landing, setLanding] = useState(row.landing || '/');
  const [rate, setRate] = useState('');
  const [busy, setBusy] = useState(false); const [err, setErr] = useState<string | null>(null);
  const save = async () => {
    setBusy(true);
    const patch: any = { landing_page: landing };
    if (rate) { patch.commission_rate = Number(rate); patch.use_tiered_commission = false; }
    const { error } = await supabase.from('partner_profiles').update(patch).eq('id', row.partnerId);
    setBusy(false);
    if (error) setErr(error.message); else onSaved();
  };
  return (
    <div className="pt-dialog" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pt-dialog__box">
        <h3 className="pt-h2" style={{ fontSize: 20 }}>{row.full_name || row.email}</h3>
        <label className="pt-field"><span>{t('landingPage')}</span>
          <select className="pt-select" value={landing} onChange={(e) => setLanding(e.target.value)}>
            {LANDING_PAGES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select></label>
        <label className="pt-field"><span>{t('commissionRate')}</span>
          <input className="pt-input" dir="ltr" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <span className="pt-muted">{t('commissionHint')}</span></label>
        {err && <p className="pt-err">{err}</p>}
        <div className="pt-row">
          <button className="btn btn--cta" onClick={save} disabled={busy}>{busy ? t('working') : t('saveChanges')}</button>
          <button className="btn btn--outline" onClick={onClose}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ referrals */
function Referrals({ t, lang }: { t: (k: any) => string; lang: Lang }) {
  const [rows, setRows] = useState<any[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const load = useCallback(async () => {
    const { data } = await supabase.from('referrals').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    const ids = Array.from(new Set((data || []).map((r: any) => r.referrer_id)));
    if (ids.length) {
      const { data: profs } = await supabase.from('profiles').select('id, full_name, email').in('id', ids);
      const map: Record<string, string> = {};
      (profs || []).forEach((p: any) => { map[p.id] = p.full_name || p.email; });
      setNames(map);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const update = async (id: string, patch: any) => {
    await supabase.from('referrals').update(patch).eq('id', id);
    load();
  };

  return (
    <div className="pt-card">
      <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('referralsAdmin')}</h3>
      {rows.length === 0 ? <p className="pt-note">{t('noReferrals')}</p> : (
        <div className="pt-scroll"><table className="pt-table">
          <thead><tr><th>{t('business')}</th><th>{t('contact')}</th><th>{t('partner')}</th><th>{t('status')}</th><th>{t('commission')}</th><th>{t('date')}</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id}>
              <td><strong>{r.lead_company || '—'}</strong><br /><span className="pt-muted">{r.notes}</span></td>
              <td>{r.lead_name}<br /><span className="pt-muted" dir="ltr">{r.lead_phone}</span></td>
              <td>{names[r.referrer_id] || '—'}</td>
              <td>
                <select className="pt-select" value={r.status} onChange={(e) => update(r.id, { status: e.target.value })}>
                  {STATUSES.map((s) => <option key={s} value={s}>{t(`st_${s}` as any)}</option>)}
                </select>
              </td>
              <td>
                <input className="pt-input" dir="ltr" style={{ width: 110 }} type="number" defaultValue={Number(r.commission_amount) || 0}
                  onBlur={(e) => update(r.id, { commission_amount: Number(e.target.value) || 0 })} />
              </td>
              <td>{fmtDate(r.created_at, lang)}</td>
            </tr>))}
          </tbody>
        </table></div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- leads */
function Leads({ t, lang }: { t: (k: any) => string; lang: Lang }) {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from('leads').select('*').order('created_at', { ascending: false }).then(({ data }) => setRows(data || [])); }, []);
  return (
    <div className="pt-card">
      <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('leadsAdmin')}</h3>
      {rows.length === 0 ? <p className="pt-note">{t('noLeads')}</p> : (
        <div className="pt-scroll"><table className="pt-table">
          <thead><tr><th>{t('fullName')}</th><th>{t('phone')}</th><th>{t('business')}</th><th>{t('notes')}</th><th>{t('partner')}</th><th>{t('date')}</th></tr></thead>
          <tbody>{rows.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td><td dir="ltr">{l.phone}<br /><span className="pt-muted" dir="ltr">{l.email || ''}</span></td>
              <td>{l.company || '—'}</td><td className="pt-muted">{l.message || '—'}<br />{l.source_page || ''}</td>
              <td dir="ltr">{l.referral_code || '—'}</td><td>{fmtDate(l.created_at, lang)}</td>
            </tr>))}
          </tbody>
        </table></div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- payouts */
function Payouts({ t, lang }: { t: (k: any) => string; lang: Lang }) {
  const [rows, setRows] = useState<any[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [f, setF] = useState({ partner_id: '', amount: '', payment_method: 'bank', reference: '', notes: '' });
  const [busy, setBusy] = useState(false); const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [{ data: pays }, { data: pps }] = await Promise.all([
      supabase.from('payouts').select('*').order('created_at', { ascending: false }),
      supabase.from('partner_profiles').select('id, user_id'),
    ]);
    const ids = (pps || []).map((p: any) => p.user_id);
    const { data: profs } = ids.length ? await supabase.from('profiles').select('id, full_name, email').in('id', ids) : { data: [] as any[] };
    const map = new Map<string, string>();
    (pps || []).forEach((p: any) => {
      const prof = (profs || []).find((x: any) => x.id === p.user_id);
      map.set(p.id, prof?.full_name || prof?.email || '—');
    });
    setPartners((pps || []).map((p: any) => ({ id: p.id, name: map.get(p.id) || '—' })));
    setRows((pays || []).map((p: any) => ({ ...p, partner_name: map.get(p.partner_id) || '—' })));
  }, []);
  useEffect(() => { load(); }, [load]);

  const create = async () => {
    setErr(null);
    if (!f.partner_id || !f.amount) return setErr(t('errorGeneric'));
    setBusy(true);
    const { error } = await supabase.from('payouts').insert({
      partner_id: f.partner_id, amount: Number(f.amount), payment_method: f.payment_method,
      reference: f.reference || null, notes: f.notes || null, status: 'pending',
    });
    setBusy(false);
    if (error) setErr(error.message);
    else { setF({ partner_id: '', amount: '', payment_method: 'bank', reference: '', notes: '' }); load(); }
  };
  const markPaid = async (id: string) => { await supabase.from('payouts').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', id); load(); };

  return (
    <div className="pt-grid pt-grid--2">
      <div className="pt-card">
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('recordPayout')}</h3>
        <label className="pt-field"><span>{t('partner')}</span>
          <select className="pt-select" value={f.partner_id} onChange={(e) => setF({ ...f, partner_id: e.target.value })}>
            <option value="">—</option>
            {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select></label>
        <label className="pt-field"><span>{t('amount')} (AED)</span>
          <input className="pt-input" dir="ltr" type="number" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} /></label>
        <label className="pt-field"><span>{t('method')}</span>
          <select className="pt-select" value={f.payment_method} onChange={(e) => setF({ ...f, payment_method: e.target.value })}>
            <option value="bank">bank</option><option value="cash">cash</option><option value="cheque">cheque</option><option value="other">other</option>
          </select></label>
        <label className="pt-field"><span>{t('reference')}</span>
          <input className="pt-input" value={f.reference} onChange={(e) => setF({ ...f, reference: e.target.value })} /></label>
        {err && <p className="pt-err">{err}</p>}
        <button className="btn btn--cta" onClick={create} disabled={busy}>{busy ? t('working') : t('recordPayout')}</button>
      </div>
      <div className="pt-card">
        <h3 className="pt-h2" style={{ fontSize: 18 }}>{t('payoutsAdmin')}</h3>
        {rows.length === 0 ? <p className="pt-note">{t('noPayouts')}</p> : (
          <div className="pt-scroll"><table className="pt-table">
            <thead><tr><th>{t('partner')}</th><th>{t('amount')}</th><th>{t('status')}</th><th>{t('date')}</th><th /></tr></thead>
            <tbody>{rows.map((p) => (
              <tr key={p.id}>
                <td>{p.partner_name}</td>
                <td dir="ltr">{Number(p.amount).toLocaleString('en-US')} AED</td>
                <td><span className={`pt-badge b-${p.status === 'paid' ? 'paid' : 'pending'}`}>{p.status === 'paid' ? t('st_paid') : t('st_pending')}</span></td>
                <td>{fmtDate(p.paid_at || p.created_at, lang)}</td>
                <td>{p.status !== 'paid' && <button className="pt-link" onClick={() => markPaid(p.id)}>{t('markPaid')}</button>}</td>
              </tr>))}
            </tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}
