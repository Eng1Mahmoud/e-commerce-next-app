import { Categorise } from "../../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const PUT = async (req: any, { params }: { params: any }) => {
  const data = await req.json();
  const id = params.id;
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  try {
    await connectDb();
    // check if categorise already exists
    const categorise = await Categorise.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (categorise) {
      return Response.json({ message: "تم تعديل الفئة بنجاح" });
    } else {
      return Response.json({ message: "الفئة غير موجودة" });
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
