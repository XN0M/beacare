import type { Brand, Category, Guide } from './types'

export const categories: Category[] = [
  { id: 'hair', label: 'Hair & Scalp', description: 'Care for the roots, lengths and rituals in between.', image: '/images/hair.webp' },
  { id: 'skin', label: 'Skin & Body', description: 'Gentle routines built around barrier-minded essentials.', image: '/images/skin.webp' },
  { id: 'nails', label: 'Nails & Hands', description: 'Small, considered acts of daily care.', image: '/images/nails.webp' },
  { id: 'tools', label: 'Beauty Tools', description: 'Useful objects chosen for function, feel and longevity.', image: '/images/tools.webp' },
]

export const brands: Brand[] = [
  { id: 'atelier-a', name: 'Sample brand 01', categories: ['skin'], summary: 'Barrier-conscious formulas with a pared-back approach.', image: '/images/skin.webp', affiliateUrl: null, status: 'sample', trackingId: null },
  { id: 'field-notes', name: 'Sample brand 02', categories: ['hair'], summary: 'Scalp-first care and thoughtful wash-day essentials.', image: '/images/hair.webp', affiliateUrl: null, status: 'sample', trackingId: null },
  { id: 'common-ground', name: 'Sample brand 03', categories: ['skin', 'nails'], summary: 'Everyday care for hands, body and dry-skin moments.', image: '/images/nails.webp', affiliateUrl: null, status: 'sample', trackingId: null },
  { id: 'ritual-form', name: 'Sample brand 04', categories: ['tools'], summary: 'Well-made tools designed for repeat rituals.', image: '/images/tools.webp', affiliateUrl: null, status: 'sample', trackingId: null },
  { id: 'root-and-rest', name: 'Sample brand 05', categories: ['hair', 'skin'], summary: 'A calm, considered edit across hair and body care.', image: '/images/hero.webp', affiliateUrl: null, status: 'sample', trackingId: null },
  { id: 'soft-study', name: 'Sample brand 06', categories: ['nails', 'tools'], summary: 'Simple finishing touches and tactile accessories.', image: '/images/nails.webp', affiliateUrl: null, status: 'sample', trackingId: null },
]

export const guides: Guide[] = [
  { slug: 'build-a-simple-morning-routine', title: 'How to build a simple morning routine', category: 'skin', excerpt: 'A flexible order of steps, from cleansing to daily sun protection.', image: '/images/skin.webp', status: 'published' },
  { slug: 'repair-or-moisture', title: 'Hair repair or moisture: where to begin', category: 'hair', excerpt: 'Learn what each product family is designed to do before adding more.', image: '/images/hair.webp', status: 'published' },
  { slug: 'beauty-tools-worth-keeping', title: 'Beauty tools worth keeping close', category: 'tools', excerpt: 'A practical guide to usefulness, materials and care.', image: '/images/tools.webp', status: 'published' },
]
