export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'حراج إنڤست',
    alternateName: 'Haraj Invest',
    url: 'https://haraj-invest.com',
    description: 'سوق للفرص التجارية والمشاريع',
    inLanguage: 'ar-SA',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://haraj-invest.com/marketplace?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'حراج إنڤست',
      url: 'https://haraj-invest.com'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
