'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    Star,
    Search,
    Filter,
    Loader2,
    Calendar,
    Clock,
    Building2,
    MapPin,
    CheckCircle2,
    XCircle,
    MoreHorizontal
} from 'lucide-react'
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

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    service: 'Plomberie',
    professional: 'SARL Dupont',
    rating: 5,
    comment: 'Travail impeccable, très professionnel et ponctuel.',
    date: new Date('2024-01-15'),
    projectStatus: 'COMPLETED'
  },
  {
    id: '2',
    service: 'Électricité',
    professional: 'Tech Services',
    rating: 4,
    comment: 'Bon travail mais un peu en retard sur les délais annoncés.',
    date: new Date('2024-01-10'),
    projectStatus: 'COMPLETED'
  },
  {
    id: '3',
    service: 'Peinture',
    professional: 'Artisan Peintre',
    rating: 5,
    comment: 'Excellent travail, très satisfaite du résultat.',
    date: new Date('2024-01-05'),
    projectStatus: 'COMPLETED'
  }
]

export default function AvisPage() {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setReviews(mockReviews)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredReviews = reviews.filter(review =>
    review.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.professional.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement de vos avis...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Avis & Notes</h1>
          <p className="text-gray-500 mt-1">
            Gérez et consultez vos évaluations des professionnels.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher par service, professionnel ou commentaire..."
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
        {filteredReviews.map((review) => (
          <Card key={review.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{review.service}</h2>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium">{review.rating}/5</span>
                    </div>
                  </div>

                  <p className="text-gray-600">{review.comment}</p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[13px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {review.professional}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Publié le {review.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      Statut: {review.projectStatus.toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="hover:text-fibem-primary hover:bg-blue-50">
                    Modifier
                  </Button>
                  <Button size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none font-bold">
                    Voir détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredReviews.length === 0 && (
          <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
            <Star className="w-16 h-16 text-gray-100 mx-auto mb-4" />
            <p className="font-bold text-gray-500">Aucun avis trouvé.</p>
            <p className="text-sm mt-1">Vous n'avez pas encore laissé d'avis sur les services utilisés.</p>
          </div>
        )}
      </div>
    </div>
  )
}