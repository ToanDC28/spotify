import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try{
        const { id, firstname, lastname, imageUrl } = req.body;
        //check if user existed

        const user = await User.findOne({clerkId: id});

        if(!user){
            // sign up
            await User.create({
                clerkId: id,
                fullname: `${firstname} ${lastname}`,
                imageUrl: imageUrl,

            })
        }

        res.status(200).json({success: true})
    }catch(error){
        console.log("Error in auth callback", error);
        next(error);
    }
}