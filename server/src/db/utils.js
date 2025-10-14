import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto"

export const userUtils = {
  // hash password
  async hashPassword(password) {
    if (!password) throw new Error("Password required");
    return await argon2.hash(password + process.env.PEPPER, {
      type: argon2.argon2id,
      timeCost: 3,
      memoryCost: 65536,
      parallelism: 1,
    });
  },

    generateObjectId() {
    return crypto.randomBytes(12).toString("hex");
  },

  // verify password
  async verifyPassword(input, storedHash) {
    if (!input || !storedHash) return false;
    return await argon2.verify(storedHash, input + process.env.PEPPER);
  },

  // JWT access token
  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );
  },

  // JWT refresh token
  generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );
  },
};
