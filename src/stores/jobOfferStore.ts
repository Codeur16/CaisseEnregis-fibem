import { create } from 'zustand';

type JobOfferStore = {
    jobOffer?: JobOffer | JobOfferCreate;
    isOpen: boolean;
    mode: 'create' | 'update';
    onAdd: () => void;
    setJobOffer: (jobOffer: JobOffer | JobOfferCreate, mode: 'create' | 'update') => void;
    onOpen: () => void;
    onClose: () => void;
    setMode: (mode: 'create' | 'update') => void;
};

export const useJobOfferStore = create<JobOfferStore>((set) => ({
    jobOffer: undefined,
    isOpen: false,
    mode: 'create',
    setJobOffer: (jobOffer: JobOffer | JobOfferCreate, mode: 'create' | 'update') => set({ jobOffer, isOpen: true, mode }),
    onOpen: () => set({ isOpen: true, mode: 'create' }),
    onClose: () => set({ isOpen: false, jobOffer: undefined, mode: 'create' }),
    onAdd: () => set({ isOpen: true, mode: 'create' }),
    setMode: (mode: 'create' | 'update') => set({ mode }),
}));