// locales/client.ts
"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient,useChangeLocale,useCurrentLocale } = createI18nClient({
  // en: () => import('./en'),
  fr: () => import('./fr'),
  // es: () => import('./es'),
  // de: () => import('./de'),
  // it: () => import('./it'),
  // pt: () => import('./pt'),
  // nl: () => import('./nl'),
  // pl: () => import('./pl'),
  // ru: () => import('./ru'),
  // zh: () => import('./zh'),
  // ar: () => import('./ar'),
  // wo: () => import('./wo')
})
 
