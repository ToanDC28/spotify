import express from "express";
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv"
import userRoute from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statusRoutes from './routes/status.route.js'
import { connectDB } from "./lib/db.js";
import fileupload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()) // this will add auth to req obj => req.auth.userId
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // max size is 10MB
    }
}));
//this is api
app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/status", statusRoutes);

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ 
        message: process.env.MODE_ENV === "production" 
        ? "Internal server error" 
        : err.message 
    });
})

httpServer.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})

// todo: socket.io