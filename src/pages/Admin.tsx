import { formatBooking } from '../booking-data';
import { useEffect, useState, type FormEvent } from 'react';
import { Lock, LogOut, RefreshCw, Save, Inbox } from 'lucide-react';
import { api, ApiError } from '../api';
import { useProfile } from '../contexts/ProfileContext';
import { defaultProfile, type ConsultationRecord, type FeedbackRecord, type VoyantProfile } from '../platform-types';
import { services } from '../data';
import { commonQuestions, serviceQuestions, closingQuestions, reservationQuestions } from '../consultation-data';

const inputClass = 'w-full rounded-lg border border-gold/30 bg-midnight p-3 text-lavender focus:outline-none focus:ring-2 focus:ring-gold';
const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-lg bg-orchid px-5 py-3 font-semibold hover:bg-royal disabled:opacity-50';
const profileLabels: Record<keyof VoyantProfile, string> = { name: 'Nom de la voyante', description: 'Présentation', phone: 'Téléphone', whatsapp: 'WhatsApp', email: 'E-mail de contact', hours: 'Horaires' };
const serviceName = (id: string) => services.find(service => service.id === id)?.title ?? id;
const date = (value: string) => new Date(value).toLocaleString('fr-FR');

export function Admin() {
  const { setProfile } = useProfile();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [entries, setEntries] = useState<ConsultationRecord[]>([]);
  const [profileDraft, setProfileDraft] = useState(defaultProfile);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'requests' | 'profile' | 'feedback'>('requests');
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await api('/admin/session');
        const [records, contact, messages] = await Promise.all([api<ConsultationRecord[]>('/admin/consultations'), api<VoyantProfile>('/profile'), api<FeedbackRecord[]>('/admin/feedback')]);
        if (active) { setEntries(records); setFeedback(messages); setProfileDraft(contact); setAuthenticated(true); }
      } catch (caught) {
        if (active && (!(caught instanceof ApiError) || caught.status !== 401)) setError(caught instanceof Error ? caught.message : 'Chargement impossible.');
      } finally { if (active) setChecking(false); }
    })();
    return () => { active = false; };
  }, []);

  function report(caught: unknown) {
    if (caught instanceof ApiError && caught.status === 401) { setAuthenticated(false); setEntries([]); setFeedback([]); setSelected(null); }
    setError(caught instanceof Error ? caught.message : 'Une erreur est survenue.');
  }
  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await api('/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      setPassword('');
      const [records, contact, messages] = await Promise.all([api<ConsultationRecord[]>('/admin/consultations'), api<VoyantProfile>('/profile'), api<FeedbackRecord[]>('/admin/feedback')]);
      setEntries(records); setFeedback(messages); setProfileDraft(contact); setAuthenticated(true);
    } catch (caught) { report(caught); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { await api('/admin/logout', { method: 'POST', body: '{}' }); setAuthenticated(false); setEntries([]); setFeedback([]); setSelected(null); setNotice(''); }
    catch (caught) { report(caught); }
    finally { setBusy(false); }
  }
  async function refresh() {
    setBusy(true); setError(''); setNotice('');
    try {
      if (tab === 'feedback') setFeedback(await api<FeedbackRecord[]>('/admin/feedback'));
      else setEntries(await api<ConsultationRecord[]>('/admin/consultations'));
    }
    catch (caught) { report(caught); }
    finally { setBusy(false); }
  }
  async function saveProfile(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const updated = await api<VoyantProfile>('/admin/profile', { method: 'PUT', body: JSON.stringify(profileDraft) });
      setProfileDraft(updated); setProfile(updated); setNotice('Coordonnées enregistrées et mises à jour sur le site.');
    } catch (caught) { report(caught); }
    finally { setBusy(false); }
  }
  const filtered = entries.filter(entry => `${entry.answers.lastName} ${entry.answers.firstName} ${entry.answers.email} ${serviceName(entry.serviceId)}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  const current = entries.find(entry => entry.id === selected);
  const labels = current ? Object.fromEntries([
    ['lastName', 'Nom'], ['firstName', 'Prénom'], ['age', 'Âge'], ['email', 'E-mail'],
    ...[...reservationQuestions, ...commonQuestions, ...(serviceQuestions[current.serviceId] ?? []), ...closingQuestions].map(question => [question.id, question.label]),
  ]) : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight to-royal px-4 py-10 text-lavender">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gold">Administration Orialune</h1>
          {authenticated && <button onClick={() => void logout()} disabled={busy} className={buttonClass}><LogOut className="w-4 h-4" aria-hidden="true" />Se déconnecter</button>}
        </header>
        {error && <p role="alert" className="border border-gold/50 rounded-xl p-4 mb-6">{error}</p>}
        {notice && <p role="status" className="border border-gold/30 rounded-xl p-4 mb-6">{notice}</p>}
        {checking ? <p role="status">Chargement...</p> : !authenticated ? (
          <form onSubmit={login} className="max-w-md mx-auto bg-royal/40 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-5">
            <Lock className="text-gold w-10 h-10" aria-hidden="true" />
            <h2 className="text-2xl text-gold font-semibold">Connexion administrateur</h2>
            <label htmlFor="admin-password" className="block">Mot de passe</label>
            <input id="admin-password" type="password" autoComplete="current-password" maxLength={256} required value={password} onChange={event => setPassword(event.target.value)} className={inputClass} />
            <button disabled={busy} className={`${buttonClass} w-full`}>{busy ? 'Connexion...' : 'Se connecter'}</button>
          </form>
        ) : (
          <>
            <nav aria-label="Sections de l’administration" className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => { setTab('requests'); setNotice(''); }} aria-pressed={tab === 'requests'} className={`${buttonClass} ${tab === 'requests' ? 'ring-1 ring-gold' : ''}`}><Inbox className="w-4 h-4" aria-hidden="true" />Demandes ({entries.length})</button>
              <button onClick={() => { setTab('profile'); setNotice(''); }} aria-pressed={tab === 'profile'} className={`${buttonClass} ${tab === 'profile' ? 'ring-1 ring-gold' : ''}`}>Coordonnées de la voyante</button>
              <button onClick={() => { setTab('feedback'); setNotice(''); }} aria-pressed={tab === 'feedback'} className={`${buttonClass} ${tab === 'feedback' ? 'ring-1 ring-gold' : ''}`}>Avis et suggestions ({feedback.length})</button>
            </nav>
            {tab === 'feedback' ? (
              <section aria-label="Avis et suggestions" className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl text-gold font-semibold">Avis et suggestions</h2><button onClick={() => void refresh()} disabled={busy} className={buttonClass}><RefreshCw className="w-4 h-4" aria-hidden="true" />Actualiser</button></div>
                {!feedback.length && <p>Aucun message pour le moment.</p>}
                {feedback.map(item => <article key={item.id} className="border border-gold/30 rounded-xl p-5 space-y-3">
                  <p className="text-gold font-semibold break-words">{item.name} · {item.kind === 'review' ? 'Avis' : 'Suggestion'}{item.rating !== null ? ` · ${item.rating} / 5` : ''}</p>
                  <time dateTime={item.createdAt} className="block text-sm">{date(item.createdAt)}</time>
                  {item.email && <a href={`mailto:${item.email}`} className="block break-all underline">{item.email}</a>}
                  <p className="whitespace-pre-wrap break-words">{item.message}</p>
                </article>)}
              </section>
            ) : tab === 'profile' ? (
              <form onSubmit={saveProfile} className="max-w-2xl border border-gold/30 rounded-2xl p-5 sm:p-8 space-y-5">
                <h2 className="text-2xl font-semibold text-gold">Une voyante, tous les services</h2>
                <p className="text-sm">Ces coordonnées s’affichent sur la page contact et dans le pied de page. Les contacts laissés vides sont masqués.</p>
                {(Object.keys(profileLabels) as (keyof VoyantProfile)[]).map(key => (
                  <div key={key}>
                    <label htmlFor={`profile-${key}`} className="block mb-2">{profileLabels[key]}{key === 'name' ? ' *' : ''}</label>
                    {key === 'description' ? <textarea id={`profile-${key}`} maxLength={1000} rows={4} value={profileDraft[key]} onChange={event => setProfileDraft({ ...profileDraft, [key]: event.target.value })} className={inputClass} /> :
                      <input id={`profile-${key}`} required={key === 'name'} type={key === 'email' ? 'email' : key === 'phone' || key === 'whatsapp' ? 'tel' : 'text'} maxLength={254} value={profileDraft[key]} onChange={event => setProfileDraft({ ...profileDraft, [key]: event.target.value })} className={inputClass} aria-describedby={key === 'phone' || key === 'whatsapp' ? 'phone-help' : undefined} />}
                  </div>
                ))}
                <p id="phone-help" className="text-sm">Téléphone et WhatsApp : utilisez l’indicatif international, par exemple +33…</p>
                <button disabled={busy} className={buttonClass}><Save className="w-4 h-4" aria-hidden="true" />{busy ? 'Enregistrement...' : 'Enregistrer les coordonnées'}</button>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-6">
                  <label className="flex-1 min-w-0"><span className="sr-only">Rechercher une demande</span><input type="search" placeholder="Rechercher par nom, e-mail ou service" value={search} onChange={event => { setSearch(event.target.value); setVisibleCount(20); }} className={inputClass} /></label>
                  <button onClick={() => void refresh()} disabled={busy} className={buttonClass}><RefreshCw className="w-4 h-4" aria-hidden="true" />Actualiser</button>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <section aria-label="Demandes reçues" className="space-y-3">
                    {!filtered.length && <p className="p-6 border border-gold/20 rounded-xl">{entries.length ? 'Aucun résultat pour cette recherche.' : 'Aucune demande pour le moment.'}</p>}
                    {filtered.slice(0, visibleCount).map(entry => <button key={entry.id} onClick={() => setSelected(entry.id)} aria-pressed={entry.id === selected} className={`w-full text-start border rounded-xl p-5 hover:bg-royal/70 ${selected === entry.id ? 'border-gold bg-royal/50' : 'border-gold/20'}`}><span className="block font-semibold text-gold break-words">{entry.answers.firstName} {entry.answers.lastName}</span><span className="block my-1">{serviceName(entry.serviceId)}</span><span className="block text-sm break-all">{entry.answers.email}</span>{entry.booking && <span className="block text-gold mt-2">{formatBooking(entry.booking)}</span>}<time dateTime={entry.createdAt} className="block text-sm mt-2">{date(entry.createdAt)}</time></button>)}
                    {filtered.length > visibleCount && <button onClick={() => setVisibleCount(count => count + 20)} className={buttonClass}>Afficher plus</button>}
                  </section>
                  <section aria-label="Détail de la demande" className="min-w-0 rounded-2xl border border-gold/30 p-5 sm:p-8 self-start">
                    {current ? <><h2 className="text-2xl font-semibold text-gold mb-2">{serviceName(current.serviceId)}</h2><p className="text-sm mb-6">Reçue le {date(current.createdAt)} · Langue : {current.language.toUpperCase()}</p>{current.booking && <p className="mb-6 text-gold">Réservation : {formatBooking(current.booking)}</p>}<dl className="space-y-5">{Object.entries(current.answers).filter(([, value]) => value).map(([key, value]) => <div key={key}><dt className="text-gold font-semibold mb-1">{labels[key] ?? key}</dt><dd className="whitespace-pre-wrap break-words">{value}</dd></div>)}</dl></> : <p>Sélectionnez une demande pour consulter toutes les réponses.</p>}
                  </section>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
