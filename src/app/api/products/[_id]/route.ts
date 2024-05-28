import { Product } from "@/lib/models/product";
import { connectDb } from "@/lib/conectDb";
export const GET = async (req:any,{ params }: { params: any }) => {
 const {_id} = params;
 try {
    connectDb();
    const product = await Product.findById(params._id);
    if (product) {
      return Response.json({ product });
    } else {
      return Response.json({ message: "Product not found" }, { status: 400 });
    }
  } catch (err) {

    return Response.json({ message: "something went wrong" });
  }

};
