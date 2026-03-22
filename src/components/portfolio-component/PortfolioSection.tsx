import { useRef, useState, useEffect } from 'react';
import slideDownload from '../../assets/images/slide-about/download.jpeg';
import slideGoldenCream from '../../assets/images/slide-about/golden-cream-yy-f1e0bc.webp';
import slideNN9036 from '../../assets/images/slide-about/NN-9036.webp';
import slideNN9133 from '../../assets/images/slide-about/NN-9133.webp';
import slideNN9218 from '../../assets/images/slide-about/NN-9218.webp';
import slideWW0100 from '../../assets/images/slide-about/WW-0100-1.webp';
import BottomSheet from '../ui/BottomSheet';
import ImagePreview from '../ui/ImagePreview';
import { getPortfolios, type PortfolioDisplay } from '../../services/portfolio/portfolio.service';
// Use an existing local image as placeholder to avoid missing file errors.
const placeholder = slideDownload;

interface PortfolioItem {
  id: number;
  image: string;
  category: string;
  title: string | null;
  subtitle: string | null;
  href: string;
  featured: boolean;
}

/** Label for external project links based on destination. */
function portfolioLinkLabel(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('play.google.com/store')) return 'Play store';
  if (u.includes('apps.apple.com') || u.includes('itunes.apple.com')) {
    return 'App store';
  }
  return 'View site';
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, image: slideDownload, category: 'Brand Identity', title: null, subtitle: null, href: '#', featured: false },
  { id: 2, image: slideGoldenCream, category: 'Webflow Development', title: 'Website', subtitle: 'halodigital.xyz', href: '#', featured: true },
  { id: 3, image: slideNN9036, category: 'Brand Identity', title: null, subtitle: null, href: '#', featured: false },
  { id: 4, image: slideNN9133, category: 'E-commerce', title: null, subtitle: null, href: '#', featured: false },
  { id: 5, image: slideNN9218, category: 'SAAS UI', title: null, subtitle: null, href: '#', featured: false },
  { id: 6, image: slideWW0100, category: 'Others', title: null, subtitle: null, href: '#', featured: false },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState<PortfolioDisplay[]>([]);
  const [selected, setSelected] = useState<PortfolioDisplay | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  useEffect(() => {
    getPortfolios().then((data) => {
      if (Array.isArray(data) && data.length > 0) setItems(data);
    });
  }, []);

  const source = items.length > 0 ? items : PORTFOLIO_ITEMS;
  const filteredItems =
    activeFilter === 'All' ? source : source.filter((item) => item.category === activeFilter);

  // Dynamic categories from data: "All" + unique category names
  const categoryFilters = [
    'All',
    ...Array.from(new Set(source.map((item) => item.category).filter(Boolean))),
  ];

  function getCardImage(item: any, idx: number) {
    // prefer explicit image
    if (item.image) return item.image;
    // then first thumbnail
    if (item.thumbnails && item.thumbnails.length > 0) return item.thumbnails[0];
    // fallback to static assets by index
    if (idx === 0) return slideDownload;
    if (idx === 1) return slideGoldenCream;
    if (idx === 2) return slideNN9036;
    if (idx === 3) return slideNN9133;
    if (idx === 4) return slideNN9218;
    if (idx === 5) return slideWW0100;
    return placeholder;
  }

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
            <span className="block">Exploring My Portfolio</span>
            <span className="block">Project Showcase</span>
          </h2>
        </header>

        {/* Filter tabs – dynamic from API categories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
          {categoryFilters.map((filter) => {
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
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setSelected(
                  // cast to PortfolioDisplay if fallback items are used
                  (item as unknown) as PortfolioDisplay
                )
              }
              className="group group/card block rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),0_20px_50px_rgba(0,0,0,0.06)] hover:border-gray-300/80 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={getCardImage(item as any, idx)}
                  alt={(item as any).title || (item as any).category || 'Portfolio item'}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = placeholder;
                  }}
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
                  <span>{(item as any).title || (item as any).category}</span>
                  <span>{(item as any).subtitle || 'View'}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-primary/60 py-12 font-sans">No projects in this category yet.</p>
        )}
        <BottomSheet open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
          {selected && (
            <>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 w-full sm:w-[220px] md:w-[280px]">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(selected.image || selected.thumbnails?.[0])}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 block w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                  >
                    <img
                      src={selected.image || selected.thumbnails?.[0] || placeholder}
                      alt={selected.title}
                      className="w-full h-full object-contain object-center"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = placeholder;
                      }}
                    />
                  </button>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selected.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-primary/80">
                        {selected.category}
                      </span>
                    )}
                    {selected.status && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white capitalize">
                        {selected.status}
                      </span>
                    )}
                    {selected.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {selected.projectName && selected.projectName !== selected.title && (
                    <p className="text-sm font-medium text-primary/70 mb-3">{selected.projectName}</p>
                  )}
                  {selected.description && selected.description.length > 0 ? (
                    <div>
                      <p className="text-sm font-medium text-primary mb-3">Description</p>
                      <ul className="space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
                        {selected.description
                          .split(/\n+/)
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-primary/80 leading-relaxed">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5" aria-hidden>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-primary/60">No description.</p>
                  )}
                  {(selected.projectUrls.length > 0 || selected.githubUrl) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-primary mb-3">Links</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.projectUrls.map((u, i) => (
                          <a
                            key={`${u}-${i}`}
                            href={u}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-primary/80 hover:bg-gray-200 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14L21 3" />
                            </svg>
                            {portfolioLinkLabel(u)}
                          </a>
                        ))}
                        {selected.githubUrl && (
                          <a
                            href={selected.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-primary/80 hover:bg-gray-200 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {selected.thumbnails && selected.thumbnails.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-primary mb-3">Gallery</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {selected.thumbnails.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPreviewImage(src)}
                        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1"
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </BottomSheet>
        <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
      </div>
    </section>
  );
}
