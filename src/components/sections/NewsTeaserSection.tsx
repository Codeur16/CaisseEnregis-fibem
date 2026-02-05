'use client'

import { motion } from 'framer-motion'
import { Newspaper, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ArticleKey = 'article1' | 'article2' | 'article3'

interface Article {
  key: ArticleKey
  title: string
  category: string
  date: string
  excerpt: string
  categoryColor: string
}

const articles: Article[] = [
  {
    key: 'article1',
    title: 'Lancement de notre nouvelle plateforme POS',
    category: 'Produit',
    date: '15 Janvier 2024',
    excerpt: 'Découvrez notre nouvelle solution de point de vente entièrement repensée pour les commerçants modernes',
    categoryColor: 'bg-fibem-primary'
  },
  {
    key: 'article2',
    title: 'Expansion internationale : FIBEM débarque en Europe',
    category: 'Actualité',
    date: '10 Janvier 2024',
    excerpt: 'Notre stratégie de croissance continue avec l\'ouverture de nouveaux marchés européens',
    categoryColor: 'bg-fibem-accent'
  },
  {
    key: 'article3',
    title: 'Les tendances du commerce digital en 2024',
    category: 'Analyse',
    date: '5 Janvier 2024',
    excerpt: 'Expertise et perspectives sur l\'avenir du commerce en ligne et des solutions omnicanal',
    categoryColor: 'bg-purple-600'
  },
]

export default function NewsTeaserSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-fibem-dark mb-2">
              <Newspaper className="w-8 h-8 text-fibem-primary" />
              Actualités FIBEM
            </div>
            <p className="text-fibem-muted">
              Découvrez nos dernières nouvelles et actualités
            </p>
          </motion.div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.key}
                variants={itemVariants}
                custom={index}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-fibem-surface to-fibem-border overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-fibem-muted/30" />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-fibem-dark/0 group-hover:bg-fibem-dark/20 transition-all duration-300 flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Category badge */}
                    <Badge className={`${article.categoryColor} text-white text-xs mb-3`}>
                      {article.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="font-bold text-fibem-dark mb-3 group-hover:text-fibem-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-fibem-muted">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>

                    {/* Read more link */}
                    <Link 
                      href="/actualites"
                      className="inline-flex items-center gap-1 text-fibem-primary text-sm font-medium mt-4 hover:underline group/link"
                    >
                      Lire la suite
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-10"
          >
            <Link 
              href="/actualites"
              className="inline-flex items-center gap-2 text-fibem-primary hover:text-fibem-primary/80 font-semibold group"
            >
              Voir toutes les actualités
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
