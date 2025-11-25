// middleware/verifyJWT.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { Users } from "../schema/index.js";
import { eq } from "drizzle-orm";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized request (no token)");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded?.id) throw new ApiError(401, "Invalid token payload");

    const rows = await db.select().from(Users).where(eq(Users.id, decoded.id));
    if (!rows.length) throw new ApiError(401, "Invalid or expired token"); 

    const user = rows[0];

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      throw new ApiError(401, "Token expired");
    if (err instanceof jwt.JsonWebTokenError)
      throw new ApiError(401, "Invalid access token");
    throw new ApiError(401, err?.message || "Authentication failed");
  }
});
