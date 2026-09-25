import { MessageCircle, Mail, Phone, MapPin, Send, Headphones } from 'lucide-react';

export function Contact() {
  const voyants = [
    {
      name: 'Madame Luna',
      specialty: 'Tarot & Voyance',
      whatsapp: '+33612345678',
      email: 'luna@mysticvision.fr',
    },
    {
      name: 'Maître Orion',
      specialty: 'Astrologie & Médiumnité',
      whatsapp: '+33623456789',
      email: 'orion@mysticvision.fr',
    },
    {
      name: 'Madame Celestia',
      specialty: 'Cartomancie & Guidance',
      whatsapp: '+33634567890',
      email: 'celestia@mysticvision.fr',
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
      `Bonjour ${name}, je souhaiterais une consultation de voyance.`
    );
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const handleEmail = (email: string, name: string) => {
    const subject = encodeURIComponent('Demande de consultation');
    const body = encodeURIComponent(
      `Bonjour ${name},\n\nJe souhaiterais prendre rendez-vous pour une consultation de voyance.\n\nCordialement`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-16 animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-down">
          <MessageCircle className="h-12 w-12 text-amber-400 mx-auto mb-4 animate-float" />
          <h1 className="text-5xl font-bold text-amber-400 mb-4">Contactez-nous</h1>
          <p className="text-amber-100/80 text-xl max-w-2xl mx-auto">
            Nos voyants sont à votre écoute pour vous guider sur votre chemin spirituel
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all animate-slide-in-left">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg flex-shrink-0">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-amber-400 mb-2">{customerService.name}</h3>
                  <p className="text-amber-100/80 mb-4">{customerService.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-amber-200/70">
                      <span className="font-semibold text-amber-300">Lun-Ven:</span> {customerService.hours.weekday}
                    </div>
                    <div className="text-sm text-amber-200/70">
                      <span className="font-semibold text-amber-300">Sam-Dim:</span> {customerService.hours.weekend}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(customerService.phone)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold"
                  >
                    <Headphones className="h-5 w-5" />
                    <span>Appeler: {customerService.phone}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 animate-slide-in-right animation-delay-200">
              <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">Avantages du Service Clientèle</h3>
              <ul className="space-y-3 text-amber-100/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-1">✓</span>
                  <span>Support immédiat et personnalisé</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-1">✓</span>
                  <span>Réponses à vos questions techniques et commerciales</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-1">✓</span>
                  <span>Assistance pour votre inscription et vos packs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-1">✓</span>
                  <span>Communication confidentielle et bienveillante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-1">✓</span>
                  <span>Disponibilité étendue jusqu'à 22h en semaine</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center animate-fade-in-up">Nos Voyants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voyants.map((voyant, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
                    <span className="text-3xl text-purple-950 font-bold">
                      {voyant.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-300 mb-1">{voyant.name}</h3>
                  <p className="text-amber-100/70 text-sm">{voyant.specialty}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleWhatsApp(voyant.whatsapp, voyant.name)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleEmail(voyant.email, voyant.name)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-700 text-amber-100 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105 border border-amber-500/30"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 animate-slide-in-left">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Nos Coordonnées</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-amber-300 font-semibold">Téléphone</div>
                  <div className="text-amber-100/80">+33 1 23 45 67 89</div>
                  <div className="text-amber-100/60 text-sm">Lun-Dim: 9h-21h</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-amber-300 font-semibold">Email</div>
                  <div className="text-amber-100/80">contact@mysticvision.fr</div>
                  <div className="text-amber-100/60 text-sm">Réponse sous 24h</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-amber-300 font-semibold">Adresse</div>
                  <div className="text-amber-100/80">123 Rue de la Spiritualité</div>
                  <div className="text-amber-100/80">75001 Paris, France</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 animate-slide-in-right animation-delay-200">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Envoyez-nous un message</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-amber-300 mb-2 text-sm font-semibold">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-purple-950/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-300/30 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-2 text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-purple-950/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-300/30 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-2 text-sm font-semibold">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-purple-950/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-300/30 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 font-bold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-500/50"
              >
                <Send className="h-5 w-5" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-purple-800/60 to-indigo-900/60 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 text-center animate-fade-in-up animation-delay-400">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Horaires d'ouverture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-100/80">
            <div>
              <div className="font-semibold text-amber-300">Lundi - Vendredi</div>
              <div>9h00 - 21h00</div>
            </div>
            <div>
              <div className="font-semibold text-amber-300">Samedi - Dimanche</div>
              <div>10h00 - 20h00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
