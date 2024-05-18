export const GET = async (req:any) => {
    const { _id } = req.params;
    console.log(_id);

    return Response.json({ message: "Product not found" }, { status: 404 });

};