'use client'

import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { Search, UserCheck, FileText, ThumbsUp, ArrowRight, CheckCircle, Clock, Shield, Sparkles } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'

export default function HowItWorksSection() {
  const t = useScopedI18n('home.howItWorks')

  const steps = [
    {
      icon: Search,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50',
      number: '01',
      features: ['Recherche intelligente', 'Filtres avancés', 'Alertes personnalisées']
    },
    {
      icon: UserCheck,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-50',
      number: '02',
      features: ['Profils vérifiés', 'Avis authentiques', 'Comparaison facile']
    },
    {
      icon: FileText,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: 'from-purple-500 to-pink-600',
      bgLight: 'bg-purple-50',
      number: '03',
      features: ['Devis détaillés', 'Transparence totale', 'Sans engagement']
    },
    {
      icon: ThumbsUp,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: 'from-orange-500 to-red-600',
      bgLight: 'bg-orange-50',
      number: '04',
      features: ['Paiement sécurisé', 'Suivi en temps réel', 'Garantie satisfaction']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeOut" as const, delay: 0.5 }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
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
              <Sparkles className="w-4 h-4" />
              Comment ça marche
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                efficace
              </span>
              {" "}et rapide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre plateforme vous guide à chaque étape pour trouver le professionnel idéal 
              ou réaliser vos projets en toute simplicité
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <motion.div 
            className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200 rounded-full"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="relative group"
              >
                {/* Desktop connector dots */}
                <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-300 rounded-full z-10"></div>

                {/* Step Card */}
                <motion.div
                  className={`${step.bgLight} rounded-2xl p-8 h-full border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Step Number */}
                  <div className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-4">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow indicator */}
                    <motion.div 
                      className="flex items-center gap-2 text-blue-600 font-medium text-sm pt-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4">
                    <motion.div
                      className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      style={{ originY: 0 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust indicators */}
        <ScrollAnimationWrapper type="fadeInUp" delay={0.4}>
          <motion.div 
            className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, white 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="text-xl font-bold mb-2">Gain de temps</h4>
                <p className="text-blue-100">Trouvez en quelques minutes ce qui vous prendrait des heures</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-3" />
                <h4 className="text-xl font-bold mb-2">Sécurité totale</h4>
                <p className="text-blue-100">Paiements protégés et professionnels vérifiés</p>
              </div>
              <div>
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h4 className="text-xl font-bold mb-2">Qualité garantie</h4>
                <p className="text-blue-100">Accédez aux meilleurs talents et services</p>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
