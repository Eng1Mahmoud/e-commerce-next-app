import bcrypt  from "bcrypt"
import { connectDb } from "@/lib/conectDb";
import { User } from "@/lib/models/user";

export const POST = async (req: any, ) => {
  const data = await req.json();

  const { username, email, password } = data;
 // check if user already exists
 try {
    connectDb();
    const user = await User.findOne({}).where("email").equals(email);
    if (user) {
        return Response.json({ message: "User already exists" },{status:400});
    }
    else{
    // create new user
    // hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return Response.json({data:data, message: "User registered successfully" },{status:200});
    }
} catch (error) {
    return Response.json({ message:error},{status:500} );
}
};