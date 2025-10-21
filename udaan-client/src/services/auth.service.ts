import axios from "axios";
import { CreateUserSchema } from "@/schemas/create-user.schema";
import { SignInSchema } from "@/schemas/sign-in.schema";


export class AuthService {
  async createAccount(userData: CreateUserSchema) {
    try {
      const res = await axios.post("/api/users/create", userData);
      return res.data;
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
      return res.data;
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

  async refreshAccessToken() {
    try {
      const res = await axios.post("/api/users/refresh-token");
      return res.data; // ✅ returns data just like other methods
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Session expired. Please log in again.";
        console.log(error.response);
        throw new Error(message);
      }
      throw new Error("Something went wrong while refreshing token.");
    }
  }
async getCurrentUser(cookieHeader?: string) {
  try {
    const res = await axios.get(`/api/users/current-user`, {
      headers: cookieHeader
        ? { Cookie: cookieHeader } // ✅ send cookies manually (for SSR/server requests)
        : undefined,
      withCredentials: true, // ✅ ensures cookies are sent automatically in browser
    });
    

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Session expired. Unable to fetch user.";
      console.log(error.response);
      throw new Error(message);
    }

    throw new Error("Something went wrong while fetching user.");
  }
}

}

const authService = new AuthService();
export default authService;
