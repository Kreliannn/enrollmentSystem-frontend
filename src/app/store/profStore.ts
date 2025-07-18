import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProfInterface } from '../types/prof.type';


interface ProfStore {
  prof: getProfInterface | null;
  setProf: (prof: getProfInterface) => void;
  clearProf: () => void;
}

export const useProfStore = create<ProfStore>()(
  persist(
    (set) => ({
      prof: null,
      setProf: (prof) => set({ prof }),
      clearProf: () => set({ prof: null }),
    }),
    {
      name: 'prof-storage', 
    }
  )
)
