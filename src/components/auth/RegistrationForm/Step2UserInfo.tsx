'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
// import { useI18n, useScopedI18n } from '@/locales/client'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  User, 
  Building, 
  Briefcase,
  Calendar,
  MapPin,
  Upload,
  X,
  Award,
  Euro,
  Globe,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { UserRole } from '@/lib/auth/roles'

interface UserInfo {
  email: string
  password: string
  confirmPassword: string
  first_name: string
  last_name: string
  phone: string
  acceptTerms: boolean
  acceptMarketing: boolean
}

interface CompanyInfo {
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

interface CandidateInfo {
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

interface FreelancerInfo {
  business_name: string
  business_type: string
  siret?: string
  skills: string[]
  service_categories: string[]
  hourly_rate?: number
  experience_years: number
  portfolio_url?: string
}

interface Step2UserInfoProps {
  selectedRole: UserRole
  userInfo: UserInfo
  companyInfo?: CompanyInfo
  candidateInfo?: CandidateInfo
  freelancerInfo?: FreelancerInfo
  onUserInfoChange: (updates: Partial<UserInfo>) => void
  onCompanyInfoChange?: (updates: Partial<CompanyInfo>) => void
  onCandidateInfoChange?: (updates: Partial<CandidateInfo>) => void
  onFreelancerInfoChange?: (updates: Partial<FreelancerInfo>) => void
  onBack: () => void
  onNext: () => void
  canProceed: boolean
}

const COMPANY_TYPES = [
  { value: 'SARL', label: 'SARL' },
  { value: 'SA', label: 'SA' },
  { value: 'SAS', label: 'SAS' },
  { value: 'SASU', label: 'SASU' },
  { value: 'EI', label: 'Entreprise Individuelle' },
  { value: 'Auto-entrepreneur', label: 'Auto-entrepreneur' },
  { value: 'Association', label: 'Association' },
  { value: 'EURL', label: 'EURL' },
]

const COMPANY_SIZES = [
  { value: '1-9', label: '1-9 employés' },
  { value: '10-49', label: '10-49 employés' },
  { value: '50-249', label: '50-249 employés' },
  { value: '250+', label: '250+ employés' },
]

const CANDIDATE_STATUSES = [
  { value: 'student', label: 'Étudiant' },
  { value: 'employed', label: 'En poste' },
  { value: 'unemployed', label: 'À la recherche' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'intern', label: 'Stagiaire' },
]

const EDUCATION_LEVELS = [
  { value: 'bac', label: 'Baccalauréat' },
  { value: 'bac+2', label: 'Bac+2 (BTS, DUT)' },
  { value: 'bac+3', label: 'Bac+3 (Licence)' },
  { value: 'bac+5', label: 'Bac+5 (Master)' },
  { value: 'doctorat', label: 'Doctorat' },
  { value: 'other', label: 'Autre' },
]

const JOB_TYPES = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Stage', label: 'Stage' },
  { value: 'Alternance', label: 'Alternance' },
  { value: 'Interim', label: 'Intérim' },
]

const COUNTRIES = [
  { value: 'FR', label: 'France' },
  { value: 'SN', label: 'Sénégal' },
  { value: 'BE', label: 'Belgique' },
  { value: 'CH', label: 'Suisse' },
  { value: 'CA', label: 'Canada' },
  { value: 'other', label: 'Autre' },
]

export default function Step2UserInfo({
  selectedRole,
  userInfo,
  companyInfo = {},
  candidateInfo = {
    birth_date: '',
    current_status: '',
    education_level: '',
    years_experience: 0,
    job_types: [],
    locations: [],
    remote_work: false,
    skills: [],
  },
  freelancerInfo = {
    business_name: '',
    business_type: '',
    skills: [],
    service_categories: [],
    experience_years: 0,
  },
  onUserInfoChange,
  onCompanyInfoChange = () => {},
  onCandidateInfoChange = () => {},
  onFreelancerInfoChange = () => {},
  onBack,
  onNext,
  canProceed,
}: Step2UserInfoProps) {
  // const t = useI18n()
  // const tAuth = useScopedI18n('auth.inscription')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [skillsInput, setSkillsInput] = useState('')
  const [locationsInput, setLocationsInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Validation des mots de passe
  const passwordMatch = userInfo.password === userInfo.confirmPassword
  const passwordStrength = userInfo.password.length >= 8 ? 
    (userInfo.password.match(/[A-Z]/) && userInfo.password.match(/[0-9]/) && userInfo.password.match(/[^A-Za-z0-9]/) ? 'strong' : 'medium') : 
    'weak'

  // Gestion du fichier CV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      onCandidateInfoChange({ 
        cv_file: file,
        cv_file_name: file.name 
      })
    }
  }

  const removeCV = () => {
    onCandidateInfoChange({ 
      cv_file: undefined,
      cv_file_name: undefined 
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Gestion des compétences
  const addSkill = () => {
    if (skillsInput.trim() && !candidateInfo.skills?.includes(skillsInput.trim())) {
      onCandidateInfoChange({ 
        skills: [...(candidateInfo.skills || []), skillsInput.trim()] 
      })
      setSkillsInput('')
    }
  }

  const removeSkill = (skill: string) => {
    onCandidateInfoChange({ 
      skills: candidateInfo.skills?.filter(s => s !== skill) || [] 
    })
  }

  // Gestion des localisations
  const addLocation = () => {
    if (locationsInput.trim() && !candidateInfo.locations?.includes(locationsInput.trim())) {
      onCandidateInfoChange({ 
        locations: [...(candidateInfo.locations || []), locationsInput.trim()] 
      })
      setLocationsInput('')
    }
  }

  const removeLocation = (location: string) => {
    onCandidateInfoChange({ 
      locations: candidateInfo.locations?.filter(l => l !== location) || [] 
    })
  }

  // Calcul de l'âge pour validation
  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const isAdult = candidateInfo.birth_date ? calculateAge(candidateInfo.birth_date) >= 18 : true

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
          Informations personnelles
        </h2>
        <p className="text-fibem-textSecondary">
          Renseignez vos informations personnelles pour continuer
        </p>
      </div>

      {/* Informations communes à tous */}
      <div className="space-y-6">
        <div className="bg-linear-to-r from-fibem-primary/5 to-fibem-secondary/5 rounded-xl p-4 border border-fibem-primary/10">
          <h3 className="font-bold text-fibem-dark mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-fibem-primary" />
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Prénom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                <Input
                  type="text"
                  value={userInfo.first_name}
                  onChange={(e) => onUserInfoChange({ first_name: e.target.value })}
                  className="pl-10 border-fibem-border focus:border-fibem-primary"
                  placeholder="Votre prénom"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Nom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                <Input
                  type="text"
                  value={userInfo.last_name}
                  onChange={(e) => onUserInfoChange({ last_name: e.target.value })}
                  className="pl-10 border-fibem-border focus:border-fibem-primary"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                <Input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => onUserInfoChange({ email: e.target.value })}
                  className="pl-10 border-fibem-border focus:border-fibem-primary"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                <Input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => onUserInfoChange({ phone: e.target.value })}
                  className="pl-10 border-fibem-border focus:border-fibem-primary"
                  placeholder="+33 1 23 45 67 89"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={userInfo.password}
                  onChange={(e) => onUserInfoChange({ password: e.target.value })}
                  className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary"
                  placeholder="Minimum 8 caractères"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Indicateur de force du mot de passe */}
              {userInfo.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-fibem-border rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                          passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' :
                          'w-full bg-green-500'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-medium">
                      {passwordStrength === 'weak' ? 'Faible' :
                       passwordStrength === 'medium' ? 'Moyen' : 'Fort'}
                    </span>
                  </div>
                  <p className="text-xs text-fibem-textSecondary">
                    {passwordStrength === 'weak' && 'Ajoutez des majuscules, chiffres et caractères spéciaux'}
                    {passwordStrength === 'medium' && 'Presque parfait ! Ajoutez un caractère spécial'}
                    {passwordStrength === 'strong' && 'Mot de passe sécurisé ✓'}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={userInfo.confirmPassword}
                  onChange={(e) => onUserInfoChange({ confirmPassword: e.target.value })}
                  className={`pl-10 pr-12 border-fibem-border focus:border-fibem-primary ${
                    userInfo.confirmPassword && !passwordMatch ? 'border-red-300' : ''
                  }`}
                  placeholder="Confirmez votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {userInfo.confirmPassword && !passwordMatch && (
                <p className="text-xs text-red-500 mt-2">Les mots de passe ne correspondent pas</p>
              )}
            </div>
          </div>
        </div>

        {/* Informations spécifiques selon le rôle */}
        
        {/* Entreprise (COMPANY_ADMIN, RECRUITER) */}
        {['COMPANY_ADMIN', 'RECRUITER'].includes(selectedRole) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-fibem-secondary/5 to-fibem-accent/5 rounded-xl p-4 border border-fibem-secondary/10"
          >
            <h3 className="font-bold text-fibem-dark mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-fibem-secondary" />
              Informations entreprise
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Nom de l'entreprise *
                  </label>
                  <Input
                    type="text"
                    value={companyInfo.company_name || ''}
                    onChange={(e) => onCompanyInfoChange({ company_name: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="Nom officiel de votre entreprise"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Type d'entreprise *
                  </label>
                  <Select
                    value={companyInfo.company_type || ''}
                    onValueChange={(value) => onCompanyInfoChange({ company_type: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    SIRET/SIREN *
                  </label>
                  <Input
                    type="text"
                    value={companyInfo.siret_siren || ''}
                    onChange={(e) => onCompanyInfoChange({ siret_siren: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="14 chiffres SIRET ou 9 chiffres SIREN"
                    required
                  />
                  <p className="text-xs text-fibem-textSecondary mt-1">
                    Pour vérification et facturation
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Taille de l'entreprise *
                  </label>
                  <Select
                    value={companyInfo.company_size || ''}
                    onValueChange={(value) => onCompanyInfoChange({ company_size: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Nombre d'employés" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Secteur d'activité *
                </label>
                <Input
                  type="text"
                  value={companyInfo.industry || ''}
                  onChange={(e) => onCompanyInfoChange({ industry: e.target.value })}
                  className="border-fibem-border focus:border-fibem-primary"
                  placeholder="Ex: Informatique, Restauration, Commerce..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Adresse *
                  </label>
                  <Input
                    type="text"
                    value={companyInfo.address || ''}
                    onChange={(e) => onCompanyInfoChange({ address: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="Adresse postale"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Ville *
                  </label>
                  <Input
                    type="text"
                    value={companyInfo.city || ''}
                    onChange={(e) => onCompanyInfoChange({ city: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="Ville"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Code postal *
                  </label>
                  <Input
                    type="text"
                    value={companyInfo.postal_code || ''}
                    onChange={(e) => onCompanyInfoChange({ postal_code: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="Code postal"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Pays *
                  </label>
                  <Select
                    value={companyInfo.country || ''}
                    onValueChange={(value) => onCompanyInfoChange({ country: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Site web (optionnel)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                  <Input
                    type="url"
                    value={companyInfo.website || ''}
                    onChange={(e) => onCompanyInfoChange({ website: e.target.value })}
                    className="pl-10 border-fibem-border focus:border-fibem-primary"
                    placeholder="https://www.votre-entreprise.com"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Candidat (CANDIDATE, CANDIDATE_PREMIUM) */}
        {['CANDIDATE', 'CANDIDATE_PREMIUM'].includes(selectedRole) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-fibem-warning/5 to-fibem-accent/5 rounded-xl p-4 border border-fibem-warning/10"
          >
            <h3 className="font-bold text-fibem-dark mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-fibem-warning" />
              Informations professionnelles
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Date de naissance *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                    <Input
                      type="date"
                      value={candidateInfo.birth_date || ''}
                      onChange={(e) => onCandidateInfoChange({ birth_date: e.target.value })}
                      className="pl-10 border-fibem-border focus:border-fibem-primary"
                      required
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {candidateInfo.birth_date && !isAdult && (
                    <p className="text-xs text-red-500 mt-2">Vous devez être majeur pour créer un compte</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Situation actuelle *
                  </label>
                  <Select
                    value={candidateInfo.current_status || ''}
                    onValueChange={(value) => onCandidateInfoChange({ current_status: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {CANDIDATE_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Niveau d'éducation *
                  </label>
                  <Select
                    value={candidateInfo.education_level || ''}
                    onValueChange={(value) => onCandidateInfoChange({ education_level: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATION_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Années d'expérience *
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={candidateInfo.years_experience || 0}
                      onChange={(e) => onCandidateInfoChange({ years_experience: parseInt(e.target.value) || 0 })}
                      className="border-fibem-border focus:border-fibem-primary"
                    />
                    <span className="text-fibem-textSecondary whitespace-nowrap">années</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Salaire minimum souhaité
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                    <Input
                      type="number"
                      min="0"
                      value={candidateInfo.desired_salary_min || ''}
                      onChange={(e) => onCandidateInfoChange({ desired_salary_min: parseInt(e.target.value) || undefined })}
                      className="pl-10 border-fibem-border focus:border-fibem-primary"
                      placeholder="Minimum"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Salaire maximum souhaité
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                    <Input
                      type="number"
                      min="0"
                      value={candidateInfo.desired_salary_max || ''}
                      onChange={(e) => onCandidateInfoChange({ desired_salary_max: parseInt(e.target.value) || undefined })}
                      className="pl-10 border-fibem-border focus:border-fibem-primary"
                      placeholder="Maximum"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Types de contrat recherchés *
                </label>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((jobType) => (
                    <button
                      key={jobType.value}
                      type="button"
                      onClick={() => {
                        const currentTypes = candidateInfo.job_types || []
                        const newTypes = currentTypes.includes(jobType.value)
                          ? currentTypes.filter(t => t !== jobType.value)
                          : [...currentTypes, jobType.value]
                        onCandidateInfoChange({ job_types: newTypes })
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        candidateInfo.job_types?.includes(jobType.value)
                          ? 'bg-fibem-primary text-white'
                          : 'bg-fibem-surface text-fibem-textSecondary hover:bg-fibem-surface/80'
                      }`}
                    >
                      {jobType.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Localisations recherchées *
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={locationsInput}
                    onChange={(e) => setLocationsInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
                    className="flex-1 border-fibem-border focus:border-fibem-primary"
                    placeholder="Ajouter une ville ou région"
                  />
                  <Button
                    type="button"
                    onClick={addLocation}
                    className="bg-fibem-primary hover:bg-fibem-dark text-white"
                  >
                    Ajouter
                  </Button>
                </div>
                {candidateInfo.locations && candidateInfo.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {candidateInfo.locations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center gap-1 px-3 py-1.5 bg-fibem-surface rounded-lg"
                      >
                        <MapPin className="w-3 h-3 text-fibem-primary" />
                        <span className="text-sm">{location}</span>
                        <button
                          type="button"
                          onClick={() => removeLocation(location)}
                          className="ml-2 text-fibem-muted hover:text-fibem-textSecondary"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Compétences *
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 border-fibem-border focus:border-fibem-primary"
                    placeholder="Ajouter une compétence (ex: React, Marketing, Gestion)"
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    className="bg-fibem-primary hover:bg-fibem-dark text-white"
                  >
                    Ajouter
                  </Button>
                </div>
                {candidateInfo.skills && candidateInfo.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {candidateInfo.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1 px-3 py-1.5 bg-fibem-surface rounded-lg"
                      >
                        <Award className="w-3 h-3 text-fibem-secondary" />
                        <span className="text-sm">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-fibem-muted hover:text-fibem-textSecondary"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={candidateInfo.remote_work || false}
                    onChange={(e) => onCandidateInfoChange({ remote_work: e.target.checked })}
                    className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
                  />
                  <span className="text-sm text-fibem-textSecondary">
                    Ouvert au télétravail
                  </span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  CV (PDF) *
                </label>
                {candidateInfo.cv_file_name ? (
                  <div className="flex items-center justify-between p-3 bg-fibem-surface rounded-lg border border-fibem-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-fibem-primary" />
                      <div>
                        <p className="font-medium text-fibem-dark">{candidateInfo.cv_file_name}</p>
                        <p className="text-xs text-fibem-textSecondary">
                          {(candidateInfo.cv_file?.size || 0) / 1024 > 1024
                            ? `${((candidateInfo.cv_file?.size || 0) / 1024 / 1024).toFixed(2)} Mo`
                            : `${((candidateInfo.cv_file?.size || 0) / 1024).toFixed(0)} Ko`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCV}
                      className="p-1 text-fibem-muted hover:text-fibem-textSecondary"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-fibem-border rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-fibem-muted mx-auto mb-3" />
                    <p className="font-medium text-fibem-dark mb-1">Télécharger votre CV</p>
                    <p className="text-sm text-fibem-textSecondary mb-4">
                      Format PDF uniquement, max 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-fibem-border hover:border-fibem-primary"
                    >
                      Parcourir les fichiers
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Freelancer */}
        {selectedRole === 'FREELANCER' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-fibem-accent/5 to-fibem-purple/5 rounded-xl p-4 border border-fibem-accent/10"
          >
            <h3 className="font-bold text-fibem-dark mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-fibem-accent" />
              Informations professionnelles
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Nom de votre activité *
                  </label>
                  <Input
                    type="text"
                    value={freelancerInfo.business_name || ''}
                    onChange={(e) => onFreelancerInfoChange({ business_name: e.target.value })}
                    className="border-fibem-border focus:border-fibem-primary"
                    placeholder="Nom commercial"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Type d'activité *
                  </label>
                  <Select
                    value={freelancerInfo.business_type || ''}
                    onValueChange={(value) => onFreelancerInfoChange({ business_type: value })}
                  >
                    <SelectTrigger className="border-fibem-border focus:border-fibem-primary">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto-entrepreneur">Auto-entrepreneur</SelectItem>
                      <SelectItem value="ei">Entreprise Individuelle</SelectItem>
                      <SelectItem value="eurl">EURL</SelectItem>
                      <SelectItem value="sasu">SASU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  SIRET (optionnel)
                </label>
                <Input
                  type="text"
                  value={freelancerInfo.siret || ''}
                  onChange={(e) => onFreelancerInfoChange({ siret: e.target.value })}
                  className="border-fibem-border focus:border-fibem-primary"
                  placeholder="14 chiffres SIRET"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                  Catégories de services *
                </label>
                <Input
                  type="text"
                  value={freelancerInfo.service_categories?.join(', ') || ''}
                  onChange={(e) => onFreelancerInfoChange({ 
                    service_categories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="border-fibem-border focus:border-fibem-primary"
                  placeholder="Ex: Développement web, Design, Conseil marketing..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Taux horaire (€)
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                    <Input
                      type="number"
                      min="0"
                      value={freelancerInfo.hourly_rate || ''}
                      onChange={(e) => onFreelancerInfoChange({ hourly_rate: parseInt(e.target.value) || undefined })}
                      className="pl-10 border-fibem-border focus:border-fibem-primary"
                      placeholder="Taux horaire"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                    Années d'expérience *
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={freelancerInfo.experience_years || 0}
                      onChange={(e) => onFreelancerInfoChange({ experience_years: parseInt(e.target.value) || 0 })}
                      className="border-fibem-border focus:border-fibem-primary"
                    />
                    <span className="text-fibem-textSecondary whitespace-nowrap">années</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Acceptation des conditions */}
        <div className="bg-white rounded-xl border border-fibem-border p-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={userInfo.acceptTerms}
                onCheckedChange={(checked) => onUserInfoChange({ acceptTerms: checked === true })}
                className="mt-0.5 border-fibem-border data-[state=checked]:bg-fibem-primary data-[state=checked]:border-fibem-primary"
              />
              <span className="text-sm text-fibem-textSecondary">
                J'accepte les{' '}
                <Link href="/terms" className="text-fibem-primary hover:underline font-medium">
                  Conditions Générales d'Utilisation
                </Link>{' '}
                et la{' '}
                <Link href="/privacy" className="text-fibem-primary hover:underline font-medium">
                  Politique de Confidentialité
                </Link>{' '}
                *
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={userInfo.acceptMarketing}
                onCheckedChange={(checked) => onUserInfoChange({ acceptMarketing: checked === true })}
                className="mt-0.5 border-fibem-border data-[state=checked]:bg-fibem-primary data-[state=checked]:border-fibem-primary"
              />
              <span className="text-sm text-fibem-textSecondary">
                J'accepte de recevoir des offres commerciales et des informations par email
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-fibem-border hover:border-fibem-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canProceed || !isAdult || !passwordMatch}
          className="px-8 py-3 bg-linear-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold"
        >
          Continuer vers le paiement
        </Button>
      </div>
    </div>
  )
}

