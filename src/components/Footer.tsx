import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-purple-950 border-t border-amber-500/20 text-amber-100 animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-8 w-8 text-amber-400 animate-glow" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Mystic Vision
              </span>
            </div>
            <p className="text-sm text-amber-200/70">
              Votre guide spirituel pour éclairer votre chemin de vie. Découvrez votre destinée avec nos voyants professionnels.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('Navigation')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">
                  {t('Accueil')}
                </Link>
              </li>
              <li>
                <Link to="/packs" className="hover:text-amber-300 transition-colors">
                  {t('Nos Packs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('Services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>Voyance par téléphone</li>
              <li>Tarot et cartomancie</li>
              <li>Médiumnité</li>
              <li>Astrologie</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('Contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>contact@mysticvision.fr</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-400" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-500/20 text-center text-sm text-amber-200/70">
          <p>&copy; {new Date().getFullYear()} Mystic Vision. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
