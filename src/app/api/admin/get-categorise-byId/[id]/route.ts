import { Categorise } from "@/lib/models/categorise";
import { connectDb } from "@/lib/conectDb";
export const GET = async (req: any, { params }: { params: any }) => {
  const id = params.id;
  try {
    await connectDb();
    // check if categorise already exists
    const categorise = await Categorise.findOne({ _id: id });
    if (!categorise) {
      return Response.json({ message: "لا يوجد تصنيفات" });
    }
    return Response.json({ categorise: categorise });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "حدث خطأ ما" }, { status: 500 });
  }
};
