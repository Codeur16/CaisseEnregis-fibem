'use client'

import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Shield, 
  Store,
  LucideIcon,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'

interface Feature {
  icon: LucideIcon
  titleKey: 'pos' | 'stock' | 'clients' | 'analytics' | 'security' | 'multistore'
  title: string
  description: string
  gradient: string
  imageUrl: string
  imageAlt: string
}

const features: Feature[] = [
  {
    icon: ShoppingCart,
    titleKey: 'pos',
    title: 'Point de Vente',
    description: 'Gestion complète des ventes avec caisse enregistreuse moderne et intuitive',
    gradient: 'from-fibem-primary to-blue-600',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    imageAlt: 'Caisse enregistreuse moderne avec écran tactile'
  },
  {
    icon: Package,
    titleKey: 'stock',
    title: 'Gestion des Stocks',
    description: 'Suivi en temps réel de votre inventaire avec alertes automatiques',
    gradient: 'from-green-500 to-emerald-600',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop',
    imageAlt: 'Gestion de stock en entrepôt moderne'
  },
  {
    icon: Users,
    titleKey: 'clients',
    title: 'Gestion Client',
    description: 'Base de données clients intégrée avec historique d\'achats',
    gradient: 'from-purple-500 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&auto=format&fit=crop',
    imageAlt: 'Service client avec sourire'
  },
  {
    icon: BarChart3,
    titleKey: 'analytics',
    title: 'Analytiques',
    description: 'Rapports détaillés et tableaux de bord pour prendre les bonnes décisions',
    gradient: 'from-orange-500 to-amber-600',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    imageAlt: 'Tableau de bord analytique'
  },
  {
    icon: Shield,
    titleKey: 'security',
    title: 'Sécurité',
    description: 'Protection des données et transactions sécurisées',
    gradient: 'from-red-500 to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop',
    imageAlt: 'Sécurité des données'
  },
  {
    icon: Store,
    titleKey: 'multistore',
    title: 'Multi-magasins',
    description: 'Gérez plusieurs points de vente depuis une interface unique',
    gradient: 'from-indigo-500 to-purple-600',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
    imageAlt: 'Multi-magasins'
  }
]

export default function FeaturesGridSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }
  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.6, 0.05, -0.01, 0.9] // Using a cubic bezier for easing
      }
    }
  }

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { 
  //       staggerChildren: 0.15,
  //       delayChildren: 0.2
  //     },
  //   },
  // }

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.5 },
  //   },
  // }

  return (
    <section className="relative py-20 md:py-32 bg-linear-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Background futuriste */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-fibem-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-l from-fibem-accent/5 to-transparent rounded-full blur-3xl" />

        {/* Grille géométrique futuriste */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 45%, rgba(59, 130, 246, 0.1) 50%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, rgba(139, 92, 246, 0.1) 50%, transparent 55%)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0'
            }}
          />
        </div>

        {/* Points connectés */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-fibem-primary to-fibem-accent"
            style={{
              left: `${10 + (i % 4) * 20}%`,
              top: `${15 + Math.floor(i / 4) * 25}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}

        {/* Lignes de connexion */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q200,0 400,100 T800,100 T1200,50"
            fill="none"
            stroke="url(#connection-gradient)"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-16 md:space-y-20"
        >
          {/* Section header avec badge */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
           

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Fonctionnalités Principales
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Découvrez toutes les fonctionnalités de notre système de point de vente moderne
              </p>
            </div>
          </motion.div>

          {/* Features grid améliorée */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                variants={itemVariants} // Utiliser itemVariants au lieu de itemVariantsCustom
                custom={index}
                className="group"
              >
                <motion.div
                  className="relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Carte principale */}
                  <div className="relative h-full bg-white rounded-3xl border border-gray-200/80 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Effet de fond gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-white via-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image de service */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/20 z-10" />
                      <Image
                        src={feature.imageUrl}
                        alt={feature.imageAlt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Badge flottant sur l'image */}
                      <motion.div
                        className="absolute top-4 right-4 z-20"
                        // variants={floatVariants}
                        animate="float"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Contenu */}
                    <div className="relative p-6 md:p-8 z-20">
                      <div className="space-y-4">
                        {/* Titre avec animation */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">
                              {feature.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <div className={`w-24 h-1 bg-linear-to-r ${feature.gradient} rounded-full`} />
                              <div className={`w-8 h-1 bg-linear-to-r ${feature.gradient} opacity-50 rounded-full`} />
                            </div>
                          </div>
                          
                          {/* Indicateur d'interaction */}
                          <motion.div
                            className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-5 h-5 text-gray-600" />
                          </motion.div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {feature.description}
                        </p>

                        {/* Points clés */}
                        <div className="pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full bg-linear-to-br from-gray-300 to-gray-400 border-2 border-white"
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-500">
                              {index % 3 === 0 ? "Ultra rapide" : 
                               index % 3 === 1 ? "Sans contact" : 
                               "Intelligent"}
                            </span>
                          </div>
                        </div>

                        {/* Effet de surbrillance au survol */}
                        <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-transparent via-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </div>
                    </div>

                    {/* Effets décoratifs */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-current/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Points animés */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-current"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: '85%',
                        }}
                        animate={{
                          opacity: [0.1, 0.5, 0.1],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3 + index * 0.1,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </div>

                  {/* Ombre portée */}
                  <div className="absolute inset-0 bg-linear-to-b from-gray-900/5 via-gray-900/2 to-transparent rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to action discret */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-white to-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-gray-700">
                Fonctionnalités Principales
              </span>
              <ArrowRight className="w-4 h-4 text-fibem-primary" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Styles d'animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  )
}
