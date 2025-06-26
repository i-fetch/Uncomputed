//auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDB } from "./lib/connectDB";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        try {
          const { email, password } = credentials;

          // Find user by email
          const user = await User.findOne({ email }).select("+password");

          if (!user || !user.password) {
            console.error("User not found or password missing");
            throw new Error("Invalid credentials");
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.error("Invalid password attempt for email:", email);
            throw new Error("Invalid credentials");
          }

          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("AUTHORIZATION ERROR:", error.message);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username; // Ensure username is included
        token.role = user.role; // Ensure role is included
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role, // Critical for middleware
      };
      return session;
    },
      async redirect({ url, baseUrl, user, token }) {
      // Use token.role for redirect
      if (token?.role === "admin") return "/admin";
      if (token?.role === "user") return "/dashboard";
      return baseUrl;
    }
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
