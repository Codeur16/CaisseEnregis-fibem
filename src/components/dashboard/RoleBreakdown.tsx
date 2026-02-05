import { Bell, Briefcase, Calendar, CreditCard, FileCheck, FileText, LayoutDashboard, MousePointerClick, Search, ShieldCheck, Star, Store, TrendingUp, Upload, User, Users, Wrench } from 'lucide-react';
import Link from 'next/link';

interface RoleAction {
    icon: React.ElementType;
    text: string;
    href: string;
}

interface RoleData {
    title: string;
    goal: string;
    actions: RoleAction[];
    color: string;
}

const roleBreakdowns: Record<string, RoleData> = {
    PARTICULIER: {
        title: 'Particulier (Client Final)',
        goal: 'Trouver et embaucher des professionnels pour des services.',
        color: 'blue',
        actions: [
            { icon: Search, text: 'Rechercher des professionnels par type d\'emploi, lieu et avis.', href: '/dashboard/recherche' },
            { icon: User, text: 'Consulter les profils détaillés et les portfolios.', href: '/dashboard/recherche' },
            { icon: FileText, text: 'Demander un devis personnalisé.', href: '/dashboard/devis/nouveau' },
            { icon: CreditCard, text: 'Valider et payer en ligne en toute sécurité.', href: '/dashboard/paiements' },
            { icon: TrendingUp, text: 'Suivre l\'avancement du projet en temps réel.', href: '/dashboard/commandes' },
            { icon: Star, text: 'Laisser des notes et des avis après la prestation.', href: '/dashboard/avis' },
        ],
    },
    CANDIDAT: {
        title: 'Candidat (Chercheur d\'emploi / Stagiaire)',
        goal: 'Trouver des opportunités d\'emploi ou de stage et postuler.',
        color: 'green',
        actions: [
            { icon: FileText, text: 'Créer un profil à l\'aide d\'un formulaire standardisé.', href: '/dashboard/profil' },
            { icon: Upload, text: 'Télécharger votre CV et votre lettre de motivation.', href: '/dashboard/mon-cv' },
            { icon: Search, text: 'Rechercher des emplois/stages par mots-clés et lieu.', href: '/dashboard/emplois' },
            { icon: MousePointerClick, text: 'Postuler en un clic.', href: '/dashboard/emplois' },
            { icon: TrendingUp, text: 'Suivre le statut de votre candidature (ex: "reçu", "rejeté").', href: '/dashboard/candidatures' },
            { icon: Bell, text: 'Recevoir des alertes emploi personnalisées.', href: '/dashboard/alertes' },
        ],
    },
    PROFESSIONNEL: {
        title: 'Professionnel (Prestataire de services)',
        goal: 'Proposer des services, gérer les clients et être payé.',
        color: 'purple',
        actions: [
            { icon: Store, text: 'S\'inscrire et créer une vitrine/un profil numérique.', href: '/dashboard/ma-vitrine' },
            { icon: Briefcase, text: 'Publier vos services et vos tarifs.', href: '/dashboard/mes-services' },
            { icon: Users, text: 'Recevoir et gérer les demandes des clients.', href: '/dashboard/demandes' },
            { icon: FileCheck, text: 'Générer et envoyer des devis automatiquement.', href: '/dashboard/documents' },
            { icon: Calendar, text: 'Gérer les projets et planifier les rendez-vous.', href: '/dashboard/calendrier' },
            { icon: CreditCard, text: 'Émettre des factures et suivre les paiements.', href: '/dashboard/mes-factures' },
        ],
    },
    RECRUTEUR: {
        title: 'Recruteur (Employeur / Recrutement)',
        goal: 'Publier des offres d\'emploi et trouver des candidats qualifiés.',
        color: 'orange',
        actions: [
            { icon: Briefcase, text: 'Publier des offres d\'emploi ou de stage.', href: '/dashboard/publier-offre' },
            { icon: Search, text: 'Rechercher dans la base de données par compétences, expérience, etc.', href: '/dashboard/talent-pool' },
            { icon: Users, text: 'Examiner et gérer les candidatures.', href: '/dashboard/candidatures' },
            { icon: TrendingUp, text: 'Suivre le pipeline de recrutement (entretiens, embauches).', href: '/dashboard/recrutement-tracking' },
            { icon: LayoutDashboard, text: 'Utiliser des outils de support RH (modèles de CV, facturation).', href: '/dashboard/outils-rh' },
        ],
    },
    ADMIN: {
        title: 'Administrateur (Équipe interne)',
        goal: 'Gérer, surveiller et exploiter la plateforme.',
        color: 'red',
        actions: [
            { icon: LayoutDashboard, text: 'Accéder à un tableau de bord d\'administration personnalisé.', href: '/dashboard/admin/stats' },
            { icon: ShieldCheck, text: 'Superviser toutes les activités, documents et transactions.', href: '/dashboard/utilisateurs' },
            { icon: Users, text: 'Gérer le contenu, les utilisateurs et les paramètres du système.', href: '/dashboard/admin/gestion-utilisateurs' },
            { icon: FileText, text: 'Générer des rapports et assurer la conformité.', href: '/dashboard/admin/rapports' },
            { icon: Wrench, text: 'Utiliser des outils techniques ou commerciaux selon votre rôle.', href: '/dashboard/parametres' },
        ],
    },
};

export default function RoleBreakdown({ role }: { role: string }) {
    const normalizedRole = role.toUpperCase().trim();
    const data = roleBreakdowns[normalizedRole];

    if (!data) return null;

    const colorClasses: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-50 text-blue-700',
        green: 'border-green-500 bg-green-50 text-green-700',
        purple: 'border-purple-500 bg-purple-50 text-purple-700',
        orange: 'border-orange-500 bg-orange-50 text-orange-700',
        red: 'border-red-500 bg-red-50 text-red-700',
    };

    const iconColorClasses: Record<string, string> = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600',
        red: 'text-red-600',
    };

    return (
        <div className={`rounded-xl border-l-4 p-6 shadow-sm ${colorClasses[data.color] || colorClasses.blue}`}>
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold">Votre rôle : {data.title}</h3>
            </div>

            <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-1">Objectif principal :</p>
                <p className="text-gray-700">{data.goal}</p>
            </div>

            <div>
                <p className="font-semibold text-gray-800 mb-3">Actions principales :</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.actions.map((action, index) => (
                        <li key={index}>
                            <Link
                                href={action.href}
                                className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-fibem-primary hover:shadow-md transition-all group h-full"
                            >
                                <div className={`mt-1 ${iconColorClasses[data.color] || iconColorClasses.blue} group-hover:scale-110 transition-transform`}>
                                    <action.icon size={18} />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-fibem-primary transition-colors">{action.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
