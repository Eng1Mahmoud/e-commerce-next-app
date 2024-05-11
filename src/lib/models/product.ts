import mongoose, { Model, Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    image: string;
    amount: number;
    unit: string;
}

const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number },
    rating: { type: Number },
    numReviews: { type: Number },
    image: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
});

let Product: Model<IProduct>;

try {
    Product = mongoose.model<IProduct>("Products");
} catch (error) {
    Product = mongoose.model<IProduct>("Products", productSchema);
}

export { Product };
