import { create } from 'zustand';
import mongoose, { Model } from "mongoose";
import { IUser } from "@/types/user";

const userSchema = new mongoose.Schema<IUser>({

  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, required: true, default: "user" },
  verified: { type: Boolean, required:true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Users: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);

  export { Users };
