// store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      adminInfo: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('https://pl.pr.flashfund.in/auth/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
          }
          
          set({ 
            token: data.token,
            adminInfo: data.admin,
            isAuthenticated: true,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message || 'Authentication failed. Please try again.',
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },
      
      // Logout action
      logout: () => {
        set({ 
          token: null,
          adminInfo: null,
          isAuthenticated: false,
          error: null 
        });
      },
      
      // Get the authorization header for API requests
      getAuthHeader: () => {
        const { token } = get();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
      
      // Check if the token is still valid
      checkAuth: async () => {
        const { token } = get();
        
        if (!token) {
          set({ isAuthenticated: false });
          return false;
        }
        
        // You can implement token validation here by making a request to your API
        // For now, we'll just check if the token exists
        set({ isAuthenticated: !!token });
        return !!token;
      }
    }),
    {
      name: 'flashfund-admin-auth',
      partialize: (state) => ({ 
        token: state.token, 
        adminInfo: state.adminInfo,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;