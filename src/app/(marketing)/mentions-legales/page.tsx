'use client'

import { useI18n } from '@/locales/client'

export default function Page() {
  const t = useI18n()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {t('common.legalNotice')}
      </h1>
      <p className="text-gray-600">
        {t('about.underConstruction')}
      </p>
    </div>
  )
}