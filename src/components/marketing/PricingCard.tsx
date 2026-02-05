'use client'

import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
    title: string
    subtitle: string
    price: string
    description: string
    features: string[]
    cta: string
    popular?: boolean
    monthlyText?: string
    onSelect?: () => void
}

export function PricingCard({
    title,
    subtitle,
    price,
    description,
    features,
    cta,
    popular,
    monthlyText,
    onSelect
}: PricingCardProps) {
    return (
        <div className={cn(
            "relative flex flex-col p-6 bg-white rounded-2xl border transition-all duration-300",
            popular
                ? "border-fibem-primary shadow-xl scale-105 z-10"
                : "border-gray-200 shadow-md hover:shadow-lg"
        )}>
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-fibem-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Le plus populaire
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm h-10">{subtitle}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">{price}</span>
                    {price !== 'Gratuit' && price !== 'Free' && price !== 'Sur devis' && price !== 'Custom' && (
                        <span className="text-gray-500 font-medium">{monthlyText || '/mois'}</span>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-2 min-h-[40px]">{description}</p>
            </div>

            <div className="flex-grow mb-8 space-y-4">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                ))}
            </div>

            <Button
                onClick={onSelect}
                className={cn(
                    "w-full rounded-xl py-6 font-bold transition-all",
                    popular
                        ? "bg-fibem-primary hover:bg-fibem-primary/90 text-white shadow-lg hover:shadow-fibem-primary/25"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                )}
            >
                <span>{cta}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    )
}
