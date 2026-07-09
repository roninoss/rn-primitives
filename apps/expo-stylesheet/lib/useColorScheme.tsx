import { Appearance } from 'react-native';
import { create } from 'zustand';

export function useColorScheme() {
  const colorScheme = useColorSchemeStore((state) => state.colorScheme);
  const setColorScheme = useColorSchemeStore((state) => state.setColorScheme);
  const toggleColorScheme = useColorSchemeStore((state) => state.toggleColorScheme);

  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
  };
}

interface IUseColorSchemeStore {
  colorScheme: 'light' | 'dark';
  setColorScheme: (colorScheme: 'light' | 'dark') => void;
  toggleColorScheme: () => void;
}

export const useColorSchemeStore = create<IUseColorSchemeStore>((set) => ({
  colorScheme: Appearance.getColorScheme() ?? 'dark',
  setColorScheme: (colorScheme) => set({ colorScheme }),
  toggleColorScheme: () =>
    set((state) => ({
      colorScheme: state.colorScheme === 'dark' ? 'light' : 'dark',
    })),
}));
