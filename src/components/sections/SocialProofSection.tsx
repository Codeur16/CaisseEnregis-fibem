'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Users, ShoppingCart, Clock, ChevronRight, Sparkles, TrendingUp } from 'lucide-react'
import { useRef } from 'react'

export default function SocialProofSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Utilisateurs actifs',
      color: 'text-fibem-primary',
      bgColor: 'bg-linear-to-br from-fibem-primary/10 via-fibem-primary/5 to-white',
      borderColor: 'border-fibem-primary/20',
      // description: t('activeUsers') // Translated description
    },
    {
      icon: ShoppingCart,
      value: '50,000+',
      label: 'Transactions mensuelles',
      color: 'text-fibem-accent',
      bgColor: 'bg-linear-to-br from-fibem-accent/10 via-fibem-accent/5 to-white',
      borderColor: 'border-fibem-accent/20',
      // description: t('monthlyTransactions') // Translated description
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support disponible',
      color: 'text-emerald-600',
      bgColor: 'bg-linear-to-br from-emerald-100/80 via-emerald-50/60 to-white',
      borderColor: 'border-emerald-200/40',
      // description: t('averageTime') // Translated description
    },
  ]

  // Client logos améliorés
  const clients = [
    { 
      initials: 'BC', 
      name: 'Boulangerie Centrale', 
      color: 'bg-gradient-to-br from-fibem-primary to-blue-500',
      gradient: 'from-fibem-primary/20 to-blue-500/20'
    },
    { 
      initials: 'LM', 
      name: 'Le Marché Bio', 
      color: 'bg-gradient-to-br from-emerald-500 to-green-400',
      gradient: 'from-emerald-100/40 to-green-100/40'
    },
    { 
      initials: 'CP', 
      name: 'Café Parisien', 
      color: 'bg-gradient-to-br from-amber-500 to-orange-400',
      gradient: 'from-amber-100/40 to-orange-100/40'
    },
    { 
      initials: 'RS', 
      name: 'Restaurant Soleil', 
      color: 'bg-gradient-to-br from-fibem-accent to-purple-500',
      gradient: 'from-fibem-accent/20 to-purple-500/20'
    },
    { 
      initials: 'PM', 
      name: 'Pharmacie Martin', 
      color: 'bg-gradient-to-br from-fibem-primary to-indigo-500',
      gradient: 'from-fibem-primary/20 to-indigo-500/20'
    },
    { 
      initials: 'SF', 
      name: 'Superette France', 
      color: 'bg-gradient-to-br from-indigo-500 to-blue-500',
      gradient: 'from-indigo-100/40 to-blue-100/40'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity
      }
    }
  }

  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1
      }
    }
  }

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      {/* Background subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbes très subtils */}
        <motion.div
          className="absolute top-20 -left-40 w-80 h-80 bg-linear-to-r from-fibem-primary/3 to-transparent rounded-full blur-3xl"
          variants={gradientVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        
        <motion.div
          className="absolute bottom-20 -right-40 w-80 h-80 bg-linear-to-l from-fibem-accent/3 to-transparent rounded-full blur-3xl"
          variants={gradientVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        />

        {/* Grille subtile */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Points de connexion */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-fibem-primary/20 rounded-full"
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 20}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-16 md:space-y-20"
        >
          {/* En-tête */}
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-white via-white to-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
              {/* <Sparkles className="w-4 h-4 text-fibem-primary" />
              <span className="text-sm font-medium text-gray-700">
                Choisi par les professionnels
              </span> */}
              <TrendingUp className="w-4 h-4 text-fibem-accent" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Fait confiance à FIBEM
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rejoignez des milliers de commerçants qui font confiance à notre solution
            </p>
          </motion.div>

          {/* Clients logos avec effet de défilement */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative overflow-hidden py-4">
              {/* Effet de gradient sur les bords */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10" />
              
              {/* Bande défilante */}
              <motion.div
                className="flex gap-8 md:gap-12"
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={index}
                    className="group shrink-0 w-40 md:w-48"
                  >
                    <motion.div
                      className="relative"
                      whileHover="float"
                      variants={floatVariants}
                    >
                      <div className={`relative w-20 h-20 md:w-24 md:h-24 mx-auto ${client.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                        <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0" />
                        <span className="text-white font-bold text-xl md:text-2xl relative z-10">
                          {client.initials}
                        </span>
                        
                        {/* Effet de halo au survol */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`absolute inset-0 bg-linear-to-br ${client.gradient} blur-xl`} />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                          {client.name}
                        </div>
                        <div className="mt-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs text-fibem-primary">Client depuis 2023</span>
                          <ChevronRight className="w-3 h-3 text-fibem-primary" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Stats avec animations */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Carte avec effets */}
                  <div className={`relative bg-white rounded-3xl p-8 border ${stat.borderColor} shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden`}>
                    {/* Effet de fond animé */}
                    <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Effet de bordure au survol */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white transition-all duration-500" />
                    
                    {/* Effet de lumière */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-6">
                        {/* Icône avec animation */}
                        <motion.div
                          className={`relative w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-2xl" />
                          <stat.icon className={`w-8 h-8 ${stat.color} relative z-10`} />
                          
                          {/* Points animés autour de l'icône */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-current opacity-20"
                              style={{
                                left: `${Math.cos(i * 2.094) * 28}px`,
                                top: `${Math.sin(i * 2.094) * 28}px`,
                              }}
                              animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.1, 0.3, 0.1]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity
                              }}
                            />
                          ))}
                        </motion.div>

                        {/* Contenu */}
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <motion.div 
                              className="text-3xl md:text-4xl font-bold text-gray-900"
                              initial={{ scale: 0.8 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                            >
                              {stat.value}
                            </motion.div>
                            <motion.div
                              className="text-fibem-accent text-lg"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              +
                            </motion.div>
                          </div>
                          
                          <div className="space-y-1 mt-2">
                            <div className="text-lg font-semibold text-gray-800">
                              {stat.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {/* {stat.description} */}
                            </div>
                          </div>

                          {/* Barre de progression subtile */}
                          <motion.div 
                            className="mt-4 h-1 bg-linear-to-r from-transparent via-current to-transparent opacity-20 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Indicateur au survol */}
                      <motion.div
                        className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-current opacity-20" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Ombre portée */}
                  <div className="absolute inset-0 bg-linear-to-b from-gray-900/5 to-transparent rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA discret */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-gray-600 italic">
              Rejoignez notre communauté grandissante
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}








// 'use client'

// import { motion } from 'framer-motion'
// import { Users, ShoppingCart, Clock } from 'lucide-react'
// import { useScopedI18n } from '@/locales/client'

// export default function SocialProofSection() {
//   const t = useScopedI18n('pos.socialProof')

//   const stats = [
//     {
//       icon: Users,
//       value: t('stat1'),
//       label: t('stat1Label'),
//       color: 'text-fibem-primary',
//       bgColor: 'bg-fibem-primary/10',
//     },
//     {
//       icon: ShoppingCart,
//       value: t('stat2'),
//       label: t('stat2Label'),
//       color: 'text-fibem-accent',
//       bgColor: 'bg-fibem-accent/10',
//     },
//     {
//       icon: Clock,
//       value: t('stat3'),
//       label: t('stat3Label'),
//       color: 'text-green-600',
//       bgColor: 'bg-green-100',
//     },
//   ]

//   // Placeholder client logos
//   const clients = [
//     { initials: 'BC', name: 'Boulangerie Centrale', color: 'bg-fibem-primary' },
//     { initials: 'LM', name: 'Le Marché Bio', color: 'bg-green-600' },
//     { initials: 'CP', name: 'Café Parisien', color: 'bg-amber-600' },
//     { initials: 'RS', name: 'Restaurant Soleil', color: 'bg-fibem-accent' },
//     { initials: 'PM', name: 'Pharmacie Martin', color: 'bg-fibem-primary' },
//     { initials: 'SF', name: 'Superette France', color: 'bg-indigo-600' },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   }

//   return (
//     <section className="py-16 bg-fibem-surface">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//           className="space-y-12"
//         >
//           {/* Section title */}
//           <motion.div variants={itemVariants} className="text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold text-fibem-dark">
//               {t('title')}
//             </h2>
//           </motion.div>

//           {/* Client logos */}
//           <motion.div 
//             variants={itemVariants}
//             className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6"
//           >
//             {clients.map((client, index) => (
//               <motion.div
//                 key={index}
//                 className="group flex flex-col items-center"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div 
//                   className={`w-14 h-14 sm:w-16 sm:h-16 ${client.color} rounded-xl flex items-center justify-center opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300 shadow-md`}
//                 >
//                   <span className="text-white font-bold text-lg">{client.initials}</span>
//                 </div>
//                 <span className="mt-2 text-xs text-fibem-muted text-center hidden sm:block">
//                   {client.name}
//                 </span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Stats grid */}
//           <motion.div 
//             variants={itemVariants}
//             className="grid grid-cols-1 sm:grid-cols-3 gap-6"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4"
//                 whileHover={{ y: -4 }}
//               >
//                 <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
//                   <stat.icon className={`w-7 h-7 ${stat.color}`} />
//                 </div>
//                 <div>
//                   <div className="text-2xl sm:text-3xl font-bold text-fibem-dark">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-fibem-muted">
//                     {stat.label}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
