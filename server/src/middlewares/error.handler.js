
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  // log errors except common auth ones
  if (!(err instanceof ApiError && err.statusCode < 500)) {
    console.error("🔥 Server Error:", err);
  }

  // API-defined errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // unhandled errors
  return res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Something broke!",
  });
};
