// useStore.jsx (Zustand store file)
import { create } from 'zustand';

const useStore = create((set) => ({
  updateFlag: 0,
  triggerUpdate: () => set((state) => ({ updateFlag: state.updateFlag + 1 })),
}));

export default useStore; // Default export
