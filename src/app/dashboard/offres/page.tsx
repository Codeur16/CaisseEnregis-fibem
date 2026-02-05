'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import {
    Plus,
    Briefcase,
    MapPin,
    DollarSign,
    Calendar,
    Loader2,
    ArrowRight,
    Edit,
    Trash2,
    Users,
    Eye,
    MoreVertical,
    CheckCircle2,
    Power,
    Search,
    FileText,
    Target,
    TrendingUp,
    BarChart3,
    User
} from 'lucide-react'
import Link from 'next/link'
import { fetchJobOffers, fetchRecruiterApplications } from '@/actions/jobs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useJobOfferStore } from '@/stores/jobOfferStore'
import JobOfferModal from './_components/JobOfferModal'

// Define types for recruiter data
type JobOfferWithStats = {
    id: number;
    title: string;
    candidates: number;
    views: number;
    status: 'active' | 'paused' | 'closed';
    created: string;
    company_name: string;
    contract_type: string;
    location: string;
    salary_range: string;
    is_active: boolean;
    created_at: string;
}

type CandidateProfile = {
    id: number;
    name: string;
    title: string;
    experience: string;
    location: string;
    match: number;
}

export default function OffresDashboardPage() {
    const { data: session } = useSession()
    const { onAdd, setJobOffer, setMode } = useJobOfferStore()

    const userRole = session?.user?.role as string

    // Fetch job offers
    const { data: jobs = [], isLoading: loading, error } = useQuery({
        queryKey: ['jobOffers'],
        queryFn: () => fetchJobOffers(),
        enabled: !!session?.user,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    // Fetch recruiter applications for stats
    const { data: applications = [] } = useQuery({
        queryKey: ['recruiterApplications'],
        queryFn: () => fetchRecruiterApplications({
            token: session?.user?.access_token || ''
        }),
        enabled: !!session?.user && userRole === 'RECRUTEUR',
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    // Calculate recruiter stats
    const activeOffersCount = jobs.filter((job: any) => job.is_active).length;
    const totalApplications = applications.length;
    const totalViews = jobs.reduce((sum: number, job: any) => sum + (job.views || 0), 0);
    const responseRate = totalApplications > 0 && totalViews > 0
        ? Math.round((totalApplications / totalViews) * 100)
        : 0;

    // Mock candidate profiles (would come from API in real implementation)
    const candidateProfiles: CandidateProfile[] = [
        { id: 1, name: 'Marie Dupont', title: 'Développeuse Full-Stack', experience: '5 ans', location: 'Paris', match: 95 },
        { id: 2, name: 'Jean Martin', title: 'Chef de Projet', experience: '8 ans', location: 'Lyon', match: 88 },
        { id: 3, name: 'Sophie Bernard', title: 'Commerciale B2B', experience: '3 ans', location: 'Paris', match: 82 },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos offres...</p>
            </div>
        )
    }

    const handleCreateJobOffer = () => {
        setMode('create')
        onAdd()
    }

    const handleEditJobOffer = (job: any) => {
        setJobOffer(job, 'update')
    }

    // Transform job offers to include stats for recruiter view
    const jobOffersWithStats: JobOfferWithStats[] = jobs.map((job: any) => ({
        ...job,
        candidates: applications.filter(app => app.job_offer === job.id).length,
        views: job.views || Math.floor(Math.random() * 100) + 50, // Mock view count if not available
        status: job.is_active ? 'active' : 'paused',
        created: new Date(job.created_at).toLocaleDateString('fr-FR'),
    }));

    // If user is a recruiter, show the recruiter dashboard
    if (userRole === 'RECRUTEUR') {
        return (
            <div className="space-y-8 animate-in fade-in duration-500 min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Recruteur</h1>
                        <p className="text-fibem-light text-lg mb-8">Trouvez les meilleurs talents pour votre entreprise</p>

                        {/* Quick actions */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={handleCreateJobOffer}
                                className="bg-white text-fibem-primary font-semibold rounded-lg hover:bg-fibem-light transition-colors flex items-center gap-2 h-12 px-6"
                            >
                                <Plus className="w-5 h-5" />
                                Publier une offre
                            </Button>
                            
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <FileText className="w-8 h-8 text-fibem-primary" />
                                <span className="text-green-500 text-sm font-medium">+3</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">{activeOffersCount}</h3>
                            <p className="text-gray-500 text-sm">Offres actives</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <Users className="w-8 h-8 text-purple-500" />
                                <span className="text-green-500 text-sm font-medium">+12</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">{totalApplications}</h3>
                            <p className="text-gray-500 text-sm">Candidatures</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <Eye className="w-8 h-8 text-orange-500" />
                                <span className="text-green-500 text-sm font-medium">+25%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">{totalViews}</h3>
                            <p className="text-gray-500 text-sm">Vues ce mois</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">{responseRate}%</h3>
                            <p className="text-gray-500 text-sm">Taux de réponse</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* My offers */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b flex items-center justify-between">
                                    <h2 className="font-bold text-lg text-gray-800">Mes offres d'emploi</h2>
                                    <Link href="/emploi/recruteur/offres" className="text-fibem-primary text-sm hover:underline">
                                        Voir tout
                                    </Link>
                                </div>
                                <div className="divide-y">
                                    {jobOffersWithStats.map((offer) => (
                                        <div key={offer.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                                                    <p className="text-sm text-gray-500">Créée le {offer.created}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    offer.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    offer.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {offer.status === 'active' ? 'Active' : offer.status === 'paused' ? 'En pause' : 'Fermée'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {offer.candidates} candidats
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {offer.views} vues
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="p-1.5 text-gray-400 hover:text-fibem-primary"
                                                        asChild
                                                    >
                                                        <Link href={`/dashboard/offres/${offer.id}`}>
                                                            <BarChart3 className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="p-1.5 text-gray-400 hover:text-fibem-primary"
                                                        onClick={() => handleEditJobOffer(offer)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="p-1.5 text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t">
                                    <Button
                                        onClick={handleCreateJobOffer}
                                        className="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-fibem-primary hover:text-fibem-primary transition-colors flex items-center justify-center gap-2 py-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Créer une nouvelle offre
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Suggested profiles */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b">
                                    <h2 className="font-bold text-lg text-gray-800">Profils suggérés</h2>
                                    <p className="text-sm text-gray-500">Basés sur vos offres actives</p>
                                </div>
                                <div className="divide-y">
                                    {candidateProfiles.map((profile) => (
                                        <div key={profile.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 bg-fibem-primary rounded-full flex items-center justify-center text-white font-bold">
                                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                            {profile.match}% match
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{profile.title}</p>
                                                    <p className="text-xs text-gray-500">{profile.experience} • {profile.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-3">
                                                <Button className="flex-1 py-1.5 text-sm border border-fibem-primary text-fibem-primary rounded hover:bg-fibem-light transition-colors">
                                                    Voir profil
                                                </Button>
                                                <Button className="flex-1 py-1.5 text-sm bg-fibem-primary text-white rounded hover:bg-fibem-dark transition-colors">
                                                    Contacter
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t">
                                    <Link
                                        href="/emploi/recruteur/cvtheque"
                                        className="block text-center text-fibem-primary font-medium hover:underline"
                                    >
                                        Accéder à la CVthèque
                                    </Link>
                                </div>
                            </div>

                            {/* Tools */}
                            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
                                <h2 className="font-bold text-lg text-gray-800 mb-4">Outils recruteur</h2>
                                <div className="space-y-3">
                                    <Link href="/emploi/recruteur/simulateur" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Simulateur d'entretien</h4>
                                            <p className="text-xs text-gray-500">Préparez vos entretiens</p>
                                        </div>
                                    </Link>
                                    <Link href="/emploi/recruteur/fiches-metier" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Fiches métier</h4>
                                            <p className="text-xs text-gray-500">Référentiel des métiers</p>
                                        </div>
                                    </Link>
                                    <Link href="/emploi/recruteur/statistiques" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Statistiques</h4>
                                            <p className="text-xs text-gray-500">Analyses et rapports</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <JobOfferModal />
            </div>
        )
    }

    // Default view for other roles
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {userRole === 'CANDIDAT' ? 'Opportunités d\'Emploi' : 'Mes Offres d\'Emploi'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {userRole === 'CANDIDAT'
                            ? 'Découvrez les dernières offres qui correspondent à votre profil.'
                            : 'Gérez vos publications et trouvez les meilleurs candidats pour vos postes.'}
                    </p>
                </div>
                {userRole !== 'CANDIDAT' ? (
                    <Button onClick={handleCreateJobOffer} className="bg-fibem-primary hover:bg-fibem-primary/90 shadow-md h-12 px-8 rounded-xl font-bold">
                        <Plus className="w-5 h-5 mr-2" />
                        Publier une offre
                    </Button>
                ) : (
                    <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 shadow-md h-12 px-8 rounded-xl font-bold">
                        <Link href="/emploi/offres">
                            <Briefcase className="w-5 h-5 mr-2" />
                            Chercher un emploi
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid gap-6">
                {jobs.map((job: any) => (
                    <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-none uppercase text-[10px] font-bold">
                                            {job.contract_type}
                                        </Badge>
                                        <Badge variant={job.is_active ? 'default' : 'destructive'} className="text-[10px] uppercase font-bold">
                                            {job.is_active ? 'Publiée' : 'Désactivée'}
                                        </Badge>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{job.title}</h2>
                                    <p className="text-sm text-gray-600 font-medium">{job.company_name}</p>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            {job.salary_range}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Postée le {new Date(job.created_at).toLocaleDateString()}
                                        </span>

                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {userRole !== 'CANDIDAT' && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-gray-400 hover:text-fibem-primary hover:bg-blue-50 rounded-xl"
                                                onClick={() => handleEditJobOffer(job)}
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-45">
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                        <CheckCircle2 className="w-4 h-4 mr-2" /> Clôturer le poste
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                        <Power className="w-4 h-4 mr-2" /> Suspendre
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium text-destructive">
                                                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 border-none shadow-none font-bold rounded-xl h-10 px-6">
                                                <Link href={`/dashboard/offres/${job.id}`}>
                                                    Gérer
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                    {userRole === 'CANDIDAT' && (
                                        <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 border-none shadow-none font-bold rounded-xl h-10 px-6">
                                            <Link href={`/emploi/offres/${job.id}`}>
                                                Voir l'offre
                                                <ArrowRight className="w-4 h-4 ml-3" />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {jobs.length === 0 && (
                    <div className="py-32 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-100">
                        <Briefcase className="w-20 h-20 text-gray-100 mx-auto mb-6 opacity-20" />
                        <p className="text-xl font-bold text-gray-600">
                            {userRole === 'CANDIDAT' ? 'Aucune offre disponible pour le moment.' : 'Vous n\'avez pas encore publié d\'offre.'}
                        </p>
                        <p className="text-sm mt-1 mb-8">
                            {userRole === 'CANDIDAT' ? 'Revenez plus tard pour voir les nouvelles opportunités.' : 'Commencez à recruter dès maintenant sur senfibem.'}
                        </p>
                        {userRole !== 'CANDIDAT' && (
                            <Button onClick={handleCreateJobOffer} className="bg-fibem-primary hover:bg-fibem-primary/90 h-11 px-8 rounded-xl font-bold">
                                Créer ma première offre
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <JobOfferModal />
        </div>
    )
}
