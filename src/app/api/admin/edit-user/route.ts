import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const POST = async (req: any) => {
  const data = await req.json();
  console.log(data);
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  try {
    await connectDb();
    if (role === "admin") {
      // ge user by id
      const user = await User.findOneAndUpdate({ _id: data.id }, data, { new: true });
        if (!user) {
            return Response.json({ message: "المستخدم غير موجود", user: {} });
        } else {
            return Response.json({  message: "تم تعديل البيانات بنجاح"});
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
