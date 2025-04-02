import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });

    const userSocket = new Map(); // { userId: socketId }
    const userActivities = new Map(); // {userId: activityId}

    io.on("connection", (socket) => {
        socket.on("user_connected", async (userId) => {
            userSocket.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcast to all connected sockets that this user just logged in
            io.emit("user_connected", userId);

            socket.emit("users_online", Array.from(userSocket.keys()));

            io.emit("users_activities", Array.from(userActivities.entries()));
        })
        socket.on("update_activity", ({userId, activity}) => {
            console.log("activities updated", userId, activity);
            userActivities.set(userId, activity);
            io.emit("activities_updated", {userId, activity});
        })

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const message = await Message.create({ senderId, receiverId, content });

                // send to receiver online 
                const receiverSocketId = userSocket.get(receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive_message", message);
                }

                socket.emit("message_sent", message);
            } catch (error) {
                console.log("Error when send message", error);
                socket.emit("message_error", error.message);
            }
        })
        socket.on("disconnect", () => {
            const userId = Array.from(userSocket.entries()).find(([userId, socketId]) => socketId === socket.id)[0];
            userSocket.delete(userId);
            userActivities.delete(userId);
            io.emit("user_disconnected", userId);
            io.emit("users_online", Array.from(userSocket.keys()));
            io.emit("users_activities", Array.from(userActivities.entries()));
        })
    })
}