import type { AffiliatePlacement, Brand, CategoryId } from './types'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const isValidAffiliate = (brand: Brand) => {
  if (brand.status !== 'active' || !brand.affiliateUrl || !brand.trackingId) return false
  try { return new URL(brand.affiliateUrl).protocol === 'https:' } catch { return false }
}

export const trackAffiliateClick = (brand: Brand, category: CategoryId, placement: AffiliatePlacement) => {
  if (!isValidAffiliate(brand) || !import.meta.env.VITE_GA_ID) return
  const destinationDomain = new URL(brand.affiliateUrl!).hostname.replace(/^www\./, '')
  window.gtag?.('event', 'affiliate_click', {
    brand: brand.name,
    category,
    placement,
    network: brand.network,
    tracking_id: brand.trackingId,
    destination_domain: destinationDomain,
  })
}

export const initTracking = () => {
  const gaId = import.meta.env.VITE_GA_ID
  if (gaId && !document.querySelector('[data-beacare-ga]')) {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer?.push(args) })
    window.gtag('js', new Date())
    window.gtag('config', gaId)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    script.dataset.beacareGa = 'true'
    document.head.appendChild(script)
  }
}
