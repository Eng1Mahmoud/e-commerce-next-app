import { create } from "domain";
import mongoose, { Model } from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // reference to the Users model

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
    enum: ["جديده", "تحت التجهيز", "جاري التوصيل", "مكتمله", "ملغيه"],
    default: "جديده",
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["مدفوع", "غير مدفوع"],
    default: "غير مدفوع",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});
// Check if the model already exists before defining it
let Order: Model<any>;
if (mongoose.models.Order) {
  Order = mongoose.model("Order");
} else {
  Order = mongoose.model("Order", OrderSchema);
}

export { Order };
