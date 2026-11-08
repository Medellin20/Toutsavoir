import { useState, type FormEvent } from 'react';
import { api } from '../api';
import { bookingDurations } from '../booking-data';

export function BookingAgenda() {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:00');
  const [duration, setDuration] = useState(30);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function publish(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const result = await api<{ count: number }>('/admin/agenda', { method: 'POST', body: JSON.stringify({ date, start, end, duration }) });
      setMessage(`${result.count} créneaux publiés pour le ${date}.`);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Publication impossible.'); }
    finally { setBusy(false); }
  }
  const input = 'block w-full mt-2 rounded-lg border border-gold/30 bg-midnight p-3';
  return <form onSubmit={publish} className="border border-gold/30 rounded-2xl p-6 space-y-5 max-w-2xl">
    <h2 className="text-2xl text-gold font-semibold">Ouvrir les réservations</h2>
    <p>Publiez une plage pour chaque journée où la voyante est disponible. Les créneaux sont communs à tous les services et ne se chevauchent pas. Une journée publiée ne peut pas être modifiée ici ; vérifiez les horaires avant publication.</p>
    <p className="text-sm">Fuseau Africa/Porto-Novo (UTC+1). Préavis : une heure. Chaque journée propose une même durée de consultation.</p>
    <label className="block">Date<input required type="date" className={input} value={date} onChange={event => setDate(event.target.value)} /></label>
    <div className="grid sm:grid-cols-2 gap-4"><label>Début<input required type="time" className={input} value={start} onChange={event => setStart(event.target.value)} /></label><label>Fin<input required type="time" className={input} value={end} onChange={event => setEnd(event.target.value)} /></label></div>
    <label className="block">Durée des consultations<select className={input} value={duration} onChange={event => setDuration(Number(event.target.value))}>{bookingDurations.map(value => <option key={value} value={value}>{value} minutes</option>)}</select></label>
    {message && <p role="status">{message}</p>}{error && <p role="alert">{error}</p>}
    <button disabled={busy} className="rounded-lg bg-orchid px-5 py-3 disabled:opacity-50">{busy ? 'Publication...' : 'Publier les créneaux'}</button>
  </form>;
}
