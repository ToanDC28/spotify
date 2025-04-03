import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react"

const MessageInput = () => {
    const [ message, setMessage ] = useState("");
    const { user } = useUser();
    const { selectedUser, sendMessage } = useChatStore();
    if(!selectedUser) return null;
    if(!user) return null;

    const HandleSendMessage = () => {
        if(!message) return;
        sendMessage(user.id, selectedUser.clerkId, message.trim());
        setMessage("")
    }
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
        <div className="flex gap-2">
            <Input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && HandleSendMessage() } />
            <Button size={'icon'} onClick={HandleSendMessage} disabled={!message.trim()}>
                <Send />
            </Button>
        </div>
    </div>
  )
}

export default MessageInput