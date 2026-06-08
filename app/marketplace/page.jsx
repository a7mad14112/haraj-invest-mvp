import MarketplaceClient from './MarketplaceClient';
import Layout from '../../components/Layout';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'سوق الفرص — حراج إنڤست',
  description: 'استعرض الفرص التجارية والمشاريع المنظمة في حراج إنڤست.',
  alternates: {
    canonical: '/marketplace'
  },
  openGraph: {
    title: 'سوق الفرص — حراج إنڤست',
    description: 'استعرض الفرص التجارية والمشاريع المنظمة في حراج إنڤست.',
    url: '/marketplace',
    images: ['/og-image.jpg']
  }
};

export default function MarketplacePage() {
  return (
    <Layout>
      <MarketplaceClient />
    </Layout>
  );
}
