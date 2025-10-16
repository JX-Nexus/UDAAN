import z from "zod";
export const signInSchema = z.object({
  email: z
    .string()
    .min(3, "Enter username or email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password too long"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
