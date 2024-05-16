
import { connectDb } from "@/lib/conectDb";
import { User } from "@/lib/models/user";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
const MAX_AGE = 60 * 60 * 24 ; // days;
export const signInWithGoogle = async ({user}:{
    user:{
        name:string,
        email:string,
        id:string,
        image:string,
    },
  
}) => {
     console.log(user)
    try {
        connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return true;
        }
        await User.create({
            name: user.name,
            email: user.email,
            password: user.id,
        });



    }
    catch (error) {
        console.log(error);
    }

};