import { connectDb } from "@/lib/conectDb";
import { Product } from "@/lib/models/product";
 export const POST = async (req:any) => {
const data = await req.json();
console.log(data);
const { name, description, price, category, images,amount,unit } = data;

   
 try {
    connectDb();
        const product = new Product({
            name,
            description,
            price,
            category,
            images,
            amount,
            unit

        });
        await product.save();
        return Response.json({ message: "Product added successfully" });
    }
    catch(err) {
        console.error(err);
       return Response.json({ message: "Product not added" });
    }  
}

