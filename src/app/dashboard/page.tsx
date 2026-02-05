'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  TrendingUp,
  FileText,
  Briefcase,
  CheckCircle,
  Loader2,
  Clock,
  UserCheck,
  Package,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react'
import RoleBreakdown from '@/components/dashboard/RoleBreakdown'
import { fetchMyServiceRequests } from '@/actions/services'
import { fetchMyJobApplications } from '@/actions/jobs'
import { fetchMyInvoices, fetchMyQuotes } from '@/actions/billing'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function DashboardPage() {
  const { data: session } = useSession()
  const userRole = (session?.user?.role as string) || 'PARTICULIER'

  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        if (userRole === 'PARTICULIER' || userRole === 'PROFESSIONNEL' || userRole === 'ADMIN') {
          const [reqs, invs, qs] = await Promise.all([
            fetchMyServiceRequests(),
            fetchMyInvoices(),
            fetchMyQuotes()
          ])
          setRequests(reqs)
          setInvoices(invs)
          setQuotes(qs)
        }

        if (userRole === 'CANDIDAT' || userRole === 'RECRUTEUR' || userRole === 'ADMIN') {
          const apps = await fetchMyJobApplications({token: session?.user?.accessToken || ''})
          setApplications(apps)
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      loadDashboardData()
    }
  }, [userRole, session])

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    const map: Record<string, any> = {
      PENDING: 'secondary',
      IN_PROGRESS: 'default',
      COMPLETED: 'default',
      ACCEPTED: 'default',
      REJECTED: 'destructive',
      PAID: 'default',
      UNPAID: 'destructive',
    }
    return map[status] || 'secondary'
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement de votre tableau de bord...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* <RoleBreakdown role={userRole} /> */}

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-white transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              {userRole === 'CANDIDAT' ? 'Candidatures' : 'Demandes de service'}
            </CardTitle>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userRole === 'CANDIDAT' ? applications.length : requests.length}
            </div>
            <p className="text-xs text-blue-500 mt-1">Total à ce jour</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white  transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Devis acceptés</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter(q => q.status === 'ACCEPTED').length}
            </div>
            <p className="text-xs text-green-500 mt-1">Prêts pour réalisation</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">Factures impayées</CardTitle>
            <FileText className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {invoices.filter(i => i.status === 'UNPAID').length}
            </div>
            <p className="text-xs text-orange-500 mt-1">En attente de règlement</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">CA Réalisé</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {invoices.reduce((acc, inv) => acc + (inv.status === 'PAID' ? inv.amount : 0), 0).toLocaleString()} €
            </div>
            <p className="text-xs text-purple-500 mt-1">Paiements validés</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/30">
            <div>
              <CardTitle className="text-lg">{userRole === 'CANDIDAT' ? 'Vos Candidatures' : 'Demandes Récentes'}</CardTitle>
              <CardDescription>Aperçu de vos activités</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-fibem-primary hover:text-fibem-primary hover:bg-blue-50">
              <Link href={`/dashboard/${userRole.toLowerCase()}`}>Voir tout</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-gray-50">
                {(userRole === 'CANDIDAT' ? applications : requests).map((item: any) => (
                  <div key={item.id} className="group p-4 hover:bg-gray-50/50 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">
                            {userRole === 'CANDIDAT' ? (item as JobApplication).job_title : (item as ServiceRequest).service_name}
                          </h4>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-fibem-primary" />
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date((item as any).applied_at || (item as any).created_at).toLocaleDateString()}
                          </span>
                          {(item as any).user_email && (
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3 h-3" />
                              {(item as any).user_email}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(item.status)} className="capitalize text-[10px] h-5">
                        {item.status.replace('_', ' ').toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(userRole === 'CANDIDAT' ? applications.length : requests.length) === 0 && (
                  <div className="py-24 text-center text-gray-400">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="text-sm font-medium">Aucune activité récente trouvée.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/30">
            <div>
              <CardTitle className="text-lg">Documents Financiers</CardTitle>
              <CardDescription>Factures et devis récents</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-fibem-primary hover:text-fibem-primary hover:bg-blue-50">
              <Link href="/dashboard/documents">Gérer</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-gray-50">
                {[...invoices, ...quotes].sort((a, b) => {
                  const dateA = (a as any).created_at || (a as any).issued_date;
                  const dateB = (b as any).created_at || (b as any).issued_date;
                  return new Date(dateB).getTime() - new Date(dateA).getTime();
                }).map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${doc.reference?.startsWith('DE') ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-fibem-primary transition-colors">{doc.reference}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-medium mt-0.5 tracking-wider">
                          {new Date(doc.issued_date || doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">{doc.amount.toLocaleString()} €</p>
                      <Badge variant={getStatusVariant(doc.status)} className="text-[9px] h-4 mt-1">
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {invoices.length === 0 && quotes.length === 0 && (
                  <div className="py-24 text-center text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="text-sm font-medium">Aucun document disponible.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
