/**
 * STUDIO CATALOGUE PAGES REGISTRY
 * ==============================================================================
 * 2000x2000 px High-Res Pages from the original WizeTV_studio_catalogue.pdf
 * Rendered with MuPDF official engine for 100% true Adobe sRGB colors
 * ==============================================================================
 */

const SUPABASE_STORAGE_BASE = 'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos';

export const STUDIO_CATALOGUE_PAGES: string[] = Array.from({ length: 30 }, (_, i) =>
  `${SUPABASE_STORAGE_BASE}/images/catalogue-pages/page_${String(i + 1).padStart(2, '0')}.jpg?v=3`
);

export const PODCAST_CAROUSEL_IMAGES: string[] = STUDIO_CATALOGUE_PAGES;

/**
 * Normalizes image paths to ensure spaces and special characters are safe for URLs
 */
export function formatImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  // Split query parameters if present
  const [pathname, query] = url.split('?');
  const parts = pathname.split('/').map(part => {
    if (!part) return '';
    try {
      return encodeURIComponent(decodeURIComponent(part));
    } catch {
      return encodeURIComponent(part);
    }
  });
  const encodedPath = parts.join('/');
  return query ? `${encodedPath}?${query}` : encodedPath;
}
