import mongoose, { Model } from "mongoose";
import {IProduct} from "@/types/product";
const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number },
  rating: { type: Number },
  numReviews: { type: Number },
  images: { type: [String], required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
});

// Check if the model already exists before defining it
let Products: Model<IProduct>;
if (mongoose.models.Products) {
  Products = mongoose.model<IProduct>("Products");
} else {
  Products = mongoose.model<IProduct>("Products", productSchema);
}

export { Products };
