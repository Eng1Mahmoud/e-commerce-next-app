import mongoose, { Model } from "mongoose";
import { IUser } from "@/types/user";

const userSchema = new mongoose.Schema<IUser>({
    _id: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);

export { User };