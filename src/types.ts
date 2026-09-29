export type CategoryId = 'skin' | 'hair' | 'body' | 'nails'
export type BrandStatus = 'active' | 'paused'
export type AffiliateNetwork = 'goaffpro' | 'refersion' | 'direct'
export type MarketCode = 'US' | 'GB' | 'ES' | 'INTL'
export type AffiliatePlacement =
  | 'hero'
  | 'category_result'
  | 'featured_brands'
  | 'routine_recommendation'
  | 'curated_essentials'
  | 'footer'
export type GuideStatus = 'published' | 'draft'

export interface Brand {
  id: string
  name: string
  categories: CategoryId[]
  summary: string
  bestFor: string
  editorialNote: string
  affiliateUrl: string | null
  network: AffiliateNetwork
  status: BrandStatus
  trackingId: string | null
  markets: MarketCode[]
  tags: string[]
  featured: boolean
}

export interface Category {
  id: CategoryId
  label: string
  description: string
  image: string
}

export interface Guide {
  slug: string
  title: string
  category: CategoryId
  excerpt: string
  image: string
  status: GuideStatus
}
