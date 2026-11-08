import { bookingDurations, formatBooking, type BookingSlot } from '../booking-data';
import { api, ApiError } from '../api';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { services } from '../data';
import { commonQuestions, serviceQuestions, closingQuestions } from '../consultation-data';
import { useLanguage } from '../contexts/LanguageContext';

const inputClass = 'w-full rounded-lg border border-gold/30 bg-midnight/60 px-4 py-3 text-lavender focus:outline-none focus:ring-2 focus:ring-gold';

export function Consultation() {
  const { serviceId } = useParams();
  const { t } = useLanguage();
  const service = services.find((item) => item.id === (serviceId ?? services[0].id));
  if (!service) return (
    <div className="bg-midnight text-lavender px-4 py-20 text-center">
      <h1 className="text-3xl mb-6">{t('Service introuvable')}</h1>
      <Link to="/#services" className="text-gold underline">{t('Retour aux services')}</Link>
    </div>
  );
  return <ConsultationForm key={service.id} service={service} />;
}

function ConsultationForm({ service }: { service: (typeof services)[number] }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const requestId = useRef(crypto.randomUUID());
  const submitting = useRef(false);
  const [duration, setDuration] = useState(30);
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [slotStart, setSlotStart] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState('');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setLoadingSlots(true); setSlotsError('');
    api<BookingSlot[]>('/availability').then(value => { if (active) setSlots(value); })
      .catch(caught => { if (active) setSlotsError(caught instanceof Error ? caught.message : 'Chargement impossible.'); })
      .finally(() => { if (active) setLoadingSlots(false); });
    return () => { active = false; };
  }, [reload]);
  const booking = slots.find(slot => slot.start === slotStart && slot.duration === duration);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const questions = [...commonQuestions, ...serviceQuestions[service.id], ...closingQuestions];
  const identity = [
    { id: 'lastName', label: 'Nom', type: 'text', autoComplete: 'family-name' },
    { id: 'firstName', label: 'Prénom', type: 'text', autoComplete: 'given-name' },
    { id: 'age', label: 'Âge', type: 'number', autoComplete: 'off' },
    { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  ];
  const update = (id: string, value: string) => setAnswers((previous) => ({ ...previous, [id]: value }));
  const fields = [...identity, ...questions];

  function showReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking) return;
    setReview(true);
    requestAnimationFrame(() => heading.current?.focus());
  }

  async function submit() {
    if (submitting.current) return;
    submitting.current = true;
    setSaving(true);
    setError('');
    try {
      if (!booking) throw new Error('Choisissez un créneau disponible.');
      const result = await api<{ saved: boolean }>('/bookings', { method: 'POST', body: JSON.stringify({ id: requestId.current, serviceId: service.id, language, answers, booking }) });
      if (!result.saved) throw new Error('L’enregistrement n’a pas été confirmé. Veuillez réessayer.');
      navigate('/contact', { replace: true, state: { consultationSaved: true, booking } });
    } catch (caught) {
      if (caught instanceof ApiError && (caught.status === 409 || caught.status === 400)) { setReview(false); setSlotStart(''); setReload(value => value + 1); }
      setError(caught instanceof Error ? caught.message : 'Impossible d’enregistrer la demande. Veuillez réessayer.');
    } finally { submitting.current = false; setSaving(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-royal py-10 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 text-gold hover:text-lavender mb-8">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />{t('Nos Services')}
        </Link>
        <p className="text-gold mb-3 text-sm">{t(review ? 'Étape 2 sur 2 · Récapitulatif' : 'Étape 1 sur 2 · Votre consultation')}</p>
        <h1 ref={heading} tabIndex={-1} className="text-3xl sm:text-4xl font-bold text-gold mb-4 focus:outline-none">{t(service.title)}</h1>
        <p className="text-lavender whitespace-pre-line leading-relaxed mb-8">{t(service.description)}</p>
        {error && !review && <p role="alert" className="p-4 mb-4 border border-gold/40 rounded-lg">{t(error)}</p>}
        {review ? (
          <section aria-label={t('Récapitulatif')} className="bg-midnight/50 border border-gold/20 p-5 sm:p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gold mb-6">{t('Vérifiez vos réponses')}</h2>
            <p className="text-gold mb-6">{booking && formatBooking(booking)}</p>
            <dl className="space-y-5">
              {fields.filter((field) => answers[field.id]?.trim()).map((field) => (
                <div key={field.id}><dt className="text-gold font-semibold mb-1">{t(field.label)}</dt><dd className="text-lavender whitespace-pre-wrap break-words">{t(answers[field.id])}</dd></div>
              ))}
            </dl>
            <p className="text-sm text-lavender my-6">{t('Votre créneau sera réservé après confirmation. Vous pourrez ensuite contacter votre voyante.')}</p>
            {error && <p role="alert" className="border border-gold/50 rounded-lg p-4 my-4">{t(error)}</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" disabled={saving} onClick={() => setReview(false)} className="border border-gold/40 rounded-lg px-5 py-3 text-lavender disabled:opacity-50">{t('Modifier mes réponses')}</button>
              <button type="button" disabled={saving} onClick={() => void submit()} className="inline-flex justify-center items-center gap-2 rounded-lg bg-orchid text-lavender font-bold px-5 py-3 hover:bg-royal disabled:opacity-50"><Check aria-hidden="true" className="h-5 w-5" />{t(saving ? 'Enregistrement...' : 'Confirmer ma réservation')}</button>
            </div>
          </section>
        ) : (
          <form onSubmit={showReview} className="bg-midnight/50 border border-gold/20 p-5 sm:p-8 rounded-2xl space-y-8">
            <p className="text-lavender text-sm">{t('Les champs marqués d’un * sont obligatoires. Les autres réponses sont facultatives.')}</p>
            <fieldset className="space-y-5">
              <legend className="text-xl font-semibold text-gold mb-5">{t('Votre réservation')}</legend>
              <label className="block">{t('Choix du service')}<select className={`${inputClass} mt-2`} value={service.id} onChange={event => navigate(`/consultation/${event.target.value}`)}>{services.map(item => <option key={item.id} value={item.id}>{t(item.title)}</option>)}</select></label>
              <label className="block">{t('Durée de consultation')}<select className={`${inputClass} mt-2`} value={duration} onChange={event => { setDuration(Number(event.target.value)); setSlotStart(''); }}>{bookingDurations.map(value => <option key={value} value={value}>{value} min</option>)}</select></label>
              <p className="text-sm">{t('Horaires : Africa/Porto-Novo (UTC+1). Réservation au moins une heure à l’avance.')}</p>
              {loadingSlots ? <p role="status">{t('Chargement...')}</p> : slotsError ? <p role="alert">{slotsError}</p> : <label className="block">{t('Créneau disponible')} *<select required className={`${inputClass} mt-2`} value={slotStart} onChange={event => setSlotStart(event.target.value)}><option value="">{t('Sélectionnez un créneau')}</option>{slots.filter(slot => slot.duration === duration).map(slot => <option key={slot.start} value={slot.start}>{formatBooking(slot)}</option>)}</select>{!slots.some(slot => slot.duration === duration) && <span className="block mt-3">{t('Aucun créneau disponible pour cette durée. Essayez une autre durée ou contactez la voyante.')}</span>}</label>}
              <button type="button" className="text-gold underline" disabled={loadingSlots} onClick={() => { setSlotStart(''); setReload(value => value + 1); }}>{t('Actualiser les disponibilités')}</button>
            </fieldset>
            <fieldset>
              <legend className="text-xl font-semibold text-gold mb-5">{t('Vos informations')}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {identity.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-lavender mb-2">{t(field.label)} *</label>
                    <input id={field.id} name={field.id} type={field.type} autoComplete={field.autoComplete} required min={field.id === 'age' ? 1 : undefined} max={field.id === 'age' ? 120 : undefined} step={field.id === 'age' ? 1 : undefined} maxLength={field.id === 'email' ? 254 : 80} pattern={field.type === 'text' ? '.*\\S.*' : undefined} value={answers[field.id] ?? ''} onChange={(event) => update(field.id, event.target.value)} className={inputClass} />
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="space-y-5">
              <legend className="text-xl font-semibold text-gold mb-5">{t('Préparons votre consultation')}</legend>
              {questions.map((question) => (
                <div key={question.id}>
                  <label htmlFor={question.id} className="block text-lavender mb-2">{t(question.label)}{question.required ? ' *' : ''}</label>
                  {question.options ? (
                    <select id={question.id} name={question.id} required={question.required} value={answers[question.id] ?? ''} onChange={(event) => update(question.id, event.target.value)} className={inputClass}>
                      <option value="">{t('Sélectionnez une réponse')}</option>
                      {question.options.map((option) => <option key={option} value={option}>{t(option)}</option>)}
                    </select>
                  ) : (
                    <textarea id={question.id} name={question.id} rows={3} maxLength={500} required={question.required} value={answers[question.id] ?? ''} onChange={(event) => update(question.id, event.target.value)} onBlur={(event) => update(question.id, event.target.value.trim())} className={`${inputClass} resize-y`} />
                  )}
                </div>
              ))}
            </fieldset>
            <button type="submit" disabled={!booking || loadingSlots || !!slotsError} className="disabled:opacity-50 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orchid text-lavender font-bold px-5 py-4 hover:bg-royal">{t('Vérifier mes réponses')}<ArrowRight aria-hidden="true" className="h-5 w-5 rtl:rotate-180" /></button>
          </form>
        )}
      </div>
    </div>
  );
}
