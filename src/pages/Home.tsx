import { Link } from 'react-router-dom';
import { Eye, Star, Sparkles, Moon, Heart } from 'lucide-react';
import { testimonials } from '../data';

export function Home() {
  const services = [
    {
      icon: Eye,
      title: 'Voyance Claire',
      description: 'Découvrez votre avenir avec clarté grâce à nos voyants expérimentés.',
    },
    {
      icon: Star,
      title: 'Tarot & Cartomancie',
      description: 'Laissez les cartes révéler les secrets de votre destinée.',
    },
    {
      icon: Moon,
      title: 'Astrologie',
      description: 'Explorez l\'influence des astres sur votre vie quotidienne.',
    },
    {
      icon: Heart,
      title: 'Guidance Amoureuse',
      description: 'Trouvez des réponses à vos questions sentimentales.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 animate-gradient-shift">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMC04IDEtOCA4czggOCA4IDggOC04IDgtOC04LTgtOC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-300 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle animation-delay-400"></div>
        <div className="absolute top-48 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle animation-delay-200"></div>
        <div className="absolute top-16 right-1/3 w-2 h-2 bg-amber-400 rounded-full animate-twinkle animation-delay-600"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle animation-delay-800"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 animate-float">
              <Eye className="h-20 w-20 text-amber-400 animate-glow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-fade-in-up">
              Mystic Vision
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Découvrez les mystères de votre destinée avec nos voyants professionnels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link
                to="/packs"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 font-bold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-500/50"
              >
                Découvrir nos packs
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-amber-100 font-bold rounded-lg hover:bg-purple-600/50 transition-all transform hover:scale-105 border border-amber-500/30"
              >
                Consulter un voyant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4 animate-float" />
            <h2 className="text-4xl font-bold text-amber-400 mb-4">Nos Services</h2>
            <p className="text-amber-100/80 text-lg">
              Une guidance spirituelle complète pour éclairer votre chemin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/50 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <service.icon className="h-12 w-12 text-amber-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-amber-300 mb-2">{service.title}</h3>
                <p className="text-amber-100/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <Star className="h-12 w-12 text-amber-400 mx-auto mb-4 animate-float" />
            <h2 className="text-4xl font-bold text-amber-400 mb-4">Témoignages</h2>
            <p className="text-amber-100/80 text-lg">
              Découvrez les expériences de nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-purple-800/60 to-indigo-900/60 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400 animate-twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <p className="text-amber-100/90 mb-4 italic">"{testimonial.content}"</p>
                  <p className="text-amber-400 font-semibold">{testimonial.author_name}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
