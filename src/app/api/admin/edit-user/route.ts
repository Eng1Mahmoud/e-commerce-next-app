import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const POST = async (req: any) => {
  const data = await req.json();
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  try {
    await connectDb();
    // ge user by id
    const user = await Users.findOneAndUpdate({ _id: data.id }, data, {
      new: true,
    });
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود", user: {} });
    } else {
      return Response.json({ message: "تم تعديل البيانات بنجاح" });
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};
