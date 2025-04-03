import { axiosInstance } from "@/lib/axios";
import { Message, User } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";
interface ChatStore {
  users: User[];
  fetchUser: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser:User | null;
  setSelectedUser:(user:User) => void;
  fetchMessages: (userId: string) => Promise<void>;
  initSocket: (userID: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
}
const url = "http://localhost:5000";
const socket = io(url, {
  autoConnect: false, // only connect when user is authenticated
  withCredentials: true,
});
export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set<string>(),
  userActivities: new Map<string, string>(),
  messages: [],
  selectedUser: null,
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      const data = await response.data;
      set({ users: data });
    } catch (error: any) {
      set({ error: error.response.data.message });
      console.log("Error in fetchUser: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  initSocket: (userID: string) => {
    if (!get().isConnected) {
      socket.auth = { userID };
      socket.connect();
      socket.emit("user_connected", userID);
      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("users_activities", (userActivities: [string, string][]) => {
        set({ userActivities: new Map(userActivities) });
      });

      socket.on("user_connected", (userId:string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }))
      })

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
      socket.on(
        "activities_updated",
        ({ userId, activity }: { userId: string; activity: string }) => {
          set((state) => ({
            userActivities: new Map(state.userActivities.set(userId, activity)),
          }));
        }
      );
      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: (senderId: string, receiverId: string, content: string) => {
    const socket = get().socket;
    if(!socket) return;

    socket.emit("send_message", { senderId, receiverId, content });
  },
  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/users/message/${userId}`);
      const data = await res.data;
      set({ messages: data });
    } catch (error:any) {
      set({ error: error.response.data.message });
      console.log("Error in fetchMessages: ", error);
    }finally{
      set({ isLoading: false });
    }
  },
  setSelectedUser:(user:User) => {
    set({selectedUser:user})
  },
}));
