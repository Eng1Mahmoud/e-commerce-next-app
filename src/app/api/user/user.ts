import mongoose from "mongoose";
import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const GET = async (req:any) => {
    // get token from request
    const token = req.headers.authorization;
    console.log(token);
    try{
      connectDb();
        
       const user = verifyToken(token);
    }
    catch(err){
        return err;
    }

};