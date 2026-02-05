import Link from 'next/link'
import {
  Search,
  FileUp,
  PlusCircle,
  Briefcase,
  FileText,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react'
import RoleBreakdown from '@/components/dashboard/RoleBreakdown'

const roleContent: Record<string, {
  title: string;
  description: string;
  actions: Array<{ label: string; href: string; icon: any; color: string }>
}> = {
  PARTICULIER: {
    title: 'Espace Particulier',
    description: 'Trouvez les meilleurs professionnels pour vos projets.',
    actions: [
      { label: 'Rechercher un pro', href: '/services/prestations', icon: Search, color: 'text-blue-600 bg-blue-50' },
      { label: 'Mes devis', href: '/dashboard/documents', icon: FileText, color: 'text-green-600 bg-green-50' },
      { label: 'Suivre mes projets', href: '/dashboard', icon: LayoutDashboard, color: 'text-purple-600 bg-purple-50' },
    ]
  },
  PROFESSIONNEL: {
    title: 'Espace Professionnel',
    description: 'Développez votre activité et gérez vos clients.',
    actions: [
      { label: 'Publier un service', href: '/services/prestations', icon: PlusCircle, color: 'text-green-600 bg-green-50' },
      { label: 'Gérer mes devis', href: '/dashboard/documents', icon: FileText, color: 'text-blue-600 bg-blue-50' },
      { label: 'Mes statistiques', href: '/dashboard', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
    ]
  },
  CANDIDAT: {
    title: 'Espace Candidat',
    description: 'Propulsez votre carrière avec nos offres exclusives.',
    actions: [
      { label: 'Chercher un emploi', href: '/emploi/offres', icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
      { label: 'Mettre à jour mon profil', href: '/dashboard/profil', icon: FileUp, color: 'text-green-600 bg-green-50' },
      { label: 'Mes candidatures', href: '/dashboard/candidatures', icon: FileText, color: 'text-purple-600 bg-purple-50' },
    ]
  },
  RECRUTEUR: {
    title: 'Espace Recruteur',
    description: 'Recrutez les meilleurs talents pour votre entreprise.',
    actions: [
      { label: 'Publier une offre', href: '/emploi/offres', icon: PlusCircle, color: 'text-blue-600 bg-blue-50' },
      { label: 'Base de candidats', href: '/dashboard/utilisateurs', icon: Users, color: 'text-green-600 bg-green-50' },
      { label: 'Pipelines de recrutement', href: '/dashboard/candidatures', icon: FileText, color: 'text-purple-600 bg-purple-50' },
    ]
  },
  ADMIN: {
    title: 'Espace Administration',
    description: 'Gestion globale de la plateforme senfibem.',
    actions: [
      { label: 'Utilisateurs', href: '/dashboard/utilisateurs', icon: Users, color: 'text-blue-600 bg-blue-50' },
      { label: 'Documents & Factures', href: '/dashboard/documents', icon: FileText, color: 'text-green-600 bg-green-50' },
      { label: 'Configuration', href: '/dashboard/parametres', icon: Settings, color: 'text-purple-600 bg-purple-50' },
    ]
  },
}

interface DashboardRolePageParams {
  params: Promise<{
    role: string
    locale: string
  }>
}

export default async function DashboardRolePage({ params }: DashboardRolePageParams) {
  const { role: rawRole } = await params
  const role = rawRole?.toUpperCase() || 'PARTICULIER'
  const content = roleContent[role] || roleContent.PARTICULIER

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
          <p className="text-gray-600 max-w-2xl">{content.description}</p>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-fibem-primary/5 rounded-full blur-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-fibem-primary/20 transition-all hover:-translate-y-1"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 group-hover:text-fibem-primary transition-colors">
              {action.label}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-gray-500">Accéder rapidement à cette section.</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <RoleBreakdown role={role} />
      </div>
    </div>
  )
}

// Generate static params for SSG
export async function generateStaticParams() {
  // Rôles disponibles dans le système
  const roles = ['particulier', 'professionnel', 'candidat', 'recruteur', 'admin']
  
  return roles.map((role) => ({
    role,
  }))
}