import { useProfile } from '../contexts/ProfileContext';
import { brand } from '../brand';
import { Eye, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const { profile, error } = useProfile();
  return (
    <footer className="bg-midnight border-t border-gold/20 text-lavender animate-fade-in">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-8 w-8 text-gold animate-glow" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gold to-gold bg-clip-text text-transparent">
                {brand.name}
              </span>
            </div>
            <p className="text-sm text-gold">
              {t('Votre guide spirituel pour éclairer votre chemin de vie. Découvrez votre destinée avec nos voyants professionnels.')}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gold mb-4">{t('Navigation')}</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="inline-flex min-h-11 items-center hover:text-gold transition-colors">
                  {t('Accueil')}
                </Link>
              </li>
              <li>
                <Link to="/#services" className="inline-flex min-h-11 items-center hover:text-gold transition-colors">
                  {t('Nos Services')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex min-h-11 items-center hover:text-gold transition-colors">
                  {t('Contact')}
                </Link>
              </li>
              <li><Link to="/avis" className="inline-flex min-h-11 items-center hover:text-gold transition-colors">{t('Avis et suggestions')}</Link></li>
            </ul>
          </div>

          <div className="order-last sm:col-span-2 lg:col-span-3 border-t border-gold/20 pt-6 sm:pt-8">
            <h3 className="font-semibold text-gold mb-5">{t('Services')}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-1 text-sm">
              {services.map((service) => (
                <li key={service.id} className="min-w-0">
                  <Link to={`/consultation/${service.id}`} className="group flex min-h-11 h-full min-w-0 items-start gap-3 rounded-lg px-3 py-2.5 leading-relaxed text-lavender/80 transition-colors hover:bg-gold/5 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50 group-hover:bg-gold" />
                    <span className="min-w-0 break-words">{t(service.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gold mb-4">{t('Contact')}</h3>
            {!error && <ul className="space-y-1 text-sm">
              <li className="text-gold font-semibold">{profile.name}</li>
              {profile.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold shrink-0" /><a className="min-w-0 break-all py-2" href={`mailto:${profile.email}`}>{profile.email}</a></li>}
            </ul>}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gold/20 text-center text-sm text-gold">
          <p>&copy; {new Date().getFullYear()} {brand.name}. {t('Tous droits réservés.')}</p>
        </div>
      </div>
    </footer>
  );
}
