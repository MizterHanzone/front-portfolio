import { useRef, useState, useEffect } from 'react';
import ContactButtons from '../contact-buttons/ContactButtons';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      id="contact"
      className="bg-tertiary py-16 md:py-20 px-6 md:px-8 text-center scroll-mt-20"
      aria-labelledby="cta-heading"
    >
      <div
        className="max-w-[640px] mx-auto section-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.1s' : '0ms',
        }}
      >
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
        <ContactButtons className="justify-center" />
      </div>
    </section>
  );
}
