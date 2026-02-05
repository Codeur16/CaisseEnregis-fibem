import {create} from 'zustand';

type ServiceStore = {
    service?: Service;
    isOpen: boolean;
    onAdd: () => void;
    setService: (service: Service) => void;
    onOpen: () => void;
    onClose: () => void;
};

export const useServiceStore = create<ServiceStore>((set) => ({
    service: undefined,
    isOpen: false,
    setService: (service: Service) => set({service, isOpen: true}),
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false, service: undefined}),
    onAdd: () => set({isOpen: true})
}));