import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function SiteMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const seen = new Set<Element>();
    const discover = () => {
      main.querySelectorAll('h1, h2, article, form, #services a, section > .container > .text-center, blockquote').forEach(element => {
        if (seen.has(element)) return;
        seen.add(element);
        // Above-the-fold content remains immediately readable.
        if (element.getBoundingClientRect().top < window.innerHeight * 0.95) return;
        element.classList.add('motion-reveal');
        observer.observe(element);
      });
    };
    discover();
    const mutations = new MutationObserver(discover);
    mutations.observe(main, { childList: true, subtree: true });
    const animation = main.animate([{ opacity: 0.45, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
    return () => { observer.disconnect(); mutations.disconnect(); animation.cancel(); seen.forEach(element => element.classList.remove('motion-reveal', 'motion-visible')); };
  }, [pathname]);
  return <div className="ambient-lights" aria-hidden="true"><span /><span /><span /></div>;
}
