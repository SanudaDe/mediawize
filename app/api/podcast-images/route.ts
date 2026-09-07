import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { STUDIO_CATALOGUE_PAGES } from '@/lib/podcastImages';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cataloguePagesDir = path.join(process.cwd(), 'public', 'images', 'catalogue-pages');

    if (fs.existsSync(cataloguePagesDir)) {
      const validExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
      const files = fs.readdirSync(cataloguePagesDir);

      const foundImages = files
        .filter((file) => validExtensions.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .map((file) => `/images/catalogue-pages/${file}?v=3`);

      if (foundImages.length > 0) {
        return NextResponse.json({
          images: foundImages,
        });
      }
    }

    return NextResponse.json({
      images: STUDIO_CATALOGUE_PAGES,
    });
  } catch (error) {
    console.error('Failed to read catalogue pages directory:', error);
    return NextResponse.json({
      images: STUDIO_CATALOGUE_PAGES,
    });
  }
}
