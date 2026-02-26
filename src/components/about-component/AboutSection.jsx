import { useRef, useState, useEffect } from 'react';
import about1 from '../../assets/images/about-1.jpeg';
import about2 from '../../assets/images/about-2.jpeg';
import curveArrow from '../../assets/icons/curve-right-arrow.png';
import slideDownload from '../../assets/images/slide-about/download.jpeg';
import slideGoldenCream from '../../assets/images/slide-about/golden-cream-yy-f1e0bc.webp';
import slideNN9036 from '../../assets/images/slide-about/NN-9036.webp';
import slideNN9133 from '../../assets/images/slide-about/NN-9133.webp';
import slideNN9218 from '../../assets/images/slide-about/NN-9218.webp';
import slideWW0100 from '../../assets/images/slide-about/WW-0100-1.webp';
import portoImage from '../../assets/images/porto.jpg';

const stat = {
  value: '120%',
  description: 'Average increase in client engagement in the first 6 months',
};

const highlights = [
  'With 4+ years of experience, I specialize in creating intuitive, user-focused designs that solve real-world problems and deliver seamless digital experiences.',
  'I thrive on working closely with clients, blending creativity with strategy to bring their vision to life through thoughtful, impactful design solutions.',
];

const projectCards = [
  { title: 'Website For Squeeze', image: slideDownload, href: '#portfolio' },
  { title: 'Halo Digital Agency website For Squeeze', image: slideGoldenCream, href: '#portfolio' },
  { title: 'Digital Agency website', image: slideNN9036, href: '#portfolio' },
  { title: 'Product Design For Brand', image: slideNN9133, href: '#portfolio' },
  { title: 'Brand & Visual Identity', image: slideNN9218, href: '#portfolio' },
  { title: 'Creative Direction', image: slideWW0100, href: '#portfolio' },
];

const experiencesIntro =
  'Over the past 4+ years, I\'ve had the privilege of working with diverse teams and brands to create meaningful digital experiences. From product design to branding, each project has shaped my approach to solving problems with empathy and clarity.';

const experienceThumbnails = [slideDownload, slideGoldenCream, slideNN9036];

const experiences = [
  {
    company: 'Creative Minds',
    location: 'New York, USA',
    dates: 'February 2022 - Present',
    role: 'Senior Product Designer',
    description: 'Innovated designs',
    tags: ['UI/UX', 'Branding'],
    highlighted: false,
    expandDescription: 'From crafting seamless user experiences to leading strategic product design initiatives, each experience has shaped my approach and strengthened my passion for solving design challenges.',
    thumbnails: experienceThumbnails,
    href: '#portfolio',
  },
  {
    company: 'FutureTech',
    location: 'Berlin, Germany',
    dates: 'February 2022 - Present',
    role: 'Product Designer',
    description: 'Led design initiatives',
    tags: ['Branding', 'UI/UX'],
    highlighted: true,
    expandDescription: 'From crafting seamless user experiences to leading strategic product design initiatives, each experience has shaped my approach and strengthened my passion for solving design challenges.',
    thumbnails: experienceThumbnails,
    href: '#portfolio',
  },
  {
    company: 'Visionary Creations',
    location: 'London, UK',
    dates: 'March 2019 - May 2020',
    role: 'UX Designer',
    description: 'Crafted user experiences',
    tags: ['UX', 'Prototyping'],
    highlighted: true,
    expandDescription: 'From crafting seamless user experiences to leading strategic product design initiatives, each experience has shaped my approach and strengthened my passion for solving design challenges.',
    thumbnails: experienceThumbnails,
    href: '#portfolio',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 px-6 md:px-8 bg-tertiary scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: heading + intro */}
          <div
            className="lg:col-span-4 relative about-fade-up"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(36px)',
              transitionDelay: inView ? '0.1s' : '0ms',
            }}
          >
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6"
            >
              About Me
            </h2>
            <p className="text-base md:text-lg font-light text-primary/90 leading-relaxed max-w-md">
              I specialize in turning complex problems into elegant solutions. My approach blends
              creativity with strategic thinking to deliver designs that not only look great but
              work seamlessly. Ready to start your next project?
            </p>
            {/* Blurred gray curved arrow pointing toward the 120% card */}
            <div className="mt-6 flex justify-start overflow-visible">
              <img
                src={curveArrow}
                alt=""
                className="w-40 md:w-52 h-auto opacity-70 max-md:max-w-[10rem] translate-x-2 md:translate-x-6"
                style={{ filter: 'grayscale(1) blur(6px)' }}
                aria-hidden
              />
            </div>
          </div>

          {/* Center: one card (stat + portrait) – like reference: left-aligned top, centered image, generous padding */}
          <div
            className="lg:col-span-4 about-fade-up"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(36px)',
              transitionDelay: inView ? '0.2s' : '0ms',
            }}
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(34,34,34,0.08)] border border-gray-100">
              <article className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5">
                <div className="flex justify-start mb-4">
                  <span
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-primary/15 text-primary shrink-0"
                    aria-hidden
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2 text-left">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-normal text-primary/80 leading-relaxed text-left">
                  {stat.description}
                </p>
              </article>
              <div className="px-4 pb-6 pt-1 md:px-5 md:pb-8 md:pt-2 bg-white flex items-center justify-center min-h-[260px]">
                <img
                  src={about1}
                  alt=""
                  className="max-w-full max-h-[280px] md:max-h-[300px] w-auto h-auto object-contain object-center grayscale rounded-xl block mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Right: circular portrait + bullet points */}
          <div
            className="lg:col-span-4 flex flex-col gap-6 about-fade-up"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(36px)',
              transitionDelay: inView ? '0.3s' : '0ms',
            }}
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(34,34,34,0.06)] border border-gray-100/80 w-full max-w-[280px] mx-auto lg:mx-0 aspect-square bg-white">
              <img
                src={about2}
                alt=""
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
            <ul className="space-y-4">
              {highlights.map((text, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mt-0.5"
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="text-sm md:text-base font-light text-primary/90 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal scroll: project cards – full width */}
      <div
        className="scrollbar-hide mt-16 md:mt-20 -mx-6 md:-mx-8 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 about-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.4s' : '0ms',
        }}
      >
        <div className="flex gap-6 snap-x snap-mandatory min-w-min px-6 md:px-8">
          {projectCards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-center group"
            >
              <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_rgba(34,34,34,0.06)]">
                <div className="relative aspect-[16/10] bg-gray-100">
                  <img
                    src={card.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="p-4 flex items-center gap-2">
                  <span className="text-sm md:text-base font-medium text-primary truncate flex-1">
                    {card.title}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary/60" aria-hidden>
                    <path d="M7 17L17 7M17 7h-10M17 7v10" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Experiences block – white background */}
      <div
        className="bg-white py-16 md:py-24 px-6 md:px-8 mt-[100px] -mx-6 md:-mx-8 relative about-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.5s' : '0ms',
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header: left = label + title, right = intro + Book A Call */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                <span className="text-sm font-normal text-primary/60 tracking-wide">Experiences</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Explore My Design Journey
              </h3>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-base md:text-lg font-normal text-primary/80 leading-relaxed mb-6">
                {experiencesIntro}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-medium underline underline-offset-4 hover:text-secondary transition-colors w-fit"
              >
                Book A Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17L17 7M17 7h-10M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Experience list with dividers – collapsible */}
          <ul className="border-t border-gray-200">
            {experiences.map((exp, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <li key={i} className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="w-full py-6 md:py-8 text-left flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:opacity-90 transition-opacity cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="md:min-w-[200px] shrink-0">
                      <p className="text-lg md:text-xl font-bold text-primary">
                        {exp.company}, {exp.location}
                      </p>
                      <p className="text-sm font-normal text-primary/60 mt-0.5">{exp.dates}</p>
                    </div>
                    <p className="text-sm md:text-base font-normal text-primary/70 text-center flex-1 order-3 md:order-2">
                      {exp.description}, {exp.role}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-end md:justify-end md:min-w-[140px] shrink-0 order-2 md:order-3 items-center">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            tag === 'UI/UX' || tag === 'Research' || tag === 'UIUX'
                              ? 'bg-primary text-white'
                              : exp.highlighted
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-primary/80'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      <span
                        className={`ml-2 flex items-center justify-center w-8 h-8 rounded-full border border-primary/20 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </button>
                  {/* Expanded content: thumbnails + description + arrow button */}
                  {isExpanded && (
                    <div className="pb-6 md:pb-8 pt-0 border-t border-gray-100">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-start">
                        <div className="flex gap-3 shrink-0">
                          {(exp.thumbnails || experienceThumbnails).slice(0, 3).map((img, j) => (
                            <div key={j} className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <p className="text-sm md:text-base font-normal text-primary/70 leading-relaxed flex-1">
                          {exp.expandDescription}
                        </p>
                        <a
                          href={exp.href || '#portfolio'}
                          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-white shrink-0 hover:scale-105 transition-transform"
                          aria-label="View more"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7h-10M17 7v10" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* About banner: porto.jpg with overlay text and CTA (under collapsible section) */}
          <div className="mt-12 md:mt-16">
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[380px] flex items-center">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${portoImage})` }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]"
                aria-hidden
              />
              <div className="relative z-10 w-full max-w-xl py-12 md:py-16 px-8 md:px-12">
                <p className="text-sm text-white/70 mb-3 font-sans">
                  (Book Your Free Consultation Now!)
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4 font-sans">
                  Let's Bring Your Vision to Life. Get a Free Consultation!
                </h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 font-sans">
                  Take advantage of this offer to discuss your design needs with an experienced UI/UX and product designer.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/40 bg-primary/40 text-white text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-colors font-sans"
                >
                  Let's talk
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17L17 7M17 7h-10M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
