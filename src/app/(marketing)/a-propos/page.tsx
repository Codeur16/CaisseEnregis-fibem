'use client'

import { motion } from 'framer-motion'
import { Target, Users, Shield, TrendingUp, Award, Globe, CheckCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AproposPage() {
  const values = [
    {
      icon: Target,
      title: 'Expertise',
      description: 'Une connaissance approfondie du tissu économique pour des transactions sécurisées',
      color: 'from-fibem-primary to-fibem-secondary',
      iconBg: 'bg-blue-100',
      iconColor: 'text-fibem-primary'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Annonces vérifiées et processus sécurisés pour protéger acheteurs et vendeurs',
      color: 'from-green-600 to-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Une plateforme digitale moderne pour faciliter les transactions B2B',
      color: 'from-fibem-accent to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-fibem-accent'
    },
  ]

  const stats = [
    { value: '10+', label: 'Années d\'expertise', icon: Award },
    { value: '500+', label: 'Entreprises listées', icon: Briefcase },
    { value: '95%', label: 'Taux de satisfaction', icon: CheckCircle },
    { value: '2', label: 'Pays (France & Sénégal)', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-fibem-primary via-fibem-dark to-fibem-primary/90 py-20">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl text-fibem-light md:text-6xl font-extrabold mb-6 tracking-tight">
              Accompagner la transmission d'entreprise au cœur de Madagascar
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              FIBEM facilite l'achat et la vente d'entreprises (Fonds de commerce, PME, TPE) avec professionnalisme et transparence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-6">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                FIBEM est née d'une vision claire : professionnaliser le marché de la transmission d'entreprises à Madagascar et en Afrique francophone. Face à un marché informel et fragmenté, nous avons créé une plateforme digitale moderne pour sécuriser et faciliter les transactions B2B.
              </p>
              <p>
                Notre mission est de connecter vendeurs et acheteurs d'entreprises dans un environnement sécurisé, transparent et professionnel. Nous accompagnons chaque transaction avec expertise et rigueur, de l'évaluation initiale jusqu'à la finalisation de la vente.
              </p>
              <p>
                Aujourd'hui, FIBEM est devenue la référence pour l'achat et la vente d'entreprises, avec une présence établie en France et au Sénégal, et une expansion continue vers de nouveaux marchés.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-linear-to-br from-fibem-primary to-fibem-secondary rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Notre Vision</h3>
                    <p className="text-blue-100">Transformer le marché B2B africain</p>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  Devenir la plateforme de référence pour toutes les transactions d'entreprises en Afrique francophone, en apportant transparence, sécurité et professionnalisme à chaque étape du processus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-fibem-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
              Nos Valeurs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-fibem-dark mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* L'Impact FIBEM */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
            L'Impact FIBEM
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des chiffres qui témoignent de notre engagement et de notre croissance
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-linear-to-br from-fibem-primary to-fibem-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-fibem-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
              Une Équipe Dédiée
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des experts passionnés au service de vos transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Experts en évaluation', desc: 'Valorisation précise de votre entreprise' },
              { role: 'Conseillers juridiques', desc: 'Sécurisation de toutes les étapes légales' },
              { role: 'Accompagnement commercial', desc: 'Support personnalisé tout au long du processus' },
            ].map((team, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-fibem-light rounded-2xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-linear-to-br from-fibem-primary to-fibem-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-fibem-dark mb-3">{team.role}</h3>
                <p className="text-gray-600">{team.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-linear-to-r from-fibem-dark to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Commencer votre projet aujourd'hui
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises qui nous font confiance pour leurs transactions B2B
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl text-lg"
            >
              Démarrer maintenant
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

