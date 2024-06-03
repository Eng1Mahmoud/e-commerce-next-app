import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Order } from "@/lib/models/Order";

export const POST = async (req: any) => {
  const { id } = await req.json();
  const token = req.headers.get("authorization");
  const { role }: any = verifyToken(token);

  try {
    await connectDb();

    if (role === "admin") {
      const order = await Order.findOne({ _id: id }).populate("userId", {
        password: 0,
      });

      if (!order) {
        return Response.json({ message: "الطلب غير موجود", order: {} });
      } else {
        return Response.json({ message: "تم ارجاع الطلب بنجاح", order });
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
