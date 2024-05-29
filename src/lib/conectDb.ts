import mongoose from "mongoose";
const DB_CONNECTION = process.env.NEXT_PUBLIC_DB_CONECTION;
export const connectDb = async () => {
    try {
        if (DB_CONNECTION) {
            await mongoose.connect(DB_CONNECTION);
            console.log("DB Connected");
        } else {
            console.log("DB Connection string is undefined.");
        }
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
};
