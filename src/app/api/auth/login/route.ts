import bcrept from "bcrypt";
import { connectDb } from "@/lib/conectDb";
import { User } from "@/lib/models/user";
import { createToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  const data = await req.json();

  const { email, password } = data;

  try {
    connectDb();
    const user = await User.findOne({ email: email }) as any;
    console.log(user);
    if (!user) {
        console.log("User not found")

      return Response.json({ message: "User not  found" }, );
    }
    const validPassword = await bcrept.compare(password, user.password);

    if (!validPassword) {
      return Response.json({ message: "Invalid password" }, { status: 400 });
    }
    const token = createToken(user._id);
    return Response.json({ token }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error logging in" }, { status: 500 });
  }
};