import { CelestialPortal } from '../components/CelestialPortal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Baby, Eye, Star, Sparkles, Moon, Heart, Briefcase, Feather, ArrowRight } from 'lucide-react';
import { testimonials, services } from '../data';
import { serviceImages } from '../service-images';
import { useLanguage } from '../contexts/LanguageContext';

export function Home() {
  const { t } = useLanguage();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const visibleTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);
  const serviceIcons = [Baby, Feather, Heart, Briefcase, Star, Eye, Moon];

  return (
    <div className="min-h-screen bg-midnight">
      <CelestialPortal />

      <section id="services" className="portal-services py-12 sm:py-20 scroll-mt-28" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <Sparkles className="h-12 w-12 text-gold mx-auto mb-4 animate-float" />
            <h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-gold mb-4">{t('Nos Services')}</h2>
            <p className="text-lavender text-lg">
              {t('Une guidance spirituelle complète pour éclairer votre chemin')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Sparkles;
              return (
              <Link
                to={`/consultation/${service.id}`}
                key={service.id}
                className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold min-w-0 flex flex-col bg-gradient-to-br from-royal/80 to-midnight/80 backdrop-blur-sm p-6 rounded-xl border border-gold/20 hover:border-gold/50 transition-all transform motion-safe:hover:-translate-y-1 hover:shadow-xl hover:shadow-orchid/20 animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index, 6) * 0.15}s` }}
              >
                <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-xl bg-midnight aspect-[16/10]">
                  <img
                    src={serviceImages[service.id]}
                    alt=""
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" />
                  <Icon aria-hidden="true" className="absolute bottom-4 left-5 h-9 w-9 text-gold drop-shadow-lg" />
                </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4">{t('Témoignages')}</h2>
            <p className="text-lavender text-lg">
              {t('Découvrez les expériences de nos clients satisfaits')}
            </p>
          </div>

          <div className="text-center mb-8"><Link to="/avis" className="inline-flex rounded-lg bg-orchid px-6 py-3 text-lavender font-semibold hover:bg-royal">{t('Laisser un avis')}</Link></div>
          <div id="testimonials-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-royal/60 to-midnight/60 backdrop-blur-sm p-6 rounded-xl border border-gold/20 hover:border-gold/40 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index, 2) * 0.1}s` }}
                >
                  <p className="text-gold text-sm mb-3">{t(testimonial.service)}</p>
                  <blockquote className="text-lavender mb-4 italic">« {t(testimonial.content)} »</blockquote>
                  <p className="text-gold font-semibold">{testimonial.author_name}</p>
                  <p className="text-lavender text-sm mt-1">{testimonial.location}</p>
                </div>
              ))}
          </div>
          {testimonials.length > 3 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                aria-expanded={showAllTestimonials}
                aria-controls="testimonials-list"
                onClick={() => setShowAllTestimonials(previous => !previous)}
                className="inline-flex items-center gap-3 rounded-lg border border-gold/40 bg-royal/50 px-6 py-3 font-semibold text-gold transition-colors hover:bg-orchid/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {t(showAllTestimonials ? 'Voir moins de commentaires' : 'Voir tous les commentaires')}
                {!showAllTestimonials && <span className="rounded-full bg-gold/10 px-2 py-0.5 text-sm">+{testimonials.length - 3}</span>}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
