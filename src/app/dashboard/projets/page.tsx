'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    LayoutDashboard,
    Calendar,
    Clock,
    Loader2,
    ArrowRight,
    MessageSquare,
    ShieldCheck,
    MapPin,
    MoreVertical,
    Plus,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { fetchMyServiceRequests } from '@/actions/services'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProjetsPage() {
    const { data: session } = useSession()
    const [requests, setRequests] = useState<ServiceRequest[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const data = await fetchMyServiceRequests()
                setRequests(data)
            } catch (err) {
                console.error('Error loading service requests:', err)
            } finally {
                setLoading(false)
            }
        }

        if (session?.user) {
            loadRequests()
        }
    }, [session])

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        const map: Record<string, any> = {
            PENDING: 'secondary',
            IN_PROGRESS: 'default',
            COMPLETED: 'default',
            CANCELLED: 'destructive',
        }
        return map[status] || 'secondary'
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos projets...</p>
            </div>
        )
    }

    const userRole = session?.user?.role as string

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {userRole === 'PROFESSIONNEL' ? 'Mes Services Pro' : 'Mes Projets & Services'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {userRole === 'PROFESSIONNEL'
                            ? 'Gérez vos prestations de services et vos interventions.'
                            : 'Gérez et suivez l\'avancement de vos demandes de prestations.'}
                    </p>
                </div>
                {userRole === 'CANDIDAT' ? (
                    <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 h-12 px-8 rounded-xl font-bold shadow-md">
                        <Link href="/services/prestations">
                            <Plus className="w-5 h-5 mr-2" />
                            Nouvelle demande
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 h-12 px-8 rounded-xl font-bold shadow-md">
                        <Link href="/services/services">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Gérer mes services
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid gap-6">
                {requests.map((req) => (
                    <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                            {req.service_name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{req.service_name}</h2>
                                                <Badge variant={getStatusVariant(req.status)} className="capitalize text-[10px]">
                                                    {req.status.replace('_', ' ').toLowerCase()}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5 font-medium tracking-wide">REF: PRJ-{req.id.toString().padStart(4, '0')}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 md:max-w-2xl leading-relaxed">
                                        {req.details}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-[13px] text-gray-500 font-medium">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Créé le {new Date(req.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                            <span className="text-green-700">Intervenant vérifié</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            Dakar, Sénégal
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="flex-1 lg:w-40 border-gray-100 hover:bg-gray-50 hover:text-fibem-primary font-bold rounded-xl h-11">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Discuter
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-11 w-11 text-gray-400 hover:bg-gray-50 rounded-xl">
                                                    <MoreVertical className="w-5 h-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[180px]">
                                                <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                    Annuler la demande
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                    Signaler un litige
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <Button asChild className="flex-1 lg:w-[195px] bg-gray-50 text-gray-800 hover:bg-blue-50 hover:text-fibem-primary border-none shadow-none font-bold rounded-xl h-11">
                                        <Link href={`/services/${req.service}`}>
                                            Voir le service
                                            <ArrowRight className="w-4 h-4 ml-auto" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {requests.length === 0 && (
                    <div className="py-32 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-100">
                        <LayoutDashboard className="w-20 h-20 text-gray-100 mx-auto mb-6 opacity-20" />
                        <p className="text-xl font-bold text-gray-600">Vous n'avez pas encore de projet actif.</p>
                        <p className="text-sm mt-1 mb-8">Trouvez le professionnel idéal pour vos travaux et rénovations.</p>
                        <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 h-11 px-8 rounded-xl font-bold">
                            <Link href="/services/prestations">Parcourir nos services</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
