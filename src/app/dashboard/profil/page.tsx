'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {
    Loader2,
    User as UserIcon,
    Phone,
    MapPin,
    Building2,
    FileText,
    Save,
    CheckCircle2,
    Mail,
    Camera,
    ShieldCheck,
    Globe
} from 'lucide-react'
import { getUserProfile } from '@/actions/auth'
import { updateUser, updateProfile, updateCandidateProfile, updateCompanyProfile } from '@/actions/users'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function ProfilePage() {
    const { data: session } = useSession()
    const queryClient = useQueryClient()
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    console.log("Session in ProfilePage:", session)
    // Fetch user profile using react-query
    const { data: user, isLoading, isError, refetch } = useQuery({
        queryKey: ['userProfile', session?.user?.access_token],
        queryFn: () => {
            if (!session?.accessToken) {
                throw new Error('No access token available')
            }
            return getUserProfile(session?.accessToken!)
        },
        enabled: !!session?.accessToken,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    // Mutation for updating user profile
    const updateProfileMutation = useMutation({
        mutationFn: async ({ formData, token }: { formData: FormData; token: string }) => {
            if (!user) throw new Error('User data not available')
            if (!token) throw new Error('Access token not available')

            const userData = {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                phone: formData.get('phone') as string,
            }

            await updateUser(user.id, userData, token)

            if (user.profile) {
                await updateProfile(user.profile.id, {
                    address: formData.get('address') as string,
                    city: formData.get('city') as string,
                }, token)
            }

            if (user.candidate_profile) {
                await updateCandidateProfile(user.candidate_profile.id, {
                    title: formData.get('title') as string,
                    bio: formData.get('bio') as string,
                }, token)
            }

            if (user.company_profile) {
                await updateCompanyProfile(user.company_profile.id, {
                    company_name: formData.get('company_name') as string,
                    siret: formData.get('siret') as string,
                    website: formData.get('website') as string,
                    description: formData.get('description') as string,
                }, token)
            }
        },
        onSuccess: () => {
            toast.success('Votre profil a été mis à jour avec succès !')
            queryClient.invalidateQueries({ queryKey: ['userProfile'] })
        },
        onError: (error) => {
            toast.error('Une erreur est survenue lors de la mise à jour.')
            console.error('Error updating profile:', error)
        },
        onSettled: () => {
            setSaving(false)
        }
    })

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return
        if (!session?.accessToken) {
            toast.error('Vous devez être connecté pour mettre à jour votre profil')
            return
        }
        setSaving(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        updateProfileMutation.mutate({ formData, token: session.accessToken })
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de votre profil...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 font-medium">Erreur de chargement du profil</p>
                <Button onClick={() => refetch()} className="mt-4">
                    Réessayer
                </Button>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 font-medium">Aucun utilisateur connecté</p>
                <Button asChild className="mt-4">
                    <a href="/connexion">Se connecter</a>
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <form onSubmit={handleUpdateUser} className="space-y-8">
                <Card className="border-none shadow-sm overflow-hidden bg-white">
                    <div className="h-32 bg-fibem-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        <div className="absolute -bottom-12 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    </div>
                    <CardContent className="relative pt-0 px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 mb-8">
                            <div className="relative">
                                <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl">
                                    <div className="w-full h-full bg-blue-50 text-fibem-primary rounded-2xl flex items-center justify-center text-4xl font-black border-2 border-white">
                                        {user.first_name[0]}{user.last_name[0]}
                                    </div>
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-fibem-primary text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 pb-2 text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h1 className="text-3xl font-black text-gray-900">{user.first_name} {user.last_name}</h1>
                                    <Badge variant="outline" className="h-6 gap-1.5 px-3 bg-green-50 text-green-700 border-green-100">
                                        <ShieldCheck className="w-3 h-3" />
                                        Vérifié
                                    </Badge>
                                </div>
                                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                    <span className="hidden md:inline text-gray-200">|</span>
                                    <Badge variant="secondary" className="text-[10px] font-bold uppercase">{user.role}</Badge>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 pb-2">
                                <Button type="submit" disabled={saving} className="h-11 px-8 rounded-xl bg-fibem-primary hover:bg-fibem-primary/95 font-bold shadow-md">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Enregistrer
                                </Button>
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 mb-8 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5" />}
                                <span className="font-bold text-sm tracking-tight">{message.text}</span>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                                    <UserIcon className="w-4 h-4 text-fibem-primary" />
                                    <h3 className="font-bold text-gray-900">Infos Personnelles</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="first_name">Prénom</Label>
                                        <Input id="first_name" name="first_name" defaultValue={user.first_name} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="last_name">Nom</Label>
                                        <Input id="last_name" name="last_name" defaultValue={user.last_name} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" name="phone" defaultValue={user.phone} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                                    <MapPin className="w-4 h-4 text-fibem-primary" />
                                    <h3 className="font-bold text-gray-900">Localisation</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="city">Ville</Label>
                                        <Input id="city" name="city" defaultValue={user.profile?.city} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="address">Adresse</Label>
                                        <Input id="address" name="address" defaultValue={user.profile?.address} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user.role === 'CANDIDAT' && user.candidate_profile && (
                            <div className="mt-12 space-y-6 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                                    <FileText className="w-4 h-4 text-fibem-primary" />
                                    <h3 className="font-bold text-gray-900">Profil Professionnel</h3>
                                </div>
                                <div className="grid gap-6">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="title">Titre du profil</Label>
                                        <Input id="title" name="title" defaultValue={user.candidate_profile.title} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="bio">Bio / Présentation</Label>
                                        <Textarea id="bio" name="bio" defaultValue={user.candidate_profile.bio} rows={5} className="rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(user.role === 'PROFESSIONNEL' || user.role === 'RECRUTEUR') && user.company_profile && (
                            <div className="mt-12 space-y-6 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                                    <Building2 className="w-4 h-4 text-fibem-primary" />
                                    <h3 className="font-bold text-gray-900">Activité Entreprise</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="company_name">Nom Entreprise</Label>
                                        <Input id="company_name" name="company_name" defaultValue={user.company_profile.company_name} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="siret">SIRET</Label>
                                        <Input id="siret" name="siret" defaultValue={user.company_profile.siret} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="md:col-span-2 grid gap-1.5">
                                        <Label htmlFor="website">Site Web</Label>
                                        <Input id="website" name="website" defaultValue={user.company_profile.website} className="h-11 rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                    <div className="md:col-span-2 grid gap-1.5">
                                        <Label htmlFor="description">Description activité</Label>
                                        <Textarea id="description" name="description" defaultValue={user.company_profile.description} rows={5} className="rounded-xl bg-gray-50/30 border-gray-100" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
