import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const POST = async (req: any) => {
  const { id } = await req.json();
  console.log(id);
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  try {
    await connectDb();
    if (role === "admin") {
      // ge user by id
      const user = await User.findById(id, { password: 0 });
      if (!user) {
        return Response.json({ message: "المستخدم غير موجود", user: {} });
      } else {
        return Response.json({ user });
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
