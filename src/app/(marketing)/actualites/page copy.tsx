// 'use client'

// import { motion } from 'framer-motion'
// import { useScopedI18n } from '@/locales/client'
// import { Calendar, Clock, User, ArrowRight, Search, Filter, TrendingUp, Eye, Share2, Bookmark } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
// import Image from 'next/image'
// import { useState } from 'react'

// export default function ActualitesPage() {
//   const t = useScopedI18n('news')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('all')

//   // Données mockées pour les actualités
//   const news = [
//     {
//       id: 1,
//       title: 'FIBEM lève 2M€ pour son expansion en Afrique de l\'Ouest',
//       excerpt: 'Cette nouvelle levée de fonds permettra à FIBEM d\'accélérer son développement et de renforcer sa présence sur les marchés émergents.',
//       category: 'finance',
//       author: 'Marie Dubois',
//       date: '2024-01-15',
//       readTime: '5 min',
//       image: '/api/placeholder/400/250',
//       featured: true,
//       views: 1234,
//       tags: ['financement', 'expansion', 'afrique']
//     },
//     {
//       id: 2,
//       title: 'Nouveau partenariat stratégique avec la CCI Dakar',
//       excerpt: 'FIBEM signe un accord majeur pour faciliter les investissements franco-sénégalais dans le secteur du B2B.',
//       category: 'partnership',
//       author: 'Jean Martin',
//       date: '2024-01-12',
//       readTime: '3 min',
//       image: '/api/placeholder/400/250',
//       featured: false,
//       views: 856,
//       tags: ['partenariat', 'sénégal', 'cci']
//     },
//     {
//       id: 3,
//       title: 'Lancement de la nouvelle plateforme digitale FIBEM 2.0',
//       excerpt: 'Découvrez notre nouvelle interface entièrement repensée pour une expérience utilisateur optimale.',
//       category: 'technology',
//       author: 'Sophie Bernard',
//       date: '2024-01-10',
//       readTime: '7 min',
//       image: '/api/placeholder/400/250',
//       featured: true,
//       views: 2341,
//       tags: ['technologie', 'plateforme', 'innovation']
//     },
//     {
//       id: 4,
//       title: 'FIBEM reçoit le prix de l\'innovation B2B 2024',
//       excerpt: 'Notre engagement dans la transformation numérique des entreprises récompensé par les plus grands.',
//       category: 'award',
//       author: 'Pierre Durand',
//       date: '2024-01-08',
//       readTime: '4 min',
//       image: '/api/placeholder/400/250',
//       featured: false,
//       views: 1567,
//       tags: ['prix', 'innovation', 'reconnaissance']
//     },
//     {
//       id: 5,
//       title: 'Masterclass : Les clés du succès en B2B international',
//       excerpt: 'Retour sur notre événement exclusif avec les leaders du secteur franco-africain.',
//       category: 'event',
//       author: 'Claire Petit',
//       date: '2024-01-05',
//       readTime: '6 min',
//       image: '/api/placeholder/400/250',
//       featured: false,
//       views: 923,
//       tags: ['événement', 'formation', 'b2b']
//     },
//     {
//       id: 6,
//       title: 'Tendances 2024 : Le marché B2B franco-africain en pleine expansion',
//       excerpt: 'Analyse complète des opportunités et défis du marché pour cette nouvelle année.',
//       category: 'insight',
//       author: 'Thomas Leroy',
//       date: '2024-01-03',
//       readTime: '8 min',
//       image: '/api/placeholder/400/250',
//       featured: true,
//       views: 3456,
//       tags: ['tendances', 'marché', 'analyse']
//     }
//   ]

//   const categories = [
//     { id: 'all', label: 'Toutes', color: 'bg-fibem-primary' },
//     { id: 'finance', label: 'Finance', color: 'bg-green-500' },
//     { id: 'partnership', label: 'Partenariats', color: 'bg-fibem-secondary' },
//     { id: 'technology', label: 'Technologie', color: 'bg-fibem-accent' },
//     { id: 'award', label: 'Récompenses', color: 'bg-purple-500' },
//     { id: 'event', label: 'Événements', color: 'bg-blue-500' },
//     { id: 'insight', label: 'Analyses', color: 'bg-orange-500' }
//   ]

//   const filteredNews = news.filter(article => {
//     const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   const featuredNews = filteredNews.filter(article => article.featured)
//   const regularNews = filteredNews.filter(article => !article.featured)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-fibem-surface to-white">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-fibem-secondary/20 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-fibem-accent/20 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <Badge className="mb-4 bg-fibem-secondary text-fibem-dark px-4 py-2">
//               {t('badge')}
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
//               {t('title')}
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
//               {t('subtitle')}
//             </p>
//           </motion.div>

//           {/* Search and Filter */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="max-w-4xl mx-auto"
//           >
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     placeholder={t('searchPlaceholder')}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 bg-white/90 border-white/20 text-fibem-dark placeholder-gray-500"
//                   />
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                   {categories.map((category) => (
//                     <Button
//                       key={category.id}
//                       variant={selectedCategory === category.id ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={selectedCategory === category.id ? 
//                         `${category.color} hover:opacity-90 text-white` : 
//                         'bg-white/10 border-white/20 text-white hover:bg-white/20'
//                       }
//                     >
//                       {category.label}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Featured News */}
//       {featuredNews.length > 0 && (
//         <section className="max-w-7xl mx-auto px-4 py-16">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-12"
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <TrendingUp className="w-6 h-6 text-fibem-primary" />
//               <h2 className="text-3xl font-bold text-fibem-textPrimary">
//                 {t('featured')}
//               </h2>
//             </div>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {featuredNews.map((article, index) => (
//                 <motion.div
//                   key={article.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="group"
//                 >
//                   <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
//                     <div className="relative h-64 bg-gradient-to-br from-fibem-primary/20 to-fibem-dark/20">
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-20 h-20 bg-fibem-primary/30 rounded-full flex items-center justify-center">
//                           <TrendingUp className="w-10 h-10 text-white" />
//                         </div>
//                       </div>
//                       <Badge className="absolute top-4 left-4 bg-fibem-secondary text-fibem-dark">
//                         {categories.find(c => c.id === article.category)?.label}
//                       </Badge>
//                     </div>
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{article.readTime}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Eye className="w-4 h-4" />
//                           <span>{article.views}</span>
//                         </div>
//                       </div>
//                       <h3 className="text-2xl font-bold text-fibem-textPrimary mb-3 group-hover:text-fibem-primary transition-colors">
//                         {article.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 line-clamp-2">
//                         {article.excerpt}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center">
//                             <User className="w-4 h-4 text-fibem-primary" />
//                           </div>
//                           <span className="text-sm text-gray-600">{article.author}</span>
//                         </div>
//                         <Button variant="ghost" size="sm" className="text-fibem-primary hover:bg-fibem-primary/10">
//                           {t('readMore')} <ArrowRight className="ml-2 w-4 h-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </section>
//       )}

//       {/* Regular News Grid */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold text-fibem-textPrimary mb-8">
//             {t('allNews')}
//           </h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {regularNews.map((article, index) => (
//               <motion.div
//                 key={article.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group"
//               >
//                 <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
//                   <div className="relative h-48 bg-gradient-to-br from-fibem-primary/10 to-fibem-dark/10">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-16 h-16 bg-fibem-primary/20 rounded-full flex items-center justify-center">
//                         <TrendingUp className="w-8 h-8 text-fibem-primary/50" />
//                       </div>
//                     </div>
//                     <Badge className="absolute top-3 left-3 bg-fibem-secondary text-fibem-dark text-xs">
//                       {categories.find(c => c.id === article.category)?.label}
//                     </Badge>
//                   </div>
//                   <CardContent className="p-5">
//                     <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{article.readTime}</span>
//                       </div>
//                     </div>
//                     <h3 className="text-lg font-bold text-fibem-textPrimary mb-2 group-hover:text-fibem-primary transition-colors line-clamp-2">
//                       {article.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {article.excerpt}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 bg-fibem-primary/10 rounded-full flex items-center justify-center">
//                           <User className="w-3 h-3 text-fibem-primary" />
//                         </div>
//                         <span className="text-xs text-gray-600">{article.author}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-fibem-primary">
//                           <Share2 className="w-4 h-4" />
//                         </Button>
//                         <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-fibem-primary">
//                           <Bookmark className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

//       {/* Newsletter CTA */}
//       <section className="bg-gradient-to-r from-fibem-primary to-fibem-dark py-16 px-4">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold">
//               {t('newsletter.title')}
//             </h2>
//             <p className="text-blue-100 text-lg">
//               {t('newsletter.subtitle')}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//               <Input
//                 placeholder={t('newsletter.placeholder')}
//                 className="bg-white/90 border-white/20 text-fibem-dark placeholder-gray-500"
//               />
//               <Button className="bg-fibem-secondary text-fibem-dark hover:bg-fibem-secondary/90">
//                 {t('newsletter.subscribe')}
//               </Button>
//             </div>
//           </motion.div>
// {/* 
// import { useI18n } from '@/locales/client'
// import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'

// interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   category: string
//   date: string
//   readTime: string
//   image: string
//   featured?: boolean
// }

// // Mock Data with Real Images
// const MOCK_POSTS: BlogPost[] = [
//   {
//     id: '1',
//     title: 'Les opportunités d\'emploi au Sénégal en 2025',
//     excerpt: 'Analyse approfondie des secteurs porteurs et des compétences les plus recherchées par les recruteurs cette année.',
//     category: 'Emploi',
//     date: '2025-01-20',
//     readTime: '5 min',
//     image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
//     featured: true
//   },
//   {
//     id: '2',
//     title: 'Comment réussir son entretien d\'embauche en visio',
//     excerpt: 'Nos conseils d\'experts pour maîtriser l\'art de l\'entretien à distance et convaincre les recruteurs.',
//     category: 'Conseils RH',
//     date: '2025-01-18',
//     readTime: '4 min',
//     image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '3',
//     title: 'Le télétravail : Norme ou exception ?',
//     excerpt: 'État des lieux de la pratique du télétravail dans les entreprises françaises et sénégalaises.',
//     category: 'Tendance',
//     date: '2025-01-15',
//     readTime: '6 min',
//     image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '4',
//     title: 'SEN FIBEM lance sa nouvelle plateforme',
//     excerpt: 'Découvrez les nouvelles fonctionnalités conçues pour faciliter la mise en relation entre candidats et recruteurs.',
//     category: 'News FIBEM',
//     date: '2025-01-10',
//     readTime: '3 min',
//     image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '5',
//     title: 'Les soft skills indispensables pour les managers',
//     excerpt: 'Au-delà des compétences techniques, quelles sont les qualités humaines qui font un bon leader ?',
//     category: 'Management',
//     date: '2025-01-05',
//     readTime: '5 min',
//     image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '6',
//     title: 'Droit du travail : Ce qui change cette année',
//     excerpt: 'Un récapitulatif des nouvelles réformes législatives impactant les contrats de travail et les cotisations.',
//     category: 'Juridique',
//     date: '2024-12-28',
//     readTime: '7 min',
//     image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '7',
//     title: 'L\'importance de la formation continue',
//     excerpt: 'Pourquoi il est crucial de continuer à se former tout au long de sa carrière professionnelle.',
//     category: 'Formation',
//     date: '2024-12-20',
//     readTime: '4 min',
//     image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '8',
//     title: 'Entreprendre au Sénégal : Guide pratique',
//     excerpt: 'Les étapes clés pour créer son entreprise et les pièges à éviter pour les jeunes entrepreneurs.',
//     category: 'Entrepreneuriat',
//     date: '2024-12-15',
//     readTime: '8 min',
//     image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '9',
//     title: 'La digitalisation des services RH',
//     excerpt: 'Comment les outils numériques transforment la gestion des ressources humaines au quotidien.',
//     category: 'Tech & RH',
//     date: '2024-12-10',
//     readTime: '5 min',
//     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
//   },
//   {
//     id: '10',
//     title: 'Événement : Salon de l\'emploi à Dakar',
//     excerpt: 'Retour en images sur le dernier salon de l\'emploi organisé par SEN FIBEM.',
//     category: 'Événement',
//     date: '2024-12-05',
//     readTime: '2 min',
//     image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
//   }
// ]

// export default function ActualitesPage() {
//   const t = useI18n()
//   const featuredPost = MOCK_POSTS.find(p => p.featured) || MOCK_POSTS[0]
//   const otherPosts = MOCK_POSTS.filter(p => p.id !== featuredPost.id)

//   return (
//     <div className="bg-slate-50 min-h-screen pb-20">
//       {/* Hero Section */}
//       {/* <section className="bg-white border-b border-gray-100 py-16 lg:py-24">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <Badge className="mb-4 bg-fibem-primary/10 text-fibem-primary hover:bg-fibem-primary/20 transition-colors border-none px-4 py-1.5 text-sm font-medium rounded-full">
//               Blog & News
//             </Badge>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
//               Actualités & <span className="text-fibem-primary">Insights</span>
//             </h1>
//             <p className="text-xl text-slate-500 leading-relaxed">
//               Toutes les dernières nouvelles, analyses et tendances sur l'emploi,
//               l'entrepreneuriat et le business entre la France et le Sénégal.
//             </p>
//           </div> */}

//           {/* Featured Post */}
//           {/* <div className="max-w-6xl mx-auto">
//             <Link href={`#`} className="group block relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
//               <div className="grid md:grid-cols-2 h-full bg-slate-900">
//                 <div className="h-64 md:h-auto w-full relative overflow-hidden">
//                   <img
//                     src={featuredPost.image}
//                     alt={featuredPost.title}
//                     className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
//                   />
//                 </div>
//                 <div className="p-8 md:p-12 flex flex-col justify-center text-white relative z-10">
//                   <div className="flex items-center gap-4 mb-6 text-sm font-medium text-slate-300">
//                     <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white">
//                       <Tag className="w-3.5 h-3.5" />
//                       {featuredPost.category}
//                     </span>
//                     <span className="flex items-center gap-1.5">
//                       <Calendar className="w-4 h-4" />
//                       {new Date(featuredPost.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-fibem-primary/90 transition-colors">
//                     {featuredPost.title}
//                   </h2>
//                   <p className="text-lg text-slate-300 mb-8 line-clamp-3">
//                     {featuredPost.excerpt}
//                   </p>
//                   <span className="inline-flex items-center gap-2 text-fibem-primary font-bold uppercase tracking-wide text-sm group-hover:translate-x-1 transition-transform">
//                     Lire l'article <ArrowRight className="w-4 h-4" />
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </section> */}

//       {/* Grid Section */}
//       {/* <section className="container mx-auto px-4 py-16 max-w-7xl">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {otherPosts.map((post) => (
//             <Link
//               key={post.id}
//               href={`#`}
//               className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
//             > */}
//               {/* Image */}
//               {/* <div className="h-48 w-full relative overflow-hidden">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
//                 />
//                 <div className="absolute top-4 left-4 z-10">
//                   <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-full text-slate-800 shadow-sm uppercase tracking-wider">
//                     {post.category}
//                   </span>
//                 </div>
//               </div> */}

//               {/* Content */}
//               {/* <div className="p-6 flex flex-col flex-grow">
//                 <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
//                   <span className="flex items-center gap-1">
//                     <Calendar className="w-3.5 h-3.5" />
//                     {new Date(post.date).toLocaleDateString()}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-3.5 h-3.5" />
//                     {post.readTime}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-fibem-primary transition-colors">
//                   {post.title}
//                 </h3>

//                 <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
//                   {post.excerpt}
//                 </p>

//                 <div className="mt-auto">
//                   <span className="inline-flex items-center gap-1.5 text-fibem-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
//                     Lire l'article <ArrowRight className="w-3.5 h-3.5" />
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div> */}

//         {/* Load More */}
//          {/* <div className="mt-16 text-center">
//           <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-300 text-slate-600 hover:text-fibem-primary hover:border-fibem-primary transition-all">
//             Charger plus d'articles
//           </Button> 
//         </div> */}
//       </section>
//     </div>
//   )
// } 