import { verifyToken } from "@/lib/auth-helper/jwt";
import { connectDb } from "@/lib/conectDb";
import { Products } from "@/lib/models/product";
export const POST = async (req: any) => {
  const data = await req.json();
  const { name, description, price, category, images, amount, unit } = data;
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);
  try {
    connectDb();
    if (role === "admin") {
      const product = new Products({
        name,
        description,
        price,
        category,
        images,
        amount,
        unit,
      });
      await product.save();
      return Response.json({ message: "تم اضافة المنتج بنجاح" });
    } else {
      return Response.json(
        { message: "غير مصرح لك باضافة منتج" },
        { status: 403 }
      );
    }
  } catch (err) {
    return Response.json({ message: "Product not added" });
  }
};
