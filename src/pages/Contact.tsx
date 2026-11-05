import { brand } from '../brand';
import { MessageCircle, Mail, Phone, MapPin, Send, Headphones } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const voyants = [
    {
      name: 'Madame Luna',
      specialty: 'Tarot & Voyance',
      whatsapp: '+33612345678',
      email: brand.email,
    },
    {
      name: 'Maître Orion',
      specialty: 'Astrologie & Médiumnité',
      whatsapp: '+33623456789',
      email: brand.email,
    },
    {
      name: 'Madame Celestia',
      specialty: 'Cartomancie & Guidance',
      whatsapp: '+33634567890',
      email: brand.email,
    },
  ];

  const customerService = {
    name: 'Service Clientèle',
    phone: '+33 1 45 67 89 10',
    description: 'Notre équipe dédiquée est disponible pour répondre à vos questions et vous assister dans votre parcours.',
    hours: {
      weekday: '8h00 - 22h00',
      weekend: '9h00 - 21h00',
    },
  };

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(
      t('Bonjour {name}, je souhaiterais une consultation de voyance.').replace('{name}', name)
    );
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const handleEmail = (email: string, name: string) => {
    const subject = encodeURIComponent(t('Demande de consultation'));
    const body = encodeURIComponent(
      t('Bonjour {name},\n\nJe souhaiterais prendre rendez-vous pour une consultation de voyance.\n\nCordialement').replace('{name}', name)
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-royal py-16 animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-down">
          <MessageCircle className="h-12 w-12 text-gold mx-auto mb-4 animate-float" />
          <h1 className="text-5xl font-bold text-gold mb-4">{t('Contactez-nous')}</h1>
          <p className="text-lavender text-xl max-w-2xl mx-auto">
            {t('Nos voyants sont à votre écoute pour vous guider sur votre chemin spirituel')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all animate-slide-in-left">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-orchid to-royal p-3 rounded-lg flex-shrink-0">
                  <Headphones className="h-8 w-8 text-lavender" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gold mb-2">{t(customerService.name)}</h3>
                  <p className="text-lavender mb-4">{t(customerService.description)}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gold">
                      <span className="font-semibold text-gold">{t('Lun-Ven:')}</span> {customerService.hours.weekday}
                    </div>
                    <div className="text-sm text-gold">
                      <span className="font-semibold text-gold">{t('Sam-Dim:')}</span> {customerService.hours.weekend}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(customerService.phone)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-orchid to-royal text-lavender rounded-lg hover:from-royal hover:to-orchid transition-all transform hover:scale-105 font-semibold"
                  >
                    <Headphones className="h-5 w-5" />
                    <span>{t('Appeler:')} {customerService.phone}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 animate-slide-in-right animation-delay-200">
              <h3 className="text-2xl font-bold text-gold mb-4 text-center">{t('Avantages du Service Clientèle')}</h3>
              <ul className="space-y-3 text-lavender text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{t('Support immédiat et personnalisé')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{t('Réponses à vos questions techniques et commerciales')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{t('Assistance pour préparer votre consultation')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{t('Communication confidentielle et bienveillante')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{t("Disponibilité étendue jusqu'à 22h en semaine")}</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gold mb-8 text-center animate-fade-in-up">{t('Nos Voyants')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voyants.map((voyant, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-6 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orchid to-royal rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
                    <span className="text-3xl text-lavender font-bold">
                      {voyant.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-1">{voyant.name}</h3>
                  <p className="text-lavender text-sm">{t(voyant.specialty)}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleWhatsApp(voyant.whatsapp, voyant.name)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-orchid text-lavender rounded-lg hover:bg-orchid transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleEmail(voyant.email, voyant.name)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-royal text-lavender rounded-lg hover:bg-orchid transition-all transform hover:scale-105 border border-gold/30"
                  >
                    <Mail className="h-5 w-5" />
                    <span>{t('Email')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 animate-slide-in-left">
            <h2 className="text-2xl font-bold text-gold mb-6">{t('Nos Coordonnées')}</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gold font-semibold">{t('Téléphone')}</div>
                  <div className="text-lavender">+33 1 23 45 67 89</div>
                  <div className="text-lavender text-sm">{t('Lun-Dim:')} 9h-21h</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gold font-semibold">{t('Email')}</div>
                  <div className="text-lavender">{brand.email}</div>
                  <div className="text-lavender text-sm">{t('Réponse sous 24h')}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gold font-semibold">{t('Adresse')}</div>
                  <div className="text-lavender">123 Rue de la Spiritualité</div>
                  <div className="text-lavender">75001 Paris, France</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 animate-slide-in-right animation-delay-200">
            <h2 className="text-2xl font-bold text-gold mb-6">{t('Envoyez-nous un message')}</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gold mb-2 text-sm font-semibold">{t('Nom')}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-midnight/50 border border-gold/30 rounded-lg text-lavender placeholder-lavender/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder={t('Votre nom')}
                />
              </div>

              <div>
                <label className="block text-gold mb-2 text-sm font-semibold">{t('Email')}</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-midnight/50 border border-gold/30 rounded-lg text-lavender placeholder-lavender/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-gold mb-2 text-sm font-semibold">{t('Message')}</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-midnight/50 border border-gold/30 rounded-lg text-lavender placeholder-lavender/50 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder={t('Votre message...')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-orchid to-royal text-lavender font-bold rounded-lg hover:from-royal hover:to-orchid transition-all transform hover:scale-105 shadow-lg hover:shadow-orchid/50"
              >
                <Send className="h-5 w-5" />
                <span>{t('Envoyer')}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-royal/60 to-midnight/60 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 text-center animate-fade-in-up animation-delay-400">
          <h2 className="text-2xl font-bold text-gold mb-4">{t('Horaires d’ouverture')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lavender">
            <div>
              <div className="font-semibold text-gold">{t('Lundi - Vendredi')}</div>
              <div>9h00 - 21h00</div>
            </div>
            <div>
              <div className="font-semibold text-gold">{t('Samedi - Dimanche')}</div>
              <div>10h00 - 20h00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
