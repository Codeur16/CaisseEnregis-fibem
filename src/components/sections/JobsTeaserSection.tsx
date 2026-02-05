'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type JobKey = 'job1' | 'job2' | 'job3'

interface Job {
  key: JobKey
  title: string
  company: string
  location: string
  type: string
  description: string
}

const jobs: Job[] = [
  {
    key: 'job1',
    title: 'Développeur Full Stack',
    company: 'FIBEM Tech',
    location: 'Paris, France',
    type: 'Temps plein',
    description: 'Rejoignez notre équipe de développement pour construire la plateforme de demain'
  },
  {
    key: 'job2',
    title: 'Commercial B2B',
    company: 'FIBEM Sales',
    location: 'Dakar, Sénégal',
    type: 'Temps plein',
    description: 'Développez notre portefeuille clients et contribuez à notre croissance'
  },
  {
    key: 'job3',
    title: 'Chef de Produit Digital',
    company: 'FIBEM Product',
    location: 'Remote',
    type: 'Temps plein',
    description: 'Pilotez l\'évolution de nos produits et définissez notre stratégie digitale'
  },
]

export default function JobsTeaserSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <section className="py-20 bg-fibem-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-fibem-dark mb-2">
              <Briefcase className="w-8 h-8 text-fibem-secondary" />
              Opportunités de Carrière
            </div>
            <p className="text-fibem-muted">
              Rejoignez notre équipe et grandissez avec nous
            </p>
          </motion.div>

          {/* Jobs list */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {jobs.map((job, index) => (
              <div key={job.key}>
                <div className="p-4 sm:p-6 hover:bg-fibem-surface/50 transition-colors cursor-pointer group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-10 h-10 bg-fibem-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-fibem-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-fibem-dark group-hover:text-fibem-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-fibem-muted">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                          <span className="px-2 py-0.5 bg-fibem-surface rounded text-xs font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-fibem-muted group-hover:text-fibem-primary group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>
                </div>
                {index < jobs.length - 1 && <Separator />}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link href="/emploi">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-fibem-primary text-fibem-primary hover:bg-fibem-primary hover:text-white"
              >
                Voir toutes les offres
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/emploi/publier">
              <Button className="w-full sm:w-auto bg-fibem-accent hover:bg-fibem-accent/90 text-white">
                Publier une offre
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
