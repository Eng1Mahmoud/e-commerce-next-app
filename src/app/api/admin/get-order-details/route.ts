import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Order } from "@/lib/models/Order";

export const POST = async (req: any) => {
  const { id } = await req.json();
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  try {
    await connectDb();
    const order = await Order.findOne({ _id: id }).populate("userId", {
      password: 0,
    });

    if (!order) {
      return Response.json({ message: "الطلب غير موجود", order: {} });
    } else {
      return Response.json({ message: "تم ارجاع الطلب بنجاح", order });
    }
  } catch (err) {
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
