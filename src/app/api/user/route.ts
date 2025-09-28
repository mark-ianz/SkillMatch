import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import z from "zod";
import { createUserInputSchema } from "@/schema/user";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    first_name,
    middle_name,
    last_name,
    gender,
    birthdate,
    street_address,
    barangay,
    city,
    municipality,
    phone_number,
    email,
    password,
    oauth_id,
    auth_provider,
    role_id,
    status_id,
  } = z.parse(createUserInputSchema, body);

  const connection = await db.getConnection();

  await connection.beginTransaction();

  const userResult = await connection.query<ResultSetHeader>(
    "INSERT INTO `user` (`first_name`, `middle_name`, `last_name`, `gender`, `birthdate`, `street_address`, `barangay`, `city`, `municipality`, `phone_number`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      first_name,
      middle_name,
      last_name,
      gender,
      birthdate,
      street_address,
      barangay,
      city,
      municipality,
      phone_number,
      role_id,
      status_id,
    ]
  );

  const userId = userResult[0].insertId;
  const hashedPassword = bcrypt.hashSync(password, 10);

  await connection.query(
    "INSERT INTO `account` (`user_id`, `email`, `auth_provider`, `oauth_id`, `password_hash`) VALUES (?, ?, ?, ?, ?)",
    [userId, email, auth_provider, oauth_id, hashedPassword]
  );

  connection.commit();

  connection.release();

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
