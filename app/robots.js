export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin']
    },
    sitemap: 'https://haraj-invest.com/sitemap.xml',
    host: 'https://haraj-invest.com'
  };
}
