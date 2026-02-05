'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/ui/Logo'
import { MapPin, Phone, Mail, ChevronRight, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

const GOOGLE_MAPS_FRANCE = 'https://www.google.com/maps/search/51+Rue+du+Gr%C3%A9varin+27200+Vernon'
const GOOGLE_MAPS_SENEGAL = 'https://www.google.com/maps/search/Rue+7+Corniche+x+6+M%C3%A9dina+Dakar'
const WHATSAPP_FRANCE = 'https://wa.me/33605511432'
const WHATSAPP_SENEGAL = 'https://wa.me/221778776932'

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'rates', href: '/services/tarifs' },
  { key: 'functions', href: '/services/prestations' },
  { key: 'solutions', href: '/services' },
  { key: 'jobs', href: '/emploi' },
  { key: 'partners', href: '/contact' },
  { key: 'contact', href: '/contact' },
  { key: 'resources', href: '/actualites' },
] as const

const LABELS = {
  iaPhones: 'Téléphonie IA',
  nav: {
    home: 'Accueil',
    rates: 'Tarifs',
    functions: 'Fonctions',
    solutions: 'Solutions',
    jobs: 'Emploi',
    partners: 'Partenaires',
    contact: 'Contact',
    resources: 'Ressources',
  },
  legalNotice: 'Mentions légales',
  company: {
    france: 'SEN FIBEM — France',
    senegal: 'SEN FIBEM — Sénégal',
    franceAddress: '51 Rue du Grévarin — 27200 Vernon',
    senegalAddress: 'Rue 7 Corniche x 6, Médina, Dakar',
    francePhone: '+33 6 05 51 14 32',
    senegalPhone: '+221 77 877 69 32',
    franceEmail: 'papaomardiop3@gmail.com',
    senegalEmail: 'papaomardiop3@gmail.com',
    franceSiret: 'SIRET: 435 574 937 00032',
    senegalNinea: 'N.I.N.E.A: 30 84 31 62 02 — APE: 7112B Ingénierie Étude Technique',
    phone: 'Tél',
    mobile: 'Port',
    email: 'Email',
  },
  viewOnMaps: 'Voir sur Google Maps',
  newsletter: {
    title: 'Newsletter',
    subtitle: 'Recevez 1 fois/mois des conseils pratiques SEO/SEA et e-commerce.',
    placeholder: 'Votre email',
    button: "S'abonner",
    success: 'Merci pour votre inscription !',
    disclaimer: 'En cliquant, vous serez redirigé(e) vers la page Contact avec votre email pré-rempli.',
  },
  backToTop: 'Retour en haut',
} as const

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Contact page with email pre-filled
    const contactUrl = `/contact?email=${encodeURIComponent(email)}`
    window.location.href = contactUrl
    setSubscribed(true)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-fibem-dark text-white overflow-hidden">
      {/* Top accent lines - yellow + light blue */}
      <div className="h-1 bg-fibem-secondary" />
      <div className="h-0.5 bg-fibem-primary/60" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: Logo, IA button, Nav buttons, Mentions légales */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Logo
                size="md"
                variant="footer"
                withBrand
                href="/"
                brandClassName="text-white"
              />
              <Button
                asChild
                variant="secondary"
                className="rounded-full bg-white/15 hover:bg-fibem-secondary hover:font-nbold text-gray-200 hover:text-fibem-light border-0 h-9 px-4 text-sm font-medium"
              >
                <Link href="/contact">{LABELS.iaPhones}</Link>
              </Button>
            </div>

            {/* Nav buttons grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navLinks.map(({ key, href }) => (
                <Button
                  key={key}
                  asChild
                  variant="secondary"
                  className="rounded-xl bg-white/15 hover:bg-white/25 text-gray-200 border-0 h-10 px-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  <Link href={href}>{LABELS.nav[key]}</Link>
                </Button>
              ))}
            </div>

            {/* Mentions légales */}
            <Link
              href="/mentions-legales"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm group"
            >
              <ChevronRight className="w-4 h-4 text-fibem-primary group-hover:translate-x-0.5 transition-transform" />
              {LABELS.legalNotice}
            </Link>
          </div>

          {/* Middle: France & Senegal contact blocks */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {/* France */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/france-flag.png" //senegal-flag.png
                  alt="Drapeau de la France"
                  width={28}
                  height={20}
                  className="inline-block rounded-sm shadow"
                  aria-hidden
                />
                <h4 className="font-semibold text-base text-white">{LABELS.company.france}</h4>
              </div>
              <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-fibem-primary flex-shrink-0 mt-0.5" />
                  {LABELS.company.franceAddress}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-fibem-primary flex-shrink-0" />
                  <a
                    href="tel:+33605511432"
                    className="text-fibem-primary underline decoration-fibem-primary/60 hover:decoration-fibem-accent/60 hover:text-fibem-accent/90 transition-colors"
                  >
                    {LABELS.company.phone}: {LABELS.company.francePhone}
                  </a>
                </p>
                <p className="text-white/80 text-xs">{LABELS.company.franceSiret}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-fibem-primary flex-shrink-0" />
                  <a
                    href={`mailto:${LABELS.company.franceEmail}`}
                    className="text-fibem-primary underline decoration-fibem-primary/60 hover:decoration-fibem-accent/60 hover:text-fibem-accent/90 transition-colors break-all"
                  >
                    {LABELS.company.email} {LABELS.company.franceEmail}
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="rounded-xl bg-white/15 hover:bg-white/25 text-gray-200 border-0 h-9 gap-1.5"
                >
                  <a href={GOOGLE_MAPS_FRANCE} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4" />
                    {LABELS.viewOnMaps}
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-fibem-whatsapp hover:bg-fibem-whatsapp/90 text-white border-0 h-9 gap-1.5"
                >
                  <a href={WHATSAPP_FRANCE} target="_blank" rel="noopener noreferrer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Senegal */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/senegal-flag.png"
                  alt="Drapeau du Sénégal"
                  width={28}
                  height={20}
                  className="inline-block rounded-sm shadow"
                  aria-hidden
                />
                <h4 className="font-semibold text-base text-white">{LABELS.company.senegal}</h4>
              </div>
              <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-fibem-secondary flex-shrink-0 mt-0.5" />
                  {LABELS.company.senegalAddress}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-fibem-primary flex-shrink-0" />
                  <a
                    href="tel:+221778776932"
                    className="text-fibem-primary underline decoration-fibem-primary/60 hover:decoration-fibem-accent/60 hover:text-fibem-accent/90 transition-colors"
                  >
                    {LABELS.company.mobile}: {LABELS.company.senegalPhone}
                  </a>
                </p>
                <p className="text-white/80 text-xs">{LABELS.company.senegalNinea}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-fibem-primary flex-shrink-0" />
                  <a
                    href={`mailto:${LABELS.company.senegalEmail}`}
                    className="text-fibem-primary underline decoration-fibem-primary/60  hover:decoration-fibem-accent/60 hover:text-fibem-accent/90  transition-colors break-all"
                  >
                    {LABELS.company.email} {LABELS.company.senegalEmail}
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="rounded-xl bg-white/15 hover:bg-white/25 text-gray-200 border-0 h-9 gap-1.5"
                >
                  <a href={GOOGLE_MAPS_SENEGAL} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4" />
                    {LABELS.viewOnMaps}
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-fibem-whatsapp hover:bg-fibem-whatsapp/90 text-white border-0 h-9 gap-1.5"
                >
                  <a href={WHATSAPP_SENEGAL} target="_blank" rel="noopener noreferrer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-semibold text-lg text-white">{LABELS.newsletter.title}</h3>
            <p className="text-sm text-white/85 leading-relaxed">
              {LABELS.newsletter.subtitle}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder={LABELS.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white rounded-xl border-0 text-fibem-dark placeholder:text-gray-500 px-4 py-3 h-11 focus-visible:ring-2 focus-visible:ring-fibem-primary"
                />
                <Button
                  type="submit"
                  className="bg-fibem-accent hover:bg-fibem-accent/90 text-white font-semibold rounded-xl px-5 py-3 h-11 whitespace-nowrap shadow-lg shadow-fibem-accent/25 transition-all hover:shadow-fibem-accent/40"
                >
                  {LABELS.newsletter.button}
                </Button>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {LABELS.newsletter.disclaimer}
              </p>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  {LABELS.newsletter.success}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Back to top - floating button */}
      <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-10">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-fibem-accent hover:bg-fibem-accent/90 text-white flex items-center justify-center shadow-lg shadow-fibem-accent/30 hover:shadow-fibem-accent/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={LABELS.backToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  )
}
