import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  'retail-tips': 'Retail tips',
  'salon-business': 'Salon business',
  'business-growth': 'Business growth',
  'technology': 'Technology',
  'markzone-news': 'MarkZone news',
} as const;

const post = z.object({
  title: z.string(),
  description: z.string().max(170),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES, ...(keyof typeof CATEGORIES)[]]),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  product: z.enum(['oxpos', 'zainaapp', 'texpos', 'websites', 'custom-software', 'none']).default('none'),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  draft: z.boolean().default(false),
});

export const collections = {
  blog: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/en' }), schema: post }),
  blogAr: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/ar' }), schema: post }),
};
