import { ArrowDownRight, ArrowRight, Check, Feather, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { AccordionItem, BrandCard, CategoryFilter, Container, EditorialHeading, GuideCard, MediaFrame, MobileNav, SectionLabel } from './components'
import { brands, categories, guides } from './data'
import { initTracking, isValidAffiliate } from './tracking'
import type { CategoryId } from './types'

const routines = [
  { no: '01', eyebrow: 'Morning · 4 steps', title: 'A quiet start for skin', copy: 'Cleanse only as needed, support hydration, moisturize, then finish with daily sun protection.', items: ['Gentle cleanser', 'Hydrating layer', 'Moisturizer', 'Sun protection'] },
  { no: '02', eyebrow: 'Evening · 3 steps', title: 'Repair while you rest', copy: 'Remove the day without over-cleansing, choose one focused treatment and seal in comfort.', items: ['Cleanser', 'Targeted treatment', 'Barrier care'] },
  { no: '03', eyebrow: 'Weekly · flexible', title: 'Reset hair with intention', copy: 'Let scalp feel, styling habits and wash frequency guide the routine—not a rigid calendar.', items: ['Scalp cleanse', 'Condition', 'Repair as needed'] },
]

const essentials: Array<{ no: string; title: string; copy: string; category: CategoryId }> = [
  { no: '01', title: 'Cleanse', copy: 'Gentle facial cleanser · makeup removal', category: 'skin' },
  { no: '02', title: 'Condition', copy: 'Daily conditioner · considered hair repair', category: 'hair' },
  { no: '03', title: 'Replenish', copy: 'Moisturizer · body care · shower ritual', category: 'body' },
  { no: '04', title: 'Tend', copy: 'Nail treatment · hand care', category: 'nails' },
  { no: '05', title: 'Support', copy: 'Shower filters · useful beauty tools', category: 'body' },
]

function App() {
  const [filter, setFilter] = useState<'all' | CategoryId>('all')
  useEffect(() => { initTracking() }, [])
  const activeBrands = useMemo(() => brands.filter((brand) => brand.featured && isValidAffiliate(brand)), [])
  const filteredBrands = useMemo(() => filter === 'all' ? activeBrands : activeBrands.filter((brand) => brand.categories.includes(filter)), [activeBrands, filter])
  const selectCategory = (category: CategoryId) => {
    setFilter(category)
    window.requestAnimationFrame(() => document.getElementById('brands')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="paper-grain" aria-hidden="true" />
    <header className="site-header">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="logo" aria-label="BeaCare home"><span>Bea</span><i>Care</i></a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {categories.map((category) => <a href="#brands" key={category.id} onClick={() => setFilter(category.id)}>{category.label}</a>)}
        </nav>
        <a className="button button-primary hidden md:inline-flex" href="#brands">Browse brands</a>
        <MobileNav onSelectCategory={setFilter} />
      </Container>
    </header>

    <main id="main-content">
      <section className="hero" id="top">
        <Container className="relative grid items-center gap-9 py-10 lg:grid-cols-12 lg:py-14">
          <div className="relative z-10 lg:col-span-7 lg:pr-8">
            <SectionLabel>Independent beauty discovery</SectionLabel>
            <h1 className="font-display text-[clamp(3.25rem,6.6vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.05em]">Beauty,<br /><em className="font-semibold text-terracotta">thoughtfully</em><br />curated.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-forest/72">Meet independent beauty brands through the skin, hair, body and nail rituals they do best.</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a href="#brands" className="button button-primary">Browse featured brands <ArrowRight size={17} strokeWidth={1.5} /></a>
              <a href="#categories" className="text-link">Explore categories <ArrowDownRight size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="hero-orbit" aria-hidden="true">BeaCare · The considered edit · 2026</div>
            <MediaFrame src="/images/hero.webp" alt="Botanical beauty ritual arranged with ceramic vessels, amber glass and olive leaves" className="hero-image" eager />
            <blockquote className="hero-note">“Less noise.<br /><em>More knowing.</em>”</blockquote>
          </div>
        </Container>
      </section>

      <section className="section" id="categories">
        <Container>
          <div className="mb-14 grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><SectionLabel>Explore by category</SectionLabel><EditorialHeading>Begin with what your<br /><em>routine needs.</em></EditorialHeading></div>
            <p className="max-w-md text-lg leading-8 text-forest/65 lg:col-span-4 lg:col-start-9">Choose a category to narrow the directory and meet brands relevant to that part of your routine.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => <button type="button" aria-pressed={filter === category.id} aria-controls="brand-results" onClick={() => selectCategory(category.id)} className="category-card" id={category.id} key={category.id}>
              <div className="category-image"><img src={category.image} alt="" loading="lazy" /></div>
              <span className="category-number">0{index + 1}</span>
              <div><h3 className="font-display text-3xl font-semibold">{category.label}</h3><p>{category.description}</p></div>
              <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>)}
          </div>
        </Container>
      </section>

      <section className="section" id="brands">
        <Container>
          <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><SectionLabel>Featured Brands</SectionLabel><EditorialHeading>Meet the names behind<br /><em>the edit.</em></EditorialHeading></div>
            <p className="max-w-md text-lg leading-8 text-forest/65 lg:col-span-4 lg:col-start-9">Explore the directory by category and discover what each brand brings to a considered routine.</p>
          </div>
          <CategoryFilter value={filter} onChange={setFilter} />
          <div className="brand-grid" id="brand-results" aria-live="polite">
            {filteredBrands.map((brand) => <BrandCard brand={brand} contextCategory={filter === 'all' ? brand.categories[0] : filter} placement={filter === 'all' ? 'featured_brands' : 'category_result'} key={brand.id} />)}
            {filteredBrands.length === 0 && <div className="empty-state"><h3>No brands in this edit yet.</h3><p>Our directory grows carefully. Explore all brands while we review the next addition.</p><button className="button button-secondary" type="button" onClick={() => setFilter('all')}>View all brands</button></div>}
          </div>
          <p className="merchant-note">Prices, availability, shipping and purchase terms are determined by each merchant. Check the retailer's website before ordering.</p>
        </Container>
      </section>

      <section className="section bg-forest text-alabaster" id="daily-edit">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><SectionLabel light>The Daily Edit</SectionLabel><EditorialHeading>Routines that leave room for <em className="text-clay">real life.</em></EditorialHeading><p className="mt-7 max-w-sm text-lg leading-8 text-alabaster/68">Build from a clear sequence, then adjust for season, preference and how your skin or hair feels today.</p></div>
            <div className="lg:col-span-7 lg:col-start-6">
              {routines.map((routine) => <article className="routine-row" key={routine.no}>
                <span className="routine-no">{routine.no}</span><div><p className="routine-eyebrow">{routine.eyebrow}</p><h3>{routine.title}</h3><p>{routine.copy}</p><ul>{routine.items.map((item) => <li key={item}><Check size={15} strokeWidth={1.5} />{item}</li>)}</ul></div>
              </article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-clay-light" id="essentials">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionLabel>Curated Essentials</SectionLabel><EditorialHeading>The useful<br /><em>building blocks.</em></EditorialHeading><p className="mt-6 max-w-md text-lg leading-8 text-forest/68">Product families, not a shopping list. Compare purpose, texture and fit before considering a particular formula.</p><div className="mt-10 hidden h-64 overflow-hidden rounded-[10rem_10rem_2.5rem_2.5rem] md:block"><img className="h-full w-full object-cover" src="/images/tools.webp" alt="Wood and stone beauty tools on a ceramic surface" loading="lazy" /></div></div>
            <div className="lg:col-span-6 lg:col-start-7">{essentials.map(({ no, title, copy, category }) => <button type="button" className="essential-row" onClick={() => selectCategory(category)} key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p><ArrowRight size={19} strokeWidth={1.5} /></button>)}</div>
          </div>
        </Container>
      </section>

      <section className="section" id="principles">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionLabel>How We Curate</SectionLabel><EditorialHeading>Clarity before<br /><em>conversion.</em></EditorialHeading></div>
            <div className="principles-grid lg:col-span-7">
              {[['01', 'Need-led selection', 'We begin with the role a product plays in a routine, then consider formula, usability and who it may suit.'], ['02', 'Sources in context', 'We review brand materials, ingredient information and reputable third-party guidance—clearly separating facts from editorial judgment.'], ['03', 'Commercial transparency', 'Affiliate relationships never determine inclusion. Eligible links are labeled and may earn us a commission at no added cost to the reader.'], ['04', 'Honest limits', 'Beauty content is educational, not medical advice. Individual responses vary; persistent concerns belong with a qualified professional.']].map(([no, title, copy]) => <article key={no}><span>{no}</span><Feather size={28} strokeWidth={1.25} /><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="section guides-section" id="guides">
        <Container>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><SectionLabel>Editorial Guides</SectionLabel><EditorialHeading>Read slowly.<br /><em>Choose well.</em></EditorialHeading></div><span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest/50">Article previews <Search size={17} strokeWidth={1.5} /></span></div>
          <div className="guide-grid">{guides.map((guide, index) => <GuideCard guide={guide} index={index} key={guide.slug} />)}</div>
        </Container>
      </section>

      <section className="section" id="faq">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionLabel>FAQ</SectionLabel><EditorialHeading>A few things<br />to <em>know.</em></EditorialHeading><p className="mt-6 text-lg leading-8 text-forest/65">Our role is to help you understand the landscape—not to prescribe a perfect routine.</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <AccordionItem question="How should I choose a routine?">Start with the fewest steps that address your priorities. Add one change at a time, pay attention to comfort and consistency, and simplify again when needed.</AccordionItem>
            <AccordionItem question="Does BeaCare use affiliate links?">Yes. Eligible links are clearly disclosed and marked as sponsored. We may earn a commission from qualifying purchases at no additional cost to you.</AccordionItem>
            <AccordionItem question="Where does a purchase take place?">A brand link takes you to that brand or retailer in the same tab. Product details, availability, shipping, payment and fulfilment belong to that seller.</AccordionItem>
            <AccordionItem question="Is this health or medical advice?">No. Our content is general education and editorial opinion. For symptoms, reactions or health concerns, speak with a qualified healthcare professional.</AccordionItem>
          </div>
        </Container>
      </section>
    </main>

    <footer className="site-footer">
      <Container>
        <div className="footer-top"><div><a href="#top" className="logo logo-light"><span>Bea</span><i>Care</i></a><p>A quieter way to find what belongs in your routine.</p></div><a className="footer-cta" href="#categories">Explore the edit <ArrowRight /></a></div>
        <div className="footer-links"><a href="#faq">Disclosure</a><a href="#privacy">Privacy</a><a href="#principles">Editorial policy</a><a href="#for-brands">For Brands</a></div>
        <div className="footer-meta"><p id="privacy">Privacy: BeaCare does not collect form data. Analytics remain off unless configured.</p><p id="for-brands">For Brands: partnerships and submissions will open after the public launch. Affiliate links may earn BeaCare a commission.</p><p>© 2026 BeaCare</p></div>
      </Container>
    </footer>
  </>
}

export default App
