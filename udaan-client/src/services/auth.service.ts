import axios from "axios";
import { CreateUserSchema } from "@/schemas/create-user.schema";
import { SignInSchema } from "@/schemas/sign-in.schema";

export class AuthService {
  async createAccount(userData: CreateUserSchema) {
    try {
      const res = await axios.post("/api/users/create", userData);
      return res.data; // Return the data, let frontend handle toasts
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        console.log(error.response);
        throw new Error(message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  }

  async signIn(credentials: SignInSchema) {
    try {
      const res = await axios.post("/api/users/sign-in", credentials);
      return res.data; // Return backend data (success, message, token, etc.)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed. Please check your credentials.";
        console.log(error.response);
        throw new Error(message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

const authService = new AuthService();
export default authService;
