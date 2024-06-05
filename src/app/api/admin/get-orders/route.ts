import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Order } from "@/lib/models/Order";

export const POST = async (req: any) => {
  const { status } = await req.json();
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  try {
    await connectDb();
    const orders = await Order.find({ status }).populate("userId", {
      password: 0,
    });

    if (!orders || orders.length === 0) {
      return Response.json({ message: "لا يوجد طلبات", orders: [] });
    } else {
      return Response.json({ message: "تم ارجاع الطلبات بنجاح", orders });
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
