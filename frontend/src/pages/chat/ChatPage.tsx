import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";

export const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUser, fetchMessages} = useChatStore();

  useEffect(() => {
    if(user) fetchUser();

  }, [fetchUser, user]);

  useEffect(() => {
    if(selectedUser)
      fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);
  
  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />

      <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
        <UsersList />
      </div>
    </main>
  )
}
