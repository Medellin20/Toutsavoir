import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api';
import { bookingDurations, defaultSchedule, type BookingSchedule } from '../booking-data';

export function BookingAgenda() {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    api<BookingSchedule>('/admin/agenda').then(value => { if (active) { setSchedule(value); setLoaded(true); } })
      .catch(caught => { if (active) setError(caught instanceof Error ? caught.message : 'Chargement impossible.'); });
    return () => { active = false; };
  }, [reload]);
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const result = await api<BookingSchedule>('/admin/agenda', { method: 'PUT', body: JSON.stringify(schedule) });
      setSchedule(result);
      setMessage('Horaires enregistrés pour tous les jours. Les rendez-vous déjà réservés sont conservés.');
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Enregistrement impossible.'); }
    finally { setBusy(false); }
  }
  const input = 'block w-full mt-2 rounded-lg border border-gold/30 bg-midnight p-3';
  return <form onSubmit={save} className="border border-gold/30 rounded-2xl p-6 space-y-5 max-w-2xl">
    <h2 className="text-2xl text-gold font-semibold">Horaires de réservation</h2>
    <p>Les mêmes horaires s’appliquent tous les jours, du lundi au dimanche. Vous pouvez les modifier à tout moment. Les rendez-vous déjà réservés sont conservés.</p>
    <p className="text-sm">Les clients peuvent réserver sur les 30 prochains jours. Les créneaux occupés sont automatiquement masqués.</p>
    {!loaded && !error && <p role="status">Chargement...</p>}
    <fieldset disabled={!loaded || busy} className="space-y-5 disabled:opacity-50">
      <label className="flex items-center gap-3"><input type="checkbox" checked={schedule.enabled} onChange={event => setSchedule({ ...schedule, enabled: event.target.checked })} />Accepter les réservations</label>
      <div className="grid sm:grid-cols-2 gap-4"><label>Heure de début<input required type="time" className={input} value={schedule.start} onChange={event => setSchedule({ ...schedule, start: event.target.value })} /></label><label>Heure de fin<input required type="time" className={input} value={schedule.end} onChange={event => setSchedule({ ...schedule, end: event.target.value })} /></label></div>
      <label className="block">Durée des consultations<select className={input} value={schedule.duration} onChange={event => setSchedule({ ...schedule, duration: Number(event.target.value) })}>{bookingDurations.map(value => <option key={value} value={value}>{value} minutes</option>)}</select></label>
      <button className="rounded-lg bg-orchid px-5 py-3">{busy ? 'Enregistrement...' : 'Enregistrer les horaires'}</button>
    </fieldset>
    {message && <p role="status">{message}</p>}{error && <div role="alert"><p>{error}</p>{!loaded && <button type="button" className="underline mt-2" onClick={() => setReload(value => value + 1)}>Réessayer</button>}</div>}
  </form>;
}
