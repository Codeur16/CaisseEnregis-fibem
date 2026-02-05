'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react'
import { fetchServices } from '@/actions/services';
import { useI18n, useScopedI18n } from '@/locales/client';

export default function ServicesSection() {
  const [services, setServices] = useState<Array<{
    id: number;
    title: string;
    provider: string;
    rating: number;
    reviews: number;
    location: string;
    price: string;
    image: string;
    verified: boolean;
    available: boolean;
    tags: string[];
  }>>([]);
  const [loading, setLoading] = useState(true);
  const t = useI18n();
  const tHome = useScopedI18n('home.services');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data: Service[] = await fetchServices();
        // Transform the service data to match the expected format
        const transformedServices = data.map(service => ({
          id: service.id,
          title: service.name,
          provider: service.category_name || t('common.loading'),
          rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5 for demo purposes
          reviews: Math.floor(Math.random() * 100) + 10, // Random review count
          location: 'France', // Placeholder location
          price: tHome('priceFrom', { price: service.base_price.toString() }),
          image: service.image || '/placeholder-image.jpg', // Use service image or placeholder
          verified: true, // Assume all services are verified
          available: true, // Assume all services are available
          tags: [] // Add tags if available in service data
        }));
        setServices(transformedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [t, tHome]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p>{t('services.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {tHome('title')}
              </h2>
              <p className="text-gray-600 max-w-xl">
                {tHome('subtitle')}
              </p>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 text-fibem-primary font-semibold hover:underline"
            >
              {tHome('viewAll')}
            </Link>
          </div>
        </ScrollAnimationWrapper>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.slice(0, 8).map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link
                href={`/services/${service.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-fibem-primary to-fibem-secondary overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg'; // fallback image
                    }}
                  />
                  {service.verified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {tHome('verified')}
                    </div>
                  )}
                  {service.available ? (
                    <div className="absolute top-3 right-3 bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tHome('available')}
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-white text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tHome('busy')}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-sm">{service.rating}</span>
                    <span className="text-gray-400 text-sm">({service.reviews} {tHome('reviews')})</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-fibem-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{service.provider}</p>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.length > 0 ? (
                      service.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-fibem-light text-fibem-primary text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs italic">{tHome('noTags')}</span>
                    )}
                  </div>

                  <div className="pt-3 border-t mt-auto">
                    <p className="font-bold text-fibem-primary">{service.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {services.length > 8 && (
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors"
            >
              {tHome('viewAllButton')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
