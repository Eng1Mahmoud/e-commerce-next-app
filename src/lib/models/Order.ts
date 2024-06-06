import mongoose, { Model } from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // reference to the Users model
  },
  products: [
    {
      productData: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        }
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
