import { verifyToken } from "../../../../../lib/auth-helper/jwt";
import { Users } from "@/lib/models/user";
import { connectDb } from "@/lib/conectDb";
import { Cart } from "@/lib/models/Cart";
import { Order } from "@/lib/models/Order";

export const DELETE = async (req: any, { params }: { params: any }) => {
  const id = params.id;
  const { role }: any = verifyToken(req);
  if (role !== "admin") {
    return Response.json({ message: " انت غير مسئول في النظام", status: 403 });
  }
  try {
    await connectDb();

    // check if user haave any order is pending or not
    const user = await Users.findById(id); // get user by id
    if (!user) {
      return Response.json({ message: "المستخدم غير موجود", user: {} });
    }
    const order = await Order.findOne({ userId: id, status: "pending" }); // if user have any pending order not delete it until complet it
    if (order) {
      return Response.json({
        message: "لا يمكن حذف المستخدم لديه طلب قيد التنفيذ",
      });
    } else {
      // delete user cart  before delete user
      await Cart.deleteOne({ user: id });
      // delete user by id
      await Users.deleteOne({ _id: id });
      return Response.json({ message: "تم حذف المستخدم بنجاح" });
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
};
