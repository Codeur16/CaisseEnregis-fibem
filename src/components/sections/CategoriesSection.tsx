'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import {
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  Home,
  Hammer,
  Truck,
  MonitorSmartphone,
  ChefHat,
  Scissors,
  Car,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'
import { fetchServiceCategories } from '@/actions/services';

// Enhanced category mapping with modern colors and gradients
const categoryIcons: Record<string, { icon: any; gradient: string; bgLight: string }> = {
  'Plomberie': { 
    icon: Wrench, 
    gradient: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50'
  },
  'Électricité': { 
    icon: Zap, 
    gradient: 'from-yellow-500 to-orange-600',
    bgLight: 'bg-yellow-50'
  },
  'Peinture': { 
    icon: Paintbrush, 
    gradient: 'from-purple-500 to-pink-600',
    bgLight: 'bg-purple-50'
  },
  'Rénovation': { 
    icon: Home, 
    gradient: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50'
  },
  'Maçonnerie': { 
    icon: Hammer, 
    gradient: 'from-orange-500 to-red-600',
    bgLight: 'bg-orange-50'
  },
  'Chauffage': { 
    icon: Droplets, 
    gradient: 'from-red-500 to-pink-600',
    bgLight: 'bg-red-50'
  },
  'Informatique': { 
    icon: MonitorSmartphone, 
    gradient: 'from-indigo-500 to-purple-600',
    bgLight: 'bg-indigo-50'
  },
  'Déménagement': { 
    icon: Truck, 
    gradient: 'from-teal-500 to-cyan-600',
    bgLight: 'bg-teal-50'
  },
  'Restauration': { 
    icon: ChefHat, 
    gradient: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50'
  },
  'Couture': { 
    icon: Scissors, 
    gradient: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50'
  },
  'Transport': { 
    icon: Car, 
    gradient: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50'
  },
  'Formation': { 
    icon: GraduationCap, 
    gradient: 'from-amber-500 to-yellow-600',
    bgLight: 'bg-amber-50'
  },
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchServiceCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp className="w-4 h-4" />
              Catégories populaires
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explorez nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez une large gamme de services professionnels pour tous vos besoins, réalisés par des experts vérifiés et notés par notre communauté.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category, index) => {
            const iconInfo = categoryIcons[category.name] || { 
              icon: Wrench, 
              gradient: 'from-gray-500 to-gray-600',
              bgLight: 'bg-gray-50'
            };
            
            return (
              <motion.div
                key={category.id}
                custom={index}
                variants={categoryVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                onHoverStart={() => setHoveredCategory(category.id.toString())}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Link
                  href={`/services?category=${category.id}`}
                  className="group block h-full"
                >
                  <div className={`relative ${iconInfo.bgLight} rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-200`}>
                    {/* Hover effect background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${iconInfo.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                    
                    {/* Icon container */}
                    <motion.div 
                      className={`relative w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${iconInfo.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <iconInfo.icon className="w-8 h-8 text-white" />
                      
                      {/* Animated ring on hover */}
                      {hoveredCategory === category.id.toString() && (
                        <motion.div
                          className="absolute inset-0 border-2 border-white rounded-2xl"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Professionnels vérifiés
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{Math.floor(Math.random() * 50) + 10}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div 
                        className="flex justify-center mt-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <ScrollAnimationWrapper type="fadeInUp" delay={0.4}>
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Prêt à trouver le service parfait ?
                </h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  Explorez toutes nos catégories et découvrez des milliers de professionnels prêts à réaliser vos projets
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explorer toutes les catégories
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
