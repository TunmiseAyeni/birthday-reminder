import { Request, Response } from "express";
import { createUser, emailExists } from "../services/userService";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, email, date_of_birth } = req.body;

    // --- Validation ---
    if (!username || !email || !date_of_birth) {
      res.status(400).json({
        success: false,
        message: "All fields are required: username, email, date_of_birth",
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
      return;
    }

    // Check for duplicate email
    const duplicate = await emailExists(email);
    if (duplicate) {
      res.status(409).json({
        success: false,
        message: "This email is already registered",
      });
      return;
    }

    // --- Save to DB ---
    const newUser = await createUser({ username, email, date_of_birth });

    res.status(201).json({
      success: true,
      message: `🎉 ${newUser.username} has been registered successfully!`,
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
