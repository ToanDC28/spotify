import { axiosInstance } from "@/lib/axios";
import { User } from "@/types";
import { create } from "zustand";

interface ChatStore {
    users: User[];
    fetchUser: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
  }

  export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUser: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axiosInstance.get("/users");
        const data = await response.data;
        set({ users: data });
      } catch (error:any) {
        set({ error: error.response.data.message });
        console.log("Error in fetchUser: ", error);
      } finally {
        set({ isLoading: false });
      }
    },
  }))