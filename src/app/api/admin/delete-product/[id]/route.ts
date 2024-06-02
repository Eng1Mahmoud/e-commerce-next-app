import { Products } from "@/lib/models/product";
import { Order } from "@/lib/models/Order";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const DELETE = async (req: any, { params }: { params: any }) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  const { id } = params;

  try {
    connectDb();
    if (role === "admin") {
      const order = await Order.findOne({
        products: { $elemMatch: { productId: id } },status: { $in: ["جديده", "تحت التجهيز", "جاري التوصيل"] }
      });
      if (order) {
        return Response.json(
          { message: "لا يمكن حذف المنتج الان لانه يوجد طلب به هذا المنتج" },
          { status: 400 }
        );
      } else {
        const product = await Products.findOneAndUpdate({ _id: id },{ isDeleted: true },{ new: true });
        if (product) {
          return Response.json({ message: "تم حذف المنتج بنجاح", product });
        } else {
          return Response.json(
            { message: "المنتج غير موجود" },
            { status: 400 }
          );
        }
      }
    } else {
      return Response.json(
        { message: "هذه العملية غير مسموحة لك" },
        { status: 403 }
      );
    }
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
};
