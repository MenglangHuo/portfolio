import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.menglanghuo.online';
  const lastModified = new Date();

  const routes = ['', '/skills', '/experience', '/education'];
  const locales = ['en', 'kh'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root entry
  sitemapEntries.push({
    url: baseUrl,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        km: `${baseUrl}/kh`,
      },
    },
  });

  // Localized routes
  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      const priority = route === '' ? 1.0 : 0.8;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            km: `${baseUrl}/kh${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
