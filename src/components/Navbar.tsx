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
    <nav className="bg-purple-950/90 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
            <Eye className="h-8 w-8 animate-glow" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Mystic Vision
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-amber-100 hover:text-amber-300 transition-colors">
              {t('Accueil')}
            </Link>
            <Link to="/packs" className="text-amber-100 hover:text-amber-300 transition-colors">
              {t('Nos Packs')}
            </Link>
            <Link to="/contact" className="text-amber-100 hover:text-amber-300 transition-colors">
              {t('Contact')}
            </Link>
            <label className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-purple-900/70 px-3 py-2 text-amber-100">
              <span aria-hidden="true">🌐</span>
              <span className="sr-only">Traduire</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="cursor-pointer bg-transparent text-sm outline-none"
                aria-label="Choisir la langue du site"
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code} className="bg-purple-950">
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
