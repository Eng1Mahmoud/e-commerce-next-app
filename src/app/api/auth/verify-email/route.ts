import jwt from "jsonwebtoken";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
export const POST = async (req: any) => {
  const data = await req.json();
  try {
    const decoded = jwt.verify(data?.token, process.env.JWT_SECRET as string);
    const { email }: any = decoded;
    await connectDb();
       if(email){ // check if token valid 
        const user = await Users.findOne({ email });
    // check if user already exists and verified
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود" }, { status: 400 });
    } else {
      if (user.verified) {
        return Response.json(
          { message: "تم تفعيل الحساب من قبل" },
          { status: 400 }
        );
      } else {
        await Users.updateOne({ email }, { verified: true });
        return Response.json(
          { message: "تم تفعيل الحساب بنجاح" },
          { status: 200 }
        );
      }
    }
       }else{
        return Response.json({message:"لقد انتهت صلاحية الرابط حاول التسجيل مرة اخري"},{status:400})
       }
  } catch (error) {
    return Response.json({ message: "حدث خطا ما", error });
  }
};
