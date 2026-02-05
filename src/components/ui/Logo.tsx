'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/logo.png'
const DEFAULT_ALT = 'FIBEM'

const sizeConfig = {
  xs: { px: 24, container: 'w-10 h-10' },
  sm: { px: 48, container: 'w-12 h-12' },
  md: { px: 64, container: 'w-14 h-14 sm:w-16 sm:h-16' },
  lg: { px: 80, container: 'w-16 h-16 lg:w-20 lg:h-20' },
  xl: { px: 96, container: 'w-auto h-auto' },
  icon: { px: 24, container: 'w-12 h-12' }, // pour cartes, petites vignettes
} as const

const variantConfig = {
  default: 'bg-white rounded-xl p-0.5 m-1 shadow-sm',
  header: 'bg-fibem-white rounded-xl p-2 group-hover:scale-105 transition-transform duration-200',
  footer: 'bg-white/90 rounded-2xl p-1.5 ring-1 ring-white/20 overflow-hidden shrink-0',
  navbar: 'bg-white/90 rounded-xl p-1 ring-1 ring-white/20 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200',
  auth: 'bg-white/100 backdrop-blur-sm rounded-xl p-2 border border-white/20 group-hover:border-white/40 transition-all',
  card: 'bg-gradient-to-br from-fibem-white to-fibem-background border-2 border-fibem-border rounded-xl flex items-center justify-center',
  minimal: '',
} as const

export type LogoSize = keyof typeof sizeConfig
export type LogoVariant = keyof typeof variantConfig

export interface LogoProps {
  /** Taille prédéfinie */
  size?: LogoSize
  /** Style visuel selon le contexte */
  variant?: LogoVariant
  /** Afficher le texte "FIBEM" à côté */
  withBrand?: boolean
  /** Sous-titre à afficher sous "FIBEM" (ex: traduction) */
  withSubtitle?: string
  /** Lien de destination (undefined = pas de lien) */
  href?: string | null
  /** Priorité de chargement (above-the-fold) */
  priority?: boolean
  /** Texte alternatif de l'image */
  alt?: string
  /** Classes CSS pour le conteneur principal */
  className?: string
  /** Classes CSS pour l'image */
  imageClassName?: string
  /** Classes CSS pour le texte du brand */
  brandClassName?: string
  /** Élément décoratif à afficher sous le texte FIBEM (ex: ligne) */
  brandDecoration?: React.ReactNode
  /** Animation au survol (scale/rotate) */
  animate?: boolean
}

export default function Logo({
  size = 'lg',
  variant = 'default',
  withBrand = false,
  withSubtitle,
  href = '/',
  priority = false,
  alt = DEFAULT_ALT,
  className,
  imageClassName,
  brandClassName,
  brandDecoration,
  animate = false,
}: LogoProps) {
  const { px, container } = sizeConfig[size]
  const variantStyles = variantConfig[variant]
  const hasContainer = variant !== 'minimal'

  const content = (
    <>
      <div
        className={cn(
          hasContainer && container,
          hasContainer && variantStyles,
          'flex items-center justify-center',
          className
        )}
      >
        {animate ? (
          <motion.div whileHover={{ scale: 1.05, rotate: 3 }} className="flex items-center justify-center w-full h-full">
            <Image
              src={LOGO_SRC}
              width={px}
              height={px}
              alt={alt}
              className={cn('object-contain', imageClassName)}
              priority={priority}
            />
          </motion.div>
        ) : (
          <Image
            src={LOGO_SRC}
            width={px}
            height={px}
            alt={alt}
            className={cn('object-contain', imageClassName)}
            priority={priority}
          />
        )}
      </div>
      {(withBrand || withSubtitle) && (
        <div className={cn('flex flex-col', brandClassName)}>
          {withBrand && (
            <>
              <span
                className={cn(
                  'font-bold',
                  size === 'xs' && 'text-sm',
                  size === 'sm' && 'text-base',
                  size === 'md' && 'text-xl',
                  size === 'lg' && 'text-xl',
                  size === 'xl' && 'text-2xl',
                  size === 'icon' && 'text-sm'
                )}
              >
                FIBEM
              </span>
              {brandDecoration}
            </>
          )}
          {typeof withSubtitle === 'string' && (
            <span className="text-sm text-white/70">{withSubtitle}</span>
          )}
        </div>
      )}
    </>
  )

  const wrapperClassName = 'inline-flex items-center gap-2 sm:gap-3 group'

  if (href) {
    return (
      <Link href={href} className={wrapperClassName}>
        {content}
      </Link>
    )
  }

  return <div className={wrapperClassName}>{content}</div>
}
