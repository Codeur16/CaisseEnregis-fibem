/**
 * FIBEM POS - Landing Page
 * ═══════════════════════════════════════════════════════════
 * 
 * Modern landing page for FIBEM POS - a SaaS Point of Sale application
 * 
 * Sections:
 * 1. Hero Section - Main value proposition with CTA
 * 2. Social Proof - Client logos and key statistics
 * 3. Features Grid - 6 main POS features
 * 4. Demo Section - Screenshot with annotations
 * 5. Modules Section - Employment & News modules teaser
 * 6. Testimonials - Customer reviews
 * 7. Pricing Preview - 4 pricing plans
 * 8. Jobs Teaser - Latest job openings
 * 9. News Teaser - Latest news articles
 * 10. Final CTA - Conversion call-to-action
 * 
 * @stack Next.js 15 | TypeScript | Tailwind CSS v4 | Framer Motion
 */

import POSHeroSection from '@/components/sections/POSHeroSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import FeaturesGridSection from '@/components/sections/FeaturesGridSection'
import DemoSection from '@/components/sections/DemoSection'
import ModulesSection from '@/components/sections/ModulesSection'
import POSTestimonialsSection from '@/components/sections/POSTestimonialsSection'
import PricingPreviewSection from '@/components/sections/PricingPreviewSection'
import JobsTeaserSection from '@/components/sections/JobsTeaserSection'
import NewsTeaserSection from '@/components/sections/NewsTeaserSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero - Above the fold */}
      <POSHeroSection />

      {/* Section 2: Social Proof - Client logos & statistics */}
      <SocialProofSection />

      {/* Section 3: Features Grid - 6 main POS features */}
      <FeaturesGridSection />

      {/* Section 4: Demo - POS interface screenshot */}
      <DemoSection />

      {/* Section 5: Modules - Employment & News teasers */}
      <ModulesSection />

      {/* Section 6: Testimonials - Customer reviews */}
      <POSTestimonialsSection />

      {/* Section 7: Pricing Preview - 4 pricing plans */}
      <PricingPreviewSection />

      {/* Section 8: Jobs Teaser - Latest job openings */}
      <JobsTeaserSection />

      {/* Section 9: News Teaser - Latest news articles */}
      <NewsTeaserSection />

      {/* Section 10: Final CTA - Conversion section */}
      <FinalCTASection />
    </main>
  )
}
