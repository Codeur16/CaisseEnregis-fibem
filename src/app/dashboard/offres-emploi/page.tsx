'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    Search,
    MapPin,
    Building2,
    Clock,
    DollarSign,
    Calendar,
    Filter,
    Bookmark,
    ExternalLink,
    Users,
    Tag,
    Briefcase
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data for job offers
const mockJobOffers = [
  {
    id: '1',
    title: 'Développeur Web Full Stack',
    company: 'Tech Solutions Sénégal',
    location: 'Dakar, Sénégal',
    type: 'Temps plein',
    salary: '800,000 - 1,200,000 FCFA',
    postedDate: new Date('2024-01-20'),
    deadline: new Date('2024-02-15'),
    description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique.',
    requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    isSaved: true
  },
  {
    id: '2',
    title: 'Stagiaire en Marketing Digital',
    company: 'Agence Digitale SN',
    location: 'Saint-Louis, Sénégal',
    type: 'Stage',
    salary: '150,000 FCFA',
    postedDate: new Date('2024-01-18'),
    deadline: new Date('2024-02-10'),
    description: 'Stage de 6 mois pour étudiants en marketing digital ou communication.',
    requirements: ['Marketing digital', 'Anglais courant', 'Créativité'],
    isSaved: false
  },
  {
    id: '3',
    title: 'Comptable Junior',
    company: 'Expert Compta SARL',
    location: 'Thiès, Sénégal',
    type: 'Temps plein',
    salary: '600,000 - 800,000 FCFA',
    postedDate: new Date('2024-01-15'),
    deadline: new Date('2024-02-05'),
    description: 'Poste de comptable junior pour cabinet d\'expertise comptable en pleine expansion.',
    requirements: ['Comptabilité', 'Maîtrise Sage', 'Bonne organisation'],
    isSaved: true
  }
]

export default function OffresEmploiPage() {
  const { data: session } = useSession()
  const [jobOffers, setJobOffers] = useState<any[]>(mockJobOffers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const jobTypes = ['all', 'Temps plein', 'Stage', 'Temps partiel', 'Freelance']
  const locations = ['all', 'Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Diourbel']

  const filteredJobs = jobOffers.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === 'all' || job.type === selectedType) &&
    (selectedLocation === 'all' || job.location.includes(selectedLocation))
  )

  const toggleSaved = (id: string) => {
    setJobOffers(prev => 
      prev.map(job => 
        job.id === id ? { ...job, isSaved: !job.isSaved } : job
      )
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offres d'Emploi</h1>
          <p className="text-gray-500 mt-1">
            Trouvez les meilleures opportunités d'emploi et de stage au Sénégal.
          </p>
        </div>
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
                <label className="text-sm font-medium text-gray-700">Type de poste</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'Tous les types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Lieu</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'Toutes les villes' : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Salaire minimum</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <option>Aucun</option>
                  <option>500,000 FCFA</option>
                  <option>750,000 FCFA</option>
                  <option>1,000,000 FCFA</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Domaine</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <option>Tous domaines</option>
                  <option>Informatique</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Ressources Humaines</option>
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
                placeholder="Rechercher par métier, entreprise ou mot-clé..."
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
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{job.title}</h2>
                              <Badge variant="outline" className="text-[10px] px-2 py-1">
                                {job.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-gray-500">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{job.salary}</p>
                              <p className="text-xs text-gray-500">Par mois</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mt-3">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.requirements.map((req: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {req}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Publié le {job.postedDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Candidatures jusqu'au {job.deadline.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 min-w-[160px]">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-9 border-gray-200 hover:bg-gray-50"
                          onClick={() => toggleSaved(job.id)}
                        >
                          <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-current text-blue-500' : ''}`} />
                          {job.isSaved ? 'Sauvegardé' : 'Sauvegarder'}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          className="h-9 bg-fibem-primary hover:bg-fibem-primary/90"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Postuler
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
                <Briefcase className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                <p className="font-bold text-gray-500">Aucune offre d'emploi trouvée.</p>
                <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}