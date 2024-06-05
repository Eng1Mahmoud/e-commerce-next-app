import { Categorise } from "../../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any, { params }: { params: any }) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  const id = params.id;

  try {
    await connectDb();

    const categorise = await Categorise.findOneAndDelete({ _id: id });
    if (categorise) {
      return Response.json({ message: "تم حذف الفئة بنجاح" });
    } else {
      return Response.json({ message: "الفئة غير موجودة" });
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
