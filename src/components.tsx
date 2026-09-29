import { ArrowRight, ChevronDown, Leaf, Menu, X } from 'lucide-react'
import { useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import type { AffiliatePlacement, Brand, CategoryId, Guide, MarketCode } from './types'
import { isValidAffiliate, trackAffiliateClick } from './tracking'

const categoryLabels: Record<CategoryId, string> = { skin: 'Skin', hair: 'Hair', body: 'Body', nails: 'Nails' }
const marketLabels: Record<MarketCode, string> = { US: 'US', GB: 'UK', ES: 'Spain', INTL: 'International' }

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
)

export const SectionLabel = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <p className={`mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] ${light ? 'text-alabaster/70' : 'text-sage-dark'}`}>
    <span className={`h-px w-8 ${light ? 'bg-alabaster/40' : 'bg-sage'}`} aria-hidden="true" />{children}
  </p>
)

export const EditorialHeading = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display text-4xl font-semibold leading-[1.06] tracking-[-0.025em] sm:text-5xl lg:text-6xl ${className}`}>{children}</h2>
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }
export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button className={`button ${variant === 'secondary' ? 'button-secondary' : 'button-primary'} ${className}`} {...props} />
)

export const MediaFrame = ({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) => (
  <div className={`media-frame ${className}`}>
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} />
  </div>
)

export const CategoryFilter = ({ value, onChange }: { value: 'all' | CategoryId; onChange: (value: 'all' | CategoryId) => void }) => {
  const filters: Array<{ value: 'all' | CategoryId; label: string }> = [
    { value: 'all', label: 'All brands' }, { value: 'skin', label: 'Skin' }, { value: 'hair', label: 'Hair' }, { value: 'body', label: 'Body' }, { value: 'nails', label: 'Nails' },
  ]
  return <div className="filter-row" role="group" aria-label="Filter featured brands by category">
    {filters.map((filter) => <button key={filter.value} type="button" aria-pressed={value === filter.value} onClick={() => onChange(filter.value)}>{filter.label}</button>)}
  </div>
}

export const BrandCard = ({ brand, contextCategory, placement }: { brand: Brand; contextCategory: CategoryId; placement: AffiliatePlacement }) => {
  const active = isValidAffiliate(brand)
  return <article className="brand-card">
    <div className="brand-card-body">
      <div className="brand-card-meta">
        <span>{brand.categories.map((category) => categoryLabels[category]).join(' · ')}</span>
        <span>{brand.markets.map((market) => marketLabels[market]).join(' · ')}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold">{brand.name}</h3>
      <p className="mt-3 leading-7 text-forest/70">{brand.summary}</p>
      <dl className="brand-card-copy">
        <div><dt>Best for</dt><dd>{brand.bestFor}</dd></div>
        <div><dt>Why it is in the edit</dt><dd>{brand.editorialNote}</dd></div>
      </dl>
      <ul className="tag-list" aria-label={`${brand.name} product categories`}>{brand.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}</ul>
      {active ? <a className="brand-link" href={brand.affiliateUrl!} rel="sponsored" onClick={() => trackAffiliateClick(brand, contextCategory, placement)}>Visit brand <ArrowRight size={17} strokeWidth={1.5} /></a>
        : <span className="brand-link is-disabled" aria-disabled="true">Currently unavailable <Leaf size={16} strokeWidth={1.5} /></span>}
    </div>
  </article>
}

export const GuideCard = ({ guide, index }: { guide: Guide; index: number }) => (
  <article className={`guide-card ${index === 1 ? 'md:translate-y-12' : ''}`}>
    <div className="guide-image"><img src={guide.image} alt="" loading="lazy" /></div>
    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">{guide.category}</p>
    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">{guide.title}</h3>
    <p className="mt-4 leading-7 text-forest/70">{guide.excerpt}</p>
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">Guide preview <ArrowRight size={17} strokeWidth={1.5} /></span>
  </article>
)

export const AccordionItem = ({ question, children }: { question: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  return <div className="accordion-item">
    <button type="button" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen(!open)}>
      <span>{question}</span><ChevronDown size={22} strokeWidth={1.5} className={open ? 'rotate-180' : ''} />
    </button>
    <div id={contentId} className="accordion-panel" data-open={open}><div><p>{children}</p></div></div>
  </div>
}

export const MobileNav = ({ onSelectCategory }: { onSelectCategory: (category: CategoryId) => void }) => {
  const [open, setOpen] = useState(false)
  const links: Array<{ label: string; category: CategoryId }> = [
    { label: 'Skin', category: 'skin' }, { label: 'Hair', category: 'hair' }, { label: 'Body', category: 'body' }, { label: 'Nails', category: 'nails' },
  ]
  return <div className="md:hidden">
    <button className="icon-button" type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
    <div className="mobile-menu" data-open={open} aria-hidden={!open}>
      <button className="icon-button absolute right-5 top-5" type="button" aria-label="Close navigation" onClick={() => setOpen(false)}><X /></button>
      <p className="font-display text-2xl">BeaCare</p>
      <nav aria-label="Mobile navigation">{links.map(({ label, category }) => <a key={category} href="#brands" onClick={() => { onSelectCategory(category); setOpen(false) }}>{label}</a>)}</nav>
      <a className="button button-primary mt-8" href="#brands" onClick={() => setOpen(false)}>Browse brands</a>
    </div>
  </div>
}
