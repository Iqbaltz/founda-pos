import prisma from "@/prisma";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = bcrypt.compareSync(credentials.password, user.password);

        if (isValid) {
          // return { email: user.email, id: user.id };
          return new Promise((resolve) => {
            resolve({
              email: user.email,
              id: String(user.id),
            });
          });
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) return { ...token, ...user };

  //     return token;
  //   },

  //   async session({ token, session }) {
  //     console.log("session", session);
  //     console.log("token", token);
  //     return session;
  //   },
  // },
};
