import { useRef, useState, useEffect } from 'react';
import BottomSheet from '../ui/BottomSheet';
import ImagePreview from '../ui/ImagePreview';
import about1 from '../../assets/images/about-1.jpeg';
import about2 from '../../assets/images/about-2.jpeg';
import curveArrow from '../../assets/icons/curve-right-arrow.png';
import { getAboutMe } from '../../services/about-me/about-me.service';
import { getBanner } from '../../services/banner/banner.service';
import { getSkills, type Skill } from '../../services/skill/skill.service';
import { getExploreJourneys } from '../../services/explore-journey/explore-journey.service';
import { getExperiences, type ExperienceDisplay } from '../../services/experience/experience.service';
import slideDownload from '../../assets/images/slide-about/download.jpeg';
import slideGoldenCream from '../../assets/images/slide-about/golden-cream-yy-f1e0bc.webp';
import slideNN9036 from '../../assets/images/slide-about/NN-9036.webp';
import portoImage from '../../assets/images/porto.jpg';

const statDefault = {
  value: '120%',
  description: 'Average increase in client engagement in the first 6 months',
};

const highlightsDefault = [
  'With 4+ years of experience, I specialize in creating intuitive, user-focused designs that solve real-world problems and deliver seamless digital experiences.',
  'I thrive on working closely with clients, blending creativity with strategy to bring their vision to life through thoughtful, impactful design solutions.',
];

const introDefault =
  'I specialize in turning complex problems into elegant solutions. My approach blends creativity with strategic thinking to deliver designs that not only look great but work seamlessly. Ready to start your next project?';

const experiencesIntro =
  "Over the past 4+ years, I've had the privilege of working with diverse teams and brands to create meaningful digital experiences. From product design to branding, each project has shaped my approach to solving problems with empathy and clarity.";

const experienceThumbnails = [slideDownload, slideGoldenCream, slideNN9036];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [aboutMe, setAboutMe] = useState<{
    statDescription: string;
    intro: string;
    highlights: string[];
    statImage: string;
    portraitImage: string;
  } | null>(null);
  const [banner, setBanner] = useState<{
    title: string;
    subtitle: string;
    description: string;
    image: string;
  } | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [exploreJourney, setExploreJourney] = useState<{ title: string; description: string } | null>(null);
  const [experiences, setExperiences] = useState<ExperienceDisplay[]>([]);

  useEffect(() => {
    getAboutMe().then((data) => {
      if (data) {
        setAboutMe({
          statDescription: data.title,
          intro: data.description,
          highlights: data.subdescription ?? [],
          statImage: data.image,
          portraitImage: data.thumbnail,
        });
      }
    });
    getBanner().then((data) => {
      if (data) {
        setBanner({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          image: data.image,
        });
      }
    });
    getSkills().then(setSkills);
    getExploreJourneys().then((data) => {
      if (data) setExploreJourney({ title: data.title, description: data.description });
    });
    getExperiences().then(setExperiences);
  }, []);

  const stat = {
    value: statDefault.value,
    description: aboutMe?.statDescription ?? statDefault.description,
  };
  const highlights = aboutMe?.highlights?.length ? aboutMe.highlights : highlightsDefault;
  const intro = aboutMe?.intro ?? introDefault;
  const statImageSrc = aboutMe?.statImage ?? about1;
  const portraitImageSrc = aboutMe?.portraitImage ?? about2;
  const bannerImageSrc = banner?.image ?? portoImage;
  const bannerTitle = banner?.title ?? "Let's Bring Your Vision to Life. Get a Free Consultation!";
  const bannerSubtitle = banner?.subtitle ?? '(Book Your Free Consultation Now!)';
  const bannerDescription =
    banner?.description ??
    "Take advantage of this offer to discuss your design needs with an experienced UI/UX and product designer.";

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
            className="lg:col-span-4 relative about-fade-up overflow-visible"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(36px)',
              transitionDelay: inView ? '0.1s' : '0ms',
            }}
          >
            {/* Curved arrow as background for text */}
            <div
              className="absolute -inset-4 md:inset-0 pointer-events-none"
              aria-hidden
              style={{
                backgroundImage: `url(${curveArrow})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left 0 bottom 0',
                backgroundSize: 'min(18rem, 50vw) auto',
                filter: 'grayscale(1) blur(6px)',
                opacity: 0.5,
              }}
            />
            <div className="relative z-10">
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6"
              >
                About Me
              </h2>
              <p className="text-base md:text-lg font-light text-primary/90 leading-relaxed max-w-md">
                {intro}
              </p>
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
                  src={statImageSrc}
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
                src={portraitImageSrc}
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

      {/* Skills heading (above scroll) – style like Services/Portfolio */}
      <header className="mt-16 md:mt-20 mb-10 md:mb-14 text-center">
        <p className="text-sm font-normal text-primary/70 tracking-wide font-sans">
          • Skills
        </p>
      </header>

      {/* Horizontal scroll: skills – full width */}
      <div
        className="scrollbar-hide -mx-6 md:-mx-8 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 about-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.4s' : '0ms',
        }}
      >
        <div className="flex gap-6 snap-x snap-mandatory min-w-min px-6 md:px-8">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedSkill(skill)}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center group text-left"
              >
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_rgba(34,34,34,0.06)]">
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <img
                      src={skill.image}
                      alt={skill.skill_name}
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
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
                      {skill.skill_name}
                    </span>
                    {skill.category && (
                      <span className="shrink-0 text-xs font-medium text-primary/70 px-2 py-0.5 rounded-full bg-gray-100">
                        {skill.category.name}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-primary/60 text-sm py-8 px-6 font-sans">No skills to display yet.</p>
          )}
        </div>

        <BottomSheet
          open={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={selectedSkill?.skill_name ?? ''}
        >
          {selectedSkill && (
            <>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full sm:w-[220px] md:w-[280px]">
                <button
                  type="button"
                  onClick={() => setPreviewImage(selectedSkill.image)}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 block w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                  <img
                    src={selectedSkill.image}
                    alt={selectedSkill.skill_name}
                    className="w-full h-full object-contain object-center"
                  />
                </button>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedSkill.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-primary/80">
                      {selectedSkill.category.name}
                    </span>
                  )}
                  {selectedSkill.level && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white capitalize">
                      {selectedSkill.level}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {selectedSkill.description && selectedSkill.description.length > 0 ? (
                  <div>
                    <p className="text-sm font-medium text-primary mb-3">Capabilities</p>
                    <ul className="space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
                      {selectedSkill.description.map((item, i) => (
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
                  <p className="text-sm text-primary/60">No capabilities listed.</p>
                )}
              </div>
              {selectedSkill.subimage && (
                <button
                  type="button"
                  onClick={() => setPreviewImage(selectedSkill.subimage!)}
                  className="flex-shrink-0 w-full sm:w-[220px] md:w-[280px] self-stretch cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 text-left"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={selectedSkill.subimage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-center"
                    />
                  </div>
                </button>
              )}
            </div>
            {selectedSkill.thumbnail && selectedSkill.thumbnail.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-primary mb-3">Gallery</p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {selectedSkill.thumbnail.map((src, i) => (
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
          {/* Header: left = label + title, right = intro + Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                <span className="text-sm font-normal text-primary/60 tracking-wide">Experiences</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                {exploreJourney?.title ?? 'Explore My Design Journey'}
              </h3>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-base md:text-lg font-normal text-primary/80 leading-relaxed mb-6">
                {exploreJourney?.description ?? experiencesIntro}
              </p>
              <a
                href="https://t.me/sokhankheav"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium underline underline-offset-4 hover:text-secondary transition-colors w-fit"
              >
                Contact
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17L17 7M17 7h-10M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Experience list with dividers – collapsible */}
          <ul className="border-t border-gray-200">
            {experiences.length > 0 ? (
              experiences.map((exp, i) => {
                const isExpanded = expandedIndex === i;
                const thumbnails = exp.thumbnails.length > 0 ? exp.thumbnails : experienceThumbnails;
                return (
                  <li key={exp.id} className="border-b border-gray-200">
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
                        {exp.role}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-end md:justify-end md:min-w-[140px] shrink-0 order-2 md:order-3 items-center">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              exp.tags.indexOf(tag) === 0 || exp.highlighted
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
                    {/* Expanded content: thumbnails grid + description */}
                    {isExpanded && (
                      <div className="pb-6 md:pb-8 pt-6 md:pt-8 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-10 md:items-start">
                          <div className="grid grid-cols-4 gap-3 shrink-0">
                            {thumbnails.map((img, j) => (
                              <button
                                key={j}
                                type="button"
                                onClick={() => setPreviewImage(img)}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                              >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                          <div className="text-sm md:text-base font-normal text-primary/70 leading-relaxed flex-1 space-y-4">
                            {String(exp.description)
                              .split(/\n{2,}|\r\n/)
                              .filter(Boolean)
                              .map((para, idx) => (
                                <p key={idx}>{para}</p>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="py-12 text-center text-primary/60 text-sm font-sans">No experiences to display yet.</li>
            )}
          </ul>

          {/* About banner: fetched image with overlay text and CTA (under collapsible section) */}
          <div className="mt-12 md:mt-16">
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[380px] flex items-center">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bannerImageSrc})` }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]"
                aria-hidden
              />
              <div className="relative z-10 w-full max-w-xl py-12 md:py-16 px-8 md:px-12">
                <p className="text-sm text-white/70 mb-3 font-sans">
                  {bannerSubtitle}
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4 font-sans">
                  {bannerTitle}
                </h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 font-sans">
                  {bannerDescription}
                </p>
                <a
                  href="https://t.me/sokhankheav"
                  target="_blank"
                  rel="noopener noreferrer"
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
