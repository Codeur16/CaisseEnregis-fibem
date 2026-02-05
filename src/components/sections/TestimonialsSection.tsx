'use client'

import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { Star, Quote, ThumbsUp, Calendar, MapPin, Verified } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'

export default function TestimonialsSection() {
  const t = useScopedI18n('home.testimonials')

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: t('marie.role' as any),
      avatar: 'MD',
      rating: 5,
      text: t('marie.text' as any),
      location: 'Paris',
      date: 'Il y a 2 semaines',
      verified: true,
      service: 'Plomberie d\'urgence'
    },
    {
      id: 2,
      name: 'Jean-Pierre Martin',
      role: t('jeanPierre.role' as any),
      avatar: 'JM',
      rating: 5,
      text: t('jeanPierre.text' as any),
      location: 'Lyon',
      date: 'Il y a 1 mois',
      verified: true,
      service: 'Développement web'
    },
    {
      id: 3,
      name: 'Fatou Diallo',
      role: t('fatou.role' as any),
      avatar: 'FD',
      rating: 5,
      text: t('fatou.text' as any),
      location: 'Dakar',
      date: 'Il y a 3 semaines',
      verified: true,
      service: 'Services de design'
    },
    {
      id: 4,
      name: 'Thomas Bernard',
      role: t('thomas.role' as any),
      avatar: 'TB',
      rating: 4,
      text: t('thomas.text' as any),
      location: 'Marseille',
      date: 'Il y a 2 mois',
      verified: false,
      service: 'Consulting IT'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const testimonialVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  const stats = [
    { value: "2,341", label: t('stats.reviews') },
    { value: "4.9/5", label: t('stats.average') },
    { value: "98%", label: t('stats.satisfaction') },
    { value: "24/7", label: t('stats.support') }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ThumbsUp className="w-4 h-4" />
              {t('verifiedReviews')}
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t('users')}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('trustDescription')}
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Stats bar */}
        <ScrollAnimationWrapper type="fadeInUp" delay={0.2}>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100 group-hover:text-blue-200 transition-colors" />

              {/* Service badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-4">
                <span>{testimonial.service}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.div>
                ))}
                <span className="text-sm text-gray-500 ml-2">{testimonial.rating}.0</span>
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
                "{testimonial.text}"
              </p>

              {/* User info */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {testimonial.avatar}
                  </div>
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Verified className="w-2 h-2 text-white" />
                    </div>
                  )}
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>

              {/* Helpful indicator */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{t('helpful.question')}</span>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{t('helpful.yes')}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                      <ThumbsUp className="w-3 h-3 rotate-180" />
                      <span>{t('helpful.no')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <ScrollAnimationWrapper type="fadeInUp" delay={0.4}>
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 40px 40px, white 1px, transparent 1px)`,
                  backgroundSize: '80px 80px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t('cta.title')}
                </h3>
                <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                  {t('cta.description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t('cta.leaveReview')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-all duration-300"
                  >
                    {t('cta.viewAll')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
