import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Update personal information (user table)
export async function updatePersonalInfo(
  userId: number,
  data: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    phone_number?: string;
    street_name?: string;
    house_number?: string;
    subdivision?: string;
    postal_code?: string;
    barangay?: string;
    city_municipality?: string;
  }
) {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.first_name !== undefined) {
    fields.push("first_name = ?");
    values.push(data.first_name);
  }
  if (data.middle_name !== undefined) {
    fields.push("middle_name = ?");
    values.push(data.middle_name);
  }
  if (data.last_name !== undefined) {
    fields.push("last_name = ?");
    values.push(data.last_name);
  }
  if (data.phone_number !== undefined) {
    fields.push("phone_number = ?");
    values.push(data.phone_number);
  }
  if (data.street_name !== undefined) {
    fields.push("street_name = ?");
    values.push(data.street_name);
  }
  if (data.house_number !== undefined) {
    fields.push("house_number = ?");
    values.push(data.house_number);
  }
  if (data.subdivision !== undefined) {
    fields.push("subdivision = ?");
    values.push(data.subdivision);
  }
  if (data.postal_code !== undefined) {
    fields.push("postal_code = ?");
    values.push(data.postal_code);
  }
  if (data.barangay !== undefined) {
    fields.push("barangay = ?");
    values.push(data.barangay);
  }
  if (data.city_municipality !== undefined) {
    fields.push("city_municipality = ?");
    values.push(data.city_municipality);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(userId);

  const query = `UPDATE user SET ${fields.join(", ")} WHERE user_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, values);

  return result.affectedRows > 0;
}

// Update profile picture (ojt_profile.ojt_image_path)
export async function updateProfilePicture(ojtId: number, imagePath: string) {
  const query = `UPDATE ojt_profile SET ojt_image_path = ? WHERE ojt_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [imagePath, ojtId]);

  return result.affectedRows > 0;
}

// Update/Create password (account.password_hash)
export async function updatePassword(
  userId: number,
  newPassword: string,
  currentPassword?: string
) {
  // If currentPassword is provided, verify it first
  if (currentPassword) {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT password_hash FROM account WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      throw new Error("Account not found");
    }

    const existingHash = rows[0].password_hash;

    // If password exists, verify current password
    if (existingHash) {
      const isValid = await bcrypt.compare(currentPassword, existingHash);
      if (!isValid) {
        throw new Error("Current password is incorrect");
      }
    }
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  const query = `UPDATE account SET password_hash = ? WHERE user_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [
    hashedPassword,
    userId,
  ]);

  return result.affectedRows > 0;
}

// Update resume (ojt_profile.resume_path)
export async function updateResume(ojtId: number, resumePath: string) {
  const query = `UPDATE ojt_profile SET resume_path = ? WHERE ojt_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [
    resumePath,
    ojtId,
  ]);

  return result.affectedRows > 0;
}

// Update availability (preferred_schedule and required_hours)
export async function updateAvailability(
  ojtId: number,
  data: {
    preferred_schedule?: string; // e.g., "Monday,Wednesday,Friday"
    required_hours?: number; // e.g., 400
  }
) {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.preferred_schedule !== undefined) {
    fields.push("preferred_schedule = ?");
    values.push(data.preferred_schedule);
  }
  if (data.required_hours !== undefined) {
    fields.push("required_hours = ?");
    values.push(data.required_hours);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(ojtId);

  const query = `UPDATE ojt_profile SET ${fields.join(", ")} WHERE ojt_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, values);

  return result.affectedRows > 0;
}

// Update skills (ojt_profile.skills)
export async function updateSkills(ojtId: number, skills: string[]) {
  const skillsString = skills.join(",");
  const query = `UPDATE ojt_profile SET skills = ? WHERE ojt_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [
    skillsString,
    ojtId,
  ]);

  return result.affectedRows > 0;
}

// Update education details (ojt_profile)
export async function updateEducationDetails(
  ojtId: number,
  data: {
    student_number?: string;
    college?: string;
    course?: string;
    year_level?: number;
    expected_graduation_year?: number;
  }
) {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.student_number !== undefined) {
    fields.push("student_number = ?");
    values.push(data.student_number);
  }
  if (data.college !== undefined) {
    fields.push("college = ?");
    values.push(data.college);
  }
  if (data.course !== undefined) {
    fields.push("course = ?");
    values.push(data.course);
  }
  if (data.year_level !== undefined) {
    fields.push("year_level = ?");
    values.push(data.year_level);
  }
  if (data.expected_graduation_year !== undefined) {
    fields.push("expected_graduation_year = ?");
    values.push(data.expected_graduation_year);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(ojtId);

  const query = `UPDATE ojt_profile SET ${fields.join(", ")} WHERE ojt_id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, values);

  return result.affectedRows > 0;
}

// Get user settings data (combined from user, account, and ojt_profile)
export async function getUserSettings(userId: number) {
  const query = `
    SELECT 
      u.user_id,
      u.first_name,
      u.middle_name,
      u.last_name,
      u.phone_number,
      u.street_name,
      u.house_number,
      u.subdivision,
      u.postal_code,
      u.barangay,
      u.birthdate,
      u.city_municipality,
      a.email,
      a.password_hash,
      o.ojt_id,
      o.ojt_image_path,
      o.resume_path,
      o.student_number,
      o.college,
      o.course,
      o.year_level,
      o.expected_graduation_year,
      o.skills,
      o.preferred_schedule,
      o.required_hours
    FROM user u
    LEFT JOIN account a ON u.user_id = a.user_id
    LEFT JOIN ojt_profile o ON u.user_id = o.user_id
    WHERE u.user_id = ?
  `;

  const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];

  return {
    user_id: row.user_id,
    first_name: row.first_name,
    middle_name: row.middle_name,
    last_name: row.last_name,
    phone_number: row.phone_number,
    street_name: row.street_name,
    house_number: row.house_number,
    subdivision: row.subdivision,
    postal_code: row.postal_code,
    barangay: row.barangay,
    city_municipality: row.city_municipality,
    email: row.email,
    has_password: !!row.password_hash,
    ojt_id: row.ojt_id,
    ojt_image_path: row.ojt_image_path,
    resume_path: row.resume_path,
    student_number: row.student_number,
    college: row.college,
    course: row.course,
    birthdate: row.birthdate,
    year_level: row.year_level,
    expected_graduation_year: row.expected_graduation_year,
    skills: row.skills ? row.skills.split(",") : [],
    preferred_schedule: row.preferred_schedule,
    required_hours: row.required_hours,
  };
}
