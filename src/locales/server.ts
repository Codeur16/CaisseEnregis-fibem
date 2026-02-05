// locales/server.ts
import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
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