import bcrypt  from "bcrypt"
import { connectDb } from "@/lib/conectDb";
import { Users } from "@/lib/models/user";
import { createToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  const data = await req.json();

  const { email, password } = data;

  try {
    connectDb();
    const user = (await Users.findOne({ email: email })) as any;  
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return Response.json({ message: "كلمة المرور غير صحيحة" }, { status: 400 });
    }
    const token = createToken(user._id, user.role);
    // remove password from user object before sending to client
    const returnUser = user.toObject();
    delete returnUser.password;
    return Response.json({ token, user: returnUser }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "حدث خطا ما",error:error }, { status: 500 });
  }
};
