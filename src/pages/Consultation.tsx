import { useRef, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { services } from '../data';
import { commonQuestions, serviceQuestions, closingQuestions } from '../consultation-data';
import { useLanguage } from '../contexts/LanguageContext';

const recipient = 'kartersteven215@gmail.com';
const inputClass = 'w-full rounded-lg border border-amber-500/30 bg-purple-950/60 px-4 py-3 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400';

export function Consultation() {
  const { serviceId } = useParams();
  const { t } = useLanguage();
  const service = services.find((item) => item.id === serviceId);
  if (!service) return (
    <div className="bg-purple-950 text-amber-100 px-4 py-20 text-center">
      <h1 className="text-3xl mb-6">{t('Service introuvable')}</h1>
      <Link to="/#services" className="text-amber-300 underline">{t('Retour aux services')}</Link>
    </div>
  );
  return <ConsultationForm key={service.id} service={service} />;
}

function ConsultationForm({ service }: { service: (typeof services)[number] }) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
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
  const body = `${t('Demande de consultation')} : ${t(service.title)}\n\n${fields.map((field) => `${t(field.label)}\n${answers[field.id]?.trim() ? t(answers[field.id].trim()) : '—'}`).join('\n\n')}`;
  const emailUrl = `mailto:${recipient}?subject=${encodeURIComponent(`${t('Demande de consultation')} — ${t(service.title)}`)}&body=${encodeURIComponent(body)}`;

  function showReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReview(true);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function download() {
    const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `consultation-${service.id}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-10 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 text-amber-200 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />{t('Nos Services')}
        </Link>
        <p className="text-amber-200/70 mb-3 text-sm">{t(review ? 'Étape 2 sur 2 · Récapitulatif' : 'Étape 1 sur 2 · Votre consultation')}</p>
        <h1 ref={heading} tabIndex={-1} className="text-3xl sm:text-4xl font-bold text-amber-300 mb-4 focus:outline-none">{t(service.title)}</h1>
        <p className="text-amber-100/80 leading-relaxed mb-8">{t(service.description)}</p>
        {review ? (
          <section aria-label={t('Récapitulatif')} className="bg-purple-950/50 border border-amber-500/20 p-5 sm:p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-amber-300 mb-6">{t('Vérifiez vos réponses')}</h2>
            <dl className="space-y-5">
              {fields.filter((field) => answers[field.id]?.trim()).map((field) => (
                <div key={field.id}><dt className="text-amber-200 font-semibold mb-1">{t(field.label)}</dt><dd className="text-amber-100/80 whitespace-pre-wrap break-words">{t(answers[field.id])}</dd></div>
              ))}
            </dl>
            <p className="text-sm text-amber-100/80 my-6">{t('Le bouton ouvre votre messagerie avec les réponses préparées. Envoyez ensuite le message pour transmettre votre demande.')} <span className="break-all">{recipient}</span></p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => { setReview(false); setEmailOpened(false); }} className="border border-amber-500/40 rounded-lg px-5 py-3 text-amber-100">{t('Modifier mes réponses')}</button>
              <a href={emailUrl} onClick={() => setEmailOpened(true)} className="inline-flex justify-center items-center gap-2 rounded-lg bg-amber-400 text-purple-950 font-bold px-5 py-3 hover:bg-amber-300"><Mail aria-hidden="true" className="h-5 w-5" />{t('Préparer l’e-mail')}</a>
            </div>
            {emailOpened && <p role="status" className="text-amber-100 mt-5">{t('Votre demande sera transmise uniquement après l’envoi depuis votre messagerie.')}</p>}
            <button type="button" onClick={download} className="text-amber-200 underline underline-offset-4 mt-5 text-sm">{t('Télécharger mes réponses')}</button>
          </section>
        ) : (
          <form onSubmit={showReview} className="bg-purple-950/50 border border-amber-500/20 p-5 sm:p-8 rounded-2xl space-y-8">
            <p className="text-amber-100/70 text-sm">{t('Les champs marqués d’un * sont obligatoires. Les autres réponses sont facultatives.')}</p>
            <fieldset>
              <legend className="text-xl font-semibold text-amber-300 mb-5">{t('Vos informations')}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {identity.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-amber-100 mb-2">{t(field.label)} *</label>
                    <input id={field.id} name={field.id} type={field.type} autoComplete={field.autoComplete} required min={field.id === 'age' ? 1 : undefined} max={field.id === 'age' ? 120 : undefined} step={field.id === 'age' ? 1 : undefined} maxLength={field.id === 'email' ? 254 : 80} pattern={field.type === 'text' ? '.*\\S.*' : undefined} value={answers[field.id] ?? ''} onChange={(event) => update(field.id, event.target.value)} className={inputClass} />
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="space-y-5">
              <legend className="text-xl font-semibold text-amber-300 mb-5">{t('Préparons votre consultation')}</legend>
              {questions.map((question) => (
                <div key={question.id}>
                  <label htmlFor={question.id} className="block text-amber-100 mb-2">{t(question.label)}{question.required ? ' *' : ''}</label>
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
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 text-purple-950 font-bold px-5 py-4 hover:bg-amber-300">{t('Vérifier mes réponses')}<ArrowRight aria-hidden="true" className="h-5 w-5 rtl:rotate-180" /></button>
          </form>
        )}
      </div>
    </div>
  );
}
