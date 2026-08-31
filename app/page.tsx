import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { DistributionStrip } from '@/components/distribution-strip'
import { ServicesGrid } from '@/components/services-grid'
import { ProcessStrip } from '@/components/process-strip'
import { EngineerProfile } from '@/components/engineer-profile'
import { Portfolio } from '@/components/portfolio'
import { CuratedGrid } from '@/components/curated-grid'
import { StudioBooth } from '@/components/studio-booth'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <DistributionStrip />
        <ServicesGrid />
        <ProcessStrip />
        <EngineerProfile />
        <Portfolio />
        <CuratedGrid />
        <StudioBooth />
        <Pricing />
        <Testimonials />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
