'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    Tag,
    Clock,
    DollarSign,
    Users,
    CheckCircle,
    AlertCircle,
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
import { useServiceStore } from '@/stores/serviceStore'

// Mock data for services
const mockServices = [
  {
    id: '1',
    name: 'Installation Plomberie',
    category: 'Plomberie',
    description: 'Installation complète de systèmes de plomberie pour maisons neuves ou rénovations.',
    price: 50000,
    duration: '1-2 jours',
    status: 'active',
    bookings: 12,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Réparation Urgence',
    category: 'Plomberie',
    description: 'Service d\'urgence pour fuites, bouchages et autres problèmes de plomberie.',
    price: 25000,
    duration: '2-4 heures',
    status: 'active',
    bookings: 8,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Installation Électrique',
    category: 'Électricité',
    description: 'Installation électrique complète pour logements et commerces.',
    price: 75000,
    duration: '2-3 jours',
    status: 'inactive',
    bookings: 5,
    rating: 4.7
  }
]

export default function MesServicesPage() {
  const { data: session } = useSession()
  const [services, setServices] = useState<any[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const {onAdd} = useServiceStore()

  const categories = ['all', 'Plomberie', 'Électricité', 'Peinture', 'Maçonnerie', 'Menuiserie']
  const statuses = ['all', 'active', 'inactive']

  const filteredServices = services.filter(service =>
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    (selectedStatus === 'all' || service.status === selectedStatus)
  )

  const toggleServiceStatus = (id: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' } 
          : service
      )
    )
  }

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Services</h1>
          <p className="text-gray-500 mt-1">
            Gérez vos services proposés aux clients.
          </p>
        </div>
        <Button onClick={onAdd} className="h-11 bg-fibem-primary hover:bg-fibem-primary/90 font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un service
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, catégorie ou description..."
            className="pl-10 h-11 border-gray-100 bg-white focus-visible:ring-fibem-primary/20 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-11 border-gray-100 bg-white">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{service.name}</h2>
                      <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                        {service.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{service.price.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{service.bookings} réservations</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{service.rating} / 5</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 border-gray-200 hover:bg-gray-50">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 border-gray-200 hover:bg-gray-50">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem 
                          className="py-2 cursor-pointer font-medium"
                          onClick={() => toggleServiceStatus(service.id)}
                        >
                          {service.status === 'active' ? (
                            <>
                              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" /> Désactiver
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Activer
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                          <Edit className="w-4 h-4 mr-2 text-blue-500" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="py-2 cursor-pointer font-medium text-destructive"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredServices.length === 0 && (
          <div className="py-24 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-100">
            <Tag className="w-16 h-16 text-gray-100 mx-auto mb-4" />
            <p className="font-bold text-gray-500">Aucun service trouvé.</p>
            <p className="text-sm mt-1">Commencez par ajouter vos premiers services.</p>
            <Button className="mt-4 bg-fibem-primary hover:bg-fibem-primary/90 font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un service
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}