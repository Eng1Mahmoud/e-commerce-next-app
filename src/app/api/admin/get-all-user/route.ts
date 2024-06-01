import { verifyToken } from "./../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";

export const GET = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  try {
    await connectDb();
    if (role === "admin") {
      // Exclude admin and don't select password
      const users = await Users.find({ role: { $ne: 'admin' } }, { password: 0 });
      if (!users || users.length === 0) {
        return Response.json({ message: "not user found", users: [] });
      } else {
        return Response.json({ message: "success return users", users });
      }
    } else {
      return Response.json(
        { message: "you are not an admin, login with an admin account" },
        { status: 403 }
      );
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};