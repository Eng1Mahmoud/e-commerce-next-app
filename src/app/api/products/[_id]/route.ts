export const GET = async ({ params }: { params: {_id:string} }) => {
    const { _id } = params;
    console.log("_id: ", _id);

    return Response.json({ message: "Product not found" }, { status: 404 });

};