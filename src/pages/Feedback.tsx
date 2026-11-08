import { useRef, useState, type FormEvent } from 'react';
import { MessageSquare } from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

const inputClass = 'w-full rounded-lg border border-gold/30 bg-midnight p-3 text-lavender focus:outline-none focus:ring-2 focus:ring-gold';
export function Feedback() {
  const { t } = useLanguage();
  const [kind, setKind] = useState('review');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const id = useRef(crypto.randomUUID());
  const submitting = useRef(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true; setBusy(true); setError('');
    try {
      const result = await api<{ saved: boolean }>('/feedback', { method: 'POST', body: JSON.stringify({ id: id.current, kind, name, email, message, rating: kind === 'review' ? Number(rating) : null }) });
      if (!result.saved) throw new Error('Enregistrement non confirmé. Veuillez réessayer.');
      setSaved(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Envoi impossible. Veuillez réessayer.'); }
    finally { submitting.current = false; setBusy(false); }
  }
  return <div className="min-h-screen bg-gradient-to-br from-midnight to-royal px-4 py-12 text-lavender">
    <div className="max-w-2xl mx-auto">
      <MessageSquare aria-hidden="true" className="h-12 w-12 text-gold mb-5" />
      <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-4">{t('Avis et suggestions')}</h1>
      <p className="mb-8">{t('Partagez votre expérience ou vos idées pour améliorer Orialune.')}</p>
      {saved ? <section role="status" className="border border-gold/30 rounded-2xl p-6 space-y-5">
        <p>{t('Merci ! Votre message a bien été enregistré et sera lu par notre équipe.')}</p>
        <button onClick={() => { id.current = crypto.randomUUID(); setSaved(false); setMessage(''); setRating(''); }} className="rounded-lg bg-orchid px-5 py-3 font-semibold hover:bg-royal">{t('Écrire un autre message')}</button>
      </section> : <form onSubmit={submit} className="border border-gold/30 rounded-2xl p-5 sm:p-8 space-y-5">
        <p className="text-sm">{t('Votre message est transmis à notre équipe et ne sera pas publié automatiquement. Votre e-mail reste privé.')}</p>
        <fieldset disabled={busy} className="space-y-5">
          <div><label htmlFor="feedback-kind" className="block mb-2">{t('Type de message')}</label><select id="feedback-kind" className={inputClass} value={kind} onChange={e => setKind(e.target.value)}><option value="review">{t('Laisser un avis')}</option><option value="suggestion">{t('Faire une suggestion')}</option></select></div>
          <div><label htmlFor="feedback-name" className="block mb-2">{t('Nom ou pseudonyme')} *</label><input id="feedback-name" required maxLength={80} pattern=".*\S.*" autoComplete="name" value={name} onChange={e => setName(e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="feedback-email" className="block mb-2">{t('E-mail (facultatif, pour vous répondre)')}</label><input id="feedback-email" type="email" autoComplete="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className={inputClass} /></div>
          {kind === 'review' && <div><label htmlFor="feedback-rating" className="block mb-2">{t('Votre note')} *</label><select id="feedback-rating" required value={rating} onChange={e => setRating(e.target.value)} className={inputClass}><option value="">{t('Choisissez une note')}</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}</select></div>}
          <div><label htmlFor="feedback-message" className="block mb-2">{t('Votre message')} *</label><textarea id="feedback-message" required maxLength={3000} rows={7} value={message} onChange={e => setMessage(e.target.value)} onBlur={e => setMessage(e.target.value.trim())} className={inputClass} /><p className="text-sm mt-1">{message.length} / 3000</p></div>
        </fieldset>
        {error && <p role="alert" className="border border-gold/50 rounded-lg p-4">{t(error)}</p>}
        <button disabled={busy} className="rounded-lg bg-orchid px-5 py-3 font-semibold hover:bg-royal disabled:opacity-50">{t(busy ? 'Envoi en cours...' : 'Envoyer mon message')}</button>
      </form>}
    </div>
  </div>;
}
