'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchStore } from '@/stores/searchStore'
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle } from '../ui/credenza'
import { Search, FileText, Briefcase, Users, Receipt, Building2, Home, Phone, Settings, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'



interface SearchPageConfig {
    id: string
    href: string
    icon: any
    category: string
}

const pagesConfig: SearchPageConfig[] = [
    // Home & Info
    { id: 'accueil', href: '/', icon: Home, category: 'navigation' },
    { id: 'aPropos', href: '/a-propos', icon: Users, category: 'navigation' },
    { id: 'actualites', href: '/actualites', icon: TrendingUp, category: 'navigation' },
    { id: 'contact', href: '/contact', icon: Phone, category: 'navigation' },

    // Services
    { id: 'services', href: '/services', icon: Briefcase, category: 'services' },
    { id: 'prestations', href: '/services/prestations', icon: Briefcase, category: 'services' },
    { id: 'tarifs', href: '/services/tarifs', icon: Receipt, category: 'services' },
    { id: 'plaquette', href: '/services/plaquette', icon: FileText, category: 'services' },

    // Human Capital
    { id: 'formulaireCv', href: '/services/formulaire-cv', icon: FileText, category: 'gestionRh' },
    { id: 'ficheCandidat', href: '/services/fiche-candidat', icon: Users, category: 'gestionRh' },
    { id: 'feuilleHeures', href: '/services/feuille-heures', icon: Receipt, category: 'gestionRh' },

    // Administrative
    { id: 'modeleDevis', href: '/services/modele-devis', icon: FileText, category: 'administratif' },
    { id: 'modeleFacture', href: '/services/modele-facture', icon: Receipt, category: 'administratif' },
    { id: 'modeleAvoir', href: '/services/modele-avoir', icon: FileText, category: 'administratif' },
    { id: 'ficheEtablissement', href: '/services/fiche-etablissement', icon: Building2, category: 'administratif' },
    { id: 'devisFactures', href: '/services/devis-factures', icon: Receipt, category: 'administratif' },

    // Ecosystem
    { id: 'autresSites', href: '/services/autres-sites', icon: TrendingUp, category: 'ecosysteme' },

    // Employment
    { id: 'emploi', href: '/emploi', icon: Briefcase, category: 'emploi' },
    { id: 'espaceCandidat', href: '/emploi/candidat', icon: Users, category: 'emploi' },
    { id: 'espaceRecruteur', href: '/emploi/recruteur', icon: Building2, category: 'emploi' },
    { id: 'espaceStagiaire', href: '/emploi/stagiaire', icon: Users, category: 'emploi' },

    // Auth
    { id: 'connexion', href: '/connexion', icon: Settings, category: 'compte' },
    { id: 'inscription', href: '/inscription', icon: Users, category: 'compte' },
    { id: 'dashboard', href: '/dashboard', icon: Home, category: 'compte' },
]

const pageTitles: Record<string, string> = {
    accueil: 'Accueil',
    aPropos: 'À Propos',
    actualites: 'Actualités',
    contact: 'Contact',
    services: 'Services',
    prestations: 'Prestations',
    tarifs: 'Tarifs',
    plaquette: 'Plaquette',
    formulaireCv: 'Formulaire CV',
    ficheCandidat: 'Fiche Candidat',
    feuilleHeures: "Feuille d'heures",
    modeleDevis: 'Modèle Devis',
    modeleFacture: 'Modèle Facture',
    modeleAvoir: 'Modèle Avoir',
    ficheEtablissement: 'Fiche Établissement',
    devisFactures: 'Devis & Factures',
    autresSites: 'Autres Sites',
    emploi: 'Emploi',
    espaceCandidat: 'Espace Candidat',
    espaceRecruteur: 'Espace Recruteur',
    espaceStagiaire: 'Espace Stagiaire',
    connexion: 'Connexion',
    inscription: 'Inscription',
    dashboard: 'Tableau de bord',
}

const pageDescriptions: Record<string, string> = {
    accueil: "Page d'accueil FIBEM",
    aPropos: "Découvrez l'histoire et les valeurs de FIBEM",
    actualites: 'Dernières nouvelles et actualités',
    contact: 'Contactez notre équipe',
    services: 'Tous nos services professionnels',
    prestations: 'Nos prestations de services',
    tarifs: 'Grille tarifaire et plans',
    plaquette: 'Télécharger notre brochure',
    formulaireCv: 'Créer un CV professionnel',
    ficheCandidat: 'Gérer les candidatures',
    feuilleHeures: 'Suivi du temps de travail',
    modeleDevis: 'Créer des devis professionnels',
    modeleFacture: 'Générer des factures',
    modeleAvoir: 'Créer des avoirs',
    ficheEtablissement: 'Documenter vos partenaires',
    devisFactures: 'Hub devis et facturation',
    autresSites: 'Nos plateformes partenaires',
    emploi: 'Offres d\'emploi et recrutement',
    espaceCandidat: 'Espace pour les candidats',
    espaceRecruteur: 'Espace pour les recruteurs',
    espaceStagiaire: 'Espace pour les stagiaires',
    connexion: 'Se connecter à votre compte',
    inscription: 'Créer un nouveau compte',
    dashboard: 'Tableau de bord',
}

const categoryNames: Record<string, string> = {
    navigation: 'Navigation',
    services: 'Services',
    gestionRh: 'Gestion RH',
    administratif: 'Administratif',
    ecosysteme: 'Écosystème',
    emploi: 'Emploi',
    compte: 'Compte',
}

function SearchModal() {
    const { open, close, search, setSearch } = useSearchStore()
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const selectedItemRef = useRef<HTMLButtonElement>(null)

    const searchablePages = useMemo(() => {
        return pagesConfig.map(page => ({
            ...page,
            title: pageTitles[page.id] || page.id,
            description: pageDescriptions[page.id] || '',
            categoryDisplay: categoryNames[page.category] || page.category
        }))
    }, [])

    const filteredPages = useMemo(() => {
        if (!search.trim()) return searchablePages

        const query = search.toLowerCase()
        return searchablePages.filter(page =>
            page.title.toLowerCase().includes(query) ||
            page.description.toLowerCase().includes(query) ||
            page.categoryDisplay.toLowerCase().includes(query)
        )
    }, [search, searchablePages])

    const handleNavigate = (href: string) => {
        router.push(href)
        setSearch('')
        close()
    }

    useEffect(() => {
        setSelectedIndex(0)
    }, [search])

    useEffect(() => {
        if (!open) {
            setSearch('')
            setSelectedIndex(0)
        }
    }, [open, setSearch])

    // Scroll to selected item when selection changes
    useEffect(() => {
        if (selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }
    }, [selectedIndex])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => (prev + 1) % filteredPages.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => (prev - 1 + filteredPages.length) % filteredPages.length)
            } else if (e.key === 'Enter' && filteredPages[selectedIndex]) {
                e.preventDefault()
                handleNavigate(filteredPages[selectedIndex].href)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, selectedIndex, filteredPages])

    const groupedPages = useMemo(() => {
        // Use filteredPages which already has the translated categoryDisplay
        const groups: Record<string, typeof searchablePages> = {}
        filteredPages.forEach(page => {
            if (!groups[page.categoryDisplay]) {
                groups[page.categoryDisplay] = []
            }
            groups[page.categoryDisplay].push(page)
        })
        return groups
    }, [filteredPages])

    return (
        <Credenza open={open} onOpenChange={close}>
            <CredenzaContent className="max-w-2xl">
                <CredenzaHeader className="border-b pb-4 mt-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une page... (tapez pour filtrer)"
                            className="pl-10 pr-4 h-12 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            autoFocus
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">↑↓</kbd>
                        <span>Naviguer</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">Enter</kbd>
                        <span>Sélectionner</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">Esc</kbd>
                        <span>Fermer</span>
                    </div>
                </CredenzaHeader>

                <CredenzaBody className="max-h-[60vh] overflow-y-auto">
                    {filteredPages.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Aucun résultat trouvé</p>
                            <p className="text-sm">Essayez avec d'autres mots-clés</p>
                        </div>
                    ) : (
                        <div className="space-y-6 py-4">
                            {Object.entries(groupedPages).map(([category, pages]) => (
                                <div key={category}>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                                        {category}
                                    </h3>
                                    <div className="space-y-1">
                                        {pages.map((page, idx) => {
                                            const globalIndex = filteredPages.indexOf(page)
                                            const isSelected = globalIndex === selectedIndex
                                            const Icon = page.icon

                                            return (
                                                <button
                                                    key={page.href}
                                                    ref={isSelected ? selectedItemRef : null}
                                                    onClick={() => handleNavigate(page.href)}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                    className={cn(
                                                        "w-full flex items-start gap-4 p-3 rounded-xl transition-all text-left",
                                                        isSelected
                                                            ? "bg-fibem-primary text-white shadow-md"
                                                            : "hover:bg-gray-100"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                                        isSelected ? "bg-white/20" : "bg-fibem-light"
                                                    )}>
                                                        <Icon className={cn(
                                                            "w-5 h-5",
                                                            isSelected ? "text-white" : "text-fibem-primary"
                                                        )} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={cn(
                                                            "font-bold mb-1",
                                                            isSelected ? "text-white" : "text-fibem-dark"
                                                        )}>
                                                            {page.title}
                                                        </h4>
                                                        <p className={cn(
                                                            "text-sm line-clamp-1",
                                                            isSelected ? "text-blue-100" : "text-gray-600"
                                                        )}>
                                                            {page.description}
                                                        </p>
                                                    </div>
                                                    {isSelected && (
                                                        <kbd className="px-2 py-1 bg-white/20 rounded text-xs shrink-0">
                                                            Enter
                                                        </kbd>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    )
}

export default SearchModal