import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Order } from "@/lib/models/Order";
export const POST = async (req: any) => {
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام" },{status: 403});
  }
  const { id, status } = await req.json();
  try {
    await connectDb();

    const orders = await Order.findOneAndUpdate(
      { _id: id },
      { status: status }
    );
    if (!orders || orders.length === 0) {
      return Response.json({ message: "لا يوجد طلبات", orders: [] });
    } else {
      return Response.json({ message: "تم تغيير حالة الطلب بنجاح", orders });
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
