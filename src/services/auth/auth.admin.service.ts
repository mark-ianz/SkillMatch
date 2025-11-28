import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

interface AdminUser {
  admin_id: number;
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

export const adminCredentialsProvider = CredentialsProvider({
  id: "admin-credentials",
  name: "Admin Login",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      throw new Error("Username and password are required");
    }

    try {
      // Query admin from database
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT admin_id, username, password_hash, full_name, email, is_active 
         FROM admin 
         WHERE username = ? AND is_active = 1`,
        [credentials.username]
      );

      if (!rows || rows.length === 0) {
        throw new Error("Invalid credentials");
      }

      const admin = rows[0] as AdminUser & { password_hash: string };

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        admin.password_hash
      );

      console.log({ admin });

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      // Update last login
      await db.query(`UPDATE admin SET last_login = NOW() WHERE admin_id = ?`, [
        admin.admin_id,
      ]);

      // Return user object with admin flag
      return {
        id: admin.admin_id.toString(),
        email: admin.email || admin.username,
        name: admin.full_name,
        username: admin.username,
        role_id: 2, // Admin role_id
        isAdmin: true,
      };
    } catch (error) {
      console.error("Admin auth error:", error);
      throw new Error("Authentication failed");
    }
  },
});
