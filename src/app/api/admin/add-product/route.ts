import { verifyToken } from "@/lib/auth-helper/jwt";
import { connectDb } from "@/lib/conectDb";
import { Products } from "@/lib/models/product";
export const POST = async (req: any) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  const data = await req.json();
  const { name, description, price, category, images, amount, unit } = data;

  try {
    connectDb();
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
  } catch (err) {
    return Response.json({ message: "Product not added" });
  }
};
