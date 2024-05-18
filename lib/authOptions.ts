import { authService } from "@/src/service/auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const isLogin = await authService.login(credentials);

        if (!isLogin) {
          return null;
        }

        if (isLogin?.access_token) {
          const user = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${isLogin.access_token}`,
              },
            }
          );

          return new Promise((resolve) => {
            resolve({
              email: user.data.email,
              id: String(user.data.id),
              name: user.data.name,
              image: user.data.photo,
            });
          });
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
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
