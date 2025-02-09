import { create } from 'zustand';

const useStore = create((set) => ({
  object: {},
  setObject: (newObject) => set({ object: newObject }),
}));

export default useStore;
