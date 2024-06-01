import { verifyToken } from "../../../../../lib/auth-helper/jwt";
import { User } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { Cart } from "@/lib/models/Cart";
import { Order } from "@/lib/models/Order";

export const DELETE = async (req: any, { params }: { params: any }) => {
  const id = params.id;
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user role
  const { role }: any = verifyToken(token);
  try {
    await connectDb();
    if (role === "admin") {
      // check if user haave any order is pending or not
      const user = await User.findById(id); // get user by id
      if (!user) {
        return Response.json({ message: "المستخدم غير موجود", user: {} });
      }

      const order = await Order.findOne({ userId: id, status: "pending" }); // if user have any pending order not delete it until complet it
      console.log(order);
      if (order) {
        
        return Response.json({
          message: "لا يمكن حذف المستخدم لديه طلب قيد التنفيذ",
        });
      }else{
          // delete user cart  before delete user
      await Cart.deleteOne({ user: id });
          // delete user by id
      await User.deleteOne({ _id: id });
      return Response.json({ message: "تم حذف المستخدم بنجاح" });
      }

    
    } else {
      return Response.json(
        { message: "هذه العملية غير مسموحة لك" },
        { status: 403 }
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
};
