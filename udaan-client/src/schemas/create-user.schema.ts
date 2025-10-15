import { z } from "zod";

// ✅ Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),
  email: z
    .string()
    .regex(emailRegex, "Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password too long")
    .regex(
      strongPasswordRegex,
      "Password must contain uppercase, lowercase, number, and symbol"
    ),
  age: z
    .string()
    .min(1, "Age required")
    .refine((val) => Number(val) >= 13, "Minimum age is 13"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
