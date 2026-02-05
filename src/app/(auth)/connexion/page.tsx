'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  Users, 
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  Key,
  Smartphone,
  Globe,
  Star
} from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur' | 'stagiaire' | 'freelance' | 'professionnel' | 'recruteur'

export default function ConnexionPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<UserType>('particulier')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Une erreur est survenue')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    { 
      id: 'particulier' as UserType, 
      label: 'Particulier', 
      icon: User, 
      description: 'Accès aux services pour particuliers',
      color: 'blue'
    },
    { 
      id: 'candidat' as UserType, 
      label: 'Candidat', 
      icon: Users, 
      description: 'Espace candidats et chercheurs d\'emploi',
      color: 'green'
    },
    { 
      id: 'partenaire' as UserType, 
      label: 'Partenaire', 
      icon: Building, 
      description: 'Espace partenaires et collaborateurs',
      color: 'purple'
    },
    { 
      id: 'administrateur' as UserType, 
      label: 'Administrateur', 
      icon: Shield, 
      description: 'Accès administration',
      color: 'amber'
    },
  ]

  const features = [
    { 
      icon: Key, 
      text: 'Accès sécurisé à votre compte', 
      color: 'text-fibem-secondary' 
    },
    { 
      icon: Smartphone, 
      text: 'Application mobile disponible', 
      color: 'text-white' 
    },
    { 
      icon: Globe, 
      text: 'Services dans tout le Sénégal', 
      color: 'text-fibem-secondary' 
    },
    { 
      icon: Star, 
      text: 'Noté 4.8/5 par nos clients', 
      color: 'text-white' 
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-fibem-dark via-fibem-primary/20 to-fibem-secondary/10 py-8 md:py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blur circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #379DE0 1px, transparent 1px),
                             linear-gradient(to bottom, #379DE0 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Main container with glass effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 lg:grid-cols-[2fr,1fr]">
              {/* Left column - Welcome section */}
              <div className="bg-gradient-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden w-full">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
                
                {/* Logo */}
                <div className="relative z-10 mb-8">
                  <Logo
                    size="xl"
                    variant="auth"
                    withBrand
                    withSubtitle="Services professionnels, recrutement et mise en relation d'experts en France et au Sénégal"
                    href="/"
                    alt="Rechercher sur FIBEM..."
                    animate
                    brandClassName="text-white"
                  />
                </div>

                {/* Welcome content */}
                <div className="relative z-10 space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                      Bon retour sur Fibem !
                    </h1>
                    <p className="text-lg text-white/80">
                      La plateforme N°1 de services au Sénégal
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                          <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-4 pt-4"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-sm text-white/70">Clients satisfaits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-white/70">Satisfaction client</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-white/70">Support disponible</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right column - Login form */}
              <div className="p-8 md:p-12 w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-fibem-textPrimary mb-2">
                    Se connecter
                  </h2>
                  <p className="text-fibem-textSecondary">
                    Accédez à votre espace personnel
                  </p>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-fibem-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-fibem-muted text-sm">
                      Connexion avec votre email
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                        disabled={isLoading}
                        className="pl-10 pr-4 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                        disabled={isLoading}
                        className="pl-10 pr-12 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary disabled:opacity-50"
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          disabled={isLoading}
                          className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20 disabled:opacity-50"
                        />
                      </div>
                      <span className="text-sm text-fibem-textSecondary">
                        Se souvenir de moi
                      </span>
                    </label>
                    <Link 
                      href="/mot-de-passe-oublie" 
                      className="text-sm text-fibem-primary hover:text-fibem-dark font-medium"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-fibem-primary hover:bg-fibem-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Connexion en cours...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Se connecter
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Create account section */}
                <div className="mt-8 pt-8 border-t border-fibem-border text-center">
                  <p className="text-fibem-textSecondary mb-4">
                    Pas encore de compte ?
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                      href="/inscription"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface text-fibem-textPrimary font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <span>Créer un compte</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  {/* Additional info */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
                      <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-4 h-4 text-fibem-primary" />
                      </div>
                      <div className="text-xs text-fibem-textSecondary">Paiement sécurisé</div>
                    </div>
                    <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
                      <div className="w-8 h-8 bg-fibem-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check className="w-4 h-4 text-fibem-secondary" />
                      </div>
                      <div className="text-xs text-fibem-textSecondary">Satisfaction client</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}