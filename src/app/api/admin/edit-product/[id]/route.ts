import { Products } from "@/lib/models/product";
import { Order } from "@/lib/models/Order";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any, { params }: { params: any }) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  const { id } = params;
  const data = await req.json();

  try {
    connectDb();

    const order = await Order.findOne({
      products: { $elemMatch: { productId: id } },
      status: { $in: ["جديده", "تحت التجهيز", "جاري التوصيل"] },
    });
    if (order) {
      return Response.json(
        { message: "لا يمكن تعديل الطلب لأنه مطلوب شراءه الان  " },
        { status: 400 }
      );
    } else {
      const product = await Products.findOneAndUpdate(
        { _id: id },
        { ...data },
        { new: true }
      );
      if (product) {
        return Response.json({ message: "تم تعديل المنتج بنجاح", product });
      } else {
        return Response.json({ message: "المنتج غير موجود" }, { status: 400 });
      }
    }
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
};
