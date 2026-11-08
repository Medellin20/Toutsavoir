import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '../brand';
import { useLanguage } from '../contexts/LanguageContext';

const stars = Array.from({ length: 42 }, (_, index) => ({
  x: ((index * 73 + 19) % 1000) / 10,
  y: ((index * 137 + 43) % 900) / 10,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: `${-(index % 11)}s`,
}));

export function CelestialPortal() {
  const { t } = useLanguage();
  const portalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const portal = portalRef.current;
    if (!portal) return;
    const observer = new IntersectionObserver(([entry]) => {
      portal.dataset.active = String(entry.isIntersecting);
    });
    observer.observe(portal);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={portalRef} className="celestial-portal" aria-labelledby="portal-title" data-active="true">
      <div className="portal-nebula" aria-hidden="true"><span /><span /><span /></div>
      <div className="portal-stars" aria-hidden="true">
        {stars.map((star, index) => (
          <span key={index} className={index % 7 === 0 ? 'portal-star portal-star-cross' : 'portal-star'}
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: star.delay }} />
        ))}
      </div>
      <div className="portal-content">
        <p className="portal-eyebrow"><Sparkles size={14} aria-hidden="true" />{t('Le Portail Céleste')}</p>
        <div className="portal-art" aria-hidden="true">
          <div className="portal-halo" />
          <div className="portal-orbit portal-orbit-outer"><span /></div>
          <div className="portal-orbit portal-orbit-middle"><span /></div>
          <div className="portal-moon-float">
            <svg className="portal-moon" viewBox="0 0 300 300" focusable="false">
              <defs>
                <radialGradient id="portal-moon-light" cx="32%" cy="28%" r="76%">
                  <stop stopColor="#fffdf0" /><stop offset=".48" stopColor="#eae0c5" />
                  <stop offset=".8" stopColor="#b4a99b" /><stop offset="1" stopColor="#5c536b" />
                </radialGradient>
                <radialGradient id="portal-crater"><stop stopColor="#786e7e" stopOpacity=".27" /><stop offset=".72" stopColor="#a3999d" stopOpacity=".09" /><stop offset="1" stopColor="#fffbe5" stopOpacity=".2" /></radialGradient>
                <filter id="portal-lunar-texture" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency=".065" numOctaves="3" seed="12" />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer><feFuncA type="linear" slope=".22" /></feComponentTransfer>
                  <feBlend in="SourceGraphic" mode="multiply" />
                </filter>
                <clipPath id="portal-lunar-disc"><circle cx="150" cy="150" r="137" /></clipPath>
              </defs>
              <g clipPath="url(#portal-lunar-disc)">
                <circle cx="150" cy="150" r="137" fill="url(#portal-moon-light)" />
                <g fill="url(#portal-crater)">
                  <ellipse cx="101" cy="105" rx="36" ry="41" /><circle cx="177" cy="82" r="26" />
                  <ellipse cx="90" cy="176" rx="24" ry="34" /><circle cx="166" cy="161" r="42" />
                  <circle cx="199" cy="217" r="22" /><circle cx="126" cy="231" r="15" />
                  <circle cx="215" cy="124" r="12" /><circle cx="61" cy="132" r="12" />
                </g>
                <circle cx="150" cy="150" r="137" fill="url(#portal-moon-light)" opacity=".28" filter="url(#portal-lunar-texture)" />
              </g>
              <circle cx="150" cy="150" r="137" fill="none" stroke="#fff2ce" strokeOpacity=".45" />
            </svg>
          </div>
          <div className="portal-orbit portal-orbit-front"><span /></div>
          <span className="portal-satellite portal-satellite-one">✦</span>
          <span className="portal-satellite portal-satellite-two">✧</span>
          <span className="portal-satellite portal-satellite-three">✦</span>
        </div>
        <div className="portal-copy">
          <h1 id="portal-title" className="portal-title">{brand.name}</h1>
          <div className="portal-divider" aria-hidden="true"><span />✧<span /></div>
          <p className="portal-description">{t('Une guidance spirituelle complète pour éclairer votre chemin')}</p>
          <Link to="/#services" className="portal-cta">
            <span>{t('Découvrir nos consultations')}</span><ArrowUpRight size={18} aria-hidden="true" className="shrink-0 rtl:-scale-x-100" />
          </Link>
          <Link to="/contact" className="portal-contact">{t('Consulter un voyant')}</Link>
        </div>
        <Link to="/#services" className="portal-scroll" aria-label={t('Nos Services')}><span aria-hidden="true" /><ArrowDown size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
