import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace(/^Bearer\s/, "");

  if (!token) {
    return next(new ApiError(401, "Access token is missing"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(401, "Invalid token or user does not exist"));
    }

    req.user = user;
    next();
  } catch (error) {
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Access token has expired"
        : "Invalid access token";
    return next(new ApiError(401, errorMessage));
  }
});
