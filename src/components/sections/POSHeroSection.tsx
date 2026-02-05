'use client'

import { motion, easeOut, easeInOut } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Shield, Cpu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function POSHeroSection() {


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

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  }

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[92vh] lg:min-h-[95vh] bg-fibem-dark overflow-hidden">
      {/* Background avec dégradé gauche-droite */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Image de bannière avec masque dégradé */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/Banner-hero.jpg"
              alt="Hero Banner"
              fill
              priority
              className="object-cover"
              quality={75}
              sizes="100vw"
            />
            {/* Masque dégradé pour révéler l'image à droite */}
            <div className="absolute inset-0 bg-linear-to-r from-fibem-dark via-fibem-dark/95 via-75% md:via-fibem-dark/90 via-65% lg:via-fibem-dark/85 via-60% to-transparent" />
          </div>
        </div>

        {/* Grille futuriste */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-15 md:opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 50%, rgba(120, 119, 198, 0.3) 0px, transparent 50%),
                              radial-gradient(circle at 75% 30%, rgba(56, 189, 248, 0.2) 0px, transparent 50%)`,
              backgroundSize: '150px 150px, 100px 100px',
              backgroundPosition: '0px 0px, 0px 0px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Orbes animés améliorés - Responsive */}
        <motion.div
          className="absolute top-1/4 -left-20 md:-left-24 lg:-left-32 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-fibem-primary/10 to-transparent rounded-full blur-xl md:blur-2xl lg:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 -right-20 md:-right-24 lg:-right-32 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-l from-fibem-accent/10 to-transparent rounded-full blur-xl md:blur-2xl lg:blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Éléments flottants - Masqué sur mobile */}
        <motion.div
          className="hidden lg:block absolute top-16 right-16 xl:top-20 xl:right-20 w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-gradient-to-r from-fibem-accent to-fibem-secondary"
          variants={floatVariants}
          animate="float"
        />
        <motion.div
          className="hidden lg:block absolute bottom-32 left-16 xl:bottom-40 xl:left-20 w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-gradient-to-r from-fibem-primary to-blue-400"
          variants={floatVariants}
          animate="float"
          transition={{ delay: 0.5 }}
        />
      </div>

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contenu gauche */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 z-10">
           
            {/* Titre principal */}
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 md:space-y-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-snug sm:leading-tight md:leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fibem-accent via-fibem-primary to-fibem-secondary bg-[length:200%_auto] animate-gradient">
                  Votre partenaire pour réussir
                </span>
                <br />
                <span className="relative inline-block">
                  en France et au Sénégal
                  <span className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 left-0 w-full h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-fibem-accent/50 to-transparent rounded-full"></span>
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300/90 leading-relaxed max-w-lg lg:max-w-xl mx-auto lg:mx-0">
                Services professionnels, recrutement et mise en relation d'experts en France et au Sénégal
              </p>
            </motion.div>

            {/* Points forts */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 justify-center lg:justify-start">
                <div className="p-1.5 sm:p-1.5 md:p-2 bg-gradient-to-br from-fibem-primary/20 to-fibem-primary/5 rounded-lg">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-fibem-primary" />
                </div>
                <span className="text-xs sm:text-sm md:text-sm font-medium text-white/90">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 justify-center lg:justify-start">
                <div className="p-1.5 sm:p-1.5 md:p-2 bg-gradient-to-br from-fibem-accent/20 to-fibem-accent/5 rounded-lg">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-fibem-accent" />
                </div>
                <span className="text-xs sm:text-sm md:text-sm font-medium text-white/90">Ultra Rapide</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 justify-center lg:justify-start">
                <div className="p-1.5 sm:p-1.5 md:p-2 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                </div>
                <span className="text-xs sm:text-sm md:text-sm font-medium text-white/90">Sécurisé</span>
              </div>
            </motion.div>

            {/* Boutons CTA */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 justify-center lg:justify-start pt-4 sm:pt-4 md:pt-5 lg:pt-6"
            >
              <Link href="/inscription" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="relative w-full sm:w-auto bg-gradient-to-r from-fibem-accent to-fibem-secondary hover:from-fibem-accent/90 hover:to-fibem-secondary/90 text-white font-semibold px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-4 sm:py-4.5 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg rounded-lg md:rounded-xl shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Espace Candidat
                    <ArrowRight className="ml-2 sm:ml-2 md:ml-3 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border border-white/20 md:border-2 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 font-semibold px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-4 sm:py-4.5 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg rounded-lg md:rounded-xl transition-all duration-300 group"
              >
                <Play className="mr-2 sm:mr-2 md:mr-3 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                Espace Recruteur
              </Button>
            </motion.div>
          </div>

          {/* Visualisation POS futuriste - Caché sur mobile, visible sur lg+ */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative z-10"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Carte principale avec effet 3D */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl shadow-fibem-primary/20 border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02]">
                {/* Effet de lumière */}
                <div className="absolute inset-0 bg-gradient-to-tr from-fibem-primary/5 via-transparent to-fibem-accent/5" />
                
                {/* Interface POS */}
                <div className="relative p-4 lg:p-5 xl:p-6">
                  {/* En-tête */}
                  <div className="flex items-center justify-between mb-4 lg:mb-6 xl:mb-8">
                    <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
                      <div className="p-2 lg:p-2.5 xl:p-3 bg-gradient-to-br from-fibem-primary to-blue-500 rounded-lg lg:rounded-xl">
                        <Zap className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
                      </div>
                      <div>
                        <div className="w-20 lg:w-24 xl:w-32 h-2 lg:h-2.5 xl:h-3 bg-gradient-to-r from-white/30 to-white/20 rounded-full mb-1 lg:mb-1.5 xl:mb-2"></div>
                        <div className="w-16 lg:w-20 xl:w-24 h-1.5 lg:h-2 xl:h-2 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3">
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs font-medium text-green-400">EN LIGNE</span>
                    </div>
                  </div>

                  {/* Grille de produits */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-2.5 xl:gap-3 mb-4 lg:mb-5 xl:mb-6">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg lg:rounded-xl flex items-center justify-center border border-white/5 hover:border-fibem-primary/30 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 rounded lg:rounded-lg bg-gradient-to-br ${
                          i % 3 === 0 ? 'from-fibem-primary/40 to-blue-400/40' :
                          i % 3 === 1 ? 'from-fibem-accent/40 to-purple-400/40' :
                          'from-fibem-secondary/40 to-green-400/40'
                        }`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Panier */}
                  <div className="bg-gradient-to-b from-white/5 to-white/2 rounded-xl lg:rounded-2xl p-3 lg:p-3.5 xl:p-4 border border-white/10">
                    <div className="space-y-2 lg:space-y-2.5 xl:space-y-3 mb-3 lg:mb-3.5 xl:mb-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3">
                            <div className="w-1.5 h-1.5 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2 rounded-full bg-fibem-accent"></div>
                            <div className="w-12 lg:w-14 xl:w-16 h-2 lg:h-2.5 xl:h-3 bg-white/20 rounded-full"></div>
                          </div>
                          <div className="w-8 lg:w-10 xl:w-12 h-2 lg:h-2.5 xl:h-3 bg-white/10 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 lg:pt-3.5 xl:pt-4 border-t border-white/10">
                      <div className="h-8 lg:h-9 xl:h-10 2xl:h-12 bg-gradient-to-r from-fibem-accent to-fibem-secondary rounded-lg lg:rounded-xl xl:rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-300">
                        <span className="font-bold text-white text-sm lg:text-sm xl:text-base">PAYMENT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments flottants autour */}
              <motion.div
                className="absolute -top-3 -right-3 lg:-top-3.5 lg:-right-3.5 xl:-top-4 xl:-right-4 px-2.5 py-1 lg:px-3 lg:py-1 xl:px-5 xl:py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/30 backdrop-blur-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                  <div className="w-1.5 h-1.5 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-[10px] lg:text-[11px] xl:text-xs">LIVE</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 lg:-bottom-3.5 lg:-left-3.5 xl:-bottom-4 xl:-left-4 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 bg-gradient-to-br from-fibem-secondary to-purple-500 rounded-lg lg:rounded-xl xl:rounded-2xl flex items-center justify-center shadow-lg lg:shadow-xl xl:shadow-xl shadow-purple-500/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-center">
                  <div className="text-white font-bold text-sm lg:text-sm xl:text-base 2xl:text-lg">0.3s</div>
                  <div className="text-white/60 text-[8px] lg:text-[9px] xl:text-xs">latence</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Effet de vague futuriste en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-6 sm:h-8 md:h-10 lg:h-12 xl:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z"
            fill="url(#wave-gradient)"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Styles d'animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gridMove {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 150px 150px, 100px 100px; }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }

        @media (min-width: 768px) {
          @keyframes gridMove {
            0% { background-position: 0px 0px, 0px 0px; }
            100% { background-position: 200px 200px, 150px 150px; }
          }
        }

        @media (min-width: 1024px) {
          @keyframes gridMove {
            0% { background-position: 0px 0px, 0px 0px; }
            100% { background-position: 300px 300px, 200px 200px; }
          }
        }

        @media (min-width: 1280px) {
          @keyframes gridMove {
            0% { background-position: 0px 0px, 0px 0px; }
            100% { background-position: 400px 400px, 300px 300px; }
          }
        }
      `}</style>
    </section>
  )
}


