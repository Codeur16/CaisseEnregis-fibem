'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { useSession, signOut } from 'next-auth/react'
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  UserPlus,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronRight
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSearchStore } from '@/stores/searchStore'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface SubMenuItem {
  label: string
  href: string
  children?: SubMenuItem[]
}

interface MenuItem {
  label: string
  href: string
  submenu?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/a-propos' },
  { label: 'news', href: '/actualites' },
  // {
  //   label: 'services',
  //   href: '/services',
  //   submenu: [
  //     { label: 'serviceOfferings', href: '/services/prestations' },
  //     { label: 'rates', href: '/services/tarifs' },
  //     { label: 'brochure', href: '/services/plaquette' },
  //     { label: 'cvForm', href: '/services/formulaire-cv' },
  //     { label: 'timesheet', href: '/services/feuille-heures' },
  //     { label: 'candidateSheet', href: '/services/fiche-candidat' },
  //     { label: 'establishmentSheet', href: '/services/fiche-etablissement' },
  //     { label: 'quoteTemplate', href: '/services/modele-devis' },
  //     { label: 'invoiceTemplate', href: '/services/modele-facture' },
  //     { label: 'creditNoteTemplate', href: '/services/modele-avoir' },
  //     { label: 'otherSites', href: '/services/autres-sites' },
  //   ]
  // },
  {
    label: 'jobs',
    href: '/emploi',
    submenu: [
      { label: 'candidateSpace', href: '/emploi/candidat' },
      { label: 'recruiterSpace', href: '/emploi/recruteur' },
      { label: 'internSpace', href: '/emploi/stagiaire' },
      { label: 'subscriptions', href: '/emploi/abonnements' },
      { label: 'internSubscription', href: '/emploi/abonnements/stagiaire' },
      { label: 'candidateSubscription', href: '/emploi/abonnements/candidat' },
      { label: 'individualSubscription', href: '/emploi/abonnements/particuliers' },
      { label: 'freelancerSubscription', href: '/emploi/abonnements/freelance' },
      { label: 'professionalSubscription', href: '/emploi/abonnements/professionnels' },
      { label: 'partnerSubscription', href: '/emploi/abonnements/partenaires' },
    ]
  },
  { label: 'contact', href: '/contact' },
]

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', img: '/flags/france.png' },
  { code: 'en', name: 'English', flag: '🇬🇧', img: '/flags/usa.png' },
]

const LABELS = {
  menu: {
    home: 'Accueil',
    about: 'À propos',
    news: 'Actualités',
    jobs: 'Emploi',
    candidateSpace: 'Espace Candidat',
    recruiterSpace: 'Espace Recruteur',
    internSpace: 'Espace Stagiaire',
    subscriptions: 'Abonnements',
    internSubscription: 'Abonnement Stagiaire',
    candidateSubscription: 'Abonnement Candidat',
    individualSubscription: 'Abonnement Particuliers',
    freelancerSubscription: 'Abonnement Freelance',
    professionalSubscription: 'Abonnement Professionnels',
    partnerSubscription: 'Abonnement Partenaires',
    contact: 'Contact',
  },
  searchPlaceholder: 'Rechercher...',
  searchOnFibem: 'Rechercher sur FIBEM...',
  account: 'Mon Compte',
  dashboard: 'Tableau de bord',
  profile: 'Mon profil',
  settings: 'Paramètres',
  logout: 'Déconnexion',
  login: 'Connexion',
  signup: 'Inscription',
  chooseLanguage: 'Choisir la langue',
} as const

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { setOpen } = useSearchStore()
  const scrollProgress = useScrollProgress()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [notificationCount] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Scroll progress bar - left to right */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-fibem-secondary/50 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-fibem-dark vvia-fibem-primary/50 to-fibem-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Single navbar bar - dark theme */}
      <div className="bg-fibem-secondary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-2">
            {/* Left: Logo + Téléphonie IA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Logo
                size="md"
                variant="navbar"
                withBrand
                href="/"
                priority
                alt={LABELS.searchOnFibem}
                brandClassName="hidden sm:flex flex-col text-white text-base lg:text-lg"
              />
            </div>

            {/* Center: Search + Nav links (desktop) */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen(true)}
                className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">{LABELS.searchPlaceholder}</span>
              </Button>
              <NavigationMenu className="max-w-fit">
                <NavigationMenuList className="gap-0">
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.submenu ? (
                        <>
                          <NavigationMenuTrigger
                            className="text-white/90 hover:text-white hover:bg-white/10 font-medium bg-transparent data-[state=open]:bg-white/10 h-9 px-3 rounded-lg text-sm"
                            onClick={() => router.push(item.href)}
                          >
                            {LABELS.menu[item.label as keyof typeof LABELS.menu]}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-fibem-secondary border border-white/10 rounded-xl shadow-xl">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.href} className={subItem.label.startsWith('subscriptions') ? 'col-span-2' : ''}>
                                  {subItem.label.startsWith('subscriptions') ? (
                                    <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider border-b border-white/10 mb-2">
                                      {LABELS.menu[subItem.label as keyof typeof LABELS.menu]}
                                    </div>
                                  ) : (
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={subItem.href}
                                        className={cn(
                                          "flex select-none rounded-lg p-3 text-white/90 hover:text-white hover:bg-white/10 outline-none transition-all duration-200 group",
                                          pathname === subItem.href || pathname?.startsWith(`${subItem.href}/`) ? "text-white bg-fibem-accent shadow-md" : ""
                                        )}
                                      >
                                        <ChevronRight className="w-4 h-4 text-fibem-primary mr-2 shrink-0" />
                                        <span className="text-sm font-medium">{LABELS.menu[subItem.label as keyof typeof LABELS.menu]}
                                        </span>
                                      </Link>
                                    </NavigationMenuLink>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "text-white/90 hover:text-white hover:bg-white/10 font-medium bg-transparent h-9 px-3 rounded-lg text-sm transition-all duration-200",
                              (item.href === '/' ? pathname === '/' : pathname === item.href || pathname?.startsWith(`${item.href}/`)) ? "text-white bg-fibem-accent shadow-lg" : ""
                            )}
                          >
                            {LABELS.menu[item.label as keyof typeof LABELS.menu]}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right: Language, Search (mobile), User, Cart, CTA */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(true)}
                className="lg:hidden h-9 w-9 text-white/90 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Language selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-2 sm:px-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-1.5 shrink-0"
                  >
                    <img
                      src="/flags/france.png"
                      alt="Français"
                      width={20}
                      height={20}
                      style={{ display: 'inline', verticalAlign: 'middle' }}
                    />
                    <span className="hidden sm:inline text-xs font-medium uppercase">FR</span>
                    <ChevronDown className="w-3 h-3 shrink-0 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-fibem-secondary border-white/10">
                  <DropdownMenuLabel className="text-white/80">{LABELS.chooseLanguage}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      className="cursor-not-allowed text-white/60 opacity-50"
                    >
                      {lang.img && (
                        <img
                          src={lang.img}
                          alt={lang.name}
                          width={20}
                          height={20}
                          style={{ display: 'inline', verticalAlign: 'middle' }}
                        />
                      )}
                      <span className="text-sm">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-white/90 hover:text-white hover:bg-white/10 rounded-full relative shrink-0">
                      <Bell className="w-5 h-5" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-fibem-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-fibem-secondary border-white/10">
                    <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <div className="p-4 text-center text-white/60 text-sm">Aucune notification</div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-white/90 hover:text-white hover:bg-white/10 rounded-full shrink-0">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-fibem-secondary border-white/10">
                  {session ? (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-white">{session.user?.first_name || LABELS.account}</p>
                        <p className="text-xs text-white/60 truncate">{session.user?.email}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer flex items-center gap-2 text-white/90 hover:text-white">
                          <LayoutDashboard className="w-4 h-4" />
                          {LABELS.dashboard}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profil" className="cursor-pointer flex items-center gap-2 text-white/90 hover:text-white">
                          <User className="w-4 h-4" />
                          {LABELS.profile}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/parametres" className="cursor-pointer flex items-center gap-2 text-white/90 hover:text-white">
                          <Settings className="w-4 h-4" />
                          {LABELS.settings}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer flex items-center gap-2 text-fibem-accent">
                        <LogOut className="w-4 h-4" />
                        {LABELS.logout}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="text-white">{LABELS.login}</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild>
                        <Link href="/connexion" className="cursor-pointer flex items-center justify-between text-white/90 hover:text-white">
                          {LABELS.login}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/inscription" className="cursor-pointer flex items-center justify-between text-fibem-secondary font-medium">
                          {LABELS.signup}
                          <UserPlus className="w-4 h-4" />
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {!session && (
                <div className="hidden sm:flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm" className="h-9 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-sm shrink-0">
                    <Link href="/connexion">{LABELS.login}</Link>
                  </Button>
                  <Button asChild size="sm" className="h-9 rounded-full px-4 bg-fibem-accent hover:bg-fibem-accent/90 text-white font-semibold text-sm shrink-0">
                    <Link href="/inscription" className="flex items-center gap-2">
                      {LABELS.signup}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-white/90 hover:text-white hover:bg-white/10 rounded-full relative shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-fibem-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-fibem-secondary border-white/10">
                  <DropdownMenuLabel className="text-white">{t('cart')}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <div className="p-4 text-center text-white/60 text-sm">
                    {cartCount === 0 ? t('emptyCart') : `${cartCount} article(s)`}
                  </div>
                  {cartCount > 0 && (
                    <>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild>
                        <Link href={`/${currentLocale}/panier`} className="cursor-pointer flex items-center justify-between text-white/90 hover:text-white">
                          {t('viewCart')}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu> */}

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 text-white hover:bg-white/10 rounded-full shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-fibem-secondary/95">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200",
                      (item.href === '/' ? pathname === '/' : pathname === item.href || pathname?.startsWith(`${item.href}/`)) ? "text-white bg-fibem-accent shadow-md" : ""
                    )}
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{LABELS.menu[item.label as keyof typeof LABELS.menu]}</span>
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    )}
                  </Link>
                  {item.submenu && (
                    <div className="pl-6 pr-4 pb-3 space-y-2 border-l-2 border-white/20 ml-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block py-2 text-sm text-white/70 hover:text-white transition-all duration-200 rounded px-2",
                            pathname === subItem.href || pathname?.startsWith(`${subItem.href}/`) ? "text-white bg-fibem-accent/80" : ""
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {LABELS.menu[subItem.label as keyof typeof LABELS.menu]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!session && (
                <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/connexion">{LABELS.login}</Link>
                  </Button>
                  <Button asChild className="bg-fibem-accent hover:bg-fibem-accent/90 text-white">
                    <Link href="/inscription">{LABELS.signup}</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
