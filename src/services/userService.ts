import pool from "../db";

export interface User {
  id?: number;
  username: string;
  email: string;
  date_of_birth: string;
  created_at?: string;
}

// Save a new user to the database
export const createUser = async (user: User): Promise<User> => {
  const { username, email, date_of_birth } = user;

  const query = `
    INSERT INTO users (username, email, date_of_birth)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [username, email, date_of_birth];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// Get all users whose birthday is today
export const getTodaysBirthdays = async (): Promise<User[]> => {
  const query = `
    SELECT * FROM users
    WHERE 
      EXTRACT(MONTH FROM date_of_birth) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND
      EXTRACT(DAY FROM date_of_birth) = EXTRACT(DAY FROM CURRENT_DATE)
  `;

  const result = await pool.query(query);
  return result.rows;
};

// Check if email already exists
export const emailExists = async (email: string): Promise<boolean> => {
  const query = `SELECT id FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows.length > 0;
};
