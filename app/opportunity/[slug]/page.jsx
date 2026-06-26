import OpportunityDetailClient from './OpportunityDetailClient';
import Layout from '../../../components/Layout';
import { getSupabase } from '../../../lib/supabaseClient';
import { fallbackOpportunities, normalizeOpportunity } from '../../../lib/opportunityFallback';

export const dynamic = 'force-dynamic';

// Resolve an opportunity by slug for metadata: try Supabase, then static fallback.
async function resolveOpportunity(slug) {
  if (!slug) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (!error && data) return normalizeOpportunity(data);
  } catch {
    // fall through to static fallback
  }
  const local = fallbackOpportunities.find((o) => o.slug === slug || o.id === slug);
  return local ? normalizeOpportunity(local) : null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const item = await resolveOpportunity(slug);

  if (!item) {
    return {
      title: 'فرصة غير موجودة — حراج إنڤست',
      description: 'لم يتم العثور على الفرصة المطلوبة في حراج إنڤست.'
    };
  }

  const title = `${item.title} — حراج إنڤست`;
  const description = item.summary || item.description || `فرصة تجارية في ${item.city || 'السعودية'} ضمن قطاع ${item.sector || 'الأعمال'}.`;
  const url = `/opportunity/${item.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'حراج إنڤست',
      images: ['/og-image.jpg']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg']
    }
  };
}

export default async function OpportunityDetailPage({ params }) {
  const resolvedParams = await params;
  return (
    <Layout>
      <OpportunityDetailClient slug={resolvedParams?.slug} />
    </Layout>
  );
}
