import jwt from "jsonwebtoken";
import NextAuth, { Account, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { cookies } from "next/headers";

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },

      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      profile(profile: GoogleProfile) {
        const userData = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };

        // async () => {
        //   const res = await fetch("http://localhost:5000/api/users/save", {
        //     method: "POST",
        //     body: JSON.stringify(userData),
        //     headers: { "Content-Type": "application/json" },
        //   });

        //   const user = await res.json();

        //   if (res.ok && user) {
        //     const token = jwt.sign(
        //       { _id: user._id, email: user.email, role: user.role },
        //       process.env.JWT_SECRET as string,
        //       {
        //         expiresIn: "3d",
        //       }
        //     );

        //     cookies().set({
        //       name: "auth-token",
        //       value: token,
        //       httpOnly: true,
        //       path: "/",
        //       sameSite: "strict",
        //       maxAge: 3 * 24 * 60 * 60 * 1000,
        //       secure: process.env.NODE_ENV === "production",
        //     });

        //     return user;
        //   } else {
        //     return null;
        //   }
        // };

        return userData;
      },

      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials) {
        const userData = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "3d",
            }
          );

          cookies().set({
            name: "auth-token",
            value: token,
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
          });

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        const userData = {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
        };

        const res = await fetch("http://localhost:5000/api/users/save", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "3d",
            }
          );

          cookies().set({
            name: "auth-token",
            value: token,
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
          });

          return true;
        }
      }

      if (account?.provider == "github") {
        const userData = {
          name: profile?.name,
          email: profile?.email,
          image: profile?.avatar_url,
          role: "user",
        };

        const res = await fetch("http://localhost:5000/api/users/save", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "3d",
            }
          );

          cookies().set({
            name: "auth-token",
            value: token,
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
          });

          return true;
        }
      }
      return false;
    },
  },
};

export const handler = NextAuth(options);
export { handler as GET, handler as POST };
