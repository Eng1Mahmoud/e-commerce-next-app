import { Products } from "@/lib/models/product";
import { Order } from "@/lib/models/Order";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const DELETE = async (req: any, { params }: { params: any }) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  const { id } = params;
  try {
    connectDb();
    const order = await Order.findOne({
      products: { $elemMatch: { productId: id } },
      status: { $in: ["جديده", "تحت التجهيز", "جاري التوصيل"] },
    });
    if (order) {
      return Response.json(
        { message: "لا يمكن حذف المنتج الان لانه يوجد طلب به هذا المنتج" },
        { status: 400 }
      );
    } else {
      const product = await Products.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true }
      );
      if (product) {
        return Response.json({ message: "تم حذف المنتج بنجاح", product });
      } else {
        return Response.json({ message: "المنتج غير موجود" }, { status: 400 });
      }
    }
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
};
