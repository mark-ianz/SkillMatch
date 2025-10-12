import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { createUserInputSchema } from "@/schema/user";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";
import { formatZodError } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();

  const connection = await db.getConnection();

  try {
    const {
      first_name,
      middle_name,
      last_name,
      gender,
      birthdate,
      street_name,
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
    } = createUserInputSchema.parse(body);

    await connection.beginTransaction();

    const userResult = await connection.query<ResultSetHeader>(
      "INSERT INTO `user` (`first_name`, `middle_name`, `last_name`, `gender`, `birthdate`, `street_name`, `barangay`, `city`, `municipality`, `phone_number`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        middle_name,
        last_name,
        gender,
        birthdate,
        street_name,
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


    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error: Error | ZodError | unknown) {
    connection.rollback();
    console.log(error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { errors: formatZodError(error) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User creation failed", error },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
