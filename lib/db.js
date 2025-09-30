// lib/db.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.NEXT_PUBLIC_DB_HOST || "localhost",
  user: process.env.NEXT_PUBLIC_DB_USER || "root",
  password: process.env.NEXT_PUBLIC_DB_PASS || "",
  database: process.env.NEXT_PUBLIC_DB_NAME || "testdb",
});
