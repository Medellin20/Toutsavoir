import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Language = 'fr' | 'nl' | 'en' | 'es' | 'it' | 'de' | 'pt' | 'ar' | 'pl';

const translations: Record<Language, Record<string, string>> = {
  fr: {},
  nl: {
    Accueil: 'Home', 'Nos Packs': 'Onze pakketten', Contact: 'Contact', Services: 'Diensten',
    'Témoignages': 'Getuigenissen', 'Traducteur': 'Vertaler', 'Découvrir nos packs': 'Ontdek onze pakketten',
    'Consulter un voyant': 'Raadpleeg een helderziende', 'Nos Services': 'Onze diensten',
    'Nos Voyants': 'Onze helderzienden', 'Choisir ce pack': 'Dit pakket kiezen',
    'Le plus populaire': 'Meest populair', 'Pourquoi choisir nos packs ?': 'Waarom onze pakketten kiezen?',
    'Paiement': 'Betaling', 'Finalisez votre abonnement': 'Voltooi uw abonnement',
  },
  en: {
    Accueil: 'Home', 'Nos Packs': 'Our Packages', Contact: 'Contact', Services: 'Services',
    'Témoignages': 'Testimonials', 'Traducteur': 'Translate', 'Découvrir nos packs': 'Discover our packages',
    'Consulter un voyant': 'Consult a psychic', 'Nos Services': 'Our Services', 'Nos Voyants': 'Our Psychics',
    'Choisir ce pack': 'Choose this package', 'Le plus populaire': 'Most popular',
    'Pourquoi choisir nos packs ?': 'Why choose our packages?', Paiement: 'Payment',
    'Finalisez votre abonnement': 'Complete your subscription',
  },
  es: {
    Accueil: 'Inicio', 'Nos Packs': 'Nuestros planes', Contact: 'Contacto', Services: 'Servicios',
    'Témoignages': 'Testimonios', Traducteur: 'Traducir', 'Découvrir nos packs': 'Descubrir nuestros planes',
    'Consulter un voyant': 'Consultar a un vidente', 'Nos Services': 'Nuestros servicios',
    'Nos Voyants': 'Nuestros videntes', 'Choisir ce pack': 'Elegir este plan', 'Le plus populaire': 'Más popular',
    'Pourquoi choisir nos packs ?': '¿Por qué elegir nuestros planes?', Paiement: 'Pago',
    'Finalisez votre abonnement': 'Finaliza tu suscripción',
  },
  it: {
    Accueil: 'Home', 'Nos Packs': 'I nostri pacchetti', Contact: 'Contatti', Services: 'Servizi',
    'Témoignages': 'Testimonianze', Traducteur: 'Traduci', 'Découvrir nos packs': 'Scopri i nostri pacchetti',
    'Consulter un voyant': 'Consulta un veggente', 'Nos Services': 'I nostri servizi',
    'Nos Voyants': 'I nostri veggenti', 'Choisir ce pack': 'Scegli questo pacchetto',
    'Le plus populaire': 'Più popolare', 'Pourquoi choisir nos packs ?': 'Perché scegliere i nostri pacchetti?',
    Paiement: 'Pagamento', 'Finalisez votre abonnement': 'Completa il tuo abbonamento',
  },
  de: {
    Accueil: 'Startseite', 'Nos Packs': 'Unsere Pakete', Contact: 'Kontakt', Services: 'Dienste',
    'Témoignages': 'Erfahrungsberichte', Traducteur: 'Übersetzen', 'Découvrir nos packs': 'Pakete entdecken',
    'Consulter un voyant': 'Hellseher konsultieren', 'Nos Services': 'Unsere Dienste',
    'Nos Voyants': 'Unsere Hellseher', 'Choisir ce pack': 'Dieses Paket wählen',
    'Le plus populaire': 'Beliebteste', 'Pourquoi choisir nos packs ?': 'Warum unsere Pakete wählen?',
    Paiement: 'Zahlung', 'Finalisez votre abonnement': 'Abonnement abschließen',
  },
  pt: {
    Accueil: 'Início', 'Nos Packs': 'Nossos planos', Contact: 'Contacto', Services: 'Serviços',
    'Témoignages': 'Testemunhos', Traducteur: 'Traduzir', 'Découvrir nos packs': 'Descobrir os nossos planos',
    'Consulter un voyant': 'Consultar um vidente', 'Nos Services': 'Os nossos serviços',
    'Nos Voyants': 'Os nossos videntes', 'Choisir ce pack': 'Escolher este plano',
    'Le plus populaire': 'Mais popular', 'Pourquoi choisir nos packs ?': 'Porquê escolher os nossos planos?',
    Paiement: 'Pagamento', 'Finalisez votre abonnement': 'Conclua a sua subscrição',
  },
  ar: {
    Accueil: 'الرئيسية', 'Nos Packs': 'باقاتنا', Contact: 'اتصل بنا', Services: 'خدماتنا',
    'Témoignages': 'شهادات العملاء', Traducteur: 'ترجمة', 'Découvrir nos packs': 'اكتشف باقاتنا',
    'Consulter un voyant': 'استشر عرافًا', 'Nos Services': 'خدماتنا', 'Nos Voyants': 'العرافون',
    'Choisir ce pack': 'اختر هذه الباقة', 'Le plus populaire': 'الأكثر شعبية',
    'Pourquoi choisir nos packs ?': 'لماذا تختار باقاتنا؟', Paiement: 'الدفع',
    'Finalisez votre abonnement': 'أكمل اشتراكك',
  },
  pl: {
    Accueil: 'Strona główna', 'Nos Packs': 'Nasze pakiety', Contact: 'Kontakt', Services: 'Usługi',
    'Témoignages': 'Opinie', Traducteur: 'Tłumacz', 'Découvrir nos packs': 'Odkryj nasze pakiety',
    'Consulter un voyant': 'Skonsultuj się z wróżbitą', 'Nos Services': 'Nasze usługi',
    'Nos Voyants': 'Nasi wróżbici', 'Choisir ce pack': 'Wybierz ten pakiet',
    'Le plus populaire': 'Najpopularniejszy', 'Pourquoi choisir nos packs ?': 'Dlaczego nasze pakiety?',
    Paiement: 'Płatność', 'Finalisez votre abonnement': 'Dokończ subskrypcję',
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
}>({ language: 'fr', setLanguage: () => undefined, t: (text) => text });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const value = useMemo(
    () => ({ language, setLanguage, t: (text: string) => translations[language][text] ?? text }),
    [language],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
