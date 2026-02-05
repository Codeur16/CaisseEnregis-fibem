'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchServiceCategories } from '@/actions/services';
import ServiceGrid from '@/components/services/ServiceGrid';
import { useI18n } from '@/locales/client';

export default function ServicePage() {
  const t = useI18n();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category') ? Number(searchParams.get('category')) : null;

  // Fetch category info if categoryId is provided
  const {
    data: category,
    isLoading: categoryLoading
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-fibem-primary hover:underline font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t('common.back')}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {categoryId && category ? `${t('services.title')} : ${category.name}` :
         categoryId && categoryLoading ? `${t('services.categoryLoading')}` :
         t('services.title')}
      </h1>
      <Suspense fallback={<div className="flex justify-center items-center h-64"><p>{t('services.loading')}</p></div>}>
        <ServiceGrid categoryId={categoryId} />
      </Suspense>
    </div>
  )
}