"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createJobOffer, updateJobOffer } from "@/actions/jobs";
import { useSession } from "next-auth/react";
import { useJobOfferStore } from "@/stores/jobOfferStore";

// Define the form schema based on JobOfferCreate interface
const jobOfferSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  contract_type: z.enum(["CDI", "CDD", "STAGE", "FREELANCE", "INTERIM"]),
  location: z.string().min(1, { message: "L'emplacement est requis" }),
  salary_range: z.string().min(1, { message: "La fourchette salariale est requise" }),
  company_name: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  num_of_place: z.number().min(1, { message: "Le nombre de places doit être au moins 1" }),
  is_active: z.boolean(),
});

type JobOfferFormValues = z.infer<typeof jobOfferSchema>;

const JobOfferModal: React.FC = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { isOpen, onClose, jobOffer, mode } = useJobOfferStore();

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<JobOfferFormValues>({
    resolver: zodResolver(jobOfferSchema),
    defaultValues: {
      title: "",
      description: "",
      contract_type: "CDI",
      location: "",
      salary_range: "",
      company_name: "",
      num_of_place: 1,
      is_active: true,
    },
  });

  // Set form values when jobOffer changes
  useEffect(() => {
    if (jobOffer) {
      form.reset({
        title: jobOffer.title || '',
        description: jobOffer.description || '',
        contract_type: ('contract_type' in jobOffer) ? jobOffer.contract_type || 'CDI' : 'CDI',
        location: jobOffer.location || '',
        salary_range: jobOffer.salary_range || '',
        company_name: jobOffer.company_name || '',
        num_of_place: ('num_of_place' in jobOffer) ? jobOffer.num_of_place || 1 : 1,
        is_active: jobOffer.is_active !== undefined ? jobOffer.is_active : true,
      });
    } else {
      // Reset form when no jobOffer is set
      form.reset({
        title: '',
        description: '',
        contract_type: 'CDI',
        location: '',
        salary_range: '',
        company_name: '',
        num_of_place: 1,
        is_active: true,
      });
    }
  }, [jobOffer, form]);

  // Define the mutation for creating a job offer
  const createMutation = useMutation({
    mutationFn: (data: JobOfferFormValues) => {
      if (!session?.user?.access_token) {
        throw new Error("User not authenticated");
      }
      return createJobOffer({ data, token: session.user.access_token });
    },
    onSuccess: () => {
      toast.success("Offre d'emploi créée avec succès!");
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
    },
    onError: (error: any) => {
      console.error("Error creating job offer:", error);
      let errorMessage = "Erreur lors de la création de l'offre d'emploi";
      
      try {
        const parsedError = typeof error.message === 'string' ? JSON.parse(error.message) : error;
        errorMessage = parsedError.detail || parsedError.message || JSON.stringify(parsedError);
      } catch {
        errorMessage = error?.message || errorMessage;
      }
      
      toast.error(errorMessage);
    },
  });

  // Define the mutation for updating a job offer
  const updateMutation = useMutation({
    mutationFn: (data: JobOfferFormValues) => {
      if (!session?.user?.access_token) {
        throw new Error("User not authenticated");
      }
      if (!jobOffer || !('id' in jobOffer) || typeof jobOffer.id !== 'number') {
        throw new Error("Invalid job offer for update");
      }
      return updateJobOffer({
        id: jobOffer.id,
        data,
        token: session.user.access_token
      });
    },
    onSuccess: () => {
      toast.success("Offre d'emploi mise à jour avec succès!");
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
    },
    onError: (error: any) => {
      console.error("Error updating job offer:", error);
      let errorMessage = "Erreur lors de la mise à jour de l'offre d'emploi";
      
      try {
        const parsedError = typeof error.message === 'string' ? JSON.parse(error.message) : error;
        errorMessage = parsedError.detail || parsedError.message || JSON.stringify(parsedError);
      } catch {
        errorMessage = error?.message || errorMessage;
      }
      
      toast.error(errorMessage);
    },
  });

  const onSubmit = (values: JobOfferFormValues) => {
    if (mode === 'update') {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  const modalTitle = mode === 'update' ? "Modifier l'offre d'emploi" : "Créer une nouvelle offre d'emploi";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Développeur Frontend" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location field */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emplacement *</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris, France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Name field */}
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'entreprise *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de votre entreprise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contract Type field */}
              <FormField
                control={form.control}
                name="contract_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de contrat *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de contrat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="STAGE">Stage</SelectItem>
                        <SelectItem value="FREELANCE">Freelance</SelectItem>
                        <SelectItem value="INTERIM">Intérim</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary Range field */}
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fourchette salariale *</FormLabel>
                    <FormControl>
                      <Input placeholder="30 000€ - 45 000€" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number of Places field */}
              <FormField
                control={form.control}
                name="num_of_place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de places *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Active Status field */}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Actif</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez les responsabilités et exigences du poste..."
                      className="min-h-30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending || status === 'loading'}
              >
                {(mode === 'update' && updateMutation.isPending) || (mode === 'create' && createMutation.isPending)
                  ? (mode === 'update' ? "Mise à jour en cours..." : "Création en cours...")
                  : status === 'loading'
                  ? "Chargement..."
                  : (mode === 'update' ? "Mettre à jour l'offre" : "Créer l'offre")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobOfferModal;