import React, { use, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdmin } = useAuthStore();
  const { initSocket, disconnectSocket, socket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdmin();
          // init socket
          if (userId) {
            initSocket(userId);
          }
          
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in AuthProvider: ", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    // clean up
    return () => {
      disconnectSocket();
    }
  }, [getToken, userId, checkAdmin, initSocket, disconnectSocket]);
  console.log("init socket success", socket.connected);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
