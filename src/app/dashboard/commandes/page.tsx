'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    ShoppingCart,
    Package,
    Truck,
    Loader2,
    ArrowRight,
    DollarSign,
    Calendar,
    Eye,
    Search,
    CheckCircle2,
    Clock,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { fetchMyOrders } from '@/actions/store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function CommandesPage() {
    const { data: session } = useSession()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchMyOrders()
                setOrders(data)
            } catch (err) {
                console.error('Error loading orders:', err)
            } finally {
                setLoading(false)
            }
        }

        if (session?.user) {
            loadOrders()
        }
    }, [session])


    const filteredOrders = orders.filter(order =>
        order.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos commandes...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mes Commandes</h1>
                    <p className="text-gray-500 mt-1">Historique de vos achats sur la boutique FIBEM.</p>
                </div>
                <Button asChild variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-600 font-bold h-11 px-6 rounded-xl">
                    <Link href="/store">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Retour à la boutique
                    </Link>
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher par n° de commande (ex: CMD-2026-001)"
                            className="pl-10 h-11 border-gray-100 bg-gray-50/50 focus-visible:ring-fibem-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="w-[180px] font-bold text-xs uppercase py-4">Commande</TableHead>
                                    <TableHead className="font-bold text-xs uppercase py-4">Date</TableHead>
                                    <TableHead className="font-bold text-xs uppercase py-4">Détails</TableHead>
                                    <TableHead className="font-bold text-xs uppercase py-4">Total</TableHead>
                                    <TableHead className="font-bold text-xs uppercase py-4">Statut</TableHead>
                                    <TableHead className="text-right font-bold text-xs uppercase py-4">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100 transition-transform group-hover:scale-105">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">#{order.reference}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Standard</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 font-medium text-gray-600 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className="text-[10px] font-bold text-gray-500 bg-white border-gray-200">
                                                {order.items.length} {order.items.length > 1 ? 'articles' : 'article'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-black text-gray-900 group-hover:text-fibem-primary transition-colors">
                                                {order.total_amount.toLocaleString()} €
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                                order.status === 'DELIVERED' || order.status === 'PAID'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'PENDING'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : order.status === 'CANCELLED'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {order.status.toLowerCase()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right">
                                            <Button variant="ghost" size="sm" className="h-9 px-3 text-gray-400 hover:text-fibem-primary hover:bg-blue-50 rounded-lg">
                                                <Eye className="w-4 h-4 mr-1.5" />
                                                <span className="text-xs font-bold font-heading">Détails</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredOrders.length === 0 && (
                            <div className="py-32 text-center text-gray-500">
                                <ShoppingCart className="w-16 h-16 text-gray-100 mx-auto mb-6 opacity-10" />
                                <p className="text-lg font-bold text-gray-600">Aucune commande trouvée.</p>
                                <p className="text-sm mt-1 mb-8">Découvrez nos produits et abonnements premium.</p>
                                <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 h-11 px-8 rounded-xl font-bold shadow-md">
                                    <Link href="/store">Visiter la boutique</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
