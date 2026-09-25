import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { packs, Pack } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export function Packs() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSelectPack = (pack: Pack) => {
    navigate('/payment', { state: { pack } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-16 animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-down">
          <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4 animate-float" />
          <h1 className="text-5xl font-bold text-amber-400 mb-4">{t('Nos Packs')}</h1>
          <p className="text-amber-100/80 text-xl max-w-2xl mx-auto">
            Choisissez le forfait qui vous correspond et commencez votre voyage spirituel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packs.map((pack, index) => (
              <div
                key={pack.id}
                className={`relative bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border-2 transition-all transform hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
                  index === packs.length - 1
                    ? 'border-amber-500 shadow-amber-500/50'
                    : 'border-amber-500/30 hover:border-amber-500/60'
                }`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {index === packs.length - 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-float">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-amber-500/50">
                      {t('Le plus populaire')}
                    </span>
                </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-300 mb-2">{pack.name}</h3>
                  <p className="text-amber-100/70 text-sm mb-4">{pack.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-amber-400">{pack.price}€</span>
                  </div>
                  <p className="text-amber-200/60 text-sm">
                    pour {pack.duration_months} mois
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {(pack.features as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-100/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPack(pack)}
                  className={`w-full py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    index === packs.length - 1
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-amber-500/50'
                      : 'bg-purple-700/50 text-amber-100 hover:bg-purple-600/70 border border-amber-500/30'
                  }`}
                >
                  {t('Choisir ce pack')}
                </button>
              </div>
            ))}
          </div>

        <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-br from-purple-800/60 to-indigo-900/60 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 animate-fade-in-up animation-delay-400">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">
            {t('Pourquoi choisir nos packs ?')}
          </h2>
          <ul className="space-y-3 text-amber-100/80">
            <li className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-amber-400 flex-shrink-0" />
              <span>Voyants professionnels et certifiés avec des années d'expérience</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-amber-400 flex-shrink-0" />
              <span>Consultations personnalisées adaptées à vos besoins spécifiques</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-amber-400 flex-shrink-0" />
              <span>Disponibilité flexible pour s'adapter à votre emploi du temps</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-amber-400 flex-shrink-0" />
              <span>Confidentialité absolue et écoute bienveillante garanties</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
