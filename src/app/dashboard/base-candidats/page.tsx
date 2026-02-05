'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    Search,
    Filter,
    User,
    MapPin,
    Briefcase,
    GraduationCap,
    Award,
    Mail,
    Phone,
    Download,
    Eye,
    MessageCircle,
    Star,
    Users,
    Tag,
    Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data for candidates
const mockCandidates = [
  {
    id: '1',
    name: 'Fatou Diop',
    title: 'Développeur Full Stack',
    location: 'Dakar, Sénégal',
    experience: '3 ans',
    education: 'Licence en Informatique',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    rating: 4.8,
    applications: 12,
    lastActive: new Date('2024-01-20'),
    email: 'fatou.diop@email.com',
    phone: '+221 33 123 45 67',
    resume: 'disponible',
    status: 'Actif'
  },
  {
    id: '2',
    name: 'Mamadou Sow',
    title: 'Designer UX/UI',
    location: 'Thiès, Sénégal',
    experience: '2 ans',
    education: 'Master en Design Graphique',
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototypage'],
    rating: 4.6,
    applications: 8,
    lastActive: new Date('2024-01-18'),
    email: 'mamadou.sow@email.com',
    phone: '+221 33 987 65 43',
    resume: 'disponible',
    status: 'Actif'
  },
  {
    id: '3',
    name: 'Aminata Diallo',
    title: 'Comptable Junior',
    location: 'Saint-Louis, Sénégal',
    experience: '1 an',
    education: 'BTS en Comptabilité',
    skills: ['Comptabilité', 'SAGE', 'Excel', 'Analyse financière'],
    rating: 4.5,
    applications: 5,
    lastActive: new Date('2024-01-15'),
    email: 'aminata.diallo@email.com',
    phone: '+221 33 456 78 90',
    resume: 'disponible',
    status: 'En pause'
  }
]

export default function BaseCandidatsPage() {
  const { data: session } = useSession()
  const [candidates, setCandidates] = useState<any[]>(mockCandidates)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')

  const skills = ['all', 'JavaScript', 'React', 'Node.js', 'Design', 'Comptabilité', 'Marketing']
  const locations = ['all', 'Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Diourbel']
  const experiences = ['all', 'Moins de 1 an', '1-2 ans', '2-5 ans', 'Plus de 5 ans']

  const filteredCandidates = candidates.filter(candidate =>
    (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     candidate.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedSkill === 'all' || candidate.skills.includes(selectedSkill)) &&
    (selectedLocation === 'all' || candidate.location.includes(selectedLocation)) &&
    (selectedExperience === 'all' || candidate.experience.includes(selectedExperience.split('-')[0]))
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Base de Candidats</h1>
          <p className="text-gray-500 mt-1">
            Explorez et contactez les meilleurs talents du Sénégal.
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
                <label className="text-sm font-medium text-gray-700">Compétence principale</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  {skills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill === 'all' ? 'Toutes compétences' : skill}
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
                <label className="text-sm font-medium text-gray-700">Expérience</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  {experiences.map(exp => (
                    <option key={exp} value={exp}>
                      {exp === 'all' ? 'Toute expérience' : exp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Niveau d'étude</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <option>Tous niveaux</option>
                  <option>Licence</option>
                  <option>Master</option>
                  <option>Doctorat</option>
                  <option>Bac + 2</option>
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
                placeholder="Rechercher par nom, titre, compétence ou mot-clé..."
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
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-fibem-primary/10 rounded-2xl flex items-center justify-center">
                          <User className="w-8 h-8 text-fibem-primary" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{candidate.name}</h2>
                              <Badge variant={candidate.status === 'Actif' ? 'default' : 'secondary'}>
                                {candidate.status}
                              </Badge>
                            </div>
                            <p className="text-fibem-primary font-medium">{candidate.title}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-bold text-gray-900">{candidate.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{candidate.experience} d'expérience</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            <span>{candidate.education}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {candidate.skills.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Dernière activité: {candidate.lastActive.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{candidate.applications} candidatures</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 min-w-[160px]">
                        <Button variant="outline" size="sm" className="h-9 border-gray-200 hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir profil
                        </Button>
                        
                        <Button variant="outline" size="sm" className="h-9 border-gray-200 hover:bg-gray-50">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contacter
                        </Button>
                        
                        <Button size="sm" className="h-9 bg-fibem-primary hover:bg-fibem-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          CV
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCandidates.length === 0 && (
              <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
                <Users className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                <p className="font-bold text-gray-500">Aucun candidat trouvé.</p>
                <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}