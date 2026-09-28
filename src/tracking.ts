import type { Brand, CategoryId } from './types'

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export const isValidAffiliate = (brand: Brand) => {
  if (brand.status !== 'active' || !brand.affiliateUrl || !brand.trackingId) return false
  try { return new URL(brand.affiliateUrl).protocol === 'https:' } catch { return false }
}

export const trackAffiliateClick = (brand: Brand, category: CategoryId, placement: string) => {
  if (!isValidAffiliate(brand) || !import.meta.env.VITE_GA_ID) return
  window.dataLayer?.push({ event: 'affiliate_click', brand: brand.name, category, placement, trackingId: brand.trackingId })
}

export const initTracking = () => {
  const gaId = import.meta.env.VITE_GA_ID
  if (gaId) {
    window.dataLayer = window.dataLayer || []
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(script)
  }
  const impactUrl = import.meta.env.VITE_IMPACT_SCRIPT_URL
  if (impactUrl) {
    try {
      const parsed = new URL(impactUrl)
      if (parsed.protocol === 'https:') {
        const script = document.createElement('script')
        script.async = true
        script.src = parsed.toString()
        document.head.appendChild(script)
      }
    } catch { /* Invalid configuration remains inert. */ }
  }
}
