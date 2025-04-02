import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    }catch(error){
        console.log("Error when connect DB", error);
        process.exit(1); //1 is failure, 0 is success
    }
}