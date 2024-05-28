import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const PUT = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
  const data = await req.json();
try {
    await connectDb();
    const user = await User.findOneAndUpdate({ _id: userId }, data, { new: true });
    if (!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "User updated successfully" });
} catch (error) {

    return Response.json(
        { message: "Error updating user", error },
        { status: 500 }
    );
}
};
