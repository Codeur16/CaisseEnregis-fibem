'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    FileText,
    Download,
    Eye,
    Loader2,
    Calendar,
    DollarSign,
    Filter,
    Search,
    MoreVertical,
    FileDown
} from 'lucide-react'
import { fetchMyInvoices, fetchMyQuotes, fetchMyCreditNotes } from '@/actions/billing'
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DocumentsPage() {
    const { data: session } = useSession()
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [creditNotes, setCreditNotes] = useState<CreditNote[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'invoice' | 'quote' | 'credit_note'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const [invs, qs, cns] = await Promise.all([
                    fetchMyInvoices(),
                    fetchMyQuotes(),
                    fetchMyCreditNotes()
                ])
                setInvoices(invs)
                setQuotes(qs)
                setCreditNotes(cns)
            } catch (err) {
                console.error('Error loading documents:', err)
            } finally {
                setLoading(false)
            }
        }

        if (session?.user) {
            loadDocuments()
        }
    }, [session])

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        const map: Record<string, any> = {
            PAID: 'default',
            UNPAID: 'destructive',
            OVERDUE: 'destructive',
            DRAFT: 'secondary',
            SENT: 'default',
            ACCEPTED: 'default',
            REJECTED: 'destructive',
        }
        return map[status] || 'secondary'
    }

    const allDocuments = [
        ...invoices.map(i => ({ ...i, docType: 'Facture' as const, date: i.issued_date })),
        ...quotes.map(q => ({ ...q, docType: 'Devis' as const, date: q.created_at })),
        ...creditNotes.map(c => ({ ...c, docType: 'Avoir' as const, date: c.created_at }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const filteredDocs = allDocuments.filter(doc => {
        const matchesFilter = filter === 'all' ||
            (filter === 'invoice' && doc.docType === 'Facture') ||
            (filter === 'quote' && doc.docType === 'Devis') ||
            (filter === 'credit_note' && doc.docType === 'Avoir')

        const matchesSearch = doc.reference.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesFilter && matchesSearch
    })

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos documents...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mes Documents</h1>
                    <p className="text-gray-500 mt-1">Gérez vos devis, factures et avoirs en un seul endroit.</p>
                </div>
                <Button className="bg-fibem-primary hover:bg-fibem-primary/90 shadow-sm">
                    <FileDown className="w-4 h-4 mr-2" />
                    Exporter
                </Button>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher par référence (ex: FA-2026-001)"
                                className="pl-10 h-11 border-gray-100 bg-gray-50/50 focus-visible:ring-fibem-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                                <SelectTrigger className="w-[180px] h-11 border-gray-100 bg-gray-50/50">
                                    <SelectValue placeholder="Type de document" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les documents</SelectItem>
                                    <SelectItem value="invoice">Factures</SelectItem>
                                    <SelectItem value="quote">Devis</SelectItem>
                                    <SelectItem value="credit_note">Avoirs</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="w-[200px] font-bold text-xs uppercase tracking-wider py-4">Document</TableHead>
                                    <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Date</TableHead>
                                    <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Montant</TableHead>
                                    <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Statut</TableHead>
                                    <TableHead className="text-right font-bold text-xs uppercase tracking-wider py-4 whitespace-nowrap">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDocs.map((doc: any) => (
                                    <TableRow key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 rounded-xl ${doc.docType === 'Facture' ? 'bg-green-50 text-green-600' :
                                                    doc.docType === 'Devis' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{doc.docType}</p>
                                                    <p className="text-[11px] text-gray-500 font-medium tracking-tight uppercase">{doc.reference}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 font-medium text-gray-600">
                                            {new Date(doc.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-bold text-gray-900">
                                                {doc.amount.toLocaleString()} €
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant={getStatusVariant(doc.status)} className="capitalize text-[10px]">
                                                {doc.status.toLowerCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="w-4 h-4 mr-2" /> Voir le détail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Download className="w-4 h-4 mr-2" /> Télécharger PDF
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive cursor-pointer">
                                                        Signaler un problème
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredDocs.length === 0 && (
                            <div className="py-24 text-center text-gray-500">
                                <FileText className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                                <p>Aucun document trouvé correspondant à votre recherche.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
