'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Users, Building, ArrowRight, Play, CheckCircle, Star, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { useScopedI18n } from '@/locales/client'

export default function HeroSection() {
  const t = useScopedI18n('home.hero')

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut" as const
      },
    }),
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const stats = [
    { value: "10K+", label: "Professionnels" },
    { value: "98%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
    { value: "500+", label: "Services" }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10"
          animate={{ 
            background: [
              "linear-gradient(to-tr, rgba(99, 102, 241, 0.1), transparent, rgba(6, 182, 212, 0.1))",
              "linear-gradient(to-tr, rgba(139, 92, 246, 0.1), transparent, rgba(59, 130, 246, 0.1))",
              "linear-gradient(to-tr, rgba(99, 102, 241, 0.1), transparent, rgba(6, 182, 212, 0.1))"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Sophisticated animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-teal-400/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 60px 60px, 60px 60px'
          }}
        />
      </div>

      {/* Hero image with sophisticated overlay */}
      <div className="absolute inset-0">
        <div className="absolute z-50 inset-0">
          <Image
            src="/hero-banner.jpg"
            alt="Hero Banner"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="opacity-100 z-50"
          />
        </div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
           
            {/* Main title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('title')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {t('succeed')}
                </span>
                <br />
               <p className="text-xl md:text-3xl font-normal text-gray-300 leading-relaxed max-w-2xl">
                  {t('subtitle')}
    
              </p>
              </h1>
              <p className="text-sm md:text-xl font-light text-gray-300 leading-relaxed max-w-2xl">
                {t('cta1Description')}
                <span className="text-cyan-400 font-semibold"> Rapide • Fiable • Sécurisé</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link 
                href="/emploi/candidat"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  {t('cta1')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>

              <Link 
                href="/emploi/recruteur"
                className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Building className="w-5 h-5" />
                {t('cta2')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            {/* <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-300"
            >
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Vérifié</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 (2,341 avis)</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Paiement sécurisé</span>
              </div>
            </motion.div> */}

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Interactive cards */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              {/* Main card */}
              <motion.div 
                custom={0}
                variants={cardVariants}
                className="relative bg-white rounded-2xl shadow-xl p-6 mb-4 hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    POPULAIRE
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Espace Candidat</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">4.9 (1.2k avis)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Accédez à des centaines d'offres d'emploi et développez votre carrière
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">+500 offres actives</span>
                  <Link 
                    href="/emploi/candidat"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    Explorer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Secondary cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  custom={1}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Recruteurs</h4>
                  <p className="text-xs text-gray-600 mb-2">Trouvez les meilleurs talents</p>
                  <span className="text-xs text-green-600 font-medium">+200 entreprises</span>
                </motion.div>

                <motion.div 
                  custom={2}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Services Pro</h4>
                  <p className="text-xs text-gray-600 mb-2">Prestations de qualité</p>
                  <span className="text-xs text-purple-600 font-medium">50+ catégories</span>
                </motion.div>
              </div>

              {/* Floating element */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white text-center">
                  <div className="text-lg font-bold">24/7</div>
                  <div className="text-xs">Support</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-slate-900" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="currentColor">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}
