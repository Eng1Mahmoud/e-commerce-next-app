import { verifyToken } from "./../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const GET = async (req: any) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  try {
    await connectDb();

    // Exclude admin and don't select password
    const users = await Users.find({ role: { $ne: "admin" } }, { password: 0 });
    if (!users || users.length === 0) {
      return Response.json({ message: "not user found", users: [] });
    } else {
      return Response.json({ message: "success return users", users });
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};
