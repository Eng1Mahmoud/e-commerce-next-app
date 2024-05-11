"use server";
import { connectDb } from "@/lib/conectDb";
import { Product } from "@/lib/models/product";

export const GET = async (req: any, { params }: { params: any }) => {
  console.log("params: ", params.params);
  const Categorie = params.params[0];
  const page = params.params[1];
  const limit = params.params[2];

  try {
    connectDb();
    const startIndex = (page - 1) * limit;
    const products = await Product.find({ category: Categorie })
      .limit(limit)
      .skip(startIndex);
      console.log("products: ", products);
      if (products.length === 0 ) {
        // return status code 404 if product not found
        return Response.json({ message: "Product not found" }, { status: 404 });
      }else{
        return Response.json(products);
      
      }
   
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Product not found" });
  }
};
