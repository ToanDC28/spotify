import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

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
  const formatDate = (date:Date) => new Date(date).toLocaleString("en-US", {hour:"numeric", minute:"numeric"});
  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />

      <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
        <UsersList />
        { /* chat message */ }
        <div className="flex flex-col h-full">
          {
            selectedUser ? (
              <>
                <ChatHeader />

                {/* messages */}
                <ScrollArea className="h-[calc(100vh-360px)]">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message._id} 
                      className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}>
                        <Avatar className="size-8">
                          <AvatarImage src={message.senderId === user?.id ? user.imageUrl : selectedUser.imageUrl} />
                        </Avatar>
                        <div className={`rounded-lg p-3 max-w-[70%]
                          ${message.senderId === user?.id ? "bg-green-700" : "bg-zinc-800"}
                          `}>
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-zinc-300 mt-1 block">
                              {formatDate(message.createdAt)}
                            </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <MessageInput />
              </>
            ) : (
              <NoConversation />
            )}
        </div>
      </div>
    </main>
  )
}

const NoConversation = () => (
  <div className="flex flex-col justify-center items-center h-full space-y-6">
    <img src="/spotify.png" alt="spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-lg font-medium mb-1 text-zinc-300">No Conversation</h3>
      <p className="text-zinc-500 text-sm">Select a user to start a conversation</p>
    </div>
  </div>
);