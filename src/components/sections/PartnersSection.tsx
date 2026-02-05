'use client'

import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { useScopedI18n } from '@/locales/client'

const partners = [
  { name: 'France Travail', logo: 'FT' },
  { name: 'APEC', logo: 'AP' },
  { name: 'Indeed', logo: 'IN' },
  { name: 'LinkedIn', logo: 'LI' },
  { name: 'HelloWork', logo: 'HW' },
  { name: 'Pole Emploi', logo: 'PE' },
]

export default function PartnersSection() {
  const t = useScopedI18n('home.partners')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-12 border-t border-b">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeIn">
          <p className="text-center text-gray-500 mb-8">{t('trust')}</p>
        </ScrollAnimationWrapper>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={logoVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center justify-center w-24 h-12 bg-gray-100 rounded-lg text-gray-400 font-bold text-xl hover:bg-fibem-light hover:text-fibem-primary transition-colors cursor-pointer"
              title={partner.name}
            >
              {partner.logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
