import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogBySlug, type BlogDisplay } from '../services/blog/blog.service';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogDisplay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getBlogBySlug(slug)
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-tertiary font-sans flex items-center justify-center">
        <p className="text-primary/70">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-tertiary font-sans flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-primary/80 text-center">Post not found.</p>
        <Link
          to="/"
          className="text-primary font-medium underline underline-offset-4 hover:text-secondary"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tertiary font-sans">
      <div className="max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <article>
          {post.image && (
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10] mb-8">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-medium uppercase tracking-wide">
              {post.category || 'Blog'}
            </span>
            {post.readingTime && (
              <span className="text-sm text-primary/70">{post.readingTime}</span>
            )}
            {post.publishedAt && (
              <span className="text-sm text-primary/70">{post.publishedAt}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-primary/80 leading-relaxed mb-8">{post.excerpt}</p>
          )}
          <div className="prose prose-primary max-w-none text-primary/90 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}
