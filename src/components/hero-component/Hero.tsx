import { useRef, useState, useEffect } from 'react';
import heroImage from '../../assets/images/about-1.jpeg';
import { getProfileCached, type Profile } from '../../services/profile/profile.service';
import { getProjectSummary, type ProjectSummary } from '../../services/portfolio/portfolio.service';

const defaultStats = [
  { value: '+200', label: 'Project completed' },
  { value: '+50', label: 'Startup raised' },
];

const defaultName = 'Kheav Sokhan';
const defaultRole = 'Software Engineer';
const defaultYear = '2025';

function yearFromDate(dateStr: string | undefined): string {
  if (!dateStr) return defaultYear;
  const year = dateStr.split('-')[0];
  return year || defaultYear;
}

function statsFromSummary(summary: ProjectSummary | null) {
  if (!summary) return defaultStats;
  return [
    { value: `+${summary.completed}`, label: 'Project completed' },
    { value: `+${summary.in_progress}`, label: 'Startup raised' },
  ];
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projectSummary, setProjectSummary] = useState<ProjectSummary | null>(null);

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

  useEffect(() => {
    getProfileCached()
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  useEffect(() => {
    getProjectSummary()
      .then((data) => setProjectSummary(data))
      .catch(() => setProjectSummary(null));
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24 px-8 pb-16 flex flex-col max-w-[1280px] mx-auto">
      {/* Vertical left: year, tall line, role (all vertical) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 max-md:hidden flex flex-col items-center" aria-hidden>
        <div className="text-sm font-light text-secondary [writing-mode:vertical-rl] [letter-spacing:0.2em] -rotate-180">
          {profile ? yearFromDate(profile.start_date) : defaultYear}
        </div>

        <div className="h-40 w-px bg-secondary/30 my-4" />

        <div className="text-sm font-light text-secondary [writing-mode:vertical-rl] [letter-spacing:0.2em] -rotate-180">
          {profile?.description || defaultRole}
        </div>
      </div>

      <div
        className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center section-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.1s' : '0ms',
        }}
      >
        <div className="max-w-[32rem] max-md:max-w-none max-md:text-center md:pl-[100px]">
          <div className="flex gap-12 mb-8 max-md:justify-center">
            {statsFromSummary(projectSummary).map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-semibold text-primary tracking-tight">
                  {value}
                </span>
                <span className="text-[0.8125rem] font-light text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <h1 className="m-0 mb-2 text-primary font-light leading-[0.95] tracking-tight text-[clamp(5rem,14vw,9.5rem)]">
            Hello
          </h1>
          <p className="m-0 text-lg font-light text-secondary">
            — I'm {profile ? `${profile.first_name} ${profile.last_name}` : defaultName}, {profile?.description || defaultRole}
          </p>
        </div>

        <div className="relative aspect-[3/4] max-h-[min(75vh,32rem)] md:justify-self-end max-md:mx-auto max-md:max-h-[50vh] overflow-hidden bg-secondary">
          <img
            key={profile?.photo || 'default'}
            src={profile?.photo || heroImage}
            alt={profile ? `${profile.first_name} ${profile.last_name}` : 'Portrait'}
            className="w-full h-full object-cover grayscale"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent via-60% to-tertiary"
            aria-hidden
          />
        </div>
      </div>

      <a
        href="#content"
        className="inline-flex items-center gap-2 self-start mt-auto py-2 text-sm font-light text-secondary transition-colors hover:text-primary"
      >
        <span>Scroll down</span>
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
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
