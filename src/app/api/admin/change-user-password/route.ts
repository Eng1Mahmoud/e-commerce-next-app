import bcrypt from "bcrypt";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
export const POST = async (req: any) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  const data = await req.json();
  try {
    await connectDb();
    const user = await Users.findOne({ _id: data.id });
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
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};
