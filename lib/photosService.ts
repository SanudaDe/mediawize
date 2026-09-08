import { getSupabaseClient, createServerClient } from './supabaseClient';
import { StudioImageDetail, STUDIO_GALLERY_ITEMS } from './studioImages';

export interface PhotoRecord {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
}

/**
 * Fetches published photos from Supabase.
 * Falls back to local gallery items if database is empty or not yet seeded.
 */
export async function fetchStudioPhotos(): Promise<StudioImageDetail[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return STUDIO_GALLERY_ITEMS;
    }

    return data.map((item: PhotoRecord) => ({
      id: item.id,
      title: item.title,
      category: item.category as StudioImageDetail['category'],
      description: item.description || '',
      imageUrl: item.image_url,
    }));
  } catch (err) {
    console.warn('Could not fetch photos from Supabase, using local defaults:', err);
    return STUDIO_GALLERY_ITEMS;
  }
}

/**
 * Upload an image file to Supabase Storage and insert metadata into the photos table.
 */
export async function uploadStudioPhoto({
  file,
  title,
  category,
  description,
}: {
  file: File;
  title: string;
  category: string;
  description?: string;
}) {
  const supabase = getSupabaseClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `gallery/${fileName}`;

  // 1. Upload to Supabase Storage bucket named 'photos'
  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 2. Get Public URL
  const { data: publicUrlData } = supabase.storage
    .from('photos')
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData.publicUrl;

  // 3. Insert record into 'photos' table
  const { data, error: insertError } = await supabase
    .from('photos')
    .insert([
      {
        title,
        category,
        image_url: publicUrl,
        description: description || '',
        is_published: true,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error(`Database save failed: ${insertError.message}`);
  }

  return data;
}
