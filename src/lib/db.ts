import mysql from "mysql2/promise"

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27222,
  connectionLimit: 10, // Reduced from 100 - more efficient for most apps
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Performance optimizations
  typeCast: true, // Enable type casting for better performance
  supportBigNumbers: true,
  bigNumberStrings: false,
  dateStrings: false,
  connectTimeout: 10000, // 10 second connection timeout
  timezone: 'Z', // Use UTC to avoid timezone conversions
});
