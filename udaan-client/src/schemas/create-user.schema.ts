import { z } from "zod";

// ✅ Regex patterns
const nameRegex = /^[A-Za-z\s]+$/;
const usernameRegex = /^[A-Za-z0-9]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .regex(nameRegex, "Name can contain only letters and spaces!"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters!")
    .max(20, "Username too long")
    .regex(usernameRegex, "Username can contain only letters and numbers!"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Email is too short!")
    .max(100, "Email is too long!")
    .regex(emailRegex, "Enter a valid email address."),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password too long!")
    .regex(
      strongPasswordRegex,
      "Password must contain uppercase, lowercase, number, and symbol"
    ),
  age: z
    .string()
    .min(1, "Age required")
    .refine((val) => Number(val) >= 13, { message: "Minimum age is 13!" })
    .refine((val)=> Number(val) <=120, { message: "Please enter a valid age!" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
