'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  ShoppingCart,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Star,
  BarChart3,
  Users,
} from 'lucide-react'

// Sidebar items by role
const sidebarItemsByRole: Record<string, Array<{ icon: any; label: string; href: string; badge?: number }>> = {
  PARTICULIER: [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard' },
    { icon: User, label: 'Mon Profil', href: '/dashboard/profil' },
    { icon: Briefcase, label: 'Trouver un Pro', href: '/dashboard/professionnels' },
    { icon: ShoppingCart, label: 'Mes Commandes', href: '/dashboard/commandes' },
    // { icon: FileText, label: 'Mes Devis & Factures', href: '/dashboard/documents' },
    // { icon: Briefcase, label: 'Mes Projets', href: '/dashboard/projets' },
    // { icon: Star, label: 'Mes Avis', href: '/dashboard/avis' },
    // { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    // { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 5 },
    // { icon: Settings, label: 'Paramètres', href: '/dashboard/parametres' },
  ],
  PROFESSIONNEL: [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard' },
    { icon: User, label: 'Mon Profil', href: '/dashboard/profil' },
    { icon: Briefcase, label: 'Mes Services', href: '/dashboard/mes-services' },
    // { icon: FileText, label: 'Mes Devis & Factures', href: '/dashboard/documents' },
    { icon: ShoppingCart, label: 'Mes Commandes', href: '/dashboard/commandes' },
    { icon: Briefcase, label: 'Mes Projets', href: '/dashboard/projets' },
    // { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    // { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 5 },
    // { icon: Settings, label: 'Paramètres', href: '/dashboard/parametres' },
  ],
  CANDIDAT: [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard' },
    { icon: User, label: 'Mon Profil', href: '/dashboard/profil' },
    { icon: Briefcase, label: 'Rechercher Emploi', href: '/dashboard/offres-emploi' },
    // { icon: FileText, label: 'Mes Candidatures', href: '/dashboard/candidatures' },
    // { icon: Briefcase, label: 'Mes Offres Sauvegardées', href: '/dashboard/offres' },
    // { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    // { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 5 },
    // { icon: Settings, label: 'Paramètres', href: '/dashboard/parametres' },
  ],
  RECRUTEUR: [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard' },
    { icon: User, label: 'Mon Profil', href: '/dashboard/profil' },
    { icon: Briefcase, label: 'Publier une Offre', href: '/dashboard/offres' },
    { icon: Users, label: 'Base de Candidats', href: '/dashboard/base-candidats' },
    { icon: Briefcase, label: 'Mes Offres', href: '/dashboard/offres' },
    { icon: FileText, label: 'Candidatures', href: '/dashboard/candidatures' },
    // { icon: ShoppingCart, label: 'Mes Équipes', href: '/dashboard/equipes' },
    // { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    // { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 5 },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/parametres' },
  ],
  ADMIN: [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard' },
    { icon: User, label: 'Gestion Utilisateurs', href: '/dashboard/utilisateurs' },
    { icon: FileText, label: 'Documents & Factures', href: '/dashboard/documents' },
    { icon: Briefcase, label: 'Gestion Projets', href: '/dashboard/projets' },
    { icon: ShoppingCart, label: 'Commandes', href: '/dashboard/commandes' },
    { icon: BarChart3, label: 'Rapports & Analyses', href: '/dashboard/reports' },
    // { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    // { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    // { icon: Settings, label: 'Paramètres Système', href: '/dashboard/parametres' },
  ],
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userRole = (session?.user?.role as string) || 'PARTICULIER'
  const sidebarItems = sidebarItemsByRole[userRole] || sidebarItemsByRole.PARTICULIER

  const handleLogout = async () => {
    const { signOut } = await import('next-auth/react')
    signOut({ redirectTo: '/connexion' })
  }

  // Function to check if the current route matches the item's href or is a child route
  const isActiveRoute = (href: string) => {
    // Check if pathname is defined before using startsWith
    if (!pathname) return false;
    // Check if the current path starts with the href (for parent/child relationships)
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-fibem-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FB</span>
              </div>
              <div>
                <h1 className="text-fibem-primary font-bold">FIBEM</h1>
                <p className="text-xs text-gray-500">Tableau de bord</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-fibem-primary/10 text-fibem-primary border-l-4 border-l-fibem-primary'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-fibem-primary' : ''}`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-fibem-accent text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t space-y-4">
            <Link href={"/dashboard/profil"} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-fibem-primary rounded-full flex items-center justify-center text-white font-bold">
                {session?.user?.first_name?.[0]}{session?.user?.last_name?.[0]}
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {session?.user?.first_name} {session?.user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 cursor-pointer py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Vue d'ensemble</h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
