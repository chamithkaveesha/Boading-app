import { create } from 'zustand';

const useStore = create((set) => ({
  object: {},
  setArray: (newArray) => set({ object: newArray }),
}));

export default useStore;
