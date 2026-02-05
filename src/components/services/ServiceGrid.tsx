'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchServices, fetchServiceCategories } from '@/actions/services';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import ServicesFallback from './ServicesFallback';

interface ServiceGridProps {
  categoryId?: number | null;
}

export default function ServiceGrid({ categoryId }: ServiceGridProps) {
  // Fetch services
  const {
    data: services = [],
    isLoading: servicesLoading,
    error: servicesError
  } = useQuery
      ({
        queryKey: ['services', { category: categoryId }],
        queryFn: () => {
          const params = categoryId ? { category: categoryId } : {};
          return fetchServices(params);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
      });

  // Fetch category info if categoryId is provided
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError
  } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const categories = await fetchServiceCategories();
      return categories.find(cat => cat.id === categoryId) || null;
    },
    enabled: !!categoryId, // Only run this query if categoryId exists
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const isLoading = servicesLoading || categoryLoading;
  const error = servicesError || categoryError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Chargement des services...</p>
      </div>
    );
  }

  // Show comprehensive fallback for errors or no data
  if (error || services.length === 0) {
    return <ServicesFallback />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service: Service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group h-full flex flex-col"
        >
          <div className="relative h-48 bg-linear-to-br from-fibem-primary to-fibem-secondary overflow-hidden">
            <Image
              src={service.image || '/images/placeholder.jpg'}
              alt={service.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Vérifié
            </div>
            <div className="absolute top-3 right-3 bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Disponible
            </div> */}
          </div>

          <div className="p-4 flex flex-col grow">
            {/* <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-sm">{Math.floor(Math.random() * 2) + 4}</span>
              <span className="text-gray-400 text-sm">({Math.floor(Math.random() * 100) + 10} avis)</span>
            </div> */}

            <h3 className="font-bold text-lg text-gray-800 group-hover:text-fibem-primary transition-colors">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{service.category_name}</p>

            {/* <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              France
            </div> */}

            {/* <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-gray-400 text-xs italic">Pas de tags spécifiés</span>
            </div> */}

            <div className="pt-3 border-t mt-auto">
              <p className="font-bold text-fibem-primary">À partir de {service.base_price}€</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}