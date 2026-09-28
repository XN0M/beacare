export type CategoryId = 'hair' | 'skin' | 'nails' | 'tools'
export type BrandStatus = 'sample' | 'active' | 'paused'
export type GuideStatus = 'published' | 'draft'

export interface Brand {
  id: string
  name: string
  categories: CategoryId[]
  summary: string
  image: string
  affiliateUrl: string | null
  status: BrandStatus
  trackingId: string | null
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
