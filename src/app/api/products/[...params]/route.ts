import { connectDb } from "@/lib/conectDb";
import { Product } from "@/lib/models/product";

export const GET = async (req: any, { params }: { params: any }) => {
  const Categorie = params.params[0];
  const page = params.params[1];
  const limit = params.params[2];

  try {
    connectDb();
    const startIndex = (page - 1) * limit;
    const products = await Product.find({ category: Categorie })
      .limit(limit)
      .skip(startIndex);
      if (products.length === 0 ) {
        // return status code 404 if product not found
        return Response.json({ message: "Product not found",products });
      }else{
        return Response.json({ products});
      
      }
   
  } catch (err) {
    return Response.json({ message: "Product not found" });
  }
};