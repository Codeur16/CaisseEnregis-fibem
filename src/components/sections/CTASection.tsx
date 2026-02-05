'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { ArrowRight, Users, Building, CheckCircle, Star, TrendingUp, Zap, Shield } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'

export default function CTASection() {
  const t = useScopedI18n('home.ctaSection')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-4 h-4" />
              {t('cta.title')}
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('cta.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('cta.description')}
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* CTA Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* For Professionals */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 30px 30px, white 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}></div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Building className="w-8 h-8" />
                </motion.div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Plus de 200 entreprises
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('pro.title')}
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {t('pro.description')}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: CheckCircle, text: t('pro.benefit1') },
                    { icon: Star, text: t('pro.benefit2') },
                    { icon: Shield, text: t('pro.benefit3') }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <benefit.icon className="w-5 h-5 text-blue-200 flex-shrink-0" />
                      <span className="text-white">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/inscription?type=professionnel"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    {t('pro.button')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* For Job Seekers */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 30px 30px, white 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}></div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-8 h-8" />
                </motion.div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  +500 offres actives
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('candidate.title')}
                </h3>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  {t('candidate.description')}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: CheckCircle, text: t('candidate.benefit1') },
                    { icon: Star, text: t('candidate.benefit2') },
                    { icon: Shield, text: t('candidate.benefit3') }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <benefit.icon className="w-5 h-5 text-purple-200 flex-shrink-0" />
                      <span className="text-white">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/inscription?type=candidat"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    {t('candidate.button')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <ScrollAnimationWrapper type="fadeInUp" delay={0.4}>
          <motion.div 
            className="text-center bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Des questions ? Notre équipe est là pour vous aider
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui et découvrez comment FIBEM peut transformer 
              votre activité ou votre carrière
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contacter l'équipe
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  Demander une démo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
