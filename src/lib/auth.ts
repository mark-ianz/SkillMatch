import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "./db"

/* // Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      roleId: number
      email: string
      name: string
      image: string
    }
  }
} */

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  /* callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR oauth_id = ?',
            [user.email, account.providerAccountId]
          );

          if (!(existingUser as any[]).length) {
            // Create new user from Google data
            await db.execute(`
              INSERT INTO users (
                first_name, last_name, email, auth_provider, 
                oauth_id, role_id, status_id
              ) VALUES (?, ?, ?, 'google', ?, 3, 1)
            `, [
              (profile as any)?.given_name || user.name?.split(' ')[0] || '',
              (profile as any)?.family_name || user.name?.split(' ').slice(1).join(' ') || '',
              user.email,
              account.providerAccountId
            ]);
          }
          return true;
        } catch (error) {
          console.error('Error saving user:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      // Add user data to session
      if (session.user?.email) {
        const [userData] = await db.execute(
          'SELECT id, first_name, last_name, role_id FROM users WHERE email = ?',
          [session.user.email]
        );
        const user = (userData as any[])[0];
        if (user) {
          session.user.id = user.id;
          session.user.firstName = user.first_name;
          session.user.lastName = user.last_name;
          session.user.roleId = user.role_id;
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page (you'll create this later)
  } */
}

// No need to export NextAuth here - it's handled in the route.ts file