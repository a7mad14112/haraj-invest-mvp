const baseUrl = 'https://haraj-invest.com';

const routes = [
  '',
  '/marketplace',
  '/opportunity/cafe-riyadh',
  '/submit-project',
  '/contact',
  '/nda-request',
  '/how-it-works',
  '/verification',
  '/faq',
  '/blog',
  '/saved',
  '/account',
  '/login',
  '/signup',
  '/privacy',
  '/terms',
    '/commission',
  '/disclaimer'
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/marketplace' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/marketplace' ? 0.9 : 0.7
  }));
}
