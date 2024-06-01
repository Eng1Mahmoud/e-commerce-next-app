import { connectDb } from "@/lib/conectDb";
import { Products } from "@/lib/models/product";
 export const POST = async (req:any) => {
const data = await req.json();
const { name, description, price, category, images,amount,unit } = data;
 try {
    connectDb();
        const product = new Products({
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
       return Response.json({ message: "Product not added" });
    }  
}

