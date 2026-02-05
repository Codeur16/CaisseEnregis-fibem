
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { UserRole, ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS } from '@/lib/auth/roles'
import { PLANS } from '@/lib/subscription/plans'

// Import des composants de step
import Step1ProfileSelection from '@/components/auth/RegistrationForm/Step1ProfileSelection'
import Step2UserInfo from '@/components/auth/RegistrationForm/Step2UserInfo'
import Step3PlanSelection from '@/components/auth/RegistrationForm/Step3PlanSelection'
import Step4Payment from '@/components/auth/RegistrationForm/Step4Payment'
import ProgressSteps from '@/components/auth/RegistrationForm/ProgressSteps'

interface RegistrationData {
  // Step 1
  selectedRole: UserRole | null
  
  // Step 2
  userInfo: {
    email: string
    password: string
    confirmPassword: string
    first_name: string
    last_name: string
    phone: string
    acceptTerms: boolean
    acceptMarketing: boolean
  }
  companyInfo?: {
    company_name?: string
    company_type?: string
    siret_siren?: string
    address?: string
    city?: string
    postal_code?: string
    country?: string
    company_size?: string
    industry?: string
    website?: string
  }
  candidateInfo?: {
    birth_date: string
    current_status: string
    education_level: string
    years_experience: number
    desired_salary_min?: number
    desired_salary_max?: number
    job_types: string[]
    locations: string[]
    remote_work: boolean
    skills: string[]
    cv_file?: File
    cv_file_name?: string
    linkedin_url?: string
    portfolio_url?: string
  }
  freelancerInfo?: {
    business_name: string
    business_type: string
    siret?: string
    skills: string[]
    service_categories: string[]
    hourly_rate?: number
    experience_years: number
    portfolio_url?: string
  }
  
  // Step 3
  selectedPlanId: string | null
  billingPeriod: 'monthly' | 'yearly'
  useTrial: boolean
  
  // Step 4
  paymentMethod?: {
    cardNumber?: string
    expiryDate?: string
    cvc?: string
    cardHolder?: string
  }
}

export default function InscriptionPage() {
  const router = useRouter()
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    selectedRole: null,
    userInfo: {
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      phone: '',
      acceptTerms: false,
      acceptMarketing: false,
    },
    selectedPlanId: null,
    billingPeriod: 'monthly',
    useTrial: false,
  })

  // Récupérer les plans disponibles pour le rôle sélectionné
  const availablePlans = registrationData.selectedRole 
    ? PLANS[registrationData.selectedRole]
    : []

  // Vérifications pour passer aux étapes suivantes
  const canProceedToStep2 = registrationData.selectedRole !== null
  
  const canProceedToStep3 = () => {
    // Vérification des infos personnelles
    if (!registrationData.userInfo.email || 
        !registrationData.userInfo.password || 
        !registrationData.userInfo.first_name || 
        !registrationData.userInfo.last_name || 
        !registrationData.userInfo.phone || 
        !registrationData.userInfo.acceptTerms) {
      return false
    }
    
    // Validation supplémentaire selon le rôle
    if (['COMPANY_ADMIN', 'RECRUITER'].includes(registrationData.selectedRole!) && 
        (!registrationData.companyInfo?.company_name || !registrationData.companyInfo?.siret_siren)) {
      return false
    }
    
    if (['CANDIDATE', 'CANDIDATE_PREMIUM'].includes(registrationData.selectedRole!) && 
        !registrationData.candidateInfo?.current_status) {
      return false
    }
    
    if (registrationData.selectedRole === 'FREELANCER' && 
        !registrationData.freelancerInfo?.business_name) {
      return false
    }
    
    return true
  }
  
  const canProceedToStep4 = registrationData.selectedPlanId !== null || 
    registrationData.selectedRole === 'CANDIDATE' ||
    registrationData.selectedRole === 'INDIVIDUAL'

  // Mise à jour des données
  const updateRegistrationData = (updates: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({
      ...prev,
      ...updates
    }))
  }

  // Soumission finale
  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Envoyer les données au backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step,
          registrationData,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }
      
      if (data.success) {
        setSuccess('Compte créé avec succès !')
        
        // Redirection selon le résultat
        setTimeout(() => {
          if (data.redirect_to) {
            router.push(data.redirect_to)
          } else if (registrationData.useTrial) {
            router.push('/dashboard?trial=true')
          } else {
            router.push('/dashboard')
          }
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  // Étapes de progression
  const steps = [
    { number: 1, title: 'Sélectionnez votre profil', description: 'Choix du profil' },
    { number: 2, title: 'Informations personnelles', description: 'Informations personnelles' },
    { number: 3, title: 'Choisissez votre plan', description: 'Sélection du plan' },
    { number: 4, title: 'Paiement', description: 'Finalisez votre inscription' },
  ]

  // Effet pour scroller en haut à chaque changement d'étape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  return (
    <div className="min-h-screen bg-gradient-to-b from-fibem-surface to-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <Logo
              size="xl"
              variant="auth"
              withBrand
              withSubtitle="Services professionnels, recrutement et mise en relation d'experts en France et au Sénégal"
              href="/"
              alt="Rechercher sur FIBEM..."
              animate
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-3">
            Créez votre compte
          </h1>
          <p className="text-lg text-fibem-textSecondary max-w-2xl mx-auto">
            Rejoignez notre plateforme multi-profils
          </p>
        </motion.div>

        {/* Barre de progression */}
        <ProgressSteps
          steps={steps}
          currentStep={step}
          onStepClick={(stepNumber) => {
            if (stepNumber < step) {
              setStep(stepNumber as 1 | 2 | 3 | 4)
            }
          }}
          className="mb-8"
        />

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne de gauche - Étapes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-fibem-border/20 p-6 md:p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-green-700 text-sm font-medium">{success}</p>
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step1ProfileSelection
                      selectedRole={registrationData.selectedRole}
                      onRoleSelect={(role) => updateRegistrationData({ selectedRole: role })}
                      onNext={() => setStep(2)}
                      canProceed={canProceedToStep2}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step2UserInfo
                      selectedRole={registrationData.selectedRole!}
                      userInfo={registrationData.userInfo}
                      companyInfo={registrationData.companyInfo}
                      candidateInfo={registrationData.candidateInfo}
                      freelancerInfo={registrationData.freelancerInfo}
                      onUserInfoChange={(updates) => updateRegistrationData({
                        userInfo: { ...registrationData.userInfo, ...updates }
                      })}
                      onCompanyInfoChange={(updates) => updateRegistrationData({
                        companyInfo: { ...(registrationData.companyInfo ?? {}), ...updates }
                      })}
                      onCandidateInfoChange={(updates) => updateRegistrationData({
                        candidateInfo: {
                          birth_date: '',
                          current_status: '',
                          education_level: '',
                          years_experience: 0,
                          job_types: [],
                          locations: [],
                          remote_work: false,
                          skills: [],
                          ...(registrationData.candidateInfo ?? {}),
                          ...updates,
                        }
                      })}
                      onFreelancerInfoChange={(updates) => updateRegistrationData({
                        freelancerInfo: {
                          business_name: '',
                          business_type: '',
                          skills: [],
                          service_categories: [],
                          experience_years: 0,
                          ...(registrationData.freelancerInfo ?? {}),
                          ...updates,
                        }
                      })}
                      onBack={() => setStep(1)}
                      onNext={() => setStep(3)}
                      canProceed={canProceedToStep3()}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step3PlanSelection
                      selectedRole={registrationData.selectedRole!}
                      selectedPlanId={registrationData.selectedPlanId}
                      billingPeriod={registrationData.billingPeriod}
                      useTrial={registrationData.useTrial}
                      onPlanSelect={(planId) => updateRegistrationData({ selectedPlanId: planId })}
                      onBillingPeriodChange={(period) => updateRegistrationData({ billingPeriod: period })}
                      onTrialChange={(useTrial) => updateRegistrationData({ useTrial })}
                      onBack={() => setStep(2)}
                      onNext={() => setStep(4)}
                      canProceed={canProceedToStep4}
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step4Payment
                      selectedRole={registrationData.selectedRole!}
                      selectedPlan={availablePlans.find(p => p.id === registrationData.selectedPlanId)}
                      billingPeriod={registrationData.billingPeriod}
                      useTrial={registrationData.useTrial}
                      userInfo={registrationData.userInfo}
                      companyInfo={registrationData.companyInfo}
                      onPaymentComplete={handleSubmit}
                      onBack={() => setStep(3)}
                      loading={loading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Colonne de droite - Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-fibem-primary/5 to-fibem-secondary/5 rounded-2xl border border-fibem-border/20 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-fibem-dark mb-4">
                Récapitulatif
              </h3>
              
              <div className="space-y-4">
                {registrationData.selectedRole && (
                  <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-fibem-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-fibem-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-fibem-textSecondary">Profil</p>
                        <p className="font-semibold text-fibem-dark">
                          {ROLE_DISPLAY_NAMES[registrationData.selectedRole]}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-fibem-textSecondary mt-2">
                      {ROLE_DESCRIPTIONS[registrationData.selectedRole]}
                    </p>
                  </div>
                )}

                {step >= 2 && registrationData.userInfo.first_name && (
                  <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-fibem-secondary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-fibem-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-fibem-textSecondary">Informations</p>
                        <p className="font-semibold text-fibem-dark">
                          {registrationData.userInfo.first_name} {registrationData.userInfo.last_name}
                        </p>
                        <p className="text-xs text-fibem-textSecondary mt-1">
                          {registrationData.userInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {registrationData.selectedPlanId && (
                  <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-fibem-warning/10 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-fibem-warning" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-fibem-textSecondary">Forfait</p>
                          <p className="font-semibold text-fibem-dark">
                            {availablePlans.find(p => p.id === registrationData.selectedPlanId)?.name}
                          </p>
                        </div>
                      </div>
                      {registrationData.selectedPlanId && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-fibem-primary">
                            {registrationData.useTrial ? 'Essai gratuit' : 
                              `${availablePlans.find(p => p.id === registrationData.selectedPlanId)?.price_monthly}€`}
                          </p>
                          <p className="text-xs text-fibem-textSecondary">
                            {registrationData.billingPeriod === 'monthly' ? '/mois' : '/an'}
                          </p>
                        </div>
                      )}
                    </div>
                    {registrationData.useTrial && (
                      <div className="mt-2 p-2 bg-fibem-warning/10 rounded-lg">
                        <p className="text-xs text-fibem-warning font-medium">
                          {`Essai gratuit de ${availablePlans.find(p => p.id === registrationData.selectedPlanId)?.trial_days || 14} jours`}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Résumé des fonctionnalités */}
                {registrationData.selectedPlanId && (
                  <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
                    <h4 className="text-sm font-semibold text-fibem-dark mb-3">
                      Fonctionnalités incluses
                    </h4>
                    <ul className="space-y-2">
                      {registrationData.selectedRole && (
                        <>
                          {PLANS[registrationData.selectedRole]?.find(p => p.id === registrationData.selectedPlanId)?.features
                            .filter(f => f.included)
                            .slice(0, 5)
                            .map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-fibem-success" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-fibem-textSecondary">{feature.name}</span>
                              </li>
                            ))}
                        </>
                      )}
                    </ul>
                  </div>
                )}

                {/* Besoin d'aide */}
                <div className="text-center pt-4 border-t border-fibem-border/20">
                  <p className="text-sm text-fibem-textSecondary mb-2">
                    Besoin d'aide ?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
                    onClick={() => window.open('/contact', '_blank')}
                  >
                    Contactez notre support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Déjà un compte */}
        <div className="mt-8 text-center">
          <p className="text-fibem-textSecondary">
            Vous avez déjà un compte ?{' '}
            <a 
              href="/connexion" 
              className="text-fibem-primary hover:text-fibem-dark font-semibold hover:underline"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}













// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useRouter } from 'next/navigation'
// import { useI18n, useScopedI18n } from '@/locales/client'
// import Logo from '@/components/ui/Logo'
// import { Button } from '@/components/ui/button'
// import { UserRole, ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS } from '@/lib/auth/roles'
// import { PLANS } from '@/lib/subscription/plans'

// // Import des composants de step
// import Step1ProfileSelection from '@/components/auth/RegistrationForm/Step1ProfileSelection'
// import Step2PlanSelection from '@/components/auth/RegistrationForm/Step2PlanSelection'
// import Step3UserInfo from '@/components/auth/RegistrationForm/Step3UserInfo'
// import Step4Payment from '@/components/auth/RegistrationForm/Step4Payment'
// import ProgressSteps from '@/components/auth/RegistrationForm/ProgressSteps'

// interface RegistrationData {
//   // Step 1
//   selectedRole: UserRole | null
  
//   // Step 2
//   selectedPlanId: string | null
//   billingPeriod: 'monthly' | 'yearly'
//   useTrial: boolean
  
//   // Step 3
//   userInfo: {
//     email: string
//     password: string
//     confirmPassword: string
//     first_name: string
//     last_name: string
//     phone: string
//     acceptTerms: boolean
//     acceptMarketing: boolean
//   }
//   companyInfo?: {
//     company_name: string
//     company_type: string
//     siret_siren: string
//     address: string
//     city: string
//     postal_code: string
//     country: string
//     company_size: string
//     industry: string
//   }
//   candidateInfo?: {
//     birth_date: string
//     current_status: string
//     education_level: string
//     years_experience: number
//     desired_salary_min?: number
//     desired_salary_max?: number
//     job_types: string[]
//     locations: string[]
//     remote_work: boolean
//     skills: string[]
//     cv_file?: File
//   }
//   freelancerInfo?: {
//     business_name: string
//     business_type: string
//     siret?: string
//     skills: string[]
//     service_categories: string[]
//   }
  
//   // Step 4
//   paymentMethod?: {
//     cardNumber?: string
//     expiryDate?: string
//     cvc?: string
//     cardHolder?: string
//   }
// }

// export default function InscriptionPage() {
//   const t = useI18n()
//   const tAuth = useScopedI18n('auth.inscription')
//   const tCommon = useScopedI18n('common')
//   const router = useRouter()
  
//   const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string>('')
//   const [success, setSuccess] = useState<string>('')
  
//   const [registrationData, setRegistrationData] = useState<RegistrationData>({
//     selectedRole: null,
//     selectedPlanId: null,
//     billingPeriod: 'monthly',
//     useTrial: false,
//     userInfo: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//       first_name: '',
//       last_name: '',
//       phone: '',
//       acceptTerms: false,
//       acceptMarketing: false,
//     },
//   })

//   // Récupérer les plans disponibles pour le rôle sélectionné
//   const availablePlans = registrationData.selectedRole 
//     ? PLANS[registrationData.selectedRole]
//     : []

//   // Vérifications pour passer aux étapes suivantes
//   const canProceedToStep2 = registrationData.selectedRole !== null
//   const canProceedToStep3 = registrationData.selectedPlanId !== null || 
//     registrationData.selectedRole === 'CANDIDATE' ||
//     registrationData.selectedRole === 'INDIVIDUAL'
  
//   const canProceedToStep4 = () => {
//     if (!registrationData.userInfo.email || 
//         !registrationData.userInfo.password || 
//         !registrationData.userInfo.first_name || 
//         !registrationData.userInfo.last_name || 
//         !registrationData.userInfo.phone || 
//         !registrationData.userInfo.acceptTerms) {
//       return false
//     }
    
//     // Validation supplémentaire selon le rôle
//     if (['COMPANY_ADMIN', 'RECRUITER'].includes(registrationData.selectedRole!) && 
//         (!registrationData.companyInfo?.company_name || !registrationData.companyInfo?.siret_siren)) {
//       return false
//     }
    
//     if (['CANDIDATE', 'CANDIDATE_PREMIUM'].includes(registrationData.selectedRole!) && 
//         !registrationData.candidateInfo?.current_status) {
//       return false
//     }
    
//     if (registrationData.selectedRole === 'FREELANCER' && 
//         !registrationData.freelancerInfo?.business_name) {
//       return false
//     }
    
//     return true
//   }

//   // Mise à jour des données
//   const updateRegistrationData = (updates: Partial<RegistrationData>) => {
//     setRegistrationData(prev => ({
//       ...prev,
//       ...updates
//     }))
//   }

//   // Soumission finale
//   const handleSubmit = async () => {
//     setLoading(true)
//     setError('')
    
//     try {
//       // Envoyer les données au backend
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           step,
//           registrationData,
//         }),
//       })
      
//       const data = await response.json()
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Une erreur est survenue')
//       }
      
//       if (data.success) {
//         setSuccess('Compte créé avec succès !')
        
//         // Redirection selon le résultat
//         setTimeout(() => {
//           if (data.redirect_to) {
//             router.push(data.redirect_to)
//           } else if (registrationData.useTrial) {
//             router.push('/dashboard?trial=true')
//           } else {
//             router.push('/dashboard')
//           }
//         }, 2000)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Étapes de progression
//   const steps = [
//     { number: 1, title: tAuth('step1.title'), description: tAuth('step1.shortDescription') },
//     { number: 2, title: tAuth('step2.title'), description: tAuth('step2.shortDescription') },
//     { number: 3, title: tAuth('step3.title'), description: tAuth('step3.shortDescription') },
//     { number: 4, title: tAuth('step4.title'), description: tAuth('step4.shortDescription') },
//   ]

//   // Effet pour scroller en haut à chaque changement d'étape
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }, [step])

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-fibem-surface to-white py-8 md:py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <div className="flex justify-center mb-4">
//             <Logo
//               size="xl"
//               variant="auth"
//               withBrand
//               withSubtitle={t('home.hero.subtitle')}
//               href="/"
//               alt={t('header.searchOnFibem')}
//               animate
//             />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-3">
//             {tAuth('createYourAccount')}
//           </h1>
//           <p className="text-lg text-fibem-textSecondary max-w-2xl mx-auto">
//             {tAuth('joinOurPlatform')}
//           </p>
//         </motion.div>

//         {/* Barre de progression */}
//         <ProgressSteps
//           steps={steps}
//           currentStep={step}
//           onStepClick={(stepNumber) => {
//             if (stepNumber < step) {
//               setStep(stepNumber as 1 | 2 | 3 | 4)
//             }
//           }}
//           className="mb-8"
//         />

//         {/* Contenu principal */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Colonne de gauche - Étapes */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg border border-fibem-border/20 p-6 md:p-8">
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="text-red-700 text-sm font-medium">{error}</p>
//                   </div>
//                 </motion.div>
//               )}

//               {success && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="text-green-700 text-sm font-medium">{success}</p>
//                   </div>
//                 </motion.div>
//               )}

//               <AnimatePresence mode="wait">
//                 {step === 1 && (
//                   <motion.div
//                     key="step1"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                   >
//                     <Step1ProfileSelection
//                       selectedRole={registrationData.selectedRole}
//                       onRoleSelect={(role) => updateRegistrationData({ selectedRole: role })}
//                       onNext={() => setStep(2)}
//                       canProceed={canProceedToStep2}
//                     />
//                   </motion.div>
//                 )}

//                 {step === 2 && (
//                   <motion.div
//                     key="step2"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                   >
//                     <Step2PlanSelection
//                       selectedRole={registrationData.selectedRole!}
//                       selectedPlanId={registrationData.selectedPlanId}
//                       billingPeriod={registrationData.billingPeriod}
//                       useTrial={registrationData.useTrial}
//                       onPlanSelect={(planId) => updateRegistrationData({ selectedPlanId: planId })}
//                       onBillingPeriodChange={(period) => updateRegistrationData({ billingPeriod: period })}
//                       onTrialChange={(useTrial) => updateRegistrationData({ useTrial })}
//                       onBack={() => setStep(1)}
//                       onNext={() => setStep(3)}
//                       canProceed={canProceedToStep3}
//                     />
//                   </motion.div>
//                 )}

//                 {step === 3 && (
//                   <motion.div
//                     key="step3"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                   >
//                     <Step3UserInfo
//                       selectedRole={registrationData.selectedRole!}
//                       userInfo={registrationData.userInfo}
//                       companyInfo={registrationData.companyInfo}
//                       candidateInfo={registrationData.candidateInfo}
//                       freelancerInfo={registrationData.freelancerInfo}
//                       onUserInfoChange={(updates) => updateRegistrationData({
//                         userInfo: { ...registrationData.userInfo, ...updates }
//                       })}
//                       onCompanyInfoChange={(updates) => updateRegistrationData({
//                         companyInfo: { ...registrationData.companyInfo, ...updates }
//                       })}
//                       onCandidateInfoChange={(updates) => updateRegistrationData({
//                         candidateInfo: { ...registrationData.candidateInfo, ...updates }
//                       })}
//                       onFreelancerInfoChange={(updates) => updateRegistrationData({
//                         freelancerInfo: { ...registrationData.freelancerInfo, ...updates }
//                       })}
//                       onBack={() => setStep(2)}
//                       onNext={() => setStep(4)}
//                       canProceed={canProceedToStep4()}
//                     />
//                   </motion.div>
//                 )}

//                 {step === 4 && (
//                   <motion.div
//                     key="step4"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                   >
//                     <Step4Payment
//                       selectedRole={registrationData.selectedRole!}
//                       selectedPlan={availablePlans.find(p => p.id === registrationData.selectedPlanId)}
//                       billingPeriod={registrationData.billingPeriod}
//                       useTrial={registrationData.useTrial}
//                       userInfo={registrationData.userInfo}
//                       companyInfo={registrationData.companyInfo}
//                       onPaymentComplete={handleSubmit}
//                       onBack={() => setStep(3)}
//                       loading={loading}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Colonne de droite - Résumé */}
//           <div className="lg:col-span-1">
//             <div className="bg-gradient-to-b from-fibem-primary/5 to-fibem-secondary/5 rounded-2xl border border-fibem-border/20 p-6 sticky top-8">
//               <h3 className="text-lg font-bold text-fibem-dark mb-4">
//                 {tAuth('summary.title')}
//               </h3>
              
//               <div className="space-y-4">
//                 {registrationData.selectedRole && (
//                   <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <div className="w-8 h-8 bg-fibem-primary/10 rounded-lg flex items-center justify-center">
//                         <svg className="w-4 h-4 text-fibem-primary" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-sm text-fibem-textSecondary">{tAuth('summary.profile')}</p>
//                         <p className="font-semibold text-fibem-dark">
//                           {ROLE_DISPLAY_NAMES[registrationData.selectedRole]}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-xs text-fibem-textSecondary mt-2">
//                       {ROLE_DESCRIPTIONS[registrationData.selectedRole]}
//                     </p>
//                   </div>
//                 )}

//                 {registrationData.selectedPlanId && (
//                   <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-fibem-secondary/10 rounded-lg flex items-center justify-center">
//                           <svg className="w-4 h-4 text-fibem-secondary" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="text-sm text-fibem-textSecondary">{tAuth('summary.plan')}</p>
//                           <p className="font-semibold text-fibem-dark">
//                             {availablePlans.find(p => p.id === registrationData.selectedPlanId)?.name}
//                           </p>
//                         </div>
//                       </div>
//                       {registrationData.selectedPlanId && (
//                         <div className="text-right">
//                           <p className="text-lg font-bold text-fibem-primary">
//                             {registrationData.useTrial ? tAuth('summary.freeTrial') : 
//                               `${availablePlans.find(p => p.id === registrationData.selectedPlanId)?.price_monthly}€`}
//                           </p>
//                           <p className="text-xs text-fibem-textSecondary">
//                             {registrationData.billingPeriod === 'monthly' ? '/mois' : '/an'}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                     {registrationData.useTrial && (
//                       <div className="mt-2 p-2 bg-fibem-warning/10 rounded-lg">
//                         <p className="text-xs text-fibem-warning font-medium">
//                           {tAuth('summary.trialDays', { 
//                             days: availablePlans.find(p => p.id === registrationData.selectedPlanId)?.trial_days || 14 
//                           })}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Résumé des fonctionnalités */}
//                 <div className="bg-white p-4 rounded-xl border border-fibem-border/20">
//                   <h4 className="text-sm font-semibold text-fibem-dark mb-3">
//                     {tAuth('summary.includedFeatures')}
//                   </h4>
//                   <ul className="space-y-2">
//                     {registrationData.selectedRole && (
//                       <>
//                         {PLANS[registrationData.selectedRole]?.find(p => p.id === registrationData.selectedPlanId)?.features
//                           .filter(f => f.included)
//                           .slice(0, 5)
//                           .map((feature, index) => (
//                             <li key={index} className="flex items-center gap-2">
//                               <svg className="w-4 h-4 text-fibem-success" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                               </svg>
//                               <span className="text-sm text-fibem-textSecondary">{feature.name}</span>
//                             </li>
//                           ))}
//                       </>
//                     )}
//                   </ul>
//                 </div>

//                 {/* Besoin d'aide */}
//                 <div className="text-center pt-4 border-t border-fibem-border/20">
//                   <p className="text-sm text-fibem-textSecondary mb-2">
//                     {tAuth('needHelp')}
//                   </p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
//                     onClick={() => window.open('/contact', '_blank')}
//                   >
//                     {tAuth('contactSupport')}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Déjà un compte */}
//         <div className="mt-8 text-center">
//           <p className="text-fibem-textSecondary">
//             {tAuth('alreadyHaveAccount')}{' '}
//             <a 
//               href="/connexion" 
//               className="text-fibem-primary hover:text-fibem-dark font-semibold hover:underline"
//             >
//               {tCommon('signIn')}
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }













// // 'use client'

// // import { useState } from 'react'
// // import Link from 'next/link'
// // import { useRouter } from 'next/navigation'
// // import { 
// //   Mail, 
// //   Lock, 
// //   Eye, 
// //   EyeOff, 
// //   User, 
// //   Building, 
// //   Users, 
// //   Shield, 
// //   Phone,
// //   ArrowLeft,
// //   ArrowRight,
// //   Check,
// //   Sparkles,
// //   Key,
// //   Smartphone,
// //   Globe,
// //   Star,
// //   CreditCard,
// //   BarChart3,
// //   ShoppingCart,
// //   Settings,
// //   UserCog,
// //   Briefcase,
// //   FileText,
// //   Store,
// //   TrendingUp,
// //   Bell,
// //   Award,
// //   Clock,
// //   ShieldCheck,
// //   Zap,
// //   CheckCircle
// // } from 'lucide-react'
// // import { createAccount } from '@/actions/auth'
// // import { useI18n, useScopedI18n } from '@/locales/client'
// // import Logo from '@/components/ui/Logo'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { motion } from 'framer-motion'
// // import { Card, CardContent } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'

// // type UserType = 'ADMINISTRATEUR' | 'MANAGER' | 'CAISSIER' | 'CANDIDAT' | 'RECRUTEUR' | 'PARTICULIER'

// // export default function InscriptionPage() {
// //   const t = useI18n()
// //   const tAuth = useScopedI18n('auth.inscription')
// //   const tCommon = useScopedI18n('common')
// //   const tHeader = useScopedI18n('header')
// //   const tUserType = useScopedI18n('auth.userType')

// //   const router = useRouter()
// //   const [step, setStep] = useState(1)
// //   const [selectedType, setSelectedType] = useState<UserType | null>(null)
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState('')

// //   // Form fields
// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     last_name: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     confirmPassword: '',
// //     company_name: '',
// //   })

// //   const [showPassword, setShowPassword] = useState(false)
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }))
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError('')
// //     setLoading(true)

// //     try {
// //       if (!selectedType) {
// //         throw new Error(tAuth('pleaseSelectAccountType'))
// //       }

// //       if (formData.password !== formData.confirmPassword) {
// //         throw new Error(tAuth('passwordMismatch'))
// //       }

// //       const registrationData: Register = {
// //         first_name: formData.first_name,
// //         last_name: formData.last_name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         password: formData.password,
// //         role: selectedType,
// //         company_name: formData.company_name || undefined,
// //       }

// //       await createAccount(registrationData)
// //       router.push('/connexion')
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const canProceedStep1 = selectedType !== null
// //   const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
// //   const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

// //   const accountTypes = [
// //     { 
// //       id: 'ADMINISTRATEUR' as UserType, 
// //       label: tUserType('administrateur'), 
// //       icon: Settings, 
// //       description: tAuth('step1.administrateur.description'),
// //       color: 'from-fibem-primary to-fibem-primary/90',
// //       gradient: 'bg-gradient-to-br from-fibem-primary/10 via-fibem-primary/5 to-transparent',
// //       features: [
// //         tAuth('step1.administrateur.feature1'),
// //         tAuth('step1.administrateur.feature2'),
// //         tAuth('step1.administrateur.feature3')
// //       ],
// //       badge: 'Entreprise',
// //       recommended: true
// //     },
// //     { 
// //       id: 'MANAGER' as UserType, 
// //       label: tUserType('manager'), 
// //       icon: BarChart3, 
// //       description: tAuth('step1.manager.description'),
// //       color: 'from-fibem-secondary to-fibem-secondary/90',
// //       gradient: 'bg-gradient-to-br from-fibem-secondary/10 via-fibem-secondary/5 to-transparent',
// //       features: [
// //         tAuth('step1.manager.feature1'),
// //         tAuth('step1.manager.feature2'),
// //         tAuth('step1.manager.feature3')
// //       ],
// //       badge: 'Supervision',
// //       recommended: false
// //     },
// //     { 
// //       id: 'CAISSIER' as UserType, 
// //       label: tUserType('caissier'), 
// //       icon: CreditCard, 
// //       description: tAuth('step1.caissier.description'),
// //       color: 'from-fibem-success to-fibem-success/90',
// //       gradient: 'bg-gradient-to-br from-fibem-success/10 via-fibem-success/5 to-transparent',
// //       features: [
// //         tAuth('step1.caissier.feature1'),
// //         tAuth('step1.caissier.feature2'),
// //         tAuth('step1.caissier.feature3')
// //       ],
// //       badge: 'Point de vente',
// //       recommended: false
// //     },
// //     { 
// //       id: 'CANDIDAT' as UserType, 
// //       label: tUserType('candidat'), 
// //       icon: Briefcase, 
// //       description: tAuth('step1.candidat.description'),
// //       color: 'from-fibem-warning to-fibem-warning/90',
// //       gradient: 'bg-gradient-to-br from-fibem-warning/10 via-fibem-warning/5 to-transparent',
// //       features: [
// //         tAuth('step1.candidat.feature1'),
// //         tAuth('step1.candidat.feature2'),
// //         tAuth('step1.candidat.feature3')
// //       ],
// //       badge: 'Emploi',
// //       recommended: false
// //     },
// //     { 
// //       id: 'RECRUTEUR' as UserType, 
// //       label: tUserType('recruteur'), 
// //       icon: Users, 
// //       description: tAuth('step1.recruteur.description'),
// //       color: 'from-fibem-purple to-fibem-purple/90',
// //       gradient: 'bg-gradient-to-br from-fibem-purple/10 via-fibem-purple/5 to-transparent',
// //       features: [
// //         tAuth('step1.recruteur.feature1'),
// //         tAuth('step1.recruteur.feature2'),
// //         tAuth('step1.recruteur.feature3')
// //       ],
// //       badge: 'Recrutement',
// //       recommended: false
// //     },
// //     { 
// //       id: 'PARTICULIER' as UserType, 
// //       label: tUserType('particulier'), 
// //       icon: User, 
// //       description: tAuth('step1.particulier.description'),
// //       color: 'from-fibem-accent to-fibem-accent/90',
// //       gradient: 'bg-gradient-to-br from-fibem-accent/10 via-fibem-accent/5 to-transparent',
// //       features: [
// //         tAuth('step1.particulier.feature1'),
// //         tAuth('step1.particulier.feature2'),
// //         tAuth('step1.particulier.feature3')
// //       ],
// //       badge: 'Client',
// //       recommended: false
// //     },
// //   ]

// //   const features = [
// //     { 
// //       icon: ShieldCheck, 
// //       text: tAuth('features.security'), 
// //       color: 'text-fibem-primary' 
// //     },
// //     { 
// //       icon: Zap, 
// //       text: tAuth('features.fast'), 
// //       color: 'text-fibem-secondary' 
// //     },
// //     { 
// //       icon: TrendingUp, 
// //       text: tAuth('features.analytics'), 
// //       color: 'text-fibem-success' 
// //     },
// //     { 
// //       icon: Bell, 
// //       text: tAuth('features.notifications'), 
// //       color: 'text-fibem-warning' 
// //     },
// //   ]

// //   return (
// //     <div className="min-h-screen bg-linear-to-br from-fibem-dark/5 via-white to-fibem-primary/5 py-8 md:py-12 relative overflow-hidden">
// //       {/* Animated background particles */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         {[...Array(20)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute rounded-full bg-fibem-primary/5"
// //             style={{
// //               width: Math.random() * 100 + 50,
// //               height: Math.random() * 100 + 50,
// //               left: `${Math.random() * 100}%`,
// //               top: `${Math.random() * 100}%`,
// //             }}
// //             animate={{
// //               y: [0, -30, 0],
// //               x: [0, Math.random() * 20 - 10, 0],
// //             }}
// //             transition={{
// //               duration: Math.random() * 5 + 3,
// //               repeat: Infinity,
// //               ease: "easeInOut"
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Decorative elements */}
// //       <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-fibem-primary/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
// //       <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-fibem-secondary/10 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

// //       <div className="relative z-10">
// //         <div className="max-w-7xl mx-auto px-4">
// //           {/* Header */}
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-center mb-8"
// //           >
// //             <div className="flex justify-center mb-4">
// //               <Logo
// //                 size="xl"
// //                 variant="auth"
// //                 withBrand
// //                 withSubtitle={t('home.hero.subtitle')}
// //                 href="/"
// //                 alt={tHeader('searchOnFibem')}
// //                 animate
// //                 brandClassName="text-fibem-dark"
// //               />
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fibem-primary to-fibem-secondary bg-clip-text text-transparent">
// //               {tAuth('title')}
// //             </h1>
// //             <p className="text-lg text-fibem-textSecondary mt-3 max-w-2xl mx-auto">
// //               {tAuth('subtitle')}
// //             </p>
// //           </motion.div>

// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-fibem-border/20"
// //           >
// //             <div className="grid lg:grid-cols-3 gap-0">
// //               {/* Left sidebar - Progress */}
// //               <div className="lg:col-span-1 bg-gradient-to-b from-fibem-surface to-fibem-surface/50 p-8 border-r border-fibem-border/20">
// //                 <div className="sticky top-8">
// //                   <div className="mb-10">
// //                     <h3 className="text-xl font-bold text-fibem-dark mb-6 flex items-center gap-2">
// //                       <div className="w-2 h-6 bg-fibem-primary rounded-full" />
// //                       {tAuth('registrationSteps')}
// //                     </h3>
// //                     <div className="space-y-6">
// //                       {[
// //                         { number: 1, title: tAuth('step1.title'), description: tAuth('step1.shortDescription'), active: step >= 1 },
// //                         { number: 2, title: tAuth('step2.title'), description: tAuth('step2.shortDescription'), active: step >= 2 },
// //                         { number: 3, title: tAuth('step3.title'), description: tAuth('step3.shortDescription'), active: step >= 3 },
// //                       ].map((stepItem) => (
// //                         <div key={stepItem.number} className="flex items-start gap-4 group cursor-pointer" onClick={() => step > stepItem.number && setStep(stepItem.number)}>
// //                           <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${stepItem.active ? `${stepItem.number === step ? 'bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white shadow-lg' : 'bg-fibem-primary/10 text-fibem-primary'}` : 'bg-fibem-surface border border-fibem-border text-fibem-textSecondary'}`}>
// //                             {step > stepItem.number ? <Check className="w-5 h-5" /> : stepItem.number}
// //                           </div>
// //                           <div>
// //                             <h4 className={`font-semibold transition-colors ${stepItem.active ? 'text-fibem-dark' : 'text-fibem-textSecondary'}`}>
// //                               {stepItem.title}
// //                             </h4>
// //                             <p className="text-sm text-fibem-textSecondary mt-1">{stepItem.description}</p>
// //                           </div>
// //                           {stepItem.active && stepItem.number < step && (
// //                             <div className="ml-auto">
// //                               <CheckCircle className="w-5 h-5 text-fibem-success" />
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="bg-gradient-to-r from-fibem-primary/5 to-fibem-secondary/5 rounded-2xl p-6 border border-fibem-primary/10">
// //                     <h4 className="font-bold text-fibem-dark mb-4 flex items-center gap-2">
// //                       <Award className="w-5 h-5 text-fibem-primary" />
// //                       {tAuth('benefitsTitle')}
// //                     </h4>
// //                     <ul className="space-y-3">
// //                       {features.map((feature, index) => (
// //                         <li key={index} className="flex items-center gap-3 text-sm text-fibem-textSecondary">
// //                           <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
// //                             <feature.icon className={`w-3 h-3 ${feature.color}`} />
// //                           </div>
// //                           {feature.text}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   <div className="mt-8 pt-6 border-t border-fibem-border/20">
// //                     <div className="flex items-center justify-center gap-2 text-sm text-fibem-textSecondary">
// //                       <Clock className="w-4 h-4" />
// //                       <span>{tAuth('quickRegistration')}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Main content */}
// //               <div className="lg:col-span-2 p-8 md:p-12">
// //                 {error && (
// //                   <motion.div 
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl"
// //                   >
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
// //                         <Shield className="w-4 h-4 text-red-600" />
// //                       </div>
// //                       <p className="text-red-700 text-sm font-medium">{error}</p>
// //                     </div>
// //                   </motion.div>
// //                 )}

// //                 <form onSubmit={handleSubmit} className="space-y-8">
// //                   {/* Step 1: Choose account type */}
// //                   {step === 1 && (
// //                     <motion.div
// //                       initial={{ opacity: 0, x: 20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ duration: 0.3 }}
// //                     >
// //                       <div className="mb-8">
// //                         <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
// //                           {tAuth('step1.accountType')}
// //                         </h2>
// //                         <p className="text-fibem-textSecondary">
// //                           {tAuth('step1.selectProfile')}
// //                         </p>
// //                       </div>

// //                       {/* Account type categories */}
// //                       <div className="mb-8">
// //                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-fibem-primary/10 rounded-full mb-4">
// //                           <Store className="w-4 h-4 text-fibem-primary" />
// //                           <span className="text-sm font-medium text-fibem-primary">
// //                             {tAuth('step1.caisseCategory')}
// //                           </span>
// //                         </div>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                           {accountTypes.slice(0, 3).map((type) => (
// //                             <motion.button
// //                               key={type.id}
// //                               type="button"
// //                               onClick={() => setSelectedType(type.id)}
// //                               whileHover={{ scale: 1.02 }}
// //                               whileTap={{ scale: 0.98 }}
// //                               className={`relative p-5 rounded-2xl border-2 transition-all duration-300 text-left ${selectedType === type.id
// //                                 ? 'border-fibem-primary bg-white shadow-xl shadow-fibem-primary/20'
// //                                 : 'border-fibem-border bg-white hover:border-fibem-primary/30 hover:shadow-lg'
// //                                 } ${type.gradient}`}
// //                             >
// //                               {type.recommended && (
// //                                 <div className="absolute -top-2 -right-2">
// //                                   <Badge variant="default" className="bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white text-xs">
// //                                     {tAuth('step1.recommended')}
// //                                   </Badge>
// //                                 </div>
// //                               )}
                              
// //                               <div className="flex items-start justify-between mb-4">
// //                                 <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center shadow-lg`}>
// //                                   <type.icon className="w-6 h-6 text-white" />
// //                                 </div>
// //                                 <Badge variant="outline" className="border-fibem-border">
// //                                   {type.badge}
// //                                 </Badge>
// //                               </div>

// //                               <h3 className={`text-lg font-bold mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-dark'}`}>
// //                                 {type.label}
// //                               </h3>
// //                               <p className="text-sm text-fibem-textSecondary mb-4 leading-relaxed">
// //                                 {type.description}
// //                               </p>
                              
// //                               <ul className="space-y-2">
// //                                 {type.features.map((feature, index) => (
// //                                   <li key={index} className="flex items-center gap-2 text-sm">
// //                                     <CheckCircle className="w-4 h-4 text-fibem-success" />
// //                                     <span className="text-fibem-textSecondary">{feature}</span>
// //                                   </li>
// //                                 ))}
// //                               </ul>

// //                               {selectedType === type.id && (
// //                                 <div className="absolute bottom-4 right-4">
// //                                   <div className="w-8 h-8 bg-fibem-primary rounded-full flex items-center justify-center animate-pulse">
// //                                     <Check className="w-5 h-5 text-white" />
// //                                   </div>
// //                                 </div>
// //                               )}
// //                             </motion.button>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       {/* Other categories */}
// //                       <div>
// //                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-fibem-warning/10 rounded-full mb-4">
// //                           <Briefcase className="w-4 h-4 text-fibem-warning" />
// //                           <span className="text-sm font-medium text-fibem-warning">
// //                             {tAuth('step1.otherCategory')}
// //                           </span>
// //                         </div>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                           {accountTypes.slice(3).map((type) => (
// //                             <motion.button
// //                               key={type.id}
// //                               type="button"
// //                               onClick={() => setSelectedType(type.id)}
// //                               whileHover={{ scale: 1.02 }}
// //                               whileTap={{ scale: 0.98 }}
// //                               className={`relative p-5 rounded-2xl border-2 transition-all duration-300 text-left ${selectedType === type.id
// //                                 ? 'border-fibem-warning bg-white shadow-xl shadow-fibem-warning/20'
// //                                 : 'border-fibem-border bg-white hover:border-fibem-warning/30 hover:shadow-lg'
// //                                 } ${type.gradient}`}
// //                             >
// //                               <div className="flex items-start justify-between mb-4">
// //                                 <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center shadow-lg`}>
// //                                   <type.icon className="w-6 h-6 text-white" />
// //                                 </div>
// //                                 <Badge variant="outline" className="border-fibem-border">
// //                                   {type.badge}
// //                                 </Badge>
// //                               </div>

// //                               <h3 className={`text-lg font-bold mb-2 ${selectedType === type.id ? 'text-fibem-warning' : 'text-fibem-dark'}`}>
// //                                 {type.label}
// //                               </h3>
// //                               <p className="text-sm text-fibem-textSecondary mb-4 leading-relaxed">
// //                                 {type.description}
// //                               </p>
                              
// //                               <ul className="space-y-2">
// //                                 {type.features.map((feature, index) => (
// //                                   <li key={index} className="flex items-center gap-2 text-sm">
// //                                     <CheckCircle className="w-4 h-4 text-fibem-success" />
// //                                     <span className="text-fibem-textSecondary">{feature}</span>
// //                                   </li>
// //                                 ))}
// //                               </ul>
// //                             </motion.button>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       <motion.div 
// //                         whileHover={{ scale: 1.02 }} 
// //                         whileTap={{ scale: 0.98 }}
// //                         className="mt-8"
// //                       >
// //                         <Button
// //                           type="button"
// //                           onClick={() => setStep(2)}
// //                           disabled={!canProceedStep1}
// //                           className="w-full py-6 bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
// //                         >
// //                           {selectedType ? (
// //                             <>
// //                               {tCommon('continue')} en tant que {selectedType && tUserType(selectedType.toLowerCase())}
// //                               <ArrowRight className="w-5 h-5 ml-2" />
// //                             </>
// //                           ) : (
// //                             tCommon('selectAccountType')
// //                           )}
// //                         </Button>
// //                       </motion.div>
// //                     </motion.div>
// //                   )}

// //                   {/* Step 2: Personal information */}
// //                   {step === 2 && (
// //                     <motion.div
// //                       initial={{ opacity: 0, x: 20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ duration: 0.3 }}
// //                       className="space-y-6"
// //                     >
// //                       <div className="mb-8">
// //                         <div className="flex items-center justify-between mb-3">
// //                           <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark">
// //                             {tAuth('step2.title')}
// //                           </h2>
// //                           <div className="flex items-center gap-2 px-3 py-1 bg-fibem-primary/10 rounded-full">
// //                             <User className="w-4 h-4 text-fibem-primary" />
// //                             <span className="text-sm font-medium text-fibem-primary">
// //                               {selectedType && tUserType(selectedType.toLowerCase())}
// //                             </span>
// //                           </div>
// //                         </div>
// //                         <p className="text-fibem-textSecondary">
// //                           {tAuth('step2.subtitle')}
// //                         </p>
// //                       </div>

// //                       {/* Professional fields for business accounts */}
// //                       {(selectedType === 'ADMINISTRATEUR' || selectedType === 'MANAGER') && (
// //                         <motion.div
// //                           initial={{ opacity: 0, y: 10 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           className="p-4 bg-gradient-to-r from-fibem-primary/5 to-fibem-secondary/5 rounded-xl border border-fibem-primary/10"
// //                         >
// //                           <div className="flex items-center gap-3 mb-4">
// //                             <Building className="w-5 h-5 text-fibem-primary" />
// //                             <h3 className="font-semibold text-fibem-dark">
// //                               {tAuth('step2.companyInfo')}
// //                             </h3>
// //                           </div>
// //                           <div>
// //                             <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                               {tAuth('step2.companyName')} *
// //                             </label>
// //                             <Input
// //                               type="text"
// //                               name="company_name"
// //                               value={formData.company_name}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// //                               placeholder={tAuth('step2.companyNamePlaceholder')}
// //                             />
// //                           </div>
// //                         </motion.div>
// //                       )}

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step2.firstName')} *
// //                           </label>
// //                           <div className="relative">
// //                             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type="text"
// //                               name="first_name"
// //                               value={formData.first_name}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step2.firstNamePlaceholder')}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step2.lastName')} *
// //                           </label>
// //                           <div className="relative">
// //                             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type="text"
// //                               name="last_name"
// //                               value={formData.last_name}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step2.lastNamePlaceholder')}
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step2.email')} *
// //                           </label>
// //                           <div className="relative">
// //                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type="email"
// //                               name="email"
// //                               value={formData.email}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step2.emailPlaceholder')}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step2.phone')} *
// //                           </label>
// //                           <div className="relative">
// //                             <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type="tel"
// //                               name="phone"
// //                               value={formData.phone}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step2.phonePlaceholder')}
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="flex justify-between pt-6">
// //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                           <Button
// //                             type="button"
// //                             onClick={() => setStep(1)}
// //                             variant="outline"
// //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface rounded-xl px-6"
// //                           >
// //                             <ArrowLeft className="w-4 h-4 mr-2" />
// //                             {tCommon('back')}
// //                           </Button>
// //                         </motion.div>
// //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                           <Button
// //                             type="button"
// //                             onClick={() => setStep(3)}
// //                             disabled={!canProceedStep2}
// //                             className="bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-8"
// //                           >
// //                             {tCommon('continue')}
// //                             <ArrowRight className="w-4 h-4 ml-2" />
// //                           </Button>
// //                         </motion.div>
// //                       </div>
// //                     </motion.div>
// //                   )}

// //                   {/* Step 3: Password and confirmation */}
// //                   {step === 3 && (
// //                     <motion.div
// //                       initial={{ opacity: 0, x: 20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ duration: 0.3 }}
// //                       className="space-y-6"
// //                     >
// //                       <div className="mb-8">
// //                         <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
// //                           {tAuth('step3.title')}
// //                         </h2>
// //                         <p className="text-fibem-textSecondary">
// //                           {tAuth('step3.subtitle')}
// //                         </p>
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step3.password')} *
// //                           </label>
// //                           <div className="relative">
// //                             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type={showPassword ? 'text' : 'password'}
// //                               name="password"
// //                               value={formData.password}
// //                               onChange={handleInputChange}
// //                               required
// //                               minLength={8}
// //                               className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step3.passwordPlaceholder')}
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => setShowPassword(!showPassword)}
// //                               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// //                             >
// //                               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                             </button>
// //                           </div>
// //                           <div className="mt-2 space-y-1">
// //                             <div className="flex items-center gap-2 text-xs">
// //                               <CheckCircle className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-fibem-success' : 'text-fibem-textSecondary'}`} />
// //                               <span className={formData.password.length >= 8 ? 'text-fibem-success' : 'text-fibem-textSecondary'}>
// //                                 {tAuth('step3.passwordMinLength')}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         <div>
// //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// //                             {tAuth('step3.confirmPassword')} *
// //                           </label>
// //                           <div className="relative">
// //                             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                             <Input
// //                               type={showConfirmPassword ? 'text' : 'password'}
// //                               name="confirmPassword"
// //                               value={formData.confirmPassword}
// //                               onChange={handleInputChange}
// //                               required
// //                               className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl h-12"
// //                               placeholder={tAuth('step3.confirmPasswordPlaceholder')}
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// //                             >
// //                               {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                             </button>
// //                           </div>
// //                           {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// //                             <div className="mt-2 flex items-center gap-2 text-xs text-red-500">
// //                               <Shield className="w-3 h-3" />
// //                               {tAuth('passwordMismatch')}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>

// //                       <div className="p-4 bg-fibem-surface rounded-xl border border-fibem-border">
// //                         <label className="flex items-start gap-3 cursor-pointer">
// //                           <input
// //                             type="checkbox"
// //                             required
// //                             className="w-5 h-5 mt-0.5 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
// //                           />
// //                           <span className="text-sm text-fibem-textSecondary">
// //                             {tAuth('step3.termsAgreement', {
// //                               terms: (
// //                                 <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline font-medium">
// //                                   {tAuth('step3.terms')}
// //                                 </Link>
// //                               ),
// //                               privacy: (
// //                                 <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline font-medium">
// //                                   {tAuth('step3.privacy')}
// //                                 </Link>
// //                               )
// //                             })}
// //                           </span>
// //                         </label>
// //                       </div>

// //                       <div className="flex justify-between pt-4">
// //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                           <Button
// //                             type="button"
// //                             onClick={() => setStep(2)}
// //                             variant="outline"
// //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface rounded-xl px-6"
// //                           >
// //                             <ArrowLeft className="w-4 h-4 mr-2" />
// //                             {tCommon('back')}
// //                           </Button>
// //                         </motion.div>
// //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                           <Button
// //                             type="submit"
// //                             disabled={!canProceedStep3 || loading}
// //                             className="bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-8"
// //                           >
// //                             {loading ? (
// //                               <div className="flex items-center gap-2">
// //                                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                                 {tAuth('step3.creatingAccount')}
// //                               </div>
// //                             ) : (
// //                               <div className="flex items-center gap-2">
// //                                 {tAuth('step3.createAccount')}
// //                                 <Check className="w-5 h-5" />
// //                               </div>
// //                             )}
// //                           </Button>
// //                         </motion.div>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </form>

// //                 {/* Login link */}
// //                 <div className="mt-12 pt-8 border-t border-fibem-border/20 text-center">
// //                   <p className="text-fibem-textSecondary mb-4">
// //                     {tAuth('alreadyHaveAccount')}
// //                   </p>
// //                   <motion.div whileHover={{ scale: 1.05 }}>
// //                     <Link 
// //                       href="/connexion"
// //                       className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-white to-fibem-surface border border-fibem-border hover:border-fibem-primary hover:shadow-lg text-fibem-textPrimary font-medium rounded-xl transition-all duration-200 group"
// //                     >
// //                       <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
// //                       <span>{tCommon('signIn')} à votre compte</span>
// //                     </Link>
// //                   </motion.div>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Footer info */}
// //           <div className="mt-8 text-center">
// //             <p className="text-sm text-fibem-textSecondary">
// //               {tAuth('needHelp')}{' '}
// //               <Link href="/contact" className="text-fibem-primary hover:underline font-medium">
// //                 {tAuth('contactSupport')}
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
























// // // 'use client'

// // // import { useState } from 'react'
// // // import Link from 'next/link'
// // // import { useRouter } from 'next/navigation'
// // // import { 
// // //   Mail, 
// // //   Lock, 
// // //   Eye, 
// // //   EyeOff, 
// // //   User, 
// // //   Building, 
// // //   Users, 
// // //   Shield, 
// // //   Phone,
// // //   ArrowLeft,
// // //   ArrowRight,
// // //   Check,
// // //   Sparkles,
// // //   Key,
// // //   Smartphone,
// // //   Globe,
// // //   Star,
// // //   GraduationCap,
// // //   Briefcase,
// // //   ShoppingBag,
// // //   UserPlus,
// // //   Store,
// // //   Settings
// // // } from 'lucide-react'
// // // import { createAccount } from '@/actions/auth'
// // // import { useI18n, useScopedI18n } from '@/locales/client'
// // // import Logo from '@/components/ui/Logo'
// // // import { Button } from '@/components/ui/button'
// // // import { Input } from '@/components/ui/input'
// // // import { motion } from 'framer-motion'

// // // type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR' | 'STAGIAIRE' | 'FREELANCE' | 'PARTENAIRE'

// // // export default function InscriptionPage() {
// // //   const t = useI18n()
// // //   const tAuth = useScopedI18n('auth.inscription')
// // //   const tCommon = useScopedI18n('common')
// // //   const tHeader = useScopedI18n('header')
// // //   const tUserType = useScopedI18n('auth.userType')

// // //   const router = useRouter()
// // //   const [step, setStep] = useState(1)
// // //   const [selectedType, setSelectedType] = useState<UserType | null>(null)
// // //   const [loading, setLoading] = useState(false)
// // //   const [error, setError] = useState('')

// // //   // Form fields
// // //   const [formData, setFormData] = useState({
// // //     first_name: '',
// // //     last_name: '',
// // //     email: '',
// // //     phone: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //   })

// // //   const [showPassword, setShowPassword] = useState(false)
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setError('')
// // //     setLoading(true)

// // //     try {
// // //       if (!selectedType) {
// // //         throw new Error(tAuth('pleaseSelectAccountType'))
// // //       }

// // //       if (formData.password !== formData.confirmPassword) {
// // //         throw new Error(tAuth('passwordMismatch'))
// // //       }

// // //       const registrationData: Register = {
// // //         first_name: formData.first_name,
// // //         last_name: formData.last_name,
// // //         email: formData.email,
// // //         phone: formData.phone,
// // //         password: formData.password,
// // //         role: selectedType,
// // //       }

// // //       await createAccount(registrationData)
// // //       router.push('/connexion')
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const canProceedStep1 = selectedType !== null
// // //   const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
// // //   const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

// // //   const accountTypes = [
// // //     { 
// // //       id: 'STAGIAIRE' as UserType, 
// // //       label: tUserType('stagiaire'), 
// // //       icon: GraduationCap, 
// // //       description: tAuth('step1.stagiaire.description'),
// // //       price: tAuth('step1.stagiaire.price', { price: 2 }),
// // //       color: 'from-fibem-primary to-fibem-primary/80',
// // //       features: [tAuth('step1.stagiaire.feature1')]
// // //     },
// // //     { 
// // //       id: 'CANDIDAT' as UserType, 
// // //       label: tUserType('candidat'), 
// // //       icon: Users, 
// // //       description: tAuth('step1.candidat.description'),
// // //       price: tAuth('step1.candidat.price', { price: 5 }),
// // //       color: 'from-fibem-secondary to-fibem-secondary/80',
// // //       features: [tAuth('step1.candidat.feature1')]
// // //     },
// // //     { 
// // //       id: 'PARTICULIER' as UserType, 
// // //       label: tUserType('particulier'), 
// // //       icon: User, 
// // //       description: tAuth('step1.particulier.description'),
// // //       price: tAuth('step1.particulier.price', { price: 6 }),
// // //       color: 'from-fibem-accent to-fibem-accent/80',
// // //       features: [tAuth('step1.particulier.feature1')]
// // //     },
// // //     { 
// // //       id: 'FREELANCE' as UserType, 
// // //       label: tUserType('freelance'), 
// // //       icon: Briefcase, 
// // //       description: tAuth('step1.freelance.description'),
// // //       price: tAuth('step1.freelance.price', { price: 8 }),
// // //       color: 'from-fibem-warning to-fibem-warning/80',
// // //       features: [tAuth('step1.freelance.feature1')]
// // //     },
// // //     { 
// // //       id: 'PROFESSIONNEL' as UserType, 
// // //       label: tUserType('professionnel'), 
// // //       icon: Building, 
// // //       description: tAuth('step1.professionnel.description'),
// // //       price: tAuth('step1.professionnel.price', { price: 10 }),
// // //       color: 'from-fibem-success to-fibem-success/80',
// // //       features: [tAuth('step1.professionnel.feature1')]
// // //     },
// // //     { 
// // //       id: 'PARTENAIRE' as UserType, 
// // //       label: tUserType('partenaire'), 
// // //       icon: Store, 
// // //       description: tAuth('step1.partenaire.description'),
// // //       price: tAuth('step1.partenaire.price', { price: 12 }),
// // //       color: 'from-fibem-purple to-fibem-purple/80',
// // //       features: [tAuth('step1.partenaire.feature1')]
// // //     },
// // //     { 
// // //       id: 'ADMINISTRATEUR' as UserType, 
// // //       label: tUserType('administrateur'), 
// // //       icon: Settings, 
// // //       description: tAuth('step1.administrateur.description'),
// // //       price: tAuth('step1.administrateur.price'),
// // //       color: 'from-fibem-gray-600 to-fibem-gray-700',
// // //       features: [tAuth('step1.administrateur.feature1')]
// // //     },
// // //   ]

// // //   const features = [
// // //     { 
// // //       icon: Key, 
// // //       text: t('home.howItWorks.step4Desc'), 
// // //       color: 'text-fibem-secondary' 
// // //     },
// // //     { 
// // //       icon: Smartphone, 
// // //       text: t('home.hero.cta4Description'), 
// // //       color: 'text-white' 
// // //     },
// // //     { 
// // //       icon: Globe, 
// // //       text: t('home.partners.trust'), 
// // //       color: 'text-fibem-secondary' 
// // //     },
// // //     { 
// // //       icon: Star, 
// // //       text: t('home.testimonials.subtitle'), 
// // //       color: 'text-white' 
// // //     },
// // //   ]

// // //   return (
// // //     <div className="min-h-screen bg-linear-to-br from-fibem-dark via-fibem-primary/20 to-fibem-secondary/10 py-8 md:py-12 relative overflow-hidden">
// // //       {/* Background decorative elements */}
// // //       <div className="absolute inset-0 overflow-hidden">
// // //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
// // //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
// // //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
// // //         <div className="absolute inset-0 opacity-5">
// // //           <div className="absolute inset-0" style={{
// // //             backgroundImage: `linear-linear(to right, #379DE0 1px, transparent 1px),
// // //                              linear-linear(to bottom, #379DE0 1px, transparent 1px)`,
// // //             backgroundSize: '50px 50px'
// // //           }}></div>
// // //         </div>
// // //       </div>

// // //       <div className="relative z-10">
// // //         <div className="max-w-7xl mx-auto px-4">
// // //           <motion.div 
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.5 }}
// // //             className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
// // //           >
// // //             <div className="grid lg:grid-cols-3 gap-8">
// // //               {/* Left column - Welcome section */}
// // //               <div className="lg:col-span-2 p-8 md:p-12">
// // //                 <div className="text-center mb-10">
// // //                   <h1 className="text-4xl md:text-5xl font-bold text-fibem-dark mb-3">
// // //                     {tAuth('createYourAccount')}
// // //                   </h1>
// // //                   <p className="text-xl text-fibem-textSecondary">
// // //                     {tAuth('joinOurPlatform')}
// // //                   </p>
// // //                 </div>

// // //                 {error && (
// // //                   <motion.div 
// // //                     initial={{ opacity: 0, y: -10 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl"
// // //                   >
// // //                     <p className="text-red-700 text-sm font-medium">{error}</p>
// // //                   </motion.div>
// // //                 )}

// // //                 <form onSubmit={handleSubmit} className="space-y-8">
// // //                   {/* Step 1: Choose account type */}
// // //                   {step === 1 && (
// // //                     <motion.div
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ duration: 0.3 }}
// // //                     >
// // //                       <div className="mb-8 text-center">
// // //                         <h2 className="text-2xl font-bold text-fibem-textPrimary mb-2">
// // //                           {tAuth('step1.accountType')}
// // //                         </h2>
// // //                         <p className="text-fibem-textSecondary">
// // //                           {tAuth('step1.selectProfile')}
// // //                         </p>
// // //                       </div>

// // //                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
// // //                         {accountTypes.map((type) => (
// // //                           <motion.button
// // //                             key={type.id}
// // //                             type="button"
// // //                             onClick={() => setSelectedType(type.id)}
// // //                             whileHover={{ scale: 1.03, y: -5 }}
// // //                             whileTap={{ scale: 0.98 }}
// // //                             className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${selectedType === type.id
// // //                               ? 'border-fibem-primary bg-white shadow-2xl shadow-fibem-primary/20'
// // //                               : 'border-fibem-border bg-white hover:border-fibem-primary/50 hover:shadow-lg'
// // //                               }`}
// // //                           >
// // //                             {/* Icon with linear background */}
// // //                             <div className={`absolute -top-4 left-6 w-12 h-12 rounded-full ${type.color} flex items-center justify-center shadow-lg`}>
// // //                               <type.icon className="w-6 h-6 text-white" />
// // //                             </div>

// // //                             <div className="pt-4">
// // //                               <h3 className={`text-lg font-bold mb-2 mt-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-textPrimary'
// // //                                 }`}>
// // //                                 {type.label}
// // //                               </h3>
// // //                               <p className="text-sm text-fibem-textSecondary mb-4 leading-relaxed">
// // //                                 {type.description}
// // //                               </p>
                              
// // //                               <div className="flex items-center justify-between">
// // //                                 <span className={`text-xl font-bold ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-dark'
// // //                                   }`}>
// // //                                   {type.price}
// // //                                 </span>
// // //                                 {type.features.map((feature, index) => (
// // //                                   <span key={index} className="text-xs px-3 py-1 bg-fibem-surface text-fibem-textSecondary rounded-full">
// // //                                     {feature}
// // //                                   </span>
// // //                                 ))}
// // //                               </div>

// // //                               {/* Selected indicator */}
// // //                               {selectedType === type.id && (
// // //                                 <div className="absolute top-4 right-4 w-6 h-6 bg-fibem-primary rounded-full flex items-center justify-center">
// // //                                   <Check className="w-4 h-4 text-white" />
// // //                                 </div>
// // //                               )}
// // //                             </div>
// // //                           </motion.button>
// // //                         ))}
// // //                       </div>

// // //                       <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // //                         <Button
// // //                           type="button"
// // //                           onClick={() => setStep(2)}
// // //                           disabled={!canProceedStep1}
// // //                           className="w-full py-3.5 bg-linear-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
// // //                         >
// // //                           {tCommon('continue')}
// // //                           <ArrowRight className="w-4 h-4 ml-2" />
// // //                         </Button>
// // //                       </motion.div>
// // //                     </motion.div>
// // //                   )}

// // //                   {/* Step 2: Personal information */}
// // //                   {step === 2 && (
// // //                     <motion.div
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ duration: 0.3 }}
// // //                       className="space-y-6"
// // //                     >
// // //                       <div className="mb-8">
// // //                         <h2 className="text-2xl font-bold text-fibem-textPrimary mb-2">
// // //                           {tAuth('step2.title')}
// // //                         </h2>
// // //                         <p className="text-fibem-textSecondary">
// // //                           {tAuth('step2.subtitle')}
// // //                         </p>
// // //                       </div>

// // //                       <div className="grid grid-cols-2 gap-4">
// // //                         <div>
// // //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                             {tAuth('step2.firstName')} *
// // //                           </label>
// // //                           <Input
// // //                             type="text"
// // //                             name="first_name"
// // //                             value={formData.first_name}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step2.firstNamePlaceholder')}
// // //                           />
// // //                         </div>
// // //                         <div>
// // //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                             {tAuth('step2.lastName')} *
// // //                           </label>
// // //                           <Input
// // //                             type="text"
// // //                             name="last_name"
// // //                             value={formData.last_name}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step2.lastNamePlaceholder')}
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                           {tAuth('step2.email')} *
// // //                         </label>
// // //                         <div className="relative">
// // //                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // //                           <Input
// // //                             type="email"
// // //                             name="email"
// // //                             value={formData.email}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step2.emailPlaceholder')}
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                           {tAuth('step2.phone')} *
// // //                         </label>
// // //                         <div className="relative">
// // //                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // //                           <Input
// // //                             type="tel"
// // //                             name="phone"
// // //                             value={formData.phone}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step2.phonePlaceholder')}
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div className="flex justify-between pt-4">
// // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // //                           <Button
// // //                             type="button"
// // //                             onClick={() => setStep(1)}
// // //                             variant="outline"
// // //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface rounded-xl"
// // //                           >
// // //                             <ArrowLeft className="w-4 h-4 mr-2" />
// // //                             {tCommon('back')}
// // //                           </Button>
// // //                         </motion.div>
// // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // //                           <Button
// // //                             type="button"
// // //                             onClick={() => setStep(3)}
// // //                             disabled={!canProceedStep2}
// // //                             className="bg-linear-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold shadow-lg hover:shadow-xl rounded-xl"
// // //                           >
// // //                             {tCommon('continue')}
// // //                             <ArrowRight className="w-4 h-4 ml-2" />
// // //                           </Button>
// // //                         </motion.div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}

// // //                   {/* Step 3: Password and confirmation */}
// // //                   {step === 3 && (
// // //                     <motion.div
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ duration: 0.3 }}
// // //                       className="space-y-6"
// // //                     >
// // //                       <div className="mb-8">
// // //                         <h2 className="text-2xl font-bold text-fibem-textPrimary mb-2">
// // //                           {tAuth('step3.title')}
// // //                         </h2>
// // //                         <p className="text-fibem-textSecondary">
// // //                           {tAuth('step3.subtitle')}
// // //                         </p>
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                           {tAuth('step3.password')} *
// // //                         </label>
// // //                         <div className="relative">
// // //                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // //                           <Input
// // //                             type={showPassword ? 'text' : 'password'}
// // //                             name="password"
// // //                             value={formData.password}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             minLength={8}
// // //                             className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step3.passwordPlaceholder')}
// // //                           />
// // //                           <button
// // //                             type="button"
// // //                             onClick={() => setShowPassword(!showPassword)}
// // //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// // //                           >
// // //                             {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // //                           </button>
// // //                         </div>
// // //                         <p className="text-xs text-fibem-textSecondary mt-2">
// // //                           {tAuth('step3.passwordMinLength')}
// // //                         </p>
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // //                           {tAuth('step3.confirmPassword')} *
// // //                         </label>
// // //                         <div className="relative">
// // //                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // //                           <Input
// // //                             type={showConfirmPassword ? 'text' : 'password'}
// // //                             name="confirmPassword"
// // //                             value={formData.confirmPassword}
// // //                             onChange={handleInputChange}
// // //                             required
// // //                             className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white rounded-xl"
// // //                             placeholder={tAuth('step3.confirmPasswordPlaceholder')}
// // //                           />
// // //                           <button
// // //                             type="button"
// // //                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// // //                           >
// // //                             {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // //                           </button>
// // //                         </div>
// // //                         {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // //                           <p className="text-xs text-red-500 mt-2">{tAuth('passwordMismatch')}</p>
// // //                         )}
// // //                       </div>

// // //                       <div className="pt-2">
// // //                         <label className="flex items-start gap-3 cursor-pointer">
// // //                           <input
// // //                             type="checkbox"
// // //                             required
// // //                             className="w-5 h-5 mt-0.5 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
// // //                           />
// // //                           <span className="text-sm text-fibem-textSecondary">
// // //                             {tAuth('step3.termsAgreement', {
// // //                               terms: (
// // //                                 <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline font-medium">
// // //                                   {tAuth('step3.terms')}
// // //                                 </Link>
// // //                               ),
// // //                               privacy: (
// // //                                 <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline font-medium">
// // //                                   {tAuth('step3.privacy')}
// // //                                 </Link>
// // //                               )
// // //                             })}
// // //                           </span>
// // //                         </label>
// // //                       </div>

// // //                       <div className="flex justify-between pt-4">
// // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // //                           <Button
// // //                             type="button"
// // //                             onClick={() => setStep(2)}
// // //                             variant="outline"
// // //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface rounded-xl"
// // //                           >
// // //                             <ArrowLeft className="w-4 h-4 mr-2" />
// // //                             {tCommon('back')}
// // //                           </Button>
// // //                         </motion.div>
// // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // //                           <Button
// // //                             type="submit"
// // //                             disabled={!canProceedStep3 || loading}
// // //                             className="bg-linear-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold shadow-lg hover:shadow-xl rounded-xl"
// // //                           >
// // //                             {loading ? (
// // //                               <div className="flex items-center gap-2">
// // //                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // //                                 {tAuth('step3.creatingAccount')}
// // //                               </div>
// // //                             ) : (
// // //                               <div className="flex items-center gap-2">
// // //                                 {tAuth('step3.createAccount')}
// // //                                 <Check className="w-4 h-4" />
// // //                               </div>
// // //                             )}
// // //                           </Button>
// // //                         </motion.div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}
// // //                 </form>
// // //               </div>

// // //               {/* Right column - Features and progress */}
// // //               <div className="bg-linear-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden lg:col-span-1">
// // //                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
// // //                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
                
// // //                 {/* Logo */}
// // //                 <div className="relative z-10 mb-12">
// // //                   <Logo
// // //                     size="xl"
// // //                     variant="auth"
// // //                     withBrand
// // //                     withSubtitle={t('home.hero.subtitle')}
// // //                     href="/"
// // //                     alt={tHeader('searchOnFibem')}
// // //                     animate
// // //                     brandClassName="text-white"
// // //                   />
// // //                 </div>

// // //                 {/* Progress steps */}
// // //                 <div className="relative z-10 mb-12">
// // //                   <h3 className="text-2xl font-bold mb-6">{tAuth('registrationSteps')}</h3>
                  
// // //                   <div className="space-y-6">
// // //                     {[
// // //                       { number: 1, title: tAuth('step1.title'), description: tAuth('step1.shortDescription'), active: step >= 1 },
// // //                       { number: 2, title: tAuth('step2.title'), description: tAuth('step2.shortDescription'), active: step >= 2 },
// // //                       { number: 3, title: tAuth('step3.title'), description: tAuth('step3.shortDescription'), active: step >= 3 },
// // //                     ].map((stepItem) => (
// // //                       <div key={stepItem.number} className="flex items-start gap-4">
// // //                         <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${stepItem.active ? 'bg-white text-fibem-primary' : 'bg-white/20 text-white/70'}`}>
// // //                           {step > stepItem.number ? <Check className="w-6 h-6" /> : stepItem.number}
// // //                         </div>
// // //                         <div>
// // //                           <h4 className={`font-semibold ${stepItem.active ? 'text-white' : 'text-white/70'}`}>
// // //                             {stepItem.title}
// // //                           </h4>
// // //                           <p className="text-sm text-white/60 mt-1">{stepItem.description}</p>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>

// // //                 {/* Features */}
// // //                 <div className="relative z-10">
// // //                   <h3 className="text-2xl font-bold mb-6">{tAuth('whyJoin')}</h3>
// // //                   <div className="space-y-4">
// // //                     {features.map((feature, index) => (
// // //                       <div key={index} className="flex items-center gap-3 group">
// // //                         <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
// // //                           <feature.icon className={`w-5 h-5 ${feature.color}`} />
// // //                         </div>
// // //                         <span className="text-sm text-white/90 group-hover:text-white transition-colors">
// // //                           {feature.text}
// // //                         </span>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>

// // //                 {/* Login link */}
// // //                 <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
// // //                   <p className="text-white/80 mb-4">
// // //                     {tAuth('alreadyHaveAccount')}
// // //                   </p>
// // //                   <motion.div whileHover={{ scale: 1.05 }}>
// // //                     <Link 
// // //                       href="/connexion"
// // //                       className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
// // //                     >
// // //                       <span>{tCommon('signIn')}</span>
// // //                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //                     </Link>
// // //                   </motion.div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }















// // // // 'use client'

// // // // import { useState } from 'react'
// // // // import Link from 'next/link'
// // // // import { useRouter } from 'next/navigation'
// // // // import { 
// // // //   Mail, 
// // // //   Lock, 
// // // //   Eye, 
// // // //   EyeOff, 
// // // //   User, 
// // // //   Building, 
// // // //   Users, 
// // // //   Shield, 
// // // //   Phone,
// // // //   ArrowLeft,
// // // //   ArrowRight,
// // // //   Check,
// // // //   Sparkles,
// // // //   Key,
// // // //   Smartphone,
// // // //   Globe,
// // // //   Star
// // // // } from 'lucide-react'
// // // // import { createAccount } from '@/actions/auth'
// // // // import { useI18n, useScopedI18n } from '@/locales/client'
// // // // import Logo from '@/components/ui/Logo'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Input } from '@/components/ui/input'
// // // // import { motion } from 'framer-motion'

// // // // type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR'

// // // // export default function InscriptionPage() {
// // // //   const t = useI18n()
// // // //   const tAuth = useScopedI18n('auth.inscription')
// // // //   const tCommon = useScopedI18n('common')
// // // //   const tHeader = useScopedI18n('header')
// // // //   const tUserType = useScopedI18n('auth.userType')

// // // //   const router = useRouter()
// // // //   const [step, setStep] = useState(1)
// // // //   const [selectedType, setSelectedType] = useState<UserType | null>(null)
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [error, setError] = useState('')

// // // //   // Form fields
// // // //   const [formData, setFormData] = useState({
// // // //     first_name: '',
// // // //     last_name: '',
// // // //     email: '',
// // // //     phone: '',
// // // //     password: '',
// // // //     confirmPassword: '',
// // // //   })

// // // //   const [showPassword, setShowPassword] = useState(false)
// // // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const { name, value } = e.target
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }))
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setError('')
// // // //     setLoading(true)

// // // //     try {
// // // //       if (!selectedType) {
// // // //         throw new Error(tAuth('pleaseSelectAccountType'))
// // // //       }

// // // //       if (formData.password !== formData.confirmPassword) {
// // // //         throw new Error(tAuth('passwordMismatch'))
// // // //       }

// // // //       const registrationData: Register = {
// // // //         first_name: formData.first_name,
// // // //         last_name: formData.last_name,
// // // //         email: formData.email,
// // // //         phone: formData.phone,
// // // //         password: formData.password,
// // // //         role: selectedType,
// // // //       }

// // // //       await createAccount(registrationData)
// // // //       router.push('/connexion')
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const canProceedStep1 = selectedType !== null
// // // //   const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
// // // //   const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

// // // //   const features = [
// // // //     { 
// // // //       icon: Key, 
// // // //       text: t('home.howItWorks.step4Desc'), 
// // // //       color: 'text-fibem-secondary' 
// // // //     },
// // // //     { 
// // // //       icon: Smartphone, 
// // // //       text: t('home.hero.cta4Description'), 
// // // //       color: 'text-white' 
// // // //     },
// // // //     { 
// // // //       icon: Globe, 
// // // //       text: t('home.partners.trust'), 
// // // //       color: 'text-fibem-secondary' 
// // // //     },
// // // //     { 
// // // //       icon: Star, 
// // // //       text: t('home.testimonials.subtitle'), 
// // // //       color: 'text-white' 
// // // //     },
// // // //   ]

// // // //   return (
// // // //     <div className="min-h-screen bg-linear-to-br from-fibem-dark via-fibem-primary/20 to-fibem-secondary/10 py-8 md:py-12 relative overflow-hidden">
// // // //       {/* Background decorative elements */}
// // // //       <div className="absolute inset-0 overflow-hidden">
// // // //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
// // // //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
// // // //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
// // // //         <div className="absolute inset-0 opacity-5">
// // // //           <div className="absolute inset-0" style={{
// // // //             backgroundImage: `linear-linear(to right, #379DE0 1px, transparent 1px),
// // // //                              linear-linear(to bottom, #379DE0 1px, transparent 1px)`,
// // // //             backgroundSize: '50px 50px'
// // // //           }}></div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="relative z-10">
// // // //         <div className="max-w-6xl mx-auto px-4">
// // // //           <motion.div 
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.5 }}
// // // //             className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
// // // //           >
// // // //             <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 lg:grid-cols-[2fr,1fr]">
// // // //               {/* Left column - Welcome section */}
// // // //               <div className="bg-linear-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden w-full">
// // // //                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
// // // //                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
                
// // // //                 {/* Logo */}
// // // //                 <div className="relative z-10 mb-8">
// // // //                   <Logo
// // // //                     size="xl"
// // // //                     variant="auth"
// // // //                     withBrand
// // // //                     withSubtitle={t('home.hero.subtitle')}
// // // //                     href="/"
// // // //                     alt={tHeader('searchOnFibem')}
// // // //                     animate
// // // //                     brandClassName="text-white"
// // // //                   />
// // // //                 </div>

// // // //                 {/* Welcome content */}
// // // //                 <div className="relative z-10 space-y-8">
// // // //                   <motion.div 
// // // //                     initial={{ opacity: 0, x: -20 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     transition={{ delay: 0.2 }}
// // // //                     className="space-y-4"
// // // //                   >
// // // //                     <h1 className="text-3xl md:text-4xl font-bold leading-tight">
// // // //                       {tAuth('title')}
// // // //                     </h1>
// // // //                     <p className="text-lg text-white/80">
// // // //                       {tAuth('subtitle')}
// // // //                     </p>
// // // //                   </motion.div>

// // // //                   {/* Features */}
// // // //                   <motion.div 
// // // //                     initial={{ opacity: 0, x: -20 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     transition={{ delay: 0.3 }}
// // // //                     className="space-y-4"
// // // //                   >
// // // //                     {features.map((feature, index) => (
// // // //                       <div key={index} className="flex items-center gap-3 group">
// // // //                         <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
// // // //                           <feature.icon className={`w-5 h-5 ${feature.color}`} />
// // // //                         </div>
// // // //                         <span className="text-sm text-white/90 group-hover:text-white transition-colors">
// // // //                           {feature.text}
// // // //                         </span>
// // // //                       </div>
// // // //                     ))}
// // // //                   </motion.div>

// // // //                   {/* Progress steps */}
// // // //                   <motion.div 
// // // //                     initial={{ opacity: 0, x: -20 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     transition={{ delay: 0.4 }}
// // // //                     className="pt-4"
// // // //                   >
// // // //                     <div className="flex items-center justify-center gap-4 mb-4">
// // // //                       {[1, 2, 3].map((s) => (
// // // //                         <div key={s} className="flex items-center">
// // // //                           <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${step >= s ? 'bg-white text-fibem-primary' : 'bg-white/20 text-white/70'
// // // //                             }`}>
// // // //                             {step > s ? <Check className="w-6 h-6" /> : s}
// // // //                           </div>
// // // //                           {s < 3 && (
// // // //                             <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-white' : 'bg-white/30'}`} />
// // // //                           )}
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                     <div className="text-center text-white/70 text-sm">
// // // //                       {step === 1 && tAuth('step1.title')}
// // // //                       {step === 2 && tAuth('step2.title')}
// // // //                       {step === 3 && tAuth('step3.title')}
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Right column - Registration form */}
// // // //               <div className="p-8 md:p-12 w-full">
// // // //                 <div className="text-center mb-8">
// // // //                   <h2 className="text-3xl font-bold text-fibem-textPrimary mb-2">
// // // //                     {tCommon('createAccount')}
// // // //                   </h2>
// // // //                   <p className="text-fibem-textSecondary">
// // // //                     {tAuth('subtitle')}
// // // //                   </p>
// // // //                 </div>

// // // //                 {error && (
// // // //                   <motion.div 
// // // //                     initial={{ opacity: 0, y: -10 }}
// // // //                     animate={{ opacity: 1, y: 0 }}
// // // //                     className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
// // // //                   >
// // // //                     <p className="text-red-700 text-sm font-medium">{error}</p>
// // // //                   </motion.div>
// // // //                 )}

// // // //                 <form onSubmit={handleSubmit} className="space-y-6">
// // // //                   {/* Step 1: Choose account type */}
// // // //                   {step === 1 && (
// // // //                     <motion.div
// // // //                       initial={{ opacity: 0, x: 20 }}
// // // //                       animate={{ opacity: 1, x: 0 }}
// // // //                       transition={{ duration: 0.3 }}
// // // //                     >
// // // //                       <div className="grid grid-cols-2 gap-4 mb-6">
// // // //                         {([
// // // //                           { id: 'PARTICULIER' as UserType, label: tUserType('particulier'), icon: User, description: tAuth('step1.particulier.description') },
// // // //                           { id: 'CANDIDAT' as UserType, label: tUserType('candidat'), icon: Users, description: tAuth('step1.candidat.description') },
// // // //                           { id: 'PROFESSIONNEL' as UserType, label: tUserType('professionnel'), icon: Building, description: tAuth('step1.professionnel.description') },
// // // //                           { id: 'RECRUTEUR' as UserType, label: tUserType('recruteur'), icon: Shield, description: tAuth('step1.recruteur.description') },
// // // //                         ]).map((type) => (
// // // //                           <motion.button
// // // //                             key={type.id}
// // // //                             type="button"
// // // //                             onClick={() => setSelectedType(type.id)}
// // // //                             whileHover={{ scale: 1.02 }}
// // // //                             whileTap={{ scale: 0.98 }}
// // // //                             className={`p-4 rounded-xl border-2 transition-all text-left ${selectedType === type.id
// // // //                               ? 'border-fibem-primary bg-fibem-primary/5 shadow-md'
// // // //                               : 'border-fibem-border hover:border-fibem-primary/50 hover:bg-fibem-surface'
// // // //                               }`}
// // // //                           >
// // // //                             <type.icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-textSecondary'
// // // //                               }`} />
// // // //                             <p className={`font-semibold ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-textPrimary'
// // // //                               }`}>
// // // //                               {type.label}
// // // //                             </p>
// // // //                             <p className="text-sm text-fibem-textSecondary mt-1">{type.description}</p>
// // // //                           </motion.button>
// // // //                         ))}
// // // //                       </div>

// // // //                       <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // // //                         <Button
// // // //                           type="button"
// // // //                           onClick={() => setStep(2)}
// // // //                           disabled={!canProceedStep1}
// // // //                           className="w-full py-3.5 bg-fibem-primary hover:bg-fibem-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
// // // //                         >
// // // //                           {tCommon('continue')}
// // // //                           <ArrowRight className="w-4 h-4 ml-2" />
// // // //                         </Button>
// // // //                       </motion.div>
// // // //                     </motion.div>
// // // //                   )}

// // // //                   {/* Step 2: Personal information */}
// // // //                   {step === 2 && (
// // // //                     <motion.div
// // // //                       initial={{ opacity: 0, x: 20 }}
// // // //                       animate={{ opacity: 1, x: 0 }}
// // // //                       transition={{ duration: 0.3 }}
// // // //                       className="space-y-4"
// // // //                     >
// // // //                       <div className="grid grid-cols-2 gap-4">
// // // //                         <div>
// // // //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                             {tAuth('step2.firstName')} *
// // // //                           </label>
// // // //                           <Input
// // // //                             type="text"
// // // //                             name="first_name"
// // // //                             value={formData.first_name}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step2.firstNamePlaceholder')}
// // // //                           />
// // // //                         </div>
// // // //                         <div>
// // // //                           <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                             {tAuth('step2.lastName')} *
// // // //                           </label>
// // // //                           <Input
// // // //                             type="text"
// // // //                             name="last_name"
// // // //                             value={formData.last_name}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step2.lastNamePlaceholder')}
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div>
// // // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                           {tAuth('step2.email')} *
// // // //                         </label>
// // // //                         <div className="relative">
// // // //                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // // //                           <Input
// // // //                             type="email"
// // // //                             name="email"
// // // //                             value={formData.email}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step2.emailPlaceholder')}
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div>
// // // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                           {tAuth('step2.phone')} *
// // // //                         </label>
// // // //                         <div className="relative">
// // // //                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // // //                           <Input
// // // //                             type="tel"
// // // //                             name="phone"
// // // //                             value={formData.phone}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step2.phonePlaceholder')}
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="flex justify-between pt-2">
// // // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // // //                           <Button
// // // //                             type="button"
// // // //                             onClick={() => setStep(1)}
// // // //                             variant="outline"
// // // //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
// // // //                           >
// // // //                             <ArrowLeft className="w-4 h-4 mr-2" />
// // // //                             {tCommon('back')}
// // // //                           </Button>
// // // //                         </motion.div>
// // // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // // //                           <Button
// // // //                             type="button"
// // // //                             onClick={() => setStep(3)}
// // // //                             disabled={!canProceedStep2}
// // // //                             className="bg-fibem-primary hover:bg-fibem-dark text-white font-semibold shadow-lg hover:shadow-xl"
// // // //                           >
// // // //                             {tCommon('continue')}
// // // //                             <ArrowRight className="w-4 h-4 ml-2" />
// // // //                           </Button>
// // // //                         </motion.div>
// // // //                       </div>
// // // //                     </motion.div>
// // // //                   )}

// // // //                   {/* Step 3: Password and confirmation */}
// // // //                   {step === 3 && (
// // // //                     <motion.div
// // // //                       initial={{ opacity: 0, x: 20 }}
// // // //                       animate={{ opacity: 1, x: 0 }}
// // // //                       transition={{ duration: 0.3 }}
// // // //                       className="space-y-6"
// // // //                     >
// // // //                       <div>
// // // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                           {tAuth('step3.password')} *
// // // //                         </label>
// // // //                         <div className="relative">
// // // //                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // // //                           <Input
// // // //                             type={showPassword ? 'text' : 'password'}
// // // //                             name="password"
// // // //                             value={formData.password}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             minLength={8}
// // // //                             className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step3.passwordPlaceholder')}
// // // //                           />
// // // //                           <button
// // // //                             type="button"
// // // //                             onClick={() => setShowPassword(!showPassword)}
// // // //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// // // //                           >
// // // //                             {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // // //                           </button>
// // // //                         </div>
// // // //                         <p className="text-xs text-fibem-textSecondary mt-2">
// // // //                           {tAuth('step3.passwordMinLength')}
// // // //                         </p>
// // // //                       </div>

// // // //                       <div>
// // // //                         <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
// // // //                           {tAuth('step3.confirmPassword')} *
// // // //                         </label>
// // // //                         <div className="relative">
// // // //                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// // // //                           <Input
// // // //                             type={showConfirmPassword ? 'text' : 'password'}
// // // //                             name="confirmPassword"
// // // //                             value={formData.confirmPassword}
// // // //                             onChange={handleInputChange}
// // // //                             required
// // // //                             className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
// // // //                             placeholder={tAuth('step3.confirmPasswordPlaceholder')}
// // // //                           />
// // // //                           <button
// // // //                             type="button"
// // // //                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // // //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
// // // //                           >
// // // //                             {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // // //                           </button>
// // // //                         </div>
// // // //                         {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // //                           <p className="text-xs text-red-500 mt-2">{tAuth('passwordMismatch')}</p>
// // // //                         )}
// // // //                       </div>

// // // //                       <div className="pt-2">
// // // //                         <label className="flex items-start gap-3 cursor-pointer">
// // // //                           <input
// // // //                             type="checkbox"
// // // //                             checked={true}
// // // //                             readOnly
// // // //                             className="w-5 h-5 mt-0.5 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
// // // //                           />
// // // //                           <span className="text-sm text-fibem-textSecondary">
// // // //                             {tAuth('step3.termsAgreement', {
// // // //                               terms: (
// // // //                                 <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline">
// // // //                                   {tAuth('step3.terms')}
// // // //                                 </Link>
// // // //                               ),
// // // //                               privacy: (
// // // //                                 <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline">
// // // //                                   {tAuth('step3.privacy')}
// // // //                                 </Link>
// // // //                               )
// // // //                             })}
// // // //                           </span>
// // // //                         </label>
// // // //                       </div>

// // // //                       <div className="flex justify-between pt-2">
// // // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // // //                           <Button
// // // //                             type="button"
// // // //                             onClick={() => setStep(2)}
// // // //                             variant="outline"
// // // //                             className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
// // // //                           >
// // // //                             <ArrowLeft className="w-4 h-4 mr-2" />
// // // //                             {tCommon('back')}
// // // //                           </Button>
// // // //                         </motion.div>
// // // //                         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// // // //                           <Button
// // // //                             type="submit"
// // // //                             disabled={!canProceedStep3 || loading}
// // // //                             className="bg-fibem-primary hover:bg-fibem-dark text-white font-semibold shadow-lg hover:shadow-xl"
// // // //                           >
// // // //                             {loading ? (
// // // //                               <div className="flex items-center gap-2">
// // // //                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // //                                 {tAuth('step3.creatingAccount')}
// // // //                               </div>
// // // //                             ) : (
// // // //                               <div className="flex items-center gap-2">
// // // //                                 {tAuth('step3.createAccount')}
// // // //                                 <Check className="w-4 h-4" />
// // // //                               </div>
// // // //                             )}
// // // //                           </Button>
// // // //                         </motion.div>
// // // //                       </div>
// // // //                     </motion.div>
// // // //                   )}
// // // //                 </form>

// // // //                 {/* Login link */}
// // // //                 <div className="mt-8 pt-8 border-t border-fibem-border text-center">
// // // //                   <p className="text-fibem-textSecondary mb-4">
// // // //                     {tAuth('alreadyHaveAccount')}
// // // //                   </p>
// // // //                   <motion.div whileHover={{ scale: 1.05 }}>
// // // //                     <Link 
// // // //                       href="/connexion"
// // // //                       className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface text-fibem-textPrimary font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
// // // //                     >
// // // //                       <span>{tCommon('signIn')}</span>
// // // //                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // // //                     </Link>
// // // //                   </motion.div>
                  
// // // //                   {/* Additional info */}
// // // //                   <div className="mt-6 grid grid-cols-2 gap-4">
// // // //                     <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
// // // //                       <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
// // // //                         <Shield className="w-4 h-4 text-fibem-primary" />
// // // //                       </div>
// // // //                       <div className="text-xs text-fibem-textSecondary">{t('footer.securePayment')}</div>
// // // //                     </div>
// // // //                     <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
// // // //                       <div className="w-8 h-8 bg-fibem-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
// // // //                         <Check className="w-4 h-4 text-fibem-secondary" />
// // // //                       </div>
// // // //                       <div className="text-xs text-fibem-textSecondary">{t('footer.customerSatisfaction')}</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }




// // // // // 'use client'

// // // // // import { useState } from 'react'
// // // // // import Link from 'next/link'
// // // // // import { useRouter } from 'next/navigation'
// // // // // import { Mail, Lock, Eye, EyeOff, User, Building, Users, Phone, Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react'
// // // // // import { createAccount } from '@/actions/auth'
// // // // // import { useI18n, useScopedI18n } from '@/locales/client'
// // // // // import Image from 'next/image'

// // // // // type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR'

// // // // // export default function InscriptionPage() {
// // // // //   const t = useI18n()
// // // // //   const theader = useScopedI18n('header')

// // // // //   const router = useRouter()
// // // // //   const [step, setStep] = useState(1)
// // // // //   const [selectedType, setSelectedType] = useState<UserType | null>(null)
// // // // //   const [loading, setLoading] = useState(false)
// // // // //   const [error, setError] = useState('')

// // // // //   // Form fields - only what's in Register interface
// // // // //   const [formData, setFormData] = useState({
// // // // //     first_name: '',
// // // // //     last_name: '',
// // // // //     email: '',
// // // // //     phone: '',
// // // // //     password: '',
// // // // //     confirmPassword: '',
// // // // //   })

// // // // //   const [showPassword, setShowPassword] = useState(false)
// // // // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const { name, value } = e.target
// // // // //     setFormData(prev => ({
// // // // //       ...prev,
// // // // //       [name]: value
// // // // //     }))
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     setError('')
// // // // //     setLoading(true)

// // // // //     try {
// // // // //       if (!selectedType) {
// // // // //         throw new Error(t('auth.inscription.pleaseSelectAccountType'))
// // // // //       }

// // // // //       if (formData.password !== formData.confirmPassword) {
// // // // //         throw new Error(t('auth.inscription.passwordMismatch'))
// // // // //       }

// // // // //       const registrationData: Register = {
// // // // //         first_name: formData.first_name,
// // // // //         last_name: formData.last_name,
// // // // //         email: formData.email,
// // // // //         phone: formData.phone,
// // // // //         password: formData.password,
// // // // //         role: selectedType,
// // // // //       }

// // // // //       await createAccount(registrationData)

// // // // //       // Redirect to login on success
// // // // //       router.push('/connexion')
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const canProceedStep1 = selectedType !== null
// // // // //   const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
// // // // //   const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 py-12">
// // // // //       <div className="max-w-2xl mx-auto px-4">
// // // // //         <div className="text-center mb-8">
// // // // //           <div className='flex items-center justify-center'>
// // // // //             <Link href="/" className="flex items-center gap-3 shrink-0 group">
// // // // //               <div className="relative">
// // // // //                 <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
// // // // //                   <Image src={"/logo.png"} width={100} height={60} alt={theader('searchOnFibem')} />
// // // // //                 </div>
// // // // //               </div>

// // // // //             </Link>
// // // // //           </div>
// // // // //           <h2 className="text-2xl font-bold text-gray-800">{t('auth.inscription.title')}</h2>
// // // // //           <p className="text-gray-600 mt-2">{t('auth.inscription.subtitle')}</p>
// // // // //         </div>

// // // // //         {/* Progress steps */}
// // // // //         <div className="flex items-center justify-center gap-2 mb-8">
// // // // //           {[1, 2, 3].map((s) => (
// // // // //             <div key={s} className="flex items-center">
// // // // //               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-fibem-primary text-white' : 'bg-gray-200 text-gray-500'
// // // // //                 }`}>
// // // // //                 {step > s ? <Check className="w-5 h-5" /> : s}
// // // // //               </div>
// // // // //               {s < 3 && (
// // // // //                 <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-fibem-primary' : 'bg-gray-200'}`} />
// // // // //               )}
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // // // //           <form onSubmit={handleSubmit}>
// // // // //             {/* Error message */}
// // // // //             {error && (
// // // // //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// // // // //                 <p className="text-red-700 text-sm">{error}</p>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Step 1: Choose account type */}
// // // // //             {step === 1 && (
// // // // //               <div>
// // // // //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step1.title')}</h3>

// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
// // // // //                   {([
// // // // //                     { id: 'PARTICULIER' as UserType, label: t('auth.userType.particulier'), icon: User, description: t('auth.inscription.step1.particulier.description') },
// // // // //                     { id: 'CANDIDAT' as UserType, label: t('auth.userType.candidat'), icon: Users, description: t('auth.inscription.step1.candidat.description') },
// // // // //                     { id: 'PROFESSIONNEL' as UserType, label: t('auth.userType.professionnel'), icon: Building, description: t('auth.inscription.step1.professionnel.description') },
// // // // //                     { id: 'RECRUTEUR' as UserType, label: t('auth.userType.recruteur'), icon: Shield, description: t('auth.inscription.step1.recruteur.description') },
// // // // //                   ]).map((type) => (
// // // // //                     <button
// // // // //                       key={type.id}
// // // // //                       type="button"
// // // // //                       onClick={() => setSelectedType(type.id)}
// // // // //                       className={`p-4 rounded-xl border-2 transition-all text-left ${selectedType === type.id
// // // // //                         ? 'border-fibem-primary bg-fibem-light'
// // // // //                         : 'border-gray-200 hover:border-gray-300'
// // // // //                         }`}
// // // // //                     >
// // // // //                       <type.icon className={`w-8 h-8 mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-400'
// // // // //                         }`} />
// // // // //                       <p className={`font-semibold ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-700'
// // // // //                         }`}>
// // // // //                         {type.label}
// // // // //                       </p>
// // // // //                       <p className="text-sm text-gray-500 mt-1">{type.description}</p>
// // // // //                     </button>
// // // // //                   ))}
// // // // //                 </div>

// // // // //                 <div className="flex justify-end mt-6">
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setStep(2)}
// // // // //                     disabled={!canProceedStep1}
// // // // //                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                   >
// // // // //                     {t('common.continue')}
// // // // //                     <ArrowRight className="w-4 h-4" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Step 2: Personal information */}
// // // // //             {step === 2 && (
// // // // //               <div>
// // // // //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step2.title')}</h3>

// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.firstName')} *</label>
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       name="first_name"
// // // // //                       value={formData.first_name}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                       placeholder={t('auth.inscription.step2.firstNamePlaceholder')}
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.lastName')} *</label>
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       name="last_name"
// // // // //                       value={formData.last_name}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                       placeholder={t('auth.inscription.step2.lastNamePlaceholder')}
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.email')} *</label>
// // // // //                     <div className="relative">
// // // // //                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //                       <input
// // // // //                         type="email"
// // // // //                         name="email"
// // // // //                         value={formData.email}
// // // // //                         onChange={handleInputChange}
// // // // //                         required
// // // // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                         placeholder={t('auth.inscription.step2.emailPlaceholder')}
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.phone')} *</label>
// // // // //                     <div className="relative">
// // // // //                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //                       <input
// // // // //                         type="tel"
// // // // //                         name="phone"
// // // // //                         value={formData.phone}
// // // // //                         onChange={handleInputChange}
// // // // //                         required
// // // // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                         placeholder={t('auth.inscription.step2.phonePlaceholder')}
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex justify-between mt-6">
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setStep(1)}
// // // // //                     className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// // // // //                   >
// // // // //                     <ArrowLeft className="w-4 h-4" />
// // // // //                     {t('common.back')}
// // // // //                   </button>
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setStep(3)}
// // // // //                     disabled={!canProceedStep2}
// // // // //                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                   >
// // // // //                     {t('common.continue')}
// // // // //                     <ArrowRight className="w-4 h-4" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Step 3: Password and confirmation */}
// // // // //             {step === 3 && (
// // // // //               <div>
// // // // //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step3.title')}</h3>

// // // // //                 <div className="space-y-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.password')} *</label>
// // // // //                     <div className="relative">
// // // // //                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //                       <input
// // // // //                         type={showPassword ? 'text' : 'password'}
// // // // //                         name="password"
// // // // //                         value={formData.password}
// // // // //                         onChange={handleInputChange}
// // // // //                         required
// // // // //                         minLength={8}
// // // // //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                         placeholder={t('auth.inscription.step3.passwordPlaceholder')}
// // // // //                       />
// // // // //                       <button
// // // // //                         type="button"
// // // // //                         onClick={() => setShowPassword(!showPassword)}
// // // // //                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // // //                       >
// // // // //                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // // // //                       </button>
// // // // //                     </div>
// // // // //                     <p className="text-xs text-gray-500 mt-1">{t('auth.inscription.step3.passwordMinLength')}</p>
// // // // //                   </div>

// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.confirmPassword')} *</label>
// // // // //                     <div className="relative">
// // // // //                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //                       <input
// // // // //                         type={showConfirmPassword ? 'text' : 'password'}
// // // // //                         name="confirmPassword"
// // // // //                         value={formData.confirmPassword}
// // // // //                         onChange={handleInputChange}
// // // // //                         required
// // // // //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
// // // // //                         placeholder={t('auth.inscription.step3.confirmPasswordPlaceholder')}
// // // // //                       />
// // // // //                       <button
// // // // //                         type="button"
// // // // //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // // // //                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // // //                       >
// // // // //                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // // // //                       </button>
// // // // //                     </div>
// // // // //                     {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // // //                       <p className="text-xs text-red-500 mt-1">{t('auth.inscription.passwordMismatch')}</p>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   <div className="pt-4 space-y-3">
// // // // //                     <label className="flex items-start gap-3 cursor-pointer">
// // // // //                       <input
// // // // //                         type="checkbox"
// // // // //                         checked={true}
// // // // //                         readOnly
// // // // //                         className="w-5 h-5 mt-0.5 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary"
// // // // //                       />
// // // // //                       <span className="text-sm text-gray-600">
// // // // //                         {t('auth.inscription.step3.termsAgreement', {
// // // // //                           terms: (
// // // // //                             <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline">
// // // // //                               {t('auth.inscription.step3.terms')}
// // // // //                             </Link>
// // // // //                           ),
// // // // //                           privacy: (
// // // // //                             <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline">
// // // // //                               {t('auth.inscription.step3.privacy')}
// // // // //                             </Link>
// // // // //                           )
// // // // //                         })}
// // // // //                       </span>
// // // // //                     </label>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex justify-between mt-6">
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setStep(2)}
// // // // //                     className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// // // // //                   >
// // // // //                     <ArrowLeft className="w-4 h-4" />
// // // // //                     {t('common.back')}
// // // // //                   </button>
// // // // //                   <button
// // // // //                     type="submit"
// // // // //                     disabled={!canProceedStep3 || loading}
// // // // //                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                   >
// // // // //                     {loading ? t('auth.inscription.step3.creatingAccount') : t('auth.inscription.step3.createAccount')}
// // // // //                     {!loading && <Check className="w-4 h-4" />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </form>

// // // // //           {/* Login link */}
// // // // //           <p className="text-center text-gray-600 mt-6 pt-6 border-t">
// // // // //             {t('auth.inscription.alreadyHaveAccount')}{' '}
// // // // //             <Link href="/connexion" className="text-fibem-primary font-semibold hover:underline">
// // // // //               {t('auth.inscription.signIn')}
// // // // //             </Link>
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }