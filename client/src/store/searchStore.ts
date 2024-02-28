import { create } from 'zustand';

type State = {
   searchQuery: string;
};

type Action = {
   updateSearchQuery: (searchQuery: State['searchQuery']) => void;
};

const useSearchStore = create<State & Action>((set) => ({
   searchQuery: '',
   updateSearchQuery: (searchQuery) =>
      set(() => ({ searchQuery: searchQuery })),
}));

export default useSearchStore;
