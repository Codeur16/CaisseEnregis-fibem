'use client'

import { motion, easeOut } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function POSTestimonialsSection() {
  const testimonials = [
    {
      key: 'testimonial1',
      initials: 'MD',
      name: 'Marie Dupont',
      role: 'Commerçante',
      text: 'FIBEM a transformé ma gestion quotidienne. Simple, rapide et efficace !',
      color: 'bg-fibem-accent',
      rating: 5,
    },
    {
      key: 'testimonial2',
      initials: 'AK',
      name: 'Ahmad Kane',
      role: 'Restaurateur',
      text: 'Une solution complète qui a modernisé notre restaurant. Je recommande vivement !',
      color: 'bg-fibem-primary',
      rating: 5,
    },
    {
      key: 'testimonial3',
      initials: 'SM',
      name: 'Sophie Martin',
      role: 'Gérante de boutique',
      text: 'L\'interface est intuitive et l\'équipe support est toujours disponible. Excellent !',
      color: 'bg-purple-600',
      rating: 5,
    },
  ]

 const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  }
  return (
    <section className="py-20 bg-fibem-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section header */}
          <motion.div 
          variants={itemVariants} 
          className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-fibem-dark mb-4">
              Témoignages Clients
            </h2>
            <p className="text-lg text-fibem-muted max-w-2xl mx-auto">
              Découvrez ce que nos clients pensent de FIBEM
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const rating = testimonial.rating

              return (
                <motion.div
                  key={testimonial.key}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 sm:p-8">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-fibem-primary/30" />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex gap-1" aria-hidden>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < rating ? 'text-fibem-secondary' : 'text-fibem-muted'}`}
                          />
                        ))}
                      </div>
                      <div className="sr-only">{rating} / 5</div>
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-fibem-textPrimary leading-relaxed mb-6 min-h-[60px] text-sm md:text-base">
                      <p>"{testimonial.text}"</p>
                    </blockquote>

                    {/* Author info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center shadow-md`}>
                        <span className="text-white font-bold">
                          {testimonial.initials}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-fibem-dark">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-fibem-muted">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
