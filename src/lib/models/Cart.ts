import mongoose, { Model } from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products", // reference to the Product model
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

let Cart: Model<any>;

try {
  Cart = mongoose.model("Cart");
} catch (error) {
  Cart = mongoose.model("Cart", CartSchema);
}

export { Cart };
