import mongoose ,{ Model } from "mongoose";
const categoriseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
 image: { type: String, required: true },
});

let  Categorise: Model<any>;
if (mongoose.models.Categorise) {
  Categorise = mongoose.model("Categorise");
}
else {
  Categorise = mongoose.model("Categorise", categoriseSchema);
}
export  {Categorise};

