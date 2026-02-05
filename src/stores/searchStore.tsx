import { create } from "zustand"

interface SearchStore {
    search: string
    open: boolean
    setOpen: (open: boolean) => void
    setSearch: (search: string) => void
    close: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    search: '',
    open: false,
    setOpen: (open: boolean) => set({ open }),
    setSearch: (search: string) => set({ search }),
    close: () => set({ open: false }),
}))
