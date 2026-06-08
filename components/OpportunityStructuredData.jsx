export default function OpportunityStructuredData({ opportunity }) {
  if (!opportunity?.slug) return null;

  const baseUrl = 'https://haraj-invest.com';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: opportunity.title,
    description: opportunity.summary || opportunity.description || 'فرصة تجارية معروضة في حراج إنڤست.',
    url: `${baseUrl}/opportunity/${opportunity.slug}`,
    category: opportunity.sector || 'Business Opportunity',
    areaServed: opportunity.city || 'Saudi Arabia',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'SAR',
      description: opportunity.value || opportunity.asking_value || 'غير معلن'
    },
    seller: {
      '@type': 'Organization',
      name: 'حراج إنڤست',
      url: baseUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
