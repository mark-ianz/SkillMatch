import { NextAuthOptions } from "next-auth";
import {
  ExtendedSession,
  ExtendedToken,
  ExtendedUser,
} from "@/types/user.types";
import GoogleProvider from "next-auth/providers/google";
import { handleCompanySignIn } from "@/services/auth/auth.company.service";
import { handleOJTSignIn } from "@/services/auth/auth.ojt.service";
import { handleSignup } from "@/services/auth/auth.shared.service";
// Sign-in logic moved to service: @/services/auth/onboardingSignIn.service

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      id: "google-ojt",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      id: "google-ojt-signup",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      id: "google-company",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      id: "google-company-signup",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        /* Company Authentication Flows */
        if (account?.provider === "google-company-signup") {
          // Explicit signup provider — handle as signup
          const res = await handleSignup(user as ExtendedUser, "company");
          return res;
        }

        if (account?.provider === "google-company") {
          // Company sign-in flow
          const res = await handleCompanySignIn(user as ExtendedUser);
          return res;
        }

        /* OJT Authentication Flows */
        if (account?.provider === "google-ojt-signup") {
          // OJT sign-up flow
          const res = await handleSignup(user as ExtendedUser, "ojt");
          return res;
        }

        if (account?.provider === "google-ojt") {
          // OJT sign-in flow
          const res = await handleOJTSignIn(user as ExtendedUser);
          console.log("res", res);
          return res;
        }

        console.log("ME??");
        return false;

        /* // Fallback / OJT provider
        const result = await handleOAuthSignIn(user as ExtendedUser, account); */
        /* return result; */
      } catch (err) {
        console.error("Sign-in service failed:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      // First time jwt callback is run, user object is available
      try {
        console.log("JWT Callback, token:", token);
        console.log("JWT Callback, user:", user);
        if (user) {
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
          token.user_id = (user as ExtendedUser).user_id;
          token.company_id = (user as ExtendedUser).company_id;
          token.role_id = (user as ExtendedUser).role_id;
          token.status_id = (user as ExtendedUser).status_id;
        }
        return token;
      } catch (error) {
        console.log("JWT CALLBACK ERROR:", error);
        return token;
      }
    },
    async session({ session, token }) {
      console.debug("Session Callback, session:", session);
      if (session.user) {
        session.user.email = (token as ExtendedToken).email;
        session.user.name = (token as ExtendedToken).name;
        session.user.image = (token as ExtendedToken).picture;
        (session as ExtendedSession).user.user_id = (
          token as ExtendedToken
        ).user_id;
        (session as ExtendedSession).user.role_id = (
          token as ExtendedToken
        ).role_id;
        (session as ExtendedSession).user.company_id = (
          token as ExtendedToken
        ).company_id;
        (session as ExtendedSession).user.status_id = (
          token as ExtendedToken
        ).status_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signup",
    signOut: "/signup",
    error: "/signup",
  },
};
