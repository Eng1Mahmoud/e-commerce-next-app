import mongoose, { Model, Document } from "mongoose";
import { IUser } from "@/types/user";

const userSchema = new mongoose.Schema<IUser>({
    _id: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

let User: Model<IUser>;

try {
    User = mongoose.model<IUser>("Users");
}
catch (error) {
    User = mongoose.model<IUser>("Users", userSchema);
}


export { User };