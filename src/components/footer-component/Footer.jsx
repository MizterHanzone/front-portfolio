const footerNavLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Me', href: '#about', active: false },
  { label: 'Portfolio', href: '#portfolio', active: false },
  { label: 'Services', href: '#services', active: false },
  { label: 'Blog', href: '#blog', active: false },
];

import { Link } from 'react-router-dom';

const email = 'hello@dnova.com';

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-primary text-white overflow-hidden font-sans"
      aria-label="Site footer"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 py-14 md:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <nav className="flex flex-wrap items-center gap-1 sm:gap-6" aria-label="Footer navigation">
          {footerNavLinks.map((link) => {
            const isActive = link.active;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-normal transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/95 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
          <Link
            to="/cv"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/40 text-white text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-colors shrink-0"
          >
            View CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </Link>
          <a
            href={`mailto:${email}`}
            className="text-xl md:text-2xl font-light tracking-tight text-white hover:opacity-90 transition-opacity shrink-0 font-sans"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
