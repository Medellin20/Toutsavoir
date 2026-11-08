import { brand } from '../brand';
import { Link } from 'react-router-dom';
import { Eye, Menu, X } from 'lucide-react';
import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-midnight/90 backdrop-blur-md border-b border-gold/20 sticky top-0 z-50 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 min-h-16">
          <Link to="/" className="flex items-center space-x-2 text-gold hover:text-gold transition-colors">
            <Eye className="h-8 w-8 animate-glow" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gold to-gold bg-clip-text text-transparent">
              {brand.name}
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gold/30 text-gold lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={t(menuOpen ? 'Fermer le menu' : 'Ouvrir le menu')}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <div id="main-navigation" className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col items-stretch gap-1 border-t border-gold/15 pt-3 lg:flex lg:w-auto lg:flex-row lg:flex-wrap lg:items-center lg:gap-5 lg:border-0 lg:pt-0`}
            onClick={event => { if ((event.target as Element).closest('a')) setMenuOpen(false); }}
            onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector<HTMLButtonElement>('[aria-controls="main-navigation"]')?.focus(); } }}
          >
            <Link to="/" className="rounded-lg px-2 py-3 text-lavender hover:text-gold transition-colors lg:px-0 lg:py-2">
              {t('Accueil')}
            </Link>
            <Link to="/#services" className="rounded-lg px-2 py-3 text-lavender hover:text-gold transition-colors lg:px-0 lg:py-2">
              {t('Nos Services')}
            </Link>
            <Link to="/reservation" className="rounded-lg px-2 py-3 text-gold hover:text-lavender lg:px-0 lg:py-2">{t('Réserver')}</Link>
            <Link to="/contact" className="rounded-lg px-2 py-3 text-lavender hover:text-gold transition-colors lg:px-0 lg:py-2">
              {t('Contact')}
            </Link>
            <Link to="/avis" className="rounded-lg px-2 py-3 text-lavender hover:text-gold transition-colors lg:px-0 lg:py-2">{t('Avis et suggestions')}</Link>
            <label className="my-2 flex w-fit max-w-full items-center gap-1 rounded-full border border-gold/30 bg-midnight/70 px-3 py-2 text-lavender">
              <span aria-hidden="true">🌐</span>
              <span className="sr-only">{t('Traducteur')}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="cursor-pointer bg-transparent text-sm outline-none"
                aria-label={t('Choisir la langue du site')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code} className="bg-midnight">
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
