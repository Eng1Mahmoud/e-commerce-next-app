import { Products } from "@/lib/models/product";
import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  // get token from request
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" },{status: 403});
  }
  const data = await req.json();
  const { productId, action } = data;
  try {
    connectDb();
    const cart = await Cart.findOne({ userId: userId });
    // depending on the action, increase or decrease or delete it the quantity of the product in the cart
    // not check cart exist or not because it will be created when the user add the first product to the cart
    if (action === "increase") {
      for (const product of cart.products) {
        if (product.productId.toString() === productId) {
          product.quantity += 1;
          await cart.save();
          return Response.json({ message: "تم تحديث الكمية بنجاح" });
        }
      }
    } else if (action === "decrease") {
      for (const product of cart.products) {
        if (product.productId.toString() === productId) {
          if (product.quantity > 1) {
            product.quantity -= 1;
            await cart.save();
            return Response.json({ message: "تم تحديث الكمية بنجاح" });
          } else {
            return Response.json({
              message: "لا يمكن تقليل الكمية اقل من 1",
            });
          }
        }
      }
    } else if (action === "delete") {
      for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId.toString() === productId) {
          cart.products.splice(i, 1);
          await cart.save();
          return Response.json({ message: "تم حذف المنتج بنجاح" });
        }
      }
    }
    return Response.json({ message: "تم تحديث سلة التسوق" });
  } catch (error: any) {
    return Response.json(
      { message: "لم يتم اضافة المنتج", error },
      { status: 500 }
    );
  }
};
