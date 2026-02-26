import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import foxLogo from '../../assets/icons/fox.png';

const SCROLL_THRESHOLD = 12;

const navLinks = [
  { id: 'about', label: 'About Me', href: '#about' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'blog', label: 'Blog', href: '#blog' },
];

function Icon({ name }) {
  const size = 18
  switch (name) {
    case 'About Me':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Portfolio':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Services':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.2 6.2L8.6 8.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.2 17.8L8.6 15.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Blog':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="4" y="8" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Header() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    let lastY = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY ?? window.pageYOffset;
        const delta = y - lastY;
        if (Math.abs(delta) >= SCROLL_THRESHOLD) {
          if (delta > 0) {
            setHeaderVisible(false);
            setNavbarVisible(true);
          } else {
            setHeaderVisible(true);
            setNavbarVisible(false);
          }
          lastY = y;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fixedUI = (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-[100] bg-transparent transition-transform duration-300 ease-out ${!headerVisible ? 'site-header--hidden' : ''}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 py-1.5 md:px-8 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/" className="flex items-center shrink-0" aria-label="Home">
              <img src={foxLogo} alt="Logo" className="h-5 w-auto md:h-8" />
            </a>
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[0.9375rem] font-light text-primary hover:text-secondary"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <a
            href="#book-a-call"
            className="inline-flex items-center gap-1.5 py-1 px-3 md:py-2 md:px-4 text-[0.8125rem] md:text-[0.9375rem] font-medium text-white bg-primary rounded-full shadow-sm transition-transform hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <span>Book A Call</span>
            <svg
              className="shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17L17 7M17 7h-10M17 7v10" />
            </svg>
          </a>
        </div>
      </header>

      <nav
        className={`bottom-nav fixed bottom-0 left-0 right-0 z-[60] md:hidden flex items-center justify-center bg-transparent transition-transform duration-300 ease-out ${!navbarVisible ? 'bottom-nav--hidden' : ''}`}
        aria-label="Bottom navigation"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-4 w-full h-12 items-center px-1 gap-0">
          {navLinks.map(({ id, label, href }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="flex flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-light text-primary hover:text-secondary touch-manipulation min-w-0"
            >
              <span className="flex items-center justify-center w-5 h-5 shrink-0" aria-hidden>
                <Icon name={label} />
              </span>
              <span className="truncate max-w-[4rem] leading-tight">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(fixedUI, document.body)
    : fixedUI;
}
