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
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Building, 
  Users, 
  User, 
  Briefcase, 
  ShoppingBag,
  CreditCard,
  Settings,
  Check
} from 'lucide-react'
import { UserRole, ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS } from '@/lib/auth/roles'

const ROLE_ICONS: Record<UserRole, React.ComponentType<any>> = {
  COMPANY_ADMIN: Building,
  COMPANY_MANAGER: Users,
  COMPANY_CASHIER: CreditCard,
  RECRUITER: Briefcase,
  CANDIDATE: User,
  CANDIDATE_PREMIUM: User,
  FREELANCER: ShoppingBag,
  INDIVIDUAL: User,
  SUPER_ADMIN: Settings,
}

const ROLE_CATEGORIES = [
  {
    id: 'business',
    name: 'Entreprises',
    description: 'Solutions complètes pour les entreprises',
    icon: Building,
    roles: ['COMPANY_ADMIN', 'COMPANY_MANAGER', 'COMPANY_CASHIER'] as UserRole[],
  },
  {
    id: 'employment',
    name: 'Emploi & Recrutement',
    description: 'Trouver ou publier des offres d\'emploi',
    icon: Briefcase,
    roles: ['RECRUITER', 'CANDIDATE', 'CANDIDATE_PREMIUM'] as UserRole[],
  },
  {
    id: 'individual',
    name: 'Particuliers & Professionnels',
    description: 'Solutions pour indépendants et particuliers',
    icon: User,
    roles: ['FREELANCER', 'INDIVIDUAL'] as UserRole[],
  },
]

interface Step1ProfileSelectionProps {
  selectedRole: UserRole | null
  onRoleSelect: (role: UserRole) => void
  onNext: () => void
  canProceed: boolean
}

export default function Step1ProfileSelection({
  selectedRole,
  onRoleSelect,
  onNext,
  canProceed,
}: Step1ProfileSelectionProps) {

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
          Type de compte
        </h2>
        <p className="text-fibem-textSecondary">
          Sélectionnez votre profil
        </p>
      </div>

      {/* Catégories de profils */}
      <div className="space-y-8">
        {ROLE_CATEGORIES.map((category) => (
          <div key={category.id}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-fibem-primary/10 rounded-xl flex items-center justify-center">
                <category.icon className="w-5 h-5 text-fibem-primary" />
              </div>
              <div>
                <h3 className="font-bold text-fibem-dark">{category.name}</h3>
                <p className="text-sm text-fibem-textSecondary">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.roles.map((role) => {
                const Icon = ROLE_ICONS[role]
                const isSelected = selectedRole === role
                
                return (
                  <motion.button
                    key={role}
                    type="button"
                    onClick={() => onRoleSelect(role)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-fibem-primary bg-fibem-primary/5 shadow-lg'
                        : 'border-fibem-border hover:border-fibem-primary/30 hover:bg-fibem-surface'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg ${
                        isSelected ? 'bg-fibem-primary' : 'bg-fibem-primary/10'
                      } flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${
                          isSelected ? 'text-white' : 'text-fibem-primary'
                        }`} />
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-fibem-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <h4 className={`font-bold text-lg mb-2 ${
                      isSelected ? 'text-fibem-primary' : 'text-fibem-dark'
                    }`}>
                      {ROLE_DISPLAY_NAMES[role]}
                    </h4>
                    
                    <p className="text-sm text-fibem-textSecondary leading-relaxed">
                      {ROLE_DESCRIPTIONS[role]}
                    </p>

                    {/* Badge Premium pour CANDIDATE_PREMIUM */}
                    {role === 'CANDIDATE_PREMIUM' && (
                      <div className="mt-3 inline-block px-3 py-1 bg-gradient-to-r from-fibem-warning to-fibem-warning/80 text-white text-xs font-medium rounded-full">
                        Premium
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-end pt-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="px-8 py-3 bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {selectedRole ? `Continuer en tant que ${ROLE_DISPLAY_NAMES[selectedRole]}` : 'Sélectionnez un profil'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}