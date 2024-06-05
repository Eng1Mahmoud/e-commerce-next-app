import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const GET = async (req: any) => {
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا", status: 403 });
  }
  
  try {
    await connectDb();
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error get user", error }, { status: 500 });
  }
};
