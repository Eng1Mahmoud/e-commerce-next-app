import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const PUT = async (req: any) => {
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" },{status: 403});
  }
  const data = await req.json();

  try {
    await connectDb();
    const user = await Users.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود او تم حذفه" }, { status: 403 });
    }

    return Response.json({ message: "تم تحديث بيانات الحساب بنجاج" });
  } catch (error) {
    return Response.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
};
