import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Itong user object sa taas ^^, laman niyan is yung info galing sa Google account

      // TODO: Query the database to check if the user exists on the QCU database.

      // Dummy data, for example ito yung mga data na nasa DB ng QCU
      const students = [
        {
          student_number: "23-2583",
          email: "bustillo.markian.buenavista@gmail.com",
          first_name: "Mark Ian",
          last_name: "Bustillo",
        },
        {
          student_number: "23-2584",
          email: "aleckbiong@gmail.com",
          first_name: "Aleck",
          last_name: "Biong",
        },
        {
          student_number: "23-2585",
          email: "zyllepalajoren@gmail.com",
          first_name: "Zylle",
          last_name: "Palajoren",
        },
      ];

      // Simulating yung checking sa DB, check kung yung email ba ng user is nagmamatch sa mga emails sa DB 
      const isInDB = students.find((student) => student.email === user.email);

      // If walang nag match, ibig sabihin yung email na ginamit is hindi associated sa QCU
      if (!isInDB) return "/auth/signin?error=EmailNotAllowed"; // Redirect to sign-in page with error

      return true; // Continue the sign-in process
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl + "/profile") return url;
      return baseUrl;
    },
  },
};