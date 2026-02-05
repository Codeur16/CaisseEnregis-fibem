'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, Filter, TrendingUp, Eye, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useState } from 'react'

export default function ActualitesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Données mockées pour les actualités
  const news = [
    {
      id: 1,
      title: 'FIBEM lève 2M€ pour son expansion en Afrique de l\'Ouest',
      excerpt: 'Cette nouvelle levée de fonds permettra à FIBEM d\'accélérer son développement et de renforcer sa présence sur les marchés émergents.',
      category: 'finance',
      author: 'Marie Dubois',
      date: '2024-01-15',
      readTime: '5 min',
      image: '/api/placeholder/400/250',
      featured: true,
      views: 1234,
      tags: ['financement', 'expansion', 'afrique']
    },
    {
      id: 2,
      title: 'Nouveau partenariat stratégique avec la CCI Dakar',
      excerpt: 'FIBEM signe un accord majeur pour faciliter les investissements franco-sénégalais dans le secteur du B2B.',
      category: 'partnership',
      author: 'Jean Martin',
      date: '2024-01-12',
      readTime: '3 min',
      image: '/api/placeholder/400/250',
      featured: false,
      views: 856,
      tags: ['partenariat', 'sénégal', 'cci']
    },
    {
      id: 3,
      title: 'Lancement de la nouvelle plateforme digitale FIBEM 2.0',
      excerpt: 'Découvrez notre nouvelle interface entièrement repensée pour une expérience utilisateur optimale.',
      category: 'technology',
      author: 'Sophie Bernard',
      date: '2024-01-10',
      readTime: '7 min',
      image: '/api/placeholder/400/250',
      featured: true,
      views: 2341,
      tags: ['technologie', 'plateforme', 'innovation']
    },
    {
      id: 4,
      title: 'FIBEM reçoit le prix de l\'innovation B2B 2024',
      excerpt: 'Notre engagement dans la transformation numérique des entreprises récompensé par les plus grands.',
      category: 'award',
      author: 'Pierre Durand',
      date: '2024-01-08',
      readTime: '4 min',
      image: '/api/placeholder/400/250',
      featured: false,
      views: 1567,
      tags: ['prix', 'innovation', 'reconnaissance']
    },
    {
      id: 5,
      title: 'Masterclass : Les clés du succès en B2B international',
      excerpt: 'Retour sur notre événement exclusif avec les leaders du secteur franco-africain.',
      category: 'event',
      author: 'Claire Petit',
      date: '2024-01-05',
      readTime: '6 min',
      image: '/api/placeholder/400/250',
      featured: false,
      views: 923,
      tags: ['événement', 'formation', 'b2b']
    },
    {
      id: 6,
      title: 'Tendances 2024 : Le marché B2B franco-africain en pleine expansion',
      excerpt: 'Analyse complète des opportunités et défis du marché pour cette nouvelle année.',
      category: 'insight',
      author: 'Thomas Leroy',
      date: '2024-01-03',
      readTime: '8 min',
      image: '/api/placeholder/400/250',
      featured: true,
      views: 3456,
      tags: ['tendances', 'marché', 'analyse']
    }
  ]

  const categories = [
    { id: 'all', label: 'Toutes', color: 'bg-fibem-primary' },
    { id: 'finance', label: 'Finance', color: 'bg-green-500' },
    { id: 'partnership', label: 'Partenariats', color: 'bg-fibem-secondary' },
    { id: 'technology', label: 'Technologie', color: 'bg-fibem-accent' },
    { id: 'award', label: 'Récompenses', color: 'bg-purple-500' },
    { id: 'event', label: 'Événements', color: 'bg-blue-500' },
    { id: 'insight', label: 'Analyses', color: 'bg-orange-500' }
  ]

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter(article => article.featured)
  const regularNews = filteredNews.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-linear-to-b from-fibem-surface to-white">
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
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-fibem-secondary text-fibem-dark px-4 py-2">
              Actualités
            </Badge>
            <h1 className="text-4xl text-fibem-light md:text-6xl font-extrabold mb-6 tracking-tight">
              Actualités FIBEM
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez les dernières actualités et tendances du monde B2B franco-africain
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher un article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/90 border-white/20 text-fibem-dark placeholder-gray-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={selectedCategory === category.id ? 
                        `${category.color} hover:opacity-90 text-white` : 
                        'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-fibem-primary" />
              <h2 className="text-3xl font-bold text-fibem-textPrimary">
                Articles mis en avant
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 bg-linear-to-br from-fibem-primary/20 to-fibem-dark/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-fibem-primary/30 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-fibem-secondary text-fibem-dark">
                        {categories.find(c => c.id === article.category)?.label}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-fibem-textPrimary mb-3 group-hover:text-fibem-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-fibem-primary" />
                          </div>
                          <span className="text-sm text-gray-600">{article.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-fibem-primary hover:bg-fibem-primary/10">
                          Lire plus <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Regular News Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-fibem-textPrimary mb-8">
            Tous les articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-48 bg-linear-to-br from-fibem-primary/10 to-fibem-dark/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-fibem-primary/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-fibem-primary/50" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 left-3 bg-fibem-secondary text-fibem-dark text-xs">
                      {categories.find(c => c.id === article.category)?.label}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-fibem-textPrimary mb-2 group-hover:text-fibem-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-fibem-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-fibem-primary" />
                        </div>
                        <span className="text-xs text-gray-600">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-fibem-primary">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-fibem-primary">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-linear-to-r from-fibem-primary to-fibem-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Restez informé
            </h2>
            <p className="text-blue-100 text-lg">
              Recevez nos dernières actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Votre adresse email"
                className="bg-white/90 border-white/20 text-fibem-dark placeholder-gray-500"
              />
              <Button className="bg-fibem-secondary text-fibem-dark hover:bg-fibem-secondary/90">
                S'abonner
              </Button>
            </div>
          </motion.div>
        </div> 
      </section>
    </div>
  )
} 