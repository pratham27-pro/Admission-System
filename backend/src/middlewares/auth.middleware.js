import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Get token from cookies or Authorization header
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace(/^Bearer\s/, "");

  if (!token) {
    return next(new ApiError(401, "Access token is missing"));
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user and exclude sensitive fields
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(401, "Invalid token or user does not exist"));
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handle token expiration or invalid signature
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Access token has expired"
        : "Invalid access token";
    return next(new ApiError(401, errorMessage));
  }
});
