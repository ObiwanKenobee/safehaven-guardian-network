
import { useEffect } from 'react';
import { Location } from '@/data/locations';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  location?: Location;
}

/**
 * Custom hook to update document metadata for SEO purposes
 */
export const useSEO = ({ title, description, canonicalUrl, location }: SEOProps) => {
  useEffect(() => {
    // Set page title
    if (title) {
      document.title = title;
    } else if (location) {
      document.title = `Guardian-IO | AI Protection for Women in ${location.city}, ${location.country}`;
    }

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description || 
        location ? 
          `Guardian-IO provides AI-powered security, safe haven directories, and real-time crisis alerts for women and vulnerable individuals in ${location.city}, ${location.country}. Stay safe and protected.` : 
          'Guardian-IO AI Security Network - AI-powered protection for the vulnerable'
      );
    }

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Add structured data if we have location information
    if (location) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": `Guardian-IO ${location.city}`,
        "description": `AI-powered protection services for vulnerable individuals in ${location.city}, ${location.country}`,
        "areaServed": {
          "@type": "City",
          "name": location.city,
          "containedInPlace": {
            "@type": "Country",
            "name": location.country
          }
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": location.country,
          "addressLocality": location.city
        },
        "keywords": location.keywords.join(', ')
      };

      let script = document.querySelector('#guardian-io-structured-data');
      if (script) {
        document.head.removeChild(script);
      }
      
      script = document.createElement('script');
      script.id = 'guardian-io-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up structured data when component unmounts
      const script = document.querySelector('#guardian-io-structured-data');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, canonicalUrl, location]);
};
