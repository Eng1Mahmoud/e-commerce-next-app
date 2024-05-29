import bcrypt  from "bcrypt"
import { connectDb } from "@/lib/conectDb";
import { User } from "@/lib/models/user";
import { createToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  const data = await req.json();

  const { email, password } = data;

  try {
    connectDb();
    const user = (await User.findOne({ email: email })) as any;  
    if (!user) {
      return Response.json({ message: "User not  found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return Response.json({ message: "Invalid password" }, { status: 400 });
    }
    const token = createToken(user._id, user.role);
    // remove password from user object before sending to client
    const returnUser = user.toObject();
    delete returnUser.password;
    return Response.json({ token, user: returnUser }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error logging in",error:error }, { status: 500 });
  }
};
