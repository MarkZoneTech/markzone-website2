import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  'retail-tips': 'Retail tips',
  'salon-business': 'Salon business',
  'business-growth': 'Business growth',
  'technology': 'Technology',
  'markzone-news': 'MarkZone news',
  'tutorials': 'Video tutorials',
} as const;

const post = z.object({
  title: z.string(),
  description: z.string().max(160),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES, ...(keyof typeof CATEGORIES)[]]),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  product: z.enum(['oxpos', 'zainaapp', 'texpos', 'websites', 'custom-software', 'none']).default('none'),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  draft: z.boolean().default(false),
  /** Video tutorial fields (category: tutorials). */
  video: z.object({
    id: z.string(),                       // YouTube video id
    duration: z.number().int(),           // seconds
    uploaded: z.string(),                 // ISO date-time of the YouTube upload
    series: z.enum(['oxpos', 'texpos', 'zainaapp']),
    lesson: z.number().int(),             // order inside the series
    group: z.string(),                    // learning-path key (see src/data/tutorials.ts)
    chapters: z.array(z.object({ t: z.string(), label: z.string() })).default([]),
  }).optional(),
});

export const collections = {
  blog: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/en' }), schema: post }),
  blogAr: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/ar' }), schema: post }),
};
