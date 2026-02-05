'use client'

import { motion } from 'framer-motion'

export default function DemoSection() {
  const annotations = [
    { id: 1, label: 'Interface intuitive', position: 'top-[15%] left-[10%]' },
    { id: 2, label: 'Gestion des stocks', position: 'top-[30%] right-[5%]' },
    { id: 3, label: 'Paiements sécurisés', position: 'bottom-[30%] left-[15%]' },
    { id: 4, label: 'Rapports en temps réel', position: 'bottom-[15%] right-[10%]' },
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

  return (
    <section className="py-20 bg-linear-to-b from-fibem-dark to-white">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-fibem-light mb-4">
              Démo en Direct
            </h2>
            <p className=" bg-fibem-dark rounded-2xl p-2 w-auto text-lg text-fibem-light font-light max-w-2xl mx-auto">
              Découvrez notre interface moderne et intuitive
            </p>
          </motion.div>

          {/* Demo visual with annotations */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Main screenshot placeholder */}
            <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-fibem-border">
              {/* Gradient placeholder for POS interface screenshot */}
              <div className="absolute inset-0 bg-gradient-to-br from-fibem-dark via-[#1a3a5c] to-fibem-dark">
                {/* Simulated full POS interface */}
                <div className="absolute inset-4 sm:inset-6 bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-fibem-accent flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">POS</span>
                      </div>
                      <div>
                        <div className="w-16 sm:w-24 h-2 bg-white/20 rounded-full"></div>
                        <div className="w-12 sm:w-16 h-2 bg-white/10 rounded-full mt-1"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-fibem-primary/30 border border-fibem-primary/50"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/30 border border-green-500/50"></div>
                    </div>
                  </div>
                  
                  {/* Main content grid */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 h-[calc(100%-60px)]">
                    {/* Categories sidebar */}
                    <div className="hidden sm:flex flex-col gap-2">
                      {['Tous', 'Viennoiseries', 'Pains', 'Boissons'].map((cat, i) => (
                        <div 
                          key={cat}
                          className={`py-2 px-3 rounded-lg ${i === 0 ? 'bg-fibem-primary text-white' : 'bg-white/10 text-white/70'} text-xs font-medium`}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                    
                    {/* Product grid */}
                    <div className="col-span-4 sm:col-span-2 grid grid-cols-3 gap-2">
                      {[...Array(9)].map((_, i) => (
                        <div 
                          key={i}
                          className="aspect-square bg-white/10 rounded-lg flex flex-col items-center justify-center p-1 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-fibem-secondary/40 mb-1"></div>
                          <div className="w-full h-1.5 bg-white/20 rounded"></div>
                          <div className="w-3/4 h-1.5 bg-white/15 rounded mt-1"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Cart / Checkout panel */}
                    <div className="hidden sm:flex flex-col bg-white/5 rounded-lg p-2 sm:p-3">
                      <div className="text-white/80 text-xs font-semibold mb-2">Panier</div>
                      <div className="flex-1 space-y-2 overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/5 rounded p-1.5">
                            <div className="w-6 h-6 rounded bg-fibem-primary/30"></div>
                            <div className="flex-1">
                              <div className="h-1.5 bg-white/20 rounded w-full"></div>
                              <div className="h-1.5 bg-white/10 rounded w-2/3 mt-1"></div>
                            </div>
                            <div className="text-white/70 text-xs">2.50€</div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-2 mt-2">
                        <div className="flex justify-between text-white text-xs mb-2">
                          <span>Total</span>
                          <span className="font-bold">12.50€</span>
                        </div>
                        <div className="h-8 bg-fibem-accent rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          PAYER
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotations - hidden on mobile */}
            {annotations.map((annotation) => (
              <motion.div
                key={annotation.id}
                className={`absolute ${annotation.position} hidden lg:flex items-center gap-2`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: annotation.id * 0.2 }}
              >
                <div className="w-8 h-8 rounded-full bg-fibem-accent text-white flex items-center justify-center font-bold text-sm shadow-lg">
                  {annotation.id}
                </div>
                <div className="px-3 py-1.5 bg-white rounded-full shadow-md text-sm font-medium text-fibem-dark whitespace-nowrap">
                  {annotation.label}
                </div>
              </motion.div>
            ))}

            {/* Mobile annotations list */}
            <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
              {annotations.map((annotation) => (
                <div 
                  key={annotation.id}
                  className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-fibem-accent text-white flex items-center justify-center font-bold text-xs">
                    {annotation.id}
                  </div>
                  <span className="text-sm font-medium text-fibem-dark">
                    {annotation.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
