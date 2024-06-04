import { Categorise } from "../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  const { name, image } = await req.json();
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);

  try {
    await connectDb();
    if (role === "admin") {
      // check if categorise already exists
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
