import { Order } from "@/lib/models/Order";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
    const {OrderId} = await req.json();
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" },{status: 403});
  }
  try {
    await connectDb();
     // get order by  id orderid for user
    const order = await Order.findById(OrderId);
    if (!order) {
      return Response.json({ message: "لا يوجد طلبات" });
    }
    return Response.json({ order });
  } catch (error) {
    return Response.json({ error: "Unable to create order" }, { status: 500 });
  }
};
