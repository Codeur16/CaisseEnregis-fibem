'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type PlanKey = 'free' | 'starter' | 'pro' | 'business'

interface PricingPlan {
  key: PlanKey
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  buttonVariant: 'outline' | 'default'
  borderClass: string
}

const plans: PricingPlan[] = [
  {
    key: 'free',
    name: 'Essai',
    price: '0€',
    description: 'Testez nos fonctionnalités principales',
    features: ['Gestion des ventes', 'Support par email', '1 utilisateur'],
    buttonVariant: 'outline',
    borderClass: 'border-fibem-border',
  },
  {
    key: 'starter',
    name: 'Starter',
    price: '29€/mois',
    description: 'Parfait pour les petites entreprises',
    features: ['Tout le plan Essai', 'Gestion des stocks', 'Rapports basiques', '3 utilisateurs'],
    buttonVariant: 'outline',
    borderClass: 'border-fibem-border',
  },
  {
    key: 'pro',
    name: 'Professionnel',
    price: '59€/mois',
    description: 'Solution complète pour votre croissance',
    features: ['Tout le plan Starter', 'Analytiques avancées', 'Multi-magasins', 'API access', '10 utilisateurs'],
    isPopular: true,
    buttonVariant: 'default',
    borderClass: 'border-fibem-accent',
  },
  {
    key: 'business',
    name: 'Entreprise',
    price: 'Sur mesure',
    description: 'Solution adaptée à vos besoins',
    features: ['Tout le plan Pro', 'Personnalisation', 'Support dédié', 'Utilisateurs illimités'],
    buttonVariant: 'outline',
    borderClass: 'border-fibem-border',
  },
]

export default function PricingPreviewSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-fibem-dark mb-4">
              Tarifs Concurrentiels
            </h2>
            <p className="text-lg text-fibem-muted max-w-2xl mx-auto">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </motion.div>

          {/* Pricing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.key}
                variants={itemVariants}
                custom={index}
              >
                <Card 
                  className={`h-full relative border-2 ${plan.borderClass} ${
                    plan.isPopular ? 'shadow-xl scale-[1.02]' : 'shadow-lg'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  {/* Popular badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-fibem-accent text-white px-4 py-1 text-xs font-bold">
                        Populaire
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2 pt-6">
                    <CardTitle className="text-lg font-bold text-fibem-muted mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-fibem-dark">
                        {plan.price}
                      </span>
                      <span className="text-fibem-muted">
                        {plan.key === 'free' ? '' : plan.key === 'business' ? '' : '/mois'}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                    {/* Limit/description */}
                    <div className="flex items-center justify-center gap-2 text-sm text-fibem-muted mb-6 bg-fibem-surface rounded-lg py-2 px-3">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{plan.description}</span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.isPopular 
                          ? 'bg-fibem-accent hover:bg-fibem-accent/90 text-white' 
                          : 'border-fibem-border hover:bg-fibem-surface text-fibem-dark'
                      }`}
                    >
                      {plan.key === 'business' ? 'Contactez-nous' : 'Commencer'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-10"
          >
            <Link 
              href="/tarifs"
              className="inline-flex items-center gap-2 text-fibem-primary hover:text-fibem-primary/80 font-semibold group"
            >
              Voir tous les tarifs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
