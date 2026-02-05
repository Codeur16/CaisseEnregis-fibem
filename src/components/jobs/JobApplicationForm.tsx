'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, CheckCircle2, FileUp } from 'lucide-react'
import { applyForJob } from '@/actions/jobs'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Validation schema
const applicationSchema = z.object({
  cv_file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Le CV est requis')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Le fichier CV ne doit pas dépasser 5MB')
    .refine(
      (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Seuls les fichiers PDF, DOC et DOCX sont acceptés'
    ),
  cover_letter_file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'La lettre de motivation est requise')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Le fichier ne doit pas dépasser 5MB')
    .refine(
      (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Seuls les fichiers PDF, DOC et DOCX sont acceptés'
    ),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

interface JobApplicationFormProps {
  jobId: number
  jobTitle: string
}

export default function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const { data: session } = useSession()
  const [success, setSuccess] = useState(false)

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      cv_file: undefined,
      cover_letter_file: undefined,
    },
  })

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: async (data: ApplicationFormValues) => {
      if (!session?.user?.access_token) {
        throw new Error('Vous devez être connecté pour postuler')
      }

      const formData = new FormData()
      formData.append('job_offer', jobId.toString())
      formData.append('cv_file', data.cv_file)
      formData.append('cover_letter', data.cover_letter_file)

      return applyForJob({
        data: formData,
        token: session.user.access_token,
      })
    },
    onSuccess: () => {
      setSuccess(true)
      toast.success('Candidature envoyée avec succès!')
      form.reset()
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Une erreur est survenue lors de l\'envoi de votre candidature.'
      toast.error(errorMessage)
      console.error(error)
    },
  })

  const onSubmit = (data: ApplicationFormValues) => {
    submitApplication(data)
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">Candidature envoyée !</h4>
        <p className="text-gray-600 mb-6">Votre candidature pour le poste de <strong>{jobTitle}</strong> a bien été transmise au recruteur.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-fibem-primary font-bold hover:underline"
        >
          Voir d'autres offres
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Postuler à cette offre</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* CV File Upload */}
          <FormField
            control={form.control}
            name="cv_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Télécharger votre CV *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fibem-primary focus:border-transparent outline-none transition-all cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                    />
                    <FileUp className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </FormControl>
                {field.value && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    ✓ {field.value.name}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Letter File Upload */}
          <FormField
            control={form.control}
            name="cover_letter_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Télécharger votre lettre de motivation *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fibem-primary focus:border-transparent outline-none transition-all cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                    />
                    <FileUp className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </FormControl>
                {field.value && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    ✓ {field.value.name}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-fibem-primary text-white rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer ma candidature
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  )
}
