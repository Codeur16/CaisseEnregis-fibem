'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { createServiceRequest } from '@/actions/services'

interface RequestQuoteModalProps {
    service: Service
    isOpen: boolean
    onClose: () => void
}

export default function RequestQuoteModal({ service, isOpen, onClose }: RequestQuoteModalProps) {
    const { data: session } = useSession();
    const [details, setDetails] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Prepare the data according to ServiceRequestCreate interface
            const requestData = {
                description: details, // Using details as description
                service: service.id
            };

            // Get the user's token from the session
            const token = session?.user?.token || session?.user?.accessToken || session?.user?.access_token || '';

            await createServiceRequest({
                data: requestData,
                token: token
            });
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setDetails('')
            }, 2000)
        } catch (err) {
            setError('Une erreur est survenue lors de l\'envoi de votre demande.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Demander un devis</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Demande envoyée !</h4>
                            <p className="text-gray-600">Le professionnel reviendra vers vous avec un devis personnalisé.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service sélectionné
                                </label>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-800">
                                    {service.name}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                                    Détails de votre besoin
                                </label>
                                <textarea
                                    id="details"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fibem-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Décrivez votre projet en quelques mots..."
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-fibem-primary text-white rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Envoyer ma demande
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
