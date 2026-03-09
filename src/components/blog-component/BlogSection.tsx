import { useRef, useState, useEffect } from 'react';
import block1 from '../../assets/images/block-1.jpeg';
import block2 from '../../assets/images/block-2.jpeg';
import block3 from '../../assets/images/block-3.avif';
import { getBlogs, type BlogDisplay } from '../../services/blog/blog.service';

const FALLBACK_POSTS: BlogDisplay[] = [
  {
    id: 1,
    title: 'Conducting in-depth research and usability testing',
    slug: '',
    excerpt: 'Conducting in-depth research and usability testing',
    content: '',
    image: block1,
    category: 'MARKETING',
    tags: [],
    readingTime: '5 min read',
    publishedAt: '',
    href: '#blog',
  },
  {
    id: 2,
    title: 'Designing cohesive strategies and visual identities',
    slug: '',
    excerpt: 'Designing cohesive strategies and visual identities',
    content: '',
    image: block2,
    category: 'DESIGN',
    tags: [],
    readingTime: '5 min read',
    publishedAt: '',
    href: '#blog',
  },
  {
    id: 3,
    title: 'Providing expert advice and strategic guidance',
    slug: '',
    excerpt: 'Providing expert advice and strategic guidance',
    content: '',
    image: block3,
    category: 'STRATEGY',
    tags: [],
    readingTime: '5 min read',
    publishedAt: '',
    href: '#blog',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [posts, setPosts] = useState<BlogDisplay[]>([]);

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
    getBlogs()
      .then((data) => {
        console.log("getBlogs response:", data);
        if (Array.isArray(data) && data.length > 0) setPosts(data);
      })
      .catch((err) => {
        console.error("getBlogs error:", err);
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-16 md:py-24 px-6 md:px-8 bg-tertiary"
      aria-labelledby="blog-heading"
    >
      <div
        className="max-w-[1280px] mx-auto section-fade-up"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transitionDelay: inView ? '0.1s' : '0ms',
        }}
      >
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <p className="text-sm font-normal text-primary/70 tracking-wide mb-2 font-sans">
            • Blogs
          </p>
          <h2
            id="blog-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight font-sans"
          >
            Software Insights & Trends
          </h2>
        </header>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {(posts.length > 0 ? posts : FALLBACK_POSTS).map((post, idx) => (
            <div
              key={post.id ?? idx}
              className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_24px_rgba(34,34,34,0.06)] transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={post.image || (idx === 0 ? block1 : idx === 1 ? block2 : block3)}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-medium uppercase tracking-wide">
                    {String(post.category ?? '').toUpperCase()}
                  </span>
                  <span className="text-sm font-normal text-primary/70">{post.readingTime}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-primary leading-snug font-sans">
                  {post.title}
                </h3>
                {post.excerpt && <p className="mt-3 text-sm text-primary/70">{post.excerpt}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
