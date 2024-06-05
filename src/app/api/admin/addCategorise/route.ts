import { Categorise } from "../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  const { name, image } = await req.json();
  try {
    await connectDb();
      const categorise = await Categorise.findOne({ name });
      if (categorise) {
        return Response.json({ message: "التصنيف موجود بالفعل" });
      } else {
        // create categorise
        const categorise = new Categorise({
          name,
          image,
        });
        await categorise.save();
        return Response.json({ message: "تم اضافة التصنيف بنجاح" });
      }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
