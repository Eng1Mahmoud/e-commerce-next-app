import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Order } from "@/lib/models/Order";
export const POST = async (req: any) => {
  const { id,status } = await req.json();
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);

  try {
    await connectDb();
    if (role === "admin") {
      const orders = await Order.findOneAndUpdate({ _id:id }, { status: status })
      if (!orders || orders.length === 0) {
        return Response.json({ message: "لا يوجد طلبات", orders: [] });
      } else {
        return Response.json({ message: "تم تغيير حالة الطلب بنجاح", orders });
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
