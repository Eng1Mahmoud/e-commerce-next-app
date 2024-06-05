import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const POST = async (req: any) => {
  const { id } = await req.json();
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  try {
    await connectDb();
    const user = await Users.findById(id, { password: 0 });
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود", user: {} });
    } else {
      return Response.json({ user });
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};
