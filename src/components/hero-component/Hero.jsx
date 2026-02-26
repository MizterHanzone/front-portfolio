import heroImage from '../../assets/Hero.jpg';

const stats = [
  { value: '+200', label: 'Project completed' },
  { value: '+50', label: 'Startup raised' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen py-24 px-8 pb-16 flex flex-col max-w-[1280px] mx-auto">
      {/* Vertical left: 2024, tall line, Product designer (all vertical) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 max-md:hidden flex flex-col items-center" aria-hidden>
        <div className="text-sm font-light text-secondary [writing-mode:vertical-rl] [letter-spacing:0.2em] -rotate-180">
          2025
        </div>

        <div className="h-40 w-px bg-secondary/30 my-4" />

        <div className="text-sm font-light text-secondary [writing-mode:vertical-rl] [letter-spacing:0.2em] -rotate-180">
          Software Engineer
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="max-w-[32rem] max-md:max-w-none max-md:text-center md:pl-[100px]">
          <div className="flex gap-12 mb-8 max-md:justify-center">
            {stats.map(({ value, label }) => (
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
            — It's Kheav Sokhan, Software Engineer
          </p>
        </div>

        <div className="relative aspect-[3/4] max-h-[min(75vh,32rem)] md:justify-self-end max-md:mx-auto max-md:max-h-[50vh] overflow-hidden bg-secondary">
          <img
            src={heroImage}
            alt="D.Nows"
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

