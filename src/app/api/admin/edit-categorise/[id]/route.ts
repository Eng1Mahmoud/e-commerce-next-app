import { Categorise } from "../../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const PUT = async (req: any, { params }: { params: any }) => {
  const data = await req.json();
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);
  const id = params.id;
  try {
    await connectDb();
    if (role === "admin") {
      // check if categorise already exists
      const categorise = await Categorise.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (categorise) {
        return Response.json({ message: "تم تعديل الفئة بنجاح" });
      } else {
        return Response.json({ message: "الفئة غير موجودة" });
      }
    } else {
      return Response.json(
        { message: "هذه العملية غير مسموحة لك" },
        { status: 403 }
      );
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
