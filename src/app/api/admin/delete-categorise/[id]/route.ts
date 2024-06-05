import { Categorise } from "../../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any, { params }: { params: any }) => {
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);
  const id = params.id;
  try {
    await connectDb();
    if (role === "admin") {
      // check if categorise already exists
      const categorise = await Categorise.findOneAndDelete({ _id: id});
      if (categorise) {
        return Response.json({ message: "تم حذف الفئة بنجاح" });
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
