'use client'

import { useI18n } from '@/locales/client'

interface SubscriptionPageLayoutProps {
    children: React.ReactNode
    title?: string
    subtitle?: string
}

export function SubscriptionPageLayout({ children, title, subtitle }: SubscriptionPageLayoutProps) {
    const t = useI18n()

    return (
        <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        {title || t('subscriptions.hero.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
                        {subtitle || t('subscriptions.hero.subtitle')}
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}
