import { useMemo, useState } from 'react';
import { ArrowRightLeft, Languages } from 'lucide-react';

type LanguageCode = 'fr' | 'en' | 'es' | 'ar' | 'it' | 'pt';

type PhraseEntry = Record<LanguageCode, string>;

const languageOptions: Array<{ code: LanguageCode; label: string; flag: string }> = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

const phraseBank: PhraseEntry[] = [
  { fr: 'Bonjour', en: 'Hello', es: 'Hola', ar: 'مرحبا', it: 'Ciao', pt: 'Olá' },
  { fr: 'Merci', en: 'Thank you', es: 'Gracias', ar: 'شكرًا', it: 'Grazie', pt: 'Obrigado' },
  { fr: 'Comment ça va ?', en: 'How are you?', es: '¿Cómo estás?', ar: 'كيف حالك؟', it: 'Come stai?', pt: 'Como você está?' },
  { fr: 'Je veux apprendre', en: 'I want to learn', es: 'Quiero aprender', ar: 'أريد أن أتعلم', it: 'Voglio imparare', pt: 'Quero aprender' },
  { fr: 'Bonne journée', en: 'Have a nice day', es: 'Que tengas un buen día', ar: 'يومًا سعيدًا', it: 'Buona giornata', pt: 'Tenha um bom dia' },
  { fr: 'Où est la gare ?', en: 'Where is the station?', es: '¿Dónde está la estación?', ar: 'أين المحطة؟', it: 'Dov’è la stazione?', pt: 'Onde fica a estação?' },
  { fr: 'Je suis perdu', en: 'I am lost', es: 'Estoy perdido', ar: 'أنا ضائع', it: 'Mi sono perso', pt: 'Estou perdido' },
  { fr: 'À bientôt', en: 'See you soon', es: 'Hasta pronto', ar: 'حتى اللقاء', it: 'A presto', pt: 'Até logo' },
];

const normalize = (value: string) => value.trim().toLowerCase();

export function LanguageTranslator() {
  const [sourceLang, setSourceLang] = useState<LanguageCode>('fr');
  const [targetLang, setTargetLang] = useState<LanguageCode>('en');
  const [input, setInput] = useState<string>('Bonjour');
  const [translation, setTranslation] = useState<string>('Hello');

  const examples = useMemo(
    () =>
      phraseBank.map((entry) => ({
        label: entry[sourceLang],
        value: entry[targetLang],
      })),
    [sourceLang, targetLang],
  );

  const translateText = () => {
    const normalizedInput = normalize(input);

    if (!normalizedInput) {
      setTranslation('Saisissez un texte à traduire.');
      return;
    }

    const match = phraseBank.find((entry) => normalize(entry[sourceLang]) === normalizedInput);

    if (match) {
      setTranslation(match[targetLang]);
      return;
    }

    const partialMatch = phraseBank.find((entry) =>
      entry[sourceLang].toLowerCase().includes(normalizedInput),
    );

    if (partialMatch) {
      setTranslation(partialMatch[targetLang]);
      return;
    }

    setTranslation('Traduction non disponible pour cette phrase. Essayez un exemple.');
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(translation);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/80 to-indigo-950/80 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-950/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Languages className="h-8 w-8 text-amber-400" />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300/80">Traducteur</p>
          <h3 className="text-3xl font-bold text-amber-300">Multilingue</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-amber-100/80">De</span>
          <select
            value={sourceLang}
            onChange={(event) => setSourceLang(event.target.value as LanguageCode)}
            className="w-full rounded-xl border border-amber-500/30 bg-purple-950/60 px-4 py-3 text-amber-50 outline-none focus:border-amber-400"
          >
            {languageOptions.map((language) => (
              <option key={language.code} value={language.code}>
                {language.flag} {language.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleSwap}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 transition hover:scale-105 hover:bg-amber-500/20"
          aria-label="Inverser les langues"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </button>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-amber-100/80">Vers</span>
          <select
            value={targetLang}
            onChange={(event) => setTargetLang(event.target.value as LanguageCode)}
            className="w-full rounded-xl border border-amber-500/30 bg-purple-950/60 px-4 py-3 text-amber-50 outline-none focus:border-amber-400"
          >
            {languageOptions.map((language) => (
              <option key={language.code} value={language.code}>
                {language.flag} {language.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-amber-500/30 bg-purple-950/50 p-4">
          <label className="mb-2 block text-sm font-medium text-amber-100/80">Texte source</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-amber-500/20 bg-purple-900/60 p-3 text-amber-50 outline-none placeholder:text-amber-200/40 focus:border-amber-400"
            placeholder="Écrivez ici votre phrase..."
          />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-purple-900/80 p-4">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-amber-100/80">
            <span>Résultat</span>
            <span className="text-amber-300">{languageOptions.find((language) => language.code === targetLang)?.label}</span>
          </div>
          <p className="min-h-[110px] whitespace-pre-wrap rounded-lg bg-purple-950/50 p-3 text-lg text-amber-50">
            {translation}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {examples.slice(0, 4).map((example) => (
            <button
              key={`${example.label}-${example.value}`}
              type="button"
              onClick={() => {
                setInput(example.label);
                setTranslation(example.value);
              }}
              className="rounded-full border border-amber-500/30 bg-purple-800/70 px-3 py-1.5 text-sm text-amber-100 transition hover:border-amber-400 hover:text-amber-300"
            >
              {example.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={translateText}
          className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-bold text-purple-950 shadow-lg shadow-amber-500/40 transition hover:scale-[1.02]"
        >
          Traduire
        </button>
      </div>
    </div>
  );
}
