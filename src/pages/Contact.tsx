import { formatBooking } from '../booking-data';
import { MessageCircle, Mail, Phone, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile } from '../contexts/ProfileContext';
import { services } from '../data';

export function Contact() {
  const { t } = useLanguage();
  const { profile, loading, error, refresh } = useProfile();
  const location = useLocation();
  const message = t('Bonjour {name}, je souhaiterais une consultation de voyance.').replace('{name}', profile.name);
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight to-royal py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {location.state?.consultationSaved && <div role="status" className="mb-8 rounded-xl border border-gold/40 bg-royal/50 p-5 flex gap-3"><CheckCircle aria-hidden="true" className="text-gold shrink-0" /><div><p className="font-bold text-gold">{t(location.state?.booking ? 'Réservation confirmée !' : 'Demande enregistrée !')}</p>{location.state?.booking && <p className="my-2 text-gold">{formatBooking(location.state.booking)}</p>}<p>{t('Votre questionnaire a été transmis. Contactez maintenant votre voyante pour poursuivre.')}</p></div></div>}
        <div className="text-center mb-10">
          <Sparkles aria-hidden="true" className="h-12 w-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl sm:text-5xl font-bold text-gold mb-4">{t('Votre voyante')}</h1>
          <p className="text-lavender/90">{t('Une seule voyante vous accompagne pour tous les services Oryalune.')}</p>
        </div>
        {loading ? <p role="status">{t('Chargement...')}</p> : error ? <div role="alert" className="rounded-xl border border-gold/40 p-6"><p>{t(error)}</p><button onClick={() => void refresh()} className="mt-4 underline text-gold">{t('Réessayer')}</button></div> : (
          <article className="rounded-2xl border border-gold/30 bg-gradient-to-br from-royal/80 to-midnight/80 p-6 sm:p-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-orchid rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5" aria-hidden="true">{profile.name.charAt(0)}</div>
              <h2 className="text-2xl font-bold text-gold mb-3">{profile.name}</h2>
              <p className="whitespace-pre-wrap text-lavender/90">{t(profile.description)}</p>
              {profile.hours && <p className="flex justify-center items-center gap-2 mt-4"><Clock className="w-4 h-4 text-gold" aria-hidden="true" />{profile.hours}</p>}
            </div>
            <div className="flex flex-wrap justify-center gap-2 my-8">{services.map(service => <span key={service.id} className="rounded-full border border-gold/20 px-3 py-2 text-sm">{t(service.title)}</span>)}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.whatsapp && <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 rounded-lg bg-orchid hover:bg-royal p-4 font-semibold"><MessageCircle aria-hidden="true" />WhatsApp</a>}
              {profile.phone && <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="flex justify-center items-center gap-2 rounded-lg border border-gold/40 p-4 font-semibold"><Phone aria-hidden="true" />{profile.phone}</a>}
              {profile.email && <a href={`mailto:${profile.email}`} className="flex justify-center items-center gap-2 rounded-lg border border-gold/40 p-4 font-semibold sm:col-span-2 break-all"><Mail aria-hidden="true" className="shrink-0" />{profile.email}</a>}
            </div>
            {!profile.phone && !profile.whatsapp && !profile.email && <p className="text-center">{t('Les coordonnées seront bientôt disponibles.')}</p>}
          </article>
        )}
        <Link to="/#services" className="inline-block mt-8 text-gold underline">{t('Nos Services')}</Link>
      </div>
    </div>
  );
}
