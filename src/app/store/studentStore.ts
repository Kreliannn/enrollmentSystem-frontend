import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getStudentInterface } from '../types/student.type';


interface StudentStore {
  student: getStudentInterface | null;
  setStudent: (Student: getStudentInterface) => void;
  clearStudent: () => void;
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      student: null,
      setStudent: (student) => set({ student }),
      clearStudent: () => set({ student: null }),
    }),
    {
      name: 'Student-storage', 
    }
  )
)
