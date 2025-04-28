
import { locations } from "@/data/locations";

/**
 * Generate a sitemap XML string for SEO
 * @param baseUrl The base URL of the website
 * @returns XML sitemap string
 */
export const generateSitemap = (baseUrl: string = "https://guardian-io.org") => {
  const today = new Date().toISOString().split('T')[0];
  
  // Start with the XML declaration and urlset opening tag
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add the homepage
  sitemap += `
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Add the locations index page
  sitemap += `
  <url>
    <loc>${baseUrl}/locations</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add each location detail page
  locations.forEach(location => {
    sitemap += `
  <url>
    <loc>${baseUrl}/locations/${location.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Close the urlset tag
  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Generate robots.txt content
 * @param baseUrl The base URL of the website
 * @returns robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string = "https://guardian-io.org") => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
};
