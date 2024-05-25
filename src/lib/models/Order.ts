import mongoose, { Model } from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // reference to the User model
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
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
});

let Order: Model<any>;
try {
  Order = mongoose.model("Order");
} catch (error) {
  Order = mongoose.model("Order", OrderSchema);
}
export { Order };
