import { brand } from '../brand';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const languages: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' }, { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' }, { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }, { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' }, { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-sage-500/20 sticky top-0 z-50 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 min-h-16">
          <Link to="/" className="flex items-center space-x-2 text-sage-700 hover:text-sage-800 transition-colors">
            <Eye className="h-8 w-8 animate-glow" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sage-700 to-gold-700 bg-clip-text text-transparent">
              {brand.name}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link to="/" className="text-sage-900 hover:text-sage-800 transition-colors">
              {t('Accueil')}
            </Link>
            <Link to="/#services" className="text-sage-900 hover:text-sage-800 transition-colors">
              {t('Nos Services')}
            </Link>
            <Link to="/contact" className="text-sage-900 hover:text-sage-800 transition-colors">
              {t('Contact')}
            </Link>
            <label className="flex items-center gap-1 rounded-full border border-sage-500/30 bg-sage-50/70 px-3 py-2 text-sage-900">
              <span aria-hidden="true">🌐</span>
              <span className="sr-only">{t('Traducteur')}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="cursor-pointer bg-transparent text-sm outline-none"
                aria-label={t('Choisir la langue du site')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code} className="bg-white">
                    {item.flag} {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
