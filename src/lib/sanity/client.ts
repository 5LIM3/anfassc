import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export interface SanityNewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  mainImageUrl?: string;
  body?: unknown;
}

export async function getNewsPosts(): Promise<SanityNewsPost[]> {
  return sanityClient.fetch(`
    *[_type == "newsPost"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, publishedAt,
      "mainImageUrl": mainImage.asset->url
    }
  `);
}

export async function getNewsPostBySlug(slug: string): Promise<SanityNewsPost | null> {
  return sanityClient.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, publishedAt, body,
      "mainImageUrl": mainImage.asset->url
    }`,
    { slug }
  );
}