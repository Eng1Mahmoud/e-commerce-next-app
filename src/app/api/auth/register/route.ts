import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDb } from "@/lib/conectDb";
import { User } from "@/lib/models/user";
import nodemailer from "nodemailer";
export const POST = async (req: any) => {
  const data = await req.json();
  const { username, email, password } = data;
  // Create a verification token
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  // send email
  // Create a verification URL
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  // Send the email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email address",
    text: `الرجاء تفعيل حسابك عن طريق الضفط علي اللينك التالي: ${verificationUrl}`,
  };

  // check if user already exists
  try {
    connectDb();
    const user = await User.findOne({}).where("email").equals(email);

    if (user) {
      if (user.verified) {
        return Response.json(
          { message: "الحساب موجود بالفعل" },
          { status: 200 }
        );
      } else {
        transporter.sendMail(mailOptions);
        return Response.json(
          { message: "لقد ارسلنا رسالة لتاكيد الحساب الرجاء تفقد رسائلك" },
          { status: 200 }
        );
      }
    } else {
      // create new user
      // hash password before saving to database
      let saltRounds = Number(process.env.SALT_ROUNDS) || 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      // send mail
      transporter.sendMail(mailOptions);
      return Response.json(
        { message: "لقد ارسلنا رسالة لتاكيد الحساب الرجاء تفقد رسائلك" },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
};
