import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signInWithGoogle } from "@/actions/signInWithGoogle";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_NEXTAUTH_CLENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_NEXTAUTH_CLENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {},
  callbacks: {
    // save new user to database
    async signIn(params) {
      const { user, account, profile } = params;
      // check if user already exists in database or not
      const { name, email, id, image } = user;
      signInWithGoogle({
        user: {
          name: name || "",
          email: email || " ",
          id: id || "",
          image: image || "",
        },
      });
      console.log(user);
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
