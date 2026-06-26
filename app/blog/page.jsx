import Layout from '../../components/Layout';
import Link from 'next/link';
import { getAllPosts, formatPostDate } from '../../lib/blogPosts';

export const metadata = {
  title: 'المدونة — حراج إنڤست',
  description:
    'مقالات إثرائية حول ريادة الأعمال، التمويل، وعرض الفرص التجارية — من حراج إنڤست.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Layout>
      <main className="page blog-page-v134">
        <div className="wrap">
          <section className="blog-hero-v134">
            <span className="eyebrow">المدونة</span>
            <h1>مقالات إثرائية حول الفرص والتمويل</h1>
            <p>
              محتوى مختصر وعملي يساعد أصحاب المشاريع والمهتمين على فهم أوضح
              لعرض الفرص، التمويل، وبدء التواصل.
            </p>
          </section>

          <section className="blog-list-v134">
            {posts.map((post) => (
              <Link className="blog-card-v134" href={`/blog/${post.slug}`} key={post.slug}>
                <div className="blog-card-meta-v134">
                  <span className="blog-card-cat-v134">{post.category}</span>
                  <span className="blog-card-dot-v134">•</span>
                  <span>{formatPostDate(post.date)}</span>
                  <span className="blog-card-dot-v134">•</span>
                  <span>{post.readingMinutes} دقائق قراءة</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-card-more-v134">اقرأ المقال ←</span>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
