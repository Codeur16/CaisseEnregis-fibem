'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import {
    Briefcase,
    Calendar,
    Clock,
    Loader2,
    Search,
    Filter,
    ArrowRight,
    Building2,
    MapPin,
    CheckCircle2,
    XCircle,
    MoreHorizontal
} from 'lucide-react'
import { fetchMyJobApplications, fetchRecruiterApplications } from '@/actions/jobs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CandidaturesPage() {
    const { data: session } = useSession()
    const [searchTerm, setSearchTerm] = useState('')
    console.log("Session in CandidaturesPage:", session)
    // Fetch applications using react-query
    const { data: applications = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['recruiterApplications', session?.user?.accessToken],
        queryFn: () => fetchRecruiterApplications({ token: session?.accessToken || '' }),
        enabled: !!session?.accessToken, // Only fetch when token is available
    })

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        const map: Record<string, any> = {
            PENDING: 'secondary',
            IN_REVIEW: 'default',
            ACCEPTED: 'default',
            REJECTED: 'destructive',
        }
        return map[status] || 'secondary'
    }

    const filteredApps = applications.filter(app =>
        app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos candidatures...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <XCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-gray-500 font-medium">Erreur de chargement des candidatures</p>
                <Button onClick={() => refetch()} className="mt-4">
                    Réessayer
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Suivi des Candidatures</h1>
                    <p className="text-gray-500 mt-1">
                        {session?.user?.role === 'CANDIDAT' ? 'Suivez l\'état de vos candidatures envoyées.' : 'Gérez les candidatures reçues pour vos offres.'}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Rechercher par titre de poste ou entreprise..."
                        className="pl-10 h-11 border-gray-100 bg-white focus-visible:ring-fibem-primary/20 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-11 border-gray-100 bg-white">
                    <Filter className="w-4 h-4 mr-2" />
                    Trier par date
                </Button>
            </div>

            <div className="grid gap-4">
                {filteredApps.map((app) => (
                    <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{app.job_title}</h2>
                                        <Badge variant={getStatusVariant(app.status)} className="capitalize text-[10px]">
                                            {app.status.replace('_', ' ').toLowerCase()}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[13px] text-gray-500 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            {app.candidate_name}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Postulé le {new Date(app.applied_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            Dernière mise à jour il y a 2 jours
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex hover:text-fibem-primary hover:bg-blue-50">
                                        <a href={`/emploi/offres/${app.job_offer}`}>Voir l'offre</a>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="border-gray-100 font-bold hover:bg-gray-50">
                                                Actions
                                                <MoreHorizontal className="w-4 h-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[180px]">
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Accepter
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                <Clock className="w-4 h-4 mr-2 text-blue-500" /> Mettre en attente
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium text-destructive">
                                                <XCircle className="w-4 h-4 mr-2" /> Refuser
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none font-bold">
                                        Gérer
                                        <ArrowRight className="w-4 h-4 ml-6" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredApps.length === 0 && (
                    <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
                        <Briefcase className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                        <p className="font-bold text-gray-500">Aucune candidature trouvée.</p>
                        <p className="text-sm mt-1">Essayez de modifier vos filtres de recherche.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
