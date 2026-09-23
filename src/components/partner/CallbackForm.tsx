import React, { useEffect, useState } from 'react';
import '../../styles/portal.css';
import { supabase, isUaePhone, isEmail, readRef } from '../../lib/portal';
import { makeT, type Lang } from '../../lib/portal-i18n';

export default function CallbackForm({ lang = 'en' as Lang }) {
  const t = makeT(lang);
  const [f, setF] = useState({ name: '', phone: '', email: '', company: '', message: '' });
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<{ code: string; partnerId: string } | null>(null);

  useEffect(() => { setRef(readRef()); }, []);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    if (f.name.trim().length < 2) return setErr(t('nameRequired'));
    if (!isUaePhone(f.phone)) return setErr(t('badPhone'));
    if (f.email && !isEmail(f.email)) return setErr(t('badEmail'));
    setBusy(true);
    const { error } = await supabase.from('leads').insert({
      name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim() || null,
      company: f.company.trim() || null, message: f.message.trim() || null,
      lead_type: 'callback', source_page: location.pathname,
      referred_by_partner_id: ref?.partnerId || null, referral_code: ref?.code || null,
    });
    setBusy(false);
    if (error) setErr(error.message);
    else { setOk(true); setF({ name: '', phone: '', email: '', company: '', message: '' }); }
  };

  if (ok) return <div className="pt-card pt-card--accent"><p className="pt-ok" style={{ fontSize: 17, margin: 0 }}>{t('cbSent')}</p></div>;

  return (
    <div className="pt-card pt-card--accent">
      <h3 className="pt-h2" style={{ fontSize: 20 }}>{t('cbTitle')}</h3>
      <p className="pt-sub">{t('cbSub')}</p>
      <form onSubmit={submit}>
        <label className="pt-field"><span>{t('fullName')}</span>
          <input className="pt-input" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></label>
        <label className="pt-field"><span>{t('phone')}</span>
          <input className="pt-input" dir="ltr" placeholder="+971 50 123 4567" value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></label>
        <label className="pt-field"><span>{t('cbEmail')}</span>
          <input className="pt-input" dir="ltr" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></label>
        <label className="pt-field"><span>{t('cbBusiness')}</span>
          <input className="pt-input" value={f.company} onChange={(e) => set('company', e.target.value)} /></label>
        <label className="pt-field"><span>{t('cbMessage')}</span>
          <textarea className="pt-textarea" value={f.message} onChange={(e) => set('message', e.target.value)} /></label>
        <button className="btn btn--cta" style={{ width: '100%' }} disabled={busy}>{busy ? t('working') : t('cbSend')}</button>
        {err && <p className="pt-err">{err}</p>}
      </form>
    </div>
  );
}
