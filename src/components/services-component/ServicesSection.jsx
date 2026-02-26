const SERVICES = [
  {
    title: 'UI/UX Design',
    description:
      'Creating intuitive and visually engaging interfaces that enhance user experience and drive engagement across web and mobile.',
    icon: 'ui',
  },
  {
    title: 'User Research & Testing',
    description:
      'User research and usability testing to gather insights and validate design decisions.',
    icon: 'research',
  },
  {
    title: 'Product Design',
    description:
      'This includes everything from initial concept development to final design execution.',
    icon: 'product',
  },
  {
    title: 'Design Consultation',
    description:
      'Expert advice and strategic guidance to help you navigate complex design challenges and make informed decisions.',
    icon: 'consultation',
  },
];

function ServiceIcon({ name }) {
  const size = 24;
  const className = 'stroke-current';
  switch (name) {
    case 'ui':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'research':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );
    case 'product':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12l8-4.5" />
          <path d="M12 12v9" />
          <path d="M12 12 4 7.5" />
        </svg>
      );
    case 'consultation':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-24 px-6 md:px-8 bg-tertiary"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <p className="text-sm font-normal text-primary/70 tracking-wide mb-2 font-sans">
            • Services
          </p>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-6 font-sans"
          >
            Design Services Tailored to Your Needs
          </h2>
          <p className="text-base md:text-lg font-normal text-primary/80 leading-relaxed max-w-3xl mx-auto font-sans">
            Explore a range of tailored UI/UX and product design services designed to meet your unique
            needs and goals. From initial research and strategy to wireframing, prototyping, and
            final delivery.
          </p>
        </header>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-white border border-gray-100 p-6 md:p-8 shadow-[0_4px_24px_rgba(34,34,34,0.06)] hover:shadow-[0_8px_32px_rgba(34,34,34,0.08)] transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-6 shrink-0">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-3 font-sans">
                {service.title}
              </h3>
              <p className="text-sm md:text-base font-normal text-primary/80 leading-relaxed font-sans">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
