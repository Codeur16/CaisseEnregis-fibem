'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Search,
    Star,
    MapPin,
    Phone,
    Mail,
    Clock,
    Filter,
    Heart,
    MessageCircle,
    Building2,
    Award,
    Users,
    CheckCircle,
    Loader2,
    X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { fetchServices, fetchServiceCategories, createServiceRequest } from '@/actions/services'

interface Service {
  id: number
  category_name: string
  description: string
  base_price: number
  image?: string
  is_active: boolean
  category: number
}

interface ServiceCategory {
  id: number
  name: string
}

export default function ProfessionnelsPage() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [requestDescription, setRequestDescription] = useState('')
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  // Fetch services using react-query
  const { data: services = [], isLoading: servicesLoading, isError: servicesError } = useQuery({
    queryKey: ['services', { category: selectedCategory !== 'all' ? selectedCategory : undefined }],
    queryFn: () => fetchServices(selectedCategory !== 'all' ? { category: selectedCategory } : undefined),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Fetch service categories using react-query
  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['serviceCategories'],
    queryFn: () => fetchServiceCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Mutation for creating service requests
  const createServiceRequestMutation = useMutation({
    mutationFn: ({ serviceId, description, token }: { serviceId: number; description: string; token: string }) => {
      return createServiceRequest({
        token,
        data: {
          service: serviceId,
          description
        }
      })
    },
    onSuccess: () => {
      toast.success('Demande de service envoyée avec succès!')
      setIsRequestModalOpen(false)
      setRequestDescription('')
      setSelectedService(null)
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
    onError: (error) => {
      console.error('Error creating service request:', error)
      toast.error('Erreur lors de l\'envoi de la demande de service')
    }
  })

  // Convert services to professionals format
  const professionals = services.map(service => ({
    id: service.id.toString(),
    name: service.category_name,
    category: service.category_name,
    rating: 4.5, // Placeholder rating
    reviews: Math.floor(Math.random() * 100) + 10, // Placeholder reviews count
    description: service.description,
    base_price: service.base_price,
    image: service.image,
    is_active: service.is_active,
    category_id: service.category,
    service_data: service // Store the full service object for later use
  }))

  const filteredProfessionals = professionals.filter(pro =>
    (pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     pro.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     pro.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || pro.category_id === selectedCategory)
  )

  // Handle opening the request modal
  const handleOpenRequestModal = (service: Service) => {
    setSelectedService(service)
    setIsRequestModalOpen(true)
  }

  // Handle submitting the service request
  const handleSubmitRequest = () => {
    // Validate all required fields
    if (!selectedService) {
      toast.error('Veuillez sélectionner un service')
      return
    }

    if (!requestDescription || requestDescription.trim().length === 0) {
      toast.error('Veuillez remplir la description de votre demande')
      return
    }

    if (!session?.accessToken) {
      toast.error('Vous devez être connecté pour envoyer une demande')
      console.error('Session or access token missing:', { session, token: session?.accessToken })
      return
    }

    console.log('Submitting request with:', {
      serviceId: selectedService.id,
      description: requestDescription,
      hasToken: !!session?.accessToken
    })

    createServiceRequestMutation.mutate({
      serviceId: selectedService.id,
      description: requestDescription,
      token: session.accessToken
    })
  }

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement des professionnels...</p>
      </div>
    )
  }

  if (servicesError || categoriesError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 font-medium">Erreur de chargement des données</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trouver un Professionnel</h1>
          <p className="text-gray-500 mt-1">
            Recherchez et contactez les meilleurs professionnels près de chez vous.
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
                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                placeholder="Rechercher par service ou nom..."
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
            {filteredProfessionals.map((pro) => (
              <Card key={pro.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="shrink-0">
                      <div className="w-24 h-24 bg-fibem-primary/10 rounded-2xl flex items-center justify-center">
                        {pro.image ? (
                          <img
                            src={pro.image}
                            alt={pro.name}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <Building2 className="w-10 h-10 text-fibem-primary" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{pro.name}</h2>
                          </div>
                          <p className="text-fibem-primary font-medium">{pro.category}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">{pro.rating}</span>
                          <span className="text-gray-500">({pro.reviews})</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-3">{pro.description}</p>

                      <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span>Prix de base: </span>
                          <span className="font-bold text-gray-900">€ {pro.base_price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-40">
                      <Button
                        size="sm"
                        className="h-9 bg-fibem-primary hover:bg-fibem-primary/90"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contacter
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-gray-200 hover:bg-gray-50"
                        onClick={() => handleOpenRequestModal(pro.service_data)}
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredProfessionals.length === 0 && (
              <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
                <Search className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                <p className="font-bold text-gray-500">Aucun professionnel trouvé.</p>
                <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Demander un service</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmitRequest()
        }}>
          <div className="space-y-4 py-4">
            {selectedService && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{selectedService.category_name}</h3>
                <p className="text-gray-600 text-sm">{selectedService.description}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description de votre demande *</Label>
              <Textarea
                id="description"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="Décrivez ce que vous souhaitez faire réaliser..."
                rows={4}
                className="w-full"
                required
              />
            </div>
          </div>

          <Separator className="my-2" />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsRequestModalOpen(false)
                setRequestDescription('')
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={createServiceRequestMutation.isPending}
              className="bg-fibem-primary hover:bg-fibem-primary/90"
            >
              {createServiceRequestMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer la demande'
              )}
            </Button>
          </DialogFooter>
        </form>
    </DialogContent>
  </Dialog>
  </div>
  )
}