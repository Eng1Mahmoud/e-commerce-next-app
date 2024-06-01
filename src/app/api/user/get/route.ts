import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const GET = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
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
