'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Smartphone,
  Mail,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserRole } from '@/lib/auth/roles'
import { SubscriptionPlan, BillingPeriod } from '@/lib/subscription/plans'
// import { UserInfo } from './Step3PlanSelection'
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

interface Step4PaymentProps {
  selectedRole: UserRole
  selectedPlan: SubscriptionPlan | undefined
  billingPeriod: BillingPeriod
  useTrial: boolean
  userInfo: UserInfo
  companyInfo?: any
  onPaymentComplete: () => void
  onBack: () => void
  loading: boolean
}

export default function Step4Payment({
  selectedRole,
  selectedPlan,
  billingPeriod,
  useTrial,
  userInfo,
  companyInfo,
  onPaymentComplete,
  onBack,
  loading
}: Step4PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardHolder: '',
    saveCard: false,
  })
  
  const [mobilePayment, setMobilePayment] = useState({
    phoneNumber: '',
    operator: 'orange',
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState<string>('')

  // Validation de la carte
  const isCardValid = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16) return false
    if (!cardDetails.expiryDate || !cardDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) return false
    if (!cardDetails.cvc || cardDetails.cvc.length < 3) return false
    if (!cardDetails.cardHolder) return false
    return true
  }

  // Validation mobile
  const isMobileValid = () => {
    if (!mobilePayment.phoneNumber || mobilePayment.phoneNumber.length < 9) return false
    return true
  }

  // Formatage du numéro de carte
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  // Formatage date d'expiration
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }))
  }

  const handleMobileInputChange = (field: string, value: string) => {
    setMobilePayment(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const simulatePayment = () => {
    setIsProcessing(true)
    setPaymentError('')
    
    // Simulation de délai de paiement
    setTimeout(() => {
      // Simuler une erreur aléatoire (20% de chance)
      const hasError = Math.random() < 0.2
      
      if (hasError) {
        setPaymentError('Le paiement a été refusé. Veuillez vérifier vos informations ou essayer une autre méthode de paiement.')
        setIsProcessing(false)
      } else {
        setPaymentSuccess(true)
        setIsProcessing(false)
        
        // Appeler la fonction de complétion après succès
        setTimeout(() => {
          onPaymentComplete()
        }, 2000)
      }
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (useTrial) {
      // Si période d'essai, pas de paiement nécessaire
      onPaymentComplete()
      return
    }
    
    if (paymentMethod === 'card' && !isCardValid()) {
      setPaymentError('Veuillez remplir tous les champs de carte bancaire correctement.')
      return
    }
    
    if (paymentMethod === 'mobile' && !isMobileValid()) {
      setPaymentError('Veuillez entrer un numéro de téléphone valide.')
      return
    }
    
    simulatePayment()
  }

  const calculateTotal = () => {
    if (useTrial || !selectedPlan) return 0
    
    const price = billingPeriod === 'monthly' 
      ? selectedPlan.price_monthly 
      : selectedPlan.price_yearly
    
    // Ajouter la TVA (20%)
    return price * 1.2
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-fibem-dark mb-3">
          Paiement
        </h2>
        <p className="text-fibem-textSecondary">
          {useTrial 
            ? 'Commencez votre essai gratuit - aucun paiement requis'
            : 'Sécurisez votre abonnement avec notre paiement sécurisé'}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne de gauche - Récapitulatif */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sélection de la méthode de paiement */}
          {!useTrial && (
            <div className="bg-white rounded-xl border border-fibem-border p-6">
              <h3 className="font-bold text-fibem-dark mb-4 text-lg">
                Méthode de paiement
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-fibem-primary bg-fibem-primary/5'
                      : 'border-fibem-border hover:border-fibem-primary/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    paymentMethod === 'card' ? 'bg-fibem-primary' : 'bg-fibem-surface'
                  }`}>
                    <CreditCard className={`w-6 h-6 ${
                      paymentMethod === 'card' ? 'text-white' : 'text-fibem-textSecondary'
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${
                      paymentMethod === 'card' ? 'text-fibem-primary' : 'text-fibem-dark'
                    }`}>
                      Carte bancaire
                    </p>
                    <p className="text-sm text-fibem-textSecondary">
                      Visa, Mastercard, Amex
                    </p>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile')}
                  className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    paymentMethod === 'mobile'
                      ? 'border-fibem-primary bg-fibem-primary/5'
                      : 'border-fibem-border hover:border-fibem-primary/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    paymentMethod === 'mobile' ? 'bg-fibem-primary' : 'bg-fibem-surface'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${
                      paymentMethod === 'mobile' ? 'text-white' : 'text-fibem-textSecondary'
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${
                      paymentMethod === 'mobile' ? 'text-fibem-primary' : 'text-fibem-dark'
                    }`}>
                      Paiement mobile
                    </p>
                    <p className="text-sm text-fibem-textSecondary">
                      Orange Money, Wave
                    </p>
                  </div>
                </button>
              </div>

              {/* Formulaire carte bancaire */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Numéro de carte *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                        className="pl-10 border-fibem-border focus:border-fibem-primary"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                        Date d'expiration *
                      </label>
                      <Input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                        className="border-fibem-border focus:border-fibem-primary"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                        Code de sécurité *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                        <Input
                          type="text"
                          value={cardDetails.cvc}
                          onChange={(e) => handleCardInputChange('cvc', e.target.value)}
                          className="pl-10 border-fibem-border focus:border-fibem-primary"
                          placeholder="CVC"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Titulaire de la carte *
                    </label>
                    <Input
                      type="text"
                      value={cardDetails.cardHolder}
                      onChange={(e) => handleCardInputChange('cardHolder', e.target.value)}
                      className="border-fibem-border focus:border-fibem-primary"
                      placeholder="Nom comme sur la carte"
                    />
                  </div>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardDetails.saveCard}
                      onChange={(e) => handleCardInputChange('saveCard', e.target.checked.toString())}
                      className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
                    />
                    <span className="text-sm text-fibem-textSecondary">
                      Enregistrer cette carte pour les paiements futurs
                    </span>
                  </label>
                </div>
              )}

              {/* Formulaire paiement mobile */}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Opérateur mobile *
                    </label>
                    <select
                      value={mobilePayment.operator}
                      onChange={(e) => handleMobileInputChange('operator', e.target.value)}
                      className="w-full px-3 py-2 border border-fibem-border rounded-lg focus:border-fibem-primary focus:ring-fibem-primary/20"
                    >
                      <option value="orange">Orange Money</option>
                      <option value="wave">Wave</option>
                      <option value="free">Free Money</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="moov">Moov Money</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      Numéro de téléphone *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type="tel"
                        value={mobilePayment.phoneNumber}
                        onChange={(e) => handleMobileInputChange('phoneNumber', e.target.value)}
                        className="pl-10 border-fibem-border focus:border-fibem-primary"
                        placeholder="+221 77 123 45 67"
                      />
                    </div>
                    <p className="text-xs text-fibem-textSecondary mt-2">
                      Vous recevrez une demande de confirmation sur votre téléphone
                    </p>
                  </div>
                </div>
              )}

              {/* Sécurité */}
              <div className="mt-6 pt-6 border-t border-fibem-border">
                <div className="flex items-center gap-3 text-sm text-fibem-textSecondary">
                  <Shield className="w-4 h-4 text-fibem-success" />
                  <span>Paiement 100% sécurisé via Stripe</span>
                </div>
              </div>
            </div>
          )}

          {/* Informations de facturation */}
          <div className="bg-white rounded-xl border border-fibem-border p-6">
            <h3 className="font-bold text-fibem-dark mb-4 text-lg">
              Informations de facturation
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-fibem-primary" />
                <div>
                  <p className="text-sm text-fibem-textSecondary">Email de facturation</p>
                  <p className="font-medium text-fibem-dark">{userInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-fibem-secondary" />
                <div>
                  <p className="text-sm text-fibem-textSecondary">Nom</p>
                  <p className="font-medium text-fibem-dark">{userInfo.first_name} {userInfo.last_name}</p>
                </div>
              </div>
              
              {companyInfo?.company_name && (
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-fibem-accent" />
                  <div>
                    <p className="text-sm text-fibem-textSecondary">Entreprise</p>
                    <p className="font-medium text-fibem-dark">{companyInfo.company_name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colonne de droite - Récapitulatif de commande */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-fibem-surface to-white rounded-xl border border-fibem-border p-6 sticky top-8">
            <h3 className="font-bold text-fibem-dark mb-4 text-lg">
              Récapitulatif de commande
            </h3>
            
            {/* Détails du plan */}
            {selectedPlan && (
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-fibem-dark">{selectedPlan.name}</p>
                    <p className="text-sm text-fibem-textSecondary">
                      {useTrial 
                        ? 'Essai gratuit 14 jours'
                        : billingPeriod === 'monthly' ? 'Facturation mensuelle' : 'Facturation annuelle'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-fibem-primary text-lg">
                      {useTrial ? 'Gratuit' : formatCurrency(billingPeriod === 'monthly' 
                        ? selectedPlan.price_monthly 
                        : selectedPlan.price_yearly)}
                    </p>
                  </div>
                </div>
                
                {/* Détails de la TVA */}
                {!useTrial && (
                  <div className="pt-3 border-t border-fibem-border/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-fibem-textSecondary">Sous-total</span>
                      <span>{formatCurrency(billingPeriod === 'monthly' 
                        ? selectedPlan.price_monthly 
                        : selectedPlan.price_yearly)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-fibem-textSecondary">TVA (20%)</span>
                      <span>{formatCurrency((billingPeriod === 'monthly' 
                        ? selectedPlan.price_monthly 
                        : selectedPlan.price_yearly) * 0.2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Total */}
            <div className="mb-6 pt-4 border-t border-fibem-border">
              <div className="flex justify-between items-center">
                <span className="font-bold text-fibem-dark text-lg">Total</span>
                <span className="font-bold text-fibem-primary text-xl">
                  {useTrial ? 'Gratuit' : formatCurrency(calculateTotal())}
                </span>
              </div>
              {!useTrial && billingPeriod === 'yearly' && (
                <p className="text-sm text-fibem-success mt-2 text-right">
                  Économisez {selectedPlan && formatCurrency((selectedPlan.price_monthly * 12) - selectedPlan.price_yearly)} !
                </p>
              )}
            </div>

            {/* Période d'essai */}
            {useTrial && (
              <div className="mb-6 p-3 bg-gradient-to-r from-fibem-warning/10 to-fibem-warning/5 rounded-lg border border-fibem-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-fibem-warning" />
                  <p className="font-medium text-fibem-dark">Essai gratuit activé</p>
                </div>
                <p className="text-sm text-fibem-textSecondary">
                  Aucun paiement requis aujourd'hui. Vous ne serez facturé qu'après la période d'essai de 14 jours.
                </p>
              </div>
            )}

            {/* Messages d'état */}
            {paymentSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Paiement réussi !</p>
                    <p className="text-sm text-green-700 mt-1">
                      Votre compte est en cours de création...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Erreur de paiement</p>
                    <p className="text-sm text-red-700 mt-1">{paymentError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Boutons */}
            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || loading || paymentSuccess || (!useTrial && paymentMethod === 'card' && !isCardValid()) || (!useTrial && paymentMethod === 'mobile' && !isMobileValid())}
                className="w-full py-3 bg-gradient-to-r from-fibem-primary to-fibem-secondary hover:from-fibem-dark hover:to-fibem-primary text-white font-semibold"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement en cours...
                  </div>
                ) : paymentSuccess ? (
                  <div className="flex items-center justify-center gap-2" onClick={() => window.location.href = '/login'}>
                    <CheckCircle className="w-5 h-5" />
                    Réussi !
                  </div>
                ) : useTrial ? (
                  'Commencer la période d\'essai'
                ) : (
                  `Payer ${formatCurrency(calculateTotal())}`
                )}
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                disabled={isProcessing || loading || paymentSuccess}
                className="w-full border-fibem-border hover:border-fibem-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              
              <p className="text-xs text-center text-fibem-textSecondary pt-4 border-t border-fibem-border/20">
                En cliquant sur "Payer", vous acceptez les conditions de service et la politique de confidentialité.
              </p>
            </div>

            {/* Sécurité */}
            <div className="mt-6 pt-6 border-t border-fibem-border/20">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-fibem-primary" />
                  </div>
                  <p className="text-xs text-fibem-textSecondary">Paiement sécurisé</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-5 h-5 text-fibem-secondary" />
                  </div>
                  <p className="text-xs text-fibem-textSecondary">Chiffrement SSL</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-fibem-success" />
                  </div>
                  <p className="text-xs text-fibem-textSecondary">Garantie satisfait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations légales */}
      <div className="bg-fibem-surface rounded-xl p-6">
        <h4 className="font-bold text-fibem-dark mb-3">
          Informations importantes
        </h4>
        <ul className="space-y-2 text-sm text-fibem-textSecondary">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-fibem-success mt-0.5 shrink-0" />
            <span>Vous pouvez annuler votre abonnement à tout moment sans frais.</span>
          </li>
          {useTrial && (
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-fibem-success mt-0.5 shrink-0" />
              <span>La période d'essai de 14 jours ne nécessite pas de carte bancaire.</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-fibem-success mt-0.5 shrink-0" />
            <span>Vous recevrez une facture par email après chaque paiement.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-fibem-success mt-0.5 shrink-0" />
            <span>Support client disponible 7j/7 par email et téléphone.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}