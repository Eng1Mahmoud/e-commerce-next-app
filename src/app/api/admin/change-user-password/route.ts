import bcrypt from "bcrypt";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
export const POST = async (req: any) => {
  const data = await req.json();
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  try {
    await connectDb();
    if (role === "admin") {
      // ge user by id and update password only
      const user = await User.findOne({ _id: data.id });
      if (!user) {
        return Response.json({ message: "المستخدم غير موجود", user: {} });
      } else {
        // hash password before saving to database
        let saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        user.password = hashedPassword;
        await user.save();
        return Response.json({ message: "تم تعديل كلمة المرور بنجاح بنجاح" });
      }
    } else {
      return Response.json(
        { message: "هذه العملية غير مسموحة لك" },
        { status: 403 }
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
};
