// stores/authStore.ts

import { create } from 'zustand';

interface AuthState {
   email: string;
   isLoggedIn: boolean;
   accessToken: string | null;
   login: (email: string, accessToken: string) => void;
   logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
   // Retrieve authentication state from local storage on initial load
   const storedAuthState = JSON.parse(
      localStorage.getItem('authState') || '{}'
   );

   return {
      email: storedAuthState.email || '',
      isLoggedIn: storedAuthState.isLoggedIn || false,
      accessToken: storedAuthState.accessToken || null,
      login: (email, accessToken) => {
         set((state: AuthState) => ({
            ...state,
            email,
            accessToken,
            isLoggedIn: true,
         }));
         // Store authentication state in local storage
         localStorage.setItem(
            'authState',
            JSON.stringify({ email, accessToken, isLoggedIn: true })
         );
      },
      logout: () => {
         set((state: AuthState) => ({
            ...state,
            email: '',
            accessToken: null,
            isLoggedIn: false,
         }));
         // Remove authentication state from local storage
         localStorage.removeItem('authState');
      },
   };
});
