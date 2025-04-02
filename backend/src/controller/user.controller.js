import { Message } from "../models/message.model.js";
import {User} from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUser = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUser}}); // $ne = not equal
        res.status(200).json(users);
    } catch (error) {
        console.log("Error when get all users", error);
        next(error);
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const myId = req.auth.userId;
        const messages = await Message.find({ 
            $or: [{ 
                senderId: myId, 
                receiverId: userId 
            }, 
            { 
                senderId: userId, 
                receiverId: myId 
            }] 
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error when get message", error);
        next(error);
    }
}