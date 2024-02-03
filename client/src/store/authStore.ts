// stores/authStore.ts

import { create } from 'zustand';

interface AuthState {
   email: string;
   isLoggedIn: boolean;
   accessToken: string | null;
   refreshToken: string | null;
   login: (email: string, accessToken: string, refreshToken: string) => void;
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
      refreshToken: storedAuthState.refreshToken || null,
      login: (email, accessToken, refreshToken) => {
         set((state: AuthState) => ({
            ...state,
            email,
            accessToken,
            refreshToken,
            isLoggedIn: true,
         }));
         // Store authentication state in local storage
         localStorage.setItem(
            'authState',
            JSON.stringify({
               email,
               accessToken,
               refreshToken,
               isLoggedIn: true,
            })
         );
      },
      logout: () => {
         // set((state: AuthState) => ({
         //    ...state,
         //    email: '',
         //    accessToken: null,
         //    refreshToken: null,
         //    isLoggedIn: false,
         // }));
         // Remove authentication state from local storage
         localStorage.removeItem('authState');
      },
   };
});
