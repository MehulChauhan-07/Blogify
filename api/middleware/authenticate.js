import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(handleError(403, "Unauthorized"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(handleError(401, "Invalid token"));
    } else if (error instanceof jwt.TokenExpiredError) {
      return next(handleError(401, "Token expired"));
    }
    return next(handleError(500, "Authentication error"));
  }
};
