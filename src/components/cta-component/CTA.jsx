export default function CTA() {
  return (
    <section
      className="bg-tertiary py-16 md:py-20 px-6 md:px-8 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[640px] mx-auto">
        <h2
          id="cta-heading"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 font-sans"
        >
          Got a Vision? Let's Bring It to Life!
        </h2>
        <p className="text-base md:text-lg font-normal text-primary/80 leading-relaxed mb-8 font-sans">
          I'm always excited to collaborate on new and innovative projects. Whether you're starting
          from scratch or refining an existing idea.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-primary font-medium underline underline-offset-4 decoration-2 hover:text-secondary transition-colors font-sans"
        >
          Book A Call
          <svg
            width="18"
            height="18"
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
    </section>
  );
}
