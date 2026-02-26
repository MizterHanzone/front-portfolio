import { useRef, useState, useEffect } from 'react';
import slideDownload from '../../assets/images/slide-about/download.jpeg';
import slideGoldenCream from '../../assets/images/slide-about/golden-cream-yy-f1e0bc.webp';
import slideNN9036 from '../../assets/images/slide-about/NN-9036.webp';
import slideNN9133 from '../../assets/images/slide-about/NN-9133.webp';
import slideNN9218 from '../../assets/images/slide-about/NN-9218.webp';
import slideWW0100 from '../../assets/images/slide-about/WW-0100-1.webp';

const FILTERS = [
  'All',
  'Webflow Development',
  'SAAS UI',
  'Brand Identity',
  'E-commerce',
  'Mobile App',
  'Others',
];

const PORTFOLIO_ITEMS = [
  { id: 1, image: slideDownload, category: 'Brand Identity', title: null, subtitle: null, href: '#', featured: false },
  { id: 2, image: slideGoldenCream, category: 'Webflow Development', title: 'Website', subtitle: 'halodigital.xyz', href: '#', featured: true },
  { id: 3, image: slideNN9036, category: 'Brand Identity', title: null, subtitle: null, href: '#', featured: false },
  { id: 4, image: slideNN9133, category: 'E-commerce', title: null, subtitle: null, href: '#', featured: false },
  { id: 5, image: slideNN9218, category: 'SAAS UI', title: null, subtitle: null, href: '#', featured: false },
  { id: 6, image: slideWW0100, category: 'Others', title: null, subtitle: null, href: '#', featured: false },
];

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0, rootMargin: '50px 0px 50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredItems =
    activeFilter === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative -mt-[50px] pt-4 md:pt-6 pb-16 md:pb-24 px-6 md:px-8 bg-tertiary overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Subtle right-edge gradient */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-60"
        aria-hidden
        style={{
          background: 'linear-gradient(to left, rgba(196, 220, 200, 0.15), rgba(220, 200, 220, 0.08))',
        }}
      />
      <div
        className="relative max-w-[1280px] mx-auto section-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transitionDelay: inView ? '0.1s' : '0ms',
        }}
      >
        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <p className="text-sm font-normal text-primary/70 tracking-wide mb-2 font-sans">
            • Portfolio
          </p>
          <h2
            id="portfolio-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight font-sans"
          >
            <span className="block">Exploring My Design Portfolio</span>
            <span className="block">Creative Solutions</span>
          </h2>
        </header>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors font-sans ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group group/card block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_24px_rgba(34,34,34,0.06)] hover:shadow-[0_8px_32px_rgba(34,34,34,0.1)] transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title || item.category}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                />
                {/* Hover overlay: button + text (all cards) */}
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c4a84a] text-white shadow-lg group-hover/card:scale-110 transition-transform duration-300">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </span>
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent flex justify-between items-end text-white text-sm font-medium opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <span>{item.title || item.category}</span>
                  <span>{item.subtitle || 'View'}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-primary/60 py-12 font-sans">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
