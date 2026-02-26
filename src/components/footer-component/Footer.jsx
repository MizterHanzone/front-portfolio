const footerNavLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Me', href: '#about', active: false },
  { label: 'Portfolio', href: '#portfolio', active: false },
  { label: 'Services', href: '#services', active: false },
  { label: 'Blog', href: '#blog', active: false },
];

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
        <a
          href={`mailto:${email}`}
          className="text-xl md:text-2xl font-light tracking-tight text-white hover:opacity-90 transition-opacity text-right shrink-0 font-sans"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
