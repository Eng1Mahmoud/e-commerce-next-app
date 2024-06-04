import { Categorise } from "../../../../lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
export const GET = async (req: any) => {
  try {
    await connectDb();
    // check if categorise already exists
    const categorises = await Categorise.find({});
    if (!categorises) {
      return Response.json({ message: "لا يوجد تصنيفات" });
    }
    return Response.json({ categorises: categorises });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
