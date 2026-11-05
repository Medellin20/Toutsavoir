import { brand } from '../brand';
import { Link } from 'react-router-dom';
import { Baby, Eye, Star, Sparkles, Moon, Heart, Briefcase, Feather, ArrowRight } from 'lucide-react';
import { testimonials, services } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export function Home() {
  const { t } = useLanguage();
  const serviceIcons = [Baby, Feather, Heart, Briefcase, Star, Eye, Moon];

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-royal animate-gradient-shift">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMC04IDEtOCA4czggOCA4IDggOC04IDgtOC04LTgtOC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="absolute top-20 left-10 w-2 h-2 bg-royal rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-gold rounded-full animate-twinkle animation-delay-400"></div>
        <div className="absolute top-48 left-1/4 w-1 h-1 bg-gold rounded-full animate-twinkle animation-delay-200"></div>
        <div className="absolute top-16 right-1/3 w-2 h-2 bg-orchid rounded-full animate-twinkle animation-delay-600"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-twinkle animation-delay-800"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 animate-float">
              <Eye className="h-20 w-20 text-gold animate-glow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gold via-lavender to-gold bg-clip-text text-transparent animate-fade-in-up">
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl text-lavender mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              {t('Découvrez les mystères de votre destinée avec nos voyants professionnels')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link
                to="/#services"
                className="px-8 py-4 bg-gradient-to-r from-orchid to-royal text-lavender font-bold rounded-lg hover:from-royal hover:to-orchid transition-all transform hover:scale-105 shadow-lg hover:shadow-orchid/50"
              >
                {t('Nos Services')}
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-royal/50 backdrop-blur-sm text-lavender font-bold rounded-lg hover:bg-orchid/50 transition-all transform hover:scale-105 border border-gold/30"
              >
                {t('Consulter un voyant')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-midnight/50 scroll-mt-24" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <Sparkles className="h-12 w-12 text-gold mx-auto mb-4 animate-float" />
            <h2 id="services-title" className="text-4xl font-bold text-gold mb-4">{t('Nos Services')}</h2>
            <p className="text-lavender text-lg">
              {t('Une guidance spirituelle complète pour éclairer votre chemin')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
              <Link
                to={`/consultation/${service.id}`}
                key={service.id}
                className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold flex flex-col bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-6 rounded-xl border border-gold/20 hover:border-gold/50 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-orchid/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Icon aria-hidden="true" className="h-12 w-12 text-gold mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-gold mb-2">{t(service.title)}</h3>
                <p className="text-lavender whitespace-pre-line leading-relaxed mb-6">{t(service.description)}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-gold font-semibold">
                  {t('Consulter un voyant')}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <Star className="h-12 w-12 text-gold mx-auto mb-4 animate-float" />
            <h2 className="text-4xl font-bold text-gold mb-4">{t('Témoignages')}</h2>
            <p className="text-lavender text-lg">
              {t('Découvrez les expériences de nos clients satisfaits')}
            </p>
          </div>

          <div className="text-center mb-8"><Link to="/avis" className="inline-flex rounded-lg bg-orchid px-6 py-3 text-lavender font-semibold hover:bg-royal">{t('Laisser un avis')}</Link></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-royal/60 to-midnight/60 backdrop-blur-sm p-6 rounded-xl border border-gold/20 hover:border-gold/40 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-gold text-sm mb-3">{t(testimonial.service)}</p>
                  <blockquote className="text-lavender mb-4 italic">« {t(testimonial.content)} »</blockquote>
                  <p className="text-gold font-semibold">{testimonial.author_name}</p>
                  <p className="text-lavender text-sm mt-1">{testimonial.location}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
