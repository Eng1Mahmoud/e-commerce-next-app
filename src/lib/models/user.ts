import mongoose, { Model, Document } from "mongoose";

interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    _id: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

let User: Model<User>;

try {
    User = mongoose.model<User>("Users");
}
catch (error) {
    User = mongoose.model<User>("Users", userSchema);
}


export { User };