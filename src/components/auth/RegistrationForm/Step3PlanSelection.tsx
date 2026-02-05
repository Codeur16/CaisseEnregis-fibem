











// 'use client'

// import { motion } from 'framer-motion'
// import { useI18n, useScopedI18n } from '@/locales/client'
// import { Button } from '@/components/ui/button'
// import { 
//   Building, 
//   Users, 
//   User, 
//   Briefcase, 
//   GraduationCap,
//   ShoppingBag,
//   CreditCard,
//   Settings,
//   Check
// } from 'lucide-react'
// import { UserRole, ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS } from '@/lib/auth/roles'

// const ROLE_ICONS: Record<UserRole, React.ComponentType<any>> = {
//   COMPANY_ADMIN: Building,
//   COMPANY_MANAGER: Users,
//   COMPANY_CASHIER: CreditCard,
//   RECRUITER: Briefcase,
//   CANDIDATE: User,
//   CANDIDATE_PREMIUM: User,
//   FREELANCER: ShoppingBag,
//   INDIVIDUAL: User,
//   SUPER_ADMIN: Settings,
// }

// const ROLE_CATEGORIES = [
//   {
//     id: 'business',
//     name: 'Entreprises',
//     description: 'Solutions complètes pour les entreprises',
//     icon: Building,
//     roles: ['COMPANY_ADMIN', 'COMPANY_MANAGER', 'COMPANY_CASHIER'] as UserRole[],
//   },
//   {
//     id: 'employment',
//     name: 'Emploi & Recrutement',
//     description: 'Trouver ou publier des offres d\'emploi',
//     icon: Briefcase,
//     roles: ['RECRUITER', 'CANDIDATE', 'CANDIDATE_PREMIUM'] as UserRole[],
//   },
//   {
//     id: 'individual',
//     name: 'Particuliers & Professionnels',
//     description: 'Solutions pour indépendants et particuliers',
//     icon: User,
//     roles: ['FREELANCER', 'INDIVIDUAL'] as UserRole[],
//   },
// ]

// interface Step1ProfileSelectionProps {
//   selectedRole: UserRole | null
//   onRoleSelect: (role: UserRole) => void
//   onNext: () => void
//   canProceed: boolean
// }

// export default function Step1ProfileSelection({
//   selectedRole,
//   onRoleSelect,
//   onNext,
//   canProceed,
// }: Step1ProfileSelectionProps) {
//   const t = useI18n()
//   const tAuth = useScopedI18n('auth.inscription')

//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
//           {tAuth('step1.accountType')}
//         </h2>
//         <p className="text-fibem-textSecondary">
//           {tAuth('step1.selectProfile')}
//         </p>
//       </div>

//       {/* Catégories de profils */}
//       <div className="space-y-8">
//         {ROLE_CATEGORIES.map((category) => (
//           <div key={category.id}>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-fibem-primary/10 rounded-xl flex items-center justify-center">
//                 <category.icon className="w-5 h-5 text-fibem-primary" />
//               </div>
//               <div>
//                 <h3 className="font-bold text-fibem-dark">{category.name}</h3>
//                 <p className="text-sm text-fibem-textSecondary">{category.description}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {category.roles.map((role) => {
//                 const Icon = ROLE_ICONS[role]
//                 const isSelected = selectedRole === role
                
//                 return (
//                   <motion.button
//                     key={role}
//                     type="button"
//                     onClick={() => onRoleSelect(role)}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className={`relative p-5 rounded-xl border-2 transition-all duration-200 text-left ${
//                       isSelected
//                         ? 'border-fibem-primary bg-fibem-primary/5 shadow-lg'
//                         : 'border-fibem-border hover:border-fibem-primary/30 hover:bg-fibem-surface'
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className={`w-12 h-12 rounded-lg ${
//                         isSelected ? 'bg-fibem-primary' : 'bg-fibem-primary/10'
//                       } flex items-center justify-center`}>
//                         <Icon className={`w-6 h-6 ${
//                           isSelected ? 'text-white' : 'text-fibem-primary'
//                         }`} />
//                       </div>
//                       {isSelected && (
//                         <div className="w-6 h-6 bg-fibem-primary rounded-full flex items-center justify-center">
//                           <Check className="w-4 h-4 text-white" />
//                         </div>
//                       )}
//                     </div>

//                     <h4 className={`font-bold text-lg mb-2 ${
//                       isSelected ? 'text-fibem-primary' : 'text-fibem-dark'
//                     }`}>
//                       {ROLE_DISPLAY_NAMES[role]}
//                     </h4>
                    
//                     <p className="text-sm text-fibem-textSecondary leading-relaxed">
//                       {ROLE_DESCRIPTIONS[role]}
//                     </p>

//                     {/* Badge Premium pour CANDIDATE_PREMIUM */}
//                     {role === 'CANDIDATE_PREMIUM' && (
//                       <div className="mt-3 inline-block px-3 py-1 bg-linear-to-r from-fibem-warning to-fibem-warning/80 text-white text-xs font-medium rounded-full">
//                         Premium
//                       </div>
//                     )}
//                   </motion.button>
//                 )
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Boutons de navigation */}
//       <div className="flex justify-end pt-6">
//         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//           <Button
//             onClick={onNext}
//             disabled={!canProceed}
//             className="px-8 py-3 bg-linear-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
//           >
//             {selectedRole ? `Continuer en tant que ${ROLE_DISPLAY_NAMES[selectedRole]}` : 'Sélectionnez un profil'}
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </Button>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n, useScopedI18n } from '@/locales/client'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Check, 
  Star, 
  Clock, 
  Zap, 
  Shield, 
  Users,
  Building,
  Briefcase,
  CreditCard,
  BarChart3,
  Database,
  Lock,
  Globe,
  MessageSquare,
  FileText,
  ChevronRight,
  User
} from 'lucide-react'
import { UserRole } from '@/lib/auth/roles'
import { PLANS, SubscriptionPlan, BillingPeriod } from '@/lib/subscription/plans'
import { cn } from '@/lib/utils'

interface Step3PlanSelectionProps {
  selectedRole: UserRole
  selectedPlanId: string | null
  billingPeriod: BillingPeriod
  useTrial: boolean
  onPlanSelect: (planId: string) => void
  onBillingPeriodChange: (period: BillingPeriod) => void
  onTrialChange: (useTrial: boolean) => void
  onBack: () => void
  onNext: () => void
  canProceed: boolean
}

const ROLE_ICONS = {
  COMPANY_ADMIN: Building,
  COMPANY_MANAGER: Users,
  COMPANY_CASHIER: CreditCard,
  RECRUITER: Briefcase,
  CANDIDATE: Users,
  CANDIDATE_PREMIUM: Star,
  FREELANCER: Zap,
  INDIVIDUAL: User,
  SUPER_ADMIN: Shield,
}

const ROLE_FEATURES = {
  CANDIDATE: [
    { icon: FileText, text: '5 candidatures gratuites par mois' },
    { icon: Users, text: 'Profil visible par les recruteurs' },
    { icon: MessageSquare, text: 'Messagerie avec les entreprises' },
    { icon: Clock, text: 'Alertes emploi personnalisées' },
  ],
  INDIVIDUAL: [
    { icon: Globe, text: 'Accès à toutes les annonces' },
    { icon: MessageSquare, text: 'Contact direct avec prestataires' },
    { icon: Shield, text: 'Évaluations et avis vérifiés' },
    { icon: Clock, text: 'Support réactif' },
  ],
}

export default function Step3PlanSelection({
  selectedRole,
  selectedPlanId,
  billingPeriod,
  useTrial,
  onPlanSelect,
  onBillingPeriodChange,
  onTrialChange,
  onBack,
  onNext,
  canProceed,
}: Step3PlanSelectionProps) {
  const t = useI18n()
  const tAuth = useScopedI18n('auth.inscription')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  
  const availablePlans = PLANS[selectedRole] || []
  const isFreeRole = ['CANDIDATE', 'INDIVIDUAL'].includes(selectedRole)
  const RoleIcon = ROLE_ICONS[selectedRole] || Users
  const roleFeatures = ROLE_FEATURES[selectedRole as keyof typeof ROLE_FEATURES] || []

  // Pour les rôles gratuits
  if (isFreeRole) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-fibem-primary/10 to-fibem-secondary/10"
          >
            <RoleIcon className="w-10 h-10 text-fibem-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
            {selectedRole === 'CANDIDATE' 
              ? 'Commencez votre recherche d\'emploi'
              : 'Trouvez les meilleurs prestataires'}
          </h2>
          <p className="text-lg text-fibem-textSecondary max-w-2xl mx-auto">
            {selectedRole === 'CANDIDATE'
              ? 'Profitez de notre plateforme gratuite pour trouver votre prochain emploi'
              : 'Accédez gratuitement à notre réseau de professionnels qualifiés'}
          </p>
        </div>

        {/* Carte de compte gratuit */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-fibem-border bg-gradient-to-br from-white to-fibem-surface"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-fibem-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-fibem-secondary/5 to-transparent rounded-full translate-y-20 -translate-x-20" />
          
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-fibem-success to-fibem-success/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-fibem-dark">Compte Gratuit</h3>
                    <p className="text-fibem-textSecondary">
                      {selectedRole === 'CANDIDATE' 
                        ? 'Parfait pour commencer votre recherche'
                        : 'Idéal pour vos premiers projets'}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-fibem-success/10 text-fibem-success rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Aucune carte bancaire requise
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-5xl font-bold text-fibem-dark mb-1">0€</div>
                <p className="text-fibem-textSecondary">à vie</p>
              </div>
            </div>

            {/* Grille des fonctionnalités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {roleFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-fibem-border/50 hover:border-fibem-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-fibem-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-fibem-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-fibem-dark">{feature.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-fibem-border/50">
              <Button
                onClick={onBack}
                variant="outline"
                className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface px-6 py-3 h-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Changer de profil
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-fibem-textSecondary hidden sm:block">
                  <Check className="w-4 h-4 inline mr-2 text-fibem-success" />
                  Inscription en 2 minutes
                </div>
                <Button
                  onClick={onNext}
                  className="px-8 py-3 h-auto text-lg font-semibold bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white shadow-lg hover:shadow-xl"
                >
                  Continuer gratuitement
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* En-tête */}
      <div className="text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-fibem-primary/10 rounded-full"
        >
          <RoleIcon className="w-5 h-5 text-fibem-primary" />
          <span className="text-sm font-medium text-fibem-primary">
            {selectedRole.replace('_', ' ')}
          </span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
          Choisissez votre plan
        </h2>
        <p className="text-lg text-fibem-textSecondary max-w-3xl mx-auto">
          Sélectionnez l'abonnement qui correspond le mieux à vos besoins. 
          Tous les plans incluent un essai gratuit de 14 jours.
        </p>
      </div>

      {/* Option période d'essai */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "rounded-2xl p-5 border transition-all duration-300 cursor-pointer",
          useTrial
            ? "bg-gradient-to-r from-fibem-warning/10 to-fibem-success/10 border-fibem-warning/30 shadow-lg"
            : "bg-fibem-surface border-fibem-border hover:border-fibem-warning/30"
        )}
        onClick={() => onTrialChange(!useTrial)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
            useTrial 
              ? "bg-fibem-warning border-fibem-warning"
              : "border-fibem-border"
          )}>
            {useTrial && <Check className="w-3 h-3 text-white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-fibem-dark">
                Activer l'essai gratuit de 14 jours
              </h3>
              <span className="px-2 py-1 bg-fibem-warning/20 text-fibem-warning text-xs font-medium rounded-full">
                Recommandé
              </span>
            </div>
            <p className="text-fibem-textSecondary">
              Testez toutes les fonctionnalités sans engagement. Aucune carte bancaire requise pendant la période d'essai.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-fibem-dark">Gratuit</div>
            <p className="text-sm text-fibem-textSecondary">pendant 14 jours</p>
          </div>
        </div>
      </motion.div>

      {/* Sélecteur de période */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center bg-fibem-surface rounded-xl p-1 shadow-inner">
          <button
            type="button"
            onClick={() => onBillingPeriodChange('monthly')}
            className={cn(
              "px-8 py-3 rounded-xl font-medium transition-all duration-200",
              billingPeriod === 'monthly'
                ? "bg-white text-fibem-primary shadow-md"
                : "text-fibem-textSecondary hover:text-fibem-dark"
            )}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => onBillingPeriodChange('yearly')}
            className={cn(
              "px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2",
              billingPeriod === 'yearly'
                ? "bg-white text-fibem-primary shadow-md"
                : "text-fibem-textSecondary hover:text-fibem-dark"
            )}
          >
            Annuel
            <span className="px-2 py-1 bg-gradient-to-r from-fibem-success to-fibem-success/80 text-white text-xs font-bold rounded-full">
              ÉCONOMISEZ 17%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Grille des plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {availablePlans.map((plan, index) => {
          const price = billingPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly
          const isSelected = selectedPlanId === plan.id
          const isHovered = hoveredPlan === plan.id
          const yearlySavings = plan.price_monthly * 12 - plan.price_yearly

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "relative rounded-3xl border-2 transition-all duration-300 overflow-hidden",
                isSelected
                  ? "border-fibem-primary shadow-2xl scale-[1.02]"
                  : "border-fibem-border hover:border-fibem-primary/50 hover:shadow-xl",
                plan.isPopular && "ring-2 ring-fibem-primary/20"
              )}
            >
              {/* Badge populaire */}
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="px-6 py-2 bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white font-bold rounded-full shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-white" />
                    LE PLUS POPULAIRE
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* En-tête du plan */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-fibem-dark">{plan.name}</h3>
                    {isSelected && (
                      <div className="w-10 h-10 bg-fibem-primary rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-fibem-textSecondary">{plan.description}</p>
                </div>

                {/* Prix */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-fibem-dark">
                      {useTrial ? '0' : price}€
                    </span>
                    <span className="text-fibem-textSecondary">
                      {useTrial 
                        ? 'pendant l\'essai' 
                        : billingPeriod === 'monthly' 
                          ? '/mois' 
                          : '/an'
                      }
                    </span>
                  </div>
                  
                  {!useTrial && billingPeriod === 'yearly' && yearlySavings > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-fibem-success/10 text-fibem-success rounded-full">
                        Économisez {yearlySavings.toFixed(0)}€
                      </span>
                      <span className="text-fibem-textSecondary">
                        vs facturation mensuelle
                      </span>
                    </div>
                  )}
                </div>

                {/* Bouton de sélection */}
                <button
                  type="button"
                  onClick={() => onPlanSelect(plan.id)}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 mb-8",
                    isSelected
                      ? "bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white shadow-lg"
                      : "bg-fibem-surface text-fibem-dark border border-fibem-border hover:bg-fibem-primary/5 hover:border-fibem-primary/30"
                  )}
                >
                  {isSelected ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Sélectionné
                    </span>
                  ) : useTrial ? (
                    'Essayer gratuitement'
                  ) : (
                    'Choisir ce plan'
                  )}
                </button>

                {/* Fonctionnalités principales */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-fibem-dark">Ce plan inclut :</h4>
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-fibem-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded border border-fibem-border mt-0.5 flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included 
                          ? "text-fibem-dark" 
                          : "text-fibem-textSecondary/60 line-through"
                      )}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <p className="text-sm text-fibem-primary font-medium">
                      + {plan.features.length - 5} fonctionnalités supplémentaires
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Comparaison détaillée */}
      {availablePlans.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-fibem-dark mb-6 text-center">
            Comparaison détaillée des plans
          </h3>
          <div className="overflow-hidden rounded-2xl border border-fibem-border bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-fibem-border">
                  <th className="text-left p-6 font-semibold text-fibem-dark">Fonctionnalités</th>
                  {availablePlans.map((plan) => (
                    <th key={plan.id} className="text-center p-6">
                      <div className="font-bold text-fibem-dark">{plan.name}</div>
                      <div className="text-sm text-fibem-textSecondary mt-1">
                        {billingPeriod === 'monthly' 
                          ? `${plan.price_monthly}€/mois` 
                          : `${plan.price_yearly}€/an`
                        }
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {availablePlans[0]?.features.map((feature, index) => (
                  <tr key={index} className={cn(
                    "border-b border-fibem-border/30",
                    index % 2 === 0 && "bg-fibem-surface/50"
                  )}>
                    <td className="p-4 text-fibem-textSecondary font-medium">
                      {feature.name}
                    </td>
                    {availablePlans.map((plan) => (
                      <td key={plan.id} className="text-center p-4">
                        {plan.features[index]?.included ? (
                          <Check className="w-6 h-6 text-fibem-success mx-auto" />
                        ) : (
                          <span className="text-fibem-textSecondary/40 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Boutons de navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-fibem-border"
      >
        <Button
          onClick={onBack}
          variant="outline"
          className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface px-6 py-3 h-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au choix du profil
        </Button>
        
        <div className="flex items-center gap-4">
          {selectedPlanId && (
            <div className="text-sm text-fibem-textSecondary hidden md:block">
              <Check className="w-4 h-4 inline mr-2 text-fibem-success" />
              Plan sélectionné :{' '}
              <span className="font-semibold text-fibem-dark">
                {availablePlans.find(p => p.id === selectedPlanId)?.name}
              </span>
            </div>
          )}
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              "px-8 py-3 h-auto text-lg font-semibold shadow-lg hover:shadow-xl transition-all",
              canProceed
                ? "bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white"
                : "bg-fibem-border text-fibem-textSecondary cursor-not-allowed"
            )}
          >
            {canProceed 
              ? (useTrial ? 'Commencer mon essai gratuit' : 'Procéder au paiement')
              : 'Sélectionnez un plan'
            }
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}