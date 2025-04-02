import { axiosInstance } from '@/lib/axios';
import { User } from '@/types'
import { create } from 'zustand'

interface AuthStore {
    user: User;
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;

    checkAdmin: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: {} as User,
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdmin: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/check");
            const data = await response.data;
            set({ isAdmin: data.isAdmin });
        } catch (error: any) {
            set({ error: error.response.data.message });
            console.log("Error in checkAdmin: ", error);
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => set({ isAdmin: false, isLoading: false, error: null }),
}))