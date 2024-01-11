import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

const options: NextAuthOptions = {
  providers: [
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
          credentials: "include",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),

    GithubProvider({
      profile(profile: GithubProfile) {
        // console.log("profile:", profile);

        return {
          ...profile,
          id: profile.id.toString(),
          role: profile.role ?? "user",
          image: profile.avatar_url,
        };
      },

      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) token.role = user.role;
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session?.user) session.user.role = token.role;
    //   return session;
    // },
    // async signIn({ user, account }: { user: AuthUser; account: Account }) {
    //   if (account?.provider == "credentials") {
    //     try {
    //       return true;
    //     } catch (error) {
    //       console.log("Error saving user", error);
    //       return false;
    //     }
    //   }
    //   if (account?.provider == "github") {
    //     try {
    //       return true;
    //     } catch (error) {
    //       console.log("Error saving user", error);
    //       return false;
    //     }
    //   }
    // },
  },
};

export const handler = NextAuth(options);
export { handler as GET, handler as POST };
