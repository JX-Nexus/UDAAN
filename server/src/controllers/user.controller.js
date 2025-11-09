import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { Users } from "../schema/index.js";
import { userUtils } from "../db/utils.js";
import { eq, or } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sql } from "drizzle-orm";
import jwt  from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
 try {
    const rows = await db.select().from(Users).where(eq(Users.id, userId));
  if (!rows.length) throw new ApiError(404, "User not found");

  const user = rows[0];
  const accessToken = userUtils.generateAccessToken(user);
  const refreshToken = userUtils.generateRefreshToken(user);
  const now = new Date();

  if (!refreshToken) throw new ApiError(500, "Token generation failed internally");

  await db
    .update(Users)
    .set({
      refreshToken: refreshToken,
      refreshTokenCreatedAt: now,
      lastLoginAt: now,
      failedLoginAttempts: 0,
      updatedAt: now,
    })
    .where(eq(Users.id, userId));

  return { accessToken, refreshToken };
} catch (err) {
    console.error("token error:", err.message);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const createUser = asyncHandler(async (req, res, next) => {
  
   
    let { name, username, email, age, password } = req.body;

    if (!name || !username || !email || !age || !password)
      throw new ApiError(400, "All fields are required");

    name = name.trim();
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();

    if (username.length < 3 || username.length > 30)
      throw new ApiError(400, "Username must be 3–30 chars long");
    if (!/^[a-z0-9_]+$/.test(username))
      throw new ApiError(400, "Username can only have a-z, 0-9 or _");
    if (!email.includes("@") || email.length < 5)
      throw new ApiError(400, "Invalid email format");
    if (password.length < 8)
      throw new ApiError(400, "Password too short (min 8 chars)");
    if (isNaN(age) || age < 10 || age > 120)
      throw new ApiError(400, "Invalid age");

    // mini spam limiter
    if (!global.signupCooldown) global.signupCooldown = new Map();
    const now = Date.now();
    const last = global.signupCooldown.get(req.ip) || 0;
    if (now - last < 5000) throw new ApiError(429, "Slow down dude ⏳");
    global.signupCooldown.set(req.ip, now);

    // check duplicates
    const existingUser = await db
      .select()
      .from(Users)
      .where(or(eq(Users.username, username), eq(Users.email, email)));

    if (existingUser.length) throw new ApiError(409, "User already exists");

    // hash password before inserting
    const hashedPassword = await userUtils.hashPassword(password);

    // insert
    const inserted = await db
      .insert(Users)
      .values({
        id: userUtils.generateObjectId(),
        name,
        username,
        email,
        age: parseInt(age),
        password: hashedPassword,
        createdAt: new Date(),
      })
      .returning({
        id: Users.id,
        name: Users.name,
        username: Users.username,
        email: Users.email,
        age: Users.age,
      });

    if (!inserted?.length)
      throw new ApiError(500, "User insert failed somehow");

    console.log(`[NEW USER] ${username} (${email})`);

    return res
      .status(201)
      .json(new ApiResponse(201, inserted[0], "User registered ✅"));


});
const signIn = asyncHandler(async(req,res)=>{
    const { email, username, password } = req.body;

    if (!username && !email)
        throw new ApiError(400, "username or email is required");
    if (!password) throw new ApiError(400, "password is required");

    const users = await db
        .select()
        .from(Users)
        .where(or(eq(Users.username, username), eq(Users.email, email)));

    if (!users.length) throw new ApiError(404, "User not found");

    const user = users[0];

    const valid = await userUtils.verifyPassword(password, user.password);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user.id
    );

    const options = { httpOnly: true, secure: true };

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
        new ApiResponse(
            200,
            {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            accessToken,
            refreshToken,
            },
            "User logged in successfully"
        )
        );
})
const signOut = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  console.log(userId)
  if (!userId)
    return res.status(401).json({ error: "Unauthorized, user not found" });

  await db
    .update(Users)
    .set({
      refreshToken: null,
      refreshTokenCreatedAt: null,
      tokenVersion: sql`${Users.tokenVersion} + 1`, // safe increment
      updatedAt: new Date(),
    })
    .where(eq(Users.id, userId));

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out ✅"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken)
    throw new ApiError(401, "Unauthorized request: no refresh token");

  try {
    // verify token signature
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decoded?.id) throw new ApiError(401, "Invalid refresh token payload");

    // find user
    const rows = await db.select().from(Users).where(eq(Users.id, decoded.id));
    if (!rows.length) throw new ApiError(401, "User not found");

    const user = rows[0];

    // ensure refresh token matches what’s stored
    if (incomingRefreshToken !== user.refreshToken)
      throw new ApiError(401, "Refresh token expired or already used");

    // issue new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user.id);

    // set secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed ✅"
        )
      );
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid refresh token");
  }
});
const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    // just a safety fallback in case JWT middleware fails silently
    throw new ApiError(401, "Unauthorized: no user in request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "User fetched successfully ✅"
      )
    );
});


export { 
        createUser,
        signIn,
        signOut,
        refreshAccessToken,
        getCurrentUser

        };
