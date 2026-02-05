'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, Building, Users, Target, CheckCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import Logo from '@/components/ui/Logo'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simuler un envoi API
    setTimeout(() => {
      console.log('Form data:', formData)
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-fibem-surface to-white">
      {/* Hero avec effet glass */}
      <div className="relative overflow-hidden bg-linear-to-br from-fibem-primary via-fibem-dark to-fibem-primary/90 py-20">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contactez-nous
              <span className="text-fibem-secondary">.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations de contact */}
          <div className="space-y-6">
            {/* Carte France */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-fibem-primary/10 rounded-full -translate-y-8 translate-x-8"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Logo size="icon" variant="card" alt="FIBEM" href={null} />
                    <div>
                      <h3 className="font-bold text-xl text-fibem-textPrimary">FIBEM France</h3>
                      <p className="text-sm text-fibem-muted">Siège social</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center group-hover/item:bg-fibem-primary/10 transition-colors">
                        <MapPin className="w-5 h-5 text-fibem-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Adresse</p>
                        <p className="text-fibem-textSecondary text-sm mt-1">
                          123 Avenue des Champs-Élysées<br />
                          75008 Paris, France
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center group-hover/item:bg-fibem-primary/10 transition-colors">
                        <Phone className="w-5 h-5 text-fibem-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Téléphone</p>
                        <a href="tel:+33123456789" className="text-fibem-textSecondary text-sm mt-1 hover:text-fibem-primary transition-colors">
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center group-hover/item:bg-fibem-primary/10 transition-colors">
                        <Mail className="w-5 h-5 text-fibem-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Email</p>
                        <a href="mailto:contact@senfibem.fr" className="text-fibem-textSecondary text-sm mt-1 hover:text-fibem-primary transition-colors">
                          contact@senfibem.fr
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center group-hover/item:bg-fibem-primary/10 transition-colors">
                        <Clock className="w-5 h-5 text-fibem-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Horaires</p>
                        <p className="text-fibem-textSecondary text-sm mt-1">
                          Lun - Ven : 9h - 18h<br />
                          Sam : 10h - 14h
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Carte Sénégal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-fibem-secondary/10 rounded-full -translate-y-8 translate-x-8"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Logo size="icon" variant="card" alt="FIBEM" href={null} />
                    <div>
                      <h3 className="font-bold text-xl text-fibem-textPrimary">FIBEM Sénégal</h3>
                      <p className="text-sm text-fibem-muted">Bureau régional</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-fibem-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Adresse</p>
                        <p className="text-fibem-textSecondary text-sm mt-1">
                          Avenue Cheikh Anta Diop<br />
                          Dakar, Sénégal
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-fibem-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Téléphone</p>
                        <a href="tel:+221771234567" className="text-fibem-textSecondary text-sm mt-1 hover:text-fibem-secondary transition-colors">
                          +221 77 123 45 67
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-fibem-surface rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-fibem-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-fibem-textPrimary">Email</p>
                        <a href="mailto:contact@senfibem.sn" className="text-fibem-textSecondary text-sm mt-1 hover:text-fibem-secondary transition-colors">
                          contact@senfibem.sn
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-linear-to-br from-fibem-primary/10 to-fibem-primary/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-fibem-primary">24h</div>
                <div className="text-sm text-fibem-textSecondary">Réponse moyenne</div>
              </div>
              <div className="bg-linear-to-br from-fibem-secondary/10 to-fibem-secondary/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-fibem-secondary">98%</div>
                <div className="text-sm text-fibem-textSecondary">Satisfaction client</div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-fibem-textPrimary mb-3">Message envoyé !</h3>
                      <p className="text-fibem-textSecondary mb-8 max-w-md mx-auto">
                        Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                      </p>
                      <Button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' })
                        }}
                        variant="outline"
                        className="border-fibem-primary text-fibem-primary hover:bg-fibem-primary/10"
                      >
                        Envoyer un autre message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-14 h-14 bg-linear-to-br from-fibem-primary to-fibem-dark rounded-xl flex items-center justify-center">
                          <Send className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="font-bold text-2xl text-fibem-textPrimary">Envoyez-nous un message</h2>
                          <p className="text-fibem-textSecondary">Nous vous répondrons dans les 24 heures.</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-fibem-textPrimary">
                              Nom complet *
                            </label>
                            <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Jean Dupont"
                              className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-fibem-textPrimary">
                              Téléphone
                            </label>
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+33 1 23 45 67 89"
                              className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-fibem-textPrimary">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="jean.dupont@email.com"
                            className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-fibem-textPrimary">
                            Type de demande
                          </label>
                          <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                            <SelectTrigger className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary">
                              <SelectValue placeholder="Type de demande" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Question générale</SelectItem>
                              <SelectItem value="service">Demande de service</SelectItem>
                              <SelectItem value="job">Candidature spontanée</SelectItem>
                              <SelectItem value="partnership">Proposition de partenariat</SelectItem>
                              <SelectItem value="complaint">Réclamation</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-fibem-textPrimary">
                            Sujet *
                          </label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Sujet"
                            className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-fibem-textPrimary">
                            Message *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            placeholder="Message"
                            className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3 bg-linear-to-r from-fibem-primary to-fibem-dark hover:from-fibem-primary/90 hover:to-fibem-dark/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Envoi en cours...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Send className="w-5 h-5" />
                              Envoyer
                            </div>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ rapide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid md:grid-cols-3 gap-4"
            >
              <div className="bg-linear-to-br from-fibem-surface to-white border border-fibem-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-fibem-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-fibem-primary" />
                  </div>
                  <h4 className="font-semibold text-fibem-textPrimary">Horaires</h4>
                </div>
                <p className="text-sm text-fibem-textSecondary">
                  Lundi - Vendredi : 9h-18h<br />
                  Samedi : 10h-14h
                </p>
              </div>
              
              <div className="bg-linear-to-br from-fibem-surface to-white border border-fibem-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-fibem-secondary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-fibem-secondary" />
                  </div>
                  <h4 className="font-semibold text-fibem-textPrimary">Support</h4>
                </div>
                <p className="text-sm text-fibem-textSecondary">
                  Assistance technique<br />
                  Support client dédié
                </p>
              </div>
              
              <div className="bg-linear-to-br from-fibem-surface to-white border border-fibem-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-fibem-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-fibem-accent" />
                  </div>
                  <h4 className="font-semibold text-fibem-textPrimary">Équipe</h4>
                </div>
                <p className="text-sm text-fibem-textSecondary">
                  Experts à votre service<br />
                  Réponse rapide garantie
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="bg-linear-to-r from-fibem-dark to-fibem-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
           
            <h3 className="text-3xl font-bold">Prêt à transformer votre projet ?</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Rejoignez des milliers de professionnels qui font confiance à FIBEM
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button size="lg" className="bg-white text-fibem-primary hover:bg-gray-100">
                Découvrir nos services
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Voir les témoignages
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}




