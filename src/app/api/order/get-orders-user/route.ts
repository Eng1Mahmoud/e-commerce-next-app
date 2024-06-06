import { Order } from "@/lib/models/Order";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const GET = async (req: any) => {
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" },{status: 403});
  }
  try {
    await connectDb();
     // get orders for user 
    const orders = await Order.find({ userId: userId });
    if (!orders) {
      return Response.json({ message: "لا يوجد طلبات" });
    }
    return Response.json({ orders });
    
  } catch (error) {
    return Response.json({ error: "Unable to create order" }, { status: 500 });
  }
};
