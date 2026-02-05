'use client'

import { motion } from 'framer-motion'
import { Briefcase, Newspaper, Check, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ModulesSection() {
  const modules = [
    {
      icon: Briefcase,
      titleKey: 'employment' as const,
      title: 'Module Emploi',
      subtitle: 'Trouvez votre prochain emploi',
      description: 'Accédez à des centaines d\'offres d\'emploi et postulez en quelques clics',
      gradient: 'from-fibem-secondary to-emerald-500',
      borderGradient: 'from-fibem-secondary via-emerald-400 to-transparent',
      iconBg: ' bg-linear-to-br from-fibem-secondary/20 via-fibem-secondary/10 to-white',
      iconColor: 'text-fibem-secondary',
      href: '/emploi',
      badge: 'Carrière',
      features: ['Recherche d\'emploi', 'Candidatures simplifiées', 'Alertes personnalisées']
    },
    {
      icon: Newspaper,
      titleKey: 'news' as const,
      title: 'Module Actualités',
      subtitle: 'Restez informé',
      description: 'Découvrez les dernières nouvelles et tendances du marché',
      gradient: 'from-fibem-primary to-blue-500',
      borderGradient: 'from-fibem-primary via-blue-400 to-transparent',
      iconBg: 'bg-linear-to-br from-fibem-primary/20 via-fibem-primary/10 to-white',
      iconColor: 'text-fibem-primary',
      href: '/actualites',
      badge: 'Actualités',
      features: ['Articles quotidiens', 'Analyses de marché', 'Newsletter']
    },
  ]
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
      transition: { duration: 0.5 },
    },
  }
 
  const badgeFloatVariants = {
    float: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <section className="relative py-20 md:py-32 bg-linear-to-b from-white to-fibem-dark overflow-hidden">
          {/* Lignes de connexion futuristes - Masqué sur mobile */}
      <svg className="absolute inset-0 w-full h-full opacity-10 hidden lg:block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 Q400,100 800,300 T1600,200"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          className="animate-pulse"
        />
      </svg>
      {/* Background futuriste */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes de gradient subtils */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-linear-to-r from-fibem-secondary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-linear-to-l from-fibem-primary/5 to-transparent rounded-full blur-3xl" />

        {/* Motifs géométriques */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.1) 0px, transparent 50%)
              `,
              backgroundSize: '300px 300px, 400px 400px',
            }}
          />
        </div>

        {/* Points connectés animés */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-fibem-primary to-fibem-secondary"
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${15 + Math.floor(i / 3) * 35}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-16 md:space-y-20"
        >
          {/* En-tête améliorée */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
           

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-fibem-accent via-fibem-accent to-fibem-accent bg-clip-text text-transparent">
                Modules Complémentaires
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Découvrez nos modules additionnels pour enrichir votre expérience
              </p>
            </div>
          </motion.div>

          {/* Modules grid améliorée */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {modules.map((module) => (
              <motion.div
                key={module.titleKey}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Carte principale */}
                  <div className="relative h-full bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                    {/* Bordure gradient animée */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-current to-transparent opacity-20" />
                    
                    {/* Overlay gradient subtil */}
                    <div className="absolute inset-0 bg-linear-to-br from-white via-gray-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Effet de lumière */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative p-8 md:p-10 z-10">
                      {/* En-tête avec badge */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          {/* Icône avec effets */}
                          <motion.div
                            className={`relative w-16 h-16 ${module.iconBg} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-2xl" />
                            <module.icon className={`w-8 h-8 ${module.iconColor} relative z-10`} />
                            
                            {/* Halo autour de l'icône */}
                            <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-current/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </motion.div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">
                                {module.title}
                              </h3>
                              
                              {/* Badge flottant */}
                              <motion.div
                                variants={badgeFloatVariants}
                                animate="float"
                                className="px-3 py-1 bg-linear-to-r from-white to-white/80 backdrop-blur-sm border border-gray-200 rounded-full"
                              >
                                <span className="text-xs font-semibold bg-linear-to-r bg-clip-text text-transparent ${module.gradient}">
                                  {module.badge}
                                </span>
                              </motion.div>
                            </div>
                            
                            {/* Barre de gradient sous le titre */}
                            <div className="flex items-center gap-2">
                              <div className={`w-32 h-1 bg-linear-to-r ${module.gradient} rounded-full`} />
                              <div className="w-4 h-1 bg-linear-to-r ${module.gradient} opacity-30 rounded-full" />
                              <div className="w-2 h-1 bg-linear-to-r ${module.gradient} opacity-20 rounded-full" />
                            </div>
                          </div>
                        </div>

                        {/* Indicateur d'interaction */}
                        <motion.div
                          className="w-12 h-12 rounded-full bg-linear-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                          whileHover={{ rotate: 90, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-5 h-5 text-gray-600" />
                        </motion.div>
                      </div>

                      {/* Liste des fonctionnalités améliorée */}
                      <ul className="space-y-4 mb-8">
                        {module.features.map((featureKey, index) => (
                          <motion.li
                            key={featureKey}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 group/item"
                          >
                            {/* Check avec animation */}
                            <motion.div
                              className={`flex-shrink-0 w-8 h-8 rounded-full bg-linear-to-br ${module.iconBg} flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-all duration-300`}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Check className={`w-4 h-4 ${module.iconColor}`} />
                              
                              {/* Animation du check */}
                              <motion.div
                                className="absolute w-10 h-10 rounded-full border-2 border-current opacity-0 group-hover/item:opacity-20"
                                animate={{
                                  scale: [1, 1.5, 1]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity
                                }}
                              />
                            </motion.div>

                            {/* Texte */}
                            <div className="flex-1">
                              <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300 leading-relaxed">
                                {module.features[index]}
                              </p>
                            </div>

                            {/* Points animés */}
                            <div className="flex space-x-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 h-1 rounded-full bg-current"
                                  animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.2, 1]
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                  }}
                                />
                              ))}
                            </div>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA amélioré */}
                      <motion.div
                        className="relative"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link 
                          href={module.href}
                          className="inline-flex items-center gap-3 group/link"
                        >
                          {/* Bouton avec gradient */}
                          <div className={`px-6 py-3 bg-linear-to-r ${module.gradient} text-white font-semibold rounded-xl shadow-md group-hover/link:shadow-lg transition-all duration-300 flex items-center gap-2`}>
                            <span>Explorer le module</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </motion.div>
                          </div>

                          {/* Texte supplémentaire */}
                          <span className={`text-sm font-medium ${module.iconColor} opacity-0 group-hover/link:opacity-100 transition-opacity duration-300`}>
                            Découvrir →
                          </span>

                          {/* Effet de traînée */}
                          <div className="absolute -inset-2 bg-linear-to-r from-current/5 to-transparent rounded-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 -z-10" />
                        </Link>
                      </motion.div>

                      {/* Points décoratifs animés */}
                      <div className="absolute -right-4 -bottom-4 opacity-10">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-8 h-8 rounded-full border-2 border-current"
                            style={{
                              left: `${i * 12}px`,
                              top: `${i * 12}px`,
                            }}
                            animate={{
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 10 + i * 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Effet de bordure gradient au survol */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white transition-all duration-500 pointer-events-none" />
                    
                    {/* Effet de lumière sur le bord */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${module.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>

                  {/* Ombre portée avec gradient */}
                  <div className="absolute inset-0 bg-linear-to-b from-gray-900/5 via-transparent to-transparent rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Note supplémentaire */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-dark backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
              {/* <Zap className="w-4 h-4 text-fibem-accent" /> */}
              <span className="text-sm text-fibem-light font-medium">
                Tous nos modules sont interconnectés
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// 'use client'

// import { motion } from 'framer-motion'
// import { Briefcase, Newspaper, Check, ArrowRight } from 'lucide-react'
// import Link from 'next/link'
// import { useScopedI18n } from '@/locales/client'
// import { Card, CardContent } from '@/components/ui/card'

// export default function ModulesSection() {
//   const t = useScopedI18n('pos.modules')

//   const modules: { 
//     icon: React.ElementType; 
//     titleKey: 'employment' | 'news'; 
//     borderColor: string; 
//     iconBg: string; 
//     iconColor: string; 
//     href: string; 
//   }[] = [
//     {
//       icon: Briefcase,
//       titleKey: 'employment',
//       borderColor: 'border-l-fibem-secondary',
//       iconBg: 'bg-fibem-secondary/10',
//       iconColor: 'text-fibem-secondary',
//       href: '/emploi',
//     },
//     {
//       icon: Newspaper,
//       titleKey: 'news',
//       borderColor: 'border-l-fibem-primary',
//       iconBg: 'bg-fibem-primary/10',
//       iconColor: 'text-fibem-primary',
//       href: '/actualites',
//     },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15 },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   }

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//         >
//           {/* Section header */}
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-fibem-dark mb-4">
//               {t('title')}
//             </h2>
//             <p className="text-lg text-fibem-muted max-w-2xl mx-auto">
//               {t('subtitle')}
//             </p>
//           </motion.div>

//           {/* Modules grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {modules.map((module) => (
//               <motion.div
//                 key={module.titleKey}
//                 variants={itemVariants}
//               >
//                 <Card className={`h-full border-l-4 ${module.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
//                   <CardContent className="p-6 sm:p-8">
//                     {/* Icon and title */}
//                     <div className="flex items-start gap-4 mb-6">
//                       <div className={`w-14 h-14 ${module.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
//                         <module.icon className={`w-7 h-7 ${module.iconColor}`} />
//                       </div>
//                       <div>
//                         <h3 className="text-xl sm:text-2xl font-bold text-fibem-dark">
//                           {t(`${module.titleKey}.title`)}
//                         </h3>
//                       </div>
//                     </div>

//                     {/* Features list */}
//                     <ul className="space-y-3 mb-6">
//                       {(['feature1', 'feature2', 'feature3'] as const).map((featureKey) => (
//                         <li key={featureKey} className="flex items-center gap-3">
//                           <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                             <Check className="w-3 h-3 text-green-600" />
//                           </div>
//                           <span className="text-fibem-textSecondary">
//                             {t(`${module.titleKey}.${featureKey}`)}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* CTA Link */}
//                     <Link 
//                       href={module.href}
//                       className={`inline-flex items-center gap-2 font-semibold ${module.iconColor} hover:underline group/link`}
//                     >
//                       {t(`${module.titleKey}.cta`)}
//                       <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
