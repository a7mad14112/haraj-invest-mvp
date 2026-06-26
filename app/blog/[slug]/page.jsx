import Layout from '../../../components/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatPostDate } from '../../../lib/blogPosts';
import ArticleDiscussion from '../../../components/ArticleDiscussion';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'موضوع غير موجود — حراج إنڤست' };
  }
  return {
    title: `${post.title} — حراج إنڤست`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

function ContentBlock({ block }) {
  if (block.type === 'heading') {
    return <h2>{block.text}</h2>;
  }
  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return <blockquote>{block.text}</blockquote>;
  }
  return <p>{block.text}</p>;
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <Layout>
      <main className="page blog-post-v134">
        <div className="wrap wrap-narrow-v134">
          <Link className="blog-back-v134" href="/blog">← العودة إلى المنتدى</Link>

          <article className="blog-article-v134">
            <div className="blog-card-meta-v134">
              <span className="blog-card-cat-v134">{post.category}</span>
              <span className="blog-card-dot-v134">•</span>
              <span>{formatPostDate(post.date)}</span>
              <span className="blog-card-dot-v134">•</span>
              <span>{post.readingMinutes} دقائق قراءة</span>
            </div>

            <h1>{post.title}</h1>
            <p className="blog-article-excerpt-v134">{post.excerpt}</p>

            <div className="blog-article-body-v134">
              {post.content.map((block, i) => (
                <ContentBlock block={block} key={i} />
              ))}
            </div>

            <div className="blog-article-disclaimer-v134">
              هذه المقالة لأغراض إثرائية وتعريفية فقط، وليست استشارة مالية أو قانونية أو شرعية.
              حراج إنڤست منصة لتنظيم عرض الفرص والتواصل الأولي.
            </div>
          </article>

          <ArticleDiscussion postSlug={post.slug} postTitle={post.title} />

          {related.length > 0 && (
            <section className="blog-related-v134">
              <h3>مقالات ونقاشات ذات صلة</h3>
              <div className="blog-related-grid-v134">
                {related.map((p) => (
                  <Link className="blog-card-v134" href={`/blog/${p.slug}`} key={p.slug}>
                    <span className="blog-card-cat-v134">{p.category}</span>
                    <h2>{p.title}</h2>
                    <span className="blog-card-more-v134">اقرأ المقال ←</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
