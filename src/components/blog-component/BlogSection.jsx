import block1 from '../../assets/images/block-1.jpeg';
import block2 from '../../assets/images/block-2.jpeg';
import block3 from '../../assets/images/block-3.avif';

const BLOG_POSTS = [
  {
    id: 1,
    image: block1,
    category: 'MARKETING',
    readTime: '5 min read',
    title: 'Conducting in-depth research and usability testing',
    href: '#blog',
  },
  {
    id: 2,
    image: block2,
    category: 'DESIGN',
    readTime: '5 min read',
    title: 'Designing cohesive strategies and visual identities',
    href: '#blog',
  },
  {
    id: 3,
    image: block3,
    category: 'STRATEGY',
    readTime: '5 min read',
    title: 'Providing expert advice and strategic guidance',
    href: '#blog',
  },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="relative py-16 md:py-24 px-6 md:px-8 bg-tertiary"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <p className="text-sm font-normal text-primary/70 tracking-wide mb-2 font-sans">
            • Blogs
          </p>
          <h2
            id="blog-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight font-sans"
          >
            Design Insights & Trends
          </h2>
        </header>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BLOG_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.href}
              className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_24px_rgba(34,34,34,0.06)] hover:shadow-[0_8px_32px_rgba(34,34,34,0.08)] transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-medium uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-sm font-normal text-primary/70">{post.readTime}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-primary leading-snug font-sans">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
