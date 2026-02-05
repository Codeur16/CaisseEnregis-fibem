'use client'

import { motion } from 'framer-motion'
import { UserSearch, Handshake, GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function emploiPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as any, stiffness: 100 },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-fibem-primary to-fibem-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Façonnez l'avenir du B2B avec FIBEM
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Que vous soyez un expert, un recruteur ou un jeune talent, trouvez votre place dans notre écosystème.
          </motion.p>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-fibem-secondary/20 rounded-full blur-3xl" />
      </section>

      {/* Trust Bar */}
      <section className="bg-fibem-light py-8 border-y border-blue-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-fibem-primary mb-1">Réseau National</span>
              <div className="h-1 w-12 bg-fibem-accent rounded-full" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-fibem-primary mb-1">+500 Offres</span>
              <div className="h-1 w-12 bg-fibem-accent rounded-full" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-fibem-primary mb-1">Accompagnement Expert</span>
              <div className="h-1 w-12 bg-fibem-accent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Portal Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Card A: Candidates */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 border border-fibem-light shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-fibem-light rounded-xl flex items-center justify-center mb-8 group-hover:bg-fibem-primary transition-colors duration-300">
                <UserSearch className="w-8 h-8 text-fibem-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-fibem-dark mb-4">Candidats</h3>
              <p className="text-gray-600 mb-10 leading-relaxed min-h-[80px]">
                Identifiez les talents stratégiques pour vos transactions et votre croissance.
              </p>
              <Link
                href="/emploi/candidat"
                className="inline-flex items-center gap-3 px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Rechercher des offres d'emploi
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Card B: Recruiters */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 border border-fibem-light shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-fibem-light rounded-xl flex items-center justify-center mb-8 group-hover:bg-fibem-primary transition-colors duration-300">
                <Handshake className="w-8 h-8 text-fibem-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-fibem-dark mb-4">Recruteurs</h3>
              <p className="text-gray-600 mb-10 leading-relaxed min-h-[80px]">
                Propulsez votre carrière et accédez aux meilleures opportunités d'achat-vente.
              </p>
              <Link
                href="/emploi/recruteur"
                className="inline-flex items-center gap-3 px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Publier une offre
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Card C: Interns */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 border border-fibem-light shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-fibem-light rounded-xl flex items-center justify-center mb-8 group-hover:bg-fibem-primary transition-colors duration-300">
                <GraduationCap className="w-8 h-8 text-fibem-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-fibem-dark mb-4">Stagiaires</h3>
              <p className="text-gray-600 mb-10 leading-relaxed min-h-[80px]">
                Recherchez des stages et des opportunités de formation pour lancer votre carrière.
              </p>
              <Link
                href="/emploi/stagiaire"
                className="inline-flex items-center gap-3 px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Rechercher des stages
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}