import { brand } from '../brand';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-midnight border-t border-gold/20 text-lavender animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
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

          <div>
            <h3 className="font-semibold text-gold mb-4">{t('Navigation')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  {t('Accueil')}
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-gold transition-colors">
                  {t('Nos Services')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  {t('Contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gold mb-4">{t('Services')}</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/consultation/${service.id}`} className="hover:text-gold transition-colors">
                    {t(service.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gold mb-4">{t('Contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold" />
                <span>{brand.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gold/20 text-center text-sm text-gold">
          <p>&copy; {new Date().getFullYear()} {brand.name}. {t('Tous droits réservés.')}</p>
        </div>
      </div>
    </footer>
  );
}
