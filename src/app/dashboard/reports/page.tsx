'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    BarChart3,
    Users,
    Briefcase,
    FileText,
    TrendingUp,
    Calendar,
    Filter,
    Download,
    Activity,
    DollarSign,
    PieChart,
    Eye,
    Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data for reports
const mockStats = {
  totalUsers: 1242,
  activeUsers: 892,
  totalServices: 342,
  totalOrders: 1289,
  totalRevenue: 45678000,
  monthlyGrowth: 12.5
}

const mockReports = [
  {
    id: '1',
    title: 'Rapport Mensuel Utilisateurs',
    type: 'Utilisateurs',
    period: 'Janvier 2024',
    generatedDate: new Date('2024-02-01'),
    size: '2.4 MB',
    status: 'generated'
  },
  {
    id: '2',
    title: 'Rapport Activité Plateforme',
    type: 'Activité',
    period: 'Janvier 2024',
    generatedDate: new Date('2024-02-01'),
    size: '1.8 MB',
    status: 'generated'
  },
  {
    id: '3',
    title: 'Rapport Financier',
    type: 'Finances',
    period: 'Janvier 2024',
    generatedDate: new Date('2024-02-01'),
    size: '3.2 MB',
    status: 'generated'
  },
  {
    id: '4',
    title: 'Rapport Satisfaction Client',
    type: 'Satisfaction',
    period: 'Décembre 2023',
    generatedDate: new Date('2024-01-05'),
    size: '1.1 MB',
    status: 'generated'
  }
]

export default function ReportsPage() {
  const { data: session } = useSession()
  const [reports, setReports] = useState<any[]>(mockReports)
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const reportTypes = ['all', 'Utilisateurs', 'Activité', 'Finances', 'Satisfaction']

  const filteredReports = reports.filter(report =>
    (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === 'all' || report.type === selectedType)
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports & Analyses</h1>
          <p className="text-gray-500 mt-1">
            Accédez aux rapports détaillés et analyses de la plateforme.
          </p>
        </div>
        <Button className="h-11 bg-fibem-primary hover:bg-fibem-primary/90 font-bold">
          <BarChart3 className="w-4 h-4 mr-2" />
          Générer un rapport
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-none shadow-sm bg-blue-50/50 hover:bg-blue-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-1">Total Utilisateurs</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-green-50/50 hover:bg-green-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.activeUsers.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">Actifs</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-purple-50/50 hover:bg-purple-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.totalServices}</p>
            <p className="text-xs text-purple-600 mt-1">Services</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-orange-50/50 hover:bg-orange-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-orange-600 mt-1">Commandes</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-teal-50/50 hover:bg-teal-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{(mockStats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-teal-600 mt-1">Revenus (FCFA)</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">+{mockStats.monthlyGrowth}%</p>
            <p className="text-xs text-indigo-600 mt-1">Croissance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-sm bg-white sticky top-24">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
              <CardDescription>Recherchez selon vos critères</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type de rapport</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {reportTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'Tous les types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Période</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <option>Toutes les périodes</option>
                  <option>Mois dernier</option>
                  <option>Trimestre dernier</option>
                  <option>Année dernière</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Format</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par titre ou type de rapport..."
                className="pl-10 h-11 border-gray-100 bg-white focus-visible:ring-fibem-primary/20 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11 border-gray-100 bg-white">
              <Filter className="w-4 h-4 mr-2" />
              Trier
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{report.title}</h2>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Période: {report.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>Généré le: {report.generatedDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{report.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 border-gray-200 hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2" />
                          Prévisualiser
                        </Button>
                        
                        <Button size="sm" className="h-9 bg-fibem-primary hover:bg-fibem-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredReports.length === 0 && (
              <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
                <PieChart className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                <p className="font-bold text-gray-500">Aucun rapport trouvé.</p>
                <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}